export interface Student {
  id: string;
  name: string;
  major: string;
  year: string;
  gpa: number;
  courses: string[];
  studyPreferences: string[];
  availableHours: string[];
  studyGoals: string[];
}

export interface MatchCriteria {
  commonCourses: number;
  scheduleOverlap: number;
  studyStyleCompatibility: number;
  academicLevel: number;
  overallCompatibility: number;
}

export class MatchingAlgorithm {
  /**
   * Calculate compatibility score between two students
   * This simulates what CrewAI agents would do for matching
   */
  static calculateCompatibility(student1: Student, student2: Student): MatchCriteria {
    const commonCourses = this.calculateCommonCourses(student1.courses, student2.courses);
    const scheduleOverlap = this.calculateScheduleOverlap(student1.availableHours, student2.availableHours);
    const studyStyleCompatibility = this.calculateStudyStyleCompatibility(
      student1.studyPreferences, 
      student2.studyPreferences
    );
    const academicLevel = this.calculateAcademicLevelCompatibility(student1.gpa, student2.gpa);

    const overallCompatibility = this.calculateOverallScore({
      commonCourses,
      scheduleOverlap,
      studyStyleCompatibility,
      academicLevel
    });

    return {
      commonCourses,
      scheduleOverlap,
      studyStyleCompatibility,
      academicLevel,
      overallCompatibility
    };
  }

  /**
   * Calculate shared courses percentage
   */
  private static calculateCommonCourses(courses1: string[], courses2: string[]): number {
    const common = courses1.filter(course => courses2.includes(course));
    const total = new Set([...courses1, ...courses2]).size;
    return total > 0 ? (common.length / total) * 100 : 0;
  }

  /**
   * Calculate schedule overlap percentage
   */
  private static calculateScheduleOverlap(hours1: string[], hours2: string[]): number {
    const overlap = hours1.filter(hour => hours2.includes(hour));
    const total = new Set([...hours1, ...hours2]).size;
    return total > 0 ? (overlap.length / total) * 100 : 0;
  }

  /**
   * Calculate study style compatibility
   */
  private static calculateStudyStyleCompatibility(prefs1: string[], prefs2: string[]): number {
    const compatible = prefs1.filter(pref => prefs2.includes(pref));
    const total = Math.max(prefs1.length, prefs2.length);
    return total > 0 ? (compatible.length / total) * 100 : 0;
  }

  /**
   * Calculate academic level compatibility (closer GPAs are more compatible)
   */
  private static calculateAcademicLevelCompatibility(gpa1: number, gpa2: number): number {
    const difference = Math.abs(gpa1 - gpa2);
    // GPA difference of 0.5 or less is considered highly compatible
    return Math.max(0, 100 - (difference * 100));
  }

  /**
   * Calculate weighted overall compatibility score
   */
  private static calculateOverallScore(scores: Omit<MatchCriteria, 'overallCompatibility'>): number {
    const weights = {
      commonCourses: 0.35,      // 35% - Most important
      scheduleOverlap: 0.25,    // 25% - Very important
      studyStyleCompatibility: 0.25, // 25% - Very important
      academicLevel: 0.15       // 15% - Somewhat important
    };

    return (
      scores.commonCourses * weights.commonCourses +
      scores.scheduleOverlap * weights.scheduleOverlap +
      scores.studyStyleCompatibility * weights.studyStyleCompatibility +
      scores.academicLevel * weights.academicLevel
    );
  }

  /**
   * Find best matches for a student from a pool of candidates
   */
  static findBestMatches(
    targetStudent: Student, 
    candidates: Student[], 
    limit: number = 10
  ): Array<{ student: Student; compatibility: MatchCriteria }> {
    return candidates
      .filter(candidate => candidate.id !== targetStudent.id)
      .map(candidate => ({
        student: candidate,
        compatibility: this.calculateCompatibility(targetStudent, candidate)
      }))
      .sort((a, b) => b.compatibility.overallCompatibility - a.compatibility.overallCompatibility)
      .slice(0, limit);
  }

  /**
   * Suggest optimal study groups based on multiple students
   */
  static suggestStudyGroups(
    students: Student[], 
    maxGroupSize: number = 5
  ): Array<{
    members: Student[];
    averageCompatibility: number;
    commonCourses: string[];
  }> {
    const groups: Array<{
      members: Student[];
      averageCompatibility: number;
      commonCourses: string[];
    }> = [];

    // Simple greedy algorithm for group formation
    // In a real CrewAI implementation, this would be more sophisticated
    const used = new Set<string>();

    for (const student of students) {
      if (used.has(student.id)) continue;

      const group = [student];
      used.add(student.id);

      // Find compatible students for this group
      const candidates = students
        .filter(s => !used.has(s.id))
        .map(candidate => ({
          student: candidate,
          compatibility: this.calculateCompatibility(student, candidate)
        }))
        .sort((a, b) => b.compatibility.overallCompatibility - a.compatibility.overallCompatibility);

      for (const { student: candidate } of candidates) {
        if (group.length >= maxGroupSize) break;

        // Check if candidate is compatible with all group members
        const groupCompatibility = group.map(member => 
          this.calculateCompatibility(member, candidate).overallCompatibility
        );

        const avgCompatibility = groupCompatibility.reduce((a, b) => a + b, 0) / groupCompatibility.length;

        if (avgCompatibility >= 70) { // Threshold for group compatibility
          group.push(candidate);
          used.add(candidate.id);
        }
      }

      if (group.length >= 2) { // Only create groups with at least 2 members
        const commonCourses = this.findCommonCourses(group.map(s => s.courses));
        const averageCompatibility = this.calculateGroupCompatibility(group);

        groups.push({
          members: group,
          averageCompatibility,
          commonCourses
        });
      }
    }

    return groups.sort((a, b) => b.averageCompatibility - a.averageCompatibility);
  }

  /**
   * Find courses common to all students in a group
   */
  private static findCommonCourses(courseLists: string[][]): string[] {
    if (courseLists.length === 0) return [];
    
    return courseLists[0].filter(course =>
      courseLists.every(courses => courses.includes(course))
    );
  }

  /**
   * Calculate average compatibility within a group
   */
  private static calculateGroupCompatibility(group: Student[]): number {
    if (group.length < 2) return 0;

    let totalCompatibility = 0;
    let pairCount = 0;

    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        totalCompatibility += this.calculateCompatibility(group[i], group[j]).overallCompatibility;
        pairCount++;
      }
    }

    return pairCount > 0 ? totalCompatibility / pairCount : 0;
  }
}