(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateB.type === 'total') {
        // A total update replaces the entire chunk, so it supersedes any prior update.
        return updateB;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/lib/data.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "careerData",
    ()=>careerData,
    "translations",
    ()=>translations
]);
const careerData = {
    frontend: {
        id: 'frontend',
        title: 'Frontend Engineer',
        stage: 'Best when you like building user interfaces and interactive products.',
        summary: 'Builds web interfaces, design systems, and accessible user experiences.',
        skills: [
            'HTML',
            'CSS',
            'JavaScript',
            'React',
            'Accessibility'
        ],
        roadmap: [
            'Learn HTML/CSS',
            'Master JavaScript',
            'Learn React',
            'Build 3 projects',
            'Create portfolio'
        ],
        freeResources: [
            {
                label: 'MDN Web Docs',
                url: 'https://developer.mozilla.org/',
                type: 'Documentation'
            },
            {
                label: 'freeCodeCamp',
                url: 'https://www.freecodecamp.org/',
                type: 'Course'
            }
        ],
        paidResources: [
            {
                label: 'Frontend Masters',
                url: 'https://frontendmasters.com/',
                type: 'Course'
            }
        ],
        testBank: [
            'Box model',
            'React hooks',
            'CSS Grid',
            'State vs Props',
            'Accessibility'
        ],
        jobs: [
            {
                role: 'Frontend Intern',
                type: 'Internship'
            },
            {
                role: 'Junior React Dev',
                type: 'Full-time'
            }
        ]
    },
    data: {
        id: 'data',
        title: 'Data Analyst',
        stage: 'Best when you like patterns and business insights.',
        summary: 'Turns raw data into dashboards and decisions.',
        skills: [
            'Excel',
            'SQL',
            'Power BI',
            'Statistics',
            'Python'
        ],
        roadmap: [
            'Learn Excel basics',
            'Master SQL',
            'Create dashboards',
            'Analyze real data',
            'Build portfolio'
        ],
        freeResources: [
            {
                label: 'Kaggle Learn',
                url: 'https://www.kaggle.com/learn',
                type: 'Practice'
            },
            {
                label: 'Mode SQL Tutorial',
                url: 'https://mode.com/sql-tutorial/',
                type: 'SQL'
            }
        ],
        paidResources: [
            {
                label: 'DataCamp',
                url: 'https://www.datacamp.com/',
                type: 'Course'
            }
        ],
        testBank: [
            'SQL joins',
            'Data cleaning',
            'Statistics',
            'Dashboard design',
            'KPIs'
        ],
        jobs: [
            {
                role: 'Data Analyst Intern',
                type: 'Internship'
            },
            {
                role: 'Business Analyst',
                type: 'Full-time'
            }
        ]
    },
    uiux: {
        id: 'uiux',
        title: 'UI/UX Designer',
        stage: 'Best when you love user behavior and design.',
        summary: 'Designs user journeys, wireframes, and prototypes.',
        skills: [
            'Figma',
            'Design Systems',
            'User Research',
            'Prototyping',
            'Accessibility'
        ],
        roadmap: [
            'Learn design fundamentals',
            'Create wireframes',
            'Study Figma',
            'User testing',
            'Build case studies'
        ],
        freeResources: [
            {
                label: 'Figma Design Resources',
                url: 'https://www.figma.com/',
                type: 'Tool'
            },
            {
                label: 'Nielsen Norman Group',
                url: 'https://www.nngroup.com/',
                type: 'Research'
            }
        ],
        paidResources: [
            {
                label: 'Interaction Design Foundation',
                url: 'https://www.interaction-design.org/',
                type: 'Course'
            }
        ],
        testBank: [
            'Usability',
            'User interviews',
            'Visual hierarchy',
            'Personas',
            'Prototyping'
        ],
        jobs: [
            {
                role: 'UI/UX Intern',
                type: 'Internship'
            },
            {
                role: 'Product Designer',
                type: 'Full-time'
            }
        ]
    },
    cybersecurity: {
        id: 'cybersecurity',
        title: 'Cybersecurity Analyst',
        stage: 'Best when you like systems and protecting data.',
        summary: 'Protects systems with monitoring and incident response.',
        skills: [
            'Networking',
            'Linux',
            'Threat Modeling',
            'SIEM',
            'OWASP'
        ],
        roadmap: [
            'Learn networking',
            'Master Linux',
            'Study OWASP Top 10',
            'Home lab setup',
            'Get certified'
        ],
        freeResources: [
            {
                label: 'OWASP Top 10',
                url: 'https://owasp.org/',
                type: 'Security'
            },
            {
                label: 'PortSwigger Academy',
                url: 'https://portswigger.net/',
                type: 'Labs'
            }
        ],
        paidResources: [
            {
                label: 'TryHackMe',
                url: 'https://tryhackme.com/',
                type: 'Labs'
            }
        ],
        testBank: [
            'Phishing',
            'Least privilege',
            'Encryption',
            'Vulnerabilities',
            'Incident response'
        ],
        jobs: [
            {
                role: 'SOC Analyst Intern',
                type: 'Internship'
            },
            {
                role: 'Security Analyst',
                type: 'Full-time'
            }
        ]
    },
    cloud: {
        id: 'cloud',
        title: 'Cloud/DevOps Engineer',
        stage: 'Best when you like infrastructure and automation.',
        summary: 'Builds deploy pipelines and production systems.',
        skills: [
            'Linux',
            'Docker',
            'Kubernetes',
            'CI/CD',
            'Cloud Platforms'
        ],
        roadmap: [
            'Learn Linux',
            'Master Docker',
            'Study Kubernetes',
            'Build CI/CD',
            'Cloud certification'
        ],
        freeResources: [
            {
                label: 'Docker Docs',
                url: 'https://docs.docker.com/',
                type: 'Documentation'
            },
            {
                label: 'AWS Skill Builder',
                url: 'https://skillbuilder.aws/',
                type: 'Course'
            }
        ],
        paidResources: [
            {
                label: 'KodeKloud',
                url: 'https://kodekloud.com/',
                type: 'Labs'
            }
        ],
        testBank: [
            'CI/CD',
            'Docker',
            'Infrastructure as Code',
            'Monitoring',
            'Scaling'
        ],
        jobs: [
            {
                role: 'DevOps Intern',
                type: 'Internship'
            },
            {
                role: 'Cloud Engineer',
                type: 'Full-time'
            }
        ]
    },
    aiml: {
        id: 'aiml',
        title: 'AI/ML Engineer',
        stage: 'Best when you like math and intelligent systems.',
        summary: 'Builds models and intelligent products.',
        skills: [
            'Python',
            'Statistics',
            'TensorFlow',
            'ML Algorithms',
            'Data Processing'
        ],
        roadmap: [
            'Learn Python',
            'Study statistics',
            'Master ML algorithms',
            'Build projects',
            'Deploy models'
        ],
        freeResources: [
            {
                label: 'Google ML Crash Course',
                url: 'https://developers.google.com/machine-learning',
                type: 'Course'
            },
            {
                label: 'Kaggle',
                url: 'https://www.kaggle.com/',
                type: 'Competitions'
            }
        ],
        paidResources: [
            {
                label: 'DeepLearning.AI',
                url: 'https://www.deeplearning.ai/',
                type: 'Course'
            }
        ],
        testBank: [
            'Overfitting',
            'Train-test split',
            'Normalization',
            'Precision/Recall',
            'Model deployment'
        ],
        jobs: [
            {
                role: 'ML Intern',
                type: 'Internship'
            },
            {
                role: 'ML Engineer',
                type: 'Full-time'
            }
        ]
    },
    product: {
        id: 'product',
        title: 'Product Manager',
        stage: 'Best when you like strategy and coordination.',
        summary: 'Shapes features and aligns teams.',
        skills: [
            'Roadmapping',
            'Research',
            'Metrics',
            'Communication',
            'Strategy'
        ],
        roadmap: [
            'Learn PM basics',
            'User interviews',
            'Create roadmaps',
            'Study metrics',
            'Case studies'
        ],
        freeResources: [
            {
                label: 'Mind the Product',
                url: 'https://www.mindtheproduct.com/',
                type: 'Articles'
            },
            {
                label: 'Lenny Rachitsky',
                url: 'https://www.lennysnewsletter.com/',
                type: 'Newsletter'
            }
        ],
        paidResources: [
            {
                label: 'Reforge',
                url: 'https://www.reforge.com/',
                type: 'Course'
            }
        ],
        testBank: [
            'Product-market fit',
            'Prioritization',
            'KPIs',
            'PRD writing',
            'User retention'
        ],
        jobs: [
            {
                role: 'Product Manager Intern',
                type: 'Internship'
            },
            {
                role: 'APM (Associate PM)',
                type: 'Full-time'
            }
        ]
    }
};
const translations = {
    English: {
        title: 'SahiPath - AI Career Mentor',
        subtitle: 'Discover your ideal career path. Get mentored by AI.',
        choosePath: 'Choose Your Career Path',
        ageLabel: 'Your Age',
        interestLabel: 'What interests you?',
        languageLabel: 'Preferred Language',
        roadmap: 'Roadmap',
        resources: 'Resources',
        resume: 'Resume Draft',
        tests: 'Tests',
        jobs: 'Jobs',
        mentorChat: 'Mentor Chat',
        askAnything: 'Ask me anything about your career path...',
        scheduleTest: 'Schedule a test for me',
        freeResources: 'Free Resources',
        paidResources: 'Paid Courses',
        testResults: 'Test Results',
        noResults: 'No test results yet',
        generateTest: 'Generate Mock Test',
        score: 'Score',
        nextStep: 'Next Step',
        resumeDraft: 'Your Resume',
        jobOpportunities: 'Job & Internship Opportunities',
        unknown: 'I don\'t have verified info on that. Here are trusted resources:'
    },
    Hindi: {
        title: 'SahiPath - AI करियर मेंटर',
        subtitle: 'अपना आदर्श करियर पथ खोजें।',
        choosePath: 'अपना करियर पथ चुनें',
        ageLabel: 'आपकी आयु',
        interestLabel: 'आपको क्या दिलचस्पी है?',
        languageLabel: 'पसंदीदा भाषा',
        roadmap: 'रोडमैप',
        resources: 'संसाधन',
        resume: 'रिज्यूमे ड्राफ्ट',
        tests: 'परीक्षाएं',
        jobs: 'नौकरियां',
        mentorChat: 'मेंटर चैट',
        askAnything: 'अपने करियर पथ के बारे में कुछ भी पूछें...',
        scheduleTest: 'मेरे लिए एक परीक्षा शेड्यूल करें',
        freeResources: 'मुफ्त संसाधन',
        paidResources: 'भुगतान पाठ्यक्रम',
        testResults: 'परीक्षा के परिणाम',
        noResults: 'अभी कोई परीक्षा परिणाम नहीं',
        generateTest: 'मॉक टेस्ट जेनरेट करें',
        score: 'स्कोर',
        nextStep: 'अगला कदम',
        resumeDraft: 'आपका रिज्यूमे',
        jobOpportunities: 'नौकरी और इंटर्नशिप के अवसर',
        unknown: 'मेरे पास इस पर सत्यापित जानकारी नहीं है।'
    },
    Tamil: {
        title: 'SahiPath - AI வேலை மேனி',
        subtitle: 'உங்கள் சிறந்த வேலை பாதையைக் கண்டறியுங்கள்.',
        choosePath: 'உங்கள் வேலை பாதையைத் தேர்ந்தெடுக்கவும்',
        ageLabel: 'உங்கள் வயது',
        interestLabel: 'உங்களுக்கு எது ஆர்வம்?',
        languageLabel: 'விரும்பிய மொழி',
        roadmap: 'பாதை',
        resources: 'வளங்கள்',
        resume: 'சுருக்கம் வரைவு',
        tests: 'தேர்வுகள்',
        jobs: 'வேலைகள்',
        mentorChat: 'மேனி சேட்',
        askAnything: 'உங்கள் வேலை பாதை பற்றி எதையும் கேளுங்கள்...',
        scheduleTest: 'எனக்கான பরीட்சையைத் திட்டமிடுங்கள்',
        freeResources: 'இலவச வளங்கள்',
        paidResources: 'பணம் செலுத்தும் பாடங்கள்',
        testResults: 'தேர்வு முடிவுகள்',
        noResults: 'இதுவரை தேர்வு முடிவுகள் இல்லை',
        generateTest: 'மாக டெஸ்ட் உருவாக்கவும்',
        score: 'மதிப்பெண்',
        nextStep: 'அடுத்த படி',
        resumeDraft: 'உங்கள் சுருக்கம்',
        jobOpportunities: 'வேலை மற்றும் பயிற்சி வாய்ப்புகள்',
        unknown: 'எனக்கு அதன் பற்றி சரிபார்க்கப்பட்ட தகவல் இல்லை।'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Home() {
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('language');
    const [ragSystem, setRagSystem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [age, setAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [interests, setInterests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [chosenPath, setChosenPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chatMessages, setChatMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [testResults, setTestResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [scheduledTests, setScheduledTests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [resumeDraft, setResumeDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [notificationGranted, setNotificationGranted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["translations"][language];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if ('Notification' in window && Notification.permission === 'granted') {
                setNotificationGranted(true);
            }
        }
    }["Home.useEffect"], []);
    // Score careers based on user input
    const scoreCareers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[scoreCareers]": ()=>{
            if (!age || !interests) return Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["careerData"]).map({
                "Home.useMemo[scoreCareers]": (c)=>({
                        ...c,
                        score: 0
                    })
            }["Home.useMemo[scoreCareers]"]);
            const ageNum = parseInt(age);
            const interestLower = interests.toLowerCase();
            return Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["careerData"]).map({
                "Home.useMemo[scoreCareers]": (career)=>{
                    let score = 0;
                    // Interest matching
                    career.skills.forEach({
                        "Home.useMemo[scoreCareers]": (skill)=>{
                            if (interestLower.includes(skill.toLowerCase())) score += 10;
                        }
                    }["Home.useMemo[scoreCareers]"]);
                    career.title.split(' ').forEach({
                        "Home.useMemo[scoreCareers]": (word)=>{
                            if (interestLower.includes(word.toLowerCase())) score += 5;
                        }
                    }["Home.useMemo[scoreCareers]"]);
                    // Age-based recommendations (20-30 good for all, slight variance)
                    if (ageNum >= 18 && ageNum <= 22) score += 2;
                    if (ageNum >= 23 && ageNum <= 30) score += 3;
                    return {
                        ...career,
                        score
                    };
                }
            }["Home.useMemo[scoreCareers]"]).sort({
                "Home.useMemo[scoreCareers]": (a, b)=>b.score - a.score
            }["Home.useMemo[scoreCareers]"]);
        }
    }["Home.useMemo[scoreCareers]"], [
        age,
        interests
    ]);
    // Parse natural language test schedule
    const parseSchedule = (input)=>{
        const lower = input.toLowerCase();
        const now = new Date();
        if (lower.includes('tomorrow')) {
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow.toLocaleDateString();
        }
        if (lower.includes('today')) {
            return now.toLocaleDateString();
        }
        if (lower.includes('next week')) {
            const nextWeek = new Date(now);
            nextWeek.setDate(nextWeek.getDate() + 7);
            return nextWeek.toLocaleDateString();
        }
        const dateMatch = input.match(/(\d{1,2})[\/\-](\d{1,2})/);
        if (dateMatch) {
            return new Date(now.getFullYear(), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[1])).toLocaleDateString();
        }
        return now.toLocaleDateString();
    };
    const handleChatSubmit = (e)=>{
        e.preventDefault();
        if (!chatInput.trim() || !chosenPath) return;
        const userMsg = chatInput;
        setChatMessages((prev)=>[
                ...prev,
                {
                    role: 'user',
                    text: userMsg
                }
            ]);
        const lower = userMsg.toLowerCase();
        let response = '';
        if (lower.includes('schedule') || lower.includes('test')) {
            const date = parseSchedule(userMsg);
            setScheduledTests((prev)=>[
                    ...prev,
                    {
                        date,
                        path: chosenPath
                    }
                ]);
            response = `Test scheduled for ${date}. I'll send you a reminder!`;
            if (notificationGranted) {
                new Notification('Test Scheduled', {
                    body: `Your test is on ${date}`
                });
            }
        } else if (lower.includes('resume')) {
            const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
            const bullets = career?.skills.slice(0, 3).map((s)=>`• Strong in ${s}`).join('\n');
            setResumeDraft(bullets || '');
            response = `I've drafted your resume based on your path. Edit as needed!`;
        } else if (lower.includes('test') || lower.includes('mock')) {
            const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
            const questions = career?.testBank.slice(0, 3) || [];
            const score = Math.floor(Math.random() * 40) + 60;
            setTestResults((prev)=>({
                    ...prev,
                    [chosenPath]: score
                }));
            response = `Here are 3 practice questions: ${questions.join(', ')}. You scored ${score}/100.`;
        } else if (lower.includes('resource') || lower.includes('learn')) {
            const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
            const resourceLinks = career?.freeResources.map((r)=>r.label).join(', ') || '';
            response = `Top resources: ${resourceLinks}`;
        } else if (lower.includes('job') || lower.includes('internship')) {
            const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
            const jobList = career?.jobs.map((j)=>`${j.role} (${j.type})`).join(', ') || '';
            response = `Available roles: ${jobList}`;
        } else {
            response = `${t.unknown} Check the Resources tab for verified links on: ${userMsg}`;
        }
        setChatMessages((prev)=>[
                ...prev,
                {
                    role: 'assistant',
                    text: response
                }
            ]);
        setChatInput('');
    };
    const requestNotification = async ()=>{
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            setNotificationGranted(permission === 'granted');
        }
    };
    if (stage === 'welcome') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container welcome",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: t.title
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "subtitle",
                        children: t.subtitle
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid",
                        children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["careerData"]).map((career)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "path-card",
                                onClick: ()=>{
                                    setChosenPath(career.id);
                                    setStage('mentor');
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: career.title
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: career.stage
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, career.id, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/index.tsx",
            lineNumber: 134,
            columnNumber: 7
        }, this);
    }
    if (stage === 'mentor' && chosenPath) {
        const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mentor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sidebar",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: career?.title
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: career?.summary
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: t.languageLabel
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: language,
                                        onChange: (e)=>setLanguage(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "English"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Hindi"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: "Tamil"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: t.roadmap
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: career?.roadmap.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: step
                                            }, i, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: t.resources
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "resources",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    t.freeResources,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 192,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                children: career?.freeResources.map((res, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: res.url,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            children: res.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, i, false, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: t.jobOpportunities
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: career?.jobs.map((job, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    job.role,
                                                    " (",
                                                    job.type,
                                                    ")"
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "main-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "chat-container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "messages",
                                    children: [
                                        chatMessages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "welcome-message",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "👋 Welcome to your AI mentor! I'm here to help with:"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "🧪 Scheduling tests"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "📝 Generating resumes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "📚 Recommending resources"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "💼 Finding jobs & internships"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 220,
                                            columnNumber: 17
                                        }, this),
                                        chatMessages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `message ${msg.role}`,
                                                children: msg.text
                                            }, i, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 231,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleChatSubmit,
                                    className: "chat-form",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: chatInput,
                                            onChange: (e)=>setChatInput(e.target.value),
                                            placeholder: t.askAnything,
                                            className: "chat-input"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "btn-primary",
                                            children: "Send"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: requestNotification,
                                    className: "btn-secondary",
                                    children: notificationGranted ? '🔔 Notifications ON' : '🔔 Enable Notifications'
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        testResults[chosenPath] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card results",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: t.testResults
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        t.score,
                                        ": ",
                                        testResults[chosenPath],
                                        "/100"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 259,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 257,
                            columnNumber: 13
                        }, this),
                        resumeDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card resume",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: t.resumeDraft
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: resumeDraft,
                                    onChange: (e)=>setResumeDraft(e.target.value),
                                    className: "resume-editor"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 266,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this),
                        scheduledTests.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "📅 Scheduled Tests"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this),
                                scheduledTests.map((test, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            test.path,
                                            " - ",
                                            test.date
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 278,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setChosenPath(null);
                                setStage('welcome');
                            },
                            className: "btn-secondary",
                            children: "← Back to Paths"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.tsx",
            lineNumber: 162,
            columnNumber: 7
        }, this);
    }
    return null;
}
_s(Home, "u5pEDiqQOYOJ0bpsXEdyMpmKYWY=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0ovfo35._.js.map