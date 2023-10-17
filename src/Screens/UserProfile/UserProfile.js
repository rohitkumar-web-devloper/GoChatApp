import { Text, View, SafeAreaView, Dimensions, StatusBar, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MainStyle from '../../Styles/MainStyle';
import { useSelector } from 'react-redux';
import { Green, White, Black, LGray } from '../../Styles/Color';
import { moderateScale, scale } from 'react-native-size-matters';
import UserProfileStyle from './UserProfileStyle';
import Header from '../Header/Header';
import { $crud } from '../../CRUDFactory/Crud';
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line react/prop-types
const UserProfile = ({ route }) => {
  const { height } = Dimensions.get('window');
  const [userData, setUserData] = useState();
  const [follow, setFollow] = useState(false);
  // const [userDetails, setUserDetails] = useState()
  let theme = useSelector((state) => state.theme.theme);
  const User = async (id) => {
    $crud.retrieve('/retrieve/debounce-user-profile', { id: route.params.data.id })
      .then((result) => {
        setUserData(result.data);
        const exist = JSON.parse(result.data.followData.follower).find(pq => pq == id);
        if (exist != undefined) {
          setFollow(true)
        } else {
          setFollow(false)
        }
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };
  const Follow = async () => {
    const userDet = await AsyncStorage.getItem("userData")
    $crud
      .put('/update/follow-unfollow', { id: userData.id })
      .then((result) => {
        User(JSON.parse(userDet).id);
      })
      .catch((err) => {
        Alert.alert(err.code);
      });
  };
  const userInformation = async () => {
    const userDet = await AsyncStorage.getItem("userData")
    if (userDet) {
      User(JSON.parse(userDet).id);
    }
  }
  useEffect(() => {
    userInformation()
  }, []);
  return (
    <SafeAreaView style={[MainStyle.MainWrapper, { height: height, backgroundColor: theme == 'dark' ? Black : White, padding: 10 }]}>
      <StatusBar backgroundColor={theme == 'dark' ? Black : White} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <Header name={userData?.fullName} />
        <View>
          <View>
            <View
              style={[MainStyle.flexDesignRow, { justifyContent: 'space-between', paddingHorizontal: moderateScale(10), paddingVertical: scale(10), },]} >
              <View>
                <View style={{ width: scale(70), height: scale(70), borderRadius: scale(100), }} >
                  <Image source={{ uri: userData?.photoUrl }} style={{ width: '100%', height: '100%', borderRadius: scale(100), }} />
                </View>
              </View>
              <View style={[MainStyle.flexDesignRow, { justifyContent: 'space-between', paddingHorizontal: moderateScale(15), gap: scale(20), },]}    >
                <View style={UserProfileStyle.followWrapper}>
                  <Text style={[UserProfileStyle.followcount, { color: theme == 'dark' ? White : Black }]}>0</Text>
                  <Text style={[UserProfileStyle.followText, { color: theme == 'dark' ? White : Black }]}>posts</Text>
                </View>
                <View style={UserProfileStyle.followWrapper}>
                  {
                    userData != undefined ?
                      <Text style={[UserProfileStyle.followcount, { color: theme == 'dark' ? White : Black }]}>{JSON.parse(userData?.followData.follower).length}</Text>
                      :
                      <Text style={[UserProfileStyle.followcount, { color: theme == 'dark' ? White : Black }]}>0</Text>
                  }
                  <Text style={[UserProfileStyle.followText, { color: theme == 'dark' ? White : Black }]}>Followers</Text>
                </View>
                <View style={UserProfileStyle.followWrapper}>
                  {
                    userData != undefined ?
                      <Text style={[UserProfileStyle.followText, { color: theme == 'dark' ? White : Black }]}>{JSON.parse(userData?.followData.following).length}</Text>
                      :
                      <Text style={[UserProfileStyle.followText, { color: theme == 'dark' ? White : Black }]}>0</Text>
                  }
                  <Text style={[UserProfileStyle.followText, { color: theme == 'dark' ? White : Black }]}>Following</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[MainStyle.flexDesignRow, { paddingHorizontal: moderateScale(15), justifyContent: 'space-between', marginTop: moderateScale(20), },]} >
            <TouchableOpacity style={[UserProfileStyle.followButton, { backgroundColor: follow ? LGray : Green }]} onPress={() => Follow()}>
              <Text style={{ fontSize: scale(13), fontWeight: 500, color: follow ? Black : White, }} >
                {
                  follow ? "Unfollow" : "Follow"
                }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={UserProfileStyle.followButton}>
              <Text
                style={{
                  fontSize: scale(13),
                  fontWeight: 500,
                  color: Black,
                }}
              >
                Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
