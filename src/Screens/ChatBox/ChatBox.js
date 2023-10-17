import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, FlatList, StatusBar, Dimensions, } from 'react-native';
import React, { useState, useRef, useEffect, memo } from 'react';
import ProfileImage from '../../Component/ProfileImage/ProfileImage';
import ChatBoxStyle from './ChatBoxStyle';
import MainStyle from '../../Styles/MainStyle';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ImagePath from '../../Constant/ImagePath';
import { Black, Gray, Green, LGray, White } from '../../Styles/Color';
import HomeStyle from '../Home/HomeStyle';
import ClipButton from '../../Component/ClipButtons/ClipButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from "@react-native-voice/voice"
import socket from '../../../Socket';
import { db } from '../../Constant/Sqlite';
import { useSelector, useDispatch } from 'react-redux';
import { addNewChat, setChat } from '../../Redux/Slices/TempChat';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import NavigationStrings from '../../Constant/NavigationStrings';
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
  // {
  //   id: 4,
  //   image: <ImagePath.Media_2 />,
  //   headTitle: 'Media',
  //   title: 'Share photos and videos',
  // },
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
const ChatBox = ({ route }) => {
  const [showModal, setShowModal] = useState(false);
  const { width, height } = Dimensions.get('window');
  const [showSend, setShowSend] = useState(false);
  const [userData, setUserData] = useState({})
  const [user_id, setUser_id] = useState("")
  const [messages, setMessage] = useState([])
  const [sendMessage, setSendMessage] = useState("")
  const scrollViewRef = useRef();
  const Navigation = useNavigation();
  const Dispatch = useDispatch()
  const ChatData = useSelector(state => state.Chats.Chats)
  //  THIS FUNCTION IS USED TO GO SCROLL IN THE CHATBOX BOTTOM

  // const scrollToBottom = () => {
  //   if (scrollViewRef.current) {
  //     scrollViewRef.current.scrollToEnd({ animated: true });
  //   }
  // };
  socket.off("recieveMessage").on("recieveMessage", (data) => {
    Dispatch(addNewChat(data))
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO chats${data.sender} (message, sender , reciver, time ) VALUES (?,?,?,?)`,
        [data.message, data.sender, data.reciver, data.time],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Recieve Message saved successfully');
          } else {
            console.log('Recieve Message save failed');
          }
        },
        (error) => {
          console.error('Error inserting message:', error);
        }
      );
    });
  })
  const getChatMessages = async (callback) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM 'chats${userData.id}'`, [],
        (tx, results) => {
          const messages = [];
          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            messages.push(row);
          }
          Dispatch(setChat(messages))
          // setMessage(messages)
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
    });
  };
  const saveChatMessage = (message, sender, reciver, time) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO chats${route.params.data.id} (message, sender , reciver, time ) VALUES (?,?,?,?)`,
        [message, sender, reciver, time],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Message saved successfully');
            getChatMessages()
          } else {
            console.log('Message save failed');
          }
        },
        (error) => {
          console.error('Error inserting message:', error);
        }
      );
    });
    socket.emit("sendMessage", { message, sender, reciver, time })
  };
  const UserId = async () => {
    let data = await AsyncStorage.getItem("userData")
    data = JSON.parse(data)
    setUser_id(data.id)
  }
  const AudioText = async () => {
    console.log("sdfdsfdsfdsfsdfds")
  }
  const ImagePicker = async () => {
    const result = await launchImageLibrary()
    console.log(result, "-------------------------resultImage")
  }
  const launchCam = async () => {
    const result = await launchCamera()
    console.log(result, "-------------------------resultCamera")

  }
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: false })
  }, [ChatData])
  useEffect(() => {
    setUserData(route.params.data)
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS 'chats${route.params.data.id}' (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, sender TEXT, reciver TEXT ,time INTEGER DEFAULT CURRENT_TIMESTAMP);`
      );
    });
    UserId()
    // Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    // Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    // Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }, [])
  useEffect(() => {
    if (user_id && userData) {
      getChatMessages()
    }
  }, [user_id])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View
        style={[MainStyle.flexDesignRow, { justifyContent: 'space-between', paddingVertical: scale(15), paddingHorizontal: scale(10), },]}>
        <View style={[MainStyle.flexDesignRow, { justifyContent: 'flex-start', gap: scale(10) }]}>
          <TouchableOpacity onPress={() => { Navigation.goBack(); }} >
            <ImagePath.BackArrow />
          </TouchableOpacity>
          <ProfileImage widthValue={30} heightValue={30} />
          <View>
            <Text style={ChatBoxStyle.name}>{userData.fullName}</Text>
            <Text style={ChatBoxStyle.Active}>Active now</Text>
          </View>
        </View>
        <View>
          <View style={[MainStyle.flexDesignRow, { gap: 5 }]}>
            <TouchableOpacity style={{ padding: 6 }}>
              <ImagePath.PhoneIcon />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 6 }}>
              <ImagePath.VideoIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
      // onScroll={(event) => {
      //   const scrolling = event.nativeEvent.contentOffset.y;
      //   console.log(scrolling)
      //   if (scrolling > 100) {
      //     console.log("llllllllll")
      //     // setHeaderShown(true);
      //   } else {
      //     // setHeaderShown(false);
      //     console.log("ddddddddd")
      //   }
      // }}
      >
        <View>
          {/* PROFILE DETAILS */}

          <View>
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', paddingVertical: verticalScale(10), }}>
              <ProfileImage widthValue={100} heightValue={100} imageUrl={userData.photoUrl} />
              <Text style={[HomeStyle.userName, { fontWeight: 700, marginTop: verticalScale(5) }]}>{userData.fullName}</Text>
              <Text>You don't follow each other</Text>
              <TouchableOpacity style={{ paddingVertical: verticalScale(10), backgroundColor: LGray, paddingHorizontal: moderateScale(15), borderRadius: scale(10), marginTop: verticalScale(10), }}
                onPress={() => Navigation.navigate(NavigationStrings.USERPROFILE, { data: userData })}
              >
                <Text style={[ChatBoxStyle.Active, { color: 'black', fontSize: 15, fontWeight: 600 }]}>View Profile </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* MESSAGE */}
          <View style={{ paddingHorizontal: scale(5), paddingBottom: scale(80), }}>
            {
              ChatData.map((item, index) =>
                item.sender == user_id ?
                  <View key={index} style={[MainStyle.flexDesignRow, { justifyContent: 'flex-end', gap: scale(10), marginRight: scale(15) }]}>
                    <Text style={[ChatBoxStyle.messageStyle, { borderTopLeftRadius: 0 }]}>{item.message}</Text>
                    {/* <ProfileImage widthValue={30} heightValue={30} imageUrl={userData.photoUrl} /> */}
                  </View>
                  :
                  <View key={index} style={[MainStyle.flexDesignRow, { justifyContent: 'flex-start', gap: scale(10) }]}>
                    <ProfileImage widthValue={30} heightValue={30} imageUrl={userData.photoUrl} />
                    <Text style={[ChatBoxStyle.messageStyle, { borderTopLeftRadius: 0 }]}>{item.message}</Text>
                  </View>
              )
            }
          </View>
        </View>
      </ScrollView>
      {/* MESSAGE SEND BOX */}
      <View style={[MainStyle.flexDesignRow,
      { paddingHorizontal: scale(8), justifyContent: 'space-between', height: scale(60), borderTopColor: 'lightgray', borderTopWidth: scale(0.2), position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%', },
      ]} >
        {/* <View style={[MainStyle.flexDesignRow, { justif yContent: 'flex-start', gap: scale(0), width: showSend > 0 ? '75%' : '89%', },]}> */}
        <View style={[MainStyle.flexDesignRow, { justifyContent: 'flex-start', gap: scale(0), width: "88%" },]}>
          <TouchableOpacity style={{ padding: scale(6) }} onPress={() => { setShowModal(!showModal); }}>
            <ImagePath.Clip />
          </TouchableOpacity>
          <View style={{ width: '85%' }}>
            <TextInput placeholder="Write your message...." style={{ width: '100%', backgroundColor: LGray, borderRadius: scale(10), paddingHorizontal: moderateScale(10), color: Black, }}
              onChangeText={(e) => {
                if (e.length == 1) {
                  setShowSend(true)
                } else if (e.length == 0) {
                  setShowSend(false)
                }
                // inputRef.current = e
                // debounceGetData(e)
                setSendMessage(e)
              }}
              // ref={inputRef}
              // value={inputRef.current}
              value={sendMessage}
            />
            {showSend > 0 ? null : (
              <View style={[MainStyle.flexDesignRow, { position: 'absolute', right: scale(0), top: scale(5), },]}>
                <TouchableOpacity style={{ padding: scale(3) }} onPress={() => { ImagePicker() }}>
                  <ImagePath.Media />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {showSend ? (
          <TouchableOpacity style={{ width: 50, height: 50, backgroundColor: Green, alignItems: 'center', justifyContent: 'center', borderRadius: scale(50), }} onPress={() => { saveChatMessage(sendMessage, user_id, userData.id, +Date.now()), setSendMessage(''), setShowSend(false) }}>
            <ImagePath.Send />
          </TouchableOpacity>)
          : <TouchableOpacity style={{ width: 50, height: 50, backgroundColor: Green, alignItems: 'center', justifyContent: 'center', borderRadius: scale(50), }}
            onLongPress={() => { AudioText() }}
          // onPressOut={this.handlePressOut}
          >
            <ImagePath.Audio />
          </TouchableOpacity>}
      </View>
      <Modal visible={showModal} animationType="fade" onRequestClose={() => { setShowModal(!showModal); }} transparent={true}>
        <View style={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,.3)', }} >
          <View style={[ChatBoxStyle.ModalInnerWrapper]} >
            <View style={[MainStyle.flexDesignRow, { justifyContent: 'flex-start', gap: scale(100), marginBottom: scale(10), },]}>
              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <ImagePath.Close />
              </TouchableOpacity>
              <Text style={{ fontSize: 15, fontWeight: 700 }}>Share Content</Text>
            </View>
            <View>
              <FlatList
                data={ClipData}
                renderItem={({ item }) => {
                  // return <ClipButton item={item} />;
                  return (
                    <TouchableOpacity
                      style={[
                        MainStyle.flexDesignRow,
                        {
                          justifyContent: 'flex-start',
                          gap: scale(10),
                          marginBottom: scale(20),
                        },
                      ]}

                      onPress={() => { item.headTitle == "Camera" ? launchCam() : "" }}
                    >
                      <View
                        style={{
                          padding: 20,
                          backgroundColor: 'lightgray',
                          borderRadius: scale(50),
                        }}
                      >
                        {item.image}
                      </View>
                      <View>
                        <Text style={{ fontSize: scale(15), fontWeight: 600, color: Black }}>{item.headTitle}</Text>
                        <Text style={{ fontSize: scale(12), fontWeight: 600, color: Gray }}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )
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
