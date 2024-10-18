import { StatusBar, StyleSheet } from "react-native";
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
    context: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    footer: {
        height: 55,
        width: '100%',
        backgroundColor: COLORS.ANDROID_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: COLORS.BLACK,
        fontSize: hp(2.5),
        marginVertical: hp(4)
    },
    txt1: {
        color: COLORS.BLACK,
        fontSize: hp(2),
        marginVertical: hp(3)
    },
    txt2: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: '600'
    },
    btn: {
        width: '90%',
        height: 45,
        backgroundColor: COLORS.BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: hp(8)
    },
    btnTxt: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: '600'
    },
    absoluteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: COLORS.SUCCESS,
        position: 'absolute',
        right: -8
    }
})

export default styles