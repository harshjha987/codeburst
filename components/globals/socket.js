import { io } from 'socket.io-client'

const socket = io('http://172.26.248.218:9000')

export default socket