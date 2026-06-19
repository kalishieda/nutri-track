import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MotiView} from 'moti';
import {LiquidGlass} from './LiquidGlass';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {motion} from '../utils/motion';
import {useMotion} from '../utils/performance';

export type TabId = 'today' | 'history' | 'foods' | 'settings';

type TabBarProps = {
  activeTab: TabId;
  onTabPress: (tab: TabId) => void;
};

const TABS: {id: TabId; label: string}[] = [
  {id: 'today', label: 'TODAY'},
  {id: 'history', label: 'HISTORY'},
  {id: 'foods', label: 'FOODS'},
  {id: 'settings', label: 'SETTINGS'},
];

export function TabBar({activeTab, onTabPress}: TabBarProps) {
  return (
    <LiquidGlass animate={false} style={styles.glass}>
      <View style={styles.container}>
        {TABS.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <Pressable
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(tab.id)}>
              {useMotion ? (
                <MotiView
                  animate={{
                    scale: isActive ? 1 : 0.96,
                    opacity: isActive ? 1 : 0.72,
                  }}
                  transition={motion.tab}>
                  <Text
                    style={
                      isActive ? typography.tabActive : typography.tabInactive
                    }>
                    {tab.label}
                  </Text>
                </MotiView>
              ) : (
                <Text
                  style={
                    isActive ? typography.tabActive : typography.tabInactive
                  }>
                  {tab.label}
                </Text>
              )}
              {isActive &&
                (useMotion ? (
                  <MotiView
                    from={{scaleX: 0, opacity: 0}}
                    animate={{scaleX: 1, opacity: 1}}
                    transition={motion.tab}
                    style={styles.indicator}
                  />
                ) : (
                  <View style={styles.indicator} />
                ))}
            </Pressable>
          );
        })}
      </View>
    </LiquidGlass>
  );
}

const styles = StyleSheet.create({
  glass: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    bottom: 4,
    left: '18%',
    right: '18%',
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
