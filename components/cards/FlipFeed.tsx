import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View, Dimensions, StatusBar, Platform, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
// import LoaderKit from 'react-native-loader-kit'


type Props = {
    activePostId: number;
    item: {
        id: number,
        thumbnail: string,
        blurhash: string,
        url: string,
        description: string
        creators: {
            id: string,
            dp: string,
            username: string,
            verified: boolean,
            ghost?: boolean,
            private?: boolean,
            titles?: Array<string>
        }
    }
}

const FlipFeed = ({ activePostId, item }: Props) => {
    const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>()
    const video = useRef<Video>(null)
    const [ status, setStatus ] = useState<AVPlaybackStatus>()
    const isPlaying = status?.isLoaded && status.isPlaying;
    const isBuffering = status?.isLoaded && status.isBuffering;
    const { width, height } = Dimensions.get("window")
    const avatar = "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
    const profile_picture = (item.creators.dp ?  `${process.env.EXPO_PUBLIC_STOREURL}${item.creators.dp}?width=200&height=200` : avatar)

    useEffect(() => {
        if (!video.current) {
            return;
        }
        if (activePostId !== item.id) {
            video.current?.pauseAsync()
        }
        if (activePostId === item.id) {
            video.current?.playAsync()
        }
    }, [activePostId, video.current])

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            video.current?.pauseAsync()
          });
          return unsubscribe;
    }, [navigation, video.current])

    const handlePlay = () => {
        if (!video.current) {
            return console.log("no video played");
        }
        if (isPlaying) {
            video.current.pauseAsync();
        } else {
            video.current.playAsync();
        }
    }

    return (
        <View className='' style={{ height, justifyContent: "center", alignItems: "center" }}>
            <Video
                source={{ uri: `${item.url}` }}
                resizeMode={ResizeMode.COVER}
                className='w-full h-full'
                // style={{ height, }}
                ref={video}
                isLooping
                usePoster
                PosterComponent={() => <Image 
                    source={item.thumbnail} 
                    className='w-full h-full bg-secondary'
                    contentFit="cover"
                    placeholder={"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["}
                    transition={1000}
                />}
                onPlaybackStatusUpdate={setStatus}
            />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} className='w-full h-full absolute'>
                <SafeAreaView className='h-full w-full justify-between'>
                    <View className={`flex-row items-center justify-between ${Platform.OS === "android" ? "-mt-5 px-4" : " py-2 px-4"}`}>
                        <View className='flex-row items-center'>
                            <TouchableOpacity className='flex-row' onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back' color={"white"} size={25} />
                            </TouchableOpacity>
                            <View className='flex-row space-x-2'>
                            </View>
                        </View>
                        <TouchableOpacity className='bg-inverse backdrop-blur-lg py-[13] px-5 rounded-xl'>
                            <Text className='text-xs'>Place Bid</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className='w-full h-1/2 justify-center items-center' onPress={handlePlay}>
                        {!isPlaying && <Ionicons name='play-outline' size={40} color="white" />}
                    </TouchableOpacity>
                    <View className='w-full h-32 justify-end items-center pb-5'>
                        <View className='w-4/5 mb-3 bg-white/10 py-3 px-5 rounded-xl'>
                            <View className='flex-row items-center mb-2 space-x-1'>
                                <TouchableOpacity className='w-[22px] h-[22px] bg-slate-300 rounded-lg flex justify-center items-center mr-1'>
                                    <Image 
                                        source={profile_picture} 
                                        className='w-5 h-5 rounded-lg bg-secondary'
                                        contentFit="cover"
                                        placeholder={""}
                                        transition={1000}
                                    />
                                </TouchableOpacity>
                                <Text className='text-white font-bold'>{item.creators.username}</Text>
                                {item.creators.verified ? <Ionicons name='checkmark-circle' color="#22B8BD" size={18} /> : null}
                            </View>
                            <Text className='text-slate-200'>{item.description}</Text>
                        </View>
                        <View className='flex-row items-center space-x-6'>
                            <TouchableOpacity className='space-y-1 items-center'>
                                <View className='bg-inverse/25 backdrop-blur-lg py-2 px-3 rounded-full w-12 h-12 justify-center items-center'>
                                    <Ionicons name='chatbubble' size={20} color="white" />
                                </View>
                                <Text className='text-xs text-white'>285k</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='space-y-1 items-center'>
                                <View className='bg-accent backdrop-blur-lg py-2 px-3 rounded-full w-16 h-16 justify-center items-center'>
                                    <Ionicons name='heart' size={25} color="white" />
                                </View>
                                <Text className='text-xs text-white'>2.65M</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='space-y-1 items-center'>
                                <View className='bg-inverse/25 backdrop-blur-lg py-2 px-3 rounded-full w-12 h-12 justify-center items-center'>
                                    <Ionicons name='ellipsis-horizontal' size={20} color="white" />
                                </View>
                                <Text className='text-xs text-white'>options</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    )
}

export default FlipFeed