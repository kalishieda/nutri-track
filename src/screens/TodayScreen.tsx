import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {AddMealButton} from '../components/AddMealButton';
import {MealCard} from '../components/MealCard';
import {MealFormModal} from '../components/MealFormModal';
import {useNutri} from '../context/NutriContext';
import {LoggedEntry} from '../types/nutri';
import {typography} from '../theme/typography';

export function TodayScreen() {
  const {todayEntries, removeEntry} = useNutri();
  const [formVisible, setFormVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<LoggedEntry | null>(null);

  const openAddMeal = () => {
    setEditingEntry(null);
    setFormVisible(true);
  };

  const openEditMeal = (entry: LoggedEntry) => {
    setEditingEntry(entry);
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setEditingEntry(null);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={typography.sectionTitle}>MEALS</Text>
        {todayEntries.length === 0 ? (
          <Text style={styles.empty}>
            No meals logged yet. Add a meal or log food from the Foods tab.
          </Text>
        ) : (
          todayEntries.map((entry, index) => (
            <MealCard
              key={entry.id}
              title={entry.title}
              ingredients={entry.ingredients}
              calories={entry.calories}
              index={index}
              onPress={() => openEditMeal(entry)}
              onRemove={() => removeEntry(entry.id)}
            />
          ))
        )}
        <AddMealButton onPress={openAddMeal} />
      </ScrollView>
      <MealFormModal
        visible={formVisible}
        entry={editingEntry}
        onClose={closeForm}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  empty: {
    ...typography.mealIngredient,
    textAlign: 'center',
    paddingVertical: 24,
  },
});
