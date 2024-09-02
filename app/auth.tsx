// import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ActivityIndicator, Dimensions, StatusBar, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import Timeline from '../components/datalists/Timeline'
// import AudienceTimeline from '../components/datalists/AudienceTimeline'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import PickInterests from '../components/auth/PickInterest'
import { useSelector } from 'react-redux'
import { RootState } from '../features/store'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {}

const Page = (props: Props) => {
    const navigation = useNavigation<any>()
    const auth = useSelector((state: RootState) => state.auth)
    const [ tabIndex, setTabIndex ] = useState<number>(0)
    const [ loading, setLoading ] = useState(false)
    const { width, height } = Dimensions.get("window")

    const handleTopTabs = (index: number) => {
        setTabIndex(index)
    }

    const handleLoader = (value: boolean) => {
        setLoading(value)
        return;
    }

    return (
        <LinearGradient className="h-full" colors={["#202124", "black"]} start={{ x: 0, y: 0.1 }}>
            <SafeAreaView className='bg-primar h-full'>
                {/* <StatusBar style='light' /> */}
                <View className='flex-row justify-between items-center px-3 py-2 mb-2'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={25} color="white" />
                    </TouchableOpacity>
                    {/* <Image source={require("../assets/Logo.png")} className='w-7 h-7' /> */}
                    <View className='flex-row'>
                        <TouchableOpacity className={tabIndex == 0 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(0)}>
                            <Text className={tabIndex == 0 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={tabIndex == 1 ? 'bg-inverse w-28 rounded-2xl py-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(1)}>
                            <Text className={tabIndex == 1 ? "text-center font-sansmedium" : "text-center text-inverse font-sansmedium"}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {tabIndex === 0 && <Register />}
                {tabIndex === 1 && <Login loading={loading} handleLoader={handleLoader} />}
                {tabIndex === 2 && <PickInterests />}
                {/* {loading ? <View className='bg-inverse/10 h-full absolute w-full flex-row items-center justify-center'>
                    <ActivityIndicator />
                </View> : null} */}
                {loading ? <View className='bg-inverse/10 absolute w-full flex-row items-center justify-center' style={{ height: height+Number(StatusBar.currentHeight) }}>
                    <ActivityIndicator />
                </View> : null}
                {/* {<View className='bg-inverse/10 absolute w-full flex-row items-center justify-center' style={{ height: height }}>
                    <ActivityIndicator />
                </View>} */}
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Page