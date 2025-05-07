import { GiftIcon, Plus, Send  } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Button } from '../../../components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateNotification, useGetPromotionalNotifications } from '../../../queries/queries'

interface Promotion {
    notificationId: string,
    notificationType: number,
    notificationContext: number,
    notificationContent: string,
    notificationTitle: string,
    notificationDate: Date,
    userId: string
}

const notificationSchema = z.object({
    notificationTitle: z.string().min(1, { message: "Title is required" }),
    notificationContent: z.string().min(1, { message: "Content is required" }),
})

export default function Promotions() {
    const promotions: Promotion[] = useGetPromotionalNotifications().data?.data;
    { console.log('promotions', promotions) }
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Promotional Notifications</CardTitle>
                <CardDescription>Manage your current and previous promotional messages</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6 rounded-lg">
                    <Dialog>
                        <DialogTrigger>
                            <Button className='flex items-center gap-2'>
                                <Send /> Send New Promotion
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-sm'>
                            <DialogHeader>
                                <DialogTitle className="text-lg text-left font-semibold">Add New Promotion</DialogTitle>
                            </DialogHeader>
                            <AddPromotionForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
            <div className='p-4 max-w-4xl'>
                <h2 className='font-bold mb-4'>Latest promotions</h2>
                {promotions?.map((promotion) => <>
                    <Card key={promotion.notificationId} className="mb-4">
                        <CardContent className="flex items-start p-4">
                            <div className="mr-4 mt-1">
                                <GiftIcon />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold">{promotion.notificationTitle}</h3>
                                <p className="text-sm text-primary font-semibold">{promotion?.notificationContent}</p>
                                <p className="text-xs  mt-1">{new Date(promotion.notificationDate).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </>)}</div>

        </Card>

    )
}


function AddPromotionForm() {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            notificationTitle: '',
            notificationContent: '',
        }
    });
    const addNotification = useCreateNotification();
    const handlePromotion = (data: Promotion) => {
        console.log('promotion', data)
        addNotification.mutate({ notificationContent: data.notificationContent, notificationTitle: data.notificationTitle, notificationType: 0, notificationContext: 1 })
    }
    return (
        //@ts-ignore
        <form onSubmit={handleSubmit(handlePromotion)}>
            <div >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            {...register("notificationTitle")}
                            placeholder="Enter promotion title"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            {...register("notificationContent")}
                            placeholder="Enter promotion message"
                            required
                        />
                    </div>
                </div>
                <div className='py-4'>
                    <Button type="submit" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add Promotion
                    </Button>
                </div>
            </div>
        </form>

    )
}
