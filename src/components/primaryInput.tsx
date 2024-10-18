import React, { ReactNode, useState } from 'react';
import { StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp } from '../assets/stylesGuide';
import If from './if';

interface primaryInputPros {
    title?: string | ReactNode;
    onChange?: (txt: any) => any;
    isPassword?: Boolean;
    containerStyles?: ViewStyle;
    inputStyles?: any;
    inputContainer?: ViewStyle;
    value?: any;
    keyBoardType?: any;
    titleStyles?: TextStyle;
    editable?: boolean;
    hideTitle?: boolean;
    iconName?: string;
    multiline?: boolean;
    renderRightIcon?: any;
    renderLeftIcon?: any;
    placeholder?: string;
    isError?: boolean;
    inputRef?: any;
    maxLength?: number;
    onFocus?: () => {};
    onPressRightIcon?: () => void;
    showPasswordStrenght?: boolean;
}

const PrimaryInput: React.FC<primaryInputPros> = (props) => {
    const {
        onPressRightIcon = () => { },
        title = 'title',
        onChange = () => { },
        isPassword = false,
        value = 'value',
        keyBoardType = 'default',
        editable = true,
        titleStyles = {},
        placeholder,
        multiline = false
    } = props
    const [isSecureTextEntry, setisSecureTextEntry] = useState<boolean>(true)
    const [isFocused, setisFocused] = useState<boolean>(false)


    return (
        <View style={[styles.main, props.containerStyles]}>
            <If condition={props.hideTitle != true}>
                <View style={styles.titleContainer}>
                    <Text style={{
                        ...styles.title,
                        ...{ marginTop: props.showPasswordStrenght == true ? 0 : hp(1) },
                        ...titleStyles
                    }}>{title}</Text>

                </View>
            </If>
            {/* TEXT INPUT */}
            <View style={[styles.container,
            {
                paddingLeft: props?.renderLeftIcon ? 10 : 0
            },
            props.inputContainer
            ]}>

                <If condition={props.renderLeftIcon != undefined}>
                    {props?.renderLeftIcon}
                </If>

                <TextInput
                    ref={props.inputRef}
                    style={[
                        styles.input,
                        props.inputStyles,
                        multiline == true ? { textAlignVertical: 'top' } : {}
                    ]}
                    value={value || ""}
                    secureTextEntry={props?.renderRightIcon ? false : props?.iconName ? false : isPassword == true ? isSecureTextEntry : false}
                    onChangeText={(txt) => onChange(txt)}
                    onEndEditing={(e) => console.log(e.nativeEvent.text)}
                    keyboardType={keyBoardType}
                    editable={editable}
                    placeholder={placeholder || ""}
                    placeholderTextColor={COLORS.BORDER_GREY}
                    multiline={multiline == true ? true : false}
                    onFocus={() => setisFocused(true)}
                    onBlur={() => setisFocused(false)}
                    {...props}
                />

                <If condition={isPassword == true}>
                    <TouchableOpacity style={styles.eyeBtn}
                        activeOpacity={0.8}
                        onPress={() => props?.renderRightIcon ? onPressRightIcon() : setisSecureTextEntry(!isSecureTextEntry)}
                    >
                        {
                            props?.renderRightIcon ?
                                props?.renderRightIcon :
                                <Feather
                                    name={props?.iconName ? props?.iconName : isSecureTextEntry ? 'eye' : 'eye-off'}
                                    color={COLORS.BLACK}
                                    size={hp(2)} />

                        }
                    </TouchableOpacity>

                </If>

            </View>
        </View>
    )
}

export default React.memo(PrimaryInput)

const styles = StyleSheet.create({
    main: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: hp(1),
        backgroundColor: COLORS.BACKGROUND,
    },
    title: {
        marginBottom: 5,
        textAlign: 'left',
        fontSize: FONT_SIZE._16,
        fontWeight: '500',
        color: COLORS.BLACK
    },
    container: {
        flexDirection: 'row',
        borderRadius: hp(0.9),
        alignItems: 'center',
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor: "rgba(232, 236, 244, 1)"
    },
    input: {
        flex: 1,
        height: hp(6),
        paddingHorizontal: 10,
        fontSize: FONT_SIZE._14,
        fontFamily: FONTS.REGULAR,
        color: COLORS.BLACK
    },
    eyeBtn: {
        ...COMMON_STYLES.center_,
        paddingHorizontal: 10
    },
    titleContainer: {
        ...COMMON_STYLES.flexRowSpaceBetween
    },
    strengthContainer: {
        flexDirection: 'row',
    },
    strength: {
        width: 25,
        height: 4,
        marginLeft: 4,
        borderRadius: 10,
    }
})