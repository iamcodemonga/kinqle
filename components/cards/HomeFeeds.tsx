import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image';
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TContent } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
// import LoaderKit from 'react-native-loader-kit'

const HomeFeeds = ({ activePostId, item }: { activePostId: string, item: TContent }) => {
    const navigation = useNavigation<any>()
    const video = useRef<Video>(null)
    const [ status, setStatus ] = useState<AVPlaybackStatus>()
    const isPlaying = status?.isLoaded && status.isPlaying;
    const isBuffering = status?.isLoaded && status.isBuffering;

    const avatar = "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
    // const profile_picture = ()

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

    function formatTimeDifference(timestamp: string) {
        const currentDate: any = new Date();
        const inputDateTime: any = new Date(timestamp);
        const difference = currentDate - inputDateTime;
    
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(difference / (1000 * 60));
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
    
        if (seconds >= 1 && seconds < 60) {
            return "now";
        } else if (minutes >= 1 && minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours >= 1 && hours < 24) {
            return `${hours} hours ago`;
        } else if (hours >= 25 && hours < 48) {
            return "yesterday";
        } else if (days >= 2 && days <= 7) {
            return `${days} days ago`;
        } else if (weeks >= 1 && weeks <= 3) {
            return `${weeks} weeks ago`;
        } else if (days >= 28 && days < 30) {
            return "1 month ago";
        } else {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[inputDateTime.getMonth()];
            const year = inputDateTime.getFullYear();
            return `${month}-${year}`;
        }
    }

  return (
        <View className='mx-2'>
            <View>
                {item.type === "video" ? <Video
                    source={{ uri: `${item.url}` }}
                    resizeMode={ResizeMode.COVER}
                    className='w-full aspect-[2/3] rounded-2xl'
                    ref={video}
                    isLooping
                    usePoster
                    PosterComponent={() => <Image 
                        source={item.thumbnail} 
                        className='w-full h-full rounded-xl bg-secondary'
                        contentFit="cover"
                        placeholder={item.blurhash}
                        transition={1000}
                    />}
                    onPlaybackStatusUpdate={setStatus}
                /> :
                <Image 
                    source={`${item.url}`} 
                    className='w-full aspect-[2/3] rounded-2xl'
                    contentFit="cover"
                    placeholder={""}
                    transition={1000}
                />}
                <View className='absolute bg-secondary/30 h-full left-0 rounded-2xl top-0 py-4 px-4 flex justify-between w-full'>
                    <View className='flex-row items-center justify-between w-full'>
                            <TouchableOpacity className='w-[34px] h-[34px] flex justify-center items-center'>
                                <LinearGradient colors={["#22B8BD", "green"]} style={{ padding: 1}} start={{ x: 0.2, y: 0 }} className='rounded-xl'>
                                    <Image 
                                        source={item.creators?.dp ?  `${process.env.EXPO_PUBLIC_STOREURL}${item.creators.dp}?width=200&height=200` : avatar} 
                                        className='w-8 h-8 rounded-xl bg-secondary'
                                        contentFit="cover"
                                        placeholder={item.blurhash}
                                        transition={1000}
                                    />
                                    {item.creators?.verified ? <View className='absolute -bottom-1 -right-2'>
                                        <Ionicons name='checkmark-circle' color="#22B8BD" size={18} />
                                    </View> : null}
                                </LinearGradient>
                            </TouchableOpacity>
                        <View className='flex-row space-x-2 items-center'>
                            <TouchableOpacity className='' activeOpacity={0.5}>
                                <LinearGradient colors={["#22B8BD", "cyan"]} style={{}} start={{ x: 0, y: 0.2 }} className='py-3 px-7 rounded-2xl'>
                                    <Text className='font-sansmedium'>Join</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-inverse/20 backdrop-blur-lg py-3 px-4 rounded-2xl' activeOpacity={0.5}>
                                <Ionicons name='ellipsis-vertical' size={17} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {item.type === "video" ? <TouchableOpacity className='h-80 w-full flex-row justify-center items-center' onPress={handlePlay}>
                        {!isPlaying && <Ionicons name='play-outline' size={40} color="white" />}
                    </TouchableOpacity> : null}
                    <View className='flex-row justify-between items-end'>
                        <View className=''>
                            {/* <LoaderKit style={{ width: 50, height: 50 }} name={'BallPulse'} color={'red'} /> */}
                            {isBuffering && <ActivityIndicator />}
                        </View>
                        <TouchableOpacity className='flex items-center'>
                            <Ionicons name='chevron-up-outline' size={20} color="white" />
                            <Text className='text-inverse text-xs font-sansmedium'>Comments (273k)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-inverse/20 rounded-2xl'>
                            <BlurView intensity={20} tint="light" className='w-14 h-14 rounded-2xl overflow-hidden justify-center items-center'>
                                <Ionicons name='heart' size={22} color="white" />
                            </BlurView>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <View className='flex-row justify-between px-1 mt-3 w-full items-center'>
                    <View>
                        <TouchableOpacity onPress={() => navigation.jumpTo("Me")}>
                            <Text className='text-accent mb-1 text-lg font-sansbold'>@{item.creators?.username}</Text>
                        </TouchableOpacity>
                        <Text className='text-tertiary text-[10px] font-sansregular'>{(item.creators?.titles ? item.creators.titles.length == 3 ? `${item.creators.titles[0]}, ${item.creators.titles[1]} and ${item.creators.titles[2]}` : item.creators.titles.length == 2 ? `${item.creators.titles[0]} and ${item.creators.titles[1]}` : item.creators.titles.length == 1 ? `${item.creators.titles[0]}` : null : null)}</Text>
                    </View>
                    <Text className='text-[10px] text-tertiary font-sansregular'>{formatTimeDifference(item.created_at as string)}</Text>
                </View>
                <View className='px-1 mt-2'>
                    <Text className='text-sm text-inverse font-sansmedium' numberOfLines={2}>{item.description}</Text>
                </View>
                <View className='px-1 mt-4 flex-row flex-wrap w-full'>
                    {(item.hashtags?.length as number) > 0 ? item.hashtags?.map((tag, index) => <TouchableOpacity className='bg-secondary px-2 py-1 rounded-lg mr-2 mb-2 border border-accent/30' key={index}>
                        <Text className='text-inverse text-cente font-sansmedium text-xs'>{tag}</Text>
                    </TouchableOpacity>) : null}
                </View>
            </View>
        </View>
  )
}

export default HomeFeeds