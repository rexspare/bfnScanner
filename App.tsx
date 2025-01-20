import React, { useEffect, useState } from 'react';
import { Image, LogBox, StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Root from './src/navigation/root';
import { appStateSelectors, useApp } from './src/states/app';
import { getItem } from './src/services/asyncStorage';
import { ASYNC_KEYS, DEVICE_ID, MENDANT, WEB_SERVICE } from './src/assets/constants';
import { COLORS, hp } from './src/assets/stylesGuide';


const App = () => {
  const setWebService = useApp(appStateSelectors.setWebService)
  const setMendant = useApp(appStateSelectors.setMendant)
  const setDeviceId = useApp(appStateSelectors.setDeviceId)
  const setDownloadData = useApp(appStateSelectors.setDownloadData)
  const [appReady, setappReady] = useState(false)

  const getInitialData = async () => {
    try {
      const webSericeVal = await getItem(ASYNC_KEYS.WEB_SERVICE, WEB_SERVICE)
      const mendantVal = await getItem(ASYNC_KEYS.MENDANT, MENDANT)
      const deviceIdVal = await getItem(ASYNC_KEYS.DEVICE_ID, DEVICE_ID)
      const downloadDataVal = await getItem(ASYNC_KEYS.DOWNLOAD_DATA, "true")

      setWebService(webSericeVal)
      setMendant(mendantVal)
      setDeviceId(deviceIdVal)
      setDownloadData(downloadDataVal == "true" ? true : false)
      setTimeout(() => {
        setappReady(true)
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setappReady(true)
      }, 1000);
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
      {
        appReady ?
          <Root />
          :
          <View style={{
            flex: 1,
            backgroundColor: COLORS.BACKGROUND,
            justifyContent: 'center',
            alignItems: 'center'
          }}>

            <Image
              source={require('./src/assets/images/logo.png')}
              style={{
                width: hp(30),
                height: hp(30),
                resizeMode: 'contain'
              }}
            />

          </View>
      }
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