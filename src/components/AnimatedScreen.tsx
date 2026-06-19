import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {AnimatePresence, MotiView} from 'moti';
import {fadeUp, motion} from '../utils/motion';
import {useMotion} from '../utils/performance';

type AnimatedScreenProps = {
  screenKey: string;
  children: ReactNode;
};

export function AnimatedScreen({screenKey, children}: AnimatedScreenProps) {
  if (!useMotion) {
    return <>{children}</>;
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
