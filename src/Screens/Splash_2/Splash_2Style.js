import {StyleSheet} from 'react-native';
import {LGray, White} from '../../Styles/Color';
import {scale, verticalScale} from 'react-native-size-matters';
const Splash_2Styles = StyleSheet.create({
  heading: {
    color: White,
    fontSize: scale(65),
    fontWeight: '400',
  },
  title: {
    color: LGray,
    fontSize: scale(15),
    fontWeight: '400',
    marginBottom: verticalScale(30),
    marginTop: verticalScale(5),
  },
});
export default Splash_2Styles;
