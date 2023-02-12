import styles from "./ProductAside.module.sass"
import { Category } from "../../interfaces/products.interface"
import { Link } from "react-scroll"

export const ProductAside = ({ productList }: { productList: Category[] }) => {
    return (
        <aside className={styles.aside}>
            {productList.length > 0 && productList?.map((category) => {
                return (
                    <h4 key={category.category}><Link to={category.category} smooth={true} activeClass={styles.active} spy={true}>{category.category}</Link></h4>
                )
            })}
        </aside>
    )
}