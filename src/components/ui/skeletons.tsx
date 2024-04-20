export const ShopProductsSkeleton = ({ count = 20 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className="col-span-1 h-[89px] animate-pulse rounded-md bg-primary/10"
                    />
                );
            })}
        </>
    );
};

export const TableSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="h-[36px] w-[280px] animate-pulse rounded-md bg-primary/10"></div>
            </div>
            <div className="h-[500px] w-full animate-pulse rounded-md bg-primary/10"></div>
            <div className="flex items-center justify-between">
                <div></div>
                <div className="h-[36px] w-[190px] animate-pulse rounded-md bg-primary/10"></div>
            </div>
        </div>
    );
};

export const FormSkeleton = () => {
    return <div className="h-[500px] w-full animate-pulse rounded-md bg-primary/10"></div>;
};
