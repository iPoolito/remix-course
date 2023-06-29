import { NavLink } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';

export function Navbar() {
    return (
        <nav className='bg-gray-800'>
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-x-4 p-4'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        twMerge('text-white', isActive && 'underline')
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to='/about'
                    className={({ isActive }) =>
                        twMerge('text-white', isActive && 'underline')
                    }
                >
                    About
                </NavLink>
            </div>
        </nav>
    );
}