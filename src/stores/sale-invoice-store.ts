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
    addProduct: (product: Product) => void;
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
                    state.increaseProductQuantity(productToAdd.productCode);
                }
                return { ...state, products: [...state.products, newProduct] };
            }),
        removeProduct: (rProduct) =>
            set((state) => {
                const productToRemove = state.products.find(
                    (product) => product.productCode === rProduct.productCode,
                );
                if (productToRemove && productToRemove.quantity > 1) {
                    state.decreseProductQuantity(productToRemove.productCode);
                }
                const tmp = state.products.filter(
                    (product) => product.productCode !== rProduct.productCode,
                );
                return { ...state, products: tmp };
            }),
        setStaffCode: (code) => set((state) => ({ ...state, staffCode: code })),
        increaseProductQuantity: (productCode) =>
            set((state) => {
                const tmp = state.products.map((product) => {
                    if (product.productCode === productCode) {
                        return { ...product, quantity: product.quantity + 1 };
                    }
                    return product;
                });
                return { ...state, products: tmp };
            }),
        decreseProductQuantity: (productCode) =>
            set((state) => {
                const tmp = state.products.map((product) => {
                    if (product.productCode === productCode) {
                        return { ...product, quantity: product.quantity - 1 };
                    }
                    return product;
                });
                return { ...state, products: tmp };
            }),
    }));
};
