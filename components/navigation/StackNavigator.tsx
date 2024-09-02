import { fetchUser } from '@/features/authSlice'
import { AppDispatch, RootState } from '@/features/store'
import { Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}

const StackNavigator = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const auth = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="wallet/receive" options={{ headerShown: false }} />
            <Stack.Screen name="wallet/send" options={{ headerShown: false }} />
            <Stack.Screen name="wallet/index" options={{ headerShown: false }} />
            <Stack.Screen name="wallet/details" options={{ headerShown: false }} />
            <Stack.Screen name="flips" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="[user]" options={{ headerShown: false }} />
            <Stack.Screen name="editprofile" options={{ headerShown: false }} />
            <Stack.Screen name="audience" options={{ headerShown: false }} />
            <Stack.Screen name="changepassword" options={{ headerShown: false }} />
            <Stack.Screen name="interests" options={{ headerShown: false }} />
            <Stack.Screen name="nationality" options={{ headerShown: false }} />
            {/* <Stack.Screen name="flips" options={{ headerShown: false }} /> */}
            <Stack.Screen name="postsview" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen name="titles" options={{ headerShown: false }} />
            <Stack.Screen name="uploader" options={{ headerShown: false }} />
            <Stack.Screen name="usercelebrities" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding/wallet" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    )
}

export default StackNavigator