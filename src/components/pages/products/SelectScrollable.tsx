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
import { data } from "@/data/data";
import { LegacyRef, forwardRef, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type SetValue = UseFormSetValue<{
    productName: string;
    price: number;
    productCode: string;
    categoryCode: string;
}>;
//
interface Props {
    setValue: SetValue;
}

const SelectScrollable = ({ setValue }: Props) => {
    const [productCategories, setProductCategories] = useState(data.productCategories);

    return (
        <Select onValueChange={(value) => setValue("categoryCode", value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a productCategory" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Product Category</SelectLabel>
                    {productCategories.map((pc) => (
                        <SelectItem key={pc.productCategoryId} value={pc.productCategoryCode}>
                            {pc.productCategoryCode} : {pc.productCategoryName}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
export default SelectScrollable;
