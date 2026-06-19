import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MotiView} from '../utils/moti';
import {LiquidGlass} from './LiquidGlass';
import {typography} from '../theme/typography';
import {fadeUp, motion} from '../utils/motion';
import {useMotion} from '../utils/performance';

type LogFoodButtonProps = {
  onPress?: () => void;
};

export function LogFoodButton({onPress}: LogFoodButtonProps) {
  const button = (
    <LiquidGlass strong animate={false}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={typography.logFood}>LOG FOOD</Text>
      </Pressable>
    </LiquidGlass>
  );

  if (!useMotion) {
    return <View style={styles.wrapper}>{button}</View>;
  }

  return (
    <MotiView
      from={{...fadeUp.from, translateY: 24}}
      animate={fadeUp.animate}
      transition={{...motion.enter, delay: 200}}
      style={styles.wrapper}>
      {button}
    </MotiView>
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
