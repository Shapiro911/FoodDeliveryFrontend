export interface Product {
    id: string,
    name: string,
    img: string,
    price: number
}

export interface ProductCart extends Product {
    quantity: number
}

export interface Category {
    category: string,
    products: Product[]
}
