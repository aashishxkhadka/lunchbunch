
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {  useUserRegister } from "../../queries/queries"
import { toast } from "../../hooks/use-toast"

export function Signup({ user, onSwitchToLogin }: { user: boolean, onSwitchToLogin: () => void }) {
    const signup = useUserRegister();
    const { register, handleSubmit } = useForm();
    function handleSignup(data: any) {
        const password = document.getElementById('password') as HTMLInputElement;
        const confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;
        if (password.value !== confirmPassword.value) {
            toast({
                title: 'Passwords do not match',
                variant: 'warning',
            })
            return;
        } else {
            console.log('signup data', data)
            if (user) {
                signup.mutate(data);
                onSwitchToLogin();
            }
        }
    }
    return (
        <Card className="mx-auto max-w-sm ">
            <form onSubmit={handleSubmit(handleSignup)}>
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="gap-4">
                            <Label htmlFor="name">Name </Label>
                            <Input id="name" placeholder="Matt Robinson" {...register("username")} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input type="date" id="dob" {...register("dateOfBirth")} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register("password")} id="password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Button
                            onClick={onSwitchToLogin}
                            className="-ml-4 underline"
                            variant={'link'}>
                            Sign in
                        </Button>
                    </div>
                </CardContent>
            </form>
        </Card>
    )
}
