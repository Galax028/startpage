import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import CardContainer from "./components/ts/CardContainer";
import Clock from "./components/ts/Clock";
import Header from "./components/ts/Header";
import Search from "./components/ts/Search";
import Settings from "./components/ts/Settings";

if (!localStorage.getItem("search-url"))
    localStorage.setItem("search-url", "https://google.com/search?q={query}");
if (!localStorage.getItem("bookmarks"))
    localStorage.setItem(
        "bookmarks",
        JSON.stringify([
            [
                "Category 1",
                [
                    { name: "Bookmark 1", link: "//example.com" },
                    { name: "Bookmark 2", link: "//example.com" },
                    { name: "Bookmark 3", link: "//example.com" },
                ],
            ],
            [
                "Category 2",
                [
                    { name: "Bookmark 4", link: "//example.com" },
                    { name: "Bookmark 5", link: "//example.com" },
                    { name: "Bookmark 6", link: "//example.com" },
                ],
            ],
        ])
    );

ReactDOM.render(
    <>
        <Header />
        <Clock />
        <Search />
        <CardContainer />
        <Settings />
    </>,
    document.getElementById("root")
);
