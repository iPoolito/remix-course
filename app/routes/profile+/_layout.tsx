

import { type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";

export function loader(_: LoaderArgs) {
    console.log('el layouit')
    const user = {
        id: 1,
        name: 'Jhon Doe'
    }
    return user
}

export default function Layout() {

    const user = useLoaderData<typeof loader>()

    return (
        <Outlet context={user} />
    )

}

export function useProfileContext() {
    return useOutletContext<typeof loader>()
}
