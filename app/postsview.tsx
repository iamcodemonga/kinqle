import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View, ViewToken, useWindowDimensions } from 'react-native'
import { audiencedata, stagedata } from '../data'
// import TimeLineFeed from '../components/cards/StageFeed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Timeline from '../components/Timeline'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
    tabIndex: number
}

const Page = () => {
    const [ data, setData ] = useState<any>([])
    const [ activePostId, setActivePostId ] = useState<number>(audiencedata[0].id)
    const [ loading, setLoading] = useState(false)
    const navigation = useNavigation<any>()

    const loadData = () => {
        setLoading(true)
        setTimeout(() => {
            setData(stagedata)
            setLoading(false)
        }, 3000);
    }

    useEffect(() => {
        loadData()
    }, [])

    const { width } = useWindowDimensions()

    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig: { itemVisiblePercentThreshold: 50 },
            onViewableItemsChanged: ({ changed, viewableItems }: { changed: ViewToken[], viewableItems: ViewToken[] }) => {
                if (viewableItems.length > 0 && viewableItems[0].isViewable) {
                    setActivePostId(viewableItems[0].item.id)
                }
            }
        }
    ]);

    return (
        <LinearGradient className="h-full" colors={["#202124", "black"]} start={{ x: 0, y: 0.2 }}>
            <View style={{ width: width }}>
                {loading ? 
                <SafeAreaView className='bg-primar h-full justify-center'>
                    <ActivityIndicator />
                </SafeAreaView> : 
                <SafeAreaView className='bg-primar h-full'>
                    <View className='flex-row items-center justify-between px-2 py-2'>
                        <TouchableOpacity className='flex-row' onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={30} color={"white"} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View className='h-3'></View>
                        <Timeline />
                        {/* <TimeLineFeed item={{
                            id: 7,
                            thumbnail: "https://images.pexels.com/photos/19696764/pexels-photo-19696764/free-photo-of-young-woman-in-a-white-shirt-showing-her-hand.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
                            blurhash: "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[",
                            url: "https://videos.pexels.com/video-files/7551526/7551526-sd_540_960_30fps.mp4"
                        }} activePostId={activePostId} /> */}
                        <View className='h-20'></View>
                    </ScrollView>
                </SafeAreaView>}
            </View>
        </LinearGradient>
    )
}

export default Page