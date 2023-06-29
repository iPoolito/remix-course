import type { DataFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export function action({ request }: DataFunctionArgs) {
    return authenticator.logout(request, { redirectTo: '/login' });
}