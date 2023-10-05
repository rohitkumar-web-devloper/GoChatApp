import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Splash_2Style from './Splash_2Style';
import ImagePath from '../../Constant/ImagePath';
import LoginStyle from '../Login/LoginStyle';
import {Black, White, LGray} from '../../Styles/Color';
import MainStyle from '../../Styles/MainStyle';
import {useNavigation} from '@react-navigation/native';
import NavigationStrings from '../../Constant/NavigationStrings';
import {scale} from 'react-native-size-matters';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import { LoginButton, AccessToken, Profile, LoginManager } from 'react-native-fbsdk-next';
// import { firebase } from '@react-native-firebase/app';
import axios from 'axios';
import {Main_Base} from '../../Constant/Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash_2 = () => {
  const Navigation = useNavigation();
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const {id, photo, givenName, familyName, email, name} = userInfo.user;
      axios
        .post(`${Main_Base}/create/google-register-app`, {
          uid: id,
          photoUrl: photo,
          firstName: givenName,
          lastName: familyName,
          email: email,
          fullName: name,
          idToken: userInfo.idToken,
        })
        .then(async (response) => {
          if (response.data.type == 'success') {
            await AsyncStorage.setItem('Token', response.data.data.token);
            Navigation.navigate(NavigationStrings.HOME);
          } else Alert.alert(response.data.message);
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1034398133531-01gt2ls70oupds3s4l9i2le0u7asvdp6.apps.googleusercontent.com',
    });
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: Black, height: '100%'}}>
      <ScrollView>
        <View
          style={{
            height: '100%',
            flex: 1,
            backgroundColor: 'black',
            padding: 20,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <View>
              <Text style={{color: White, textAlign: 'center', marginTop: 20}}>GoChat</Text>
            </View>
            <View>
              <Text style={Splash_2Style.heading}> Connect friends easily & quickly</Text>
              <Text style={Splash_2Style.title}> Our chat app is the perfect way to stay connected with friends and family.</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={[LoginStyle.AuthButton, {borderColor: 'white', backgroundColor: LGray}]}
                onPress={() => {
                  signIn();
                }}
              >
                <ImagePath.GoogleIcon />
                <Text style={LoginStyle.AuthButtonText}>Sign up with google</Text>
              </TouchableOpacity>
            </View>
            <View style={[LoginStyle.ButtonWrapper, {gap: 15, marginTop: scale(40)}]}>
              <View style={LoginStyle.line}></View>
              <Text style={{color: White}}>OR</Text>
              <View style={LoginStyle.line}></View>
            </View>
          </View>
          <View style={{marginTop: scale(0)}}>
            <View style={{marginBottom: scale(15)}}>
              <TouchableOpacity
                style={MainStyle.MainButton}
                onPress={() => {
                  Navigation.navigate(NavigationStrings.SIGNUP);
                }}
              >
                <Text style={MainStyle.MainButtonText}>Sign up with email</Text>
              </TouchableOpacity>
            </View>
            <View style={MainStyle.flexDesignRow}>
              <Text style={{fontSize: 15, fontWeight: 600, color: LGray}}>Existing account?</Text>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(NavigationStrings.LOGIN);
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: White,
                    margin: 5,
                    marginLeft: 2,
                  }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Splash_2;
