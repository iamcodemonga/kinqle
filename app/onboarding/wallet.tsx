import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {}

const page = (props: Props) => {
    const navigation = useNavigation<any>()
    return (
        <LinearGradient className="h-full" colors={["#202124", "black"]} start={{ x: 0, y: 0.1 }}>
            <SafeAreaView className='bg-primar h-full justify-between pb-5'>
                {/* <StatusBar style='light' /> */}
                <View className='flex-row justify-between items-center px-3 py-2 mb-2'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={25} color="white" />
                    </TouchableOpacity>
                    <Text className='text-white text-lg font-sansmedium'>Wallet</Text>
                    <View></View>
                </View>
                <View>
                    <View className='w-full flex-row justify-center'>
                        <Image source={require("../../assets/images/walletonboarding.png")} className='w-72 h-48' />
                    </View>
                    <View className='w-full px-5 mt-16 self-center'>
                        <Text className='text-gray-300 text-center text-lg font-sansmedium'>Effortlessly send and receive funds, host giveaways, and manage finances with our intuitive wallet.</Text>
                    </View>
                </View>
                <View className='w-full items-center'>
                    <TouchableOpacity className='py-4 rounded-xl w-11/12 bg-accent mx-10 flex-row justify-center items-center' onPress={() => navigation.navigate("wallet/index")}>
                        <Text className='font-sansmedium text-center text-base mr-1'>Continue</Text>
                        <Ionicons name='chevron-forward' size={18} color="black" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default page