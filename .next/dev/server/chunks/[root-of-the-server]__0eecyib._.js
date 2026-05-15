module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/validate.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "loginSchema",
    ()=>loginSchema,
    "registerSchema",
    ()=>registerSchema,
    "sanitizeInput",
    ()=>sanitizeInput,
    "testRecordSchema",
    ()=>testRecordSchema
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__ = __turbopack_context__.i("[externals]/zod [external] (zod, esm_import, [project]/node_modules/zod)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$xss__$5b$external$5d$__$28$xss$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$xss$29$__ = __turbopack_context__.i("[externals]/xss [external] (xss, cjs, [project]/node_modules/xss)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const registerSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].string().email(),
    password: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].string().min(6).max(128),
    profile: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].any().optional()
});
const loginSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].string().email(),
    password: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].string().min(1)
});
const testRecordSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].string().min(1).max(200),
    score: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].number().min(0).max(100),
    date: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].string().optional(),
    notes: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zod$29$__["z"].string().optional()
});
function sanitizeInput(obj) {
    const out = {};
    for (const k of Object.keys(obj)){
        const v = obj[k];
        if (typeof v === 'string') out[k] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$xss__$5b$external$5d$__$28$xss$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$xss$29$__["default"])(v.trim());
        else out[k] = v;
    }
    return out;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/rateLimit.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rateLimit",
    ()=>rateLimit
]);
const map = new Map();
function rateLimit(key, limit = 10, windowMs = 60_000) {
    const now = Date.now();
    const rec = map.get(key) || {
        count: 0,
        resetAt: now + windowMs
    };
    if (now > rec.resetAt) {
        rec.count = 0;
        rec.resetAt = now + windowMs;
    }
    rec.count += 1;
    map.set(key, rec);
    const remaining = Math.max(0, limit - rec.count);
    const reset = rec.resetAt;
    const limited = rec.count > limit;
    return {
        limited,
        remaining,
        reset
    };
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/pages/api/auth/utils.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
;
;
const scryptAsync = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].scrypt);
async function hashPassword(password) {
    try {
        // prefer bcryptjs if available
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const bcrypt = __turbopack_context__.r("[externals]/bcryptjs [external] (bcryptjs, cjs, [project]/node_modules/bcryptjs)");
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    } catch (err) {
        const salt = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(16).toString('hex');
        const derived = await scryptAsync(password, salt, 64);
        return `${salt}:${derived.toString('hex')}`;
    }
}
async function verifyPassword(password, hashed) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const bcrypt = __turbopack_context__.r("[externals]/bcryptjs [external] (bcryptjs, cjs, [project]/node_modules/bcryptjs)");
        return bcrypt.compareSync(password, hashed);
    } catch (err) {
        const [salt, derivedHex] = (hashed || '').split(':');
        if (!salt || !derivedHex) return false;
        const derived = await scryptAsync(password, salt, 64);
        return derived.toString('hex') === derivedHex;
    }
}
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

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
"[project]/pages/api/auth/login.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validate$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validate.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rateLimit$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rateLimit.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f$utils$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/auth/utils.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validate$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validate$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data');
async function sqliteLogin(dbPath, email, password) {
    // require better-sqlite3 runtime
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const BetterSqlite3 = __turbopack_context__.r("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
    const db = new BetterSqlite3(dbPath);
    db.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE, passwordHash TEXT, profile TEXT, createdAt TEXT)').run();
    const row = db.prepare('SELECT id, email, passwordHash, profile FROM users WHERE email = ?').get(email);
    db.close();
    if (!row) return {
        error: 'Invalid credentials'
    };
    const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f$utils$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["verifyPassword"])(password, row.passwordHash);
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
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
    const rl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rateLimit$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["rateLimit"])(String(ip) + ':login', 10, 60_000);
    if (rl.limited) return res.status(429).json({
        error: 'Too many requests'
    });
    const input = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validate$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["sanitizeInput"])(req.body || {});
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validate$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["loginSchema"].safeParse(input);
    if (!parsed.success) return res.status(400).json({
        error: parsed.error.errors.map((e)=>e.message).join(', ')
    });
    const { email, password } = parsed.data;
    try {
        // require sqlite and use it exclusively
        let BetterSqlite3 = null;
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            BetterSqlite3 = __turbopack_context__.r("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
        } catch (e) {
            return res.status(500).json({
                error: 'better-sqlite3-not-installed',
                message: 'Run `npm install better-sqlite3` on the server'
            });
        }
        const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'app.db');
        const out = await sqliteLogin(dbPath, email, password);
        if (out.error) return res.status(401).json({
            error: out.error
        });
        const { signToken, cookieSerialize } = __turbopack_context__.r("[project]/lib/auth.ts [api] (ecmascript)");
        const token = await signToken({
            id: out.user.id,
            email: out.user.email
        });
        res.setHeader('Set-Cookie', cookieSerialize('sahipath_token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        }));
        return res.json(out);
    } catch (err) {
        console.error('login error', err?.message || err);
        return res.status(500).json({
            error: err?.message || 'internal error'
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0eecyib._.js.map