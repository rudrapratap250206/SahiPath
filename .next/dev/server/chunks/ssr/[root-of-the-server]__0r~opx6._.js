module.exports = [
"[project]/lib/data.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "careerData",
    ()=>careerData,
    "languageInfo",
    ()=>languageInfo,
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
        personal_details: 'Personal Details',
        professional_details: 'Professional Details',
        tell_us_about: 'Tell us about yourself so we can personalize your experience',
        career_info: 'Help us understand your career goals and learning preferences',
        firstName: 'First Name *',
        lastName: 'Last Name',
        age: 'Age',
        email: 'Email *',
        location: 'Location (City/Country)',
        currentRole: 'Current Role/Job Title *',
        yearsExp: 'Years of Experience',
        skills: 'Skills',
        interests: 'Career Interests',
        goals: 'Current Goals',
        challenges: 'Challenges',
        hoursPerWeek: 'Hours available per week',
        learningStyle: 'Learning Style',
        alert_fillRequired: 'Please fill all required fields',
        next: 'Next',
        back: 'Back',
        startMentoring: 'Start Mentoring',
        mentorChat: 'AI Career Mentor',
        rag_intro: '24/7 AI Assistant powered by your personal career context',
        profile_summary: 'Your Profile',
        role: 'Role',
        years: 'years',
        hours: 'hours',
        restart: 'Restart',
        askAnything: 'Ask me anything...',
        send: 'Send',
        edu_highschool: 'High School',
        edu_bachelor: 'Bachelor\'s',
        edu_master: 'Master\'s',
        edu_phd: 'PhD'
    },
    Hindi: {
        personal_details: 'व्यक्तिगत विवरण',
        professional_details: 'व्यावसायिक विवरण',
        tell_us_about: 'अपने बारे में बताएं ताकि हम आपके अनुभव को व्यक्तिगत बना सकें',
        career_info: 'हमें अपने करियर लक्ष्यों और सीखने की प्राथमिकताओं को समझने में मदद करें',
        firstName: 'पहला नाम *',
        lastName: 'अंतिम नाम',
        age: 'आयु',
        email: 'ईमेल *',
        location: 'स्थान (शहर/देश)',
        currentRole: 'वर्तमान भूमिका/नौकरी का शीर्षक *',
        yearsExp: 'वर्षों का अनुभव',
        skills: 'कौशल',
        interests: 'करियर रुचियां',
        goals: 'वर्तमान लक्ष्य',
        challenges: 'चुनौतियां',
        hoursPerWeek: 'प्रति सप्ताह उपलब्ध घंटे',
        learningStyle: 'सीखने की शैली',
        alert_fillRequired: 'कृपया सभी आवश्यक क्षेत्र भरें',
        next: 'अगला',
        back: 'वापस',
        startMentoring: 'मेंटरिंग शुरू करें',
        mentorChat: 'एआई करियर मेंटर',
        rag_intro: '24/7 एआई सहायक जो आपके व्यक्तिगत करियर संदर्भ द्वारा संचालित है',
        profile_summary: 'आपका प्रोफ़ाइल',
        role: 'भूमिका',
        years: 'साल',
        hours: 'घंटे',
        restart: 'फिर से शुरू करें',
        askAnything: 'कुछ भी पूछें...',
        send: 'भेजें',
        edu_highschool: 'हाई स्कूल',
        edu_bachelor: 'स्नातक',
        edu_master: 'स्नातकोत्तर',
        edu_phd: 'पीएचडी'
    },
    Tamil: {
        personal_details: 'தனிப்பட்ட விவரங்கள்',
        professional_details: 'தொழிலாளர் விவரங்கள்',
        tell_us_about: 'உங்களைப் பற்றி சொல்லுங்கள் - உங்கள் அனுபவத்தை நாம் தனிப்பயனாக்க முடியும்',
        career_info: 'உங்கள் வேலை இலக்குகள் மற்றும் கற்றல் விருப்பங்களைப் புரிந்துகொள்ள எங்களுக்கு உதவுங்கள்',
        firstName: 'முதல் பெயர் *',
        lastName: 'கடைசி பெயர்',
        age: 'வயது',
        email: 'மின்னஞ்சல் *',
        location: 'இடம் (நகரம்/நாடு)',
        currentRole: 'தற்போதைய பாத்திரம்/பணியின் தலைப்பு *',
        yearsExp: 'அனுபவ வருடங்கள்',
        skills: 'திறன்கள்',
        interests: 'வேலை ஆர்வம்',
        goals: 'தற்போதைய இலக்குகள்',
        challenges: 'சவால்கள்',
        hoursPerWeek: 'வாரத்திற்கு கிடைக்கும் மணிநேரம்',
        learningStyle: 'கற்றல் பாணி',
        alert_fillRequired: 'பயனுள்ள அனைத்து புலங்களை நிரப்பவும்',
        next: 'அடுத்த',
        back: 'மீண்டும்',
        startMentoring: 'வழிகாட்டுதல் தொடங்கவும்',
        mentorChat: 'AI வேலை ஆலோசகர்',
        rag_intro: '24/7 AI உதவியாளர் - உங்கள் தனிப்பட்ட வேலை சூழல்களால் செயல்படுத்தப்படுகிறது',
        profile_summary: 'உங்கள் சுயவிவரம்',
        role: 'பாத்திரம்',
        years: 'ஆண்டுகள்',
        hours: 'மணிநேரம்',
        restart: 'மீண்டும் தொடங்கவும்',
        askAnything: 'எதையும் கேளுங்கள்...',
        send: 'அனுப்பவும்',
        edu_highschool: 'பள்ளி',
        edu_bachelor: 'இளங்கலை',
        edu_master: 'முதுநிலை',
        edu_phd: 'பிஎச்டி'
    },
    Telugu: {
        personal_details: 'వ్యక్తిగత వివరాలు',
        professional_details: 'వృత్తిపరమైన వివరాలు',
        tell_us_about: 'మీ గురించి చెప్పండి - మేము మీ అనుభవాన్ని ব్యక్తిగతం చేయవచ్చు',
        career_info: 'మీ కెరీర్ లక్ష్యాలు మరియు నేర్పు ప్రాధాన్యతలను అర్థం చేసుకోవడానికి సహాయం చేయండి',
        firstName: 'మొదటి పేరు *',
        lastName: 'చివరి పేరు',
        age: 'వయస్సు',
        email: 'ఈమెయిల్ *',
        location: 'ప్రదేశం (నగరం/దేశం)',
        currentRole: 'ప్రస్తుత పాత్ర/ఉద్యోగ శీర్షిక *',
        yearsExp: 'అనుభవ సంవత్సరాలు',
        skills: 'నైపుణ్యాలు',
        interests: 'కెరీర్ ఆసక్తులు',
        goals: 'ప్రస్తుత లక్ష్యాలు',
        challenges: 'సవాళ్లు',
        hoursPerWeek: 'వారానికి లభ్యమైన గంటలు',
        learningStyle: 'నేర్పు శైలి',
        alert_fillRequired: 'దయచేసి అన్ని అవసరమైన ఖాళీలను పూరించండి',
        next: 'తరువాత',
        back: 'వెనక్కి',
        startMentoring: 'మెంటోరింగ్ ప్రారంభించండి',
        mentorChat: 'AI కెరీర్ మెంటర్',
        rag_intro: '24/7 AI సహాయक - మీ వ్యక్తిగత కెరీర్ సందర్భం ద్వారా ప్రపంచిత',
        profile_summary: 'మీ ప్రొఫైల్',
        role: 'పాత్ర',
        years: 'సంవత్సరాలు',
        hours: 'గంటలు',
        restart: 'పునः ప్రారంభించండి',
        askAnything: 'ఏదైనా అడగండి...',
        send: 'పంపండి',
        edu_highschool: 'హై స్కూల్',
        edu_bachelor: 'బాచిలర్',
        edu_master: 'మాస్టర్స్',
        edu_phd: 'పిహెచ్డి'
    },
    Kannada: {
        personal_details: 'ವ್ಯಕ್ತಿಗತ ವಿವರಗಳು',
        professional_details: 'ವೃತ್ತಿಪರ ವಿವರಗಳು',
        tell_us_about: 'ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ - ನಾವು ನಿಮ್ಮ ಅನುಭವವನ್ನು ವ್ಯಕ್ತಿಗತಗೊಳಿಸಬಹುದು',
        career_info: 'ನಿಮ್ಮ ವೃತ್ತಿ ಗುರಿಗಳು ಮತ್ತು ಕಲಿಕೆಯ ಆದ್ಯತೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಿ',
        firstName: 'ಮೊದಲ ಹೆಸರು *',
        lastName: 'ಕೊನೆಯ ಹೆಸರು',
        age: 'ವಯಸ್ಸು',
        email: 'ಇಮೇಲ್ *',
        location: 'ಸ್ಥಳ (ನಗರ/ದೇಶ)',
        currentRole: 'ಪ್ರಸ್ತುತ ಭೂಮಿಕೆ/ಉದ್ಯೋಗ ಶೀರ್ಷಿಕೆ *',
        yearsExp: 'ಅನುಭವದ ವರ್ಷಗಳು',
        skills: 'ಕೌಶಲ್ಯಗಳು',
        interests: 'ವೃತ್ತಿ ಆಸಕ್ತಿಗಳು',
        goals: 'ಪ್ರಸ್ತುತ ಗುರಿಗಳು',
        challenges: 'ಸವಾಲುಗಳು',
        hoursPerWeek: 'ಪ್ರತಿ ವಾರ ಲಭ್ಯವಿರುವ ಘಂಟೆಗಳು',
        learningStyle: 'ಕಲಿಕೆ ಪದ್ಧತಿ',
        alert_fillRequired: 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯವಿರುವ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ',
        next: 'ಮುಂದೆ',
        back: 'ಹಿಂದೆ',
        startMentoring: 'ಮೆಂಟರಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
        mentorChat: 'AI ವೃತ್ತಿ ಸಲಹೆಗಾರ',
        rag_intro: '24/7 AI ಸಹಾಯಕ - ನಿಮ್ಮ ವ್ಯಕ್ತಿಗತ ವೃತ್ತಿ ಸನ್ನಿವೇಶದ ಮೂಲಕ ಚಾಲಿತ',
        profile_summary: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್',
        role: 'ಭೂಮಿಕೆ',
        years: 'ವರ್ಷಗಳು',
        hours: 'ಘಂಟೆ',
        restart: 'ಮರುಪ್ರಾರಂಭಿಸಿ',
        askAnything: 'ಯಾವುದೇ ವಿಷಯ ಕೇಳಿ...',
        send: 'ಕಳುಹಿಸಿ',
        edu_highschool: 'ಹೈ ಸ್ಕೂಲ್',
        edu_bachelor: 'ಬ್ಯಾಚಲರ್',
        edu_master: 'ಮಾಸ್ಟರ್',
        edu_phd: 'ಪಿಎಚ್.ಡಿ'
    },
    Malayalam: {
        personal_details: 'വ്യക്തിഗത വിവരങ്ങൾ',
        professional_details: 'പ്രൊഫഷണൽ വിവരങ്ങൾ',
        tell_us_about: 'നിങ്ങളെക്കുറിച്ച് പറയുക - നിങ്ങളുടെ അനുഭവം ഞാൻ വ്യക്തിഗതമാക്കുന്നു',
        career_info: 'നിങ്ങളുടെ കരിയർ ലക്ഷ്യങ്ങളും പഠന മുൻഗണനകളും മനസ്സിലാക്കാൻ സഹായിക്കുക',
        firstName: 'ആദ്യ നാമം *',
        lastName: 'അവസാന നാമം',
        age: 'പ്രായം',
        email: 'ഇമെയിൽ *',
        location: 'സ്ഥലം (നഗരം/രാജ്യം)',
        currentRole: 'നിലവിലെ പങ്ക് / ജോലി ശീർഷകം *',
        yearsExp: 'അനുഭവത്തിന്റെ വർഷങ്ങൾ',
        skills: 'കഴിവുകൾ',
        interests: 'കരിയർ താൽപ്പര്യങ്ങൾ',
        goals: 'നിലവിലെ ലക്ഷ്യങ്ങൾ',
        challenges: 'വെല്ലുവിളികൾ',
        hoursPerWeek: 'വാരത്തിൽ ലഭ്യമായ മണിക്കൂറുകൾ',
        learningStyle: 'പഠന ശൈലി',
        alert_fillRequired: 'ദയവായി എല്ലാ ആവശ്യമായ ഫീൽഡുകൾ പൂരിപ്പിക്കുക',
        next: 'അടുത്തത്',
        back: 'പിന്നിലേക്ക്',
        startMentoring: 'മെന്റോറിംഗ് ആരംഭിക്കുക',
        mentorChat: 'AI കരിയർ മെന്റർ',
        rag_intro: '24/7 AI സഹായി - നിങ്ങളുടെ ব്യക്തിഗത കരിയർ സന്ദർഭം ഉപയോഗിച്ച് പ്രേരിത',
        profile_summary: 'നിങ്ങളുടെ പ്രൊഫൈൽ',
        role: 'പങ്ക്',
        years: 'വർഷങ്ങൾ',
        hours: 'മണിക്കൂറുകൾ',
        restart: 'വീണ്ടും ആരംഭിക്കുക',
        askAnything: 'എന്തെങ്കിലും ചോദിക്കുക...',
        send: 'അയയ്ക്കുക',
        edu_highschool: 'ഹൈ സ്കൂൾ',
        edu_bachelor: 'ബാച്ചിലർ',
        edu_master: 'മാസ്റ്റർ',
        edu_phd: 'പി.എച്ച്.ഡി'
    },
    Spanish: {
        personal_details: 'Detalles Personales',
        professional_details: 'Detalles Profesionales',
        tell_us_about: 'Cuéntanos sobre ti para que podamos personalizar tu experiencia',
        career_info: 'Ayúdanos a entender tus objetivos de carrera y preferencias de aprendizaje',
        firstName: 'Nombre *',
        lastName: 'Apellido',
        age: 'Edad',
        email: 'Correo Electrónico *',
        location: 'Ubicación (Ciudad/País)',
        currentRole: 'Función/Puesto Actual *',
        yearsExp: 'Años de Experiencia',
        skills: 'Habilidades',
        interests: 'Intereses de Carrera',
        goals: 'Objetivos Actuales',
        challenges: 'Desafíos',
        hoursPerWeek: 'Horas disponibles por semana',
        learningStyle: 'Estilo de Aprendizaje',
        alert_fillRequired: 'Por favor completa todos los campos requeridos',
        next: 'Siguiente',
        back: 'Atrás',
        startMentoring: 'Iniciar Mentoría',
        mentorChat: 'Mentor de Carrera IA',
        rag_intro: 'Asistente IA 24/7 impulsado por tu contexto de carrera personal',
        profile_summary: 'Tu Perfil',
        role: 'Función',
        years: 'años',
        hours: 'horas',
        restart: 'Reiniciar',
        askAnything: 'Pregunta cualquier cosa...',
        send: 'Enviar',
        edu_highschool: 'High School',
        edu_bachelor: 'Licenciatura',
        edu_master: 'Máster',
        edu_phd: 'Doctorado'
    },
    French: {
        personal_details: 'Détails Personnels',
        professional_details: 'Détails Professionnels',
        tell_us_about: 'Parlez-nous de vous pour que nous puissions personnaliser votre expérience',
        career_info: 'Aidez-nous à comprendre vos objectifs de carrière et vos préférences d\'apprentissage',
        firstName: 'Prénom *',
        lastName: 'Nom',
        age: 'Âge',
        email: 'Email *',
        location: 'Localisation (Ville/Pays)',
        currentRole: 'Fonction/Titre Actuel *',
        yearsExp: 'Années d\'Expérience',
        skills: 'Compétences',
        interests: 'Intérêts de Carrière',
        goals: 'Objectifs Actuels',
        challenges: 'Défis',
        hoursPerWeek: 'Heures disponibles par semaine',
        learningStyle: 'Style d\'Apprentissage',
        alert_fillRequired: 'Veuillez remplir tous les champs obligatoires',
        next: 'Suivant',
        back: 'Retour',
        startMentoring: 'Commencer le Mentorat',
        mentorChat: 'Mentor de Carrière IA',
        rag_intro: 'Assistant IA 24/7 alimenté par votre contexte de carrière personnel',
        profile_summary: 'Votre Profil',
        role: 'Fonction',
        years: 'ans',
        hours: 'heures',
        restart: 'Redémarrer',
        askAnything: 'Posez n\'importe quelle question...',
        send: 'Envoyer',
        edu_highschool: 'Lycée',
        edu_bachelor: 'Licence',
        edu_master: 'Master',
        edu_phd: 'Doctorat'
    },
    German: {
        personal_details: 'Persönliche Daten',
        professional_details: 'Berufliche Details',
        tell_us_about: 'Erzählen Sie uns von sich, um Ihr Erlebnis zu personalisieren',
        career_info: 'Helfen Sie uns, Ihre Karriereziele und Lernvorlieben zu verstehen',
        firstName: 'Vorname *',
        lastName: 'Nachname',
        age: 'Alter',
        email: 'E-Mail *',
        location: 'Standort (Stadt/Land)',
        currentRole: 'Aktuelle Rolle/Jobtitel *',
        yearsExp: 'Jahre Erfahrung',
        skills: 'Fähigkeiten',
        interests: 'Karriereinteressen',
        goals: 'Aktuelle Ziele',
        challenges: 'Herausforderungen',
        hoursPerWeek: 'Verfügbare Stunden pro Woche',
        learningStyle: 'Lernstil',
        alert_fillRequired: 'Bitte füllen Sie alle erforderlichen Felder aus',
        next: 'Weiter',
        back: 'Zurück',
        startMentoring: 'Mentoring starten',
        mentorChat: 'KI-Karrierementor',
        rag_intro: '24/7 KI-Assistent angetrieben durch Ihren persönlichen Karrierekontext',
        profile_summary: 'Ihr Profil',
        role: 'Rolle',
        years: 'Jahre',
        hours: 'Stunden',
        restart: 'Neustart',
        askAnything: 'Fragen Sie alles...',
        send: 'Senden',
        edu_highschool: 'High School',
        edu_bachelor: 'Bachelor',
        edu_master: 'Master',
        edu_phd: 'Promotion'
    },
    Chinese: {
        personal_details: '个人详情',
        professional_details: '专业详情',
        tell_us_about: '告诉我们关于您的信息，以便我们可以个性化您的体验',
        career_info: '帮助我们了解您的职业目标和学习偏好',
        firstName: '名字 *',
        lastName: '姓氏',
        age: '年龄',
        email: '电子邮件 *',
        location: '位置（城市/国家）',
        currentRole: '当前职位 *',
        yearsExp: '工作经验年数',
        skills: '技能',
        interests: '职业兴趣',
        goals: '当前目标',
        challenges: '挑战',
        hoursPerWeek: '每周可用小时数',
        learningStyle: '学习风格',
        alert_fillRequired: '请填写所有必填字段',
        next: '下一步',
        back: '返回',
        startMentoring: '开始指导',
        mentorChat: 'AI 职业导师',
        rag_intro: '24/7 AI 助手由您的个人职业背景驱动',
        profile_summary: '您的个人资料',
        role: '角色',
        years: '年',
        hours: '小时',
        restart: '重新开始',
        askAnything: '问我任何事...',
        send: '发送',
        edu_highschool: '中学',
        edu_bachelor: '学士',
        edu_master: '硕士',
        edu_phd: '博士'
    },
    Japanese: {
        personal_details: '個人情報',
        professional_details: '専門情報',
        tell_us_about: 'あなたについて教えてください - 経験をパーソナライズします',
        career_info: 'キャリア目標と学習嗜好を理解するのをお手伝いください',
        firstName: '名前 *',
        lastName: '苗字',
        age: '年齢',
        email: 'メール *',
        location: '場所（都市/国）',
        currentRole: '現在の役職/職種 *',
        yearsExp: '経験年数',
        skills: 'スキル',
        interests: 'キャリアの興味',
        goals: '現在の目標',
        challenges: 'チャレンジ',
        hoursPerWeek: '週間利用可能時間',
        learningStyle: '学習スタイル',
        alert_fillRequired: 'すべての必須フィールドを入力してください',
        next: '次へ',
        back: '戻る',
        startMentoring: 'メンタリングを開始',
        mentorChat: 'AI キャリアメンター',
        rag_intro: '24/7 AI アシスタント - あなたの個人的なキャリアコンテキストを搭載',
        profile_summary: 'あなたのプロフィール',
        role: '役割',
        years: '年',
        hours: '時間',
        restart: '再起動',
        askAnything: '何でも質問してください...',
        send: '送信',
        edu_highschool: '高校',
        edu_bachelor: '学士',
        edu_master: '修士',
        edu_phd: '博士号'
    },
    Portuguese: {
        personal_details: 'Detalhes Pessoais',
        professional_details: 'Detalhes Profissionais',
        tell_us_about: 'Conte-nos sobre você para personalizarmos sua experiência',
        career_info: 'Ajude-nos a entender seus objetivos de carreira e preferências de aprendizado',
        firstName: 'Primeiro Nome *',
        lastName: 'Sobrenome',
        age: 'Idade',
        email: 'Email *',
        location: 'Localização (Cidade/País)',
        currentRole: 'Função/Cargo Atual *',
        yearsExp: 'Anos de Experiência',
        skills: 'Habilidades',
        interests: 'Interesses de Carreira',
        goals: 'Objetivos Atuais',
        challenges: 'Desafios',
        hoursPerWeek: 'Horas disponíveis por semana',
        learningStyle: 'Estilo de Aprendizado',
        alert_fillRequired: 'Por favor, preencha todos os campos obrigatórios',
        next: 'Próximo',
        back: 'Voltar',
        startMentoring: 'Iniciar Mentoria',
        mentorChat: 'Mentor de Carreira IA',
        rag_intro: 'Assistente IA 24/7 alimentado pelo seu contexto de carreira pessoal',
        profile_summary: 'Seu Perfil',
        role: 'Função',
        years: 'anos',
        hours: 'horas',
        restart: 'Reiniciar',
        askAnything: 'Pergunte qualquer coisa...',
        send: 'Enviar',
        edu_highschool: 'Ensino Médio',
        edu_bachelor: 'Bacharel',
        edu_master: 'Mestrado',
        edu_phd: 'Doutorado'
    },
    Arabic: {
        personal_details: 'التفاصيل الشخصية',
        professional_details: 'التفاصيل المهنية',
        tell_us_about: 'أخبرنا عن نفسك حتى نتمكن من تخصيص تجربتك',
        career_info: 'ساعدنا في فهم أهداف حياتك المهنية وتفضيلات التعلم',
        firstName: 'الاسم الأول *',
        lastName: 'الكنية',
        age: 'العمر',
        email: 'البريد الإلكتروني *',
        location: 'الموقع (المدينة / الدولة)',
        currentRole: 'الدور الحالي / سمة الوظيفة *',
        yearsExp: 'سنوات الخبرة',
        skills: 'المهارات',
        interests: 'اهتمامات الحياة المهنية',
        goals: 'الأهداف الحالية',
        challenges: 'التحديات',
        hoursPerWeek: 'الساعات المتاحة في الأسبوع',
        learningStyle: 'أسلوب التعلم',
        alert_fillRequired: 'يرجى ملء جميع الحقول المطلوبة',
        next: 'التالي',
        back: 'خلف',
        startMentoring: 'ابدأ الإرشاد',
        mentorChat: 'مرشد الذكاء الاصطناعي الوظيفي',
        rag_intro: 'مساعد ذكاء اصطناعي 24/7 مدعوم بسياقك الوظيفي الشخصي',
        profile_summary: 'ملفك الشخصي',
        role: 'دور',
        years: 'سنوات',
        hours: 'ساعات',
        restart: 'إعادة تشغيل',
        askAnything: 'اسأل أي شيء...',
        send: 'إرسال',
        edu_highschool: 'المدرسة الثانوية',
        edu_bachelor: 'بكالوريوس',
        edu_master: 'ماجستير',
        edu_phd: 'دكتوراه'
    },
    Korean: {
        personal_details: '개인 정보',
        professional_details: '직업 정보',
        tell_us_about: '자신에 대해 알려주세요 - 경험을 개인화하겠습니다',
        career_info: '경력 목표 및 학습 선호도를 이해하도록 도와주세요',
        firstName: '이름 *',
        lastName: '성 *',
        age: '나이',
        email: '이메일 *',
        location: '위치 (도시/국가)',
        currentRole: '현재 직급/직책 *',
        yearsExp: '경력년수',
        skills: '기술',
        interests: '경력 관심사',
        goals: '현재 목표',
        challenges: '과제',
        hoursPerWeek: '주당 사용 가능 시간',
        learningStyle: '학습 스타일',
        alert_fillRequired: '필수 필드를 모두 입력하세요',
        next: '다음',
        back: '뒤로',
        startMentoring: '멘토링 시작',
        mentorChat: 'AI 커리어 멘토',
        rag_intro: '24/7 AI 어시스턴트 - 개인 경력 맥락으로 제공',
        profile_summary: '프로필',
        role: '직책',
        years: '년',
        hours: '시간',
        restart: '재시작',
        askAnything: '뭔가 물어보세요...',
        send: '전송',
        edu_highschool: '고등학교',
        edu_bachelor: '학사',
        edu_master: '석사',
        edu_phd: '박사'
    }
};
const languageInfo = {
    English: {
        emoji: '🇬🇧',
        nativeName: 'English',
        englishName: 'English',
        region: 'Global'
    },
    Hindi: {
        emoji: '🇮🇳',
        nativeName: 'हिंदी',
        englishName: 'Hindi',
        region: 'India'
    },
    Tamil: {
        emoji: '🇮🇳',
        nativeName: 'தமிழ்',
        englishName: 'Tamil',
        region: 'India'
    },
    Telugu: {
        emoji: '🇮🇳',
        nativeName: 'తెలుగు',
        englishName: 'Telugu',
        region: 'India'
    },
    Kannada: {
        emoji: '🇮🇳',
        nativeName: 'ಕನ್ನಡ',
        englishName: 'Kannada',
        region: 'India'
    },
    Malayalam: {
        emoji: '🇮🇳',
        nativeName: 'മലയാളം',
        englishName: 'Malayalam',
        region: 'India'
    },
    Spanish: {
        emoji: '🇪🇸',
        nativeName: 'Español',
        englishName: 'Spanish',
        region: 'Global'
    },
    French: {
        emoji: '🇫🇷',
        nativeName: 'Français',
        englishName: 'French',
        region: 'Global'
    },
    German: {
        emoji: '🇩🇪',
        nativeName: 'Deutsch',
        englishName: 'German',
        region: 'Global'
    },
    Chinese: {
        emoji: '🇨🇳',
        nativeName: '中文',
        englishName: 'Chinese',
        region: 'Global'
    },
    Japanese: {
        emoji: '🇯🇵',
        nativeName: '日本語',
        englishName: 'Japanese',
        region: 'Global'
    },
    Portuguese: {
        emoji: '🇵🇹',
        nativeName: 'Português',
        englishName: 'Portuguese',
        region: 'Global'
    },
    Arabic: {
        emoji: '🇸🇦',
        nativeName: 'العربية',
        englishName: 'Arabic',
        region: 'Global'
    },
    Korean: {
        emoji: '🇰🇷',
        nativeName: '한국어',
        englishName: 'Korean',
        region: 'Global'
    }
};
}),
"[project]/lib/rag.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// RAG (Retrieval-Augmented Generation) System
// Stores user context and provides intelligent responses based on user data
__turbopack_context__.s([
    "RAGSystem",
    ()=>RAGSystem
]);
class RAGSystem {
    userProfile = null;
    conversationHistory = [];
    tests = [];
    performance = {};
    knowledgeBase = this.initializeKnowledgeBase();
    constructor(profile){
        if (profile) {
            this.userProfile = profile;
        }
    }
    // Record a test result
    recordTestResult(test) {
        const record = {
            id: test.id || `${Date.now()}`,
            name: test.name,
            score: test.score,
            date: test.date || new Date().toISOString(),
            notes: test.notes || ''
        };
        this.tests.push(record);
        return record;
    }
    // Get test history
    getTestHistory() {
        return this.tests.slice().reverse();
    }
    // Simple performance summary
    getPerformanceSummary() {
        const tests = this.tests;
        const average = tests.length ? tests.reduce((s, t)=>s + t.score, 0) / tests.length : 0;
        return {
            totalTests: tests.length,
            averageScore: Math.round(average),
            latest: tests[0] || null
        };
    }
    // Suggest jobs/internships based on profile and careerData
    suggestJobs(careerData) {
        if (!this.userProfile) return [];
        const skills = this.userProfile.skills || [];
        const allJobs = [];
        for (const key of Object.keys(careerData)){
            const path = careerData[key];
            if (path.jobs && Array.isArray(path.jobs)) {
                path.jobs.forEach((j)=>{
                    allJobs.push({
                        ...j,
                        path: path.title
                    });
                });
            }
        }
        // simple scoring: match skill keywords in role
        return allJobs.map((j)=>({
                ...j,
                score: skills.reduce((s, sk)=>s + (j.role.toLowerCase().includes(sk.toLowerCase()) ? 5 : 0), 0)
            })).sort((a, b)=>b.score - a.score).slice(0, 10);
    }
    // Generate two-person style response from the real assistant output
    generateTwoPersonResponse(userMessage, careerData) {
        const single = this.generateResponse(userMessage, careerData);
        // Split into two perspectives for a dialogue feel
        const partA = `Advisor A: ${single.split('\n')[0] || single}`;
        const partB = `Advisor B: ${single.split('\n').slice(1).join('\n') || "I'd add a practical next step: try building a small project."}`;
        return `${partA}\n\n${partB}`;
    }
    generateMedia(type, prompt) {
        throw new Error('Media generation requires a configured backend provider');
    }
    // Store user profile
    setUserProfile(profile) {
        this.userProfile = profile;
    }
    // Get user profile
    getUserProfile() {
        return this.userProfile;
    }
    // Generate context-aware response
    generateResponse(userMessage, careerData) {
        if (!this.userProfile) {
            return "Please complete your profile first.";
        }
        const lower = userMessage.toLowerCase();
        this.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: new Date().toISOString()
        });
        let response = this.generateContextualResponse(lower, careerData);
        this.conversationHistory.push({
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString()
        });
        return response;
    }
    generateContextualResponse(message, careerData) {
        if (!this.userProfile) return '';
        const profile = this.userProfile;
        // Extract user interests for personalization
        const matchedPath = this.findBestMatchingPath(message, careerData);
        if (message.includes('schedule') || message.includes('test')) {
            return this.handleTestScheduling(message, profile);
        }
        if (message.includes('resume')) {
            return this.handleResumeRequest(message, profile, careerData, matchedPath);
        }
        if (message.includes('resource') || message.includes('learn')) {
            return this.handleResourceRequest(message, profile, careerData, matchedPath);
        }
        if (message.includes('roadmap') || message.includes('path')) {
            return this.handleRoadmapRequest(message, profile, careerData, matchedPath);
        }
        if (message.includes('progress') || message.includes('track')) {
            return this.handleProgressTracking(message, profile);
        }
        if (message.includes('challenge') || message.includes('stuck') || message.includes('help')) {
            return this.handleChallengeSupport(message, profile);
        }
        if (message.includes('motivation') || message.includes('inspire')) {
            return this.getMotivationalMessage(profile);
        }
        if (message.includes('salary') || message.includes('job') || message.includes('market')) {
            return this.handleJobMarketInfo(message, profile);
        }
        // Default: provide personalized guidance
        return this.providePersonalizedGuidance(profile, matchedPath);
    }
    findBestMatchingPath(message, careerData) {
        if (!careerData) return null;
        const careers = Object.values(careerData);
        let bestMatch = null;
        let bestScore = 0;
        for (const career of careers){
            let score = 0;
            const careerTitle = career.title.toLowerCase();
            const careerSkills = career.skills || [];
            if (message.includes(careerTitle)) score += 10;
            careerSkills.forEach((skill)=>{
                if (message.includes(skill.toLowerCase())) score += 5;
            });
            if (score > bestScore) {
                bestScore = score;
                bestMatch = career;
            }
        }
        return bestMatch;
    }
    handleTestScheduling(message, profile) {
        const hours = profile.availableHoursPerWeek;
        const recommendation = hours >= 10 ? 'You have good availability. I recommend taking a test this weekend.' : 'Based on your ' + hours + ' hours/week availability, let\'s schedule a 1-hour test next week.';
        return `${recommendation} When would you prefer? (This is personalized based on your profile: ${hours} hours available per week)`;
    }
    handleResumeRequest(message, profile, careerData, matchedPath) {
        const skills = profile.skills.slice(0, 5).join(', ');
        const experience = profile.yearsOfExperience;
        const role = profile.currentRole;
        return `I'm creating a customized resume for you based on your profile:
- Current Role: ${role}
- Experience: ${experience} years
- Top Skills: ${skills}

Key strengths highlighted: ${profile.careerInterests.slice(0, 2).join(', ')}
Let me draft sections focusing on: leadership, technical expertise, and ${profile.preferredLearningStyle} learner advantage.`;
    }
    handleResourceRequest(message, profile, careerData, matchedPath) {
        const style = profile.preferredLearningStyle.toLowerCase();
        let resourceType = 'video tutorials and interactive courses';
        if (style.includes('read')) resourceType = 'books and detailed documentation';
        if (style.includes('practice')) resourceType = 'hands-on projects and coding challenges';
        if (style.includes('visual')) resourceType = 'visual learning platforms and diagrams';
        return `Perfect! Based on your preference for ${style} learning, I recommend:
1. ${resourceType}
2. Structured path matching your ${profile.yearsOfExperience} years of experience
3. Resources addressing your challenge: "${profile.challenges}"

Which topic would you like to dive into first?`;
    }
    handleRoadmapRequest(message, profile, careerData, matchedPath) {
        const weeks = Math.ceil(profile.availableHoursPerWeek / 5); // Assume 5 hours per step
        const timeline = weeks < 4 ? 'intensive 1-month' : weeks < 12 ? '3-month' : '6-month';
        return `I'm building a personalized ${timeline} roadmap for you:
- Starting from your current role: ${profile.currentRole}
- With ${profile.availableHoursPerWeek} hours/week availability
- Targeting: ${profile.careerInterests.join(', ')}
- Addressing challenge: ${profile.challenges}

Should we focus on depth first or breadth to explore multiple areas?`;
    }
    handleProgressTracking(message, profile) {
        return `Let's track your progress! Based on your profile:
- Current experience: ${profile.yearsOfExperience} years in ${profile.currentRole}
- Available hours: ${profile.availableHoursPerWeek}/week
- Goal: ${profile.currentGoals}

What aspect would you like to measure? (Skills acquired, courses completed, projects built, certifications, or overall career progression)`;
    }
    handleChallengeSupport(message, profile) {
        const challenges = profile.challenges;
        const learning = profile.preferredLearningStyle;
        return `I understand you're facing challenges. Let's solve this together:
Your stated challenge: "${challenges}"
Your learning style: ${learning}

Let me recommend:
1. Bite-sized learning approach matching your availability (${profile.availableHoursPerWeek} hours/week)
2. Real-world projects similar to your experience level (${profile.yearsOfExperience} years)
3. Mentorship focused on this specific challenge

What part of "${challenges}" would you like to tackle first?`;
    }
    getMotivationalMessage(profile) {
        const goals = profile.currentGoals;
        const experience = profile.yearsOfExperience;
        const skills = profile.skills.length;
        return `You've got this! 💪 Here's your personalized motivation:
- You're ${experience} years into your career with ${skills} established skills
- Your goal: ${goals}
- Available energy: ${profile.availableHoursPerWeek} hours/week

Every small step compounds. Let's break your goal into weekly wins.
What's ONE thing you want to achieve this week?`;
    }
    handleJobMarketInfo(message, profile) {
        const skills = profile.skills.slice(0, 3).join(', ');
        const experience = profile.yearsOfExperience;
        return `Based on your profile with ${experience} years experience and skills in ${skills}:
- Market demand for your skillset is HIGH 📈
- Average salary growth in your path: 15-25% with transition
- Most opportunities need: advanced ${profile.skills[0] || 'technical'} skills + leadership

Your timeline? We can aim for a transition in ${profile.availableHoursPerWeek >= 15 ? '2-3 months' : '3-6 months'}.
Ready to start?`;
    }
    providePersonalizedGuidance(profile, matchedPath) {
        const name = profile.firstName;
        const goals = profile.currentGoals;
        const hours = profile.availableHoursPerWeek;
        return `Hi ${name}! 👋 
I'm learning about you - ${name}, your goal is "${goals}" and you dedicate ${hours} hours weekly.
That's ${hours >= 15 ? 'serious dedication' : hours >= 10 ? 'solid commitment' : 'let\'s make it count'}.

Quick tips for you:
1. Your ${profile.preferredLearningStyle} learning style works best with ${profile.preferredLearningStyle.includes('visual') ? 'diagrams and interactive platforms' : 'hands-on practice'}
2. Given your challenge with "${profile.challenges}", avoid traditional textbooks
3. Your ${profile.yearsOfExperience} years experience means you can learn fast - target intermediate level courses

What would help most right now?`;
    }
    getConversationHistory() {
        return this.conversationHistory;
    }
    clearConversationHistory() {
        this.conversationHistory = [];
    }
    initializeKnowledgeBase() {
        return {
            careerTips: [],
            learningResources: [],
            jobMarketData: []
        };
    }
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rag$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rag.ts [ssr] (ecmascript)");
;
;
;
;
function Home() {
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [twoPersonMode, setTwoPersonMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('chat');
    const [showLogin, setShowLogin] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showRegister, setShowRegister] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [authEmail, setAuthEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [authPassword, setAuthPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [authError, setAuthError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('language');
    const [ragSystem, setRagSystem] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // Personal details form
    const [personalData, setPersonalData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        location: '',
        educationLevel: 'Bachelor\'s',
        currentRole: '',
        yearsOfExperience: ''
    });
    // Professional details form
    const [professionalData, setProfessionalData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        skills: '',
        careerInterests: '',
        currentGoals: '',
        challenges: '',
        availableHoursPerWeek: '',
        preferredLearningStyle: 'Interactive'
    });
    // Mentor stage
    const [chatMessages, setChatMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const voiceConversationRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    const pendingVoiceReplyRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    const t = language && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["translations"][language] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["translations"][language] : null;
    // Handle language selection
    const handleLanguageSelect = (selectedLang)=>{
        setLanguage(selectedLang);
        const rag = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rag$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RAGSystem"]();
        setRagSystem(rag);
        setStage('personal');
    };
    // Speech recognition (browser) - simple wrapper
    const speakText = (text)=>{
        const synth = window.speechSynthesis;
        if (!synth) return;
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : 'en-US';
        utter.onstart = ()=>setIsSpeaking(true);
        utter.onend = ()=>{
            setIsSpeaking(false);
            if (voiceConversationRef.current && twoPersonMode) {
                setTimeout(()=>{
                    if (!recognitionRef.current) startListening(true);
                }, 250);
            }
        };
        synth.cancel();
        synth.speak(utter);
    };
    const stopListening = ()=>{
        voiceConversationRef.current = false;
        pendingVoiceReplyRef.current = false;
        setIsListening(false);
        try {
            recognitionRef.current?.stop?.();
        } catch (err) {
            console.warn('Failed to stop speech recognition', err);
        }
        recognitionRef.current = null;
    };
    const startListening = async (autoSend = false)=>{
        const w = window;
        const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech recognition not supported in this browser');
            return;
        }
        const recog = new SpeechRecognition();
        recog.lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : 'en-US';
        recog.interimResults = false;
        recog.continuous = twoPersonMode;
        recog.maxAlternatives = 1;
        recog.onresult = async (e)=>{
            const transcript = e.results[e.results.length - 1][0].transcript.trim();
            if (!transcript) return;
            if (twoPersonMode && autoSend) {
                pendingVoiceReplyRef.current = true;
                setChatInput(transcript);
                recog.stop();
                await handleChatSubmitWithMessage(transcript, 'voice');
                return;
            }
            setChatInput((prev)=>prev ? prev + ' ' + transcript : transcript);
        };
        recog.onend = ()=>{
            setIsListening(false);
            recognitionRef.current = null;
            if (twoPersonMode && voiceConversationRef.current && pendingVoiceReplyRef.current) {
                pendingVoiceReplyRef.current = false;
            }
        };
        recog.onerror = ()=>{
            setIsListening(false);
            recognitionRef.current = null;
            pendingVoiceReplyRef.current = false;
        };
        recognitionRef.current = recog;
        setIsListening(true);
        recog.start();
    };
    const sendMentorMessage = async (userMsg, source)=>{
        if (!ragSystem) return;
        setChatMessages((prev)=>[
                ...prev,
                {
                    role: 'user',
                    text: userMsg
                }
            ]);
        const profile = ragSystem.getUserProfile();
        try {
            const response = await fetch('/api/mentor/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMsg,
                    profile,
                    mode: source === 'voice' ? 'voice' : 'text'
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.error || 'Unable to generate reply');
            }
            const reply = data.reply || 'No reply returned.';
            setChatMessages((prev)=>[
                    ...prev,
                    {
                        role: 'assistant',
                        text: reply
                    }
                ]);
            if (twoPersonMode && source === 'voice') {
                speakText(reply);
            }
        } catch (err) {
            const fallback = err?.message || 'Unable to generate reply';
            setChatMessages((prev)=>[
                    ...prev,
                    {
                        role: 'assistant',
                        text: fallback
                    }
                ]);
        }
    };
    // Handle personal details submission
    const handlePersonalSubmit = (e)=>{
        e.preventDefault();
        if (!personalData.firstName || !personalData.email || !personalData.currentRole) {
            alert(t?.['alert_fillRequired'] || 'Please fill all required fields');
            return;
        }
        setStage('professional');
    };
    // Load saved profile and tests from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        try {
            const saved = localStorage.getItem('sahipath_profile');
            const savedTests = localStorage.getItem('sahipath_tests');
            if (saved) {
                const profile = JSON.parse(saved);
                const rag = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rag$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RAGSystem"]();
                rag.setUserProfile(profile);
                setRagSystem(rag);
                setLanguage(profile.language);
                setStage('mentor');
                const welcome = rag.generateResponse(`Welcome back ${profile.firstName}`, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]);
                setChatMessages([
                    {
                        role: 'assistant',
                        text: welcome
                    }
                ]);
            }
            if (savedTests && ragSystem) {
                const tests = JSON.parse(savedTests);
                tests.forEach((t)=>{
                    ragSystem.recordTestResult(t);
                });
            }
        } catch (err) {
            console.warn('Failed to load saved profile', err);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (stage !== 'mentor') return;
        if (twoPersonMode) {
            voiceConversationRef.current = true;
            if (!recognitionRef.current && !isListening) {
                void startListening(true);
            }
        } else {
            stopListening();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        twoPersonMode,
        stage
    ]);
    // Handle professional details submission
    const handleProfessionalSubmit = (e)=>{
        e.preventDefault();
        if (!professionalData.skills || !professionalData.careerInterests || !professionalData.currentGoals) {
            alert(t?.['alert_fillRequired'] || 'Please fill all required fields');
            return;
        }
        // Create user profile
        const userProfile = {
            language: language,
            firstName: personalData.firstName,
            lastName: personalData.lastName,
            age: parseInt(personalData.age),
            email: personalData.email,
            location: personalData.location,
            educationLevel: personalData.educationLevel,
            currentRole: personalData.currentRole,
            yearsOfExperience: parseInt(personalData.yearsOfExperience),
            skills: professionalData.skills.split(',').map((s)=>s.trim()),
            careerInterests: professionalData.careerInterests.split(',').map((s)=>s.trim()),
            currentGoals: professionalData.currentGoals,
            challenges: professionalData.challenges,
            availableHoursPerWeek: parseInt(professionalData.availableHoursPerWeek),
            preferredLearningStyle: professionalData.preferredLearningStyle,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        // Set profile in RAG system
        if (ragSystem) {
            ragSystem.setUserProfile(userProfile);
            setRagSystem(ragSystem);
        }
        // Persist profile locally
        try {
            localStorage.setItem('sahipath_profile', JSON.stringify(userProfile));
        } catch (err) {
            console.warn('Failed to save profile', err);
        }
        // Also persist on server
        try {
            fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userProfile)
            });
        } catch (err) {
            console.warn('Failed to save profile to server', err);
        }
        // Initialize welcome message from RAG
        const welcomeMsg = ragSystem?.generateResponse(`Hello, I'm ${personalData.firstName}. I'm starting my career journey.`, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]);
        setChatMessages([
            {
                role: 'assistant',
                text: welcomeMsg || `Welcome ${personalData.firstName}! I'm your AI career mentor. I've reviewed your profile and I'm here to help you achieve your goals!`
            }
        ]);
        setStage('mentor');
    };
    // Handle chat submission
    const handleChatSubmit = async (e)=>{
        e.preventDefault();
        if (!chatInput.trim() || !ragSystem) return;
        const userMsg = chatInput;
        setChatInput('');
        await sendMentorMessage(userMsg, 'text');
    };
    const handleChatSubmitWithMessage = async (userMsg, source)=>{
        if (!ragSystem) return;
        await sendMentorMessage(userMsg, source);
        setChatInput('');
    };
    // Stage 1: Language Selection
    if (stage === 'language') {
        const allLanguages = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["languageInfo"]);
        const indianLanguages = allLanguages.filter((lang)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["languageInfo"][lang].region === 'India');
        const globalLanguages = allLanguages.filter((lang)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["languageInfo"][lang].region === 'Global');
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container welcome",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "card language-selection",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '0.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-secondary",
                                onClick: ()=>setShowLogin(true),
                                children: "Sign in"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: ()=>setShowRegister(true),
                                children: "Register"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 306,
                        columnNumber: 11
                    }, this),
                    showLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '1rem',
                            textAlign: 'left',
                            padding: '1rem',
                            borderRadius: 8,
                            background: 'var(--bg-tertiary)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    marginBottom: '0.5rem'
                                },
                                children: "Sign in"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 313,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                },
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 314,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: {
                                    width: '100%',
                                    marginBottom: '0.6rem',
                                    padding: '0.6rem',
                                    borderRadius: 6
                                },
                                type: "email",
                                placeholder: "you@domain.com",
                                value: authEmail,
                                onChange: (e)=>setAuthEmail(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 315,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                },
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 316,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: {
                                    width: '100%',
                                    marginBottom: '0.6rem',
                                    padding: '0.6rem',
                                    borderRadius: 6
                                },
                                placeholder: "Password",
                                type: "password",
                                value: authPassword,
                                onChange: (e)=>setAuthPassword(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 317,
                                columnNumber: 15
                            }, this),
                            authError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    color: 'var(--accent-coral)',
                                    marginBottom: '0.6rem'
                                },
                                children: authError
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 318,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '0.5rem',
                                    display: 'flex',
                                    gap: '0.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn-primary",
                                        disabled: authLoading || !authEmail || !authPassword,
                                        onClick: async ()=>{
                                            setAuthError(null);
                                            setAuthLoading(true);
                                            try {
                                                const res = await fetch('/api/auth/login', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        email: authEmail,
                                                        password: authPassword
                                                    })
                                                });
                                                const data = await res.json();
                                                if (!res.ok) {
                                                    setAuthError(data?.error || 'Login failed');
                                                    setAuthLoading(false);
                                                    return;
                                                }
                                                const profile = data.user.profile;
                                                if (profile) {
                                                    const rag = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rag$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RAGSystem"]();
                                                    rag.setUserProfile(profile);
                                                    setRagSystem(rag);
                                                    setLanguage(profile.language || 'English');
                                                    setStage('mentor');
                                                    localStorage.setItem('sahipath_profile', JSON.stringify(profile));
                                                }
                                                setShowLogin(false);
                                            } catch (err) {
                                                console.error(err);
                                                setAuthError('Login error');
                                            } finally{
                                                setAuthLoading(false);
                                            }
                                        },
                                        children: authLoading ? 'Signing in...' : 'Sign in'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 320,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn-secondary",
                                        style: {
                                            marginLeft: 'auto'
                                        },
                                        onClick: ()=>{
                                            setShowLogin(false);
                                            setAuthError(null);
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 348,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 319,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 312,
                        columnNumber: 13
                    }, this),
                    showRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '1rem',
                            textAlign: 'left',
                            padding: '1rem',
                            borderRadius: 8,
                            background: 'var(--bg-tertiary)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    marginBottom: '0.5rem'
                                },
                                children: "Create account"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 355,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                },
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 356,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: {
                                    width: '100%',
                                    marginBottom: '0.6rem',
                                    padding: '0.6rem',
                                    borderRadius: 6
                                },
                                type: "email",
                                placeholder: "you@domain.com",
                                value: authEmail,
                                onChange: (e)=>setAuthEmail(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 357,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                },
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 358,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: {
                                    width: '100%',
                                    marginBottom: '0.6rem',
                                    padding: '0.6rem',
                                    borderRadius: 6
                                },
                                placeholder: "Choose a strong password",
                                type: "password",
                                value: authPassword,
                                onChange: (e)=>setAuthPassword(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 359,
                                columnNumber: 15
                            }, this),
                            authError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    color: 'var(--accent-coral)',
                                    marginBottom: '0.6rem'
                                },
                                children: authError
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 360,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '0.5rem',
                                    display: 'flex',
                                    gap: '0.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn-primary",
                                        disabled: authLoading || !authEmail || !authPassword,
                                        onClick: async ()=>{
                                            setAuthError(null);
                                            setAuthLoading(true);
                                            try {
                                                const basicProfile = {
                                                    language: language || 'English',
                                                    firstName: '',
                                                    lastName: '',
                                                    email: authEmail,
                                                    currentRole: '',
                                                    yearsOfExperience: 0,
                                                    skills: [],
                                                    careerInterests: [],
                                                    currentGoals: '',
                                                    challenges: '',
                                                    availableHoursPerWeek: 0,
                                                    preferredLearningStyle: 'Interactive',
                                                    createdAt: new Date().toISOString(),
                                                    updatedAt: new Date().toISOString()
                                                };
                                                const res = await fetch('/api/auth/register', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        email: authEmail,
                                                        password: authPassword,
                                                        profile: basicProfile
                                                    })
                                                });
                                                const data = await res.json();
                                                if (!res.ok) {
                                                    setAuthError(data?.error || 'Register failed');
                                                    setAuthLoading(false);
                                                    return;
                                                }
                                                alert('Registered successfully — you can sign in now.');
                                                setShowRegister(false);
                                            } catch (err) {
                                                console.error(err);
                                                setAuthError('Register error');
                                            } finally{
                                                setAuthLoading(false);
                                            }
                                        },
                                        children: authLoading ? 'Creating...' : 'Create account'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 362,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn-secondary",
                                        style: {
                                            marginLeft: 'auto'
                                        },
                                        onClick: ()=>{
                                            setShowRegister(false);
                                            setAuthError(null);
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 379,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 361,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 354,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '2rem',
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: '2.5rem',
                                    marginBottom: '0.5rem',
                                    color: '#2563eb'
                                },
                                children: "🚀 SahiPath"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '1rem',
                                    color: '#666',
                                    marginBottom: '1rem'
                                },
                                children: "Your Personal AI Career Mentor"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 387,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        style: {
                            textAlign: 'center',
                            marginBottom: '1.5rem',
                            fontSize: '1.3rem'
                        },
                        children: "🌍 Choose Your Language"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 392,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '2rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    color: '#555',
                                    marginBottom: '1rem'
                                },
                                children: "🇮🇳 Languages from India"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "language-grid",
                                children: indianLanguages.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleLanguageSelect(lang),
                                        className: "language-btn",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "lang-emoji",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["languageInfo"][lang].emoji
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 408,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "lang-name",
                                                children: lang
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 409,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "lang-subtitle",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["languageInfo"][lang].nativeName
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 410,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, lang, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 403,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 401,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 397,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    color: '#555',
                                    marginBottom: '1rem'
                                },
                                children: "🌎 Languages Worldwide"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 418,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "language-grid",
                                children: globalLanguages.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleLanguageSelect(lang),
                                        className: "language-btn",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "lang-emoji",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["languageInfo"][lang].emoji
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 428,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "lang-name",
                                                children: lang
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 429,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "lang-subtitle",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["languageInfo"][lang].nativeName
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 430,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, lang, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 423,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 417,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 305,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/index.tsx",
            lineNumber: 304,
            columnNumber: 7
        }, this);
    }
    if (!language || !t) return null;
    // Stage 2: Personal Details
    if (stage === 'personal') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container form-container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "card form-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        children: [
                            "👤 ",
                            t['personal_details'] || 'Personal Details'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 447,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "form-subtitle",
                        children: t['tell_us_about'] || 'Tell us about yourself so we can personalize your experience'
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 448,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: handlePersonalSubmit,
                        className: "form",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: t['firstName'] || 'First Name *',
                                        value: personalData.firstName,
                                        onChange: (e)=>setPersonalData({
                                                ...personalData,
                                                firstName: e.target.value
                                            }),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 454,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: t['lastName'] || 'Last Name',
                                        value: personalData.lastName,
                                        onChange: (e)=>setPersonalData({
                                                ...personalData,
                                                lastName: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 461,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 453,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        placeholder: t['age'] || 'Age',
                                        value: personalData.age,
                                        onChange: (e)=>setPersonalData({
                                                ...personalData,
                                                age: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 470,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        placeholder: t['email'] || 'Email *',
                                        value: personalData.email,
                                        onChange: (e)=>setPersonalData({
                                                ...personalData,
                                                email: e.target.value
                                            }),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 476,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: t['location'] || 'Location (City/Country)',
                                        value: personalData.location,
                                        onChange: (e)=>setPersonalData({
                                                ...personalData,
                                                location: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 486,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        value: personalData.educationLevel,
                                        onChange: (e)=>setPersonalData({
                                                ...personalData,
                                                educationLevel: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: t['edu_highschool'] || 'High School'
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 496,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: t['edu_bachelor'] || "Bachelor's"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: t['edu_master'] || "Master's"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 498,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: t['edu_phd'] || 'PhD'
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 499,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 492,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 485,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: t['currentRole'] || 'Current Role/Job Title *',
                                        value: personalData.currentRole,
                                        onChange: (e)=>setPersonalData({
                                                ...personalData,
                                                currentRole: e.target.value
                                            }),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 504,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        placeholder: t['yearsExp'] || 'Years of Experience',
                                        value: personalData.yearsOfExperience,
                                        onChange: (e)=>setPersonalData({
                                                ...personalData,
                                                yearsOfExperience: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 511,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "btn-primary form-btn",
                                children: [
                                    t['next'] || 'Next',
                                    " →"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 519,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 452,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 446,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/index.tsx",
            lineNumber: 445,
            columnNumber: 7
        }, this);
    }
    // Stage 3: Professional Details
    if (stage === 'professional') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container form-container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "card form-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        children: [
                            "💼 ",
                            t['professional_details'] || 'Professional Details'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 533,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "form-subtitle",
                        children: t['career_info'] || 'Help us understand your career goals and learning preferences'
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 534,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: handleProfessionalSubmit,
                        className: "form",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                placeholder: t['skills'] || 'Skills (comma-separated) e.g., JavaScript, Python, React *',
                                value: professionalData.skills,
                                onChange: (e)=>setProfessionalData({
                                        ...professionalData,
                                        skills: e.target.value
                                    }),
                                required: true,
                                rows: 2
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 539,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                placeholder: t['interests'] || 'Career Interests (comma-separated) e.g., Frontend, Data Science, AI *',
                                value: professionalData.careerInterests,
                                onChange: (e)=>setProfessionalData({
                                        ...professionalData,
                                        careerInterests: e.target.value
                                    }),
                                required: true,
                                rows: 2
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 547,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                placeholder: t['goals'] || 'Current Goals (What do you want to achieve?) *',
                                value: professionalData.currentGoals,
                                onChange: (e)=>setProfessionalData({
                                        ...professionalData,
                                        currentGoals: e.target.value
                                    }),
                                required: true,
                                rows: 2
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 560,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                placeholder: t['challenges'] || 'Challenges (What\'s holding you back? e.g., time management, learning pace)',
                                value: professionalData.challenges,
                                onChange: (e)=>setProfessionalData({
                                        ...professionalData,
                                        challenges: e.target.value
                                    }),
                                rows: 2
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "form-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        placeholder: t['hoursPerWeek'] || 'Hours available per week',
                                        value: professionalData.availableHoursPerWeek,
                                        onChange: (e)=>setProfessionalData({
                                                ...professionalData,
                                                availableHoursPerWeek: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 580,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        value: professionalData.preferredLearningStyle,
                                        onChange: (e)=>setProfessionalData({
                                                ...professionalData,
                                                preferredLearningStyle: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "Interactive"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 597,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "Visual"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 598,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "Reading"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 599,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                children: "Practice-based"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 600,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 588,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 579,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "form-buttons",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setStage('personal'),
                                        className: "btn-secondary form-btn",
                                        children: [
                                            "← ",
                                            t['back'] || 'Back'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 605,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "btn-primary form-btn",
                                        children: [
                                            t['startMentoring'] || 'Start Mentoring',
                                            " →"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 612,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 604,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 538,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 532,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/index.tsx",
            lineNumber: 531,
            columnNumber: 7
        }, this);
    }
    // Stage 4: Mentor with RAG AI
    if (stage === 'mentor') {
        const profile = ragSystem?.getUserProfile();
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container mentor-main",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mentor-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            children: [
                                "🤖 ",
                                t['mentorChat'] || 'AI Career Mentor',
                                " -",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: 'var(--accent-teal)'
                                    },
                                    children: [
                                        ' ',
                                        profile?.firstName,
                                        " ",
                                        profile?.lastName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 631,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 629,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "mentor-subtitle",
                            children: t['rag_intro'] || '24/7 AI Assistant powered by your personal career context'
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 635,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 628,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mentor-layout",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "mentor-sidebar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "card profile-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: [
                                            "📋 ",
                                            t['profile_summary'] || 'Your Profile'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 643,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        className: "profile-list",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            t['role'] || 'Role',
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    profile?.currentRole
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 645,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            t['yearsExp'] || 'Experience',
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    profile?.yearsOfExperience,
                                                    " ",
                                                    t['years'] || 'years'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 648,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            t['goals'] || 'Goals',
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 652,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    profile?.currentGoals
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 651,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            t['hoursPerWeek'] || 'Hours/Week',
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 655,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    profile?.availableHoursPerWeek,
                                                    " ",
                                                    t['hours'] || 'hours'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 654,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            t['learningStyle'] || 'Learning Style',
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 658,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    profile?.preferredLearningStyle
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 657,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 644,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        style: {
                                            marginTop: '1.5rem'
                                        },
                                        children: [
                                            "🎯 ",
                                            t['skills'] || 'Skills'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 662,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "skills-tags",
                                        children: profile?.skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "skill-tag",
                                                children: skill
                                            }, skill, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 665,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 663,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '1rem',
                                            display: 'grid',
                                            gap: '0.6rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView('chat'),
                                                className: "btn-secondary",
                                                children: "💬 Chat"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 671,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView('performance'),
                                                className: "btn-secondary",
                                                children: "📈 Performance"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 672,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView('tests'),
                                                className: "btn-secondary",
                                                children: "📝 Tests"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 673,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView('resume'),
                                                className: "btn-secondary",
                                                children: "📄 Resume"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 674,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView('jobs'),
                                                className: "btn-secondary",
                                                children: "💼 Jobs"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 675,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView('media'),
                                                className: "btn-secondary",
                                                children: "🎙️ Media"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 676,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setStage('language');
                                                    setLanguage(null);
                                                    setRagSystem(null);
                                                },
                                                className: "btn-secondary",
                                                style: {
                                                    width: '100%'
                                                },
                                                children: [
                                                    "🔄 ",
                                                    t['restart'] || 'Restart'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 677,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 670,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 642,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 641,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "mentor-chat",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "chat-messages",
                                    children: chatMessages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: `message ${msg.role}`,
                                            children: [
                                                msg.role === 'assistant' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "emoji",
                                                    children: "🤖"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 696,
                                                    columnNumber: 48
                                                }, this),
                                                msg.role === 'user' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "emoji",
                                                    children: "👤"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 697,
                                                    columnNumber: 43
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "message-content",
                                                    children: msg.text
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 698,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 695,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 693,
                                    columnNumber: 13
                                }, this),
                                view === 'chat' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                            onSubmit: handleChatSubmit,
                                            className: "chat-form",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: chatInput,
                                                    onChange: (e)=>setChatInput(e.target.value),
                                                    placeholder: t['askAnything'] || 'Ask me anything...',
                                                    className: "chat-input"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 706,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>startListening(twoPersonMode),
                                                    className: "btn-secondary",
                                                    title: twoPersonMode ? 'Start or stop two-person voice chat' : 'Use microphone to speak your question',
                                                    style: {
                                                        marginRight: '0.5rem'
                                                    },
                                                    children: isListening ? '🎤 Listening...' : twoPersonMode ? '🎤 Voice Chat' : '🎤'
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: twoPersonMode,
                                                            onChange: (e)=>{
                                                                const enabled = e.target.checked;
                                                                setTwoPersonMode(enabled);
                                                                if (!enabled) stopListening();
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 723,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Two-person AI"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "btn-primary",
                                                    children: t['send'] || 'Send'
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 705,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '0.6rem',
                                                color: 'var(--text-secondary)'
                                            },
                                            children: twoPersonMode ? 'Two-person AI will listen and speak while the tab stays open.' : 'Typed or mic-transcribed messages return text only.'
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 738,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                view === 'performance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            children: "Performance Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 748,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pre", {
                                            style: {
                                                whiteSpace: 'pre-wrap'
                                            },
                                            children: JSON.stringify(ragSystem?.getPerformanceSummary(), null, 2)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 749,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 747,
                                    columnNumber: 15
                                }, this),
                                view === 'tests' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            children: "Test Records"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 755,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                            onSubmit: (e)=>{
                                                e.preventDefault();
                                                if (!ragSystem) return;
                                                const rec = ragSystem.recordTestResult({
                                                    name: 'Sample Test',
                                                    score: 80
                                                });
                                                setChatMessages((prev)=>[
                                                        ...prev,
                                                        {
                                                            role: 'assistant',
                                                            text: `Recorded test: ${rec.name} (${rec.score})`
                                                        }
                                                    ]);
                                                // persist tests locally and on server
                                                try {
                                                    const tests = ragSystem.getTestHistory();
                                                    localStorage.setItem('sahipath_tests', JSON.stringify(tests));
                                                    fetch('/api/tests', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify(rec)
                                                    });
                                                } catch (err) {
                                                    console.warn('Failed to save tests', err);
                                                }
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "btn-primary",
                                                children: "Record Sample Test"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 768,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 756,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '1rem'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pre", {
                                                style: {
                                                    whiteSpace: 'pre-wrap'
                                                },
                                                children: JSON.stringify(ragSystem?.getTestHistory(), null, 2)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 771,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 770,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 754,
                                    columnNumber: 15
                                }, this),
                                view === 'resume' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            children: "Resume Builder"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 779,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "btn-primary",
                                            onClick: ()=>{
                                                const profile = ragSystem?.getUserProfile();
                                                if (!profile) return;
                                                const resume = `Resume - ${profile.firstName} ${profile.lastName}\nRole: ${profile.currentRole}\nExperience: ${profile.yearsOfExperience} years\nSkills: ${profile.skills.join(', ')}\nGoals: ${profile.currentGoals}`;
                                                const blob = new Blob([
                                                    resume
                                                ], {
                                                    type: 'text/plain'
                                                });
                                                const url = URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = `${profile.firstName}_${profile.lastName}_resume.txt`;
                                                a.click();
                                            },
                                            children: "Generate Resume (TXT)"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 780,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "btn-secondary",
                                            style: {
                                                marginLeft: '0.6rem'
                                            },
                                            onClick: ()=>{
                                                const profile = ragSystem?.getUserProfile();
                                                if (!profile) return alert('No profile');
                                                // PDF generation is optional. Install `jspdf` to enable this feature:
                                                alert('To enable PDF resume generation install: npm install jspdf then restart the dev server.');
                                            },
                                            children: "Generate Resume (PDF)"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 791,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 778,
                                    columnNumber: 15
                                }, this),
                                view === 'jobs' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            children: "Job / Internship Suggestions"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 802,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "btn-primary",
                                            onClick: ()=>{
                                                const jobs = ragSystem?.suggestJobs(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["careerData"]) || [];
                                                setChatMessages((prev)=>[
                                                        ...prev,
                                                        {
                                                            role: 'assistant',
                                                            text: `Found ${jobs.length} suggested roles. Check sidebar for details.`
                                                        }
                                                    ]);
                                                // temporarily store as assistant message
                                                setChatMessages((prev)=>[
                                                        ...prev,
                                                        {
                                                            role: 'assistant',
                                                            text: JSON.stringify(jobs, null, 2)
                                                        }
                                                    ]);
                                            },
                                            children: "Suggest Jobs"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 803,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 801,
                                    columnNumber: 15
                                }, this),
                                view === 'media' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            children: "AI Media (Podcast / Image / Video / PPT)"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 814,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: '0.5rem',
                                                flexWrap: 'wrap'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn-secondary",
                                                    onClick: async ()=>{
                                                        const res = await fetch('/api/media', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({
                                                                type: 'podcast',
                                                                prompt: 'Short career advice podcast'
                                                            })
                                                        });
                                                        const data = await res.json();
                                                        setChatMessages((prev)=>[
                                                                ...prev,
                                                                {
                                                                    role: 'assistant',
                                                                    text: `Created podcast: ${data.url} ${data.note ? '- ' + data.note : ''}`
                                                                }
                                                            ]);
                                                        if (data?.url && data.url.startsWith('data:audio')) {
                                                            // play audio in new window or create audio element
                                                            const a = document.createElement('audio');
                                                            a.src = data.url;
                                                            a.controls = true;
                                                            a.autoplay = false;
                                                            const w = window.open('', '_blank');
                                                            if (w) {
                                                                w.document.write('<h3>Podcast (generated)</h3>');
                                                                w.document.write('<p>Right-click and save the audio to download.</p>');
                                                                w.document.body.appendChild(a);
                                                            }
                                                        }
                                                        setChatMessages((prev)=>[
                                                                ...prev,
                                                                {
                                                                    role: 'assistant',
                                                                    text: `Created podcast: ${data.url || data.note || 'generated'}`
                                                                }
                                                            ]);
                                                    },
                                                    children: "Generate Podcast"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 816,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn-secondary",
                                                    onClick: async ()=>{
                                                        const res = await fetch('/api/media', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({
                                                                type: 'image',
                                                                prompt: 'Profile banner image'
                                                            })
                                                        });
                                                        const data = await res.json();
                                                        // if data URL received, open in new tab
                                                        if (data?.url && data.url.startsWith('data:image')) {
                                                            const w = window.open('');
                                                            if (w) {
                                                                const img = w.document.createElement('img');
                                                                img.src = data.url;
                                                                img.style.maxWidth = '100%';
                                                                w.document.body.appendChild(img);
                                                            }
                                                        }
                                                        setChatMessages((prev)=>[
                                                                ...prev,
                                                                {
                                                                    role: 'assistant',
                                                                    text: `Created image: ${data.url || data.note || 'generated'}`
                                                                }
                                                            ]);
                                                    },
                                                    children: "Generate Image"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 835,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn-secondary",
                                                    onClick: async ()=>{
                                                        const res = await fetch('/api/media', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({
                                                                type: 'video',
                                                                prompt: 'Explainer video'
                                                            })
                                                        });
                                                        const data = await res.json();
                                                        setChatMessages((prev)=>[
                                                                ...prev,
                                                                {
                                                                    role: 'assistant',
                                                                    text: `Created video: ${data.url} ${data.note ? '- ' + data.note : ''}`
                                                                }
                                                            ]);
                                                    },
                                                    children: "Generate Video"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 850,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn-secondary",
                                                    onClick: async ()=>{
                                                        // Generate PPTX client-side using pptxgenjs when available
                                                        // PPTX generation is optional. Install `pptxgenjs` to enable this feature:
                                                        alert('To enable PPTX generation install: npm install pptxgenjs then restart the dev server.');
                                                    },
                                                    children: "Generate PPTX"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 855,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 815,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 813,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 692,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 640,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.tsx",
            lineNumber: 627,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0r~opx6._.js.map