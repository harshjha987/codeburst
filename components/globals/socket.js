import { io } from 'socket.io-client'

const socket = io('http://172.28.176.212:9000')

export default socket