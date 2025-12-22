import React from 'react';
import {Link} from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout";
function Home() {
    return (
        <AppLayout>

            <h1>
                Home
            </h1>
            <div>
                Welcome to Home Page
            </div>

            <Link href="/about">
                About Page
            </Link>
        </AppLayout>
    );
}

export default Home;
