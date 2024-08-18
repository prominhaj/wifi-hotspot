'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='w-screen flex items-center h-[80vh] justify-center'>
            <Card className="max-w-sm">
                <CardHeader>
                    Something went wrong!
                </CardHeader>
                <CardContent>
                    <p className='text-red-500 text-center text-wrap'>
                        {error.message}
                    </p>
                    <Button
                        variant="destructive"
                        className="mx-auto mt-5"
                        onClick={
                            () => reset()
                        }
                    >
                        Try again
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}