import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {readStorage, writeStorage} from '../storage/persistStorage';
import {FoodItem} from '../data/mockData';
import {
  AddMealInput,
  DailyStats,
  HistoryDay,
  LoggedEntry,
  NutriState,
  UserPreferences,
  UserProfile,
} from '../types/nutri';
import {getTodayDate} from '../utils/date';
import {
  computeDailyStats,
  computeHistoryDays,
  createEntryId,
} from '../utils/nutriCalculations';

const STORAGE_KEY = '@nutritrack/state';

const defaultProfile: UserProfile = {
  name: 'Arthur Gael',
  weightKg: 78,
  heightCm: 175,
  dailyCalorieGoal: 2400,
  proteinGoal: 120,
  carbsGoal: 250,
  fatGoal: 70,
};

const defaultPreferences: UserPreferences = {
  waterReminder: true,
  notifications: true,
  darkMode: false,
  units: 'metric',
};

function normalizeEntry(entry: LoggedEntry, today: string): LoggedEntry {
  return {
    ...entry,
    date: entry.date || today,
    calories: Number(entry.calories) || 0,
    protein: Number(entry.protein) || 0,
    carbs: Number(entry.carbs) || 0,
    fat: Number(entry.fat) || 0,
    ingredients: entry.ingredients ?? [],
  };
}

function createDefaultEntries(): LoggedEntry[] {
  const today = getTodayDate();
  return [
    {
      id: 'seed-1',
      title: 'Oatmeal with berries',
      ingredients: ['2% Milk', 'Almonds'],
      calories: 380,
      protein: 12,
      carbs: 54,
      fat: 10,
      date: today,
      source: 'manual',
    },
    {
      id: 'seed-2',
      title: 'Grilled Chicken Salad',
      ingredients: ['Chicken Breast', 'Lettuce', 'Tomato'],
      calories: 420,
      protein: 42,
      carbs: 12,
      fat: 18,
      date: today,
      source: 'manual',
    },
  ];
}

function createDefaultState(): NutriState {
  return {
    profile: defaultProfile,
    entries: createDefaultEntries(),
    preferences: defaultPreferences,
  };
}

type NutriContextValue = {
  profile: UserProfile;
  preferences: UserPreferences;
  todayEntries: LoggedEntry[];
  dailyStats: DailyStats;
  historyDays: HistoryDay[];
  isReady: boolean;
  addMeal: (input: AddMealInput) => void;
  logFood: (food: FoodItem) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, input: AddMealInput) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  setPreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
  ) => void;
};

const NutriContext = createContext<NutriContextValue | null>(null);

async function loadState(): Promise<NutriState> {
  const today = getTodayDate();
  try {
    const raw = await readStorage(STORAGE_KEY);
    if (!raw) {
      return createDefaultState();
    }
    const parsed = JSON.parse(raw) as NutriState;
    return {
      profile: {...defaultProfile, ...parsed.profile},
      entries: (parsed.entries ?? []).map(entry => normalizeEntry(entry, today)),
      preferences: {...defaultPreferences, ...parsed.preferences},
    };
  } catch {
    return createDefaultState();
  }
}

async function saveState(state: NutriState): Promise<void> {
  try {
    await writeStorage(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Fallback in-memory storage handles failures silently.
  }
}

export function NutriProvider({children}: {children: ReactNode}) {
  const [state, setState] = useState<NutriState>(() => createDefaultState());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadState().then(loaded => {
      setState(loaded);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    void saveState(state);
  }, [state, isReady]);

  const today = getTodayDate();
  const todayEntries = useMemo(
    () => state.entries.filter(entry => entry.date === today),
    [state.entries, today],
  );

  const dailyStats = useMemo(
    () => computeDailyStats(todayEntries, state.profile),
    [todayEntries, state.profile],
  );

  const historyDays = useMemo(
    () => computeHistoryDays(state.entries, state.profile),
    [state.entries, state.profile],
  );

  const addEntry = useCallback((entry: Omit<LoggedEntry, 'id' | 'date'>) => {
    setState(prev => ({
      ...prev,
      entries: [
        {
          ...entry,
          id: createEntryId(),
          date: getTodayDate(),
        },
        ...prev.entries,
      ],
    }));
  }, []);

  const addMeal = useCallback(
    (input: AddMealInput) => {
      addEntry({
        title: input.title.trim(),
        ingredients: input.ingredients,
        calories: input.calories,
        protein: input.protein ?? 0,
        carbs: input.carbs ?? 0,
        fat: input.fat ?? 0,
        source: 'manual',
      });
    },
    [addEntry],
  );

  const logFood = useCallback(
    (food: FoodItem) => {
      addEntry({
        title: food.name,
        ingredients: [food.category],
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        source: 'food',
        foodId: food.id,
      });
    },
    [addEntry],
  );

  const removeEntry = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      entries: prev.entries.filter(entry => entry.id !== id),
    }));
  }, []);

  const updateEntry = useCallback((id: string, input: AddMealInput) => {
    setState(prev => ({
      ...prev,
      entries: prev.entries.map(entry =>
        entry.id === id
          ? {
              ...entry,
              title: input.title.trim(),
              ingredients: input.ingredients,
              calories: input.calories,
              protein: input.protein ?? 0,
              carbs: input.carbs ?? 0,
              fat: input.fat ?? 0,
              source: entry.source === 'food' ? 'food' : 'manual',
            }
          : entry,
      ),
    }));
  }, []);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      profile: {...prev.profile, ...patch},
    }));
  }, []);

  const setPreference = useCallback(
    <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      setState(prev => ({
        ...prev,
        preferences: {...prev.preferences, [key]: value},
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      profile: state.profile,
      preferences: state.preferences,
      todayEntries,
      dailyStats,
      historyDays,
      isReady,
      addMeal,
      logFood,
      removeEntry,
      updateEntry,
      updateProfile,
      setPreference,
    }),
    [
      state.profile,
      state.preferences,
      todayEntries,
      dailyStats,
      historyDays,
      isReady,
      addMeal,
      logFood,
      removeEntry,
      updateEntry,
      updateProfile,
      setPreference,
    ],
  );

  return (
    <NutriContext.Provider value={value}>{children}</NutriContext.Provider>
  );
}

export function useNutri(): NutriContextValue {
  const context = useContext(NutriContext);
  if (!context) {
    throw new Error('useNutri must be used within NutriProvider');
  }
  return context;
}
