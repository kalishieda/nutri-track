import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LiquidGlass} from './LiquidGlass';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

type AddMealButtonProps = {
  onPress?: () => void;
};

export function AddMealButton({onPress}: AddMealButtonProps) {
  return (
    <LiquidGlass animate={false}>
      <Pressable style={styles.container} onPress={onPress}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>+</Text>
        </View>
        <Text style={typography.addMeal}>Add Meal</Text>
      </Pressable>
    </LiquidGlass>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  icon: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.white,
    lineHeight: 30,
  },
});
