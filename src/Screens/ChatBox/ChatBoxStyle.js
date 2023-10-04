import { StyleSheet } from 'react-native';
import { Black, Gray, LGray, White } from '../../Styles/Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import ChatBox from './ChatBox';

export default ChatBoxStyle = StyleSheet.create({
  name: {
    fontSize: scale(15),
    fontWeight: 600,
    color: Black,
  },
  Active: {
    fontSize: scale(12),
    fontWeight: 500,
    color: Gray,
  },
  messageStyle: {
    fontSize: 14,
    color: Black,
    fontWeight: 500,
    backgroundColor: LGray,
    paddingVertical: scale(10),
    paddingHorizontal: scale(8),
    borderRadius: scale(10),
    marginTop: verticalScale(10),
  }
});
