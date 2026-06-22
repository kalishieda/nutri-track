/**
 * NutriTrack - React Native App
 * @format
 */

import React, {useCallback, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {DashboardHeader} from './src/components/DashboardHeader';
import {LogFoodButton} from './src/components/LogFoodButton';
import {ScreenBackground} from './src/components/ScreenBackground';
import {TabBar, TabId} from './src/components/TabBar';
import {NutriProvider, useNutri} from './src/context/NutriContext';
import {FoodsScreen} from './src/screens/FoodsScreen';
import {HistoryScreen} from './src/screens/HistoryScreen';
import {SettingsScreen} from './src/screens/SettingsScreen';
import {TodayScreen} from './src/screens/TodayScreen';

const TodayDashboard = React.memo(function TodayDashboard() {
  const {todayEntries, profile} = useNutri();
  return <DashboardHeader todayEntries={todayEntries} profile={profile} />;
});

function TabPanel({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <View
      style={[styles.tabPanel, !visible && styles.tabPanelHidden]}
      pointerEvents={visible ? 'auto' : 'none'}
      collapsable={false}>
      {children}
    </View>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const [visitedTabs, setVisitedTabs] = useState<Set<TabId>>(
    () => new Set(['today']),
  );
  const [logFoodMode, setLogFoodMode] = useState(false);

  const handleTabPress = useCallback((tab: TabId) => {
    setVisitedTabs(prev => new Set(prev).add(tab));
    setActiveTab(tab);
    if (tab !== 'foods') {
      setLogFoodMode(false);
    }
  }, []);

  const handleLogFood = useCallback(() => {
    setVisitedTabs(prev => new Set(prev).add('foods'));
    setLogFoodMode(true);
    setActiveTab('foods');
  }, []);

  const showTodayChrome = activeTab === 'today';

  return (
    <ScreenBackground>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        {visitedTabs.has('today') && (
          <View
            style={!showTodayChrome && styles.hidden}
            pointerEvents={showTodayChrome ? 'auto' : 'none'}>
            <TodayDashboard />
          </View>
        )}
        <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
        <View style={styles.content}>
          {visitedTabs.has('today') && (
            <TabPanel visible={activeTab === 'today'}>
              <TodayScreen />
            </TabPanel>
          )}
          {visitedTabs.has('history') && (
            <TabPanel visible={activeTab === 'history'}>
              <HistoryScreen />
            </TabPanel>
          )}
          {visitedTabs.has('foods') && (
            <TabPanel visible={activeTab === 'foods'}>
              <FoodsScreen highlightLog={logFoodMode} />
            </TabPanel>
          )}
          {visitedTabs.has('settings') && (
            <TabPanel visible={activeTab === 'settings'}>
              <SettingsScreen />
            </TabPanel>
          )}
        </View>
        {showTodayChrome && <LogFoodButton onPress={handleLogFood} />}
      </SafeAreaView>
    </ScreenBackground>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <NutriProvider>
          <AppContent />
        </NutriProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  tabPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabPanelHidden: {
    opacity: 0,
    zIndex: -1,
  },
  hidden: {
    display: 'none',
  },
});

export default App;
