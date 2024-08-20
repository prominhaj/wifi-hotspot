'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ErrorContent = ({ reset, error }) => {

    const refresh = () => {
        window.location.reload();
    }

    return (
        <Card className='max-w-sm border bg-light-card-bg/20 dark:bg-dark-card-bg/20'>
            <CardHeader className="font-semibold">Something went wrong!</CardHeader>
            <CardContent>
                <p className='text-center text-wrap'>
                    Message: <span className='text-red-500'>{error.message}</span>
                </p>
                <div className='flex items-center justify-center gap-3 mt-3'>
                    <Button variant='destructive' onClick={() => reset()}>
                        Try again
                    </Button>
                    <Button onClick={refresh} variant='default'>
                        Refresh
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ErrorContent;