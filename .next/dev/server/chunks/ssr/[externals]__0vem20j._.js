module.exports = [
"[externals]/node:fs [external] (node:fs, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_node_fs_0~5d6ws._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/node:fs [external] (node:fs, cjs)");
    });
});
}),
"[externals]/node:https [external] (node:https, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_node_https_03yjm1i._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/node:https [external] (node:https, cjs)");
    });
});
}),
];