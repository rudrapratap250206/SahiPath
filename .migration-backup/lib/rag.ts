// RAG (Retrieval-Augmented Generation) System
// Stores user context and provides intelligent responses based on user data

export interface UserProfile {
  language: string;
  // Personal Details
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  location: string;
  educationLevel: string;
  currentRole: string;
  yearsOfExperience: number;
  
  // Professional Details
  skills: string[];
  careerInterests: string[];
  currentGoals: string;
  challenges: string;
  availableHoursPerWeek: number;
  preferredLearningStyle: string;
  
  // System
  createdAt: string;
  updatedAt: string;
}

export class RAGSystem {
  private userProfile: UserProfile | null = null;
  private conversationHistory: Array<{ role: string; content: string; timestamp: string }> = [];
  private tests: Array<{ id: string; name: string; score: number; date: string; notes?: string }> = [];
  private performance: Record<string, any> = {};
  private knowledgeBase = this.initializeKnowledgeBase();

  constructor(profile?: UserProfile) {
    if (profile) {
      this.userProfile = profile;
    }
  }

  // Record a test result
  recordTestResult(test: { id?: string; name: string; score: number; date?: string; notes?: string }) {
    const record = {
      id: test.id || `${Date.now()}`,
      name: test.name,
      score: test.score,
      date: test.date || new Date().toISOString(),
      notes: test.notes || '',
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
    const average = tests.length ? tests.reduce((s, t) => s + t.score, 0) / tests.length : 0;
    return {
      totalTests: tests.length,
      averageScore: Math.round(average),
      latest: tests[0] || null,
    };
  }

  // Suggest jobs/internships based on profile and careerData
  suggestJobs(careerData: any) {
    if (!this.userProfile) return [];
    const skills = this.userProfile.skills || [];
    const allJobs: Array<any> = [];
    for (const key of Object.keys(careerData)) {
      const path = (careerData as any)[key];
      if (path.jobs && Array.isArray(path.jobs)) {
        path.jobs.forEach((j: any) => {
          allJobs.push({ ...j, path: path.title });
        });
      }
    }

    // simple scoring: match skill keywords in role
    return allJobs
      .map(j => ({
        ...j,
        score: skills.reduce((s: number, sk: string) => s + (j.role.toLowerCase().includes(sk.toLowerCase()) ? 5 : 0), 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  // Generate two-person style response from the real assistant output
  generateTwoPersonResponse(userMessage: string, careerData: any) {
    const single = this.generateResponse(userMessage, careerData);
    // Split into two perspectives for a dialogue feel
    const partA = `Advisor A: ${single.split('\n')[0] || single}`;
    const partB = `Advisor B: ${single.split('\n').slice(1).join('\n') || "I'd add a practical next step: try building a small project."}`;
    return `${partA}\n\n${partB}`;
  }

  generateMedia(type: 'podcast' | 'image' | 'video' | 'ppt', prompt: string) {
    throw new Error('Media generation requires a configured backend provider');
  }

  // Store user profile
  setUserProfile(profile: UserProfile) {
    this.userProfile = profile;
  }

  // Get user profile
  getUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  // Generate context-aware response
  generateResponse(userMessage: string, careerData: any): string {
    if (!this.userProfile) {
      return "Please complete your profile first.";
    }

    const lower = userMessage.toLowerCase();
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });

    let response = this.generateContextualResponse(lower, careerData);

    this.conversationHistory.push({
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    });

    return response;
  }

  private generateContextualResponse(message: string, careerData: any): string {
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

  private findBestMatchingPath(message: string, careerData: any): any {
    if (!careerData) return null;

    const careers = Object.values(careerData);
    let bestMatch = null;
    let bestScore = 0;

    for (const career of careers) {
      let score = 0;
      const careerTitle = (career as any).title.toLowerCase();
      const careerSkills = (career as any).skills || [];

      if (message.includes(careerTitle)) score += 10;

      careerSkills.forEach((skill: string) => {
        if (message.includes(skill.toLowerCase())) score += 5;
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = career;
      }
    }

    return bestMatch;
  }

  private handleTestScheduling(message: string, profile: UserProfile): string {
    const hours = profile.availableHoursPerWeek;
    const recommendation =
      hours >= 10
        ? 'You have good availability. I recommend taking a test this weekend.'
        : 'Based on your ' +
          hours +
          ' hours/week availability, let\'s schedule a 1-hour test next week.';

    return `${recommendation} When would you prefer? (This is personalized based on your profile: ${hours} hours available per week)`;
  }

  private handleResumeRequest(
    message: string,
    profile: UserProfile,
    careerData: any,
    matchedPath: any,
  ): string {
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

  private handleResourceRequest(
    message: string,
    profile: UserProfile,
    careerData: any,
    matchedPath: any,
  ): string {
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

  private handleRoadmapRequest(
    message: string,
    profile: UserProfile,
    careerData: any,
    matchedPath: any,
  ): string {
    const weeks = Math.ceil(profile.availableHoursPerWeek / 5); // Assume 5 hours per step
    const timeline = weeks < 4 ? 'intensive 1-month' : weeks < 12 ? '3-month' : '6-month';

    return `I'm building a personalized ${timeline} roadmap for you:
- Starting from your current role: ${profile.currentRole}
- With ${profile.availableHoursPerWeek} hours/week availability
- Targeting: ${profile.careerInterests.join(', ')}
- Addressing challenge: ${profile.challenges}

Should we focus on depth first or breadth to explore multiple areas?`;
  }

  private handleProgressTracking(message: string, profile: UserProfile): string {
    return `Let's track your progress! Based on your profile:
- Current experience: ${profile.yearsOfExperience} years in ${profile.currentRole}
- Available hours: ${profile.availableHoursPerWeek}/week
- Goal: ${profile.currentGoals}

What aspect would you like to measure? (Skills acquired, courses completed, projects built, certifications, or overall career progression)`;
  }

  private handleChallengeSupport(message: string, profile: UserProfile): string {
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

  private getMotivationalMessage(profile: UserProfile): string {
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

  private handleJobMarketInfo(message: string, profile: UserProfile): string {
    const skills = profile.skills.slice(0, 3).join(', ');
    const experience = profile.yearsOfExperience;

    return `Based on your profile with ${experience} years experience and skills in ${skills}:
- Market demand for your skillset is HIGH 📈
- Average salary growth in your path: 15-25% with transition
- Most opportunities need: advanced ${profile.skills[0] || 'technical'} skills + leadership

Your timeline? We can aim for a transition in ${profile.availableHoursPerWeek >= 15 ? '2-3 months' : '3-6 months'}.
Ready to start?`;
  }

  private providePersonalizedGuidance(profile: UserProfile, matchedPath: any): string {
    const name = profile.firstName;
    const goals = profile.currentGoals;
    const hours = profile.availableHoursPerWeek;

    return `Hi ${name}! 👋 
I'm learning about you - ${name}, your goal is "${goals}" and you dedicate ${hours} hours weekly.
That's ${hours >= 15 ? 'serious dedication' : hours >= 10 ? 'solid commitment' : 'let\'s make it count'}.

Quick tips for you:
1. Your ${profile.preferredLearningStyle} learning style works best with ${
      profile.preferredLearningStyle.includes('visual') ? 'diagrams and interactive platforms' : 'hands-on practice'
    }
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

  private initializeKnowledgeBase() {
    return {
      careerTips: [],
      learningResources: [],
      jobMarketData: [],
    };
  }
}
