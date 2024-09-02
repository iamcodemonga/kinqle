import React from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CreatorFlat from '../components/cards/CreatorFlat';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {}

const Page = (props: Props) => {
    const navigation = useNavigation<any>()

    return (
        <LinearGradient className="h-full" colors={["#141414", "black"]} start={{ x: 0, y: 0.2 }}>
            <SafeAreaView className='bg-primar h-full'>
                <View className='px-3 py-2 mb-2 flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' color="white" size={25}  />
                    </TouchableOpacity>
                    <View className=''>
                        <Text className='text-inverse text-lg font-sansbold'>Audience (873K)</Text>
                    </View>
                    <View className='w-4'></View>
                </View>
                <View className='px-3 py-2 mb-2 flex-row items-center'>
                    <View className=' flex-row justify-center items-center'>
                        <TextInput className='bg-secondary text-inverse pb-4 pt-3  px-4 rounded-lg w-full font-sansmedium' placeholder='search audience' placeholderTextColor={"#A5A6A7"} />
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