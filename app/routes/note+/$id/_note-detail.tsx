import { redirect, type DataFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getNoteById } from "~/models/note.server";


export async function loader({ params }: DataFunctionArgs) {
    const { id } = params
    if (!id) {
        return redirect('/404')
    }
    const note = await getNoteById(Number(id))
    if (!note) {
        return redirect('/')
    }

    return json({ note })
}


export default function NoteDetail() {
    const { note } = useLoaderData<typeof loader>()
    return (
        <div>
            <h1>{note.name}</h1>
            <p>{note.content}</p>
            <Link to='..'>
                Go back!
            </Link>
        </div>
    )

}


export function ErrorBoundary() {
    return <>Oh no!</>
}