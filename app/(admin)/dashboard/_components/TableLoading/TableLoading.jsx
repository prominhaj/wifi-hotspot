import { Skeleton } from "@/components/ui/skeleton"

const TableLoadingUI = () => {
    return (
        <div className="w-full pt-3 md:pt-5">
            <div className="border rounded-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-muted/50">
                                <th className="p-3 font-medium text-left">
                                    <Skeleton className="w-20 h-4" />
                                </th>
                                <th className="p-3 font-medium text-left">
                                    <Skeleton className="w-24 h-4" />
                                </th>
                                <th className="p-3 font-medium text-left">
                                    <Skeleton className="w-16 h-4" />
                                </th>
                                <th className="p-3 font-medium text-left">
                                    <Skeleton className="w-20 h-4" />
                                </th>
                                <th className="p-3 font-medium text-left">
                                    <Skeleton className="w-16 h-4" />
                                </th>
                                <th className="p-3 font-medium text-left">
                                    <Skeleton className="w-20 h-4" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(8)].map((_, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">
                                        <Skeleton className="w-24 h-4" />
                                    </td>
                                    <td className="p-3">
                                        <Skeleton className="w-32 h-4" />
                                    </td>
                                    <td className="p-3">
                                        <Skeleton className="w-16 h-4" />
                                    </td>
                                    <td className="p-3">
                                        <Skeleton className="w-20 h-4" />
                                    </td>
                                    <td className="p-3">
                                        <Skeleton className="w-16 h-4" />
                                    </td>
                                    <td className="p-3">
                                        <Skeleton className="w-20 h-4" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TableLoadingUI;