import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { SCREENS } from '../assets/constants';
import { HomeScreen, SettingScreen } from '../screens';


export type InitialNavigationStackParamList = {
    [SCREENS.MAIN]: undefined;
    [SCREENS.SETTING]: undefined;
};

const Drawer = createDrawerNavigator<InitialNavigationStackParamList>();




const Root = () => {
    return (
        <NavigationContainer  >
            <Drawer.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Drawer.Screen name={SCREENS.MAIN} component={HomeScreen} />
                <Drawer.Screen name={SCREENS.SETTING} component={SettingScreen} />

            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Root