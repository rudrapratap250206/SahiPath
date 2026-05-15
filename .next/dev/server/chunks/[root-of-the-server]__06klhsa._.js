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
"[project]/pages/api/auth/me.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
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
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const BetterSqlite3 = __turbopack_context__.r("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
        const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'app.db');
        const db = new BetterSqlite3(dbPath);
        const row = db.prepare('SELECT profile FROM users WHERE id = ?').get(String(payload.id));
        db.close();
        if (!row) return res.status(404).json({
            error: 'User not found'
        });
        return res.json({
            profile: row.profile ? JSON.parse(row.profile) : null
        });
    } catch (e) {
        console.error('me lookup error', e?.message || e);
        return res.status(500).json({
            error: 'User lookup failed',
            detail: e?.message || String(e)
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06klhsa._.js.map