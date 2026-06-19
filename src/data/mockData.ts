export type Meal = {
  id: string;
  title: string;
  ingredients: string[];
  calories: number;
};

export type HistoryDay = {
  id: string;
  date: string;
  dayLabel: string;
  totalCalories: number;
  goalCalories: number;
  mealsCount: number;
};

export type FoodItem = {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  emoji: string;
};

export type SettingItem = {
  id: string;
  label: string;
  value?: string;
  type: 'toggle' | 'link' | 'info';
  enabled?: boolean;
};

export const meals: Meal[] = [
  {
    id: '1',
    title: 'Oatmeal with berries',
    ingredients: ['2% Milk', 'Almonds'],
    calories: 380,
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    ingredients: ['Chicken Breast', 'Lettuce', 'Tomato'],
    calories: 420,
  },
];

export const historyDays: HistoryDay[] = [
  {
    id: '1',
    date: '2026-06-18',
    dayLabel: 'Yesterday',
    totalCalories: 2150,
    goalCalories: 2400,
    mealsCount: 4,
  },
  {
    id: '2',
    date: '2026-06-17',
    dayLabel: 'Tuesday',
    totalCalories: 1980,
    goalCalories: 2400,
    mealsCount: 3,
  },
  {
    id: '3',
    date: '2026-06-16',
    dayLabel: 'Monday',
    totalCalories: 2410,
    goalCalories: 2400,
    mealsCount: 5,
  },
  {
    id: '4',
    date: '2026-06-15',
    dayLabel: 'Sunday',
    totalCalories: 1760,
    goalCalories: 2400,
    mealsCount: 3,
  },
  {
    id: '5',
    date: '2026-06-14',
    dayLabel: 'Saturday',
    totalCalories: 2620,
    goalCalories: 2400,
    mealsCount: 5,
  },
];

export const foodCategories = [
  'All',
  'Fruits',
  'Proteins',
  'Grains',
  'Dairy',
  'Snacks',
];

export const foods: FoodItem[] = [
  {
    id: '1',
    name: 'Banana',
    category: 'Fruits',
    calories: 105,
    protein: 1,
    carbs: 27,
    fat: 0,
    emoji: '🍌',
  },
  {
    id: '2',
    name: 'Chicken Breast',
    category: 'Proteins',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 4,
    emoji: '🍗',
  },
  {
    id: '3',
    name: 'Brown Rice',
    category: 'Grains',
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 2,
    emoji: '🍚',
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    category: 'Dairy',
    calories: 130,
    protein: 15,
    carbs: 8,
    fat: 4,
    emoji: '🥛',
  },
  {
    id: '5',
    name: 'Almonds',
    category: 'Snacks',
    calories: 164,
    protein: 6,
    carbs: 6,
    fat: 14,
    emoji: '🥜',
  },
  {
    id: '6',
    name: 'Avocado',
    category: 'Fruits',
    calories: 240,
    protein: 3,
    carbs: 12,
    fat: 22,
    emoji: '🥑',
  },
  {
    id: '7',
    name: 'Salmon',
    category: 'Proteins',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    emoji: '🐟',
  },
  {
    id: '8',
    name: 'Oatmeal',
    category: 'Grains',
    calories: 158,
    protein: 6,
    carbs: 27,
    fat: 3,
    emoji: '🥣',
  },
];

export const settingsSections: {title: string; items: SettingItem[]}[] = [
  {
    title: 'Profile',
    items: [
      {id: 'name', label: 'Name', value: 'Arthur Gael', type: 'info'},
      {id: 'weight', label: 'Weight', value: '78 kg', type: 'link'},
      {id: 'height', label: 'Height', value: '175 cm', type: 'link'},
    ],
  },
  {
    title: 'Goals',
    items: [
      {id: 'calories', label: 'Daily Calories', value: '2400 kcal', type: 'link'},
      {id: 'protein', label: 'Protein Goal', value: '120g', type: 'link'},
      {id: 'water', label: 'Water Reminder', type: 'toggle', enabled: true},
    ],
  },
  {
    title: 'Preferences',
    items: [
      {id: 'notifications', label: 'Push Notifications', type: 'toggle', enabled: true},
      {id: 'darkmode', label: 'Dark Mode', type: 'toggle', enabled: false},
      {id: 'units', label: 'Units', value: 'Metric', type: 'link'},
    ],
  },
];
