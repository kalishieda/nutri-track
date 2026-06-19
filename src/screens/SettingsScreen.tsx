import React, {useEffect, useState} from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FormModal} from '../components/FormModal';
import {LiquidGlass} from '../components/LiquidGlass';
import {useNutri} from '../context/NutriContext';
import {UserProfile} from '../types/nutri';
import {getInitials} from '../utils/date';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

type EditConfig = {
  title: string;
  field: keyof UserProfile;
  label: string;
  suffix?: string;
};

const EDITABLE_FIELDS: EditConfig[] = [
  {title: 'EDIT NAME', field: 'name', label: 'Full name'},
  {title: 'EDIT WEIGHT', field: 'weightKg', label: 'Weight (kg)', suffix: ' kg'},
  {title: 'EDIT HEIGHT', field: 'heightCm', label: 'Height (cm)', suffix: ' cm'},
  {
    title: 'DAILY CALORIES',
    field: 'dailyCalorieGoal',
    label: 'Calorie goal (kcal)',
    suffix: ' kcal',
  },
  {
    title: 'PROTEIN GOAL',
    field: 'proteinGoal',
    label: 'Protein goal (g)',
    suffix: 'g',
  },
];

function Toggle({enabled, onToggle}: {enabled: boolean; onToggle: () => void}) {
  return (
    <Pressable onPress={onToggle}>
      <View
        style={[
          styles.toggleTrack,
          {backgroundColor: enabled ? colors.primary : colors.progressTrack},
        ]}>
        <View
          style={[
            styles.toggleThumb,
            {transform: [{translateX: enabled ? 20 : 2}]},
          ]}
        />
      </View>
    </Pressable>
  );
}

function SettingRow({
  label,
  value,
  onPress,
  toggle,
  onToggle,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
  toggle?: boolean;
  onToggle?: () => void;
}) {
  const content = (
    <LiquidGlass animate={false}>
      <View style={styles.row}>
        <Text style={typography.mealTitle}>{label}</Text>
        {toggle !== undefined && onToggle ? (
          <Toggle enabled={toggle} onToggle={onToggle} />
        ) : (
          <View style={styles.rowRight}>
            {value && (
              <Text style={typography.mealIngredient}>{value}</Text>
            )}
            {onPress && <Text style={styles.chevron}>›</Text>}
          </View>
        )}
      </View>
    </LiquidGlass>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

export function SettingsScreen() {
  const {profile, preferences, updateProfile, setPreference} = useNutri();
  const [editConfig, setEditConfig] = useState<EditConfig | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (!editConfig) {
      return;
    }
    const current = profile[editConfig.field];
    setEditValue(String(current));
  }, [editConfig, profile]);

  const openEdit = (config: EditConfig) => {
    setEditConfig(config);
  };

  const closeEdit = () => {
    setEditConfig(null);
    setEditValue('');
  };

  const saveEdit = () => {
    if (!editConfig) {
      return;
    }

    if (editConfig.field === 'name') {
      if (!editValue.trim()) {
        Alert.alert('Invalid name', 'Name cannot be empty.');
        return;
      }
      updateProfile({name: editValue.trim()});
      closeEdit();
      return;
    }

    const parsed = Number(editValue);
    if (!parsed || parsed <= 0) {
      Alert.alert('Invalid value', 'Enter a valid number.');
      return;
    }

    updateProfile({[editConfig.field]: parsed} as Partial<UserProfile>);
    closeEdit();
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <LiquidGlass strong animate={false}>
          <View style={styles.profile}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(profile.name)}</Text>
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={typography.mealIngredient}>
              {profile.weightKg} kg · {profile.heightCm} cm
            </Text>
          </View>
        </LiquidGlass>

        <Text style={[typography.sectionTitle, styles.sectionTitle]}>
          PROFILE
        </Text>
        <View style={styles.section}>
          <SettingRow
            label="Name"
            value={profile.name}
            onPress={() => openEdit(EDITABLE_FIELDS[0])}
          />
          <SettingRow
            label="Weight"
            value={`${profile.weightKg} kg`}
            onPress={() => openEdit(EDITABLE_FIELDS[1])}
          />
          <SettingRow
            label="Height"
            value={`${profile.heightCm} cm`}
            onPress={() => openEdit(EDITABLE_FIELDS[2])}
          />
        </View>

        <Text style={[typography.sectionTitle, styles.sectionTitle]}>
          GOALS
        </Text>
        <View style={styles.section}>
          <SettingRow
            label="Daily Calories"
            value={`${profile.dailyCalorieGoal} kcal`}
            onPress={() => openEdit(EDITABLE_FIELDS[3])}
          />
          <SettingRow
            label="Protein Goal"
            value={`${profile.proteinGoal}g`}
            onPress={() => openEdit(EDITABLE_FIELDS[4])}
          />
          <SettingRow
            label="Water Reminder"
            toggle={preferences.waterReminder}
            onToggle={() =>
              setPreference('waterReminder', !preferences.waterReminder)
            }
          />
        </View>

        <Text style={[typography.sectionTitle, styles.sectionTitle]}>
          PREFERENCES
        </Text>
        <View style={styles.section}>
          <SettingRow
            label="Push Notifications"
            toggle={preferences.notifications}
            onToggle={() =>
              setPreference('notifications', !preferences.notifications)
            }
          />
          <SettingRow
            label="Dark Mode"
            toggle={preferences.darkMode}
            onToggle={() => setPreference('darkMode', !preferences.darkMode)}
          />
          <SettingRow label="Units" value="Metric" />
        </View>
      </ScrollView>

      {editConfig && (
        <FormModal
          visible
          title={editConfig.title}
          fields={[
            {
              key: editConfig.field,
              label: editConfig.label,
              value: editValue,
              keyboardType:
                editConfig.field === 'name' ? 'default' : 'numeric',
            },
          ]}
          onChange={(_, value) => setEditValue(value)}
          onSubmit={saveEdit}
          onClose={closeEdit}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  profile: {
    padding: 24,
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    elevation: 2,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 8,
  },
  section: {
    gap: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chevron: {
    fontSize: 22,
    color: colors.textMuted,
    fontWeight: '300',
  },
  toggleTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
    elevation: 2,
  },
});
