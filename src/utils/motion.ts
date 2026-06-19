import {Platform} from 'react-native';

const spring = {type: 'spring' as const, damping: 20, stiffness: 180};
const springSnappy = {type: 'spring' as const, damping: 22, stiffness: 240};
const timing = {type: 'timing' as const, duration: 280};

export const motion = {
  enter: Platform.select({
    ios: spring,
    default: timing,
  }),
  screen: Platform.select({
    ios: {type: 'spring' as const, damping: 24, stiffness: 200},
    default: {type: 'timing' as const, duration: 260},
  }),
  tab: springSnappy,
  press: {type: 'timing' as const, duration: 140},
  stagger: (index: number) => ({
    ...(Platform.OS === 'ios' ? spring : timing),
    delay: Math.min(index * 55, Platform.OS === 'ios' ? 300 : 180),
  }),
};

export const fadeUp = {
  from: {opacity: 0, translateY: Platform.OS === 'ios' ? 14 : 8},
  animate: {opacity: 1, translateY: 0},
};

export const fadeIn = {
  from: {opacity: 0},
  animate: {opacity: 1},
};

export const scaleIn = {
  from: {opacity: 0, scale: 0.96},
  animate: {opacity: 1, scale: 1},
};
