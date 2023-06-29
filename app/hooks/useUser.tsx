import type { User } from '@prisma/client';
import { useRouteLoaderData } from '@remix-run/react';

export function useUser() {
    const data = useRouteLoaderData('root');

    function getRootUser(): User | null {
        return (data as any).user;
    }

    const user = getRootUser();

    return {
        user,
    };
}