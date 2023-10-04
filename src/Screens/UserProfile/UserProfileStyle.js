import { StyleSheet } from 'react-native';
import { Gray, LGray, White } from '../../Styles/Color';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default userProfileStyle = StyleSheet.create({
    followWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    followText: {
        fontSize: scale(13),
        fontWeight: 500
    },
    followcount: {
        fontSize: scale(15),
        fontWeight: 500,
        marginBottom: moderateScale(5)
    },
    followButton: {
        width: "48%",
        backgroundColor: LGray,
        alignItems: "center",
        padding: moderateScale(10),
        borderRadius: scale(6)
    }
});
