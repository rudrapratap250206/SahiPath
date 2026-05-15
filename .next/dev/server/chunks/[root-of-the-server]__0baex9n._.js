module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/auth.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cookieSerialize",
    ()=>cookieSerialize,
    "signToken",
    ()=>signToken,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jsonwebtoken$29$__ = __turbopack_context__.i("[externals]/jsonwebtoken [external] (jsonwebtoken, cjs, [project]/node_modules/jsonwebtoken)");
;
;
;
;
const SECRET_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'jwt_secret.key');
async function getOrCreateSecret() {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(SECRET_PATH), {
            recursive: true
        });
        const exists = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(SECRET_PATH);
        if (!exists) {
            const val = __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jsonwebtoken$29$__["default"].sign({
                i: 1
            }, 'init', {
                expiresIn: '1h'
            }); // dummy to create randomness
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(SECRET_PATH, Buffer.from(val).toString('hex'));
        }
        const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(SECRET_PATH, 'utf8');
        return raw || 'dev-secret';
    } catch (e) {
        return process.env.JWT_SECRET || 'dev-secret';
    }
}
async function signToken(payload, opts) {
    const secret = process.env.JWT_SECRET || await getOrCreateSecret();
    return __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jsonwebtoken$29$__["default"].sign(payload, secret, {
        expiresIn: '7d',
        ...opts || {}
    });
}
async function verifyToken(token) {
    if (!token) return null;
    const secret = process.env.JWT_SECRET || await getOrCreateSecret();
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jsonwebtoken$29$__["default"].verify(token, secret);
    } catch (e) {
        return null;
    }
}
function cookieSerialize(name, value, opts = {}) {
    const cookie = __turbopack_context__.r("[externals]/cookie [external] (cookie, cjs, [project]/node_modules/cookie)");
    const defaults = {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: ("TURBOPACK compile-time value", "development") === 'production'
    };
    const out = Object.assign({}, defaults, opts || {});
    return cookie.serialize(name, value, out);
}
}),
"[project]/lib/http.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendError",
    ()=>sendError,
    "sendOk",
    ()=>sendOk
]);
function sendError(res, status, message) {
    return res.status(status).json({
        error: message
    });
}
function sendOk(res, payload) {
    return res.status(200).json(payload);
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/request.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "attachCorrelationId",
    ()=>attachCorrelationId,
    "getCorrelationId",
    ()=>getCorrelationId
]);
function getCorrelationId(req) {
    const header = req.headers['x-correlation-id'];
    try {
        // prefer incoming header
        if (header && header.trim()) return header;
        // fallback to crypto random UUID
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
        return crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
    } catch (e) {
        return String(Date.now());
    }
}
function attachCorrelationId(res, id) {
    try {
        res.setHeader('X-Correlation-ID', id);
    } catch (e) {
    // ignore
    }
}
}),
"[project]/lib/logger.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debug",
    ()=>debug,
    "error",
    ()=>error,
    "info",
    ()=>info,
    "log",
    ()=>log,
    "warn",
    ()=>warn
]);
function now() {
    return new Date().toISOString();
}
function safeStringify(obj) {
    try {
        return JSON.stringify(obj);
    } catch (e) {
        return String(obj);
    }
}
function log(level, message, meta) {
    const out = {
        ts: now(),
        level,
        message
    };
    if (meta) out.meta = meta;
    // use console.log so logs appear in server output
    console.log(safeStringify(out));
}
function info(message, meta) {
    log('info', message, meta);
}
function warn(message, meta) {
    log('warn', message, meta);
}
function error(message, meta) {
    log('error', message, meta);
}
function debug(message, meta) {
    log('debug', message, meta);
}
}),
"[project]/pages/api/auth/me.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$http$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/http.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$request$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/request.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [api] (ecmascript)");
;
;
;
;
;
async function handler(req, res) {
    const cookie = req.headers.cookie || '';
    const match = cookie.split(';').map((c)=>c.trim()).find((c)=>c.startsWith('sahipath_token='));
    if (!match) return res.status(401).json({
        error: 'Not authenticated'
    });
    const token = match.split('=')[1];
    const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["verifyToken"])(token);
    if (!payload) return res.status(401).json({
        error: 'Invalid token'
    });
    const cid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$request$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["getCorrelationId"])(req);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$request$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["attachCorrelationId"])(res, cid);
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const BetterSqlite3 = __turbopack_context__.r("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
        const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'app.db');
        const db = new BetterSqlite3(dbPath);
        const row = db.prepare('SELECT profile FROM users WHERE id = ?').get(String(payload.id));
        db.close();
        if (!row) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["error"])('me lookup: user not found', {
                cid,
                id: payload.id
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$http$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["sendError"])(res, 404, 'User not found');
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["info"])('me lookup', {
            cid,
            id: payload.id
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$http$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["sendOk"])(res, {
            profile: row.profile ? JSON.parse(row.profile) : null
        });
    } catch (e) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["error"])('me lookup error', {
            cid,
            message: e?.message || String(e)
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$http$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["sendError"])(res, 500, 'User lookup failed');
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0baex9n._.js.map