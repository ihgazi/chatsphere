export interface UserInfo {
    id: string;
    username: string;
    is_online: boolean;
}

export interface RoomInfo {
    id: string;
    name: string;
}

export interface Message {
    type?: string;
    event?: string;
    content: string;
    username: string;
    room_id: string;
    user_id: string;
}

export type Conn = WebSocket | null;
