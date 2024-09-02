import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/store'
import Toast from 'react-native-toast-message'
import { Keypair } from '@solana/web3.js'

type Props = {
    title: string
}

const EmptyCards = ({ title }: Props) => {
    const navigation = useNavigation<any>()
    const auth = useSelector((state: RootState) => state.auth)
    const { height } = useWindowDimensions()

    const createKey = () => {
        // Generate keypair
        try {
            const keypair = Keypair.generate();
            console.log(`${keypair.publicKey.toBase58()}`);

            Toast.show({
                type: "success",
                text1: `${keypair.publicKey.toBase58()}`
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View className='bg-inverse w-full items-center justify-start space-y-4 pt-32' style={{ height: height/1.5 }}>
            <Text className='text-tertiary text-sm'>{title}</Text>
            <TouchableOpacity className='py-3 w-28 rounded-3xl bg-gray-900' onPress={() => navigation.navigate("auth")}>
                <Text className='text-sm text-center text-inverse'>Signup</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity className='py-3 w-28 rounded-3xl bg-gray-900' onPress={() => createKey()}>
                <Text className='text-sm text-center text-inverse'>Signup</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default EmptyCards