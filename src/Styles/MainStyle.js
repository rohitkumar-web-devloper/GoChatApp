import { StyleSheet, useColorScheme } from 'react-native'
import React, { useEffect } from 'react';
import { Black, DGray, Gray, Green, LGray, White } from './Color'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
let theme;
const RoColor = () => {
    theme = useSelector((state) => state.theme.theme)
}
console.log(theme)
export default MainStyle = StyleSheet.create({
    flexDesignRow: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center"
    },
    flexDesignColumn: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    MainWrapper: {
        backgroundColor: "white",
        flex: 1,
        padding: moderateScale(20)
    },
    MainButton: {
        width: "100%",
        backgroundColor: Green,
        padding: moderateScale(12),
        alignItems: 'center',
        borderRadius: scale(10),
        marginBottom: moderateVerticalScale(5)
    },
    MainButtonText: {
        color: "white",
        fontSize: scale(18),
        fontFamily: "Inter-Bold"
    },
    forgetButtonText: {
        fontSize: scale(1.7),
        fontWeight: 700,
        color: Green,
        textAlign: "center"
    },
    input: {
        width: "100%",
        paddingVertical: moderateScale(15),
        paddingLeft: moderateScale(60),
        borderRadius: 5,
        borderColor: DGray,
        fontSize: scale(12),
        marginBottom: verticalScale(20),
        backgroundColor: LGray,
        marginTop: moderateScale(5)

    },
    inputLabel: {
        fontSize: 17,
        fontFamily: "Inter-Bold",
        color: Green,
        marginLeft: scale(5)
    },
    showButton: {
        width: scale(40),
        height: scale(10),
        backgroundColor: Gray,
        borderRadius: scale(20)
    }
})