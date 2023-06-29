import { SignIn } from '@clerk/remix';
import {
    json,
    type DataFunctionArgs,
    type V2_MetaFunction,
} from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { FormStrategy } from 'remix-auth-form';
import { z } from 'zod';
import { AuthForm } from '~/components/AuthForm';
import { verifyLogin } from '~/models/user.server';
import { authenticator } from '~/services/auth.server';
import { createUserSession } from '~/utils/session.server';

export const meta: V2_MetaFunction = () => [{ title: 'Login' }];

export default function Login() {
    // const actionData = useActionData<typeof action>();

    return (
        <>
            <SignIn />
        </>
    );
}