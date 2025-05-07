import { useState } from 'react'
import { User, MapPin, CreditCard, Settings, LogOut, History, NotepadText, Trash2 } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Tabs, TabsContent } from "../../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { useDeleteFeedback, useGetFeedbackByUserId, useGetOrdersByUserId, useGetUserDetailsByUsername, useLogout, useUpdateuserDetails } from '../../../queries/queries'
import { feedbackType } from '../product/product-description'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../components/ui/alert-dialog'
import { Link, useNavigate } from '@tanstack/react-router'
import { Order } from '../../../types/order'
import { useForm } from 'react-hook-form'


export default function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("personal-info")
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;
    const feedback = useGetFeedbackByUserId(userId).data?.data;
    if (!userId) {
        navigate({
            to: "/auth",
        })
    }
    const { data: orders } = useGetOrdersByUserId(userId);
    console.log('user ', user?.username)
    const moreUserDetails = useGetUserDetailsByUsername(user?.username)?.data;
    console.log("more User details:", moreUserDetails)
    const deleteFeedback = useDeleteFeedback();

    const logout = useLogout();

    const updateProfile = useUpdateuserDetails();
    //user profile management
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: user?.username,
            phoneNumber: moreUserDetails?.phoneNumber
        }
    });
    const handleProfileUpdate = (data: any) => {
        updateProfile.mutate({ profileId: moreUserDetails?.profileId, data });
    }
    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full md:w-80">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={user?.avatar} alt={user.username} />
                                    {/* @ts-ignore */}
                                    <AvatarFallback>{user.username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{user?.username}</CardTitle>
                                    <CardDescription>{user?.email}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <nav className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("personal-info")}>
                                    <User className="mr-2 h-4 w-4" /> Personal Info
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("orders")}>
                                    <History className="mr-2 h-4 w-4" />Purchase History
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("reviews")}>
                                    <NotepadText className="mr-2 h-4 w-4" /> My Reviews
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("addresses")}>
                                    <MapPin className="mr-2 h-4 w-4" /> Addresses
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("payment")}>
                                    <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("settings")}>
                                    <Settings className="mr-2 h-4 w-4" /> Account Settings
                                </Button>
                            </nav>
                        </CardContent>
                        <CardFooter>
                            <AlertDialog>
                                <AlertDialogTrigger className='w-full'>
                                    <Button variant="outline" className="w-full" >
                                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='max-w-sm rounded-lg'>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will log you out and you'll need to relogin to get access to some other services.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => logout()}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </CardFooter>
                    </Card>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsContent value="personal-info">
                            <Card>
                                <form onSubmit={handleSubmit(handleProfileUpdate)}>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>Update your personal details here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="full-name">Full Name</Label>
                                            <Input id="full-name" defaultValue={user?.username}  {...register("username")} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" defaultValue={user?.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" {...register("phoneNumber")} type="tel" defaultValue={moreUserDetails?.phoneNumber} placeholder="Enter your phone number" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type='submit'>Save Changes</Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>

                        <TabsContent value="orders">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order History</CardTitle>
                                    <CardDescription>View your past orders and their status.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {orders?.map((order: Order) => (
                                            <Link to={`/order-summary/${order.orderId}`} key={order.orderId} className="flex justify-between items-center border-b pb-2">
                                                <div>
                                                    <p className="font-medium">{"ORD-" + order.orderId.split('-')[0].toUpperCase()}</p>
                                                    <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                                                    <p className="text-sm text-gray-500">{order.orderStatus}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="reviews">
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Reviews</CardTitle>
                                    <CardDescription>View and manage your  past reviews on products.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {feedback?.map((feedback: feedbackType) => (
                                            <div key={feedback?.feedbackId} className="flex justify-between items-center border-b pb-2">
                                                <Link to={`/product/${feedback?.productId}`} >
                                                    <p className="font-medium">#{feedback?.feedbackId.split('-')[0].toUpperCase()}</p>
                                                    <p className="text-sm text-gray-500">{new Date(feedback?.date).toLocaleDateString()}</p>
                                                    <p className="font-medium">{feedback?.comment}</p>
                                                </Link>
                                                <div className="text-right">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Trash2 />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete your
                                                                    account and remove your data from our servers.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => deleteFeedback.mutate(feedback.feedbackId)}>Continue</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="addresses">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Saved Addresses</CardTitle>
                                    <CardDescription>Manage your delivery addresses.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* {addresses.map((address) => (
                                            <div key={address.id} className="flex justify-between items-center border-b pb-2">
                                                <div>
                                                    <p className="font-medium">{address.type}</p>
                                                    <p className="text-sm text-gray-500">{address.address}</p>
                                                </div>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </div>
                                        ))} */}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Add New Address</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="payment">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Methods</CardTitle>
                                    <CardDescription>Manage your payment options.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Your payment methods will be displayed here.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button>Add Payment Method</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                    <CardDescription>Manage your account preferences.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Email Notifications</p>
                                            <p className="text-sm text-gray-500">Receive emails about your orders and account</p>
                                        </div>
                                        <Button variant="outline">Manage</Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Password</p>
                                            <p className="text-sm text-gray-500">Change your account password</p>
                                        </div>
                                        <Button variant="outline">Update</Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                                        </div>
                                        <Button variant="outline">Enable</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div >
    )
}