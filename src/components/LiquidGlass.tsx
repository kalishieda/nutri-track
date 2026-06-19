import React, {ReactNode} from 'react';
import {Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {MotiView} from 'moti';
import {colors} from '../theme/colors';
import {glass, glassCard, glassCardStrong} from '../theme/glass';
import {fadeUp, motion} from '../utils/motion';
import {useMotion, useNativeBlur, useStaggerAnimations} from '../utils/performance';

type LiquidGlassProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  strong?: boolean;
  delay?: number;
  animate?: boolean;
};

export const LiquidGlass = React.memo(function LiquidGlass({
  children,
  style,
  strong = false,
  delay = 0,
  animate = useStaggerAnimations,
}: LiquidGlassProps) {
  const cardStyle = strong ? glassCardStrong : glassCard;

  const content = (
    <View
      style={[
        cardStyle,
        Platform.OS === 'android' && styles.androidCard,
        styles.wrapper,
        style,
      ]}>
      {useNativeBlur && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={glass.blurType}
          blurAmount={strong ? glass.blurAmount + 8 : glass.blurAmount}
          reducedTransparencyFallbackColor={colors.glassSurfaceStrong}
        />
      )}
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.tint,
          strong ? styles.tintStrong : undefined,
          !useNativeBlur &&
            (strong ? styles.tintAndroidStrong : styles.tintAndroid),
        ]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          useNativeBlur ? styles.shine : styles.shineAndroid,
        ]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (!animate || !useMotion) {
    return content;
  }

  const transition =
    delay > 0 ? {...motion.enter, delay} : motion.enter;

  return (
    <MotiView
      from={
        Platform.OS === 'ios'
          ? {opacity: 0, scale: 0.96, translateY: 12}
          : fadeUp.from
      }
      animate={
        Platform.OS === 'ios'
          ? {opacity: 1, scale: 1, translateY: 0}
          : fadeUp.animate
      }
      transition={transition}>
      {content}
    </MotiView>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  androidCard: {
    elevation: 2,
    shadowOpacity: 0,
  },
  tint: {
    backgroundColor: colors.glassSurface,
  },
  tintStrong: {
    backgroundColor: colors.glassSurfaceStrong,
  },
  tintAndroid: {
    backgroundColor: 'rgba(255,255,255,0.78)',
  },
  tintAndroidStrong: {
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  shine: {
    backgroundColor: colors.liquidShine,
    opacity: 0.18,
    height: '45%',
    bottom: undefined,
  },
  shineAndroid: {
    backgroundColor: colors.liquidShine,
    opacity: 0.06,
    height: '40%',
    bottom: undefined,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
