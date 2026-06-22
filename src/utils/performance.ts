import {Platform} from 'react-native';

/** Blur nativo e pesado no Android/emulador. */
export const useNativeBlur = Platform.OS === 'ios';

/** Animacoes Moti (fade, scale) — so iOS; Android usa UI estatica. */
export const useMotion = Platform.OS === 'ios';

/** Transicao entre abas com AnimatePresence — so iOS. */
export const useScreenTransitions = Platform.OS === 'ios';

/** Stagger e spring pesado nos cards — so iOS. */
export const useStaggerAnimations = Platform.OS === 'ios';

/** @deprecated use useMotion */
export const useEntranceAnimations = useStaggerAnimations;
