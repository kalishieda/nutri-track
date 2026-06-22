import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../theme/colors';

type ScreenBackgroundProps = {
  children: ReactNode;
};

export function ScreenBackground({children}: ScreenBackgroundProps) {
  return (
    <View style={styles.container}>
      <View style={styles.baseGradient} />
      <View style={[styles.blob, styles.blobTop]} />
      <View style={[styles.blob, styles.blobBottom]} />
      <View style={[styles.blob, styles.blobCenter]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  baseGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blobTop: {
    width: 280,
    height: 280,
    top: -80,
    right: -60,
    backgroundColor: colors.primaryLight,
    opacity: 0.35,
  },
  blobBottom: {
    width: 220,
    height: 220,
    bottom: 120,
    left: -50,
    backgroundColor: colors.primary,
    opacity: 0.2,
  },
  blobCenter: {
    width: 180,
    height: 180,
    top: '40%',
    right: -40,
    backgroundColor: colors.backgroundDeep,
    opacity: 0.3,
  },
  content: {
    flex: 1,
  },
});
