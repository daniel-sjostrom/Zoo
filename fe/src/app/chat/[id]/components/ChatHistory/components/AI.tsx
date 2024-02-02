import commonStyles from "@/styles/common.module.css";

interface Props {
    aiSettingsName: string | undefined;
    response: string;
    streamingResponse: string[];
}

const AI: React.FC<Props> = (props) => {
    return (
        <div>
            <h4>{props.aiSettingsName}</h4>
            <div className={commonStyles.space1} />
            {props.response.length > 0 ? (
                <>
                    <p>{props.response}</p>
                    <div className={commonStyles.space6} />
                </>
            ) : (
                <>
                    <p>{props.streamingResponse}</p>
                    <div className={commonStyles.space6} />
                </>
            )}
        </div>
    );
};

export default AI;
