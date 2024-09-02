import { useRef, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import JoinAlert from '../../components/notifications/JoinAlert';
import JoinRequest from '../../components/notifications/JoinRequest';
import ValuePostAlert from '../../components/notifications/ValuePostAlert';
import ValueCommentAlert from '../../components/notifications/ValueCommentAlert';
import CommentAlert from '../../components/notifications/CommentAlert';
import PostMentionAlert from '../../components/notifications/PostMentionAlert';
import CommentMentionAlert from '../../components/notifications/CommentMentionAlert';
import ReplyAlert from '../../components/notifications/ReplyAlert';
import BidAlert from '../../components/notifications/BidAlert';
import { alerts } from '../../data';
import { StatusBar } from 'expo-status-bar';
import { RootState } from '../../features/store';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import HashtagBidAlert from '../../components/notifications/HashtagBidAlert';

type Props = {}

const Page = (props: Props) => {
    const [ tabIndex, setTabIndex ] = useState(0)
    const tabRef = useRef<any>();
    const auth = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation<any>()

    const handleTopTabs = (index: number) => {
        setTabIndex(index)
        if (index < 2) {
            tabRef.current?.scrollTo()
        }
        if (index >= 2) {
            tabRef.current?.scrollToEnd()
        }
    }

    return (
        <SafeAreaView className='bg-secondary h-full'>
            <StatusBar style='light' />
            <LinearGradient colors={["transparent", "#141414"]} start={{ x: 0, y: 0.1 }}>
                <View className='px-3 mt-[15px] mb-6 flex-row items-center justify-between'>
                    <Image source={require("../../assets/images/Logo.png")} className='w-7 h-7' />
                    <View className=''>
                        <Text className='text-inverse text-xl font-sansmedium'>Notifications</Text>
                    </View>
                    <View className='w-5'></View>
                </View>
                <View>
                    <ScrollView horizontal className='pl-3 mb-2' showsHorizontalScrollIndicator={false} ref={tabRef}>
                        <View className=''>
                            <TouchableOpacity className={tabIndex == 0 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(0)}>
                                <Text className={tabIndex == 0 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>All</Text>
                            </TouchableOpacity>
                        </View>
                        <View className=''>
                            <TouchableOpacity className={tabIndex == 1 ? 'bg-inverse w-32 rounded-2xl py-3' : 'w-32 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(1)}>
                                <Text className={tabIndex == 1 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Engagements</Text>
                            </TouchableOpacity>
                        </View>
                        <View className=''>
                            <TouchableOpacity className={tabIndex == 2 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(2)}>
                                <Text className={tabIndex == 2 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Account</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mr-8'>
                            <TouchableOpacity className={tabIndex == 3 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(3)}>
                                <Text className={tabIndex == 3 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Transactional</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                {auth.user ? <View className='mt-2'>
                    <FlatList
                        data={alerts}
                        renderItem={({ item }) => (item.type == 1 ? <JoinAlert /> : item.type == 2 ? <JoinRequest /> : 
                        item.type == 3 ? <ValuePostAlert /> :
                        item.type == 4 ? <ValueCommentAlert /> :
                        item.type == 5 ? <CommentAlert /> :
                        item.type == 6 ? <PostMentionAlert /> :
                        item.type == 7 ? <CommentMentionAlert /> :
                        item.type == 8 ? <ReplyAlert /> :
                        item.type == 9 ? <HashtagBidAlert/> : null
                        )}
                        ItemSeparatorComponent={() => <View className='h-8'></View>}
                        ListHeaderComponent={() => <View className='h-4'></View>}
                        ListFooterComponent={() => <View className='h-80'></View>}
                    />
                </View> : <View className='w-full h-4/5 flex-row justify-center items-center'>
                    <View className='items-center w-full space-y-5'>
                        <Text className='text-tertiary text-sm font-sansmedium'>Sign up and start receiving notifications!</Text>
                        <TouchableOpacity className='py-3 w-28 rounded-2xl bg-accent' onPress={() => navigation.navigate("Auth")}>
                            <Text className='text-sm text-center font-sansmedium'>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                {/* <JoinAlert /> */}
                {/* <JoinRequest /> */}
                {/* <ValuePostAlert /> */}
                {/* <ValueCommentAlert /> */}
                {/* <CommentAlert /> */}
                {/* <PostMentionAlert /> */}
                {/* <CommentMentionAlert /> */}
                {/* <ReplyAlert /> */}
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Page