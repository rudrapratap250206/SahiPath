module.exports = [
"[project]/lib/data.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [ssr] (ecmascript)");
;
;
;
function Home() {
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('language');
    const [ragSystem, setRagSystem] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [age, setAge] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [interests, setInterests] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [chosenPath, setChosenPath] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [chatMessages, setChatMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [testResults, setTestResults] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [scheduledTests, setScheduledTests] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [resumeDraft, setResumeDraft] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [notificationGranted, setNotificationGranted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["translations"][language];
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if ('Notification' in window && Notification.permission === 'granted') {
            setNotificationGranted(true);
        }
    }, []);
    // Score careers based on user input
    const scoreCareers = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (!age || !interests) return Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]).map((c)=>({
                ...c,
                score: 0
            }));
        const ageNum = parseInt(age);
        const interestLower = interests.toLowerCase();
        return Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]).map((career)=>{
            let score = 0;
            // Interest matching
            career.skills.forEach((skill)=>{
                if (interestLower.includes(skill.toLowerCase())) score += 10;
            });
            career.title.split(' ').forEach((word)=>{
                if (interestLower.includes(word.toLowerCase())) score += 5;
            });
            // Age-based recommendations (20-30 good for all, slight variance)
            if (ageNum >= 18 && ageNum <= 22) score += 2;
            if (ageNum >= 23 && ageNum <= 30) score += 3;
            return {
                ...career,
                score
            };
        }).sort((a, b)=>b.score - a.score);
    }, [
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
            const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
            const bullets = career?.skills.slice(0, 3).map((s)=>`• Strong in ${s}`).join('\n');
            setResumeDraft(bullets || '');
            response = `I've drafted your resume based on your path. Edit as needed!`;
        } else if (lower.includes('test') || lower.includes('mock')) {
            const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
            const questions = career?.testBank.slice(0, 3) || [];
            const score = Math.floor(Math.random() * 40) + 60;
            setTestResults((prev)=>({
                    ...prev,
                    [chosenPath]: score
                }));
            response = `Here are 3 practice questions: ${questions.join(', ')}. You scored ${score}/100.`;
        } else if (lower.includes('resource') || lower.includes('learn')) {
            const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
            const resourceLinks = career?.freeResources.map((r)=>r.label).join(', ') || '';
            response = `Top resources: ${resourceLinks}`;
        } else if (lower.includes('job') || lower.includes('internship')) {
            const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container welcome",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        children: t.title
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "subtitle",
                        children: t.subtitle
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid",
                        children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]).map((career)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "path-card",
                                onClick: ()=>{
                                    setChosenPath(career.id);
                                    setStage('mentor');
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: career.title
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
        const career = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]).find((c)=>c.id === chosenPath);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container mentor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "sidebar",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: career?.title
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: career?.summary
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: t.languageLabel
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        value: language,
                                        onChange: (e)=>setLanguage(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "English"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "Hindi"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: t.roadmap
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        children: career?.roadmap.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: t.resources
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "resources",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    t.freeResources,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 192,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                                children: career?.freeResources.map((res, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: t.jobOpportunities
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        children: career?.jobs.map((job, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "main-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "chat-container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "messages",
                                    children: [
                                        chatMessages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "welcome-message",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    children: "👋 Welcome to your AI mentor! I'm here to help with:"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                            children: "🧪 Scheduling tests"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                            children: "📝 Generating resumes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                            children: "📚 Recommending resources"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
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
                                        chatMessages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                    onSubmit: handleChatSubmit,
                                    className: "chat-form",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                        testResults[chosenPath] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "card results",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    children: t.testResults
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                        resumeDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "card resume",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    children: t.resumeDraft
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
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
                        scheduledTests.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    children: "📅 Scheduled Tests"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this),
                                scheduledTests.map((test, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0cjr_bn._.js.map