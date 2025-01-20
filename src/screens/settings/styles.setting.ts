import { StyleSheet, StatusBar } from "react-native";
import { COLORS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";

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
        marginTop: hp(3),
        alignSelf: 'center'
    },
    btnTxt: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: '600'
    },
    modalMain: {
        flex: 1,
        backgroundColor: COLORS.BLACK_OPACITY5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        minHeight: 100,
        backgroundColor: COLORS.BACKGROUND,
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center'
    },
    passTxt: {
        color: COLORS.BLACK,
        fontWeight: '600',
        fontSize: 18
    },
    row: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",

    },
    btn2: {
        width: '48%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: hp(2),
        alignSelf: 'center'
    },
    btnTxt2: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: '600'
    },
    errorTxt: {
        color: COLORS.DANGER,
        fontSize: 12,
        textAlign: 'left'
    },
    switchRow: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    switchTitle: {
        textAlign: 'left',
        fontSize: FONT_SIZE._16,
        fontWeight: '500',
        color: COLORS.BLACK
    },

})

export default styles