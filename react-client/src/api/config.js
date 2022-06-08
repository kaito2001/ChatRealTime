import axios from "axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const token = Cookies.get("token");

export const socket = io("http://127.0.0.1:5000");
