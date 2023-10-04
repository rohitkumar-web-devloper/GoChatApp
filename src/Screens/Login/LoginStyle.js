import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Black, DGray, Gray, LGray, White } from '../../Styles/Color';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useSelector, } from 'react-redux';
// const theme = useSelector((state) => state.theme.theme)
let theme;
const RoColor = () => {
  theme = useSelector((state) => state.theme.theme)
}

const LoginStyle = StyleSheet.create({
  Headline: {
    fontSize: scale(30),
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(50),
  },
  text: {
    width: responsiveWidth(70),
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: verticalScale(30),
    fontSize: responsiveFontSize(1.7),
    fontWeight: 500,
    color: DGray,
  },
  AuthButton: {
    width: "90%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: theme == "dark" ? Black : White,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: scale(10),
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
  },
  AuthButtonText: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: Black
  },
  ButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: moderateScale(30),
  },
  line: {
    width: '48%',
    height: scale(1),
    backgroundColor: DGray,
  },
});
export default LoginStyle;
