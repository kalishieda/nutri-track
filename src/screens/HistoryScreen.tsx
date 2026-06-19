import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {LiquidGlass} from '../components/LiquidGlass';
import {useNutri} from '../context/NutriContext';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

function HistoryCard({
  dayLabel,
  date,
  totalCalories,
  goalCalories,
  mealsCount,
}: {
  dayLabel: string;
  date: string;
  totalCalories: number;
  goalCalories: number;
  mealsCount: number;
}) {
  const progress = Math.min(totalCalories / goalCalories, 1);
  const isOverGoal = totalCalories > goalCalories;

  return (
    <LiquidGlass animate={false}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={typography.mealTitle}>{dayLabel}</Text>
            <Text style={typography.mealIngredient}>{date}</Text>
          </View>
          <View style={styles.calorieBadge}>
            <Text style={styles.calorieBadgeText}>{totalCalories}</Text>
            <Text style={styles.calorieBadgeUnit}>kcal</Text>
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              isOverGoal ? styles.progressOver : styles.progressOk,
              {width: `${progress * 100}%`},
            ]}
          />
        </View>
        <Text style={styles.meta}>
          {mealsCount} meals · Goal {goalCalories} kcal
        </Text>
      </View>
    </LiquidGlass>
  );
}

export function HistoryScreen() {
  const {historyDays} = useNutri();

  const weeklyAvg =
    historyDays.length > 0
      ? Math.round(
          historyDays.reduce((sum, d) => sum + d.totalCalories, 0) /
            historyDays.length,
        )
      : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <LiquidGlass strong animate={false}>
        <View style={styles.summary}>
          <Text style={typography.sectionTitle}>WEEKLY AVERAGE</Text>
          <Text style={styles.summaryValue}>{weeklyAvg} kcal</Text>
          <Text style={typography.mealIngredient}>
            {historyDays.length > 0
              ? `Last ${historyDays.length} days tracked`
              : 'Log meals to see history'}
          </Text>
        </View>
      </LiquidGlass>

      <Text style={[typography.sectionTitle, styles.listTitle]}>RECENT DAYS</Text>
      {historyDays.length === 0 ? (
        <Text style={styles.empty}>No history yet.</Text>
      ) : (
        historyDays.map(day => (
          <HistoryCard
            key={day.id}
            dayLabel={day.dayLabel}
            date={day.date}
            totalCalories={day.totalCalories}
            goalCalories={day.goalCalories}
            mealsCount={day.mealsCount}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 12,
  },
  summary: {
    padding: 20,
    alignItems: 'center',
    gap: 4,
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primaryDark,
    marginVertical: 4,
  },
  listTitle: {
    marginTop: 8,
    marginBottom: 4,
  },
  empty: {
    ...typography.mealIngredient,
    textAlign: 'center',
    paddingVertical: 16,
  },
  card: {
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  calorieBadge: {
    alignItems: 'flex-end',
  },
  calorieBadgeText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  calorieBadgeUnit: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.progressTrack,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressOk: {
    backgroundColor: colors.primary,
  },
  progressOver: {
    backgroundColor: colors.danger,
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
