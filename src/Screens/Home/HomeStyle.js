import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Black, White} from '../../Styles/Color';
const HomeStyle = StyleSheet.create({
  TopHeadline: {
    color: White,
    fontSize: scale(20),
    fontWeight: 500,
  },
  userName: {
    fontSize: 18,
    fontWeight: 500,
    color: Black,
  },
  messageSeenTime: {
    fontSize: 15,
    fontWeight: 500,
  },
  unseenMessageNumber: {
    fontSize: scale(12),
    fontWeight: 500,
    color: White,
  },
  storyWrapper:{
    marginHorizontal: scale(5),
    width: scale(60),
    height: scale(60),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default HomeStyle;
