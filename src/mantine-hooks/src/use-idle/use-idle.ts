import { useState, useEffect, useRef } from 'react';

type eventsType = MouseEvent | KeyboardEvent | TouchEvent | Event;

export function useIdle(timeout: number, cb?: (e?: eventsType) => void) {
    const [idleStatus, setIdleStatus] = useState<boolean>(true);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        const events = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'];
        const handleEvents = (e: eventsType) => {
          setIdleStatus(false);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => {
            setIdleStatus(true);
            if (cb) {
                cb(e);
            }
          }, timeout);
        };
        events.forEach((event) => document.addEventListener(event, handleEvents));
        return () => {
          events.forEach((event) =>
            document.removeEventListener(event, handleEvents)
          );
        };
      }, [timeout]);

    return idleStatus;
}
