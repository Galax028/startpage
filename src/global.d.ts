import React from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "box-icon": BoxIconProps;
        }
    }
}

interface BoxIconProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    > {
    name?: string;
    color?: string;
    size?: string;
    pull?: string;
    animation?: string;
}
