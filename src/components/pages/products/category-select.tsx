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
    values: any[] | undefined;
}

const SelectScrollable = ({ setValue, values }: Props) => {
    return (
        <Select onValueChange={(value) => setValue("categoryCode", value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a productCategory" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Product Category</SelectLabel>
                    {values?.map((pc) => (
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
