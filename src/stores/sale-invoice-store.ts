import { createStore } from "zustand/vanilla";

type Product = {
    productCode: string;
    quantity: number;
};
export type SaleInvoiceState = {
    staffCode: string;
    products: Product[];
};

export type SaleInvoiceActions = {
    setStaffCode: (code: string) => void;
    addProducts: (product: Product) => void;
};

export type SaleInvoiceStore = SaleInvoiceState & SaleInvoiceActions;

export const defaultInitState: SaleInvoiceState = {
    staffCode: "",
    products: [],
};

export const createSaleInvoiceStore = (initState: SaleInvoiceState = defaultInitState) => {
    return createStore<SaleInvoiceStore>()((set) => ({
        ...initState,
        addProducts: (product) => set((state) => ({ products: [...state.products, product] })),
        setStaffCode: (code) => set(() => ({ staffCode: code })),
    }));
};
