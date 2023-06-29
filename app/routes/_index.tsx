import { SignOutButton, SignedIn, UserButton } from '@clerk/remix';
import {
  json,
  type DataFunctionArgs,
  type V2_MetaFunction,
} from '@remix-run/node';
import { z } from 'zod';
import { RestaurantHeader } from '~/components/RestaurantHeader';
import { RestaurantTable } from '~/components/RestaurantTable';
import { createRestaurant, getRestaurants } from '~/models/restaurant.server';
import { getAllRestaurantTypes } from '~/models/restauranttype.server';
import { ORDER_OPTIONS } from '~/types/orderby';

const DEFAULT_ORDER = ORDER_OPTIONS[0].value;

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Restaurantes' }];
};

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const order = url.searchParams.get('orderBy') || DEFAULT_ORDER;

  const [restaurantTypes, restaurants] = await Promise.all([
    getAllRestaurantTypes(),
    getRestaurants(order),
  ]);

  return json(
    { restaurantTypes, restaurants }
    // {
    //   headers: {
    //     'Cache-Control':
    //       'public, max-age=3600, s-maxage=3600, stale-while-revalidate',
    //   },
    // }
  );
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get('restaurant-name');
  const typeId = formData.get('restaurant-type');
  const foods = formData.get('restaurant-menu');

  const schema = z.object({
    name: z.string().nonempty(),
    typeId: z.number(),
    foods: z.string().nonempty(),
  });

  const payload = schema.parse({
    name,
    typeId: Number(typeId),
    foods,
  });

  await createRestaurant(payload);
  return null;
}

export default function Index() {
  return (
    <main className='mx-auto py-20 max-w-7xl sm:px-6 lg:px-8'>
      <div className='px-4 sm:px-6 lg:px-8'>
        {/* <Form method='POST' action='/logout'>
          <button type='submit'>Logout</button>
        </Form> */}
        <div className='border-red-500'>
          <SignOutButton />
        </div>
        <SignedIn>
          <h1>Index route</h1>
          <p>You are signed in!</p>
          <UserButton />
        </SignedIn>

        <RestaurantHeader />
        <RestaurantTable />
      </div>
    </main>
  );
}