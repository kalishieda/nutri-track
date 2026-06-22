import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimatePresence, MotiView} from '../utils/moti';
import {fadeUp, motion} from '../utils/motion';
import {useMotion, useScreenTransitions} from '../utils/performance';

type AnimatedScreenProps = {
  screenKey: string;
  children: ReactNode;
};

export function AnimatedScreen({screenKey, children}: AnimatedScreenProps) {
  if (!useScreenTransitions || !useMotion) {
    return <View style={styles.screen}>{children}</View>;
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <MotiView
        key={screenKey}
        from={fadeUp.from}
        animate={fadeUp.animate}
        exit={{opacity: 0, translateY: -6}}
        transition={motion.screen}
        style={styles.screen}>
        {children}
      </MotiView>
    </AnimatePresence>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
