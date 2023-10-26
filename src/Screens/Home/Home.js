import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Alert, Modal, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ImagePath from '../../Constant/ImagePath';
import MainStyle from '../../Styles/MainStyle';
import { Black, DGray, Gray, Green, LGray, White } from '../../Styles/Color';
import HomeStyle from './HomeStyle';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Swipeable, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import NavigationStrings from '../../Constant/NavigationStrings';
import ProfileImage from '../../Component/ProfileImage/ProfileImage';
import { Menu, Box, Pressable } from 'native-base';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { $crud } from '../../CRUDFactory/Crud';
import socket from '../../../Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const { width, height } = Dimensions.get('window');
  const Navigation = useNavigation();
  const animation = useSharedValue(0);
  const [colorVlaue, setColorValue] = React.useState(0);
  const [profiledata, setProfiledata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const theme = useSelector((state) => state.theme.theme);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animation.value == 1 ? withTiming(300, { duration: 500 }) : withTiming(0, { duration: 500 }),
    };
  });
  const modalAnimation = useAnimatedStyle(() => {
    return {
      width: animation.value == 1 ? withTiming("100%", { duration: 500 }) : withTiming(0, { duration: 500 }),
    };
  });
  const AllUser = async () => {
    $crud.retrieve(`/retrieve/all-user`,)
      .then(async (response) => {
        setProfiledata(response.data)
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  }
  const Auth = async () => {
    const token = await AsyncStorage.getItem("userData")
    if (token != null) {
      socket.connect()
      socket.auth.userId = JSON.parse(token).id
    }
  }
  const getData = (value) => {
    const data = value;
    $crud
      .retrieve('/retrieve/following-friend', { value: data })
      .then((response) => {
        setSearchUser(response.data)
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };
  const debounce = (func, time) => {
    let Timer;
    return (...args) => {
      // eslint-disable-next-line no-undef
      clearTimeout(Timer);
      // eslint-disable-next-line no-undef
      Timer = setTimeout(() => {
        func(args);
      }, time);
    };
  };
  const debounceGetData = debounce(getData, 500);
  socket.on('activeStatus', (data) => {
    console.log(data, "kkkkkkkkkkk")
  })
  useEffect(() => {
    AllUser()
    Auth()
  }, [])
  return (
    <SafeAreaView style={[MainStyle.MainWrapper, { padding: 0 }]}>
      <StatusBar backgroundColor={Black} barStyle={'default'} />
      <View style={{ backgroundColor: colorVlaue == 1 ? "lightgray" : Green, flex: 1 }}>
        <View style={[MainStyle.flexDesignRow, { justifyContent: 'space-between', paddingHorizontal: scale(20), height: scale(70), },]} >
          <Text style={HomeStyle.TopHeadline}>Gochat</Text>
          <View style={[MainStyle.flexDesignRow, { gap: 0, width: scale(40) }]}>
            <TouchableOpacity
              onPress={() => {
                if (animation.value == 0) {
                  animation.value = 1;
                  modalAnimation.value = 1;
                  setColorValue(1);
                  setShowModal(!showModal)
                } else {
                  animation.value = 0;
                  modalAnimation.value = 0;
                  setColorValue(0);
                  setShowModal(!showModal)
                }
                setSearchUser([])
                setInputValue("")
              }}
            >
              {/* {colorVlaue == 1 && theme == 'dark' ? <Image source={ImagePath.close} /> : <ImagePath.Search />} */}
              {colorVlaue == 1 ? <Image source={ImagePath.close} /> : <ImagePath.Search />}
            </TouchableOpacity>

            <Box w="90%" alignItems="center">
              <Menu
                w="190"
                trigger={(triggerProps) => {
                  return (
                    <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                      <Image source={ImagePath.dot_1} />
                    </Pressable>
                  );
                }}
                style={{ backgroundColor: theme == 'dark' ? Black : White, }}
              >
                <Menu.Item
                  onPress={() => {
                    Navigation.navigate(NavigationStrings.PROFILE);
                  }}
                >
                  <Text style={{ color: theme == 'dark' ? White : Black }}>Profile</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text style={{ color: theme == 'dark' ? White : Black }}>Arial</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text style={{ color: theme == 'dark' ? White : Black }}>Arial</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text style={{ color: theme == 'dark' ? White : Black }}>Arial</Text>
                </Menu.Item>
              </Menu>
            </Box>
          </View>
        </View>
        <Animated.View
          style={[{ width: '100%', height: scale(70), backgroundColor: LGray, flexDirection: 'row', alignItems: 'center', position: 'absolute', zIndex: 11, overflow: 'hidden', }, animatedStyle,]}  >
          <TextInput placeholder="Search"
            style={{ backgroundColor: "lightgray", width: '100%', height: '100%', fontSize: 18, padding: 20, color: Black }}
            placeholderTextColor={White}
            onChangeText={(e) => { debounceGetData(e), setInputValue(e) }}
            value={inputValue}
          />
        </Animated.View>
        {/* CHAT SECTION */}

        <View style={{ flex: 1, backgroundColor: theme == 'dark' ? Black : White, padding: moderateScale(10), }}  >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={profiledata}
            renderItem={(item) => {
              return (
                <Swipeable renderRightActions={() => {
                  return (
                    <View style={{ flexDirection: 'row', backgroundColor: theme == 'dark' ? Black : White, }} >
                      <TouchableOpacity style={{ width: scale(50), justifyContent: 'center', alignItems: 'center', }} >
                        <ImagePath.Notification />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ width: scale(70), justifyContent: 'center', alignItems: 'center', }} >
                        <ImagePath.Trash />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                >
                  <TouchableOpacity style={[MainStyle.flexDesignRow, { backgroundColor: theme == 'dark' ? Black : White, paddingHorizontal: scale(5), paddingVertical: scale(11), justifyContent: 'space-between', },]}
                    onPress={() => { Navigation.navigate('ChatBox', { data: item.item }); }}
                  >
                    <View style={[MainStyle.flexDesignRow, { justifyContent: 'flex-start', gap: scale(10), },]}>
                      <ProfileImage widthValue={45} heightValue={45} imageUrl={item.item?.photoUrl} />
                      <View>
                        <Text style={[HomeStyle.userName, { color: theme == 'dark' ? White : Black, },]} >
                          {item.item.fullName}{' '}
                        </Text>
                        <Text style={{ color: theme == 'dark' ? Gray : DGray, }} >
                          How are you
                        </Text>
                      </View>
                    </View>
                    <View style={MainStyle.flexDesignColumn}>
                      <Text style={[HomeStyle.messageSeenTime, { color: theme == 'dark' ? Gray : DGray }]}>2 min ago </Text>
                      <View
                        style={{
                          paddingVertical: 3,
                          backgroundColor: 'red',
                          borderRadius: scale(50),
                          paddingHorizontal: 7,
                        }}
                      >
                        <Text style={HomeStyle.unseenMessageNumber}>1</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Swipeable>
              );
            }}
          />
        </View>
        <Animated.View style={[{ position: 'absolute', height: "90%", bottom: 0, backgroundColor: "lightgray", paddingTop: verticalScale(50) }, modalAnimation,]}>
          {searchUser.length == 0 ? (
            <Text
              style={{
                fontSize: scale(15),
                color: theme == 'dark' ? White : Black,
                textAlign: 'center',
              }}
            >
              No result found
            </Text>
          ) : (
            <View style={{ paddingHorizontal: 10 }}>
              <ScrollView>
                {searchUser.map((item, index) => {
                  return (
                    <TouchableOpacity key={index}
                      style={[MainStyle.flexDesignRow, { paddingVertical: verticalScale(5), justifyContent: 'flex-start', gap: scale(10) }]}
                      onPress={() => Navigation.navigate(NavigationStrings.USERPROFILE, { data: item, })}  >
                      <View style={{ width: scale(60), height: scale(60), padding: verticalScale(2), borderRadius: scale(100), overflow: 'hidden', }} >
                        <Image source={{ uri: item.photoUrl }} style={{ width: '100%', height: '100%', borderRadius: scale(100), }} />
                      </View>
                      <View>
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: scale(13), color: theme == 'dark' ? White : Black, }}  >
                          rohit_123_roy
                        </Text>
                        <Text style={{ fontWeight: 400, fontSize: scale(12), color: DGray, }} >
                          {item.fullName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView >
  );
};

export default Home;
