import {createContext,useEffect} from 'react';
import {io} from 'socket.io-client';
import BASE_URL from './Config';
export const SocketContext =createContext();

const socket = io(BASE_URL, {
  transports: ['websocket', 'polling'], // Ensure proper transport methods
  withCredentials: true, // Allow cross-origin requests
});

const SocketProvider=({children})=>{
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('Connected to socket server');
        });

        socket.on('disconnect',()=>{
            console.log('Disconnected from socket server');
        });
    },[])
    
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;