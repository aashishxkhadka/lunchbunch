import { ScrollArea } from "../../components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import Login from "./login"
import { Signup } from "./signup"
import { useState } from "react"
export const AdminAuthentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const activeTab = isLogin ? 'login' : 'signup';
    return (
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={() => setIsLogin(!isLogin)} className="max-w-sm mx-auto mt-4">
            <TabsList className="w-full">
                <TabsTrigger value="login" className="w-full">Login</TabsTrigger>
                <TabsTrigger value="signup" className="w-full">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Login onSwitchToSignup={() => setIsLogin(false)} />
            </TabsContent>
            <TabsContent value="signup">
                <Signup onSwitchToLogin={() => setIsLogin(true)} />
            </TabsContent>

        </Tabs>
    )
} 
