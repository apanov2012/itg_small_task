import styles from "@/App.module.css";
import { selectAllGoods, useGoodsStore } from "../stores/useGoodsStore";
const SelectAllComponent = () => {
    const selectAll = useGoodsStore((state) => state.selectAll);
    return (
        <div
            className={`${selectAll ? styles.SelectAllComponent_active : styles.SelectAllComponent} cp`}
            onClick={() => selectAllGoods()}
        ></div>
    );
};

export default SelectAllComponent;
