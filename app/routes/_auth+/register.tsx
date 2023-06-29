import { SignUp } from '@clerk/remix';
import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => [{ title: 'Create an account' }];

export default function Register() {
    return (
        <div>
            <h1>Sign Up route</h1>
            <SignUp />
        </div>
    );
}