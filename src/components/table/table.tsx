import React from "react";
import styles from "./table.module.css";
import NumberCheck from "./utils/numberCheck";
import { randomId } from "./utils/randomId";
import parse from "html-react-parser";

interface GoodsTableProps {
    colProps?: any[];
    data?: any[];
    onRowClick?: (data: number) => void;
}

const GoodsTable = ({ colProps, data, onRowClick }: GoodsTableProps) => {
    const qtyColsWithoutWidth = colProps?.filter((item) => !item.width).length;
    const colsWithWidth = colProps?.filter((item) => item.width);

    const countInitialColsWidth = colsWithWidth?.reduce(
        (acc, cur) => acc + cur.width,
        0
    );
    return (
        <div className={`${styles.Table_back}`}>
            {data?.length ? (
                <table className={`${styles.Table_table}`}>
                    <thead className={`${styles.Table_table_head}`}>
                        <tr>
                            {colProps
                                ?.filter((item) => item !== null)
                                .map(
                                    (item) =>
                                        item && (
                                            <th
                                                key={randomId()}
                                                className={`${styles.Table_table_head_th}`}
                                                align={
                                                    item.titleAlign ?? "center"
                                                }
                                                style={
                                                    item.width
                                                        ? {
                                                              width: `${
                                                                  NumberCheck(
                                                                      item.width
                                                                  )
                                                                      ? `${item.width}px`
                                                                      : item.width
                                                              }`
                                                          }
                                                        : {
                                                              width: `Calc((100% - ${countInitialColsWidth}px) / ${qtyColsWithoutWidth})`
                                                          }
                                                }
                                            >
                                                {item.titleComponent ? (
                                                    item.titleComponent()
                                                ) : (
                                                    <span
                                                        style={{
                                                            opacity: 0.5
                                                        }}
                                                    >
                                                        {item?.title}
                                                    </span>
                                                )}
                                            </th>
                                        )
                                )}
                        </tr>
                    </thead>

                    <tbody>
                        {data &&
                            data?.map((item) => (
                                <tr
                                    key={randomId()}
                                    className={`${styles.Table_table_body_tr}  `}
                                    onClick={() => {
                                        if (onRowClick) {
                                            onRowClick(item.id);
                                        }
                                    }}
                                >
                                    {colProps
                                        ?.filter((item) => item !== null)
                                        .map(
                                            (prop) =>
                                                prop && (
                                                    <td
                                                        key={randomId()}
                                                        align={
                                                            prop.align
                                                                ? prop.align
                                                                : "left"
                                                        }
                                                        style={
                                                            item.width
                                                                ? {
                                                                      width: `${
                                                                          NumberCheck(
                                                                              item.width
                                                                          )
                                                                              ? `${item.width}px`
                                                                              : item.width
                                                                      }`
                                                                  }
                                                                : {
                                                                      width: `Calc((100% - ${countInitialColsWidth}px) / ${qtyColsWithoutWidth})`
                                                                  }
                                                        }
                                                    >
                                                        {prop.render
                                                            ? prop.render(
                                                                  prop.renderArg instanceof
                                                                      Object
                                                                      ? Object.fromEntries(
                                                                            Object.entries(
                                                                                prop.renderArg
                                                                            ).map(
                                                                                ([
                                                                                    key,
                                                                                    value
                                                                                ]: [
                                                                                    string,
                                                                                    any
                                                                                ]) => [
                                                                                    key,
                                                                                    item[
                                                                                        value
                                                                                    ]
                                                                                ]
                                                                            )
                                                                        )
                                                                      : prop.renderArg instanceof
                                                                          Array
                                                                        ? prop.renderArg.map(
                                                                              (
                                                                                  arg: string
                                                                              ) =>
                                                                                  item[
                                                                                      arg
                                                                                  ]
                                                                          )
                                                                        : item[
                                                                              prop
                                                                                  .renderArg
                                                                          ]
                                                              )
                                                            : item[prop.key]
                                                              ? typeof item[
                                                                    prop.key
                                                                ] === "string"
                                                                  ? item[
                                                                        prop.key
                                                                    ].includes(
                                                                        "<b>"
                                                                    )
                                                                      ? parse(
                                                                            item[
                                                                                prop
                                                                                    .key
                                                                            ]
                                                                        )
                                                                      : item[
                                                                            prop
                                                                                .key
                                                                        ]
                                                                  : item[
                                                                        prop.key
                                                                    ]
                                                              : "-"}
                                                    </td>
                                                )
                                        )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            ) : (
                <>
                    <table className={`${styles.Table_table}`}>
                        <thead className={`${styles.Table_table_head}`}>
                            <tr>
                                {colProps
                                    ?.filter((item) => item !== null)
                                    .map(
                                        (item) =>
                                            item && (
                                                <th
                                                    key={randomId()}
                                                    className={`${styles.Table_table_head_th}`}
                                                    align={
                                                        item.titleAlign ??
                                                        "center"
                                                    }
                                                    style={
                                                        item.width
                                                            ? {
                                                                  width: `${
                                                                      NumberCheck(
                                                                          item.width
                                                                      )
                                                                          ? `${item.width}px`
                                                                          : item.width
                                                                  }`
                                                              }
                                                            : {
                                                                  width: `Calc((100% - ${countInitialColsWidth}px) / ${qtyColsWithoutWidth})`
                                                              }
                                                    }
                                                >
                                                    {item.titleComponent ? (
                                                        item.titleComponent()
                                                    ) : (
                                                        <span
                                                            style={{
                                                                opacity: 0.5
                                                            }}
                                                        >
                                                            {item?.title}
                                                        </span>
                                                    )}
                                                </th>
                                            )
                                    )}
                            </tr>
                        </thead>
                    </table>
                    <div
                        className={`${styles.Table_no_data} bolder mt-40`}
                    >{`К сожалению, ничего не нашлось...`}</div>
                </>
            )}
        </div>
    );
};

export default React.memo(GoodsTable);
