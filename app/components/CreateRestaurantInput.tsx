import { useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/_index';

type Props = React.HTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    type: 'text' | 'textarea' | 'select';
};

export function CreateRestaurantInput(props: Props) {
    const { label, ...rest } = props;
    const { restaurantTypes } = useLoaderData<typeof loader>();

    const options = restaurantTypes.map((type) => ({
        value: type.id,
        label: type.name,
    }));

    if (rest.type === 'text') {
        return (
            <div>
                <label
                    htmlFor={rest.id}
                    className='block text-sm font-medium leading-6 text-gray-900'
                >
                    {label}
                </label>
                <div className='mt-2'>
                    <input
                        {...rest}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>
        );
    }

    if (rest.type === 'textarea') {
        return (
            <div>
                <label
                    htmlFor={rest.id}
                    className='block text-sm font-medium leading-6 text-gray-900'
                >
                    {label}
                </label>
                <div className='mt-2'>
                    <textarea
                        rows={4}
                        name={rest.name}
                        id={rest.id}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>
        );
    }

    if (rest.type === 'select') {
        return (
            <div>
                <label
                    htmlFor={rest.id}
                    className='block text-sm font-medium leading-6 text-gray-900'
                >
                    {label}
                </label>
                <select
                    id={rest.id}
                    name={rest.name}
                    className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}