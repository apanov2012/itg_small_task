export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface IUserLoginData {
    username: string;
    password: string;
}
export interface IgetGoodsProps {
    limit: number;
    offset: number;
    sortBy: string;
    order: "asc" | "desc";
    query?: string;
}
export interface IGoodOne {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    brand: string;
    sku: string;
    images: string[];
}
export interface IGoodsTableConfig<T> {
    title?: string;
    titleComponent?: () => React.ReactNode;
    key?: string;
    width?: number;
    titleAlign?: "left" | "center" | "right";
    align: "left" | "center" | "right";
    render?: (item: any) => React.ReactNode;
    renderArg?: keyof T | (keyof T)[];
}
