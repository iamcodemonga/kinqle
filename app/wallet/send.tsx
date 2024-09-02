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
            <SafeAreaView className='bg-primary h-full'>
                <View className='px-3 py-2 mb-2 flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' color="white" size={25}  />
                    </TouchableOpacity>
                    <View className='ml-3 mr-7 flex-row justify-center items-center'>
                        <Text className='text-white font-sansmedium text-base'>Send funds</Text>
                    </View>
                    <View></View>
                </View>
                <View className='mt-5'>
                    <View className='mx-5 mb-4'>
                        <Text className='text-gray-300 font-sansregular text-xs mb-1 ml-1'>Select user</Text>
                        <TextInput className='bg-secondary text-inverse py-[14] borde border-gray-400 px-3 rounded-lg w-full font-sansmedium' placeholder='e.g @johndoe' placeholderTextColor={"#A5A6A7"} />
                        <View className='bg-secondary mt-2 rounded-xl py-2 hidden'>
                            <TouchableOpacity className='p-3'>
                                <View className='flex-row items-center space-x-1'>
                                    <LinearGradient colors={["#22B8BD", "green"]} style={{ padding: 1}} start={{ x: 0.2, y: 0 }} className='rounded-lg mr-2'>
                                        <Image 
                                            source={"https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                                            className='w-6 h-6 rounded-lg bg-secondary'
                                            contentFit="cover"
                                            placeholder={""}
                                            transition={1000}
                                        />
                                    </LinearGradient>
                                    <Text className='text-white font-sansmedium'>codemonga</Text>
                                    <Ionicons name='checkmark-circle' color="#22B8BD" size={15} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity className='p-3'>
                                <View className='flex-row items-center space-x-1'>
                                    <LinearGradient colors={["#22B8BD", "green"]} style={{ padding: 1}} start={{ x: 0.2, y: 0 }} className='rounded-lg mr-2'>
                                        <Image 
                                            source={"https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                                            className='w-6 h-6 rounded-lg bg-secondary'
                                            contentFit="cover"
                                            placeholder={""}
                                            transition={1000}
                                        />
                                    </LinearGradient>
                                    <Text className='text-white font-sansmedium'>codemonga</Text>
                                    <Ionicons name='checkmark-circle' color="#22B8BD" size={15} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='mx-5 mb-6'>
                        <View className='flex-row justify-between items-center mb-1'>
                            <Text className='text-gray-300 font-sansregular text-xs ml-1'>Amount(CTN)</Text>
                            <Text className='text-gray-300 font-sansregular text-xs mr-1'>$0.00</Text>
                        </View>
                        <TextInput className='bg-secondary text-inverse py-[14] borde border-gray-400 px-3 rounded-lg w-full font-sansmedium' placeholder='0.00' placeholderTextColor={"#A5A6A7"} />
                    </View>
                    <View className='mx-5'>
                        <TouchableOpacity className='py-4 w-full bg-accent rounded-xl'>
                            <Text className='font-sansbold text-base text-gray-800 text-center'>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
    )
}

export default page