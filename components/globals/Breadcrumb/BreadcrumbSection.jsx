import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Fragment } from 'react';

const BreadcrumbSection = ({ items }) => {
    return (
        <Breadcrumb className='px-6 pt-3'>
            <BreadcrumbList>
                {
                    items?.map((item, index) => (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                {item?.href ? (
                                    <Link href={item.href}>
                                        {item.label}
                                    </Link>
                                ) : (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {
                                !item?.current && <BreadcrumbSeparator key={`sep-${index}`} />
                            }
                        </Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbSection;
