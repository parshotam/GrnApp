/**
 * @format
 */
import * as React from 'react';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ff882e',
      accent: 'yellow',
      onPrimary: '#ff882e',
    surface: '#fff',
    onSurface: '#000',
    },
  };
  export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }
AppRegistry.registerComponent(appName, () => Main);
