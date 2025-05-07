import {  BellRing, History, NotepadText, User } from "lucide-react";

export const menuList = [
    {
        label:"Purchase History",
        path: "/me/purchase",
        icon: <History/>
    },
    {
        label:"My Reviews",
        path: "/",
        icon: <NotepadText/>
    },
    {
        label:"Notifications",
        path: "",
        icon: <BellRing/>
    },
]