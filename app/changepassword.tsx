import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import Password from '../components/auth/Password';
import { LinearGradient } from 'expo-linear-gradient'

type Props = {}

const Page = (props: Props) => {

    const navigation = useNavigation<any>()
    const [ loading, setLoading ] = useState(false)

    const handleLoader = (status: boolean) => {
        setLoading(status)
        return;
    }

    return (
        <LinearGradient className="h-full" colors={["#141414", "black"]} start={{ x: 0, y: 0.2 }}>
            <SafeAreaView className='bg-primar h-full'>
                <View className='px-3 py-2 flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' color="white" size={25} />
                    </TouchableOpacity>
                    <View className=''>
                        <Text className='text-inverse text-lg font-sansbold'>Change Password</Text>
                    </View>
                    <View className='w-4'></View>
                </View>
                <Password loading={loading} handleLoader={handleLoader}  />
            </SafeAreaView>
            {loading ? <View className='w-full h-full flex-row justify-center items-center absolute left-0 top-0 bg-white/10'>
                <ActivityIndicator />
            </View> : null}
        </LinearGradient>
        
    )
}

export default Page