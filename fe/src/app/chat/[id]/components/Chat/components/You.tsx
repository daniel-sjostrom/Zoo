import commonStyles from "@/styles/common.module.css";
import { copy } from "@/copy/en";

interface Props {
    prompt: string;
}

const You: React.FC<Props> = (props) => {
    return (
        <div>
            <h4>{copy.chat_you}</h4>
            <div className={commonStyles.space1} />
            <p>{props.prompt}</p>
        </div>
    );
};

export default You;
