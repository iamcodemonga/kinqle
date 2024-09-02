import React, { useState } from 'react'
import { ActivityIndicator, Alert, FlatList, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppDispatch, RootState } from '../features/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logoutUser } from '../features/authSlice';
import { updateLocation, updatePrivacy, updateVisibility } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient'

type Props = {}

const Page = (props: Props) => {
    // const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>()
    const navigation = useNavigation<any>()
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = () => {
        dispatch(logoutUser())
        navigation.goBack();
        return;
    }

    const [ language, setLanguage ] = useState<string | undefined>(auth.user?.language)
    const [ location, setLocation ] = useState<boolean | undefined>(auth.user?.location)
    const [ privacy, setPrivacy ] = useState<boolean | undefined>(auth.user?.private)
    const [ hide, setHide ] = useState<boolean | undefined>(auth.user?.ghost)
    const [ loading, setLoading ] = useState<boolean>(false)

    const handleLocation = async(value: boolean) => {
        setLocation(value);
        setLoading(true)
        try {
            await updateLocation(value, auth.user?.id as string)
            await dispatch(fetchUser())
            setLocation(value)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return;
    }

    const handlePrivacy = async(value: boolean) => {
        setPrivacy(value);
        setLoading(true)
        try {
            await updatePrivacy(value, auth.user?.id as string)
            await dispatch(fetchUser())
            setPrivacy(value)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return;
    }

    const handleVisibility = async(value: boolean) => {
        setHide(value);
        setLoading(true)
        try {
            await updateVisibility(value, auth.user?.id as string)
            await dispatch(fetchUser())
            setHide(value)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return;
    }
   
    return (
        <LinearGradient className="h-full" colors={["#141414", "black"]} start={{ x: 0, y: 0.2 }}>
            <SafeAreaView className='bg-primar h-full'>
                <View className='px-3 py-2 flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' color="white" size={25}  />
                    </TouchableOpacity>
                    <View className=''>
                        <Text className='text-inverse text-lg font-sansbold'>Settings</Text>
                    </View>
                    <View className='w-4'></View>
                </View>
                <ScrollView className='space-y-5'>
                    <View className='space-y-5'>
                        <Text className='text-tertiary text-sm ml-4 mt-10 font-sansregular'>Preferences</Text>
                        <TouchableOpacity className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl' onPress={() => navigation.navigate("changepassword")}>
                            <Text className='text-base text-inverse font-sansmedium'>Change Password</Text>
                            <View className='flex-row items-center'>
                                {/* <Text className='text-tertiary'>Male</Text> */}
                                <Ionicons name='chevron-forward' size={20} color={"#fafafa"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl' onPress={() => navigation.navigate("onboarding/wallet")}>
                            <Text className='text-base text-inverse font-sansmedium'>Wallet</Text>
                            <View className='flex-row items-center'>
                                {/* <Text className='text-tertiary'>Male</Text> */}
                                <Ionicons name='chevron-forward' size={20} color={"#fafafa"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl'>
                            <Text className='text-base text-inverse font-sansmedium'>Language</Text>
                            <View className='flex-row items-center'>
                                <Text className='text-tertiary font-sansregular'>{language}</Text>
                                <Ionicons name='chevron-forward' size={20} color={"#fafafa"} />
                            </View>
                        </TouchableOpacity>
                        <View className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl'>
                            <Text className='text-base text-inverse font-sansmedium'>Location</Text>
                            <View className='flex-row items-center'>
                                <Switch value={location} trackColor={{ false: "transparent", true: "#22B8BD"}} thumbColor={false ? "black" : "white"} onValueChange={(value) => handleLocation(value)}  />
                            </View>
                        </View>
                        {/* <View className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl'>
                            <Text className='text-base text-inverse'>Use wifi</Text>
                            <View className='flex-row items-center'>
                                <Switch value={true} trackColor={{ false: "transparent", true: "#22B8BD"}} thumbColor={false ? "black" : "white"}  />
                            </View>
                        </View> */}
                        <View className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl'>
                            <Text className='text-base text-inverse font-sansmedium'>Private Account</Text>
                            <View className='flex-row items-center'>
                                <Switch value={privacy} trackColor={{ false: "transparent", true: "#22B8BD"}} thumbColor={false ? "black" : "white"} onValueChange={(value) => handlePrivacy(value)}  />
                            </View>
                        </View>
                        <View className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl'>
                            <Text className='text-base text-inverse font-sansmedium'>Ghost account</Text>
                            <View className='flex-row items-center'>
                                <Switch value={hide} trackColor={{ false: "transparent", true: "#22B8BD"}} thumbColor={false ? "black" : "white"} onValueChange={(value) => handleVisibility(value)}  />
                            </View>
                        </View>
                        <TouchableOpacity className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl'>
                            <Text className='text-base text-inverse font-sansmedium'>Blocked creators</Text>
                            <View className='flex-row items-center'>
                                <Text className='text-tertiary font-sansregular'>0</Text>
                                <Ionicons name='chevron-forward' size={20} color={"#fafafa"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className='space-y-5'>
                        <Text className='text-tertiary text-sm ml-4 mt-5 font-sansregular'>Help centre</Text>
                        <TouchableOpacity className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl'>
                            <Text className='text-base text-inverse font-sansmedium'>Contact Us</Text>
                            <View className='flex-row items-center'>
                                {/* <Text className='text-tertiary'>Male</Text> */}
                                <Ionicons name='chevron-forward' size={20} color={"#fafafa"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl'>
                            <Text className='text-base text-inverse font-sansmedium'>Report bug</Text>
                            <View className='flex-row items-center'>
                                {/* <Text className='text-tertiary'>Male</Text> */}
                                <Ionicons name='chevron-forward' size={20} color={"#fafafa"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-row items-center justify-between py-4 bg-secondary mx-3 px-3 rounded-xl mb-40' onPress={() => Alert.alert("Are you sure?", "It's so heartbreaking to see you leave, please don't go", [
                            {
                                text: "Yes",
                                onPress: handleLogout
                            },
                            {
                                text: "No",
                                onPress: () => { console.log("Great!") }
                            }
                        ])}>
                            <Text className='text-base text-red-500 font-sansmedium'>Logout</Text>
                            <View className='flex-row items-center'>
                                {/* <Text className='text-tertiary'>Male</Text> */}
                                <Ionicons name='chevron-forward' size={20} color={"#fafafa"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/* <FlatList
                    data={[{ id: "acvjans"}, { id: "acvjns"}, { id: "acvans"}, { id: "acvjan"}]}
                    renderItem={({ item }) => <CreatorFlat />}
                    ItemSeparatorComponent={() => <View className='h-5'></View>}
                /> */}
                {loading ? <View className='h-screen w-full absolute top-0 left-0 justify-center items-center bg-white/30'>
                    <ActivityIndicator />
                </View> : null}
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Page