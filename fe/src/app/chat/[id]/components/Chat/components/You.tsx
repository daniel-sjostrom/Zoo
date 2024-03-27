import { copy } from "@/copy/en";
import { Vertical1 } from "@/components/HorizontalVertical/Vertical";

interface Props {
    prompt: string;
}

const You: React.FC<Props> = (props) => {
    return (
        <div>
            <h4>{copy.chat_you}</h4>
            <Vertical1 />
            <p>{props.prompt}</p>
        </div>
    );
};

export default You;
