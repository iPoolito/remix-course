import type { Prisma, RestaurantType } from '@prisma/client';
import { db } from '~/utils/db.server';

type CreateRestaurantPayload = {
    name: string;
    foods: string;
    typeId: RestaurantType['id'];
};

type UpdateRestaurantRatingPayload = {
    restaurantId: RestaurantType['id'];
    rating: number;
};

export function createRestaurant({
    name,
    foods,
    typeId,
}: CreateRestaurantPayload) {
    return db.restaurant.create({
        data: {
            name,
            rating: 0,
            restaurantTypeId: typeId,
            foods: {
                create: foods.split(',').map((food) => ({
                    name: food,
                })),
            },
        },
    });
}

export function getRestaurants(order: string) {
    const [key, value] = order.split('-');

    if (key === 'menu') {
        return db.restaurant.findMany({
            orderBy: {
                foods: {
                    _count: value as Prisma.SortOrder,
                },
            },
            include: {
                foods: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
        });
    }

    return db.restaurant.findMany({
        orderBy: {
            [key]: value,
        },
        include: {
            foods: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
    });
}

export function getRestaurantById(id: RestaurantType['id']) {
    return db.restaurant.findUnique({
        where: {
            id,
        },
        include: {
            type: true,
            comments: {
                select: {
                    creator: true,
                    text: true,
                    id: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
            foods: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
    });
}

export function updateRestaurantRating({
    restaurantId: id,
    rating,
}: UpdateRestaurantRatingPayload) {
    return db.restaurant.update({
        where: {
            id,
        },
        data: {
            rating: {
                increment: rating,
            },
            visitors: {
                increment: 1,
            },
        },
    });
}

export async function getChefsRecommendation() {
    // create a function that delays time
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    // delay 2 seconds
    await delay(3000);

    return db.restaurant.findMany({
        orderBy: {
            rating: 'desc',
        },
        take: 3,
        include: {
            foods: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
    });
}