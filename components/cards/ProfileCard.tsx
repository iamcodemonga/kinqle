import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

type Props = {
    fulldata: any,
    item: ItemProp,
    index: number
}

type ItemProp = {
    id: number,
    dp: string,
    username: string,
    type: string,
    url: string,
    thumbnail: string | null,
    title: string,
    verified: boolean
}

const ProfileCard = ({ fulldata, item, index }: Props) => {
    const isEven = index%2 == 0
    const navigation = useNavigation<any>()
    return (
        <TouchableOpacity className={`w-full flex mb-[10px] ${isEven ? "pr-[5px]" : "pl-[5px]"}`} activeOpacity={0.5} onPress={() => navigation.navigate("Flips", { fulldata, index })}>
            <View>
                <Image 
                    source={item.type == "photo" ? item.url : item.thumbnail as string} 
                    className={`${item.type=="photo" ? "aspect-[4/5]" : "aspect-[9/16]"} w-full rounded-md`}
                    contentFit="cover"
                    placeholder={"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["}
                    transition={1000}
                />
                <View className='absolute flex h-full w-full justify-start items-end pr-3 bg-secondary/30 rounded-md pt-3'>
                    {item.type == "video" ? <View className='flex-row items-center bg-black/30 px-3 py-1 space-x-1 rounded-md'>
                        <Ionicons name='play' color="#22B8BD" size={13} />
                        <Text className='text-inverse text-xs font-sansmedium'>173</Text>
                    </View> : null}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileCard