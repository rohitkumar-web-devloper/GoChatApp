import { StyleSheet } from 'react-native';
import { Black, Gray, LGray } from '../../Styles/Color';
import { scale, verticalScale } from 'react-native-size-matters';
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
  ModalInnerWrapper: {
    backgroundColor: 'white',
    height: '60%',
    position: 'absolute',
    bottom: -10,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.24,
    shadowRadius: 14.86,
    elevation: 18,
  }
});
export default ChatBoxStyle;
