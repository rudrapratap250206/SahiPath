import { useEffect, useRef } from 'react';
import { useCopilotChat } from '@copilotkit/react-core';

const THREAD_PREFIX = 'sp_copilot_thread_';
const MAX_MESSAGES = 40;

interface Props {
  userKey: string | null;
}

export function CopilotPersistence({ userKey }: Props) {
  const { visibleMessages, setMessages } = useCopilotChat();
  const loadedKeyRef = useRef<string | null>(null);
  const isRestoringRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!userKey || loadedKeyRef.current === userKey) return;
    loadedKeyRef.current = userKey;

    try {
      const raw = localStorage.getItem(THREAD_PREFIX + userKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved) || saved.length === 0) return;

      isRestoringRef.current = true;
      setMessages(saved as any);
      setTimeout(() => { isRestoringRef.current = false; }, 300);
    } catch {
      isRestoringRef.current = false;
    }
  }, [userKey, setMessages]);

  useEffect(() => {
    if (!userKey || isRestoringRef.current) return;
    if (loadedKeyRef.current !== userKey) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        const toSave = visibleMessages
          .filter((m: any) => m.role === 'user' || m.role === 'assistant')
          .slice(-MAX_MESSAGES);
        if (toSave.length === 0) return;
        localStorage.setItem(THREAD_PREFIX + userKey, JSON.stringify(toSave));
      } catch {}
    }, 800);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [visibleMessages, userKey]);

  return null;
}
