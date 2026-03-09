import styles from "@/App.module.css";
import {
    addNewGood,
    setAddGood,
    setNewGoodField,
    useGoodsStore
} from "../stores/useGoodsStore";
const AddGood = () => {
    const fields = useGoodsStore((state) => state.newGoodFields);
    return (
        <div className={`${styles.AddGood_background}`}>
            <div className={`${styles.AddGood_back} `}>
                <div className={`${styles.AddGood_top}  bold `}>
                    {`Добавление товара`}
                    <button
                        type="button"
                        className={`${styles.AddGood_top_cancel_img} imgBack cp`}
                        onClick={() => setAddGood(false)}
                    ></button>
                </div>
                <div className={`${styles.AddGood_main_inputs}`}>
                    {/* наименование */}
                    <div className={`${styles.LoginPage_form_main_item} mt-20`}>
                        <div
                            className={`${styles.LoginPage_form_main_item_title}`}
                        >
                            {`Наименование`}
                            <span className="ml-10 cred">{`*`}</span>
                        </div>
                        <div
                            className={`${styles.LoginPage_form_main_item_input_back}`}
                        >
                            <input
                                type="text"
                                placeholder={`Введите наименование`}
                                className={`${styles.LoginPage_form_main_item_input}`}
                                value={fields.title}
                                onChange={(e) =>
                                    setNewGoodField(
                                        "title",
                                        e.target.value.trim()
                                    )
                                }
                            />
                            {fields.title && (
                                <button
                                    type="button"
                                    className={`${styles.LoginPage_form_main_item_input_cancel_img} imgBack cp`}
                                    onClick={() => setNewGoodField("title", "")}
                                ></button>
                            )}
                        </div>
                    </div>
                    {/* вендор */}
                    <div className={`${styles.LoginPage_form_main_item} mt-20`}>
                        <div
                            className={`${styles.LoginPage_form_main_item_title}`}
                        >
                            {`Вендор`}
                            <span className="ml-10 cred">{`*`}</span>
                        </div>
                        <div
                            className={`${styles.LoginPage_form_main_item_input_back}`}
                        >
                            <input
                                type="text"
                                placeholder={`Введите название вендора`}
                                className={`${styles.LoginPage_form_main_item_input}`}
                                value={fields.brand}
                                onChange={(e) =>
                                    setNewGoodField(
                                        "brand",
                                        e.target.value.trim()
                                    )
                                }
                            />
                            {fields.brand && (
                                <button
                                    type="button"
                                    className={`${styles.LoginPage_form_main_item_input_cancel_img} imgBack cp`}
                                    onClick={() => setNewGoodField("brand", "")}
                                ></button>
                            )}
                        </div>
                    </div>
                    {/* артикул */}
                    <div className={`${styles.LoginPage_form_main_item} mt-20`}>
                        <div
                            className={`${styles.LoginPage_form_main_item_title}`}
                        >
                            {`Артикул`}
                            <span className="ml-10 cred">{`*`}</span>
                        </div>
                        <div
                            className={`${styles.LoginPage_form_main_item_input_back}`}
                        >
                            <input
                                type="text"
                                placeholder={`Введите артикул`}
                                className={`${styles.LoginPage_form_main_item_input}`}
                                value={fields.sku}
                                onChange={(e) =>
                                    setNewGoodField(
                                        "sku",
                                        e.target.value.trim()
                                    )
                                }
                            />
                            {fields.sku && (
                                <button
                                    type="button"
                                    className={`${styles.LoginPage_form_main_item_input_cancel_img} imgBack cp`}
                                    onClick={() => setNewGoodField("sku", "")}
                                ></button>
                            )}
                        </div>
                    </div>
                    {/* цена */}
                    <div className={`${styles.LoginPage_form_main_item} mt-20`}>
                        <div
                            className={`${styles.LoginPage_form_main_item_title}`}
                        >
                            {`Цена`}
                            <span className="ml-10 cred">{`*`}</span>
                        </div>
                        <div
                            className={`${styles.LoginPage_form_main_item_input_back}`}
                        >
                            <input
                                type="text"
                                maxLength={10}
                                placeholder={`Введите цену`}
                                className={`${styles.LoginPage_form_main_item_input}`}
                                value={fields.price}
                                onChange={(e) => {
                                    if (
                                        e.target.value.match(/^(?!0)\d*\.?\d*$/)
                                    ) {
                                        setNewGoodField(
                                            "price",
                                            e.target.value
                                        );
                                    }
                                }}
                            />
                            {fields.price && (
                                <button
                                    type="button"
                                    className={`${styles.LoginPage_form_main_item_input_cancel_img} imgBack cp`}
                                    onClick={() => setNewGoodField("price", "")}
                                ></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${styles.AddGood_main_info} mt-10`}>
                    <span className="mr-10 cred">{`*`}</span>
                    {`- поля, обязательные для заполнения`}
                </div>
                <button
                    type="button"
                    className={`${fields.brand && fields.price && fields.sku && fields.title ? styles.AddGood_main_submit : styles.AddGood_main_submit_unactive} mt-20 fs-17`}
                    onClick={() => {
                        fields.brand &&
                            fields.price &&
                            fields.sku &&
                            fields.title &&
                            addNewGood();
                    }}
                >{`Добавить`}</button>
            </div>
        </div>
    );
};

export default AddGood;
