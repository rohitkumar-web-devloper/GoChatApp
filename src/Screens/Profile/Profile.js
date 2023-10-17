// eslint-disable-next-line react-native/split-platform-components
import { View, Text, SafeAreaView, StatusBar, ScrollView, Dimensions, TouchableOpacity, Image, ToastAndroid, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { White, Black, DGray } from '../../Styles/Color';
import MainStyle from '../../Styles/MainStyle';
import ImagePath from '../../Constant/ImagePath';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { $crud } from '../../CRUDFactory/Crud';
import NavigationStrings from '../../Constant/NavigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  const theme = useSelector((state) => state.theme.theme);
  const Navigation = useNavigation();
  const { height } = Dimensions.get('window');
  const [userData, setUserData] = useState();
  const User = async () => {
    $crud
      .retrieve('/retrieve/login-user', { hello: 'fdsdfd' })
      .then((result) => {
        setUserData(result.data);
      })
      .catch((err) => {
        Alert.alert(err.messaage);
      });
  };
  const Logout = async () => {
    $crud.delete(`/delete/logout`).then((response) => {
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      if (response.type == 'success') {
        Navigation.navigate(NavigationStrings.LOGIN);
        AsyncStorage.removeItem("userData")
      }
    })
      .catch((error) => {
        Alert.alert(error);
      });
    console.log("hello")
  };
  useEffect(() => {
    User();
  }, []);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={theme == 'dark' ? Black : White} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <View style={{ height: height, backgroundColor: theme == 'dark' ? Black : White, }} >
          <View style={{ width: '100%', height: scale(250) }}>
            <TouchableOpacity style={{ padding: verticalScale(10), width: scale(50), position: 'absolute', zIndex: 10, }}
              onPress={() => { Navigation.goBack(); }}  >
              {theme == 'dark' ? <ImagePath.BackArrowsWhite /> : <ImagePath.BackArrow />}
            </TouchableOpacity>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1682686578842-00ba49b0a71a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <View style={{ marginTop: moderateScale(-55) }}>
            <View style={MainStyle.flexDesignColumn}>
              <View style={{ width: scale(120), height: scale(120), borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: scale(100), }} >
                <Image source={{ uri: userData?.photoUrl }} style={{ width: scale(110), height: scale(110), borderRadius: scale(100), }} />
              </View>
              <Text style={{ color: theme == 'dark' ? White : Black, fontSize: scale(20), fontFamily: 'Inter-Bold', marginTop: moderateScale(10), }}   >
                {userData?.fullName}
              </Text>
            </View>
            <View style={[MainStyle.flexDesignRow, { gap: scale(20), marginTop: moderateScale(10) }]}>
              <View style={MainStyle.flexDesignColumn}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: scale(13), color: theme == 'dark' ? White : DGray, }} >
                  Followers
                </Text>
                {
                  userData != undefined ?
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: scale(13), color: theme == 'dark' ? White : DGray, }} >{JSON.parse(userData?.followData.follower).length}</Text>
                    :
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: scale(13), color: theme == 'dark' ? White : DGray, }} >0</Text>
                }

              </View>
              <View style={MainStyle.flexDesignColumn}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: scale(13), color: theme == 'dark' ? White : DGray, }} >
                  Following
                </Text>
                {
                  userData != undefined ?
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: scale(13), color: theme == 'dark' ? White : DGray, }} >{JSON.parse(userData?.followData.following).length}</Text>
                    :
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: scale(13), color: theme == 'dark' ? White : DGray, }} >0</Text>
                }
              </View>
            </View>
          </View>
          <View style={{ width: '100%', position: 'absolute', bottom: scale(20), alignItems: 'center', }}>
            <TouchableOpacity style={{ padding: scale(12), borderWidth: scale(2), borderColor: theme == 'dark' ? DGray : DGray, borderRadius: 5, width: '90%', alignItems: 'center', }}
              onPress={() => { Logout() }}  >
              <Text style={{ fontSize: scale(15), fontFamily: 'Inter-Bold', color: DGray, }} >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
