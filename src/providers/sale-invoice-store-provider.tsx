"use client";
import { SaleInvoiceStore, createSaleInvoiceStore } from "@/stores/sale-invoice-store";
import { createContext, useRef, useContext, PropsWithChildren } from "react";
import { type StoreApi, useStore } from "zustand";

export const SaleInvoiceStoreContext = createContext<StoreApi<SaleInvoiceStore> | null>(null);

export const SaleInvoiceStoreContextProvider = ({ children }: PropsWithChildren) => {
    const storeRef = useRef<StoreApi<SaleInvoiceStore>>();
    if (!storeRef.current) {
        storeRef.current = createSaleInvoiceStore();
    }
    return (
        <SaleInvoiceStoreContext.Provider value={storeRef.current}>
            {children}
        </SaleInvoiceStoreContext.Provider>
    );
};

export const useSaleInvoiceContext = <T,>(selector: (store: SaleInvoiceStore) => T): T => {
    const saleInvoiceStoreContext = useContext(SaleInvoiceStoreContext);
    if (!saleInvoiceStoreContext) {
        throw new Error("useSaleInvoiceContext must be only used under its provider context!");
    }
    return useStore(saleInvoiceStoreContext, selector);
};
