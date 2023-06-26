import { db } from '~/utils/db.server';

type CreateCommentPayload = {
    creator: string;
    text: string;
    restaurantId: number;
};

export function createComment(data: CreateCommentPayload) {
    return db.comment.create({ data });
}