import { useEffect, useRef, useCallback } from 'react';

export const useBroadcastChannel = (channelName: string) => {
    const channelRef = useRef<BroadcastChannel | null>(null);
  
    useEffect(() => {
      try {
        channelRef.current = new BroadcastChannel(channelName);
      } catch (error) {
        console.error('Failed to create BroadcastChannel:', error);
      }
  
      return () => {
        try {
          channelRef.current?.close();
        } catch (error) {
          console.error('Failed to close BroadcastChannel:', error);
        }
      };
    }, [channelName]);
  
    const postMessage = useCallback((message: any) => {
      console.log('Posting message:', message);
      try {
        channelRef.current?.postMessage(message);
      } catch (error) {
        console.error('Failed to post message:', error);
      }
    }, []);
  
    return { postMessage, channel: channelRef.current };
  };