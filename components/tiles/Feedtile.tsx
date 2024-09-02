import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Image } from "expo-image"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

type Props = {}

const FeedTile = (props: Props) => {

    const navigation =  useNavigation<any>()
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <TouchableOpacity className='w-[100px]' activeOpacity={0.5} onPress={() => navigation.navigate("Flips")}>
            <View>
                <Image 
                    source="https://images.pexels.com/photos/20866152/pexels-photo-20866152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    className='w-full aspect-[2/3] rounded-xl'
                    contentFit="cover"
                    placeholder={blurhash}
                    transition={1000}
                />
                {/* <Image source={{ uri: "https://images.pexels.com/photos/20866152/pexels-photo-20866152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }} className='w-full h-40 rounded-2xl' /> */}
                <View className='absolute flex h-full w-full justify-between items-end bg-secondary/30 rounded-xl'>
                    <View className='flex-row items-center bg-black/30 px-2 py-1 space-x-1 rounded-lg mt-2 mr-2'>
                        <Ionicons name='play' color="#22B8BD" size={12} />
                        <Text className='text-inverse text-[10px] font-sansmedium'>173</Text>
                    </View>
                    <View className='px-1 mb-3'>
                        <Text className='text-[12px] text-white font-sansmedium' numberOfLines={2} >I attempted skateboarding in atlanta, Giorgia</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default FeedTile