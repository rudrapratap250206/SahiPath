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
    return cookie.serialize(name, value, opts);
}
}),
"[project]/pages/api/auth/login.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validate$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validate.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rateLimit$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rateLimit.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validate$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validate$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data');
const USERS_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, 'users.json');
function verifyPassword(password, stored) {
    try {
        // prefer bcryptjs if installed
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const bcrypt = __turbopack_context__.r("[externals]/bcryptjs [external] (bcryptjs, cjs, [project]/node_modules/bcryptjs)");
        return bcrypt.compareSync(password, stored);
    } catch (e) {
        const [salt, derived] = (stored || '').split(':');
        if (!salt || !derived) return false;
        const hash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].scryptSync(password, salt, 64).toString('hex');
        try {
            return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derived, 'hex'));
        } catch (err) {
            return false;
        }
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
    if (!user) {
        console.warn('fileLogin: no user found for', email);
        return {
            error: 'Invalid credentials'
        };
    }
    // support multiple possible property names for stored password
    const stored = user.passwordHash || user.password || user.hashedPassword || user.pass || '';
    if (!stored) {
        console.warn('fileLogin: user has no password field', {
            email,
            user
        });
        return {
            error: 'Invalid credentials'
        };
    }
    const ok = verifyPassword(password, stored);
    if (!ok) {
        console.warn('fileLogin: password verification failed for', email);
        return {
            error: 'Invalid credentials'
        };
    }
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
        // attempt sqlite path if better-sqlite3 is installed at runtime
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const BetterSqlite31 = (()=>{
                const e = new Error("Cannot find module 'better-sqlite3'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })();
            if (BetterSqlite31) {
                const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'app.db');
                const out = await sqliteLogin(dbPath, email, password);
                if (out.error) return res.status(401).json({
                    error: out.error
                });
                // set cookie
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
            }
        } catch (e) {
        // sqlite not available — fall through to file-based login
        }
        const out = await fileLogin(email, password);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0bxw5ig._.js.map