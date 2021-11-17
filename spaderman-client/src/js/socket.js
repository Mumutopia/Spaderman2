import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5001";
export const socket = socketIOClient(ENDPOINT);