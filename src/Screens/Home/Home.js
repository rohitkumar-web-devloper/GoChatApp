import {View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList} from 'react-native';
import React from 'react';
import ImagePath from '../../Constant/ImagePath';
import MainStyle from '../../Styles/MainStyle';
import {Black, DGray, Gray, Green, LGray, White} from '../../Styles/Color';
import HomeStyle from './HomeStyle';
import {moderateScale, scale} from 'react-native-size-matters';
import {Swipeable, TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import NavigationStrings from '../../Constant/NavigationStrings';
import ProfileImage from '../../Component/ProfileImage/ProfileImage';
import {Menu, Box, Pressable} from 'native-base';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
const Profiledata = [
  {
    name: 'rohit',
    opened: false,
  },
  {
    image: ImagePath.Profile,
    opened: false,
  },
  {
    image: ImagePath.Profile,
    name: 'rohit',
    opened: false,
  },
  {
    image: ImagePath.Profile,
    opened: false,
  },
  {
    image: ImagePath.Profile,
    name: 'rohit',
    opened: false,
  },
  {
    image: ImagePath.Profile,
    opened: false,
  },
  {
    image: ImagePath.Profile,
    name: 'rohit',
    opened: false,
  },
  {
    image: ImagePath.Profile,
    opened: false,
  },
  {
    image: ImagePath.Profile,
    name: 'rohit',
    opened: false,
  },
  {
    image: ImagePath.Profile,
    opened: false,
  },
];

const Home = () => {
  const Navigation = useNavigation();
  const animation = useSharedValue(0);
  const [colorVlaue, setColorValue] = React.useState(0);
  const theme = useSelector((state) => state.theme.theme);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animation.value == 1 ? withTiming(300, {duration: 500}) : withTiming(0, {duration: 500}),
    };
  });

  return (
    <SafeAreaView style={[MainStyle.MainWrapper, {padding: 0}]}>
      <StatusBar backgroundColor={Black} barStyle={'default'} />
      <View style={{backgroundColor: colorVlaue == 1 ? LGray : Green, flex: 1}}>
        <View
          style={[
            MainStyle.flexDesignRow,
            {
              justifyContent: 'space-between',
              paddingHorizontal: scale(20),
              height: scale(70),
            },
          ]}
        >
          <Text style={HomeStyle.TopHeadline}>Gochat</Text>
          <View style={[MainStyle.flexDesignRow, {justifyContent: '', gap: 0, width: scale(40)}]}>
            <TouchableOpacity
              onPress={() => {
                if (animation.value == 0) {
                  animation.value = 1;
                  setColorValue(1);
                } else {
                  animation.value = 0;
                  setColorValue(0);
                }
              }}
            >
              {colorVlaue == 1 && theme == 'dark' ? <Image source={ImagePath.close} /> : <ImagePath.Search />}
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
                style={{
                  backgroundColor: theme == 'dark' ? Black : White,
                }}
              >
                <Menu.Item
                  onPress={() => {
                    Navigation.navigate(NavigationStrings.PROFILE);
                  }}
                >
                  <Text style={{color: theme == 'dark' ? White : Black}}>Profile</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text style={{color: theme == 'dark' ? White : Black}}>Arial</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text style={{color: theme == 'dark' ? White : Black}}>Arial</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text style={{color: theme == 'dark' ? White : Black}}>Arial</Text>
                </Menu.Item>
              </Menu>
            </Box>
          </View>
        </View>
        <Animated.View
          style={[
            {
              width: '100%',
              height: scale(70),
              backgroundColor: LGray,
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              zIndex: 11,
              overflow: 'hidden',
            },
            animatedStyle,
          ]}
        >
          <TextInput
            placeholder="Search"
            style={{
              backgroundColor: LGray,
              width: '100%',
              height: '100%',
              fontSize: 18,
              padding: 20,
            }}
            placeholderTextColor={White}
          />
        </Animated.View>
        {/* CHAT SECTION */}

        <View
          style={{
            flex: 1,
            backgroundColor: theme == 'dark' ? Black : White,
            padding: moderateScale(10),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Profiledata}
            renderItem={() => {
              return (
                <Swipeable
                  renderRightActions={() => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: theme == 'dark' ? Black : White,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: scale(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <ImagePath.Notification />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: scale(70),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <ImagePath.Trash />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                >
                  <TouchableOpacity
                    style={[
                      MainStyle.flexDesignRow,
                      {
                        backgroundColor: theme == 'dark' ? Black : White,
                        paddingHorizontal: scale(5),
                        paddingVertical: scale(11),
                        justifyContent: 'space-between',
                      },
                    ]}
                    onPress={() => {
                      Navigation.navigate('ChatBox');
                    }}
                  >
                    <View
                      style={[
                        MainStyle.flexDesignRow,
                        {
                          justifyContent: 'flex-start',
                          gap: scale(10),
                        },
                      ]}
                    >
                      <ProfileImage widthValue={45} heightValue={45} />
                      <View>
                        <Text
                          style={[
                            HomeStyle.userName,
                            {
                              color: theme == 'dark' ? White : Black,
                            },
                          ]}
                        >
                          Alex Linderson{' '}
                        </Text>
                        <Text
                          style={{
                            color: theme == 'dark' ? Gray : DGray,
                          }}
                        >
                          How are you
                        </Text>
                      </View>
                    </View>
                    <View style={MainStyle.flexDesignColumn}>
                      <Text style={[HomeStyle.messageSeenTime, {color: theme == 'dark' ? Gray : DGray}]}>2 min ago </Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Home;
