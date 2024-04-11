import { createStore } from "zustand/vanilla";

type Product = {
    productCode: string;
    quantity: number;
    productName: string;
    price: number;
};
export type SaleInvoiceState = {
    staffCode: string;
    products: Product[];
};

export type SaleInvoiceActions = {
    setStaffCode: (code: string) => void;
    addProduct: (product: Omit<Product, "quantity">) => void;
    increaseProductQuantity: (productCode: string) => void;
    decreseProductQuantity: (productCode: string) => void;
    removeProduct: (product: Product) => void;
};

export type SaleInvoiceStore = SaleInvoiceState & SaleInvoiceActions;

export const defaultInitState: SaleInvoiceState = {
    staffCode: "",
    products: [],
};

export const createSaleInvoiceStore = (initState: SaleInvoiceState = defaultInitState) => {
    return createStore<SaleInvoiceStore>()((set) => ({
        ...initState,
        addProduct: (newProduct) =>
            set((state) => {
                const productToAdd = state.products.find(
                    (product) => product.productCode === newProduct.productCode,
                );
                if (productToAdd) {
                    return state;
                } else {
                    return { products: [...state.products, { ...newProduct, quantity: 1 }] };
                }
            }),
        removeProduct: (rProduct) =>
            set((state) => {
                const tmp = state.products.filter(
                    (product) => product.productCode !== rProduct.productCode,
                );
                return { products: tmp };
            }),
        setStaffCode: (code) => set(() => ({ staffCode: code })),
        increaseProductQuantity: (productCode) =>
            set((state) => {
                const tmp = state.products.map((product) => {
                    if (product.productCode === productCode) {
                        return { ...product, quantity: product.quantity + 1 };
                    }
                    return product;
                });
                return { products: tmp };
            }),
        decreseProductQuantity: (productCode) =>
            set((state) => {
                const tmp = state.products.map((product) => {
                    if (product.productCode === productCode) {
                        if (product.quantity > 1) {
                            return { ...product, quantity: product.quantity - 1 };
                        }
                    }
                    return product;
                });
                return { products: tmp };
            }),
    }));
};
