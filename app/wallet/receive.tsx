import React from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

type Props = {}

const page = (props: Props) => {
    const navigation = useNavigation<any>()

    return (
            <SafeAreaView className='bg-primary h-full justify-between'>
                <View className='px-3 py-2 mb-2 flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' color="white" size={25}  />
                    </TouchableOpacity>
                    <View className='ml-3 mr-7 flex-row justify-center items-center'>
                        <Text className='text-white font-sansmedium text-base'>Receive funds</Text>
                    </View>
                    <View></View>
                </View>
                <View className='mt-5'>
                    {/* <Text>This is your solana address</Text> */}
                    <View className='mx-5 mb-4'>
                        <Text className='text-gray-200 font-sansregular text-sm mb-2 ml-1 text-center'>Your solana wallet address</Text>
                        <TextInput className='bg-secondary text-inverse py-[14] borde border-gray-400 px-3 text-base rounded-lg w-full font-sansmedium' placeholder='e.g @johndoe' placeholderTextColor={"#A5A6A7"} value='5287yeghjsgb76873eygdwbuowiljcjhjgfwhywiuy9823' readOnly />
                    </View>
                    <View className='mx-5 w-full'>
                        <TouchableOpacity className='py-3 self-center w-40 bg-accent rounded-xl'>
                            <Text className='font-sansbold text-base text-gray-800 text-center'>Copy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View></View>
            </SafeAreaView>
    )
}

export default page