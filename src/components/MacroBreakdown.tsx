import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MotiView} from 'moti';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {motion} from '../utils/motion';
import {useMotion} from '../utils/performance';

type MacroItem = {
  label: string;
  current: number;
  goal: number;
};

type MacroBreakdownProps = {
  macros: MacroItem[];
};

function MacroRow({label, current, goal, index}: MacroItem & {index: number}) {
  const progress = goal > 0 ? Math.min(current / goal, 1) : 0;

  return (
    <View style={styles.row}>
      <Text style={typography.macroLabel}>
        {label}: {current}g / {goal}g
      </Text>
      <View style={styles.track}>
        {useMotion ? (
          <MotiView
            key={`${label}-${current}`}
            from={{width: '0%'}}
            animate={{width: `${progress * 100}%`}}
            transition={{...motion.enter, delay: 120 + index * 80}}
            style={styles.fill}
          />
        ) : (
          <View style={[styles.fill, {width: `${progress * 100}%`}]} />
        )}
      </View>
    </View>
  );
}

export function MacroBreakdown({macros}: MacroBreakdownProps) {
  return (
    <View style={styles.container}>
      {macros.map((macro, index) => (
        <MacroRow key={macro.label} {...macro} index={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
    paddingLeft: 8,
  },
  row: {
    gap: 6,
  },
  track: {
    height: 6,
    backgroundColor: colors.progressTrack,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.progressFill,
    borderRadius: 3,
  },
});
