import {StyleSheet} from 'react-native';
import {DGray, Gray, Green, LGray} from './Color';
import {scale, verticalScale, moderateScale, moderateVerticalScale} from 'react-native-size-matters';
let MainStyle = StyleSheet.create({
  MainButton: {
    alignItems: 'center',
    backgroundColor: Green,
    borderRadius: scale(10),
    marginBottom: moderateVerticalScale(5),
    padding: moderateScale(12),
    width: '100%',
  },
  MainButtonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: scale(18),
  },
  MainWrapper: {
    backgroundColor: 'white',
    flex: 1,
    padding: moderateScale(20),
  },
  flexDesignColumn: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexDesignRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgetButtonText: {
    color: Green,
    fontSize: scale(1.7),
    fontWeight: 700,
    textAlign: 'center',
  },
  input: {
    backgroundColor: LGray,
    borderColor: DGray,
    borderRadius: 5,
    fontSize: scale(12),
    marginBottom: verticalScale(20),
    marginTop: moderateScale(5),
    paddingLeft: moderateScale(60),
    paddingVertical: moderateScale(15),
    width: '100%',
  },
  inputLabel: {
    color: Green,
    fontFamily: 'Inter-Bold',
    fontSize: 17,
    marginLeft: scale(5),
  },
  showButton: {
    backgroundColor: Gray,
    borderRadius: scale(20),
    height: scale(10),
    width: scale(40),
  },
});
export default MainStyle;
