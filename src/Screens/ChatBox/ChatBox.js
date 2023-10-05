import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, FlatList, StatusBar, Dimensions} from 'react-native';
import React, {useState} from 'react';
import ProfileImage from '../../Component/ProfileImage/ProfileImage';
import ChatBoxStyle from './ChatBoxStyle';
import MainStyle from '../../Styles/MainStyle';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import ImagePath from '../../Constant/ImagePath';
import {Black, Green, LGray, White} from '../../Styles/Color';
import HomeStyle from '../Home/HomeStyle';
import ClipButton from '../../Component/ClipButtons/ClipButton';
import {useNavigation} from '@react-navigation/native';
const ClipData = [
  {
    id: 1,
    image: <ImagePath.Camera />,
    headTitle: 'Camera',
    title: 'Click Picture',
  },
  {
    id: 2,
    image: <ImagePath.Doc />,
    headTitle: 'Documents',
    title: 'Share your files',
  },
  {
    id: 3,
    image: <ImagePath.Poll />,
    headTitle: 'Create a Poll',
    title: 'Create a poll for any query',
  },
  {
    id: 4,
    image: <ImagePath.Media_2 />,
    headTitle: 'Media',
    title: 'Share photos and videos',
  },
  {
    id: 5,
    image: <ImagePath.Contact />,
    headTitle: 'Contacts',
    title: 'Share your contacts',
  },
  {
    id: 6,
    image: <ImagePath.Location />,
    headTitle: 'Location',
    title: 'Share your location',
  },
];

const ChatBox = () => {
  const [showModal, setShowModal] = useState(false);
  const {width, height} = Dimensions.get('window');
  const [showSend, setShowSend] = useState(0);
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View
        style={[
          MainStyle.flexDesignRow,
          {
            justifyContent: 'space-between',
            paddingVertical: scale(15),
            paddingHorizontal: scale(10),
          },
        ]}
      >
        <View style={[MainStyle.flexDesignRow, {justifyContent: 'flex-start', gap: scale(10)}]}>
          <TouchableOpacity
            onPress={() => {
              Navigation.goBack();
            }}
          >
            <ImagePath.BackArrow />
          </TouchableOpacity>
          <ProfileImage widthValue={30} heightValue={30} />
          <View>
            <Text style={ChatBoxStyle.name}>Jhon Abraham</Text>
            <Text style={ChatBoxStyle.Active}>Active now</Text>
          </View>
        </View>
        <View>
          <View style={[MainStyle.flexDesignRow, {gap: 5}]}>
            <TouchableOpacity style={{padding: 6}}>
              <ImagePath.PhoneIcon />
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 6}}>
              <ImagePath.VideoIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{}}>
          {/* PROFILE DETAILS */}

          <View>
            <View
              style={{
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                paddingVertical: verticalScale(10),
              }}
            >
              <ProfileImage widthValue={100} heightValue={100} />
              <Text style={[HomeStyle.userName, {fontWeight: 700, marginTop: verticalScale(5)}]}>Jhon Abraham </Text>
              <Text>You don't follow each other</Text>
              <TouchableOpacity
                style={{
                  paddingVertical: verticalScale(10),
                  backgroundColor: LGray,
                  paddingHorizontal: moderateScale(15),
                  borderRadius: scale(10),
                  marginTop: verticalScale(10),
                }}
              >
                <Text style={[ChatBoxStyle.Active, {color: 'black', fontSize: 15, fontWeight: 600}]}>View Profile </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* MESSAGE */}
          <View
            style={{
              paddingHorizontal: scale(5),
              paddingBottom: scale(80),
            }}
          >
            <View style={[MainStyle.flexDesignRow, {justifyContent: 'flex-start', gap: scale(10)}]}>
              <ProfileImage widthValue={30} heightValue={30} />
              <Text style={[ChatBoxStyle.messageStyle, {borderTopLeftRadius: 0}]}>How are you</Text>
            </View>

            <View style={[MainStyle.flexDesignRow, {justifyContent: 'flex-start', left: scale(40)}]}>
              <Text style={[ChatBoxStyle.messageStyle, {borderTopLeftRadius: 0}]}>How are you</Text>
            </View>

            <View style={[MainStyle.flexDesignRow, {justifyContent: 'flex-end'}]}>
              <Text
                style={[
                  ChatBoxStyle.messageStyle,
                  {
                    backgroundColor: Green,
                    color: White,
                    borderTopRightRadius: 0,
                  },
                ]}
              >
                How are you I Love you baby
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* MESSAGE SEND BOX */}
      <View
        style={[
          MainStyle.flexDesignRow,
          {
            paddingHorizontal: scale(8),
            justifyContent: 'space-between',
            height: scale(60),
            borderTopColor: 'lightgray',
            borderTopWidth: scale(0.2),
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
            width: '100%',
          },
        ]}
      >
        <View
          style={[
            MainStyle.flexDesignRow,
            {
              justifyContent: 'flex-start',
              gap: scale(0),
              width: showSend > 0 ? '75%' : '89%',
            },
          ]}
        >
          <TouchableOpacity
            style={{padding: scale(6)}}
            onPress={() => {
              setShowModal(!showModal);
            }}
          >
            <ImagePath.Clip />
          </TouchableOpacity>
          <View style={{width: '100%'}}>
            <TextInput
              placeholder="Write your message...."
              style={{
                width: '100%',
                backgroundColor: LGray,
                borderRadius: scale(10),
                paddingHorizontal: moderateScale(10),
                color: Black,
              }}
              onChangeText={(e) => {
                setShowSend(e.length);
              }}
            />
            {showSend > 0 ? null : (
              <View
                style={[
                  MainStyle.flexDesignRow,
                  {
                    position: 'absolute',
                    right: scale(0),
                    top: scale(5),
                  },
                ]}
              >
                <TouchableOpacity style={{padding: scale(3)}}>
                  <ImagePath.Media />
                </TouchableOpacity>
                <TouchableOpacity style={{padding: scale(3)}}>
                  <ImagePath.Mic />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {showSend > 0 ? (
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: Green,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: scale(50),
            }}
          >
            <ImagePath.Send />
          </TouchableOpacity>
        ) : null}
      </View>

      <Modal
        visible={showModal}
        animationType="fade"
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        transparent={true}
      >
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              height: '72%',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              shadowColor: '#000000',
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 13},
              shadowOpacity: 0.24,
              shadowRadius: 14.86,
              elevation: 18,
            }}
          >
            <View
              style={[
                MainStyle.flexDesignRow,
                {
                  justifyContent: 'flex-start',
                  gap: scale(100),
                  marginBottom: scale(10),
                },
              ]}
            >
              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <ImagePath.Close />
              </TouchableOpacity>
              <Text style={{fontSize: 15, fontWeight: 700}}>Share Content</Text>
            </View>
            <View>
              <FlatList
                data={ClipData}
                renderItem={({item}) => {
                  return <ClipButton item={item} />;
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatBox;
