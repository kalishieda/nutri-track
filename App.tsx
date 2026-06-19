/**
 * NutriTrack - React Native App
 * @format
 */

import React, {useCallback, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AnimatedScreen} from './src/components/AnimatedScreen';
import {DashboardHeader} from './src/components/DashboardHeader';
import {LogFoodButton} from './src/components/LogFoodButton';
import {ScreenBackground} from './src/components/ScreenBackground';
import {TabBar, TabId} from './src/components/TabBar';
import {NutriProvider, useNutri} from './src/context/NutriContext';
import {FoodsScreen} from './src/screens/FoodsScreen';
import {HistoryScreen} from './src/screens/HistoryScreen';
import {SettingsScreen} from './src/screens/SettingsScreen';
import {TodayScreen} from './src/screens/TodayScreen';

function TodayDashboard() {
  const {todayEntries, profile} = useNutri();
  return <DashboardHeader todayEntries={todayEntries} profile={profile} />;
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

  return (
    <ScreenBackground>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        {activeTab === 'today' && <TodayDashboard />}
        <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
        <View style={styles.content}>
          <AnimatedScreen screenKey={activeTab}>
            {activeTab === 'today' && visitedTabs.has('today') && (
              <TodayScreen />
            )}
            {activeTab === 'history' && visitedTabs.has('history') && (
              <HistoryScreen />
            )}
            {activeTab === 'foods' && visitedTabs.has('foods') && (
              <FoodsScreen highlightLog={logFoodMode} />
            )}
            {activeTab === 'settings' && visitedTabs.has('settings') && (
              <SettingsScreen />
            )}
          </AnimatedScreen>
        </View>
        {activeTab === 'today' && <LogFoodButton onPress={handleLogFood} />}
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
  },
});

export default App;
