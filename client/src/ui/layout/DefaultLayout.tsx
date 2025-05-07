import { Outlet } from '@tanstack/react-router';
import { Navbar } from './navbar';
import { cn } from '../../lib/utils';

export const DefaultLayout = () => {
    const isDashboard = window.location.pathname.includes('admin');
    return (
        <>
            {!isDashboard && <Navbar />}
            <main className={cn('overflow-auto', !isDashboard ? "mt-14 mb-12" : "mt-0")}>
                <Outlet />
            </main>
        </>
    );
};
