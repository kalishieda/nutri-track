import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

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

export const CalorieRing = React.memo(function CalorieRing({
  consumedCalories,
  goalCalories,
  caloriesLeft,
  percentComplete,
}: CalorieRingProps) {
  const ringFill = goalCalories > 0 ? Math.min(100, percentComplete) : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - ringFill / 100);

  return (
    <View style={styles.container}>
      <Text style={styles.goalLabel}>
        {consumedCalories} / {goalCalories} kcal
      </Text>
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
          <Text style={typography.ringValue}>{caloriesLeft}</Text>
          <Text style={typography.ringUnit}>kcal left</Text>
        </View>
      </View>
    </View>
  );
});

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
