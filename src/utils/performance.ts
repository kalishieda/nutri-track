import {Platform} from 'react-native';

/** Blur nativo e pesado no Android/emulador. */
export const useNativeBlur = Platform.OS === 'ios';

/** Animacoes leves (fade, slide) em todas as plataformas. */
export const useMotion = true;

/** Stagger e spring pesado nos cards — so iOS. */
export const useStaggerAnimations = Platform.OS === 'ios';

/** @deprecated use useMotion */
export const useEntranceAnimations = useStaggerAnimations;
