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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingTop: StatusBar.currentHeight,
    },
    logo: {
        width: hp(20),
        height: hp(20),
        resizeMode: 'contain',
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
        marginVertical: hp(4),
    },
    txt1: {
        color: COLORS.BLACK,
        fontSize: hp(2),
        marginTop: hp(3),
        textAlign: 'center',
        fontWeight: '500'
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
        marginTop: hp(6)
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