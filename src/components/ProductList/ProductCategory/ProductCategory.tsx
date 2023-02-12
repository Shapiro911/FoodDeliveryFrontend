import { Category } from "../../../interfaces/products.interface"
import { ProductItem } from "../ProductItem/ProductItem"
import styles from "./ProductCategory.module.sass"

export const ProductCategory = ({ category }: { category: Category }) => {
    return (
        <div id={category.category} className={styles.category}>
            <h3>{category.category}</h3>
            <div className={styles.products}>
                {category?.products.map((product) => {
                    return <ProductItem product={product} key={product.id} />
                })}
            </div>
        </div>
    )
}