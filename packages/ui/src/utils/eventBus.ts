type EventCallback = (...args: unknown[]) => void;

const listeners = new Map<string, Set<EventCallback>>();

export const eventBus = {
  on(event: string, callback: EventCallback): void {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event)!.add(callback);
  },
  off(event: string, callback: EventCallback): void {
    listeners.get(event)?.delete(callback);
  },
  emit(event: string, ...args: unknown[]): void {
    listeners.get(event)?.forEach((cb) => cb(...args));
  },
};
