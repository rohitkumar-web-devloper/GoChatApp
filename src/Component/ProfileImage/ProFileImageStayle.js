import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Black, White} from '../../Styles/Color';
const ProfileImageStyle = StyleSheet.create({
  profileWrapper: {
    width: scale(52),
    height: scale(52),
    overflow: 'hidden',
    borderRadius: scale(50),
    borderWidth: scale(0.6),
    borderColor: White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileImage: {
    width: "100%",
    height: "100%",
    borderRadius: scale(50),
  },
});
export default ProfileImageStyle;
