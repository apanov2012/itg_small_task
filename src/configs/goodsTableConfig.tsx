import styles from "@/App.module.css";
import SelectAllComponent from "../components/selectAllComponent";
import SelectComponent from "../components/selectComponent";
import GoodMultiTitle from "../components/goodMultiTitle";
import TitleSortHandler from "../components/table/titleSortHandler";

import type { IGoodOne, IGoodsTableConfig } from "../types";

const createGoodsTableConfig = () => {
    return [
        {
            titleComponent: () => <SelectAllComponent />,
            key: "id",
            width: 60,
            align: "center",
            render: (id: number) => <SelectComponent id={id} />,
            renderArg: "id"
        },
        {
            titleComponent: () => (
                <TitleSortHandler
                    titleName="Наименование"
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
                    titleName="Оценка"
                    itemSort="rating"
                    titleAlign="center"
                />
            ),
            key: "rating",
            align: "center",
            render: (rating: number) => (
                <span>
                    <span style={rating < 3 ? { color: "red" } : {}}>
                        {rating}
                    </span>
                    <span>{`/5`}</span>
                </span>
            ),
            renderArg: "rating"
        },
        {
            titleComponent: () => (
                <TitleSortHandler
                    titleName="Цена"
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
                <button
                    type="button"
                    className={`${styles.GoodsPage_main_fakeFrame_img} imgBack`}
                ></button>
            )
        },
        {
            width: 40,
            align: "center",
            render: () => (
                <button
                    type="button"
                    className={`${styles.GoodsPage_main_fakeCircle_img} imgBack`}
                ></button>
            )
        }
    ] satisfies IGoodsTableConfig<IGoodOne>[];
};

export const goodsTableConfig = createGoodsTableConfig();
