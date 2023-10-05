import {StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, StatusBar, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState, memo} from 'react';
import MainStyle from '../../Styles/MainStyle';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {White, Black, DGray, LGray} from '../../Styles/Color';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import ImagePath from '../../Constant/ImagePath';
import {$crud} from '../../CRUDFactory/Crud';
import {Image} from 'react-native';
import NavigationStrings from '../../Constant/NavigationStrings';
const Search = () => {
  const {height} = Dimensions.get('window');
  const Navigation = useNavigation();
  let theme = useSelector((state) => state.theme.theme);
  const [lenght, setlenght] = useState(0);
  const [value, setValue] = useState('');
  const [userData, setUserData] = useState([]);
  const getData = (value) => {
    const data = value;
    $crud
      .retrieve('/retrieve/debounce-user', {value: data})
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        // console.log("Error occur when category retrieve ", err)
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
  return (
    <SafeAreaView
      style={[
        MainStyle.MainWrapper,
        {
          backgroundColor: theme == 'dark' ? Black : White,
          padding: verticalScale(6),
          height: height,
        },
      ]}
    >
      <StatusBar backgroundColor={theme == 'dark' ? Black : White} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
      <View>
        <TextInput
          placeholder="Search"
          style={[styles.Input, {backgroundColor: LGray, color: Black}]}
          onChangeText={(e) => {
            setlenght(e.length), setValue(e), debounceGetData(e);
          }}
          placeholderTextColor={Black}
          value={value}
        />
        <View
          style={{
            position: 'absolute',
            paddingVertical: verticalScale(12),
            paddingHorizontal: verticalScale(10),
          }}
        >
          <ImagePath.SearchBlack style={{tintColor: 'red'}} />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            paddingVertical: verticalScale(11),
            paddingHorizontal: verticalScale(10),
            right: 0,
            backgroundColor: LGray,
            display: lenght == 0 ? 'none' : 'flex',
          }}
          onPress={() => {
            setValue(''), setlenght(0), setUserData([]);
          }}
        >
          <ImagePath.Close />
        </TouchableOpacity>
      </View>
      {userData.length == 0 ? (
        <Text
          style={{
            fontSize: scale(15),
            color: theme == 'dark' ? White : Black,
            textAlign: 'center',
            marginTop: moderateScale(20),
          }}
        >
          No result found
        </Text>
      ) : (
        <ScrollView>
          {userData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  MainStyle.flexDesignRow,
                  {
                    paddingVertical: verticalScale(5),
                    justifyContent: 'flex-start',
                    gap: scale(10),
                  },
                ]}
                onPress={() =>
                  Navigation.navigate(NavigationStrings.USERPROFILE, {
                    data: item,
                  })
                }
              >
                <View
                  style={{
                    width: scale(60),
                    height: scale(60),
                    padding: verticalScale(2),
                    borderRadius: scale(100),
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{uri: item.photoUrl}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: scale(100),
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: scale(13),
                      color: theme == 'dark' ? White : Black,
                    }}
                  >
                    rohit_123_roy
                  </Text>
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: scale(12),
                      color: DGray,
                    }}
                  >
                    {item.fullName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default memo(Search);

const styles = StyleSheet.create({
  Input: {
    borderRadius: scale(5),
    fontSize: 15,
    paddingLeft: verticalScale(40),
    paddingVertical: scale(10),
  },
});
