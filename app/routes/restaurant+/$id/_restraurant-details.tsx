import * as React from 'react';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { json, type DataFunctionArgs, defer } from '@remix-run/node';
import { Await, useLoaderData, useRouteError } from '@remix-run/react';
import { Form, Link } from 'react-router-dom';
import { ZodError, z } from 'zod';
import {
    getChefsRecommendation,
    getRestaurantById,
    updateRestaurantRating,
} from '~/models/restaurant.server';
import { twMerge } from 'tailwind-merge';
import { createComment } from '~/models/comment.server';
import { getRatingAverage } from '~/utils/rating';
import { formatRelativeTime } from '~/utils/time';

export async function loader({ params }: DataFunctionArgs) {
    const id = params.id;

    const parser = z.number();
    const safeId = parser.parse(Number(id));

    const restaurant = await getRestaurantById(safeId);
    if (!restaurant) throw new Error('Restaurant not found');

    // create fake promise that takes 3 seconds to resolve
    const chefsRecommendation = getChefsRecommendation();

    return defer({ restaurant, chefsRecommendation });
}

export async function action({ request, params }: DataFunctionArgs) {
    const id = params.id;
    const formData = await request.formData();

    const creator = formData.get('creator');
    const text = formData.get('comment');
    const rating = formData.get('rating');

    const parser = z.number();
    const restaurantId = parser.parse(Number(id));

    const commentSchema = z.object({
        creator: z.string().nonempty(),
        text: z.string().nonempty(),
        restaurantId: z.number(),
    });

    const ratingSchema = z.object({
        rating: z.number().int().min(1).max(5),
        restaurantId: z.number(),
    });

    const commentPayload = commentSchema.parse({
        creator,
        text,
        restaurantId: Number(restaurantId),
    });

    const ratingPayload = ratingSchema.parse({
        rating: Number(rating),
        restaurantId: Number(restaurantId),
    });

    await updateRestaurantRating(ratingPayload);
    await createComment(commentPayload);

    return null;
}

export default function RestaurantDetails() {
    const { restaurant, chefsRecommendation } = useLoaderData<typeof loader>();
    const [hoveredStar, setHoveredStar] = React.useState<number | null>(null);
    const [rating, setRating] = React.useState<number>(0);
    const restaurantRating = Math.ceil(
        getRatingAverage(restaurant.rating, restaurant.visitors)
    );
    const ratingArr = Array.from({ length: restaurantRating }, (_, i) => i + 1);
    const maxRating = 5;

    function handleStarClick(star: number) {
        setRating(star + 1);
        setHoveredStar(star);
    }

    return (
        <main className='mx-auto py-20 max-w-7xl sm:px-6 lg:px-8'>
            <h1 className='text-4xl font-medium'>{restaurant.name}</h1>
            <p className='text-2xl'>{restaurant.type.name}</p>

            <React.Suspense fallback={<></>}>
                <Await resolve={chefsRecommendation}>
                    {(data) => (
                        <section className='absolute right-4 top-4 p-4'>
                            <h2>Recomendacion del chef:</h2>
                            <p>{data[0].foods[0].name}</p>
                        </section>
                    )}
                </Await>
            </React.Suspense>

            <section className='mt-10'>
                <h2 className='text-2xl font-medium'>Menu</h2>
                <ul className='list-disc text-xl'>
                    {restaurant.foods.map((food) => (
                        <li className='ml-4' key={food.id}>
                            {food.name}
                        </li>
                    ))}
                </ul>
            </section>

            <section className='mt-10'>
                <h2 className='text-2xl font-medium'>Rating</h2>
                <div className='flex'>
                    {Array.from(Array(maxRating).keys()).map((_, i) => (
                        <StarIconOutline
                            key={i}
                            className={twMerge('h-5 w-5', ratingArr[i] && 'fill-black')}
                        />
                    ))}
                </div>
            </section>

            <section className='mt-10'>
                <h2 className='text-2xl font-medium'>Comentarios</h2>
                <ul className='space-y-4'>
                    {restaurant.comments.map((comment) => (
                        <li key={comment.id}>
                            <span className='flex items-center'>
                                <p className='font-medium'>{comment.creator}</p>{' '}
                                <time className='text-sm ml-2'>
                                    ({formatRelativeTime(comment.createdAt)})
                                </time>
                            </span>
                            <p>{comment.text}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className='mt-20'>
                <h2 className='text-2xl font-medium'>Agrega tu comentario</h2>
                <Form method='post' className='space-y-4 mt-4 flex flex-col'>
                    <div>
                        <label
                            htmlFor='creator'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Nombre
                        </label>
                        <div className='mt-2'>
                            <input
                                type='text'
                                name='creator'
                                id='creator'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                placeholder='Panchito'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='comment'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Agrega tus comentarios
                        </label>
                        <div className='mt-2'>
                            <textarea
                                rows={4}
                                name='comment'
                                id='comment'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                    <div>
                        <p>Rating</p>
                        <div className='flex'>
                            {Array.from(Array(maxRating).keys()).map((_, i) => (
                                <StarIconOutline
                                    key={i}
                                    className={twMerge(
                                        'h-5 w-5 hover:cursor-pointer',
                                        hoveredStar !== null && i <= hoveredStar && 'fill-black'
                                    )}
                                    onClick={() => handleStarClick(i)}
                                    onMouseEnter={() => setHoveredStar(i)}
                                />
                            ))}
                        </div>
                        {rating ? (
                            <input name='rating' type='hidden' value={rating} readOnly />
                        ) : null}
                    </div>
                    <button
                        disabled={rating === 0}
                        type='submit'
                        className='w-fit disabled:opacity-50 self-end rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Agregar comentario
                    </button>
                </Form>
            </section>
        </main>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (error instanceof ZodError || (error as ZodError).message) {
        console.error(error);
        return (
            <main className='mx-auto py-20 max-w-7xl sm:px-6 lg:px-8'>
                <h1 className='text-2xl font-medium'>Whoops, algo salió mal!</h1>
                <section className='my-4 p-6 border bg-gray-100 rounded-lg'>
                    {(error as ZodError).message}
                </section>
                <Link className='underline underline-offset-2' to='.'>
                    Intenta de nuevo!
                </Link>
            </main>
        );
    }

    return (
        <main className='mx-auto py-20 max-w-7xl sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-medium'>Restaurante no encontrado!</h1>
            <Link className='underline underline-offset-2' to='/'>
                Buscar otros restaurantes!
            </Link>
        </main>
    );
}