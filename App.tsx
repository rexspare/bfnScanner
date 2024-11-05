import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import Root from './src/navigation/root';
import { appStateSelectors, useApp } from './src/states/app';
import { getItem } from './src/services/asyncStorage';
import { ASYNC_KEYS, DEVICE_ID, MENDANT, WEB_SERVICE } from './src/assets/constants';


const App = () => {
  const setWebService = useApp(appStateSelectors.setWebService)
  const setMendant = useApp(appStateSelectors.setMendant)
  const setDeviceId = useApp(appStateSelectors.setDeviceId)

  const getInitialData = async () => {
    try {
      const webSericeVal = await getItem(ASYNC_KEYS.WEB_SERVICE, WEB_SERVICE)
      const mendantVal = await getItem(ASYNC_KEYS.MENDANT, MENDANT)
      const deviceIdVal = await getItem(ASYNC_KEYS.DEVICE_ID, DEVICE_ID)

      console.log({
        APP:true,
        webSericeVal,
        mendantVal,
        deviceIdVal
      });
      

      setWebService(webSericeVal)
      setMendant(mendantVal)
      setDeviceId(deviceIdVal)
    } catch (error) {

    }
  }

  useEffect(() => {
    getInitialData()
  }, [])



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