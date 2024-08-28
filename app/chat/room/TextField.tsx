import { useContext, useRef } from "react";
import { WebSocketContext } from "@/context/WebSocketContext";
import { useRouter } from "next/navigation";

const TextField = () => {
    const { conn } = useContext(WebSocketContext);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const sendMessage = () => {
        if (!textAreaRef.current?.value) return;
        if (conn === null) {
            router.push("/chat");
            return;
        }

        conn?.send(textAreaRef.current.value);
        textAreaRef.current.value = "";
    };

    const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="mt-4 w-full">
            <div className="flex px-4 py-2 bg-grey-300 rounded-md mx-2">
                <div className="flex w-full mr-4 rounded-md border border-blue">
                    <textarea
                        ref={textAreaRef}
                        placeholder="type your message here"
                        className="w-full h-10 p-2 rounded-md focus:outline-none"
                        onKeyDown={handleEnter}
                        rows={1}
                    />
                </div>
                <div className="flex items-center">
                    <button
                        className="p-2 rounded-md bg-blue-500 text-white"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextField;
