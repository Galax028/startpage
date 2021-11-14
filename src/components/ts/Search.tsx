import React, { Component, FormEvent } from "react";
import Autosuggest from "react-autosuggest";
import styles from "../scss/Search.module.scss";

class Search extends Component {
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            value: "",
            suggestions: [],
        };
    }

    onChange = (_event, { newValue }) => {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        fetch(
            `https://thingproxy.freeboard.io/fetch/https://suggestqueries.google.com/complete/search?client=chrome&q=${value.replace(
                " ",
                "_"
            )}`
        )
            .then((res) => res.json())
            .then((data) => {
                const newSuggestions: string[] = data[1];
                let suggestion: string[] = [];
                const escapedValue = value
                    .trim()
                    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                if (escapedValue !== "")
                    suggestion = newSuggestions.filter((item) =>
                        new RegExp(`^${escapedValue}`, "i").test(item)
                    );
                this.setState({ suggestions: suggestion });
            });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    onSubmit = (event: FormEvent) => {
        event.preventDefault();
        // @ts-ignore
        if (this.state.value.trim() !== "")
            // @ts-ignore
            window.location = localStorage
                .getItem("search-url")
                // @ts-ignore
                .replace("{query}", this.state.value);
    };

    render() {
        // @ts-ignore
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Search DuckDuckGo",
            value,
            onChange: this.onChange,
        };

        return (
            <form onSubmit={this.onSubmit}>
                <Autosuggest
                    theme={styles}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={(s) => s}
                    renderSuggestion={(s) => <span>{s}</span>}
                    inputProps={inputProps}
                />
            </form>
        );
    }
}

export default Search;
