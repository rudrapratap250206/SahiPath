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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/pages/api/auth/login.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data');
const USERS_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, 'users.json');
let BetterSqlite3 = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    BetterSqlite3 = (()=>{
        const e = new Error("Cannot find module 'better-sqlite3'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
} catch (e) {
    BetterSqlite3 = null;
}
function verifyPassword(password, stored) {
    const [salt, derived] = (stored || '').split(':');
    if (!salt || !derived) return false;
    const hash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].scryptSync(password, salt, 64).toString('hex');
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derived, 'hex'));
    } catch (e) {
        return false;
    }
}
async function fileLogin(email, password) {
    let users = [];
    try {
        const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(USERS_PATH, 'utf8');
        users = JSON.parse(raw);
    } catch (err) {
        users = [];
    }
    const user = users.find((u)=>u.email === email);
    if (!user) return {
        error: 'Invalid credentials'
    };
    const ok = verifyPassword(password, user.passwordHash);
    if (!ok) return {
        error: 'Invalid credentials'
    };
    return {
        user: {
            id: user.id,
            email: user.email,
            profile: user.profile
        }
    };
}
async function sqliteLogin(dbPath, email, password) {
    const db = new BetterSqlite3(dbPath);
    db.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE, passwordHash TEXT, profile TEXT, createdAt TEXT)').run();
    const row = db.prepare('SELECT id, email, passwordHash, profile FROM users WHERE email = ?').get(email);
    db.close();
    if (!row) return {
        error: 'Invalid credentials'
    };
    const ok = verifyPassword(password, row.passwordHash);
    if (!ok) return {
        error: 'Invalid credentials'
    };
    return {
        user: {
            id: row.id,
            email: row.email,
            profile: row.profile ? JSON.parse(row.profile) : null
        }
    };
}
async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({
        error: 'Method not allowed'
    });
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({
        error: 'Missing email or password'
    });
    try {
        if (BetterSqlite3) {
            const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'app.db');
            const out = await sqliteLogin(dbPath, email, password);
            if (out.error) return res.status(401).json({
                error: out.error
            });
            return res.json(out);
        }
        const out = await fileLogin(email, password);
        if (out.error) return res.status(401).json({
            error: out.error
        });
        return res.json(out);
    } catch (err) {
        console.error('login error', err?.message || err);
        return res.status(500).json({
            error: err?.message || 'internal error'
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0q6k.of._.js.map