import React from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CreatorFlat from '../components/cards/CreatorFlat';
import { LinearGradient } from 'expo-linear-gradient'

type Props = {}

const Page = (props: Props) => {
    const navigation = useNavigation<any>()

  return (
    <LinearGradient className="h-full" colors={["#202124", "black"]} start={{ x: 0, y: 0.2 }}>
        <SafeAreaView className='bg-primar h-full'>
            <View className='px-3 py-2 mb-2 flex-row items-center'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' color="white" size={25}  />
                </TouchableOpacity>
                <View className='ml-3 mr-7 flex-row justify-center items-center'>
                    <TextInput className='bg-secondary text-inverse py-[14] border border-gray-400 px-2 rounded-lg w-full font-sansmedium' placeholder='search creator' placeholderTextColor={"#A5A6A7"} />
                </View>
            </View>
            <FlatList
                data={[{ id: "acvjans"}, { id: "acvjns"}, { id: "acvans"}, { id: "acvjan"}]}
                renderItem={({ item }) => <CreatorFlat />}
                ItemSeparatorComponent={() => <View className='h-5'></View>}
            />
        </SafeAreaView>
    </LinearGradient>
  )
}

export default Page