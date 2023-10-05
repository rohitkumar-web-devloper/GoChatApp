import {StyleSheet} from 'react-native';
import {LGray} from '../../Styles/Color';
import {scale, moderateScale} from 'react-native-size-matters';

const userProfileStyle = StyleSheet.create({
  followButton: {
    alignItems: 'center',
    backgroundColor: LGray,
    borderRadius: scale(6),
    padding: moderateScale(10),
    width: '48%',
  },
  followText: {
    fontSize: scale(13),
    fontWeight: 500,
  },
  followWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  followcount: {
    fontSize: scale(15),
    fontWeight: 500,
    marginBottom: moderateScale(5),
  },
});
export default userProfileStyle;
