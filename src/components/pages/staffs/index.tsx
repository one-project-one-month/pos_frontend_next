"use client";

import { useGetStaffs } from "@/services/api/staffs";

const Staffs = () => {
    const { data } = useGetStaffs();
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Staffs;
