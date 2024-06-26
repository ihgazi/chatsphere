export interface UserInfo {
    id: string;
    username: string;
}

export interface RoomInfo {
    id: string;
    name: string;
}

export interface Message {
    content: string;
    username: string;
    room_id: string;
    user_id: string;
}

export type Conn = WebSocket | null;
