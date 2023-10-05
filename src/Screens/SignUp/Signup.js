// eslint-disable-next-line react-native/split-platform-components
import {View, Text, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Dimensions, ScrollView, Alert, ToastAndroid} from 'react-native';
import React from 'react';
import LoginStyle from '../Login/LoginStyle';
import MainStyle from '../../Styles/MainStyle';
import {Black, DGray, Gray, LGray, White} from '../../Styles/Color';
import ImagePath from '../../Constant/ImagePath';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Formik} from 'formik';
import SignUpSchema from '../../Schemas/SignUp';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Main_Base} from '../../Constant/Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationStrings from '../../Constant/NavigationStrings';
const Signup = () => {
  const {height} = Dimensions.get('window');
  const Navigation = useNavigation();
  const theme = useSelector((state) => state.theme.theme);
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  return (
    <SafeAreaView style={[MainStyle.MainWrapper, {padding: 0}]}>
      <StatusBar backgroundColor={theme == 'dark' ? Black : White} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView bounces={false}>
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
                .post(`${Main_Base}/create/register-with-email`, {
                  fullName: values.fullName,
                  email: values.email,
                  password: values.password,
                })
                .then(async (response) => {
                  if (response.data.type == 'success') {
                    await AsyncStorage.setItem('Token', response?.data?.data?.token);
                    Navigation.navigate(NavigationStrings.HOME);
                  } else if (response.data.type == 'error') {
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                  }
                })
                .catch((error) => {
                  Alert.alert(error);
                });
            }}
            validationSchema={SignUpSchema}
          >
            {({handleChange, handleBlur, handleSubmit, values, touched, isValid, errors}) => (
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
                  <View style={{marginBottom: 30}}>
                    <Text style={[LoginStyle.Headline, {color: theme == 'dark' ? White : Black}]}>Sign up with Email</Text>
                    <Text style={LoginStyle.text}> Get chatting with friends and family today by signing up for our chat app!</Text>
                  </View>
                  <View>
                    <View>
                      <TextInput
                        style={[
                          MainStyle.input,
                          {
                            borderColor: errors.fullName && touched.fullName ? 'red' : LGray,
                          },
                        ]}
                        placeholderTextColor={DGray}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        value={values.fullName}
                        placeholder="Full fullName"
                      />
                      <View
                        style={{
                          position: 'absolute',
                          padding: verticalScale(14),
                          top: scale(8),
                        }}
                      >
                        <ImagePath.NameIcon />
                      </View>
                      {errors.fullName && touched.fullName ? (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            textAlign: 'right',
                            position: 'absolute',
                            top: 70,
                            right: 10,
                            fontWeight: 400,
                          }}
                        >
                          {errors.fullName}
                        </Text>
                      ) : null}
                    </View>
                    <View>
                      <TextInput
                        style={[MainStyle.input, {}]}
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
                            fontWeight: 400,
                          }}
                        >
                          {errors.email}
                        </Text>
                      ) : null}
                    </View>
                    <View>
                      <TextInput
                        style={[MainStyle.input, {}]}
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
                            fontWeight: 400,
                          }}
                        >
                          {errors.password}
                        </Text>
                      ) : null}
                    </View>
                    <View>
                      <TextInput
                        style={[MainStyle.input, {}]}
                        placeholderTextColor={DGray}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        keyboardType="default"
                        placeholder="Confirm password"
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
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            textAlign: 'right',
                            position: 'absolute',
                            top: 70,
                            right: 10,
                            fontWeight: 400,
                          }}
                        >
                          {errors.confirmPassword}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>
                <View style={{marginTop: scale(40)}}>
                  <TouchableOpacity
                    style={isValid ? [MainStyle.MainButton] : [MainStyle.MainButton, {backgroundColor: LGray}]}
                    onPress={() => {
                      handleSubmit();
                    }}
                    disabled={isValid ? false : true}
                  >
                    <Text style={isValid ? [MainStyle.MainButtonText] : [MainStyle.MainButtonText, {color: Gray}]}>Create an account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
