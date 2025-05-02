/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {
  ActivityIndicator,
  MD2Colors,
  MD3Colors,
  Icon,
} from 'react-native-paper';
import PaperUI from './src/ui/PaperUI';
function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <PaperUI/>
    </PaperProvider>
  );
}

export default App;
