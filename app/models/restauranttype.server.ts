import { db } from '~/utils/db.server';

export function getAllRestaurantTypes() {
    return db.restaurantType.findMany({ select: { name: true, id: true } });
}