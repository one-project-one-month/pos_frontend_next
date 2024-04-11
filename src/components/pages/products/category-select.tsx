"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ProductCategory } from "@prisma/client";
import { UseFormSetValue } from "react-hook-form";

type SetValue = UseFormSetValue<{
    productName: string;
    price: number;
    productCode: string;
    categoryCode: string;
}>;

interface Props {
    setValue: SetValue;
    values?: ProductCategory[];
    value: string;
}

const SelectScrollable = ({ setValue, values, value }: Props) => {
    return (
        <Select onValueChange={(value) => setValue("categoryCode", value)} value={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Product Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Product Category</SelectLabel>
                    {values && values.length ? (
                        values.map((pc) => (
                            <SelectItem key={pc.productCategoryId} value={pc.productCategoryCode}>
                                {pc.productCategoryCode} : {pc.productCategoryName}
                            </SelectItem>
                        ))
                    ) : (
                        <div>No Category</div>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
export default SelectScrollable;
