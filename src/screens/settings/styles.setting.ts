import { StyleSheet, StatusBar } from "react-native";
import { COLORS, hp, wp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND
    },
    header: {
        height: 50 + StatusBar?.currentHeight,
        width: '100%',
        backgroundColor: COLORS.ANDROID_GREEN,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: '5%',
        paddingTop: StatusBar.currentHeight
    },
    btn: {
        width: '90%',
        height: 45,
        backgroundColor: COLORS.BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: hp(5),
        alignSelf: 'center'
    },
    btnTxt: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: '600'
    },
})

export default styles