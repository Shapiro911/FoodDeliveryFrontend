export interface Restaurant {
    id: string,
    name: string,
    img: string,
    duration: string,
    rating: number,
    fee: number,
    price: number
}

export interface SortValues {
    sortBy: string,
    priceRange: Array<number>,
    fee: string
}

export interface Request {
    status: number,
    error: string
}