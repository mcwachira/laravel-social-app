import AppHeaderLogo from "@/components/app-header-logo";
import AppHeaderLink from "@/components/app-header-link";
import {Link} from "@inertiajs/react";
import {Button} from "@/components/ui/button";
import {create, index} from "@/actions/App/Http/Controllers/PostController";
import home from "@/routes/home";
import about from "@/routes/about";

export default function AppHeader() {
    return (
        <header>
<div className="max-w-4xl mx-auto px-4 py-4">

    <nav className="flex items-center justify-between">
<AppHeaderLogo/>


        <div className="flex space-x-6 items-center">

     <Button>
         <Link href={create()}> Add Posts</Link>
     </Button>
            <AppHeaderLink href={home.index().url}>
                Home
            </AppHeaderLink>
            <AppHeaderLink href={about.index().url}>
                About
            </AppHeaderLink>
            <AppHeaderLink href={index().url}>
                Posts
            </AppHeaderLink>
        </div>
</nav>
</div>
        </header>
    )
}
