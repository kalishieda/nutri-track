import {TextStyle} from 'react-native';
import {colors} from './colors';

export const typography = {
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryDark,
  } as TextStyle,
  ringLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.textSecondary,
  } as TextStyle,
  ringValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  } as TextStyle,
  ringUnit: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
  } as TextStyle,
  macroLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  } as TextStyle,
  tabActive: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  } as TextStyle,
  tabInactive: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.5,
  } as TextStyle,
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
  } as TextStyle,
  mealTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  } as TextStyle,
  mealIngredient: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textMuted,
  } as TextStyle,
  mealCalories: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  } as TextStyle,
  addMeal: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
  } as TextStyle,
  logFood: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryDark,
    letterSpacing: 1,
  } as TextStyle,
};
