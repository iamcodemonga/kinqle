import { useState } from 'react'
import { Image } from 'expo-image'
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store';
import * as Picker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { removeDp, updateUserDp, uploadDp } from '../../lib/supabase';
import { fetchUser } from '../../features/authSlice';

type Props = {
    dp: string | null
    dpBtn: boolean
    loading: boolean
    changeDp: (picture: string) => void
    changeCover: (pix: string) => void
    changeDpBtn: (bool: boolean) => void
    setLoading: (bool: boolean) => void
}

const EditHeader = ({ dp, dpBtn, changeDp, changeCover, changeDpBtn, loading, setLoading }: Props) => {
    // const [ uploadBtn, setUploadBtn ] = useState<boolean>(false)
    // const [ extension, setExtension ] = useState<string>("")
    const avatar = "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
    const auth = useSelector((state: RootState) => state.auth)
    const allowedImgFormat = [ "jpg", "jpeg", "png", "gif" ]
    const dispatch = useDispatch<AppDispatch>();

    const selectPhoto = async() => {
        setLoading(true)
        const image = await Picker.launchImageLibraryAsync({
            mediaTypes: Picker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!image.canceled) {
            const fileExtension = image.assets[0].uri.split('.').pop();
            if (!allowedImgFormat.includes(fileExtension as string)) {
                setLoading(false)
                Toast.show({
                    type: "error",
                    text1: "Photo format not supported!",
                    text2: "Only .jpg, .jpeg, .png and .gif formats are allowed"
                })
                return;
            }

            if (image.assets[0].fileSize &&  image.assets[0].fileSize > 6000000) {
                setLoading(false)
                Toast.show({
                    type: "error",
                    text1: "Photo too large!",
                    text2: "Image size must not exceed 6MB"
                })
                return;
            }

            // console.log("start");
            changeDpBtn(true)
            // setExtension(fileExtension as string)
            changeDp(image.assets[0].uri);
            changeCover(image.assets[0].uri)
            // console.log("end");
            // console.log(extension);
            // console.log(uploadBtn);
            
        }
        setLoading(false)
    }

    const handleDp = async(file: string) => {
        setLoading(true)
        try {
            const response = await fetch(file);
            const blob = await response.blob();
            const arrayBuffer = await new Response(blob).arrayBuffer();
            // console.log(blob);
            
            const fileExt = file.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const uplresult = await uploadDp(fileName, arrayBuffer, fileExt as string)
            if (!uplresult?.path) {
                Toast.show({
                    type: "error",
                    text1: "An Error Occurred!",
                    text2: "Could not upload profile picture!"
                })
                return;
            }

            const dbresult = await updateUserDp(uplresult.path, auth.user?.id as string)
            if (!dbresult) {
                Toast.show({
                    type: "error",
                    text1: "An Error Occurred!",
                    text2: "Could not upload profile picture!"
                })
                return;
            }

            if (auth.user?.dp) {
                const delresult = await removeDp(auth.user?.dp)
                if (!delresult) {
                    Toast.show({
                        type: "error",
                        text1: "An error occurred!",
                        text2: "Could not upload photo!"
                    })
                }
            }

            Toast.show({
                type: "success",
                text1: "Uploaded successfully!",
                text2: "Profile photo was uploaded successfully!"
            })
            changeDpBtn(false)
            dispatch(fetchUser())
            setLoading(false)
            return;
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return;
    }

    const handleRemoveDp = async(file: string) => {
        setLoading(true)
        try {
            const result = await removeDp(file)
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return;
    }

    return (
        <View className='w-full justify-center items-center my-10'>
            <View className='w-full'>
                <View className='flex-row items-center justify-center w-full'>
                    <Pressable className='w-[82px] h-[82px] bg-slate-300 rounded-xl flex justify-center items-center' onPress={() => selectPhoto()}>
                        <Image 
                            source={dp} 
                            className='w-20 h-20 rounded-xl bg-secondary'
                            contentFit="cover"
                            placeholder={""}
                            transition={1000}
                        />
                        <View className='bg-accent p-1 rounded-xl absolute -bottom-1 -right-1 border-slate-100 border-2'>
                            <Ionicons name='add-outline' size={20} color={"white"} />
                        </View>
                    </Pressable>
                </View>
                <View className='mt-5 w-full flex-row justify-center space-x-5'>
                    {dpBtn ? <TouchableOpacity className='bg-inverse px-3 py-2 rounded-xl flex-row justify-center' onPress={() => handleDp(dp as string)}>
                        <View className='flex-row items-center'>
                            <Ionicons name="cloud-upload-outline" size={16} />
                            <Text className='text-center ml-1 text-xs font-sansmedium'>Upload</Text>
                        </View>
                    </TouchableOpacity> : null}
                    {/* <TouchableOpacity className='bg-inverse px-3 py-2 rounded-xl flex-row justify-center' onPress={() => handleRemoveDp("1715981670312.jpg")}>
                        <View className='flex-row items-center'>
                            <Ionicons name="cloud-upload-outline" size={16} />
                            <Text className='text-center ml-1 text-xs'>delete</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}

export default EditHeader