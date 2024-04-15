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
        name: "U Maung Maung",
        phone: "+9599999999",
        total: "$54364547",
    },
    {
        id: "2",
        name: "U Maung Maung",
        phone: "+9599999999",
        total: "$54364547",
    },
    {
        id: "3",
        name: "U Maung Maung",
        phone: "+9599999999",
        total: "$54364547",
    },
    {
        id: "4",
        name: "U Maung Maung",
        phone: "+9599999999",
        total: "$54364547",
    },
    {
        id: "5",
        name: "U Maung Maung",
        phone: "+9599999999",
        total: "$54364547",
    },
    {
        id: "6",
        name: "U Maung Maung",
        phone: "+9599999999",
        total: "$54364547",
    },
];

export default function VipCustomer() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Spent Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {datas.map((data) => (
                    <TableRow key={data.id}>
                        <TableCell className="font-medium">{data.id}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.phone}</TableCell>
                        <TableCell className="text-right">{data.total}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
