import React from "react";
import styles from "@/App.module.css";
const GoodMultiTitle = React.memo((data: [string, string, string[]]) => {
    return (
        <div className={`${styles.GoodMultiTitle}`}>
            {data[2][0] ? (
                <img
                    loading="lazy"
                    src={data[2][0]}
                    className={`${styles.GoodMultiTitle_image}`}
                    alt="X"
                />
            ) : (
                <div className={`${styles.GoodMultiTitle_image_empty}`}></div>
            )}
            <div className={`${styles.GoodMultiTitle_title} pl-10`}>
                <div
                    className={`${styles.GoodMultiTitle_title_item} fs-16 bolder`}
                >
                    {data[0]}
                </div>
                <div
                    className={`${styles.GoodMultiTitle_title_item} fs-16 cdgray`}
                >
                    {data[1]}
                </div>
            </div>
        </div>
    );
});

export default GoodMultiTitle;
