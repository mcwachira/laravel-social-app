import {ReactNode, useEffect} from "react";
import AppHeader from "@/components/app-header";
import {toast, Toaster} from "sonner";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

interface AppLayoutProps {
    children:ReactNode;
}


export default function AppLayout({children}:AppLayoutProps){

    const {flash} = usePage<PageProps>().props

    useEffect(() => {

        if(flash.success){
            toast(flash.success)
        }

        if(flash.error){
            toast(flash.error)
        }
    },[flash])
    return (
        <div className="min-h-screen bg-background">

            <AppHeader/>
<main className="w-4xl mx-auto px-4 py-8">

        {children}
<Toaster/>
</main>
        </div>
    )
}
