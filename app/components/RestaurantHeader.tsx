import * as React from 'react';
import { CreateRestaurantModal } from './CreateRestaurantModal';

export function RestaurantHeader() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                    <h1 className='text-base font-semibold leading-6 text-gray-900'>
                        Restaurantes
                    </h1>
                    <p className='mt-2 text-sm text-gray-700'>
                        Lista de restaurantes curados por el equipo de Remix Mexico.
                    </p>
                </div>
                <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
                    <button
                        type='button'
                        onClick={() => setOpen(true)}
                        className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Agregar restaurante
                    </button>
                </div>
            </div>
            <CreateRestaurantModal setOpen={setOpen} open={open} />
        </>
    );
}