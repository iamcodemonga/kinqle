import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { checkPassword, updatePassword } from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';

type Props = {
    loading: boolean
    handleLoader: (status: boolean) => void
}

const Password = ({ loading, handleLoader }: Props) => {

    const navigation = useNavigation<any>()
    const [ currentPassword, setCurrentPassword ] = useState("")
    const [ secureCurrent, setSecureCurrent ] = useState(true)
    const [ newPassword, setNewPassword ] = useState("")
    const [ secureNew, setSecureNew ] = useState(true)
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ secureConfirm, setSecureConfirm ] = useState(true)
    const auth = useSelector((state: RootState) => state.auth)

    const handleSecureOldPwd = () => {
        if (secureCurrent) {
            setSecureCurrent(false)
        } else {
            setSecureCurrent(true)
        }
        return;
    }

    const handleSecureNewPwd = () => {
        if (secureNew) {
            setSecureNew(false)
        } else {
            setSecureNew(true)
        }
        return;
    }

    const handleSecureConfirmPwd = () => {
        if (secureConfirm) {
            setSecureConfirm(false)
        } else {
            setSecureConfirm(true)
        }
        return;
    }

    const handleSubmit = async() => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Please fill in all fields!",
            })
            return;
        }

        if (newPassword != confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Passwords don't match!",
            })
            return;
        }

        console.log(currentPassword);

        handleLoader(true)
        try {
            const exists = await checkPassword(auth.user?.id as string, currentPassword);
            console.log(exists);
            
            if (!exists) {
                Toast.show({
                    type: "error",
                    text1: "Your current password is incorrect!",
                })
                handleLoader(false)
                return;
            }

            const result = await updatePassword(newPassword, auth.user?.id as string);
            if (!result) {
                Toast.show({
                    type: "error",
                    text1: "Could not update password!",
                })
                handleLoader(false)
                return;
            }

            Toast.show({
                type: "success",
                text1: "Password changed successfully!",
            })
            navigation.goBack();
            return;
        } catch (error) {
            console.log(error);
        }
        return;
    }

    return (
        <View className='hidde h-5/6 justify-center items-center'>
            <View className='w-96'>
                <View className='space-y-5 px-5'>
                    <View className='space-y-2'>
                        <Text className='text-xs ml-1 text-gray-300 font-sansregular'>Current Password</Text>
                        <View className='bg-secondary rounded-lg flex-row w-full justify-between items-center border border-secondary focus:border-accent'>
                            <TextInput placeholder='e.g xxxxxxxxxx' className='py-[14px] px-3 flex-1 text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='none' placeholderTextColor={"#A5A6A7"} value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={secureCurrent} />
                            <TouchableOpacity className='px-3' onPress={handleSecureOldPwd}>
                                <Ionicons name={secureCurrent ? `eye-outline` : `eye-off-outline`} color="white" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='space-y-2'>
                        <Text className='text-xs ml-1 text-gray-300 font-sansregular'>New Password</Text>
                        <View className='bg-secondary rounded-lg flex-row w-full justify-between items-center border border-secondary focus:border-accent'>
                            <TextInput placeholder='e.g xxxxxxxxxx' className='py-[14px] px-3 flex-1 text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='none' placeholderTextColor={"#A5A6A7"} value={newPassword} onChangeText={setNewPassword} secureTextEntry={secureNew} />
                            <TouchableOpacity className='px-3' onPress={handleSecureNewPwd}>
                                <Ionicons name={secureNew ? `eye-outline` : `eye-off-outline`} color="white" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='space-y-2'>
                        <Text className='text-xs ml-1 text-gray-300 font-sansregular'>Confirm Password</Text>
                        <View className='bg-secondary rounded-lg flex-row w-full justify-between items-center border border-secondary focus:border-accent'>
                            <TextInput placeholder='e.g xxxxxxxxxx' className='py-[14px] px-3 flex-1 text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='none' placeholderTextColor={"#A5A6A7"} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={secureConfirm} />
                            <TouchableOpacity className='px-3' onPress={handleSecureConfirmPwd}>
                                <Ionicons name={secureConfirm ? `eye-outline` : `eye-off-outline`} color="white" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className='px-5 mt-9'>
                    <TouchableOpacity className='py-4 bg-accent rounded-lg' onPress={handleSubmit}>
                        <Text className='text-center font-sansmedium'>submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Password