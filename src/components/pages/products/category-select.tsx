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
    value: any;
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
                    {values ? (
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
