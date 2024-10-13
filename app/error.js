'use client';
import ErrorContent from '@/components/globals/Error/ErrorContent';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className='w-full flex items-center h-[70vh] justify-center bello-test'>
            <ErrorContent reset={reset} error={error} />
        </div>
    );
}
