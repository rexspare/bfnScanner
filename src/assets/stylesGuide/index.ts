import { Dimensions, StyleSheet, Platform, PixelRatio } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

enum FONTS {
    THIN = "Inter-Thin",
    EXTRA_LIGHT = "Inter-ExtraLight",
    LIGHT = "Inter-Light",
    REGULAR = "Inter-Regular",
    MEDIUM = "Inter-Medium",
    SEMI_BOLD = "Inter-SemiBold",
    BOLD = "Inter-Bold",
    EXTRA_BOLD = "Inter-ExtraBold",
    BLACK = "Inter-Black",
}


enum SIZE {
    WIDTH = Dimensions.get('screen').width,
    HEIGHT = Dimensions.get('screen').height,
}

enum COLORS {
    PRIMARY = "#222223",
    SECONDARY = "#5C77DA",
    BACKGROUND = "#eeeeee",
    WHITE = "#FFFFFF",
    BLACK = "#000000",
    ANDROID_GREEN = "#319c94",
    BLACK_OPACITY = "rgba(0,0,0,0.25)",
    BLACK_OPACITY5 = "rgba(0,0,0,0.8)",
    DANGER = "#FF0000",
    RED_OPACITY = "rgba(171, 0, 0, 0.1)",
    SUCCESS = "#008001",
    BORDER_GREY = "#EDEDED",
    BUTTON = "#afafaf"
}


const COMMON_STYLES = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND
    },
    mainPad: {
        flex: 1,
        paddingHorizontal: '3%',
        backgroundColor: COLORS.BACKGROUND,
    },
    center_: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexRowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollPad: {
        paddingHorizontal: '5%'
    }
})

enum FONT_SIZE {
    _40 = hp(4.29) + 1,
    _36 = hp(3.86) + 1,
    _32 = hp(3.25) + 1,
    _30 = hp(3.1) + 1,
    _28 = hp(3) + 1,
    _26 = hp(2.78) + 1,
    _24 = hp(2.6) + 1,
    _23 = hp(2.46) + 1,
    _22 = hp(2.3) + 1,
    _20 = hp(2.14) + 1,
    _18 = hp(1.9) + 1,
    _17 = hp(1.75) + 1,
    _16 = hp(1.7) + 1,
    _15 = hp(1.6) + 1,
    _14 = hp(1.5) + 1,
    _13 = hp(1.39) + 1,
    _12 = hp(1.28) + 1,
    _11 = hp(1.1) + 1,
    _10 = hp(1) + 1,
    _8 = hp(0.96) + 1,
    _6 = hp(0.9) + 1,
}

// based on iphone 5s's scale
const scale = SIZE.WIDTH / 320;



export {
    FONTS,
    SIZE,
    COLORS,
    COMMON_STYLES,
    hp,
    wp,
    FONT_SIZE
}