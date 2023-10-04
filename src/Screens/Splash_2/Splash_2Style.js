import { StyleSheet, useColorScheme } from 'react-native';
import { Gray, LGray, White } from '../../Styles/Color';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import React, { useEffect } from 'react';
export default Splash_2Styles = StyleSheet.create({
  heading: {
    fontSize: scale(65),
    fontWeight: 400,
    color: White,
  },
  title: {
    fontSize: scale(15),
    fontWeight: 400,
    color: LGray,
    marginBottom: verticalScale(30),
    marginTop: verticalScale(5),
  },
});
