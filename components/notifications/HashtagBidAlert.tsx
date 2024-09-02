import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {}

const HashtagBidAlert = (props: Props) => {
  return (
    <View>
        <View className='flex-row items-center justify-between px-3'>
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
                <View className='space-y-1 max-w-[230px]'>
                    <TouchableOpacity className='flex-row items-center space-x-1'>
                        <Text className='font-bold text-inverse font-sansbold'>Indigo</Text>
                        <Ionicons name='checkmark-circle' color="#22B8BD" size={18} />
                        <Text className='text-tertiary text-[10px] font-sansregular'>20-4-24</Text>
                    </TouchableOpacity>
                    <View className='w-full'>
                        <Text className='text-tertiary text-sm font-sansmedium' numberOfLines={2}>has bid <Text className='font-bold text-white font-sansbold'>3.8SOL</Text> for <Text className='font-sansbold text-white'>18%</Text> of <TouchableOpacity><Text className='font-sansbold text-accent'>#endbadgovernance</Text></TouchableOpacity></Text>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity className='w-20 rounded-xl py-2 bg-inverse border border-white'>
                    <Text className='text-secondary text-center text-sm font-sansmedium'>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default HashtagBidAlert