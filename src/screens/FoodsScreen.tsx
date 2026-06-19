import React, {useMemo, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {MotiView} from 'moti';
import {LiquidGlass} from '../components/LiquidGlass';
import {useNutri} from '../context/NutriContext';
import {FoodItem, foodCategories, foods} from '../data/mockData';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {fadeUp, motion} from '../utils/motion';
import {useMotion} from '../utils/performance';

type FoodCardProps = {
  food: FoodItem;
  onLog: (food: FoodItem) => void;
};

function FoodCard({food, onLog}: FoodCardProps) {
  const [pressed, setPressed] = useState(false);

  const card = (
    <LiquidGlass animate={false}>
      <View style={styles.foodCard}>
        <Text style={styles.emoji}>{food.emoji}</Text>
        <View style={styles.foodInfo}>
          <Text style={typography.mealTitle}>{food.name}</Text>
          <Text style={typography.mealIngredient}>{food.category}</Text>
        </View>
        <View style={styles.macros}>
          <Text style={styles.calories}>{food.calories}</Text>
          <Text style={styles.caloriesUnit}>kcal</Text>
          <Text style={styles.macroDetail}>
            P{food.protein} · C{food.carbs} · F{food.fat}
          </Text>
        </View>
        <Text style={styles.logHint}>+</Text>
      </View>
    </LiquidGlass>
  );

  if (!useMotion) {
    return <Pressable onPress={() => onLog(food)}>{card}</Pressable>;
  }

  return (
    <Pressable
      onPress={() => onLog(food)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <MotiView
        animate={{scale: pressed ? 0.98 : 1}}
        transition={motion.press}>
        {card}
      </MotiView>
    </Pressable>
  );
}

type FoodsScreenProps = {
  highlightLog?: boolean;
};

export function FoodsScreen({highlightLog = false}: FoodsScreenProps) {
  const {logFood} = useNutri();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return foods.filter(food => {
      const matchesCategory =
        activeCategory === 'All' || food.category === activeCategory;
      const matchesSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleLogFood = (food: FoodItem) => {
    Alert.alert(
      'Log food?',
      `Add ${food.name} (${food.calories} kcal) to today?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Log',
          onPress: () => {
            logFood(food);
            Alert.alert('Logged!', `${food.name} added to today.`);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {highlightLog && (
        <MotiView
          from={fadeUp.from}
          animate={fadeUp.animate}
          transition={motion.enter}
          style={styles.banner}>
          <Text style={styles.bannerText}>Tap a food to log it for today</Text>
        </MotiView>
      )}
      <LiquidGlass animate={false} style={styles.searchGlass}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search foods..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </LiquidGlass>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        style={styles.categoriesScroll}>
        {foodCategories.map(category => {
          const isActive = category === activeCategory;
          return (
            <Pressable
              key={category}
              onPress={() => setActiveCategory(category)}>
              <View style={[styles.chip, isActive && styles.chipActive]}>
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {category}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <LiquidGlass animate={false}>
            <View style={styles.empty}>
              <Text style={typography.mealTitle}>No foods found</Text>
              <Text style={typography.mealIngredient}>
                Try a different search or category
              </Text>
            </View>
          </LiquidGlass>
        ) : (
          filtered.map(food => (
            <FoodCard key={food.id} food={food} onLog={handleLogFood} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  banner: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  bannerText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  searchGlass: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  categoriesScroll: {
    maxHeight: 44,
    marginBottom: 12,
  },
  categories: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.glassSurfaceStrong,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  emoji: {
    fontSize: 32,
  },
  foodInfo: {
    flex: 1,
    gap: 2,
  },
  macros: {
    alignItems: 'flex-end',
  },
  calories: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  caloriesUnit: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '500',
  },
  macroDetail: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  logHint: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
  empty: {
    padding: 32,
    alignItems: 'center',
    gap: 6,
  },
});
