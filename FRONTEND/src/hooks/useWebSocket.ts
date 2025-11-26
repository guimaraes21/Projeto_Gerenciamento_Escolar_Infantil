import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';

interface UseWebSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string, callback?: (data: any) => void) => void;
}

/**
 * Custom Hook para gerenciar conexões WebSocket
 * 
 * Este hook personalizado encapsula toda a lógica de conexão com WebSocket,
 * fornecendo uma interface simples para componentes React consumirem eventos
 * em tempo real do servidor.
 * 
 * Funcionalidades:
 * - Estabelece conexão automática ao montar o componente
 * - Gerencia o estado de conexão
 * - Fornece métodos para emitir e ouvir eventos
 * - Limpa a conexão automaticamente ao desmontar
 * 
 * @returns {UseWebSocketReturn} Objeto contendo socket, status de conexão e métodos
 */
export const useWebSocket = (): UseWebSocketReturn => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Criar conexão WebSocket
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    const socket = socketRef.current;

    // Eventos de conexão
    socket.on('connect', () => {
      console.log('WebSocket conectado:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket desconectado');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Erro na conexão WebSocket:', error);
      setIsConnected(false);
    });

    // Cleanup ao desmontar
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Método para emitir eventos
  const emit = useCallback((event: string, data: any) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  // Método para ouvir eventos
  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  }, []);

  // Método para remover listeners
  const off = useCallback((event: string, callback?: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    emit,
    on,
    off,
  };
};
