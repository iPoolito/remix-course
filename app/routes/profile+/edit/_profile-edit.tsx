import { type ActionArgs, type LoaderArgs } from "@remix-run/node"
import { useProfileContext } from "../_layout"
import { Form } from "@remix-run/react"

export async function action({ request }: ActionArgs) {
    const formData = await request.formData()
    const name = formData.get('fullName')
    console.log('que pedo', { name })
    return null
}

export function loader(_: LoaderArgs) {
    console.log('el loader')
    return null
}


export default function ProfileEdit() {
    const user = useProfileContext()

    return (
        <>
            <h1>EL  PROFILE Edit {user.name} </h1>
            <Form method="post">
                <input type="search" name="fullName" defaultValue={user.name} />
                <button >Submit</button>
            </Form>
        </>
    )

}