import styles from "@/App.module.css";
import {
    paginationStep,
    selectGoodOne,
    setAddGood,
    setQuery,
    updateGoodsList,
    useGoodsStore
} from "../stores/useGoodsStore";
import { logout } from "../stores/useAuthStore";
// import Table from "../components/table/table";
import Pagination from "../components/pagination";
import TableLoader from "../components/tableLoader";
import { goodsTableConfig } from "../configs/goodsTableConfig";
import AddGood from "../components/addGood";
import AddNotify from "../components/addNotify";
import VirtTable from "../components/table/virtTable";

const GoodsPage = () => {
    const goodsList = useGoodsStore((state) => state.goodsList);
    const query = useGoodsStore((state) => state.query);
    const offset = useGoodsStore((state) => state.offset);
    const total = useGoodsStore((state) => state.total);
    const goodsIsLoading = useGoodsStore((state) => state.isLoading);
    const addGood = useGoodsStore((state) => state.addGood);
    const addNotification = useGoodsStore((state) => state.addNotification);
    ///
    return (
        <div className={`${styles.GoodsPage_back}`}>
            <div className={`${styles.GoodsPage_top_back} mt-20 pr-30 pl-30`}>
                <div
                    className={`${styles.GoodsPage_top_title} fs-17 bolder `}
                >{`Товары`}</div>
                <div className={`${styles.GoodsPage_top_search_back}`}>
                    <div
                        className={`${styles.GoodsPage_top_search_img} imgBack`}
                    ></div>
                    <input
                        type="text"
                        className={`${styles.GoodsPage_top_search_input}`}
                        placeholder={`Найти`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                updateGoodsList();
                            }
                        }}
                    />
                    {query && (
                        <button
                            type="button"
                            className={`${styles.GoodsPage_top_cancel_img} imgBack cp`}
                            onClick={() => setQuery("")}
                        ></button>
                    )}
                </div>
                <button
                    type="button"
                    className={`${styles.GoodsPage_top_logout_img} imgBack cp`}
                    onClick={() => logout()}
                ></button>
            </div>
            <div
                className={`${styles.GoodsPage_main_back} mt-30 pr-30 pl-30 pb-30 pt-30`}
            >
                <div className={`${styles.GoodsPage_main_title} bolder`}>
                    {`Все позиции`}
                    <div className={`${styles.GoodsPage_main_handlers_back}`}>
                        <button
                            type="button"
                            className={`${styles.GoodsPage_main_handlers_update_img} cp`}
                            onClick={() => updateGoodsList()}
                        ></button>
                        <button
                            type="button"
                            className={`${styles.GoodsPage_main_handlers_add} cp ml-10`}
                            onClick={() => setAddGood(true)}
                        >
                            <div
                                className={`${styles.GoodsPage_main_handlers_add_img} imgBack`}
                            ></div>
                            <span>{`Добавить`}</span>
                        </button>
                    </div>
                </div>
                <div
                    className={`${styles.GoodsPage_main_table_back} mt-40 pr-10`}
                >
                    {goodsIsLoading && <TableLoader />}

                    {/* <Table
                        colProps={goodsTableConfig}
                        data={goodsList}
                        onRowClick={selectGoodOne}
                    /> */}
                    <VirtTable
                        colProps={goodsTableConfig}
                        data={goodsList}
                        onRowClick={selectGoodOne}
                        rowHeight={70}
                    />
                </div>
                <div className={`${styles.GoodsPage_footer_back} mt-40`}>
                    <div className={`${styles.GoodsPage_footer_count}`}>
                        <span className="fs-16 cdgray">{`Показано`}</span>
                        <span className="fs-16 pl-5 ">{`${offset + 1}-${offset + paginationStep}`}</span>
                        <span className="fs-16 cdgray pl-5">{`из`}</span>
                        <span className="fs-16 pl-5 ">{total}</span>
                    </div>
                    <Pagination />
                </div>
            </div>
            {addGood && <AddGood />}
            {addNotification && <AddNotify />}
        </div>
    );
};

export default GoodsPage;
