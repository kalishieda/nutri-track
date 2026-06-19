import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {LiquidGlass} from './LiquidGlass';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

export type FormField = {
  key: string;
  label: string;
  value: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  multiline?: boolean;
};

type FormModalProps = {
  visible: boolean;
  title: string;
  fields: FormField[];
  submitLabel?: string;
  destructiveLabel?: string;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  onDestructive?: () => void;
};

export function FormModal({
  visible,
  title,
  fields,
  submitLabel = 'Save',
  destructiveLabel,
  onChange,
  onSubmit,
  onClose,
  onDestructive,
}: FormModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <LiquidGlass strong animate={false}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.content}>
              <Text style={styles.title}>{title}</Text>
              {fields.map(field => (
                <View key={field.key} style={styles.field}>
                  <Text style={styles.label}>{field.label}</Text>
                  <TextInput
                    style={[
                      styles.input,
                      field.multiline && styles.inputMultiline,
                    ]}
                    value={field.value}
                    placeholder={field.placeholder}
                    placeholderTextColor={colors.textMuted}
                    keyboardType={field.keyboardType ?? 'default'}
                    multiline={field.multiline}
                    onChangeText={value => onChange(field.key, value)}
                  />
                </View>
              ))}
              <View style={styles.actions}>
                <Pressable style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.submitButton} onPress={onSubmit}>
                  <Text style={styles.submitText}>{submitLabel}</Text>
                </Pressable>
              </View>
              {onDestructive && destructiveLabel && (
                <Pressable style={styles.deleteButton} onPress={onDestructive}>
                  <Text style={styles.deleteText}>{destructiveLabel}</Text>
                </Pressable>
              )}
            </ScrollView>
          </LiquidGlass>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,46,26,0.45)',
  },
  sheet: {
    maxHeight: '85%',
  },
  content: {
    padding: 20,
    gap: 14,
  },
  title: {
    ...typography.sectionTitle,
    textAlign: 'center',
    marginBottom: 4,
  },
  field: {
    gap: 6,
  },
  label: {
    ...typography.macroLabel,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  inputMultiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  submitText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  deleteButton: {
    marginTop: 4,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  deleteText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.danger,
  },
});
