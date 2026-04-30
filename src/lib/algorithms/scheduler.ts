export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

const TIMESLOTS = ['08:00', '09:30', '11:00', '12:00', '14:00', '15:30'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const COLORS = ['#f5c842','#2dd4bf','#a78bfa','#fb7185','#4ade80','#f59e0b','#0ea5e9'];

export const SUBJECT_REQUIREMENTS = [
  { subject: 'Mathematics', teacher: 'Dr. Sarah Smith', room: '201', hoursPerWeek: 5 },
  { subject: 'Physics', teacher: 'James Wilson', room: 'Lab 3', hoursPerWeek: 3 },
  { subject: 'Chemistry', teacher: 'Emily Brown', room: 'Lab 1', hoursPerWeek: 3 },
  { subject: 'CS', teacher: 'Arun Menon', room: '204', hoursPerWeek: 3 },
  { subject: 'English', teacher: 'Emma Watson', room: '104', hoursPerWeek: 4 },
  { subject: 'History', teacher: 'Robert Langdon', room: '106', hoursPerWeek: 3 },
  { subject: 'Sports', teacher: 'Dev Singh', room: 'Ground', hoursPerWeek: 2 },
  { subject: 'Art', teacher: 'Frida Kahlo', room: 'Studio', hoursPerWeek: 2 },
];

/**
 * A greedy algorithm with backtracking constraints to ensure:
 * 1. No more than 1 of the same subject per day (if possible)
 * 2. Proper distribution of hours across the week
 */
export function generateAutoSchedule(): ScheduleItem[] {
  const schedule: ScheduleItem[] = [];
  
  // Clone requirements
  const pool = SUBJECT_REQUIREMENTS.map((r, i) => ({ 
    ...r, 
    assigned: 0, 
    color: COLORS[i % COLORS.length] 
  }));

  let idCounter = 1000;

  for (const day of DAYS) {
    // Keep track of subjects assigned today to prevent duplicates
    const assignedToday = new Set<string>();

    for (const time of TIMESLOTS) {
      // Find valid subjects (not assigned today, still need hours)
      let validCandidates = pool.filter(p => !assignedToday.has(p.subject) && p.assigned < p.hoursPerWeek);
      
      // If we are too strict and no candidates match, relax condition 1 (allow same subject twice)
      if (validCandidates.length === 0) {
        validCandidates = pool.filter(p => p.assigned < p.hoursPerWeek);
      }

      // If still nothing, we've fulfilled all requirements, so leave the slot empty
      if (validCandidates.length === 0) {
        continue;
      }

      // Sort by remaining hours to prioritize subjects falling behind
      validCandidates.sort((a, b) => (b.hoursPerWeek - b.assigned) - (a.hoursPerWeek - a.assigned));

      // Pick the highest priority
      const pick = validCandidates[0];
      pick.assigned++;
      assignedToday.add(pick.subject);

      schedule.push({
        id: `auto_${idCounter++}`,
        day,
        time,
        subject: pick.subject,
        teacher: pick.teacher,
        room: pick.room,
        color: pick.color
      });
    }
  }

  return schedule;
}

export function evaluateScheduleConflicts(schedule: ScheduleItem[]): string[] {
    const conflicts: string[] = [];
    const map = new Map<string, string>(); // time+day -> subject
    
    schedule.forEach(l => {
        const key = `${l.day}-${l.time}`;
        if (map.has(key)) {
            conflicts.push(`Conflict detected on ${l.day} at ${l.time} between ${map.get(key)} and ${l.subject}`);
        } else {
            map.set(key, l.subject);
        }
    });

    return conflicts;
}
