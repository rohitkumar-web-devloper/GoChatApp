import {Text, View, SafeAreaView, Dimensions, StatusBar, Alert, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainStyle from '../../Styles/MainStyle';
import {useSelector} from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
import {Green, White, Black, LGray} from '../../Styles/Color';
import {moderateScale, scale} from 'react-native-size-matters';
import UserProfileStyle from './UserProfileStyle';
import Header from '../Header/Header';
import {$crud} from '../../CRUDFactory/Crud';

// eslint-disable-next-line react/prop-types
const UserProfile = ({route}) => {
  const {height} = Dimensions.get('window');
  // const Navigation = useNavigation();
  const [userData, setUserData] = useState();
  const [follow, setFollow] = useState(false);
  let theme = useSelector((state) => state.theme.theme);
  const User = async () => {
    // eslint-disable-next-line react/prop-types
    $crud
      .retrieve('/retrieve/user', {_id: route.params.data._id})
      .then((result) => {
        setUserData(result.data.user);
        setFollow(result.data.exist);
      })
      .catch((err) => {
        Alert.alert(err.messaage);
      });
  };
  const Follow = async () => {
    $crud
      .put('/update/follow', {_id: userData._id})
      .then((result) => {
        setUserData(result.data);
        User();
      })
      .catch((err) => {
        Alert.alert(err.code);
      });
  };
  useEffect(() => {
    User();
  }, []);
  // console.log(userData.follower.length, "kkkkkkkkkkk")
  return (
    <SafeAreaView style={[MainStyle.MainWrapper, {height: height, backgroundColor: theme == 'dark' ? Black : White}]}>
      <StatusBar backgroundColor={theme == 'dark' ? Black : White} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <Header name={userData?.fullName} />
        <View>
          <View>
            <View
              style={[
                MainStyle.flexDesignRow,
                {
                  justifyContent: 'space-between',
                  paddingHorizontal: moderateScale(15),
                  paddingVertical: scale(10),
                },
              ]}
            >
              <View>
                <View
                  style={{
                    width: scale(70),
                    height: scale(70),
                    borderRadius: scale(100),
                  }}
                >
                  <Image
                    source={{uri: userData?.photoUrl}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: scale(100),
                    }}
                  />
                </View>
              </View>
              <View
                style={[
                  MainStyle.flexDesignRow,
                  {
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(15),
                    gap: scale(20),
                  },
                ]}
              >
                <View style={UserProfileStyle.followWrapper}>
                  <Text style={[UserProfileStyle.followcount, {color: theme == 'dark' ? White : Black}]}>0</Text>
                  <Text style={[UserProfileStyle.followText, {color: theme == 'dark' ? White : Black}]}>posts</Text>
                </View>
                <View style={UserProfileStyle.followWrapper}>
                  <Text style={[UserProfileStyle.followcount, {color: theme == 'dark' ? White : Black}]}>{userData?.follower.length}</Text>
                  <Text style={[UserProfileStyle.followText, {color: theme == 'dark' ? White : Black}]}>Followers</Text>
                </View>
                <View style={UserProfileStyle.followWrapper}>
                  <Text style={[UserProfileStyle.followcount, {color: theme == 'dark' ? White : Black}]}>0</Text>
                  <Text style={[UserProfileStyle.followText, {color: theme == 'dark' ? White : Black}]}>Following</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              MainStyle.flexDesignRow,
              {
                paddingHorizontal: moderateScale(15),
                justifyContent: 'space-between',
                marginTop: moderateScale(20),
              },
            ]}
          >
            <TouchableOpacity style={[UserProfileStyle.followButton, {backgroundColor: follow ? LGray : Green}]} onPress={() => Follow()}>
              {follow ? (
                <Text
                  style={{
                    fontSize: scale(13),
                    fontWeight: 500,
                    color: follow ? Black : White,
                  }}
                >
                  Unfollow
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: scale(13),
                    fontWeight: 500,
                    color: follow ? Black : White,
                  }}
                >
                  Follow
                </Text>
              )}
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
