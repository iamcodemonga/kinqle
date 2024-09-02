import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { router } from 'expo-router';

type Props = {
    fullname: string,
    username: string,
    title: string,
    bio: string,
}

const Header = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation<any>()
    const avatar = "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
    const profile_picture = (auth.user ? auth.user.dp ?  `${process.env.EXPO_PUBLIC_STOREURL}${auth.user.dp}?width=200&height=200` : avatar : avatar)
    let titlephrase: string = "none";

    if (auth.user?.titles && auth.user?.titles.length == 3) {
        titlephrase = `${auth.user?.titles[0]}, ${auth.user?.titles[1]} and ${auth.user?.titles[2]}`
    } else if (auth.user?.titles && auth.user?.titles.length == 2) {
        titlephrase = `${auth.user?.titles[0]} and ${auth.user?.titles[1]}`
    } else if (auth.user?.titles && auth.user?.titles.length == 1) {
        titlephrase = `${auth.user?.titles[0]}`
    } else {
        titlephrase = "none";
    }
    return (
        <View className='w-full justify-center items-center my-10'>
            <View className='w-full'>
                <View className='flex-row items-center justify-evenly w-full'>
                    {auth.user ? <TouchableOpacity onPress={() => navigation.navigate("usercelebrities")}>
                        <Text className='text-inverse font-sansbold text-base'>2.07M</Text>
                        <Text className='text-tertiary text-xs text-center font-sansmedium'>creators</Text>
                    </TouchableOpacity> : <View>
                        <Text className='text-inverse font-bold text-base text-center'>0</Text>
                        <Text className='text-tertiary text-xs text-center font-sansmedium'>creators</Text>
                    </View>}
                    <View className='w-[82px] h-[82px] bg-slate-300 rounded-xl flex justify-center items-center'>
                        <Image 
                            source={profile_picture} 
                            className='w-20 h-20 rounded-xl bg-secondary'
                            contentFit="cover"
                            placeholder={""}
                            // transition={1000}
                        />
                    </View>
                    {auth.user ? <TouchableOpacity onPress={() => navigation.navigate("audience")}>
                        <Text className='text-inverse font-sansbold text-base'>95.7M</Text>
                        <Text className='text-tertiary text-xs text-center font-sansmedium'>audience</Text>
                    </TouchableOpacity> : <View>
                        <Text className='text-inverse font-bold text-base text-center font-sansmedium'>0</Text>
                        <Text className='text-tertiary text-xs text-center font-sansmedium'>audience</Text>
                    </View>}
                </View>
                <View className='mt-4 mb-1 flex-row w-full items-center justify-center space-x-1'>
                    <Text className='text-lg font-sansbold text-inverse text-center'>{auth.user ? `@${auth.user.username}` : "---------------"}</Text>
                    {auth.user ? auth.user.verified ? <Ionicons name='checkmark-circle' color="#22B8BD" size={18} /> : null : null}
                </View>
                {auth.user ? auth.user.titles ? <View className='mb-2 flex-row w-full items-center justify-center space-x-1'>
                    <Text className='text-xs text-tertiary text-center font-sansregular'>{titlephrase}</Text>
                </View> : null : null}
                {auth.user ? auth.user.bio ? <View className='my-2 flex-row w-80 self-center items-center justify-center space-x-1'>
                    <Text className='text-sm text-inverse text-center font-sansmedium'>{auth.user.bio}</Text>
                </View> : null : null}
                {auth.user ? <View className='mt-3 w-full flex-row justify-center'>
                    <View className='bg-white/25 flex-row items-center rounded-2xl'>
                        <TouchableOpacity className='px-5 py-0 rounded-2xl flex-row justify-center' onPress={() => router.push({
                            pathname: "/editprofile",
                            params: {
                                // titles: auth.user?.titles
                            }
                        })}>
                            <View className='flex-row items-center'>
                                {/* <Ionicons name="settings-outline" size={16} /> */}
                                <Text className='text-center ml-1 text-sm text-white font-sansmedium'>Edit Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-inverse px-5 py-[16px] rounded-2xl flex-row justify-center hidde' onPress={() => navigation.navigate("flips")}>
                            <View className='flex-row items-center'>
                                <Ionicons name="star-half-outline" size={16} />
                                {/* <Text className='text-center ml-1 text-sm'>Museum</Text> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> : null}
            </View>
        </View>
    )
}

export default Header