import styles from "@/App.module.css";
import { selectGoodOne, useGoodsStore } from "../stores/useGoodsStore";
interface Props {
    id: number;
}
const SelectComponent = ({ id }: Props) => {
    const selectAll = useGoodsStore((state) => state.selectAll);
    const goodsSelectedIds = useGoodsStore((state) => state.goodsSelectedIds);
    return (
        <div
            className={`${goodsSelectedIds.includes(id) || selectAll ? styles.SelectComponent_back_active : styles.SelectComponent_back} `}
        >
            <div
                className={`${goodsSelectedIds.includes(id) || selectAll ? styles.SelectAllComponent_active : styles.SelectAllComponent} cp`}
                onClick={() => selectGoodOne(id)}
            ></div>
        </div>
    );
};

export default SelectComponent;
