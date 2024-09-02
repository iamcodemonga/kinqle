import React, { useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/authSlice';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch } from '../../features/store';
import { findUserByNick } from '../../lib/supabase';
import Toast from 'react-native-toast-message';

type Props = {
    loading: boolean
    handleLoader: (pending: boolean) => void
}

type TUser = {
    id: string,
    fullname: string,
    email: string,
    username: string,
    dp?: string,
    title?: string,
    bio?: string,
    private?: boolean,
    ghost?: boolean,
    verified?: boolean
}

const Login = ({ loading, handleLoader }: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>()
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ secure, setSecure ] = useState(true)
    // const [ loading, setLoading ] = useState(false)
    // const usernameRegex = /^([a-zA-Z0-9\-_]+)$/;
    // const emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;

    const handleSecureText = () => {
        if (secure) {
            setSecure(false)
        } else {
            setSecure(true)
        }
        return;
    }

    const handleAuth = async() => {

        if (!username || !password) {
            Toast.show({
                type: "error",
                text1: "Please fill in all fields!",
            })
            return;
        }

        // check for username REGEX
        // if (!usernameRegex.test(username)) {
        //     Toast.show({
        //         type: "error",
        //         text1: "Wrong Username format!",
        //         text2: "username should not contain signs e.g %$#@! etc"
        //     })
        //     return;
        // }

        handleLoader(true)
        try {
            const userInfo = await findUserByNick( username, password)
            if (userInfo) {
                dispatch(registerUser(userInfo as TUser))
                navigation.goBack();
            } else {
                Toast.show({
                    type: "error",
                    text1: "Username or password is incorrect!",
                })
            }
            handleLoader(false)
            return;
        } catch (error) {
            console.log(error);
        }

        handleLoader(false)
        return;
    }

    return (
        // <ScrollView>
            <>
                <View className='h-4/5 w-full flex-row justify-center items-center'>
                    <View className='w-96'>
                        <View className='flex-row items-center justify-center mb-5 space-x-4'>
                            <View>
                                <Image source={require("../../assets/images/Logo.png")} className='w-10 h-10' />
                            </View>
                            <Text className='text-2xl text-inverse font-sansmedium'>Log in</Text>
                        </View>
                        <View className='space-y-6 px-5'>
                            <View className='space-y-2 hidden'>
                                <Text className='text-xs text-inverse ml-1 font-sansregular'>Email address</Text>
                                <TextInput placeholder='e.g johndoe@gmail.com' className='py-3 px-3 bg-secondary rounded-lg border border-secondary focus:border-accent text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='email' placeholderTextColor={"#A5A6A7"} value={email} onChangeText={setEmail} />
                            </View>
                            <View className='space-y-2'>
                                <Text className='text-xs text-inverse ml-1 font-sansregular'>Display name</Text>
                                <TextInput placeholder='e.g john_doe23' className='py-3 px-3 bg-secondary rounded-lg border border-secondary focus:border-accent text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='text' placeholderTextColor={"#A5A6A7"} value={username} onChangeText={setUsername} />
                            </View>
                            <View className='space-y-2'>
                                <Text className='text-xs text-inverse ml-1 font-sansregular'>Password</Text>
                                <View className='bg-secondary rounded-lg flex-row w-full justify-between items-center border border-secondary focus:border-accent'>
                                    <TextInput placeholder='e.g xxxxxxxxxx' className='py-[14px] px-3 flex-1 text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='none' placeholderTextColor={"#A5A6A7"} value={password} onChangeText={setPassword} secureTextEntry={secure} />
                                    <TouchableOpacity className='px-3' onPress={handleSecureText}>
                                        <Ionicons name={secure ? `eye-outline` : `eye-off-outline`} color="white" size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity className='mt-6'>
                            <Text className='text-xs text-inverse text-center font-sansregular'>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View className='px-5 mt-7'>
                            <TouchableOpacity className='py-4 bg-accent rounded-lg' onPress={handleAuth}>
                                <Text className='text-center font-sansmedium'>Let's go</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='flex-row justify-center mt-8 space-x-5'>
                            <TouchableOpacity className='justify-center items-center w-12 h-12 rounded-xl bg-inverse'>
                                <Ionicons name='logo-google' size={20} color={"red"} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity className='w-12 h-12 rounded-xl bg-inverse justify-center items-center'>
                                <Ionicons name='logo-twitter' size={20} color={"#1DA1F2"} />
                            </TouchableOpacity> */}
                             <TouchableOpacity className='w-12 h-12 rounded-xl bg-inverse justify-center items-center'>
                                <Ionicons name='logo-apple' size={20} color={"black"} />
                            </TouchableOpacity>
                            {/*<TouchableOpacity className='w-12 h-12 rounded-xl bg-inverse justify-center items-center'>
                                <Ionicons name='logo-instagram' size={20} color={"purple"} />
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
                {/* {loading ? <View className='bg-inverse/10 h-full absolute w-full flex-row items-center justify-center'>
                    <ActivityIndicator />
                </View> : null}
                {<View className='bg-inverse/10 h- absolute w-full flex-row items-center justify-center'>
                    <ActivityIndicator />
                </View>} */}
            </>
        // </ScrollView>
    )
}

export default Login