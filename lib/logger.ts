type Meta = Record<string, any> | undefined;

function now() { return new Date().toISOString(); }

function safeStringify(obj: any) {
  try { return JSON.stringify(obj); } catch (e) { return String(obj); }
}

export function log(level: 'info'|'warn'|'error'|'debug', message: string, meta?: Meta) {
  const out: any = { ts: now(), level, message };
  if (meta) out.meta = meta;
  // use console.log so logs appear in server output
  console.log(safeStringify(out));
}

export function info(message: string, meta?: Meta) { log('info', message, meta); }
export function warn(message: string, meta?: Meta) { log('warn', message, meta); }
export function error(message: string, meta?: Meta) { log('error', message, meta); }
export function debug(message: string, meta?: Meta) { log('debug', message, meta); }
