import styles from "@/App.module.css";
import { setOrder, setSortBy, useGoodsStore } from "../../stores/useGoodsStore";
interface propsType {
    titleName: string | null;
    itemSort: string;
    titleAlign?: string; //left center right
}

const TitleSortHandler = ({
    titleName,
    itemSort,
    titleAlign = "left"
}: propsType) => {
    const order = useGoodsStore((state) => state.order);
    const sortBy = useGoodsStore((state) => state.sortBy);

    return (
        <div
            className={`${sortBy === itemSort ? styles.TitleSortHandler_active : styles.TitleSortHandler} cp`}
            style={{
                justifyContent:
                    titleAlign === "left"
                        ? "flex-start"
                        : titleAlign === "right"
                          ? "flex-end"
                          : "center"
            }}
            onClick={() => {
                setSortBy(itemSort);
                order === "asc" ? setOrder("desc") : setOrder("asc");
            }}
        >
            <span>{titleName}</span>
            <div
                className={`${styles.TitleSortHandler_img} imgBack `}
                style={{
                    rotate: order === "asc" ? "90deg" : "-90deg",
                    opacity: sortBy === itemSort ? 1 : 0
                }}
            ></div>
        </div>
    );
};

export default TitleSortHandler;
