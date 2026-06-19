import {
  DailyStats,
  HistoryDay,
  LoggedEntry,
  UserProfile,
} from '../types/nutri';
import {formatDisplayDate, getDayLabel, getTodayDate} from './date';

export function computeDailyStats(
  entries: LoggedEntry[],
  profile: UserProfile,
): DailyStats {
  const consumedCalories = entries.reduce(
    (sum, e) => sum + (Number(e.calories) || 0),
    0,
  );
  const protein = entries.reduce(
    (sum, e) => sum + (Number(e.protein) || 0),
    0,
  );
  const carbs = entries.reduce((sum, e) => sum + (Number(e.carbs) || 0), 0);
  const fat = entries.reduce((sum, e) => sum + (Number(e.fat) || 0), 0);
  const goal = profile.dailyCalorieGoal;
  const caloriesLeft = Math.max(0, goal - consumedCalories);
  const percentComplete =
    goal > 0 ? Math.round((consumedCalories / goal) * 100) : 0;

  return {
    consumedCalories,
    caloriesLeft,
    percentComplete,
    macros: [
      {
        label: 'Protein',
        current: Math.round(protein),
        goal: profile.proteinGoal,
      },
      {label: 'Carbs', current: Math.round(carbs), goal: profile.carbsGoal},
      {label: 'Fat', current: Math.round(fat), goal: profile.fatGoal},
    ],
  };
}

export function computeHistoryDays(
  entries: LoggedEntry[],
  profile: UserProfile,
): HistoryDay[] {
  const today = getTodayDate();
  const byDate = new Map<string, LoggedEntry[]>();

  for (const entry of entries) {
    const list = byDate.get(entry.date) ?? [];
    list.push(entry);
    byDate.set(entry.date, list);
  }

  return [...byDate.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, dayEntries]) => ({
      id: date,
      date: formatDisplayDate(date),
      dayLabel: getDayLabel(date, today),
      totalCalories: dayEntries.reduce((sum, e) => sum + e.calories, 0),
      goalCalories: profile.dailyCalorieGoal,
      mealsCount: dayEntries.length,
    }));
}

export function createEntryId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
