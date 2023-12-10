import React from "react";

import styles from "./ButtonDisabled.module.css";

interface Props {
    children: string;
}

const ButtonDisabled: React.FC<Props> = (props) => {
    return <button className={`${styles.button}`}>{props.children}</button>;
};

export default ButtonDisabled;
