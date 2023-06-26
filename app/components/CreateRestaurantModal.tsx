import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Form, useNavigation } from '@remix-run/react';
import { CreateRestaurantInput } from './CreateRestaurantInput';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export function CreateRestaurantModal({ open, setOpen }: Props) {
    const cancelButtonRef = React.useRef(null);
    const navigation = useNavigation();

    React.useEffect(() => {
        if (navigation.state === 'submitting') {
            setOpen(false);
        }
    }, [navigation.state, setOpen]);

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={React.Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                                <div className='mt-3 text-center sm:mt-5'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-base font-semibold leading-6 text-gray-900'
                                    >
                                        Crear restaurante
                                    </Dialog.Title>
                                </div>

                                <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                                    <Form
                                        id='create-restaurant-form'
                                        method='post'
                                        action='/?index'
                                        className='col-span-full space-y-4'
                                    >
                                        <CreateRestaurantInput
                                            label='Nombre'
                                            id='restaurant-name'
                                            name='restaurant-name'
                                            type='text'
                                        />
                                        <CreateRestaurantInput
                                            label='Tipo de comida'
                                            id='restaurant-type'
                                            name='restaurant-type'
                                            type='select'
                                        />
                                        <CreateRestaurantInput
                                            label='Menú'
                                            id='restaurant-menu'
                                            name='restaurant-menu'
                                            type='textarea'
                                        />
                                    </Form>
                                    <div className='py-2 col-span-full' />
                                    <button
                                        type='submit'
                                        form='create-restaurant-form'
                                        className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2'
                                    >
                                        Crear
                                    </button>
                                    <button
                                        type='button'
                                        className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}