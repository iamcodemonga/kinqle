import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

type Props = {
    list: Array<string>
    fullname: string
    username: string
    website: string | undefined | null
    bio: string | undefined | null
    interests: Array<string>
    newTitles: Array<string>
    nation: string
    gender: string
    openGenderSheet: () => void
    handleChangeText: (field: string, text: string, initialValue: any) => void
}

const EditForm = ({ fullname, username, website, bio, interests, newTitles, nation, gender, list, openGenderSheet, handleChangeText }: Props) => {
    const auth = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation<any>()

    let interestword: string = "none";
    let titlephrase: string = "none";

    if (newTitles && newTitles.length == 3) {
        titlephrase = `${newTitles[0]}, ${newTitles[1]} and ${newTitles[2]}`
    } else if (newTitles && newTitles.length == 2) {
        titlephrase = `${newTitles[0]} and ${newTitles[1]}`
    } else if (newTitles && newTitles.length == 1) {
        titlephrase = `${newTitles[0]}`
    } else {
        titlephrase = "none";
    }

    if (interests.length == 3) {
        interestword = `${interests[0]}, ${interests[1]} and ${interests[2]}`
    } else if (interests.length == 2) {
        interestword = `${interests[0]} and ${interests[1]}`
    } else if (interests.length == 1) {
        interestword = `${interests[0]}`
    } else {
        interestword = "none";
    }

    return (
        <View className='px-3 bg-inverse h-full rounded-t-3xl pt-4'>
            <View className='h-full w-full bg-inverse mt-10 space-y-8'>
                <View className='space-y-5'>
                    <View>
                        <Text className='mb-1 ml-1 font-sansregular text-xs text-gray-600'>Fullname</Text>
                        <TextInput className='py-3 px-3 bg-slate-300 rounded-lg font-sansregular text-base' placeholder='e.g john doe' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='text' placeholderTextColor={"#A5A6A7"} value={fullname} onChangeText={(text) => {
                            handleChangeText("fullname", text, auth.user?.fullname)
                        }} />
                    </View>
                    <View>
                        <Text className='mb-1 ml-1 font-sansregular text-xs text-gray-600'>Username</Text>
                        <TextInput className='py-3 px-3 bg-slate-300 rounded-lg font-sansregular text-base' placeholder='e.g johndoe23' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='text' placeholderTextColor={"#A5A6A7"} value={username} onChangeText={(text) => {
                            handleChangeText("username", text, auth.user?.username)
                        }} />
                    </View>
                    <View>
                        <Text className='mb-1 ml-1 font-sansregular text-xs text-gray-600'>Website</Text>
                        <TextInput className='py-3 px-3 bg-slate-300 rounded-lg font-sansregular text-base' placeholder='e.g https://www.yourwebsite.com' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='text' placeholderTextColor={"#A5A6A7"} value={website as string} onChangeText={(text) => {
                            handleChangeText("website", text, auth.user?.website)
                        }} />
                    </View>
                    <View>
                        <Text className='mb-1 ml-1 font-sansregular text-xs text-gray-600'>Bio</Text>
                        <TextInput className='py-3 px-3 h-20 bg-slate-300 rounded-lg font-sansregular text-base' multiline numberOfLines={5} placeholder='write about yourself' textAlign='left' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='text' placeholderTextColor={"#A5A6A7"} value={bio as string} onChangeText={(text) => {
                            handleChangeText("bio", text, auth.user?.bio)
                        }} maxLength={100} />
                    </View>
                </View>
                <Text className='text-center text-lg font-sansmedium'>Other Informations</Text>
                <View>
                    <TouchableOpacity className='flex-row items-center justify-between py-4' onPress={openGenderSheet}>
                        <Text className='text-base font-sansregular'>Gender</Text>
                        <View className='flex-row items-center'>
                            <Text className='text-tertiary font-sansregular'>{gender ? gender : null}</Text>
                            <Ionicons name='chevron-forward' size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-between py-4' onPress={() => router.push({
                        pathname: "/nationality",
                        params: {
                            country: nation
                        }
                    })}>
                        <Text className='text-base font-sansregular'>Country</Text>
                        <View className='flex-row items-center'>
                            <Text className='text-tertiary font-sansregular'>{nation ? nation : null}</Text>
                            <Ionicons name='chevron-forward' size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-between py-4 hidden'>
                        <Text className='text-base font-sansregular'>Date of Birth</Text>
                        <View className='flex-row items-center'>
                            <Text className='text-tertiary font-sansregular'>20-oct</Text>
                            <Ionicons name='chevron-forward' size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-between py-4' onPress={() => router.push({
                        pathname: "/titles",
                        params: {
                            titles: newTitles
                        }
                    })}>
                        <Text className='text-base font-sansregular'>Titles</Text>
                        <View className='flex-row items-center'>
                            <Text className='text-tertiary font-sansregular'>{titlephrase.length > 20 ? titlephrase.slice(0, 20)+"..." : titlephrase}</Text>
                            <Ionicons name='chevron-forward' size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-between py-4' onPress={() => router.push("/interests")}>
                        <Text className='text-base font-sansregular'>Interests</Text>
                        <View className='flex-row items-center'>
                            <Text className='text-tertiary font-sansregular'>{interestword.length > 20 ? interestword.slice(0, 20)+"..." : interestword}</Text>
                            <Ionicons name='chevron-forward' size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default EditForm