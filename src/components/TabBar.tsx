import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LiquidGlass} from './LiquidGlass';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

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

export const TabBar = React.memo(function TabBar({
  activeTab,
  onTabPress,
}: TabBarProps) {
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
              <Text
                style={isActive ? typography.tabActive : typography.tabInactive}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.indicator} />}
            </Pressable>
          );
        })}
      </View>
    </LiquidGlass>
  );
});

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
