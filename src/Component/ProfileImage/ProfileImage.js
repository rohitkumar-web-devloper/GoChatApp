import { View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import ImagePath from '../../Constant/ImagePath';
import ProfileImageStyle from './ProFileImageStayle';
import { scale } from 'react-native-size-matters';
const ProfileImage = ({ widthValue, heightValue, imageUrl }) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          ProfileImageStyle.profileWrapper,
          {
            width: scale(widthValue),
            height: scale(heightValue),
            borderWidth: 0,
          },
        ]}
      >
        <Image source={{ uri: imageUrl }} style={ProfileImageStyle.ProfileImage} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;
