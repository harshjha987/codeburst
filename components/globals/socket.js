import { io } from 'socket.io-client'

const socket = io('http://172.25.52.195:9000')

export default socket