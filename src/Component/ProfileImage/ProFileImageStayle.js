import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {White} from '../../Styles/Color';
const ProfileImageStyle = StyleSheet.create({
  ProfileImage: {
    borderRadius: scale(50),
    height: '100%',
    width: '100%',
  },
  profileWrapper: {
    alignItems: 'center',
    borderColor: White,
    borderRadius: scale(50),
    borderWidth: scale(0.6),
    height: scale(52),
    justifyContent: 'center',
    overflow: 'hidden',
    width: scale(52),
  },
});
export default ProfileImageStyle;
