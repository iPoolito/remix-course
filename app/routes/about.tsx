import type { HeadersFunction } from '@remix-run/node';

export const headers: HeadersFunction = () => {
    return {
        'Cache-Control': 'max-age=300, s-maxage=3600',
    };
};

export default function About() {
    return (
        <main className='mx-auto py-20 max-w-7xl sm:px-6 lg:px-8'>
            <div className='px-4 sm:px-6 lg:px-8'>
                <h1>About</h1>
            </div>
        </main>
    );
}