export const careerData = {
  frontend: {
    id: 'frontend',
    title: 'Frontend Engineer',
    stage: 'Best when you like building user interfaces and interactive products.',
    summary: 'Builds web interfaces, design systems, and accessible user experiences.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Accessibility'],
    roadmap: ['Learn HTML/CSS', 'Master JavaScript', 'Learn React', 'Build 3 projects', 'Create portfolio'],
    freeResources: [
      { label: 'MDN Web Docs', url: 'https://developer.mozilla.org/', type: 'Documentation' },
      { label: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'Course' }
    ],
    paidResources: [
      { label: 'Frontend Masters', url: 'https://frontendmasters.com/', type: 'Course' }
    ],
    testBank: ['Box model', 'React hooks', 'CSS Grid', 'State vs Props', 'Accessibility'],
    jobs: [
      { role: 'Frontend Intern', type: 'Internship' },
      { role: 'Junior React Dev', type: 'Full-time' }
    ]
  },
  data: {
    id: 'data',
    title: 'Data Analyst',
    stage: 'Best when you like patterns and business insights.',
    summary: 'Turns raw data into dashboards and decisions.',
    skills: ['Excel', 'SQL', 'Power BI', 'Statistics', 'Python'],
    roadmap: ['Learn Excel basics', 'Master SQL', 'Create dashboards', 'Analyze real data', 'Build portfolio'],
    freeResources: [
      { label: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', type: 'Practice' },
      { label: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'SQL' }
    ],
    paidResources: [
      { label: 'DataCamp', url: 'https://www.datacamp.com/', type: 'Course' }
    ],
    testBank: ['SQL joins', 'Data cleaning', 'Statistics', 'Dashboard design', 'KPIs'],
    jobs: [
      { role: 'Data Analyst Intern', type: 'Internship' },
      { role: 'Business Analyst', type: 'Full-time' }
    ]
  },
  uiux: {
    id: 'uiux',
    title: 'UI/UX Designer',
    stage: 'Best when you love user behavior and design.',
    summary: 'Designs user journeys, wireframes, and prototypes.',
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
    roadmap: ['Learn design fundamentals', 'Create wireframes', 'Study Figma', 'User testing', 'Build case studies'],
    freeResources: [
      { label: 'Figma Design Resources', url: 'https://www.figma.com/', type: 'Tool' },
      { label: 'Nielsen Norman Group', url: 'https://www.nngroup.com/', type: 'Research' }
    ],
    paidResources: [
      { label: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/', type: 'Course' }
    ],
    testBank: ['Usability', 'User interviews', 'Visual hierarchy', 'Personas', 'Prototyping'],
    jobs: [
      { role: 'UI/UX Intern', type: 'Internship' },
      { role: 'Product Designer', type: 'Full-time' }
    ]
  },
  cybersecurity: {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    stage: 'Best when you like systems and protecting data.',
    summary: 'Protects systems with monitoring and incident response.',
    skills: ['Networking', 'Linux', 'Threat Modeling', 'SIEM', 'OWASP'],
    roadmap: ['Learn networking', 'Master Linux', 'Study OWASP Top 10', 'Home lab setup', 'Get certified'],
    freeResources: [
      { label: 'OWASP Top 10', url: 'https://owasp.org/', type: 'Security' },
      { label: 'PortSwigger Academy', url: 'https://portswigger.net/', type: 'Labs' }
    ],
    paidResources: [
      { label: 'TryHackMe', url: 'https://tryhackme.com/', type: 'Labs' }
    ],
    testBank: ['Phishing', 'Least privilege', 'Encryption', 'Vulnerabilities', 'Incident response'],
    jobs: [
      { role: 'SOC Analyst Intern', type: 'Internship' },
      { role: 'Security Analyst', type: 'Full-time' }
    ]
  },
  cloud: {
    id: 'cloud',
    title: 'Cloud/DevOps Engineer',
    stage: 'Best when you like infrastructure and automation.',
    summary: 'Builds deploy pipelines and production systems.',
    skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
    roadmap: ['Learn Linux', 'Master Docker', 'Study Kubernetes', 'Build CI/CD', 'Cloud certification'],
    freeResources: [
      { label: 'Docker Docs', url: 'https://docs.docker.com/', type: 'Documentation' },
      { label: 'AWS Skill Builder', url: 'https://skillbuilder.aws/', type: 'Course' }
    ],
    paidResources: [
      { label: 'KodeKloud', url: 'https://kodekloud.com/', type: 'Labs' }
    ],
    testBank: ['CI/CD', 'Docker', 'Infrastructure as Code', 'Monitoring', 'Scaling'],
    jobs: [
      { role: 'DevOps Intern', type: 'Internship' },
      { role: 'Cloud Engineer', type: 'Full-time' }
    ]
  },
  aiml: {
    id: 'aiml',
    title: 'AI/ML Engineer',
    stage: 'Best when you like math and intelligent systems.',
    summary: 'Builds models and intelligent products.',
    skills: ['Python', 'Statistics', 'TensorFlow', 'ML Algorithms', 'Data Processing'],
    roadmap: ['Learn Python', 'Study statistics', 'Master ML algorithms', 'Build projects', 'Deploy models'],
    freeResources: [
      { label: 'Google ML Crash Course', url: 'https://developers.google.com/machine-learning', type: 'Course' },
      { label: 'Kaggle', url: 'https://www.kaggle.com/', type: 'Competitions' }
    ],
    paidResources: [
      { label: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/', type: 'Course' }
    ],
    testBank: ['Overfitting', 'Train-test split', 'Normalization', 'Precision/Recall', 'Model deployment'],
    jobs: [
      { role: 'ML Intern', type: 'Internship' },
      { role: 'ML Engineer', type: 'Full-time' }
    ]
  },
  product: {
    id: 'product',
    title: 'Product Manager',
    stage: 'Best when you like strategy and coordination.',
    summary: 'Shapes features and aligns teams.',
    skills: ['Roadmapping', 'Research', 'Metrics', 'Communication', 'Strategy'],
    roadmap: ['Learn PM basics', 'User interviews', 'Create roadmaps', 'Study metrics', 'Case studies'],
    freeResources: [
      { label: 'Mind the Product', url: 'https://www.mindtheproduct.com/', type: 'Articles' },
      { label: 'Lenny Rachitsky', url: 'https://www.lennysnewsletter.com/', type: 'Newsletter' }
    ],
    paidResources: [
      { label: 'Reforge', url: 'https://www.reforge.com/', type: 'Course' }
    ],
    testBank: ['Product-market fit', 'Prioritization', 'KPIs', 'PRD writing', 'User retention'],
    jobs: [
      { role: 'Product Manager Intern', type: 'Internship' },
      { role: 'APM (Associate PM)', type: 'Full-time' }
    ]
  }
};

export const translations: any = {
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
  }
};
