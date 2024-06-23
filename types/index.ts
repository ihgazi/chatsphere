export interface UserInfo {
    id: string;
    username: string;
}

export interface RoomInfo {
    id: string;
    name: string;
}

export type Conn = WebSocket | null;
