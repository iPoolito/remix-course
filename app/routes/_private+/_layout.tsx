import type { DataFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: DataFunctionArgs) {
    await authenticator.isAuthenticated(request, { failureRedirect: '/login' });
    return null;
}

export default function PrivateLayout() {
    return <Outlet />;
}