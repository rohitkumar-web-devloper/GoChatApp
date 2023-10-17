// eslint-disable-next-line react-native/split-platform-components
import { View, SafeAreaView, StatusBar, ScrollView, Dimensions, Text, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native';
import React from 'react';
import LoginStyle from './LoginStyle';
import ImagePath from '../../Constant/ImagePath';
import MainStyle from '../../Styles/MainStyle';
import { White, Black, DGray, LGray, Gray } from '../../Styles/Color';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Main_Base } from '../../Constant/Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationStrings from '../../Constant/NavigationStrings';
import SignUpSchema from '../../Schemas/SignUp';

const Login = () => {
  const { height } = Dimensions.get('window');
  const Navigation = useNavigation();
  const theme = useSelector((state) => state.theme.theme);
  const initialValues = { email: '', password: '' };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const { id, photo, givenName, familyName, email, name } = userInfo.user;
      axios
        .post(`${Main_Base}/create/google-login`, {
          uid: id,
          photoUrl: photo,
          firstName: givenName,
          lastName: familyName,
          email: email,
          fullName: name,
          idToken: userInfo.idToken,
        })
        .then(async (response) => {
          await AsyncStorage.setItem('userData', JSON.stringify({ Token: response.data.data.token, id: response.data.data.id }));
          Navigation.navigate(NavigationStrings.HOME);
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    } catch (error) {
      Alert.alert(error)
    }
  };
  return (
    <SafeAreaView style={[MainStyle.MainWrapper, { padding: 0 }]}>
      <StatusBar backgroundColor={theme == 'dark' ? Black : White} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: height,
            backgroundColor: theme == 'dark' ? Black : White,
          }}
        >
          <Formik
            initialValues={initialValues}
            validateOnMount={true}
            enableReinitialize={true}
            onSubmit={(values) => {
              axios
                .post(`${Main_Base}/create/email-login`, values)
                .then(async (response) => {
                  if (response.data.type == 'success') {
                    await AsyncStorage.setItem('userData', JSON.stringify({ Token: response.data.data.token, id: response.data.data.id }));
                    Navigation.navigate(NavigationStrings.HOME);
                  } else if (response.data.type == 'error') {
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                  }
                })
                .catch((error) => {
                  Alert.alert(error);
                });
            }}
          // validationSchema={SignUpSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
              <View
                style={{
                  flex: 1,
                  padding: scale(10),
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Navigation.goBack();
                    }}
                  >
                    {theme == 'dark' ? <ImagePath.BackArrowsWhite /> : <ImagePath.BackArrow />}
                  </TouchableOpacity>

                  <View style={{ marginBottom: 30 }}>
                    <Text style={[LoginStyle.Headline, { color: theme == 'dark' ? White : Black }]}>Sign In with Email</Text>
                    <Text style={LoginStyle.text}>Get chatting with friends and family today by signing up for our chat app!</Text>
                  </View>
                  <View>
                    <View>
                      <TextInput
                        style={[MainStyle.input, { color: theme == 'dark' ? White : Black }]}
                        placeholderTextColor={DGray}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        placeholder="Valid email"
                      />
                      <View
                        style={{
                          position: 'absolute',
                          padding: verticalScale(14),
                          top: scale(8),
                        }}
                      >
                        <ImagePath.Mailicon />
                      </View>
                      {errors.email && touched.email ? (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            textAlign: 'right',
                            position: 'absolute',
                            top: 70,
                            right: 10,
                            fontWeight: 800,
                          }}
                        >
                          {errors.email}
                        </Text>
                      ) : null}
                    </View>
                    <View>
                      <TextInput
                        style={[MainStyle.input, { color: theme == 'dark' ? White : Black }]}
                        placeholderTextColor={DGray}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        keyboardType="default"
                        placeholder="Password"
                      />
                      <View
                        style={{
                          position: 'absolute',
                          padding: verticalScale(14),
                          top: scale(8),
                        }}
                      >
                        <ImagePath.LockIcon />
                      </View>
                      {errors.password && touched.password ? (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            textAlign: 'right',
                            position: 'absolute',
                            top: 70,
                            right: 10,
                            fontWeight: 800,
                          }}
                        >
                          {errors.password}
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  <View
                    style={{
                      marginBottom: scale(15),
                      marginTop: moderateScale(50),
                    }}
                  >
                    <TouchableOpacity
                      style={[MainStyle.MainButton,]}
                      onPress={() => {
                        handleSubmit();
                      }}
                    // disabled={isValid ? false : true}
                    >
                      <Text style={isValid ? [MainStyle.MainButtonText] : [MainStyle.MainButtonText, { color: Gray }]}>Log In</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      LoginStyle.ButtonWrapper,
                      {
                        gap: 5,
                        padding: verticalScale(7),
                        marginTop: moderateScale(10),
                      },
                    ]}
                  >
                    <View style={LoginStyle.line}></View>
                    <Text style={{ color: DGray }}>OR</Text>
                    <View style={LoginStyle.line}></View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      style={[
                        LoginStyle.AuthButton,
                        {
                          borderColor: 'white',
                          backgroundColor: LGray,
                        },
                      ]}
                      onPress={() => {
                        signIn();
                      }}
                    >
                      <ImagePath.GoogleIcon />
                      <Text style={LoginStyle.AuthButtonText}>Sign In with google</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
