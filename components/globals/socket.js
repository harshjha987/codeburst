import { io } from 'socket.io-client'

const socket = io('http://172.19.249.176:9000')

export default socket