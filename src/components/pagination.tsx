import styles from "@/App.module.css";
import {
    paginationStep,
    setOfftet,
    useGoodsStore
} from "../stores/useGoodsStore";
const Pagination = () => {
    const offset = useGoodsStore((state) => state.offset);
    const total = useGoodsStore((state) => state.total);
    const totalPages = Math.ceil(total / paginationStep);
    const maxPages = 5;
    const halfPages = Math.floor(maxPages / 2);

    let startPage = Math.max(
        1,
        Math.floor(offset / paginationStep) - halfPages
    );
    let endPage = Math.min(
        totalPages,
        Math.floor(offset / paginationStep) + halfPages
    );

    if (endPage - startPage + 1 < maxPages) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + maxPages - 1);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - maxPages + 1);
        } else {
            const visiblePages = endPage - startPage + 1;
            const diff = maxPages - visiblePages;
            startPage = Math.max(1, startPage - Math.floor(diff / 2));
            endPage = Math.min(
                totalPages,
                endPage + Math.floor(diff / 2) + (diff % 2)
            );
        }
    }
    return (
        <div className={`${styles.Pagination_back}`}>
            <div
                className={`${styles.Pagination_left_img} imgBack cp`}
                onClick={() =>
                    setOfftet(
                        offset - paginationStep > 0
                            ? offset - paginationStep
                            : 0
                    )
                }
            ></div>
            {Array.from(
                { length: endPage - startPage + 1 },
                (_, index) => startPage + index
            ).map((page) => (
                <div
                    key={page}
                    className={`${offset / paginationStep === page - 1 ? styles.Pagination_page_unactive : styles.Pagination_page} ml-8  ${offset / paginationStep === page - 1 ? "" : "cp"}`}
                    onClick={() => {
                        if (offset / paginationStep !== page - 1) {
                            setOfftet((page - 1) * paginationStep);
                        }
                    }}
                    style={
                        offset / paginationStep === page - 1
                            ? {
                                  backgroundColor: "#797FEA",
                                  color: "white"
                              }
                            : {}
                    }
                >
                    {page}
                </div>
            ))}
            <div
                className={`${styles.Pagination_right_img} imgBack cp ml-8`}
                onClick={() =>
                    setOfftet(
                        offset + paginationStep <
                            Math.trunc(total / paginationStep) * paginationStep
                            ? offset + paginationStep
                            : Math.trunc(total / paginationStep) *
                                  paginationStep
                    )
                }
            ></div>
        </div>
    );
};

export default Pagination;
