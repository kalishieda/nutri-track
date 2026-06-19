/**
 * Imports diretos do Moti — evita o barrel `moti` que puxa SafeAreaView
 * deprecado do react-native e dispara warning no console.
 */
export {View as MotiView} from 'moti/src/components/view';
export {Text as MotiText} from 'moti/src/components/text';
export {AnimatePresence} from 'moti/src/core';
