import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {MotiView} from '../utils/moti';
import {CalorieRing} from './CalorieRing';
import {Header} from './Header';
import {LiquidGlass} from './LiquidGlass';
import {MacroBreakdown} from './MacroBreakdown';
import {LoggedEntry, UserProfile} from '../types/nutri';
import {computeDailyStats} from '../utils/nutriCalculations';
import {fadeUp, motion} from '../utils/motion';
import {useMotion} from '../utils/performance';

type DashboardHeaderProps = {
  todayEntries: LoggedEntry[];
  profile: UserProfile;
};

export function DashboardHeader({todayEntries, profile}: DashboardHeaderProps) {
  const stats = useMemo(
    () => computeDailyStats(todayEntries, profile),
    [todayEntries, profile],
  );

  const body = (
    <>
      <Header />
      <LiquidGlass strong animate={false} style={styles.dashboardGlass}>
        <View style={styles.dashboard}>
          <CalorieRing
            key={`ring-${stats.consumedCalories}-${stats.caloriesLeft}`}
            consumedCalories={stats.consumedCalories}
            goalCalories={profile.dailyCalorieGoal}
            caloriesLeft={stats.caloriesLeft}
            percentComplete={stats.percentComplete}
          />
          <MacroBreakdown
            key={`macros-${stats.macros.map(m => m.current).join('-')}`}
            macros={stats.macros}
          />
        </View>
      </LiquidGlass>
    </>
  );

  if (!useMotion) {
    return <View style={styles.container}>{body}</View>;
  }

  return (
    <MotiView
      from={fadeUp.from}
      animate={fadeUp.animate}
      transition={{...motion.enter, delay: 80}}
      style={styles.container}>
      {body}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  dashboardGlass: {
    marginTop: 4,
  },
  dashboard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
});
