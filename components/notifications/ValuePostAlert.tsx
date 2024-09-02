import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {}

const ValuePostAlert = (props: Props) => {
    return (
        <View>
            <View className='flex-row items-center justify-between px-3 pb-5'>
                <View className='flex-row items-center space-x-3'>
                    <TouchableOpacity className='w-[50px] h-[50px] bg-slate-300 rounded-xl flex justify-center items-center'>
                        <LinearGradient colors={["#22B8BD", "green"]} style={{ padding: 1}} start={{ x: 0.2, y: 0 }} className='rounded-xl'>
                            <Image 
                                source="https://images.pexels.com/photos/19696764/pexels-photo-19696764/free-photo-of-young-woman-in-a-white-shirt-showing-her-hand.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
                                className='w-12 h-12 rounded-xl bg-secondary'
                                contentFit="cover"
                                placeholder={""}
                                transition={1000}
                            />
                        </LinearGradient>
                        {/* <View className='absolute -bottom-1 -right-2'>
                            <Ionicons name='checkmark-circle' color="#22B8BD" size={18} />
                        </View> */}
                    </TouchableOpacity>
                    <View className='space-y-1'>
                        <TouchableOpacity className='flex-row items-center space-x-1'>
                            <Text className='font-bold text-inverse font-sansbold'>Indigo</Text>
                            <Ionicons name='checkmark-circle' color="#22B8BD" size={18} />
                            <Text className='text-tertiary text-[10px] font-sansmedium'>20-4-24</Text>
                        </TouchableOpacity>
                        <Text className='text-tertiary text-sm font-sansmedium'>Valued your content</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity className='w-24 rounded-xl py-2 bg-accent border border-accent'>
                        <Text className='text-center text-sm text-gray-700'>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity className='mx-3'>
                <Image 
                    source="https://images.pexels.com/photos/19696764/pexels-photo-19696764/free-photo-of-young-woman-in-a-white-shirt-showing-her-hand.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
                    className='w-full aspect-square rounded-xl bg-secondary'
                    contentFit="cover"
                    placeholder={""}
                    transition={1000}
                />
                <View className='h-full w-full absolute top-0 left-0 bg-black/50 rounded-xl px-2 py-3 justify-between'>
                    <View></View>
                    <View className='w-full flex-row justify-center'><Ionicons name='play-outline' size={30} color="white" /></View>
                    <Text className='text-white font-sansmedium text-base' numberOfLines={2}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex porro autem voluptates consectetur quae!</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ValuePostAlert