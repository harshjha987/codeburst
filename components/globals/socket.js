import { io } from 'socket.io-client'

const socket = io('http://172.19.57.151:9000')

export default socket