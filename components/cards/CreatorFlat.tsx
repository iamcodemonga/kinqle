import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {}

const CreatorFlat = (props: Props) => {
    return (
        <View className='px-4 mt-3 flex-row items-center justify-between'>
            <View className='flex-row items-center space-x-3'>
                <View>
                    <TouchableOpacity className='w-[42px] h-[42px] bg-slate-300 rounded-xl flex justify-center items-center'>
                        <LinearGradient colors={["#22B8BD", "green"]} style={{ padding: 1}} start={{ x: 0.2, y: 0 }} className='rounded-xl'>
                            <Image 
                                source="https://images.pexels.com/photos/19696764/pexels-photo-19696764/free-photo-of-young-woman-in-a-white-shirt-showing-her-hand.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
                                className='w-10 h-10 rounded-xl bg-secondary'
                                contentFit="cover"
                                placeholder={""}
                                transition={1000}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View className='space-y-1'>
                    <TouchableOpacity className='flex-row space-x-1 items-center'>
                        <Text className='text-inverse text-base font-sansbold'>codemonga</Text>
                        <Ionicons name='checkmark-circle' color="#22B8BD" size={18} />
                    </TouchableOpacity>
                    <Text className='text-xs text-tertiary font-sansregular'>Programmer and tech Entrepreneur</Text>
                </View>
            </View>
            <TouchableOpacity className='py-[10px] bg-accent w-16 rounded-xl'>
                <Text className='text-center text-gray-800 font-sansmedium'>Join</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreatorFlat