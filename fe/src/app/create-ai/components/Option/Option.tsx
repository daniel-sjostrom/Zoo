import { AvailableModel } from "@/app/stores/useAIStore";
import commonStyles from "@/styles/common.module.css";

import styles from "./Option.module.css";

interface Props {
    option: AvailableModel;
}

export const Option: React.FC<Props> = (props) => {
    return (
        <button className={styles.optionCard}>
            <div className={styles.optionText}>
                <h3 className={styles.h3}>{props.option.name}</h3>
                <div className={commonStyles.space1} />
                <p className={styles.p}>{props.option.description}</p>
            </div>
            <h2>✨</h2>
        </button>
    );
};
