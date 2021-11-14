import React from "react";
import styles from "../scss/CardContainer.module.scss";
import Card from "./Card";

const CardContainer = () => {
    const items: [] = JSON.parse(localStorage.getItem("bookmarks") ?? "[]");

    return (
        <div className={styles.CardContainer}>
            {items.map(item => <Card items={item} />)}
        </div>
    );
};

export default CardContainer;
