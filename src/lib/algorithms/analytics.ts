export interface GradeRecord {
  term: number;
  score: number;
}

export interface StudentAnalytics {
  subject: string;
  currentScore: number;
  predictedNextTerm: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
  slope: number;
}

export function predictGrades(history: Record<string, GradeRecord[]>): StudentAnalytics[] {
  const analytics: StudentAnalytics[] = [];
  
  const subjects = Object.keys(history);
  const colors = ['#f5c842','#2dd4bf','#a78bfa','#fb7185','#4ade80','#f59e0b']; // match UI
  
  subjects.forEach((subject, idx) => {
    const records = history[subject];
    if (!records || records.length === 0) return;
    
    // Sort by term just in case
    records.sort((a, b) => a.term - b.term);
    
    const currentScore = records[records.length - 1].score;
    
    // Simple linear regression to predict next term
    let predictedNextTerm = currentScore;
    let trend: 'up' | 'down' | 'stable' = 'stable';
    let slope = 0;
    
    if (records.length > 1) {
      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
      const n = records.length;
      
      records.forEach((r, i) => {
        const x = i + 1; // using chronological index as independent variable
        const y = r.score;
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
      });
      
      slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      
      const nextTermX = n + 1;
      predictedNextTerm = Math.round(slope * nextTermX + intercept);
      
      // Cap at 100, min 0
      predictedNextTerm = Math.min(100, Math.max(0, predictedNextTerm));
      
      if (slope > 1.5) trend = 'up';
      else if (slope < -1.5) trend = 'down';
    }
    
    analytics.push({
      subject,
      currentScore,
      predictedNextTerm,
      trend,
      color: colors[idx % colors.length],
      slope
    });
  });
  
  // Sort from most improving to least improving
  analytics.sort((a, b) => b.slope - a.slope);
  
  return analytics;
}
