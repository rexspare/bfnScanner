import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import styles from './styles.home'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { COLORS, hp, wp } from '../../assets/stylesGuide'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { InitialNavigationStackParamList } from '../../navigation/root'
import MaskedView from '@react-native-masked-view/masked-view';
import ZebraScanner from "@nextup/react-native-zebra-scanner";
import { useNetInfo } from "@react-native-community/netinfo";
import Sound from 'react-native-sound';
import { appStateSelectors, useApp } from '../../states/app'
import useSyncData from '../../hooks/useSyncData'

Sound.setCategory('Playback');
const success = new Sound('success.mp3', Sound.MAIN_BUNDLE, (success) => {
  if (success) {
    console.log('failed to load the sound', success);
    return;
  }
});

const error = new Sound('error.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

let mode = 0;
var content = 'Scanner ready';
var backgroundColor = COLORS.WHITE;
var textColor = 'black';
var message_1 = '';
var message_2 = '';
var cC = false;
let richtungwechsel = 'Richtungswechsel';
let direction = '7.1';
let entrance = 'Handleser Name';
let gate = 'Eingang';
let desc1 = 'BFN Access Control';
let desc2 = 'GmbH ';
let exit = 'false';
let test = 'false';
let showDisplay = 'Main';
let device = '352714112750542';
let mandant = 'FCK';
let ownerVal = '';
let loading = false;

const HomeScreen = () => {

  const navigation = useNavigation<DrawerNavigationProp<InitialNavigationStackParamList>>();
  const webService = useApp(appStateSelectors.webService)
  const mendant = useApp(appStateSelectors.mendant)
  const deviceId = useApp(appStateSelectors.deviceId)
  const test = useSyncData(device, mandant, webService?.split('.net')[0] + '.net');

  const isConnected = useNetInfo().isConnected;
  const [lastScanned, setLastScanned] = useState('');
  const [isExit, setisExit] = useState(false)
  const isExitRef = useRef(false)
  const [state, setState] = useState<any>({
    device: deviceId,
    mandant: mendant,
    showDisplay: showDisplay,
    mode: mode,
    entranceName: entrance,
    gateName: gate,
    description1: desc1,
    description2: desc2,
    exitMode: exit,
    testMode: test,
    directionInfo: direction,
    entryexit: richtungwechsel,
    selectedOption: '',
    contentMain: content,
    message1: message_1,
    message2: message_2,
    displayColor: backgroundColor,
    fontColor: textColor,
    controlCard: cC,
    owner: ownerVal
  });

  const [settings, setsettings] = useState<any>({})


  useEffect(() => {
    ZebraScanner?.startReader();

    return () => {
      ZebraScanner?.stopReader();
    }
  }, []);

  useEffect(() => {
    ZebraScanner?.on('barcodeReadSuccess', event => {
      const code = event.data;
      setLastScanned(code);
    });
  }, [state.selectedOption]);

  const playSound = (name: any) => {
    name.play((success: any) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };


  const onError = () => {
    playSound(error);
    setLastScanned('');
    Alert.alert("Fehler", "Ungültige Daten angegeben")
    setState((prevState: any) => ({
      ...prevState,
      message1: "Ungültige Daten angegeben",
    }));

    setTimeout(() => {
      setState((prevState: any) => ({
        ...prevState,
        message1: message_1,
      }));
      setLastScanned('');
    }, 5000);
  }


  // ** This function is the function which call the backend api and check if the ticket is valid for the entrance
  const receiveEntryData = (props: any) => {
    if (isConnected) {
      fetch(webService + 'entry', {
        method: 'PUT',
        headers: {
          Authorization:
            'sYFnTORCM03hplg4O95c1Z5fvMFXJppLXByKkzwHjc3oEkMSpMxdnGuQbVTQ8OX5',
          'Content-Type': 'text/plain',
        },
        body: `{"barcode": "${props}","device":"${deviceId}","mandant": "${mendant}"}`,
      })
        .then((response) => response.json())
        .then((json) => {
          const content = JSON.stringify(json);
          let data = JSON.parse(content);

          console.log("ENTRY ==>>", data);




          if (!data?.TickArray?.item) {
            onError()
            return
          }

          let message1 = data.TickArray.item.message_1;
          let message2 = data.TickArray.item.message_2;
          let display_color = data.TickArray.item.display_color;
          let font_color = data.TickArray.item.font_color;
          let control_card = data.TickArray.item.controlcard;
          let owner = data.TickArray.item.owner;
          let status = data.TickArray.item.status;

          let number_of_remaining_entries = data.TickArray.item.number_of_remaining_entries;

          setState((prevState: any) => ({
            ...prevState,
            contentMain: content,
            message1: message1,
            message2: message2,
            displayColor: display_color,
            fontColor: font_color,
            controlCard: control_card,
            entryexit: 'Richtungswechsel',
            owner: owner
          }));

          if (display_color === 'yellow' || display_color === 'green') {
            playSound(success);
          } else {
            playSound(error);
          }

          if (state.selectedOption === 'option2') {
            test.updateNumberOfRemainingEntries({
              id: props,
              number_of_remaining_entries: number_of_remaining_entries
            })
          }

          setTimeout(() => {
            setState((prevState: any) => ({
              ...prevState,
              contentMain: <Text>Scanner ready</Text>,
              message1: message_1,
              message2: message_2,
              displayColor: backgroundColor,
              fontColor: textColor,
              controlCard: cC,
              entryexit: richtungwechsel,
              owner: ownerVal
            }));
            setLastScanned('');
          }, 5000);
        })
        .catch((_error) => {
          console.log('Error', _error);
          onError()
        });
    } else {
      console.log('Error');
      onError()
    }
  };

  // ** This function is the function which call the backend api and check if the ticket is valid for the exit
  const receiveExitData = (props: any) => {
    fetch(webService + 'exit', {
      method: 'PUT',
      headers: {
        Authorization:
          'sYFnTORCM03hplg4O95c1Z5fvMFXJppLXByKkzwHjc3oEkMSpMxdnGuQbVTQ8OX5',
        'Content-Type': 'text/plain',
      },
      body: `{"barcode": "${props}","device":"${deviceId}","mandant": "${mendant}"}`,
    })
      .then((response) => response.json())
      .then((json) => {
        content = JSON.stringify(json);
        let data = JSON.parse(content);

        console.log("EXIT ==>>", data);

        if (!data?.TickArray?.item) {
          onError()
          return
        }

        let message1 = data.TickArray.item.message_1;
        let message2 = data.TickArray.item.message_2;
        let display_color = data.TickArray.item.display_color;
        let font_color = data.TickArray.item.font_color;
        let control_card = data.TickArray.item.controlcard;
        let owner = data.TickArray.item.owner;
        let status = data.TickArray.item.status;

        setState((prevState: any) => ({
          ...prevState,
          contentMain: content,
          message1: message1,
          message2: message2,
          displayColor: display_color,
          fontColor: font_color,
          controlCard: control_card,
          entryexit: 'Richtungswechsel',
          owner: owner
        }));

        if (display_color === 'green') {
          playSound(success);
        } else {
          playSound(error);
        }

        setTimeout(() => {
          setState((prevState: any) => ({
            ...prevState,
            contentMain: <Text>Scanner ready</Text>,
            message1: message_1,
            message2: message_2,
            displayColor: backgroundColor,
            fontColor: textColor,
            controlCard: cC,
            entryexit: richtungwechsel,
            owner: ownerVal
          }));

          setLastScanned('');
        }, 5000);
      })
      .catch((_error) => {
        console.log('Error');
        onError()
      });
  };

  const receiveSettings = () => {

    fetch(webService + 'settings', {
      method: 'PUT',
      headers: {
        Authorization:
          'sYFnTORCM03hplg4O95c1Z5fvMFXJppLXByKkzwHjc3oEkMSpMxdnGuQbVTQ8OX5',
        'Content-Type': 'text/plain',
      },
      body: `{"device":"${deviceId}","mandant": "${mendant}"}`,
    })
      .then((response) => response.json())
      .then((json) => {
        content = JSON.stringify(json);
        let data = JSON.parse(content);


        if (!data?.ReaderArr?.item) {
          setsettings({})
          return
        }

        let entranceName = data.ReaderArr.item.entranceName;
        let gateName = data.ReaderArr.item.gatename;
        let description1 = data.ReaderArr.item.description1;
        let description2 = data.ReaderArr.item.description2;
        let exit = data.ReaderArr.item.exitMode;
        let test = data.ReaderArr.item.testMode;

        setsettings((prevState: any) => ({
          ...prevState,
          entranceName: entranceName,
          gateName: gateName,
          description1: description1,
          description2: description2,
          exitMode: exit,
          testMode: test,
        }));

      })
      .catch((error) => {
        console.log(error);
        setsettings({})
      });
  };


  const checkEntryExit = (props: any) => {

    if (isExitRef.current == false) {
      setState((prevState: any) => ({
        ...prevState,
        directionInfo: 'Eingang',
        exitMode: 'false',
      }));
      receiveEntryData(props);
    } else if (isExitRef.current == true) {
      setState((prevState: any) => ({
        ...prevState,
        directionInfo: 'Ausgang',
        exitMode: 'true',
      }));
      receiveExitData(props);
    }
  };

  const checkSettingCard = (props: any) => {
    if (props === '21212121') {
      setState((prevState: any) => ({ ...prevState, showDisplay: 'Settings' }));
    } else {
      checkEntryExit(props);
      setState((prevState: any) => ({ ...prevState, showDisplay: 'Main' }));
    }
  };

  const getInfo = useCallback((props: any) => {

    if (state.selectedOption === 'option2') {

      if (!isConnected) {
        const valid = test.checkData(props);

        if (valid) {
          setState((prevState: any) => ({
            ...prevState,
            contentMain: content,
            message1: 'Herzlich Willkommen',
            message2: 'Ticket bestätigt',
            displayColor: 'yellow',
            entryexit: 'Richtungswechsel',
          }));
          playSound(success);

        } else if (valid === null) {
          setState((prevState: any) => ({
            ...prevState,
            contentMain: content,
            message1: 'Doppelverwendung',
            displayColor: 'red',
            entryexit: 'Richtungswechsel',
          }));

          playSound(error);

        } else if (valid === undefined) {
          setState((prevState: any) => ({
            ...prevState,
            contentMain: content,
            message1: 'Karte unbekannt',
            displayColor: 'red',
            entryexit: 'Richtungswechsel',
          }));

          receiveSettings();
          checkSettingCard(props);
          playSound(error);
        }

        setTimeout(() => {
          setState((prevState: any) => ({
            ...prevState,
            contentMain: <Text>Scanner ready</Text>,
            message1: message_1,
            message2: message_2,
            displayColor: backgroundColor,
            fontColor: textColor,
            controlCard: cC,
            entryexit: richtungwechsel,
          }));
          setLastScanned('');
        }, 5000);

        return;
      } else {
        receiveSettings();
        checkSettingCard(props);

        return;
      }
    }
    receiveSettings();
    checkSettingCard(props);
  }, [state.selectedOption, state.mode, isConnected, webService, mendant, deviceId, isExit]);

  useEffect(() => {
    if (lastScanned !== '') {
      getInfo(lastScanned)
    }
  }, [lastScanned]);

  useEffect(() => {
    if (webService && deviceId && mendant) {
      receiveSettings()
    }
  }, [webService, deviceId, mendant])


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
        {/* <Text style={styles.txt}>{isExit ? "AUSGANG" : "Eingang"}</Text> */}
        <Text style={styles.txt}>{settings?.gateName ? settings?.gateName : isExit ? "AUSGANG" : "Eingang"}</Text>

        <View style={{
          width: '90%',
          height: "40%",
          backgroundColor: isConnected ? state.displayColor : COLORS.YELLOW,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: '5%'
        }}>

          {
            state.message1 == "" ?

              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
              />
              :
              <Text style={[styles.txt1, {
                color: state.displayColor == COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE,
                fontSize: hp(3)
              }]}>{`${state.message1}\n${state.message2}`}</Text>
          }


        </View>

        <Text style={[styles.txt1, {
          fontWeight: "400"
        }]}>BEN Access Control - GmbH</Text>

        {
          state.owner &&
          <Text style={[styles.txt1, {
            fontWeight: "400",
            marginTop: 0
          }]}>{state.owner}</Text>
        }

        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={() => {
          //   setLastScanned("2701010191003509002010122")
          // }}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>{isExit ? "AUSGANG" : "Eingang"}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setisExit((prev) => {
                isExitRef.current = !prev
                return !prev
              })

            }}
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
