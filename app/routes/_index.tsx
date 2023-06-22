import { type DataFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { createNote, getAllNote } from "~/models/note.server";


export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('note-name')
  const content = formData.get('note-content')
  if (typeof name !== 'string' || typeof content !== 'string') {
    throw new Error('Invalid form data')
  }
  await createNote({ name, content })
  return null
}
export async function loader(_: DataFunctionArgs) {
  const notes = await getAllNote()
  return json({ notes })
}


export default function Index() {
  const { notes } = useLoaderData<typeof loader>()
  const fetcher = useFetcher()
  return (
    <main>
      <section>
        <h1 className="text-3xl font-bold">
          Notes
        </h1>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link to={`/note/${note.id}`} className="underline underline-offset-2" prefetch="intent">
                {note.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <h2 className="text-3xl font-bold">Create note</h2>
      <Form method="post" action="/?index" className="">
        <div>
          <label htmlFor="note-name"
            className="block text-sm font-mediium leading-6 text-gray-900">
            Name
          </label>
          <input type="text" id="note-name" name="note-name"
            className="border-solid border-black border-1" />
        </div>
        <div>
          <label htmlFor="note-content" className="block text-sm font-mediium leading-6 text-gray-900">
            Content
          </label>
          <input type="text" id="note-content" name="note-content" />
        </div>
        <button className="rounded-md bg-blue-400">
          {fetcher.state === 'submitting' ? 'Creating note...' : 'Create note'}</button>
      </Form>
    </main>
  );
}
