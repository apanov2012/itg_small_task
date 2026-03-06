import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import type { IGoodOne } from "../types";
import { getGoodsList } from "../services/goodsApiService";
export const paginationStep = 10;
interface IGoodsState {
    goodsList: IGoodOne[];
    total: number;
    limit: number;
    offset: number;
    order: "asc" | "desc";
    sortBy: string;
    query: string;
    isLoading: boolean;
    loadingError: boolean;
    ////
    selectAll: boolean;
    goodsSelectedIds: number[];
    ////
    addGood: boolean;
    newGoodFields: {
        title: string;
        price: string;
        brand: string;
        sku: string;
    };
}
interface IGoodsActions {
    updateGoodsList: () => void;
    setQuery: (query: string) => void;
    setOfftet: (offset: number) => void;
    selectAllGoods: () => void;
    selectGoodOne: (id: number) => void;
    setOrder: (order: "asc" | "desc") => void;
    setSortBy: (sortBy: string) => void;
    setAddGood: (addGood: boolean) => void;
    setNewGoodField: (field: string, value: string) => void;
    addNewGood: () => void;
}
interface IGoodsInitialState {
    goodsList: IGoodOne[];
    total: number;
    limit: number;
    offset: number;
    order: "asc" | "desc";
    sortBy: string;
    query: string;
    isLoading: boolean;
    loadingError: boolean;
    ////
    selectAll: boolean;
    goodsSelectedIds: number[];
    ////
    addGood: boolean;
    newGoodFields: {
        title: string;
        price: string;
        brand: string;
        sku: string;
    };
}
interface IGoodsStore extends IGoodsState, IGoodsActions {}
const GoodsInitialState: IGoodsInitialState = {
    goodsList: [],
    total: 0,
    limit: paginationStep,
    offset: 0,
    order: "asc",
    sortBy: "title",
    query: "",
    isLoading: false,
    loadingError: false,
    ////
    selectAll: false,
    goodsSelectedIds: [],
    ////
    addGood: false,
    newGoodFields: {
        title: "",
        price: "",
        brand: "",
        sku: ""
    }
};
const GoodsStore: StateCreator<IGoodsStore, [["zustand/devtools", never]]> = (
    set,
    get
) => ({
    ...GoodsInitialState,
    updateGoodsList: () => {
        set({
            loadingError: false,
            isLoading: true
        });
        getGoodsList({
            limit: get().limit,
            offset: get().offset,
            sortBy: get().sortBy,
            order: get().order,
            query: get().query
        })
            .then((res) => {
                if (res.status === 200) {
                    set({
                        goodsList: res.data.products,
                        total: res.data.total
                    });
                }
            })
            .catch(() => set({ loadingError: true }))
            .finally(() =>
                set({
                    isLoading: false
                })
            );
    },
    setQuery: (query: string) => {
        set({
            query: query
        });
    },
    setOfftet: (offset: number) => {
        set({
            offset: offset
        });
        get().updateGoodsList();
    },
    selectAllGoods: () => {
        set((state) => ({
            selectAll: !state.selectAll,
            goodsSelectedIds: state.selectAll
                ? state.goodsSelectedIds
                : GoodsInitialState.goodsSelectedIds
        }));
    },
    selectGoodOne: (id: number) => {
        set((state) => ({
            goodsSelectedIds: state.goodsSelectedIds.includes(id)
                ? state.goodsSelectedIds.filter((item) => item !== id)
                : [...state.goodsSelectedIds, id]
        }));
    },
    setOrder: (order: "asc" | "desc") => {
        set({ order: order });
        get().updateGoodsList();
    },
    setSortBy: (sortBy: string) => {
        set({ sortBy: sortBy });
    },
    setAddGood: (addGood: boolean) => {
        set({
            addGood: addGood,
            newGoodFields: GoodsInitialState.newGoodFields
        });
    },
    setNewGoodField: (field: string, value: string) => {
        set({
            newGoodFields: {
                ...get().newGoodFields,
                [field]: value
            }
        });
    },
    addNewGood: () => {
        set((state) => ({
            goodsList: [
                {
                    id: Math.random(),
                    title: state.newGoodFields.title,
                    category: "user",
                    price: +state.newGoodFields.price,
                    rating: 0,
                    brand: state.newGoodFields.brand,
                    sku: state.newGoodFields.sku,
                    images: []
                },
                ...state.goodsList
            ],
            addGood: false,
            newGoodFields: GoodsInitialState.newGoodFields
        }));
    }
});
export const useGoodsStore = create<IGoodsStore>()(
    devtools(GoodsStore, { name: "GoodsStore" })
);
//
useGoodsStore.getState().updateGoodsList();
// внешние методы
export const updateGoodsList = () => useGoodsStore.getState().updateGoodsList();
export const setQuery = (query: string) =>
    useGoodsStore.getState().setQuery(query);
export const setOfftet = (offset: number) =>
    useGoodsStore.getState().setOfftet(offset);
export const selectAllGoods = () => useGoodsStore.getState().selectAllGoods();
export const selectGoodOne = (id: number) =>
    useGoodsStore.getState().selectGoodOne(id);
export const setOrder = (order: "asc" | "desc") =>
    useGoodsStore.getState().setOrder(order);
export const setSortBy = (sortBy: string) =>
    useGoodsStore.getState().setSortBy(sortBy);
export const setAddGood = (addGood: boolean) =>
    useGoodsStore.getState().setAddGood(addGood);
export const setNewGoodField = (field: string, value: string) =>
    useGoodsStore.getState().setNewGoodField(field, value);
export const addNewGood = () => useGoodsStore.getState().addNewGood();
