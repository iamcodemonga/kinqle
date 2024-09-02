import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image';

type Props = {}

const transactiondata = [
    {
        id: 1,
        type: "send",
        purpose: "Sent tip", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@edimessiah",
        amount: 30,
        date: "10-05-2025"
    },
    {
        id: 2,
        type: "receive",
        purpose: "Received givaway", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@indigo",
        amount: 1000,
        date: "10-05-2025"
    },
    {
        id: 3,
        type: "send",
        purpose: "Content purchase", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@sabinus",
        amount: 150,
        date: "10-05-2025"
    },
    {
        id: 4,
        type: "send",
        purpose: "Hashtag purchase", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@kemzy",
        amount: 165,
        date: "10-05-2025"
    },
    {
        id: 5,
        type: "receive",
        purpose: "Received tip", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@codemonga",
        amount: 47,
        date: "10-05-2025"
    },
    {
        id: 6,
        type: "receive",
        purpose: "Subscription", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@bigwiz",
        amount: 85,
        date: "10-05-2025"
    },
    {
        id: 7,
        type: "receive",
        purpose: "Content sale", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@davido",
        amount: 350,
        date: "10-05-2025"
    },
    {
        id: 8,
        type: "send",
        purpose: "Sent tip", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@sabinus",
        amount: 100,
        date: "10-05-2025"
    },
    {
        id: 9,
        type: "receive",
        purpose: "Hashtag sale", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@tiwasavage",
        amount: 3000,
        date: "10-05-2025"
    },
    {
        id: 10,
        type: "send",
        purpose: "Subscription", // tipped user, giveaway to user, receive from, subscription, acquired shares
        to: "@sidneytalker",
        amount: 400,
        date: "10-05-2025"
    }
]

const page = (props: Props) => {
    const navigation = useNavigation<any>()
    return (
        <SafeAreaView className='bg-primary h-full'>
            {/* <StatusBar style='light' /> */}
            <View className='flex-row justify-between items-center px-3 py-2 mb-2'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' size={25} color="white" />
                </TouchableOpacity>
                {/* <Text className='text-white text-lg font-sansmedium'>Wallet</Text> */}
                <LinearGradient colors={["#22B8BD", "green"]} style={{ padding: 1}} start={{ x: 0.2, y: 0 }} className='rounded-lg mr-2'>
                    <Image 
                        source={"https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                        className='w-6 h-6 rounded-lg bg-secondary'
                        contentFit="cover"
                        placeholder={""}
                        transition={1000}
                    />
                </LinearGradient>
            </View>
            <View className='w-[95%] h-[23%] bg-accen mt-3 rounded-xl self-center justify-center'>
                <View>
                    <Text className='text-center text-gray-400 font-sansregular text-xs mb-2'>Total balance</Text>
                    <Text className='text-center text-gray-300 font-sansbold text-4xl mb-1'>1834 CTN</Text>
                    <Text className='text-center text-green-500 font-sansmedium text-sm'>$135,780.00</Text>
                    <View className='flex-row justify-center space-x-4 mt-5'>
                        <TouchableOpacity className='py-3 w-28 bg-secondary rounded-2xl flex-row justify-center items-center' onPress={() => navigation.navigate("wallet/receive")}>
                            <Ionicons name='add-outline' size={15} color="white" />
                            <Text className='text-white text-center ml-1'>Receive</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='py-3 w-28 bg-secondary rounded-2xl flex-row justify-center items-center' onPress={() => navigation.navigate("wallet/send")}>
                            <Ionicons name='send-outline' size={15} color="white" />
                            <Text className='text-white text-center ml-2'>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className='h-full w-full bg-secondary rounded-3xl mt-4'>
                <Text className='mt-4 text-center text-base font-sansmedium text-white mb-5'>Transaction history</Text>
                <FlatList
                    data={transactiondata}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <View className='mx-5 flex-row items-center justify-between'>
                        <View className='flex-row items-center space-x-3'>
                            <View className={`w-12 h-12 rounded-xl ${item.type == "receive" ? "bg-green-500/10" : "bg-red-500/10"} justify-center items-center`}>{item.type == "receive" ? <Ionicons name='arrow-up-outline' size={17} color="#22c55e" /> : <Ionicons name='arrow-down-outline' size={17} color="#ef4444" />}</View>
                            <View className='space-y-1'>
                                <Text className='text-[14px] font-sansbold text-white'>{item.purpose}</Text>
                                <Text className='text-xs font-sansregular text-slate-300'>{item.to}</Text>
                            </View>
                        </View>
                        <View className='items-end space-y-1'>
                            <Text className={`text-xs font-sansbold ${item.type == "receive" ? "text-green-500" : "text-red-500"}`}>{item.amount} CTN</Text>
                            <Text className='text-[10px] font-sansregular text-slate-300'>{item.date}</Text>
                        </View>
                    </View>}
                    ItemSeparatorComponent={() => <View className='h-5'></View>}
                    ListFooterComponent={() => <View className='h-80'></View>}
                 />
            </View>
        </SafeAreaView>
    )
}

export default page