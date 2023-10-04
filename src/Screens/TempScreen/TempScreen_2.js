import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import MainStyle from '../../Styles/MainStyle'
import { Black, Green, White } from '../../Styles/Color'
import ImagePath from '../../Constant/ImagePath'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import NavigationStrings from '../../Constant/NavigationStrings'
const TempScreen_2 = () => {
    const Navigation = useNavigation()
    return (
        <SafeAreaView style={[MainStyle.MainWrapper, { backgroundColor: White, alignItems: "center" }]}>
            <ImagePath.Splash_3 />
            <Text style={{ fontFamily: "Inter-Bold", fontSize: scale(20), alignSelf: "center", width: "70%", color: Black, textAlign: "center" }}>
                If you are confused about
                what to do just open
                Chatboat app
            </Text>

            <View style={{ position: "absolute", bottom: scale(100), flexDirection: "row", justifyContent: 'space-between', width: "100%", }}>
                <View style={[MainStyle.flexDesignRow, { justifyContent: 'flex-start', gap: scale(5) }]}>
                    <View style={[MainStyle.showButton,]}></View>
                    <View style={[MainStyle.showButton, { backgroundColor: Green }]}></View>
                    <View style={[MainStyle.showButton]}></View>
                </View>
                <TouchableOpacity style={{ backgroundColor: Green, width: scale(50), height: scale(50), justifyContent: "center", alignItems: 'center', borderRadius: scale(50) }} onPress={() => { Navigation.navigate(NavigationStrings.TempScreen_3) }}>
                    <ImagePath.RightArrow />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default TempScreen_2

const styles = StyleSheet.create({})