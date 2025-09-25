export interface StudySession {
  id: string;
  studentId: string;
  groupId?: string;
  subject: string;
  duration: number; // in minutes
  date: Date;
  type: 'individual' | 'group' | 'tutoring';
  effectiveness: number; // 1-10 scale
  topics: string[];
}

export interface CollaborationMetrics {
  totalStudyHours: number;
  groupSessionsAttended: number;
  tutoringSessionsReceived: number;
  tutoringSessionsGiven: number;
  averageGroupSize: number;
  subjectDistribution: Record<string, number>;
  collaborationEffectiveness: number;
  peerRating: number;
  streakDays: number;
}

export class AnalyticsEngine {
  /**
   * Calculate comprehensive collaboration metrics for a student
   */
  static calculateCollaborationMetrics(
    sessions: StudySession[],
    studentId: string
  ): CollaborationMetrics {
    const studentSessions = sessions.filter(s => s.studentId === studentId);
    
    const totalStudyHours = studentSessions.reduce((total, session) => 
      total + (session.duration / 60), 0
    );

    const groupSessions = studentSessions.filter(s => s.type === 'group');
    const tutoringReceived = studentSessions.filter(s => s.type === 'tutoring');
    
    // This would typically come from a separate tutoring table
    const tutoringGiven = 0; // Placeholder

    const averageGroupSize = groupSessions.length > 0 
      ? groupSessions.reduce((sum, session) => sum + (session.groupId ? 4 : 1), 0) / groupSessions.length
      : 0;

    const subjectDistribution = this.calculateSubjectDistribution(studentSessions);
    
    const collaborationEffectiveness = studentSessions.length > 0
      ? studentSessions.reduce((sum, session) => sum + session.effectiveness, 0) / studentSessions.length
      : 0;

    const streakDays = this.calculateStudyStreak(studentSessions);

    return {
      totalStudyHours,
      groupSessionsAttended: groupSessions.length,
      tutoringSessionsReceived: tutoringReceived.length,
      tutoringSessionsGiven: tutoringGiven,
      averageGroupSize,
      subjectDistribution,
      collaborationEffectiveness,
      peerRating: 4.2, // This would come from peer feedback
      streakDays
    };
  }

  /**
   * Calculate subject distribution for visualization
   */
  private static calculateSubjectDistribution(sessions: StudySession[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    sessions.forEach(session => {
      distribution[session.subject] = (distribution[session.subject] || 0) + session.duration;
    });

    return distribution;
  }

  /**
   * Calculate current study streak in days
   */
  private static calculateStudyStreak(sessions: StudySession[]): number {
    if (sessions.length === 0) return 0;

    // Sort sessions by date (most recent first)
    const sortedSessions = sessions.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    let streak = 0;
    const today = new Date();
    let currentDate = new Date(today);

    // Check consecutive days with study sessions
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const daySessions = sortedSessions.filter(session => 
        this.isSameDay(session.date, currentDate)
      );

      if (daySessions.length > 0) {
        streak++;
      } else if (streak > 0) {
        break; // Streak is broken
      }

      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  }

  /**
   * Check if two dates are the same day
   */
  private static isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  /**
   * Generate study recommendations based on analytics
   */
  static generateRecommendations(
    metrics: CollaborationMetrics,
    recentSessions: StudySession[]
  ): string[] {
    const recommendations: string[] = [];

    // Study frequency recommendations
    if (metrics.totalStudyHours < 10) {
      recommendations.push("Consider increasing your weekly study hours to improve academic performance.");
    }

    // Group collaboration recommendations
    if (metrics.groupSessionsAttended < 2) {
      recommendations.push("Join more study groups to benefit from collaborative learning.");
    }

    // Subject diversity recommendations
    const subjects = Object.keys(metrics.subjectDistribution);
    if (subjects.length < 3) {
      recommendations.push("Diversify your study subjects to build a well-rounded academic foundation.");
    }

    // Peer tutoring recommendations
    if (metrics.tutoringSessionsReceived === 0 && metrics.collaborationEffectiveness < 7) {
      recommendations.push("Consider peer tutoring sessions to improve understanding of challenging topics.");
    }

    // Consistency recommendations
    if (metrics.streakDays < 7) {
      recommendations.push("Build a consistent study routine to maintain momentum and improve retention.");
    }

    // Effectiveness recommendations
    if (metrics.collaborationEffectiveness < 6) {
      recommendations.push("Focus on active participation in study sessions to maximize learning effectiveness.");
    }

    return recommendations;
  }

  /**
   * Predict optimal study group composition
   */
  static predictOptimalGroupSize(
    studentHistory: StudySession[],
    subject: string
  ): { recommendedSize: number; confidence: number } {
    const relevantSessions = studentHistory.filter(s => 
      s.subject === subject && s.type === 'group'
    );

    if (relevantSessions.length < 3) {
      return { recommendedSize: 4, confidence: 0.5 }; // Default recommendation
    }

    // Analyze effectiveness by group size
    const sizeEffectiveness: Record<number, number[]> = {};
    
    relevantSessions.forEach(session => {
      const size = session.groupId ? 4 : 2; // Simplified group size logic
      if (!sizeEffectiveness[size]) {
        sizeEffectiveness[size] = [];
      }
      sizeEffectiveness[size].push(session.effectiveness);
    });

    // Find size with highest average effectiveness
    let bestSize = 4;
    let bestEffectiveness = 0;
    let confidence = 0;

    Object.entries(sizeEffectiveness).forEach(([size, effectiveness]) => {
      const avgEffectiveness = effectiveness.reduce((a, b) => a + b, 0) / effectiveness.length;
      if (avgEffectiveness > bestEffectiveness) {
        bestSize = parseInt(size);
        bestEffectiveness = avgEffectiveness;
        confidence = Math.min(effectiveness.length / 5, 1); // Higher confidence with more data
      }
    });

    return { recommendedSize: bestSize, confidence };
  }
}