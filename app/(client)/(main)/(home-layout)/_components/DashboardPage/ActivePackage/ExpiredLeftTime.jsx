"use client";
import { calculateProgress } from '@/lib/convertData';
import { useState, useEffect } from 'react';

const ExpiredLeftTime = ({ expiredDate, validity }) => {
    const [remainingInfo, setRemainingInfo] = useState({ remainingTime: '', timeUnit: '' });

    useEffect(() => {
        const interval = setInterval(() => {
            const { remainingTime, timeUnit } = calculateProgress(expiredDate, validity);
            setRemainingInfo({ remainingTime, timeUnit });
        }, 1000);

        return () => clearInterval(interval);
    }, [expiredDate, validity]);

    return (
        <div className="font-medium">
            {remainingInfo.remainingTime && (
                <div>
                    {remainingInfo.timeUnit
                        ? `${remainingInfo.remainingTime} ${remainingInfo.timeUnit} Left`
                        : `${remainingInfo.remainingTime} Left`}
                </div>
            )}
        </div>
    );
};

export default ExpiredLeftTime;
