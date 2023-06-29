import type { User } from '@prisma/client';
import { db } from '~/utils/db.server';
import bcrypt, { hashSync } from 'bcryptjs';

type CreateUserPayload = {
    email: string;
    name: string;
    password: string;
};

type VerifyLoginPayload = {
    email: string;
    password: string;
};

export async function getUserById(id: User['id']) {
    return db.user.findUnique({ where: { id } });
}

export async function checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

export async function createUser({ email, name, password }: CreateUserPayload) {
    const hashedPassword = await hashPassword(password);
    console.log(email)
    return db.user.create({
        data: {
            email,
            name,
            passwordHash: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });
}

export async function verifyLogin({ email, password }: VerifyLoginPayload) {
    const user = await db.user.findUnique({
        where: { email },
        include: { passwordHash: true },
    });

    if (!user) return null;

    const hashedPassword = user.passwordHash?.hash;
    if (hashedPassword === undefined) return null;

    const isPasswordValid = await checkPassword(password, hashedPassword);
    if (!isPasswordValid) return null;

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
}