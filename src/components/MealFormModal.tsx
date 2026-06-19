import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {FormModal} from './FormModal';
import {useNutri} from '../context/NutriContext';
import {LoggedEntry} from '../types/nutri';

type MealFormModalProps = {
  visible: boolean;
  entry?: LoggedEntry | null;
  onClose: () => void;
};

function parseIngredients(value: string): string[] {
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

export function MealFormModal({visible, entry, onClose}: MealFormModalProps) {
  const {addMeal, updateEntry, removeEntry} = useNutri();
  const isEditing = Boolean(entry);

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  useEffect(() => {
    if (!visible) {
      setTitle('');
      setIngredients('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
      return;
    }

    if (entry) {
      setTitle(entry.title);
      setIngredients(entry.ingredients.join(', '));
      setCalories(String(entry.calories));
      setProtein(entry.protein ? String(entry.protein) : '');
      setCarbs(entry.carbs ? String(entry.carbs) : '');
      setFat(entry.fat ? String(entry.fat) : '');
    }
  }, [visible, entry]);

  const buildInput = () => ({
    title: title.trim(),
    ingredients: parseIngredients(ingredients),
    calories: Number(calories),
    protein: protein ? Number(protein) : 0,
    carbs: carbs ? Number(carbs) : 0,
    fat: fat ? Number(fat) : 0,
  });

  const handleSubmit = () => {
    const input = buildInput();
    if (!input.title) {
      Alert.alert('Missing name', 'Enter a meal name.');
      return;
    }
    if (!input.calories || input.calories <= 0) {
      Alert.alert('Invalid calories', 'Enter a valid calorie amount.');
      return;
    }

    if (isEditing && entry) {
      updateEntry(entry.id, input);
      Alert.alert('Meal updated', `${input.title} saved.`);
    } else {
      addMeal(input);
      Alert.alert('Meal added', `${input.title} logged for today.`);
    }

    onClose();
  };

  const handleDelete = () => {
    if (!entry) {
      return;
    }

    Alert.alert('Remove meal?', `Remove "${entry.title}" from today?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          removeEntry(entry.id);
          onClose();
        },
      },
    ]);
  };

  return (
    <FormModal
      visible={visible}
      title={isEditing ? 'EDIT MEAL' : 'ADD MEAL'}
      submitLabel={isEditing ? 'Save Changes' : 'Add Meal'}
      destructiveLabel={isEditing ? 'Delete Meal' : undefined}
      fields={[
        {key: 'title', label: 'Meal name', value: title, placeholder: 'e.g. Lunch'},
        {
          key: 'ingredients',
          label: 'Ingredients (comma separated)',
          value: ingredients,
          placeholder: 'Chicken, Rice, Broccoli',
          multiline: true,
        },
        {
          key: 'calories',
          label: 'Calories (kcal)',
          value: calories,
          placeholder: '420',
          keyboardType: 'numeric',
        },
        {
          key: 'protein',
          label: 'Protein (g) - optional',
          value: protein,
          placeholder: '30',
          keyboardType: 'numeric',
        },
        {
          key: 'carbs',
          label: 'Carbs (g) - optional',
          value: carbs,
          placeholder: '40',
          keyboardType: 'numeric',
        },
        {
          key: 'fat',
          label: 'Fat (g) - optional',
          value: fat,
          placeholder: '12',
          keyboardType: 'numeric',
        },
      ]}
      onChange={(key, value) => {
        if (key === 'title') setTitle(value);
        if (key === 'ingredients') setIngredients(value);
        if (key === 'calories') setCalories(value);
        if (key === 'protein') setProtein(value);
        if (key === 'carbs') setCarbs(value);
        if (key === 'fat') setFat(value);
      }}
      onSubmit={handleSubmit}
      onClose={onClose}
      onDestructive={isEditing ? handleDelete : undefined}
    />
  );
}
