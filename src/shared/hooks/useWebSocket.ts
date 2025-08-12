import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, IFrame, StompSubscription } from '@stomp/stompjs';
import SockJS from "sockjs-client";

interface UseWebSocketOptions {
  url: string;
  enabled?: boolean; // 연결 활성화 여부
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error | IFrame) => void;
}

interface UseWebSocketReturn {
  client: Client | null;
  isConnected: boolean;
  subscribe: (destination: string, callback: (message: string) => void) => StompSubscription | null;
  publish: (destination: string, message: string) => void;
  disconnect: () => void;
  
}

export const useWebSocket = (options: UseWebSocketOptions): UseWebSocketReturn => {
  const { url, enabled = true, onConnect, onDisconnect, onError } = options;
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);

  // STOMP 클라이언트 초기화
  const initializeClient = useCallback(() => {
    // 현재 페이지의 프로토콜 확인
    
    
    const client = new Client({
      webSocketFactory: () => {
        return new SockJS(url, null, {
          transports: ['websocket', 'xhr-streaming', 'xhr-polling']
        });
      },
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000, // 재연결 시도 간격 (5초)
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 연결 성공 시 콜백
    client.onConnect = () => {
      console.log("WebSocket 연결됨");
      setIsConnected(true);
      onConnect?.();
    };

    // 연결 해제 시 콜백
    client.onDisconnect = () => {
      console.log("WebSocket 연결 해제됨");
      setIsConnected(false);
      onDisconnect?.();
    };

    // 에러 발생 시 콜백
    client.onStompError = (frame) => {
      console.error("STOMP 에러:", frame);
      onError?.(frame);
    };

    clientRef.current = client;
    return client;
  }, [url, onConnect, onDisconnect, onError]);

  // 구독 함수
  const subscribe = useCallback((destination: string, callback: (message: string) => void) => {
    if (!clientRef.current || !isConnected) {
      console.warn('WebSocket이 연결되지 않았습니다.');
      return null;
    }

    try {
      return clientRef.current.subscribe(destination, (message) => {
        try {
          const body = JSON.parse(message.body);
          callback(body);
        } catch (error) {
          console.error('메시지 파싱 에러:', error);
          callback(message.body);
        }
      });
    } catch (error) {
      console.error('구독 에러:', error);
      return null;
    }
  }, [isConnected]);

  // 메시지 발행 함수
  const publish = useCallback((destination: string, message: string) => {
    if (!clientRef.current || !isConnected) {
      console.warn('WebSocket이 연결되지 않았습니다.');
      return;
    }

    try {
      clientRef.current.publish({
        destination,
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error('메시지 발행 에러:', error);
    }
  }, [isConnected]);

  // 연결 해제 함수
  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
  }, []);

  // enabled 상태에 따라 연결/해제
  useEffect(() => {
    if (!enabled) {
      // 비활성화된 경우 기존 연결 해제
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
      return;
    }

    const client = initializeClient();
    client.activate();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      client.deactivate();
    };
  }, [initializeClient, enabled]);

  return {
    client: clientRef.current,
    isConnected,
    subscribe,
    publish,
    disconnect,
  };
};
