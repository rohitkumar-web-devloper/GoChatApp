import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'
// import HumBuger from '../Images/HumBugerMenu.svg'
// import Cart from '../Images/Cart.svg'
// import SearchIcon from "../Images/Search.svg"
// import Notification from '../Images/Notification.svg'
// import { DBlue } from '../Style/Color'
import { useNavigation } from '@react-navigation/native'
// import Back from '../Images/BackArrow.svg'
import { moderateScale, scale } from 'react-native-size-matters'
import { useSelector, useDispatch } from 'react-redux'
import ImagePath from '../../Constant/ImagePath'
import { Black, White } from '../../Styles/Color'
import MainStyle from '../../Styles/MainStyle'
const Header = (props) => {
    const Navigation = useNavigation();
    let theme = useSelector((state) => state.theme.theme)
    return (
        <View style={[styles.Wrapper, { paddingHorizontal: moderateScale(10), zIndex: 11, }]}>
            <View style={[MainStyle.flexDesignRow, { gap: scale(10) }]}>
                <TouchableOpacity style={{ padding: scale(3) }} onPress={() => Navigation.goBack()}>
                    {
                        theme == "dark" ? <ImagePath.BackArrowsWhite /> : <ImagePath.BackArrow />

                    }
                </TouchableOpacity>
                <Text style={{ fontSize: scale(15), color: theme == "dark" ? White : Black, fontFamily: "Inter-Bold" }}>{props?.name}</Text>
            </View>
            <View style={[MainStyle.flexDesignRow]}>
                <TouchableOpacity style={{ padding: scale(3) }}>
                    {
                        theme == "dark" ? <ImagePath.NotificationWhite /> : <ImagePath.NotificationBlack />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: scale(3) }}>
                    <Image source={ImagePath.dot_1} style={{ tintColor: theme == "dark" ? White : Black }} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    Wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        shadowColor: '#000',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        backgroundColor: "red"
    },
    HeaderText: {
        fontFamily: "Raleway-Bold",
        fontSize: 23,
        fontWeight: 600,
    }
})