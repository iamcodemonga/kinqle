import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store';
import { fetchUser } from '../features/authSlice';
import { updateUserTitles } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router';

type Props = {}

const Page = () => {
    // const { titles } = route.params;
    // const titlestring = auth.user?.titles?.length = 
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>()
    const auth = useSelector((state: RootState) => state.auth)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ titles, setTitles ] = useState<Array<string>>(auth.user?.titles ? auth.user?.titles as string[] : [])
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({
        "Actor": false,
        "Athlete": false,
        "Artiste": false,
        "Blockchain developer": false,
        "Chef": false,
        "Comedian": false,
        "Crypto trader": false,
        "Dancer": false,
        "Data analyst": false,
        "Digital artiste": false,
        "Engineer": false,
        "Entrepreneur": false,
        "Fashion designer": false,
        "Father": false,
        "Financial analyst": false,
        "Fitness coach": false,
        "Foodie": false,
        "Forex trader": false,
        "Gamer": false,
        "Game developer": false,
        "Graphics designer": false,
        "Health practitioner": false,
        "Husband": false,
        "Influencer": false,
        "Journalist": false,
        "Legal practitioner": false,
        "Magician": false,
        "Make-up artiste": false,
        "Mobile developer": false,
        "Model": false,
        "Mother": false,
        "Motivational speaker": false,
        "Movie director": false,
        "Movie producer": false,
        "Musician": false,
        "Music producer": false,
        "Painter": false,
        "Photographer": false,
        "Politician": false,
        "Programmer": false,
        "Racer": false,
        "Realtor": false,
        "Relationship expert": false,
        "Religious leader": false,
        "Scientist": false,
        "Singer": false,
        "Skit maker": false,
        "Software developer": false,
        "Songwriter": false,
        "Sport manager": false,
        "Technologist": false,
        "Therapist": false,
        "Traveller": false,
        "TV personality": false,
        "UI/UX designer": false,
        "Videographer": false,
        "Video streamer": false,
        "Web designer": false,
        "Web developer": false,
        "Wife": false,
        "Writer": false
    });
    const availableTitles = [ "Actor", "Athlete", "Artiste", "Blockchain developer", "Chef", "Comedian", "Crypto trader", "Dancer", "Data analyst", "Digital artiste", "Engineer", "Entrepreneur", "Fashion designer", "Father", "Financial analyst", "Fitness coach", "Foodie", "Forex trader", "Gamer", "Game developer", "Graphics designer", "Health practitioner", "Husband", "Influencer", "Journalist", "Legal practitioner", "Magician", "Make-up artiste", "Mobile developer", "Model", "Mother", "Motivational speaker", "Movie director", "Movie producer", "Musician", "Music producer", "Painter", "Photographer", "Politician", "Programmer", "Racer", "Realtor", "Relationship expert", "Religious leader", "Scientist", "Singer", "Skit maker", "Software developer", "Songwriter", "Sport manager", "Technologist", "Therapist", "Traveller", "TV personality", "UI/UX designer", "Videographer", "Video streamer", "Web designer", "Web developer", "Wife", "Writer" ]

    useEffect(() => {
        // Update checkbox state initially
        const updatedCheckboxStates = { ...checkboxStates };
        for (const item of Object.keys(updatedCheckboxStates)) {
            updatedCheckboxStates[item] = titles.includes(item);
        }
        setCheckboxStates(updatedCheckboxStates);
    }, [titles]);

    const handleCheckboxChange = (label: string, isChecked: boolean) => {
        const updatedCheckboxStates = { ...checkboxStates, [label]: isChecked };
        console.log(label, isChecked);
        setCheckboxStates(updatedCheckboxStates);
        
        if (isChecked) {
            setTitles((prevSelectedItems) => {
                if (prevSelectedItems.length >= 3) {
                    return [...prevSelectedItems]
                } else {
                    return [...prevSelectedItems, label]
                }
            });
        } else {
            setTitles((prevSelectedItems) => prevSelectedItems.filter((item) => item !== label));
        }
    };

    const handleSubmit = async() => {
        setLoading(true)
        try {
            const result = await updateUserTitles(titles, auth.user?.id as string);
            if (result) {
                Toast.show({
                    type: "success",
                    text1: "You updated your title(s) successfully!"
                })
                await dispatch(fetchUser())
                navigation.navigate("editprofile", { titles: JSON.stringify(titles) })
                // navigation.navigate("editprofile", { titles: titles })
                // router.push({
                //     pathname: "/editprofile",
                //     params: {
                //         titles
                //     }
                // })
            } else {
                Toast.show({
                    type: "error",
                    text1: "Could not update title(s)!"
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
                <View className='px-3 pt-3 pb-4 flex-row items-center justify-between w-full'>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <Ionicons name='chevron-back' color="white" size={25}  />
                    </TouchableOpacity>
                    <View className=''>
                        <Text className='text-inverse text-lg font-bold font-sansmedium'>Select Titles</Text>
                    </View>
                    <View className='flex-row'>
                        {titles.length >= 1 ? <TouchableOpacity className={`py-2 px-5 bg-inverse rounded-lg`} onPress={handleSubmit}>
                            <Text className='text-xs font-sansmedium'>save</Text>
                            {/* <Ionicons name='ellipsis-vertical-sharp' size={18} color={"white"} /> */}
                        </TouchableOpacity> : null}
                    </View>
                </View>
                <ScrollView className='space-y-5'>
                    <View className='h-full px-2'>
                        {/* <Text className='text-xl font-bold text-center mb-7 text-inverse'>Select Interests</Text> */}
                        <View className='space-y-3 px-0 mt-2'>
                            {availableTitles ? availableTitles.map((title: string, index: number) => <View className='space-y-2 py-4 px-3 rounded-xl' key={index}>
                                <BouncyCheckbox
                                    isChecked={checkboxStates[title]}
                                    size={30}
                                    fillColor="#22B8BD"
                                    unFillColor="transparent"
                                    textComponent={<Text className='text-inverse ml-3 text-base font-sansregular'>{title}</Text>}
                                    iconStyle={{ borderColor: "#22B8BD" }}
                                    innerIconStyle={{ borderWidth: 1 }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    // isChecked={interests.includes("entertainment") ? true : false}
                                    onPress={(isChecked) => handleCheckboxChange(title, isChecked)}
                                />
                            </View>) : null}
                        </View>
                    </View>
                </ScrollView>
                {loading ? <View className='flex justify-center items-center w-full h-screen absolute top-0 left-0 bg-inverse/10'>
                    <ActivityIndicator />
                </View> : null}
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Page