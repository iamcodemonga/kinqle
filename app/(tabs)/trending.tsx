import { FlatList, Image, ScrollView,Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRef, useState } from 'react'
import TrendingTags from '../../components/datalist/TrendingTags'
// import TrendTile from '../components/Tiles/TrendTile'
import TrendingCartegories from '../../components/datalist/TrendingCategories'
import TrendsForYou from '../../components/datalist/TrendsForYou'
import TrendingCreators from '../../components/datalist/TrendingCreators'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/store'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {}

const Trending = (props: Props) => {

    const [ tabIndex, setTabIndex ] = useState(0)
    const tabRef = useRef<any>();
    const navigation = useNavigation<any>()
    const auth = useSelector((state: RootState) => state.auth)

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
                <View className='px-3 py-2 mb-3 flex-row items-center'>
                    <Image source={require("../../assets/images/Logo.png")} className='w-7 h-7' />
                    <View className='ml-3 mr-7 flex-row justify-center items-center'>
                        <TouchableOpacity className=' py-4 rounded-xl px-5 w-full bg-white/5 borde-[0.5px] border-gray-500 flex-row items-center justify-center' onPress={() => navigation.navigate("Search")}>
                            <Text className='text-tertiary font-sansmedium text-center'>Search creators...</Text>
                            {/* <Ionicons name='search-outline' color="gray" size={20}  /> */}
                        </TouchableOpacity>
                    </View>
                </View>
                <View className=''>
                    <ScrollView horizontal className='pl-3' showsHorizontalScrollIndicator={false} ref={tabRef}>
                        <View className=''>
                            <TouchableOpacity className={tabIndex == 0 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(0)}>
                                <Text className={tabIndex == 0 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>For you</Text>
                            </TouchableOpacity>
                        </View>
                        <View className=''>
                            <TouchableOpacity className={tabIndex == 1 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(1)}>
                                <Text className={tabIndex == 1 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Hashtags</Text>
                            </TouchableOpacity>
                        </View>
                        <View className=''>
                            <TouchableOpacity className={tabIndex == 2 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(2)}>
                                <Text className={tabIndex == 2 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Categories</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mr-8'>
                            <TouchableOpacity className={tabIndex == 3 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(3)}>
                                <Text className={tabIndex == 3 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Creators</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                {tabIndex === 0 && <TrendsForYou />}
                {tabIndex === 1 && <TrendingTags />}
                {tabIndex === 2 && <TrendingCartegories />}
                {tabIndex === 3 && <TrendingCreators />}
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Trending