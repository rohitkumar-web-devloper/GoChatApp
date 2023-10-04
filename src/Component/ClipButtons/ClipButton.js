import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import MainStyle from '../../Styles/MainStyle';
import { Black, Gray, White } from '../../Styles/Color';

const ClipButton = ({ item }) => {
  return (
    <TouchableOpacity
      style={[MainStyle.flexDesignRow, { justifyContent: 'flex-start', gap: scale(10), marginBottom: scale(20) },]}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'lightgray',
          borderRadius: scale(50),
        }}>
        {item.image}
      </View>
      <View>
        <Text style={{ fontSize: scale(15), fontWeight: 600, color: Black }}>
          {item.headTitle}
        </Text>
        <Text style={{ fontSize: scale(12), fontWeight: 600, color: Gray }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClipButton;

const styles = StyleSheet.create({

});
