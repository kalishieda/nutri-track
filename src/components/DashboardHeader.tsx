import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {CalorieRing} from './CalorieRing';
import {Header} from './Header';
import {LiquidGlass} from './LiquidGlass';
import {MacroBreakdown} from './MacroBreakdown';
import {LoggedEntry, UserProfile} from '../types/nutri';
import {computeDailyStats} from '../utils/nutriCalculations';

type DashboardHeaderProps = {
  todayEntries: LoggedEntry[];
  profile: UserProfile;
};

export const DashboardHeader = React.memo(function DashboardHeader({
  todayEntries,
  profile,
}: DashboardHeaderProps) {
  const stats = useMemo(
    () => computeDailyStats(todayEntries, profile),
    [todayEntries, profile],
  );

  return (
    <View style={styles.container}>
      <Header />
      <LiquidGlass strong animate={false} style={styles.dashboardGlass}>
        <View style={styles.dashboard}>
          <CalorieRing
            consumedCalories={stats.consumedCalories}
            goalCalories={profile.dailyCalorieGoal}
            caloriesLeft={stats.caloriesLeft}
            percentComplete={stats.percentComplete}
          />
          <MacroBreakdown macros={stats.macros} />
        </View>
      </LiquidGlass>
    </View>
  );
});

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
