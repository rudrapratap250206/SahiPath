module.exports = [
"[externals]/jspdf [external] (jspdf, cjs, [project]/node_modules/jspdf, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_jspdf_0h1m6uh._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/jspdf [external] (jspdf, cjs, [project]/node_modules/jspdf)");
    });
});
}),
"[project]/node_modules/pptxgenjs/dist/pptxgen.es.js [ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]__0734jg3._.js",
  "server/chunks/ssr/node_modules_0gvwi.-._.js",
  "server/chunks/ssr/[externals]__00aetsf._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/pptxgenjs/dist/pptxgen.es.js [ssr] (ecmascript)");
    });
});
}),
];