import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Image } from 'expo-image'
import { updateUserCountry } from '../lib/supabase';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store';
import Toast from 'react-native-toast-message';
import { fetchUser } from '../features/authSlice';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router';

type Props = {}

const Page = () => {

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth)
    const [ countryList, setCountryList ] = useState<Array<{
        name: string,
        flag: string
      }> | null>(null)
      const navigation = useNavigation<any>()
    const [ loading, setLoading ] = useState<boolean>(true)

    const fetchCountries = async() =>  {
        setLoading(true)
        try {
          const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
          const data = await response.json();
          // Map countries to an array containing name and flag image URL
          const countries = data.map((nation: any) => ({
            name: nation.name.common,
            flag: nation.flags.png
          }));

          setLoading(false)
          setCountryList(countries)
          return countries;
        } catch (error) {
          console.error('Error fetching countries:', error);
          return [];
        }
    }

    useEffect(() => {
        fetchCountries();
    }, [])

    const handleSelectCountry = async(place: string) => {
        setLoading(true)
        try {
            const result = await updateUserCountry(place, auth.user?.id as string);
            if (result) {
                Toast.show({
                    type: "success",
                    text1: "Country update was successful"
                })
                await dispatch(fetchUser())
                navigation.navigate("editprofile", { country: place })
            } else {
                Toast.show({
                    type: "error",
                    text1: "An error occurred",
                    text2: "Could not update portfolio!"
                })
            }
            setLoading(false)
            return;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LinearGradient className="h-full" colors={["#202124", "black"]} start={{ x: 0, y: 0.2 }}>
            <SafeAreaView className='bg-primar h-full'>
                <View className='px-3 py-2 flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <Ionicons name='chevron-back' color="white" size={25}  />
                    </TouchableOpacity>
                    <View className=''>
                        <Text className='text-inverse text-lg font-sansbold'>Select Country</Text>
                    </View>
                    <View className='w-4'></View>
                </View>
                {countryList ?<ScrollView className='space-y-5'>
                    <View className='h-full px-5 my-7 space-y-5'>
                        {countryList ? countryList.length > 0 ? countryList.map((list, index) => <TouchableOpacity className='flex-row items-center justify-between space-x-2' key={index} onPress={() => handleSelectCountry(list.name)}>
                            <Text className='text-inverse text-lg font-sansmedium'>{list.name}</Text>
                            <Image 
                                source={list.flag} 
                                className='w-10 h-10'
                                contentFit="contain"
                                placeholder={""}
                                transition={1000}
                            />
                        </TouchableOpacity>) : null : null}
                        {/* <TouchableOpacity className='flex-row items-center justify-between space-x-2'>
                            <Text className='text-inverse text-lg'>Maldova</Text>
                            <Image 
                                source={"https://flagcdn.com/w320/md.png"} 
                                className='w-10 h-10'
                                contentFit="contain"
                                placeholder={""}
                                transition={1000}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-row items-center justify-between space-x-2'>
                            <Text className='text-inverse text-lg'>Maldova</Text>
                            <Image 
                                source={"https://flagcdn.com/w320/md.png"} 
                                className='w-10 h-10'
                                contentFit="contain"
                                placeholder={""}
                                transition={1000}
                            />
                        </TouchableOpacity> */}
                    </View>
                </ScrollView> : null}
                {loading ? <View className='flex justify-center items-center w-full h-screen absolute top-0 left-0 bg-inverse/10'>
                    <ActivityIndicator />
                </View> : null}
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Page