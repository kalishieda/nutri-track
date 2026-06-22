import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LiquidGlass} from './LiquidGlass';
import {typography} from '../theme/typography';

type LogFoodButtonProps = {
  onPress?: () => void;
};

export function LogFoodButton({onPress}: LogFoodButtonProps) {
  return (
    <View style={styles.wrapper}>
      <LiquidGlass strong animate={false}>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={typography.logFood}>LOG FOOD</Text>
        </Pressable>
      </LiquidGlass>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
