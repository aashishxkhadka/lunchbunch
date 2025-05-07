import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Link } from "@tanstack/react-router";
import { useAdminLogin, useUserLogin } from "../../queries/queries";
import { useForm } from "react-hook-form";
import { cn } from "../../lib/utils";

const Login = ({ user, onSwitchToSignup }: { user?: boolean, onSwitchToSignup?: () => void }) => {
    const login = useUserLogin();
    const adminLogin = useAdminLogin();
    function handleLogin(data: any) {
        console.log('login data', data)
        if (user) {
            login.mutate(data);
        }
        else {
            adminLogin.mutate(data);
        }
    }
    const { register, handleSubmit } = useForm();
    return (
        <div className={cn(!user && " h-[100vh] flex flex-col items-center justify-center")}>
            <Card className=" mx-auto max-w-sm">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
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
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input {...register("password")} id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            {(user == true) &&
                                <>
                                    Don&apos;t have an account?{" "}
                                    <Button
                                        onClick={onSwitchToSignup}
                                        className="-ml-4 underline"
                                        variant={'link'}>
                                        Sign up
                                    </Button>
                                </>
                            }
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    )
}

export default Login
