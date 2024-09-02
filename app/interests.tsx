import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store';
import { updateUserInterest } from '../lib/supabase';
import Toast from 'react-native-toast-message';
import { fetchUser } from '../features/authSlice';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router';

type Props = {}

const Page = () => {

    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ interests, setInterest ] = useState<Array<string>>(auth.user?.interests as string[])
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({
        'Entertainment': false,
        'Sports': false,
        'Art and craft': false,
        'Politics': false,
        'Science and technology': false
      });

    useEffect(() => {
        // Update checkbox state initially
        const updatedCheckboxStates = { ...checkboxStates };
        for (const item of Object.keys(updatedCheckboxStates)) {
          updatedCheckboxStates[item] = interests.includes(item);
        }
        setCheckboxStates(updatedCheckboxStates);
      }, [interests]);

    const handleCheckboxChange = (label: string, isChecked: boolean) => {
        const updatedCheckboxStates = { ...checkboxStates, [label]: isChecked };
        setCheckboxStates(updatedCheckboxStates);
        
        if (isChecked) {
            setInterest((prevSelectedItems) => {
                if (prevSelectedItems.length >= 3) {
                    // Alert.alert("Limit reached", "You can only choose three of your interest")
                    return [...prevSelectedItems]
                } else {
                    return [...prevSelectedItems, label]
                }
            });
        } else {
            setInterest((prevSelectedItems) => prevSelectedItems.filter((item) => item !== label));
        }
    };

    const handleSubmit = async() => {
        setLoading(true)
        try {
            const result = await updateUserInterest(interests, auth.user?.id as string);
            if (result) {
                Toast.show({
                    type: "success",
                    text1: "Interests update was successful",
                })
                await dispatch(fetchUser())
                // navigation.goBack()
                navigation.navigate("editprofile", { interests: JSON.stringify(interests) })
            } else {
                Toast.show({
                    type: "error",
                    text1: "Could not update interests!"
                })
            }
            setLoading(false)
            return;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LinearGradient className="h-full" colors={["#141414", "black"]} start={{ x: 0.9, y: 0.2 }}>
            <SafeAreaView className='bg-secondar h-full'>
                <View className='px-3 py-3 flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <Ionicons name='chevron-back' color="white" size={25}  />
                    </TouchableOpacity>
                    {interests.length >= 3 ? <View className='flex-row'>
                        <TouchableOpacity className={`py-2 px-5 bg-inverse rounded-lg`} onPress={handleSubmit}>
                            <Text className='text-xs font-sansmedium'>save</Text>
                            {/* <Ionicons name='ellipsis-vertical-sharp' size={18} color={"white"} /> */}
                        </TouchableOpacity>
                    </View> : null}
                </View>
                <View className='h-4/5 w-full flex-row justify-center items-center'>
                    <View className='w-96'>
                        <View className='flex-row items-center justify-center mb-10 space-x-4'>
                            <Text className='text-xl text-inverse font-sansmedium'>Select (3) of your Interests</Text>
                        </View>
                        <View className='space-y-6 px-5'>
                            <View className='space-y-2 bg-secondary/90 py-4 px-3 rounded-xl'>
                                <BouncyCheckbox
                                    isChecked={checkboxStates['Entertainment']}
                                    size={30}
                                    fillColor="#22B8BD"
                                    unFillColor="transparent"
                                    textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Entertainment</Text>}
                                    iconStyle={{ borderColor: "#22B8BD" }}
                                    innerIconStyle={{ borderWidth: 1 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    // isChecked={interests.includes("entertainment") ? true : false}
                                    onPress={(isChecked) => handleCheckboxChange('Entertainment', isChecked)}
                                />
                            </View>
                            <View className='space-y-2 bg-secondary/90 py-4 px-3 rounded-xl'>
                                <BouncyCheckbox
                                    isChecked={checkboxStates['Art and craft']}
                                    size={30}
                                    fillColor="#22B8BD"
                                    unFillColor="transparent"
                                    textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Art and Craft</Text>}
                                    iconStyle={{ borderColor: "#22B8BD" }}
                                    innerIconStyle={{ borderWidth: 1 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    // isChecked={interests.includes("art and craft") ? true : false}
                                    // isChecked={false}
                                    onPress={(isChecked) => handleCheckboxChange('Art and craft', isChecked)}
                                />
                            </View>
                            <View className='space-y-2 bg-secondary/90 py-4 px-3 rounded-xl'>
                                <BouncyCheckbox
                                    isChecked={checkboxStates['Sports']}
                                    size={30}
                                    fillColor="#22B8BD"
                                    unFillColor="transparent"
                                    textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Sport</Text>}
                                    iconStyle={{ borderColor: "#22B8BD" }}
                                    innerIconStyle={{ borderWidth: 1 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    // isChecked={interests.includes("sport") ? true : false}
                                    onPress={(isChecked) => handleCheckboxChange('Sports', isChecked)}
                                />
                            </View>
                            <View className='space-y-2 bg-secondary/90 py-4 px-3 rounded-xl'>
                                <BouncyCheckbox
                                    isChecked={checkboxStates['Science and technology']}
                                    size={30}
                                    fillColor="#22B8BD"
                                    unFillColor="transparent"
                                    textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Science and Technology</Text>}
                                    iconStyle={{ borderColor: "#22B8BD" }}
                                    innerIconStyle={{ borderWidth: 1 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    // isChecked={interests.includes("science and technology") ? true : false}
                                    onPress={(isChecked) => handleCheckboxChange('Science and technology', isChecked)}
                                />
                            </View>
                            <View className='space-y-2 bg-secondary/90 py-4 px-3 rounded-xl'>
                                <BouncyCheckbox
                                    isChecked={checkboxStates['Politics']}
                                    size={30}
                                    fillColor="#22B8BD"
                                    unFillColor="transparent"
                                    textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Politics</Text>}
                                    iconStyle={{ borderColor: "#22B8BD" }}
                                    innerIconStyle={{ borderWidth: 1 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    // isChecked={interests.includes("politics") ? true : false}
                                    onPress={(isChecked) => handleCheckboxChange('Politics', isChecked)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {loading ? <View className='flex justify-center items-center w-full h-screen absolute top-0 left-0 bg-inverse/10'>
                    <ActivityIndicator />
                </View> : null}
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Page