import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import MainStyle from '../../Styles/MainStyle';
import {Black, Green, White} from '../../Styles/Color';
import ImagePath from '../../Constant/ImagePath';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import NavigationStrings from '../../Constant/NavigationStrings';
const TempScreen_3 = () => {
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={[MainStyle.MainWrapper, {backgroundColor: White, alignItems: 'center'}]}>
      <ImagePath.Splash_4 />
      <Text
        style={{
          fontFamily: 'Inter-Bold',
          fontSize: scale(20),
          alignSelf: 'center',
          width: '70%',
          color: Black,
          textAlign: 'center',
        }}
      >
        Chatboat will be ready to chat & make you happy
      </Text>

      <View
        style={{
          position: 'absolute',
          bottom: scale(100),
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <View style={[MainStyle.flexDesignRow, {justifyContent: 'flex-start', gap: scale(5)}]}>
          <View style={MainStyle.showButton}></View>
          <View style={MainStyle.showButton}></View>
          <View style={[MainStyle.showButton, {backgroundColor: Green}]}></View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Green,
            width: scale(50),
            height: scale(50),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(50),
          }}
          onPress={() => {
            Navigation.navigate(NavigationStrings.SPLASH_2);
          }}
        >
          <ImagePath.RightArrow />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TempScreen_3;
