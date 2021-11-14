import React from "react";
import styles from "../scss/Card.module.scss";

const Card = (props) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{props.items[0]}</h3>
            <ul>
                {props.items[1].map((item) => (
                    <a href={item.link}>
                        <li>{item.name}</li>
                    </a>
                ))}
            </ul>
        </div>
    );
};

export default Card;
