import type { DataFunctionArgs, V2_MetaFunction } from '@remix-run/node';
import { z } from 'zod';
import { AuthForm } from '~/components/AuthForm';
import { createUser } from '~/models/user.server';
import { createUserSession } from '~/utils/session.server';

export const meta: V2_MetaFunction = () => [{ title: 'Create an account' }];

export async function action({ request }: DataFunctionArgs) {
    const formData = await request.formData();

    const name = formData.get('user-name');
    const email = formData.get('email');
    const password = formData.get('password');

    const schema = z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(2).max(10),
    });

    const payload = schema.parse({
        name,
        email,
        password,
    });

    const user = await createUser(payload);
    return createUserSession({ request, userId: user.id, redirectTo: '/' });
}

export default function Register() {
    return (
        <AuthForm
            action='/register'
            title='Create an account'
            buttonText='Create account'
            type='register'
        />
    );
}