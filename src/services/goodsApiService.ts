import axios from "axios";
import type { IgetGoodsProps } from "../types";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const PRODUCTS = "products/";
const SEARCH = "search";
const getGoodsList = (props: IgetGoodsProps) => {
    return axios({
        method: "get",
        url: props.query
            ? `${BASE_URL}${PRODUCTS}${SEARCH}`
            : `${BASE_URL}${PRODUCTS}`,
        params: props.query
            ? {
                  q: props.query,
                  limit: props.limit,
                  skip: props.offset,
                  select: "title,category,brand,sku,price,rating,images"
              }
            : {
                  limit: props.limit,
                  skip: props.offset,
                  select: "title,category,brand,sku,price,rating,images",
                  order: props.order,
                  sortBy: props.sortBy,
                  q: props.query
              }
    });
};
export { getGoodsList };
