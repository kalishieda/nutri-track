import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {MotiText, MotiView} from 'moti';
import {LiquidGlass} from './LiquidGlass';
import {typography} from '../theme/typography';
import {motion} from '../utils/motion';
import {useMotion, useStaggerAnimations} from '../utils/performance';

type MealCardProps = {
  title: string;
  ingredients: string[];
  calories: number;
  index?: number;
  onPress?: () => void;
  onRemove?: () => void;
};

export const MealCard = React.memo(function MealCard({
  title,
  ingredients,
  calories,
  index = 0,
  onPress,
  onRemove,
}: MealCardProps) {
  const [pressed, setPressed] = useState(false);

  const handleLongPress = () => {
    if (!onRemove) {
      return;
    }
    Alert.alert('Remove meal?', `Remove "${title}" from today?`, [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Remove', style: 'destructive', onPress: onRemove},
    ]);
  };

  const card = (
    <LiquidGlass
      delay={useStaggerAnimations ? index * 55 : 0}
      animate={useStaggerAnimations}
      style={styles.glass}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={typography.mealTitle}>{title}</Text>
          <View style={styles.ingredients}>
            {ingredients.length > 0 ? (
              ingredients.map(ingredient => (
                <Text key={ingredient} style={typography.mealIngredient}>
                  {ingredient}
                </Text>
              ))
            ) : (
              <Text style={typography.mealIngredient}>Custom meal</Text>
            )}
          </View>
        </View>
        {useMotion ? (
          <MotiText
            key={`cal-${calories}`}
            from={{opacity: 0.6, scale: 0.92}}
            animate={{opacity: 1, scale: 1}}
            transition={motion.enter}
            style={typography.mealCalories}>
            {calories} kcal
          </MotiText>
        ) : (
          <Text style={typography.mealCalories}>{calories} kcal</Text>
        )}
      </View>
    </LiquidGlass>
  );

  if (!useMotion) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={handleLongPress}
        delayLongPress={400}>
        {card}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onLongPress={handleLongPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      delayLongPress={400}>
      <MotiView
        animate={{scale: pressed ? 0.98 : 1}}
        transition={motion.press}>
        {card}
      </MotiView>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  glass: {
    marginBottom: 0,
  },
  card: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  ingredients: {
    gap: 2,
  },
});
