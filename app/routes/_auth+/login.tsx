import {
    json,
    type DataFunctionArgs,
    type V2_MetaFunction,
} from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { z } from 'zod';
import { AuthForm } from '~/components/AuthForm';
import { verifyLogin } from '~/models/user.server';
import { createUserSession } from '~/utils/session.server';

export const meta: V2_MetaFunction = () => [{ title: 'Login' }];

export async function action({ request }: DataFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(2).max(10),
    });

    const payload = schema.parse({ email, password });
    const user = await verifyLogin(payload);

    if (!user) {
        return json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return createUserSession({ request, userId: user.id, redirectTo: '/' });
}

export default function Login() {
    const actionData = useActionData<typeof action>();

    return (
        <>
            {actionData?.message && (
                <p className='text-red-500'>{actionData.message}</p>
            )}
            <AuthForm action='/login' title='Login' buttonText='Login' type='login' />
        </>
    );
}