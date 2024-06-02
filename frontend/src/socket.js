import { io } from "socket.io-client";


const ENDPOINT = process.env.REACT_APP_DEV_ENDPOINT || "http://localhost:4000";

export const socket = io(ENDPOINT, {
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 3,
    forceNew: true,
    timeout: 10000,
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});