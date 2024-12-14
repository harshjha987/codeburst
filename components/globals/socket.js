import { io } from 'socket.io-client'

const socket = io('http://172.29.236.248:9000')

export default socket