import { useContext } from "react";

import { WebSocketContext } from "@/context/WebSocketContext";

interface SettingsProps {
    setOpen: () => void;
}

const RoomSettings: React.FC<SettingsProps> = ({ setOpen }) => {
    const { users, room } = useContext(WebSocketContext);

    return (
        <div className="fixed inset-0 z-1 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="p-8 bg-white w-full max-w-md m-auto rounded-md mx-4">
                <div className="flex">
                    <h1 className="text-xl font-bold">{`Room Information`}</h1>
                    <button className="ml-auto" onClick={() => setOpen()}>
                        <img src="/icon-cross.png" alt={"x"} />
                    </button>
                </div>
                <div className="flex mt-3 items-center gap-2">
                    <h2 className="text-lg">{room.name}</h2>
                    <p className="font-extralight">{`#${room.id}`}</p>
                </div>
                <div className="flex flex-col mt-8 gap-1">
                    <h3 className="font-bold mb-2">Active Users:</h3>
                    {users.map((user, index) => {
                        return (
                            <p
                                key={index}
                            >{`${user.username}     #${user.id}`}</p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RoomSettings;
