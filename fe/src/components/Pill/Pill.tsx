import { Colors } from "@/types/types";

import { Horizontal1 } from "../HorizontalVertical/Horizontal";

import styles from "./Pill.module.css";

interface Props {
    text: string;
    disabled?: boolean;
    secondary?: boolean;
    color?: Colors;
}

const getBackgroundColor = (
    color: Colors | undefined,
    secondary: boolean | undefined
) => {
    if (secondary) {
        return undefined;
    }

    if (color === "sand") {
        return styles.sand_background;
    }

    if (color === "pink") {
        return styles.pink_background;
    }

    if (color === "purple") {
        return styles.purple_background;
    }

    return styles.sand_background;
};

const getStrokeColor = (
    color: Colors | undefined,
    secondary: boolean | undefined
) => {
    if (secondary === undefined) {
        return undefined;
    }

    if (color === "sand") {
        return styles.sand_stroke;
    }

    if (color === "pink") {
        return styles.pink_stroke;
    }

    if (color === "purple") {
        return styles.purple_stroke;
    }

    return styles.sand_stroke;
};

const Pill: React.FC<Props> = (props) => {
    const strokeColor = getStrokeColor(props.color, props.secondary);
    const backgroundColor = getBackgroundColor(props.color, props.secondary);

    return (
        <button
            disabled={props.disabled}
            className={`${styles.main} ${strokeColor} ${backgroundColor} ${
                props.disabled && styles.disabled
            }`}
        >
            <div className={styles.circle}>
                {props.text.charAt(0).toUpperCase()}
            </div>
            <Horizontal1 />
            {props.text}
        </button>
    );
};

export default Pill;
