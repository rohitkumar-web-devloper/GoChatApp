import {StyleSheet} from 'react-native';
import {Black, Gray, LGray} from '../../Styles/Color';
import {scale, verticalScale} from 'react-native-size-matters';
const ChatBoxStyle = StyleSheet.create({
  Active: {
    color: Gray,
    fontSize: scale(12),
    fontWeight: '500',
  },
  messageStyle: {
    backgroundColor: LGray,
    borderRadius: scale(10),
    color: Black,
    fontSize: 14,
    fontWeight: '500',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(8),
    paddingVertical: scale(10),
  },
  name: {
    color: Black,
    fontSize: scale(15),
    fontWeight: '600',
  },
});
export default ChatBoxStyle;
