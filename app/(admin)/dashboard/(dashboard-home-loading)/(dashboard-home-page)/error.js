'use client';
import ErrorContent from '@/components/globals/Error/ErrorContent';

export default function Error({ error, reset }) {
    return (
        <div className='w-full flex items-center h-[70vh] justify-center'>
            <ErrorContent reset={reset} error={error} />
        </div>
    );
}
