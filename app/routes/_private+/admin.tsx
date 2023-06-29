import { useUser } from '~/hooks/useUser';

export default function Admin() {
    const { user } = useUser();
    return <h1>hola {user?.name}!</h1>;
}