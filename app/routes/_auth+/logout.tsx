import type { DataFunctionArgs } from '@remix-run/node';
import { logout } from '~/utils/session.server';

export function action({ request }: DataFunctionArgs) {
    return logout(request, '/login');
}