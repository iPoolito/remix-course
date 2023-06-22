import type { Note } from "@prisma/client";
import { db } from "~/utils/db.server";

type CreateNotePayload = {
    name: Note['name']
    content: Note['content']
}

export async function getAllNote() {
    return db.note.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function createNote(data: CreateNotePayload) {
    return db.note.create({ data })
}

export async function getNoteById(id: Note['id']) {
    return db.note.findUnique({
        where: {
            id
        }
    })
}