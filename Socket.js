import io from 'socket.io-client';
import { Socket_Base } from './src/Constant/Variable.js';
const socket = io(Socket_Base, { autoConnect: false, auth: { userId: "" } });
export default socket
