export const ShopProductsSkeleton = ({ count = 20 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className="col-span-1 h-[82px] animate-pulse rounded-md bg-primary/10"
                    />
                );
            })}
        </>
    );
};
