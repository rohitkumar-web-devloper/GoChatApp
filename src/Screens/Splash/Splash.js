import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import NavigationStrings from '../../Constant/NavigationStrings'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = (props) => {
    const Navigation = useNavigation()
    const AuthCheck = async () => {
        const token = await AsyncStorage.getItem("Token")
        if (token) {
            setTimeout(() => {
                props.navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Home' }
                    ]
                })
            }, 2000)
        } else {
            setTimeout(() => {
                props.navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Login' }
                    ]
                })
            }, 2000)
            setTimeout(() => {
                Navigation.navigate(NavigationStrings.TempScreen_1)
            }, 3000)
        }
    }

    useEffect(() => {
        AuthCheck()
    }, [])
    useEffect(() => {
        setTimeout(() => {
            Navigation.navigate(NavigationStrings.TempScreen_1)
        }, 2000)
    }, [])
    return (
        <View>
            <Text>Splash</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({})