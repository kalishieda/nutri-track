import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

type MacroItem = {
  label: string;
  current: number;
  goal: number;
};

type MacroBreakdownProps = {
  macros: MacroItem[];
};

function MacroRow({label, current, goal}: MacroItem) {
  const progress = goal > 0 ? Math.min(current / goal, 1) : 0;

  return (
    <View style={styles.row}>
      <Text style={typography.macroLabel}>
        {label}: {current}g / {goal}g
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, {width: `${progress * 100}%`}]} />
      </View>
    </View>
  );
}

export const MacroBreakdown = React.memo(function MacroBreakdown({
  macros,
}: MacroBreakdownProps) {
  return (
    <View style={styles.container}>
      {macros.map(macro => (
        <MacroRow key={macro.label} {...macro} />
      ))}
    </View>
  );
});

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
