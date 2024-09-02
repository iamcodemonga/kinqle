import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Timeline from '../../components/Timeline'
// import AudienceTimeline from '../../components/datalists/AudienceTimeline'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/store'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {}

const Page = (props: Props) => {
    const [ tabIndex, setTabIndex ] = useState<number>(0)
    const auth = useSelector((state: RootState) => state.auth)

    const handleTopTabs = (index: number) => {
        setTabIndex(index)
    }

    return (
        <SafeAreaView className='h-full bg-secondary'>
            <StatusBar style='light' />
            <LinearGradient colors={["transparent", "#141414"]} start={{ x: 0, y: 0.1 }}>
                <View className='flex-row justify-between items-center px-3 py-2 mb-2'>
                    <Image source={require("../../assets/images/Logo.png")} className='w-7 h-7' />
                    <View className='flex-row'>
                        <TouchableOpacity className={tabIndex == 0 ? 'bg-inverse w-24 rounded-2xl py-3' : 'w-24 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(0)}>
                            <Text className={tabIndex == 0 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Joined</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={tabIndex == 1 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(1)}>
                            <Text className={tabIndex == 1 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Audience</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {tabIndex === 0 && <Timeline />}
                {tabIndex === 1 && <Timeline />}
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Page