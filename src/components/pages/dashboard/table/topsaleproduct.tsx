import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const datas = [
    {
        id: "1",
        ProductDetail: "iphone 14 pro Black",
        price: "$250.00",
        quantity: "85",
        total: "$54367",
    },
    {
        id: "2",
        ProductDetail: "Yum Yum Noodle",
        price: "$150.00",
        quantity: "6456",
        total: "$746585",
    },
    {
        id: "3",
        ProductDetail: "iphone 14 pro Black",
        price: "$250.00",
        quantity: "85",
        total: "$54367",
    },
    {
        id: "4",
        ProductDetail: "Yum Yum Noodle",
        price: "$150.00",
        quantity: "6456",
        total: "$746585",
    },
    {
        id: "5",
        ProductDetail: "iphone 14 pro Black",
        price: "$250.00",
        quantity: "85",
        total: "$54367",
    },
    {
        id: "6",
        ProductDetail: "Yum Yum Noodle",
        price: "$150.00",
        quantity: "6456",
        total: "$746585",
    },
];

export default function TopSaleProducts() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead>Product Detail</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {datas.map((data) => (
                    <TableRow key={data.id}>
                        <TableCell className="font-medium">{data.id}</TableCell>
                        <TableCell>{data.ProductDetail}</TableCell>
                        <TableCell>{data.price}</TableCell>
                        <TableCell>{data.quantity}</TableCell>
                        <TableCell className="text-right">{data.total}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
