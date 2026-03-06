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
import Table from "../components/table/table";
import Pagination from "../components/pagination";
import TableLoader from "../components/tableLoader";
import SelectAllComponent from "../components/selectAllComponent";
import SelectComponent from "../components/selectComponent";
import GoodMultiTitle from "../components/goodMultiTitle";
import TitleSortHandler from "../components/table/titleSortHandler";
import type { IGoodOne, IGoodsTableConfig } from "../types";
import AddGood from "../components/addGood";

const GoodsPage = () => {
    const goodsList = useGoodsStore((state) => state.goodsList);
    const query = useGoodsStore((state) => state.query);
    const offset = useGoodsStore((state) => state.offset);
    const total = useGoodsStore((state) => state.total);
    const goodsIsLoading = useGoodsStore((state) => state.isLoading);
    const addGood = useGoodsStore((state) => state.addGood);
    // const goodsColsProps: { [key: string]: any }[] = [
    const goodsColsProps: IGoodsTableConfig<IGoodOne>[] = [
        {
            titleComponent: () => <SelectAllComponent />,
            key: "id",
            width: 60,
            align: "center",
            render: (item: number) => <SelectComponent id={item} />,
            renderArg: "id"
        },
        {
            titleComponent: () => (
                <TitleSortHandler
                    titleName={"Наименование"}
                    itemSort="title"
                    titleAlign="left"
                />
            ),
            key: "title",
            width: 450,
            titleAlign: "left",
            align: "left",
            render: (item: [string, string, string[]]) => (
                <GoodMultiTitle {...item} />
            ),
            renderArg: ["title", "category", "images"]
        },
        {
            title: "Вендор",
            key: "brand",
            width: 200,
            align: "center"
        },
        {
            title: "Артикул",
            key: "sku",
            align: "center"
        },
        {
            titleComponent: () => (
                <TitleSortHandler
                    titleName={"Оценка"}
                    itemSort="rating"
                    titleAlign="center"
                />
            ),
            key: "rating",
            align: "center",
            render: (item: number) => (
                <span>
                    <span style={item < 3 ? { color: "red" } : {}}>{item}</span>
                    <span>{`/5`}</span>
                </span>
            ),
            renderArg: "rating"
        },
        {
            titleComponent: () => (
                <TitleSortHandler
                    titleName={"Цена"}
                    itemSort="price"
                    titleAlign="center"
                />
            ),
            key: "price",
            width: 100,
            align: "center"
        },
        {
            width: 60,
            align: "center",
            render: () => (
                <div
                    className={`${styles.GoodsPage_main_fakeFrame_img} imgBack`}
                ></div>
            )
        },
        {
            width: 40,
            align: "center",
            render: () => (
                <div
                    className={`${styles.GoodsPage_main_fakeCircle_img} imgBack`}
                ></div>
            )
        }
    ];
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
                        <div
                            className={`${styles.GoodsPage_top_cancel_img} imgBack cp`}
                            onClick={() => setQuery("")}
                        ></div>
                    )}
                </div>
                <div
                    className={`${styles.GoodsPage_top_logout_img} imgBack cp`}
                    onClick={() => logout()}
                ></div>
            </div>
            <div
                className={`${styles.GoodsPage_main_back} mt-30 pr-30 pl-30 pb-30 pt-30`}
            >
                <div className={`${styles.GoodsPage_main_title} bolder`}>
                    {`Все позиции`}
                    <div className={`${styles.GoodsPage_main_handlers_back}`}>
                        <div
                            className={`${styles.GoodsPage_main_handlers_update_img} cp`}
                            onClick={() => updateGoodsList()}
                        ></div>
                        <div
                            className={`${styles.GoodsPage_main_handlers_add} cp ml-10`}
                            onClick={() => setAddGood(true)}
                        >
                            <div
                                className={`${styles.GoodsPage_main_handlers_add_img} imgBack`}
                            ></div>
                            <span>{`Добавить`}</span>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.GoodsPage_main_table_back} mt-40 pr-10`}
                >
                    {goodsIsLoading && <TableLoader />}
                    <Table
                        colProps={goodsColsProps}
                        data={goodsList}
                        onRowClick={selectGoodOne}
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
        </div>
    );
};

export default GoodsPage;
