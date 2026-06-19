import {NativeModules, TurboModuleRegistry} from 'react-native';

const memoryStore = new Map<string, string>();

type AsyncStorageModule = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
};

let cachedModule: AsyncStorageModule | null | undefined;

function hasAsyncStorageNative(): boolean {
  if (TurboModuleRegistry) {
    return Boolean(
      TurboModuleRegistry.get('RNCAsyncStorage') ||
        TurboModuleRegistry.get('RNC_AsyncSQLiteDBStorage'),
    );
  }

  return Boolean(
    NativeModules.RNCAsyncStorage || NativeModules.RNC_AsyncSQLiteDBStorage,
  );
}

function getAsyncStorageModule(): AsyncStorageModule | null {
  if (cachedModule !== undefined) {
    return cachedModule;
  }

  if (!hasAsyncStorageNative()) {
    cachedModule = null;
    return null;
  }

  try {
    // Only require when the native module is linked (avoids import-time crash).
    cachedModule =
      require('@react-native-async-storage/async-storage').default;
  } catch {
    cachedModule = null;
  }

  return cachedModule;
}

export async function readStorage(key: string): Promise<string | null> {
  const storage = getAsyncStorageModule();
  if (!storage) {
    return memoryStore.get(key) ?? null;
  }

  try {
    return await storage.getItem(key);
  } catch {
    cachedModule = null;
    return memoryStore.get(key) ?? null;
  }
}

export async function writeStorage(key: string, value: string): Promise<void> {
  const storage = getAsyncStorageModule();
  if (!storage) {
    memoryStore.set(key, value);
    return;
  }

  try {
    await storage.setItem(key, value);
  } catch {
    cachedModule = null;
    memoryStore.set(key, value);
  }
}

export function isPersistentStorageAvailable(): boolean {
  return hasAsyncStorageNative();
}
