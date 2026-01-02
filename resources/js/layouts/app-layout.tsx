import {ReactNode} from "react";
import AppHeader from "@/components/app-header";
import {Toaster} from "sonner";

interface AppLayoutProps {
    children:ReactNode;
}


export default function AppLayout({children}:AppLayoutProps){
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
