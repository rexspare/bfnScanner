import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import styles from './styles.home'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { COLORS, hp, wp } from '../../assets/stylesGuide'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { InitialNavigationStackParamList } from '../../navigation/root'
import MaskedView from '@react-native-masked-view/masked-view';
import ZebraScanner from "@nextup/react-native-zebra-scanner";
import { useNetInfo } from "@react-native-community/netinfo";


const HomeScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<InitialNavigationStackParamList>>();
  const isConnected = useNetInfo().isConnected;
  const [isExit, setisExit] = useState(false)


  useEffect(() => {
  }, [])

  return (
    <View style={styles.main}>

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome6 name='ellipsis' color={COLORS.WHITE} size={20} />
        </TouchableOpacity>
      </View>

      {/* CONTEXT */}
      <View style={styles.context}>
        <Text style={styles.txt}>{isExit ? "AUSGANG" : "Eingang"}</Text>

        <View style={{
          width: '90%',
          height: "40%",
          backgroundColor: isConnected ? COLORS.WHITE : COLORS.YELLOW
        }}>

        </View>

        <Text style={styles.txt1}>BEN Access Control - GmbH</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.openDrawer()}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>{isExit ? "AUSGANG" : "Eingang"}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setisExit(!isExit)}
            style={[styles.absoluteContainer, (isExit && { backgroundColor: COLORS.DANGER })]}>
            <FontAwesome6 name='angles-up' color={COLORS.WHITE} size={30} />
          </TouchableOpacity>

        </TouchableOpacity>

      </View>
      {/* CONTEXT */}

      <View style={styles.footer}>
        <Text style={styles.txt2}>Clearing Hotline: 0151 / 10850215</Text>
      </View>
    </View>
  )
}

export default HomeScreen
