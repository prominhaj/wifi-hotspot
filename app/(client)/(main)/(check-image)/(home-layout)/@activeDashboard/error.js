'use client';

import ErrorContent from '@/components/globals/Error/ErrorContent';

const ActiveDashboardError = ({ error, reset }) => {
    return (
        <div className='w-full flex items-center h-[70vh] justify-center'>
            <ErrorContent reset={reset} error={error} />
        </div>
    );
};

export default ActiveDashboardError;
