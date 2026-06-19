import {ViewStyle} from 'react-native';
import {colors} from './colors';

export const glass = {
  borderRadius: 20,
  borderRadiusSm: 14,
  borderRadiusLg: 28,
  borderWidth: 1,
  blurAmount: 24,
  blurType: 'light' as const,
};

export const glassCard: ViewStyle = {
  borderRadius: glass.borderRadius,
  borderWidth: glass.borderWidth,
  borderColor: colors.glassBorder,
  overflow: 'hidden',
  shadowColor: colors.shadow,
  shadowOffset: {width: 0, height: 8},
  shadowOpacity: 0.35,
  shadowRadius: 16,
  elevation: 6,
};

export const glassCardStrong: ViewStyle = {
  ...glassCard,
  borderColor: colors.glassHighlight,
  shadowOpacity: 0.45,
  shadowRadius: 20,
};
