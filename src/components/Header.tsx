import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {typography} from '../theme/typography';

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={typography.logo}>NutriTrack</Text>
      <Text style={styles.leaf}>🌿</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 16,
  },
  leaf: {
    fontSize: 18,
  },
});
