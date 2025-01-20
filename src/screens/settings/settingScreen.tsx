import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Modal, Alert, Switch } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { COLORS, hp } from '../../assets/stylesGuide';
import { InitialNavigationStackParamList } from '../../navigation/root';
import styles from './styles.setting';
import { ASYNC_KEYS, WEB_SERVICE } from '../../assets/constants';
import { appStateSelectors, useApp } from '../../states/app';
import Layout from '../../components/layout';
import PrimaryInput from '../../components/primaryInput';
import { getItem, setItem } from '../../services/asyncStorage';


const SettingScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<InitialNavigationStackParamList>>();
  const webService = useApp(appStateSelectors.webService)
  const setWebService = useApp(appStateSelectors.setWebService)
  const mendant = useApp(appStateSelectors.mendant)
  const setMendant = useApp(appStateSelectors.setMendant)
  const deviceId = useApp(appStateSelectors.deviceId)
  const setDeviceId = useApp(appStateSelectors.setDeviceId)
  const downloadData = useApp(appStateSelectors.downloadData)
  const setDownloadData = useApp(appStateSelectors.setDownloadData)

  const [webServiceVal, setwebServiceVal] = useState(webService)
  const [mendantVal, setmendantVal] = useState(mendant)
  const [deviceIdVal, setdeviceIdVal] = useState(deviceId)
  const [modalVisible, setmodalVisible] = useState(false)
  const [password, setpassword] = useState("")
  const [passwordError, setpasswordError] = useState(false)
  const [updatedPassword, setupdatedPassword] = useState("")

  const handleCancel = () => {
    setmodalVisible(false)
    navigation.goBack()
  }

  const handleVerify = async () => {
    try {
      if (password) {
        const currentPassword = await getItem(ASYNC_KEYS.PASSWORD, '2110')
        if (password == currentPassword) {
          setpassword("")
          setpasswordError(false)
          setmodalVisible(false)
        } else {
          setpasswordError(true)
        }
      }
    } catch (error) {
      setpasswordError(true)
    }

  }

  const handleUpdatePassword = async () => {
    try {
      if (updatedPassword) {
        await setItem(ASYNC_KEYS.PASSWORD, updatedPassword)
        setupdatedPassword("")
        Alert.alert("Passwort erfolgreich aktualisiert")
      } else {
        Alert.alert("Das Passwort darf nicht leer sein")
      }
    } catch (error) {

    }
  }


  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        setmodalVisible(true)
      }, 100);
    })

    return subscribe
  }, [navigation])

  const handleUpdate = async () => {
    try {
      if (webServiceVal && mendantVal && deviceIdVal) {
        await setItem(ASYNC_KEYS.WEB_SERVICE, webServiceVal)
        setWebService(webServiceVal)
        await setItem(ASYNC_KEYS.MENDANT, mendantVal)
        setMendant(mendantVal)
        await setItem(ASYNC_KEYS.DEVICE_ID, deviceIdVal)
        setDeviceId(deviceIdVal)
        Alert.alert("Werte erfolgreich aktualisiert")
      } else {
        Alert.alert("Alle Felder sind Pflichtfelder")
      }
    } catch (error) {
      Alert.alert("lFehler beim Aktualisieren der Werte")
    }
  }

  const onToggleOfflineMode = async (val: boolean) => {
    try {
      setDownloadData(val)
      await setItem(ASYNC_KEYS.DOWNLOAD_DATA, val ? 'true' : 'false')
    } catch (error) {

    }
  }


  return (
    <>
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
            value={webServiceVal}
            onChange={(txt) => { setwebServiceVal(txt) }}
          />

          <PrimaryInput
            title="Mandant"
            value={mendantVal}
            onChange={(txt) => { setmendantVal(txt) }}
          />

          <PrimaryInput
            title="DeviceID"
            value={deviceIdVal}
            onChange={(txt) => { setdeviceIdVal(txt) }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleUpdate()}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Speichern</Text>


          </TouchableOpacity>


          <View style={{ marginTop: hp(3) }}></View>

          <PrimaryInput
            title="Update Passsword"
            value={updatedPassword}
            onChange={(txt) => { setupdatedPassword(txt) }}
            keyBoardType={'numeric'}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleUpdatePassword()}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Passwort aktualisieren</Text>


          </TouchableOpacity>

          <View style={{ marginTop: hp(3) }}></View>

          <View style={styles.switchRow}>
            <Text style={styles.switchTitle}>Download Data</Text>

            <Switch
              value={downloadData}
              onValueChange={(val) => onToggleOfflineMode(val)}
            />
          </View>

          <View style={{ marginTop: hp(3) }}></View>

        </Layout>

      </View>

      <Modal
        visible={modalVisible}
        onRequestClose={() => { }}
        transparent={true}
        style={{ flex: 1 }}
      >
        <View style={styles.modalMain}>

          <View style={styles.modalContainer}>
            <Text style={styles.passTxt}>Settings Password</Text>
            <PrimaryInput
              title="Password"
              value={password}
              onChange={(txt) => { setpassword(txt) }}
              keyBoardType={'numeric'}
              isPassword={true}
            />
            {passwordError && <Text style={styles.errorTxt}>Falsches Passwort</Text>}

            <View style={styles.row}>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleCancel()}
                style={[styles.btn2, {
                  backgroundColor: COLORS.DANGER,
                }]}
              >
                <Text style={styles.btnTxt}>Stornieren</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleVerify()}
                style={[styles.btn2, {
                  backgroundColor: COLORS.SUCCESS,
                }]}
              >
                <Text style={styles.btnTxt}>Verifizieren</Text>
              </TouchableOpacity>

            </View>


          </View>

        </View>
      </Modal>
    </>
  )
}

export default SettingScreen
