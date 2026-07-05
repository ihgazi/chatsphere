import { useContext } from "react";

import { WebSocketContext } from "@/context/WebSocketContext";
import styles from "./RoomSettings.module.css";

interface SettingsProps {
    setOpen: () => void;
}

const RoomSettings: React.FC<SettingsProps> = ({ setOpen }) => {
    const { users, myRooms, activeRoomId } = useContext(WebSocketContext);

    const room = myRooms.find(r => r.id === activeRoomId) || { name: "Unknown", id: "" };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{`Room Information`}</h1>
                    <button className={styles.closeButton} onClick={() => setOpen()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className={styles.roomInfo}>
                    <h2 className={styles.roomName}>{room.name}</h2>
                    <p className={styles.roomId}>{`#${room.id}`}</p>
                </div>
                <div className={styles.membersSection}>
                    <h3 className={styles.membersTitle}>Members ({users.filter(u => u.is_online).length} online)</h3>
                    <div className={styles.membersList}>
                        {[...users].sort((a, b) => (a.is_online === b.is_online ? 0 : a.is_online ? -1 : 1)).map((user, index) => (
                            <div key={index} className={styles.memberItem}>
                                <div className={styles.memberInfo}>
                                    <div className={user.is_online ? styles.statusDotOnline : styles.statusDotOffline}></div>
                                    <p className={user.is_online ? styles.memberNameOnline : styles.memberNameOffline}>{user.username}</p>
                                </div>
                                <p className={styles.memberId}>#{user.id}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomSettings;
