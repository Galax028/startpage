import anime from "animejs";
import Bowser from "bowser";
import React from "react";
import { Helmet } from "react-helmet";
import styles from "../scss/Header.module.scss";

const Header = () => {
    const browsers: { [key: string]: string } = {
        Chrome: "googlechrome",
        Firefox: "firefoxbrowser",
        Opera: "opera",
        "Microsoft Edge": "microsoftedge",
        Safari: "safari",
    };

    let browserName =
        Bowser.parse(window.navigator.userAgent).browser.name ?? "";
    if (browserName.startsWith("Opera")) browserName = "Opera";
    else if (browserName === "Chromium") browserName = "Chrome";
    const browserIcon = `https://simpleicons.org/icons/${browsers[browserName]}.svg`;

    const logoAnimation = (e: any) => {
        const target: HTMLElement = e.target;
        anime({
            targets: e.target,
            rotate: "360deg",
            duration: 1000,
        });
        setTimeout(() => {
            anime({
                targets: e.target,
                rotate: "0deg",
                duration: 0,
            });
        }, 1000);
    };

    return (
        <div className={styles.header}>
            <Helmet>
                <link rel="shortcut icon" href={browserIcon} type="image/x-icon" />
            </Helmet>
            <img src={browserIcon} alt="Browser Logo" onClick={logoAnimation} />
            <h1>{browserName}</h1>
        </div>
    );
};

export default Header;
