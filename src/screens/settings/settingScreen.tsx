import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS } from '../../assets/stylesGuide';
import { InitialNavigationStackParamList } from '../../navigation/root';
import styles from './styles.setting';
import { WEB_SERVICE } from '../../assets/constants';
import { appStateSelectors, useApp } from '../../states/app';
import Layout from '../../components/layout';
import PrimaryInput from '../../components/primaryInput';


const SettingScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<InitialNavigationStackParamList>>();

  const webService = useApp(appStateSelectors.webService)
  const setWebService = useApp(appStateSelectors.setWebService)
  const mendant = useApp(appStateSelectors.mendant)
  const setMendant = useApp(appStateSelectors.setMendant)
  const deviceId = useApp(appStateSelectors.deviceId)
  const setDeviceId = useApp(appStateSelectors.setDeviceId)

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name='angle-left' color={COLORS.WHITE} size={20} />
        </TouchableOpacity>
      </View>

      <Layout>
        <PrimaryInput
          title="WS_URL"
          value={webService}
          onChange={(txt) => { setWebService(txt) }}
        />

        <PrimaryInput
          title="Mandant"
          value={mendant}
          onChange={(txt) => { setMendant(txt) }}
        />

        <PrimaryInput
          title="DeviceID"
          value={deviceId}
          onChange={(txt) => { setDeviceId(txt) }}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.openDrawer()}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>Speichern</Text>


        </TouchableOpacity>
      </Layout>
    </View>
  )
}

export default SettingScreen
