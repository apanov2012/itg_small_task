import styles from "@/App.module.css";
import Loader from "./loader";
const TableLoader = () => {
    return (
        <div
            className={`${styles.TableLoader_back}`}
            style={{
                position: "absolute",
                height: "100%",
                width: "100%"
            }}
        >
            <div className={`${styles.TableLoader_background}`}>
                <Loader />
            </div>
        </div>
    );
};

export default TableLoader;
