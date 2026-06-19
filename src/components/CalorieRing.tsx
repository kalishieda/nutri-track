import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MotiText, MotiView} from '../utils/moti';
import Svg, {Circle} from 'react-native-svg';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {motion} from '../utils/motion';
import {useMotion} from '../utils/performance';

type CalorieRingProps = {
  consumedCalories: number;
  goalCalories: number;
  caloriesLeft: number;
  percentComplete: number;
};

const SIZE = 130;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CalorieRing({
  consumedCalories,
  goalCalories,
  caloriesLeft,
  percentComplete,
}: CalorieRingProps) {
  const ringFill = goalCalories > 0 ? Math.min(100, percentComplete) : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - ringFill / 100);

  const goalText = (
    <Text style={styles.goalLabel}>
      {consumedCalories} / {goalCalories} kcal
    </Text>
  );

  const centerValue = useMotion ? (
    <MotiText
      key={`left-${caloriesLeft}`}
      from={{opacity: 0.5, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      transition={motion.enter}
      style={typography.ringValue}>
      {caloriesLeft}
    </MotiText>
  ) : (
    <Text style={typography.ringValue}>{caloriesLeft}</Text>
  );

  return (
    <View style={styles.container}>
      {useMotion ? (
        <MotiText
          key={`goal-${consumedCalories}-${goalCalories}`}
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={motion.enter}
          style={styles.goalLabel}>
          {consumedCalories} / {goalCalories} kcal
        </MotiText>
      ) : (
        goalText
      )}
      <Text style={styles.percentLabel}>{percentComplete}% of daily goal</Text>
      <View style={styles.ringWrapper}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={colors.ringTrack}
            strokeWidth={STROKE}
            fill="none"
          />
          <Circle
            key={`progress-${ringFill}`}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={colors.ringProgress}
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation={-90}
            origin={`${SIZE / 2}, ${SIZE / 2}`}
          />
        </Svg>
        <View style={styles.centerContent}>
          {centerValue}
          <Text style={typography.ringUnit}>kcal left</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  goalLabel: {
    ...typography.ringLabel,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  percentLabel: {
    ...typography.ringLabel,
    marginBottom: 8,
  },
  ringWrapper: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
  },
});
