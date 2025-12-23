import AppHeaderLogo from "@/components/app-header-logo";
import AppHeaderLink from "@/components/app-header-link";
import {Link} from "@inertiajs/react";

export default function AppHeader() {
    return (
        <header>
<div className="max-w-4xl mx-auto px-4 py-4">

    <nav className="flex items-center justify-between">
<AppHeaderLogo/>


        <div className="flex space-x-6 ">

            <Link href="/posts/create"> Add Posts</Link>
            <AppHeaderLink href="/">
                Home
            </AppHeaderLink>
            <AppHeaderLink href="/about">
                About
            </AppHeaderLink>
            <AppHeaderLink href="/post">
                Post
            </AppHeaderLink>
        </div>
</nav>
</div>
        </header>
    )
}
