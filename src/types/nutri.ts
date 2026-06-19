export type LoggedEntry = {
  id: string;
  title: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
  source: 'manual' | 'food';
  foodId?: string;
};

export type UserProfile = {
  name: string;
  weightKg: number;
  heightCm: number;
  dailyCalorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
};

export type UserPreferences = {
  waterReminder: boolean;
  notifications: boolean;
  darkMode: boolean;
  units: 'metric' | 'imperial';
};

export type DailyStats = {
  consumedCalories: number;
  caloriesLeft: number;
  percentComplete: number;
  macros: {label: string; current: number; goal: number}[];
};

export type HistoryDay = {
  id: string;
  date: string;
  dayLabel: string;
  totalCalories: number;
  goalCalories: number;
  mealsCount: number;
};

export type AddMealInput = {
  title: string;
  ingredients: string[];
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
};

export type NutriState = {
  profile: UserProfile;
  entries: LoggedEntry[];
  preferences: UserPreferences;
};
