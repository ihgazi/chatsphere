import { useContext } from "react";

import { WebSocketContext } from "@/context/WebSocketContext";

interface SettingsProps {
    setOpen: () => void;
}

const RoomSettings: React.FC<SettingsProps> = ({ setOpen }) => {
    const { users, myRooms, activeRoomId } = useContext(WebSocketContext);

    const room = myRooms.find(r => r.id === activeRoomId) || { name: "Unknown", id: "" };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="p-8 bg-white w-full max-w-md m-auto rounded-md mx-4 shadow-2xl">
                <div className="flex items-center border-b pb-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{`Room Information`}</h1>
                    <button className="ml-auto text-gray-500 hover:text-gray-800" onClick={() => setOpen()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex mt-3 items-baseline gap-2 bg-blue-50 p-3 rounded-lg">
                    <h2 className="text-xl font-semibold text-blue-900">{room.name}</h2>
                    <p className="font-extralight text-sm text-blue-600">{`#${room.id}`}</p>
                </div>
                <div className="flex flex-col mt-8 gap-2">
                    <h3 className="font-bold mb-2 text-gray-800">Members ({users.filter(u => u.is_online).length} online)</h3>
                    <div className="max-h-60 overflow-y-auto pr-2 flex flex-col gap-2">
                        {[...users].sort((a, b) => (a.is_online === b.is_online ? 0 : a.is_online ? -1 : 1)).map((user, index) => (
                            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full ${user.is_online ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <p className={`font-medium ${user.is_online ? 'text-gray-800' : 'text-gray-500'}`}>{user.username}</p>
                                </div>
                                <p className="text-xs text-gray-400">#{user.id}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomSettings;
