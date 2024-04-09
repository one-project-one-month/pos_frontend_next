export interface BaseProps {
    children: React.ReactNode;
}

export interface ApiResponse<T = any> {
    message?: string;
    result?: number;
    data: T[] | T;
}
