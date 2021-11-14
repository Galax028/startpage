import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "boxicons";
import styles from "../scss/Settings.module.scss";

const Settings = () => {
    Modal.setAppElement("#root");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let searchUrlConfig;
    let bookmarksConfig;

    const onAfterOpen = () => {
        // @ts-ignore
        searchUrlConfig = document.getElementById("search-url-config");
        // @ts-ignore
        bookmarksConfig = document.getElementById("bookmarks-config");
        // @ts-ignore
        searchUrlConfig.value = localStorage.getItem("search-url");
        // @ts-ignore
        bookmarksConfig.value = JSON.stringify(
            // @ts-ignore
            JSON.parse(localStorage.getItem("bookmarks")),
            null,
            4
        );
    };

    const saveButtonOnClick = () => {
        localStorage.setItem("search-url", searchUrlConfig.value);
        localStorage.setItem("bookmarks", JSON.stringify(JSON.parse(bookmarksConfig.value)));
        setTimeout(() => window.location.reload(), 500);
    };

    return (
        <>
            <div
                className={styles.settings}
                onClick={() => setModalIsOpen(true)}
            >
                <box-icon
                    name="cog"
                    color="#949494"
                    size="md"
                    animation="spin-hover"
                ></box-icon>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onAfterOpen={onAfterOpen}
                className={styles.settingsModal}
                overlayClassName={styles.modalOverlay}
                contentLabel="Settings Modal"
            >
                <div className={styles.header}>
                    <h3 className={styles.title}>Startpage Settings</h3>
                    <div
                        className={styles.closeButton}
                        onClick={() => setModalIsOpen(false)}
                    >
                        <box-icon
                            name="x"
                            color="#949494"
                            size="md"
                            animation="flashing-hover"
                        ></box-icon>
                    </div>
                </div>
                <h5>Search URL</h5>
                <input type="text" id="search-url-config" />
                <hr />
                <h5>Bookmarks</h5>
                <textarea id="bookmarks-config" spellCheck={false}></textarea>
                <div className={styles.saveButton} onClick={saveButtonOnClick}>
                    <box-icon name="save" color="#949494"></box-icon>
                    Save
                </div>
            </Modal>
        </>
    );
};

export default Settings;
