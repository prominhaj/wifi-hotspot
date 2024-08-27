"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PaymentRefundForm from '../../../_components/PaymentRefundForm';

const Modal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { back } = useRouter();

    const handleClose = () => {
        back()
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose} defaultOpen={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Payment Refund</DialogTitle>
                </DialogHeader>
                <div className='py-3'>
                    <PaymentRefundForm />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;