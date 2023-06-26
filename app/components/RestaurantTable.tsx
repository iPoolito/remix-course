import { Link, useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/_index';
import { ORDER_OPTIONS } from '~/types/orderby';
import { OrderDropdown } from './OrderDropdown';

export function RestaurantTable() {
    const { restaurants } = useLoaderData<typeof loader>();

    return (
        <>
            <div className='w-fit ml-auto mt-10'>
                <OrderDropdown options={ORDER_OPTIONS} />
            </div>
            <div className='mt-8 flow-root'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                        <table className='min-w-full divide-y divide-gray-300'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                                    >
                                        Nombre
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                        Menu
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                        Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {restaurants.map((restaurant) => (
                                    <tr key={restaurant.id}>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                            <Link
                                                to={`restaurant/${restaurant.id}`}
                                                className='underline'
                                            >
                                                {restaurant.name}
                                            </Link>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                            {restaurant.foods.length}
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                            {restaurant.rating}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}