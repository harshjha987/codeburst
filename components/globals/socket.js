import { io } from 'socket.io-client'

const socket = io('http://172.21.214.142:9000')

export default socket