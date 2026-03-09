import React, { useEffect, useMemo, useRef } from "react";
import styles from "./table.module.css";
import { randomId } from "./utils/randomId";
import parse from "html-react-parser";
import { useVirtualizer } from "@tanstack/react-virtual";

interface GoodsTableProps {
    colProps: any[];
    data: any[];
    onRowClick?: (data: number) => void;
    rowHeight?: number;
    visibleRows?: number;
}

const VirtTable = ({
    colProps,
    data,
    onRowClick,
    rowHeight = 70,
    visibleRows = 10
}: GoodsTableProps) => {
    const tableProps = useMemo(() => {
        return colProps.filter((titleItem) => titleItem !== null);
    }, [colProps]);
    const AtlTableBody = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: data?.length,
        getScrollElement: () => AtlTableBody.current,
        overscan: 5,
        estimateSize: () => rowHeight ?? 70
    });
    useEffect(() => {
        AtlTableBody.current?.scrollTo(0, 0);
    }, [data]);
    return (
        <div className={`${styles.VirtTable_back}`}>
            <div
                className={`${styles.VirtTable_head}`}
                style={{ height: rowHeight + "px" }}
            >
                {tableProps.map((titleItem) => (
                    <div
                        key={randomId()}
                        style={
                            titleItem.width
                                ? {
                                      width: titleItem.width + "px",
                                      justifyContent:
                                          titleItem.titleAlign === "left"
                                              ? "flex-start"
                                              : titleItem.titleAlign === "right"
                                                ? "flex-end"
                                                : "center"
                                  }
                                : {
                                      flex: 1,
                                      justifyContent:
                                          titleItem.titleAlign === "left"
                                              ? "flex-start"
                                              : titleItem.titleAlign === "right"
                                                ? "flex-end"
                                                : "center"
                                  }
                        }
                        className={`${styles.VirtTable_head_cell}`}
                    >
                        {titleItem.titleComponent ? (
                            titleItem.titleComponent()
                        ) : (
                            <span
                                style={{
                                    opacity: 0.5
                                }}
                            >
                                {titleItem?.title}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            {
                <div
                    ref={AtlTableBody}
                    className={`${styles.VirtTable_scroll}`}
                    style={{
                        height: visibleRows
                            ? `${visibleRows * rowHeight}px`
                            : `calc(100% - ${rowHeight}px)`
                    }}
                >
                    {data.length ? (
                        <div
                            className={`${styles.VirtTable_body}`}
                            style={{
                                height: rowVirtualizer.getTotalSize() + "px"
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map((virtRow) => {
                                const item = data[virtRow.index];
                                return (
                                    <div
                                        key={item.id}
                                        className={`${styles.AtlTableBody_row}`}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            transform: `translateY(${virtRow.start}px)`,
                                            height: rowHeight + "px",
                                            width: "100%"
                                        }}
                                        onClick={() =>
                                            onRowClick && onRowClick(item.id)
                                        }
                                    >
                                        {tableProps.map((prop) => (
                                            <div
                                                key={randomId()}
                                                className={`${styles.AtlTableBody_cell}`}
                                                style={
                                                    prop.width
                                                        ? {
                                                              width:
                                                                  prop.width +
                                                                  "px",
                                                              height:
                                                                  rowHeight +
                                                                  "px",
                                                              justifyContent:
                                                                  prop.align ===
                                                                  "left"
                                                                      ? "flex-start"
                                                                      : item.align ===
                                                                          "right"
                                                                        ? "flex-end"
                                                                        : "center"
                                                          }
                                                        : {
                                                              flex: 1,
                                                              height:
                                                                  rowHeight +
                                                                  "px",
                                                              justifyContent:
                                                                  prop.align ===
                                                                  "left"
                                                                      ? "flex-start"
                                                                      : item.align ===
                                                                          "right"
                                                                        ? "flex-end"
                                                                        : "center"
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
                                                            ].includes("<b>")
                                                              ? parse(
                                                                    item[
                                                                        prop.key
                                                                    ]
                                                                )
                                                              : item[prop.key]
                                                          : item[prop.key]
                                                      : "-"}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div
                            className={`${styles.Table_no_data} bolder mt-40`}
                        >{`К сожалению, ничего не нашлось...`}</div>
                    )}
                </div>
            }
        </div>
    );
};

export default React.memo(VirtTable);
