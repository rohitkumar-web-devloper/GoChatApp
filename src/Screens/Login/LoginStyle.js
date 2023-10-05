import {StyleSheet} from 'react-native';
import {responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Black, DGray} from '../../Styles/Color';

const LoginStyle = StyleSheet.create({
  AuthButton: {
    alignItems: 'center',
    borderRadius: scale(10),
    borderWidth: 1,
    flexDirection: 'row',
    gap: scale(10),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
    width: '90%',
  },
  AuthButtonText: {
    color: Black,
    fontFamily: 'Inter-Regular',
    fontSize: 18,
  },
  ButtonWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginBottom: moderateScale(30),
  },
  Headline: {
    fontSize: scale(30),
    fontWeight: '700',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(50),
    textAlign: 'center',
  },
  line: {
    backgroundColor: DGray,
    height: scale(1),
    width: '48%',
  },
  text: {
    alignSelf: 'center',
    color: DGray,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '500',
    marginBottom: verticalScale(30),
    textAlign: 'center',
    width: responsiveWidth(70),
  },
});
export default LoginStyle;
