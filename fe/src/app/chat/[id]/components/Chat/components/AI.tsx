import { Vertical1, Vertical6 } from "@/components/HorizontalVertical/Vertical";

interface Props {
    aiSettingsName: string | undefined;
    response: string;
    streamingResponse: string[];
}

const AI: React.FC<Props> = (props) => {
    return (
        <div>
            <h4>{props.aiSettingsName}</h4>
            <Vertical1 />
            {props.response.length > 0 ? (
                <>
                    <p>{props.response}</p>
                    <Vertical6 />
                </>
            ) : (
                <>
                    <p>{props.streamingResponse}</p>
                    <Vertical6 />
                </>
            )}
        </div>
    );
};

export default AI;
