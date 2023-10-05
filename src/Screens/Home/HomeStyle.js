import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Black, White} from '../../Styles/Color';
const HomeStyle = StyleSheet.create({
  TopHeadline: {
    color: White,
    fontSize: scale(20),
    fontWeight: '500',
  },
  messageSeenTime: {
    fontSize: 15,
    fontWeight: '500',
  },
  storyWrapper: {
    alignItems: 'center',
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    height: scale(60),
    justifyContent: 'center',
    marginHorizontal: scale(5),
    width: scale(60),
  },
  unseenMessageNumber: {
    color: White,
    fontSize: scale(12),
    fontWeight: '500',
  },
  userName: {
    color: Black,
    fontSize: 18,
    fontWeight: '500',
  },
});
export default HomeStyle;
