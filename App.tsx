import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import Root from './src/navigation/root';


const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'} />
      <Root />
      <Toast />
    </>
  )
}

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native", // Ignore this specific warning
  "VirtualizedLists should never be nested", // Ignore this specific warning
  `Warning: Each child in a list should have a unique "key" prop.`
]);

export default App