import { Image } from 'expo-image'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import Header from '../../components/me/Header'
import Ionicons from '@expo/vector-icons/Ionicons';
// import Body from '../../components/me/Body';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { StatusBar } from 'expo-status-bar';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react'
import * as Picker from 'expo-image-picker';
import { Cloudinary } from "@cloudinary/url-gen";
import Toast from 'react-native-toast-message';
import * as VideoThumbnails from 'expo-video-thumbnails';
// import { Blurhash } from 'react-native-blurhash';

type Props = {}

const Page = (props: Props) => {

    // const generateBlurhash = async(uri: string) => {
    //     const _blurhash = await Blurhash.encode(uri, 4, 3);
    //     return _blurhash;
    // }
    
    const navigation = useNavigation<any>()
    const auth = useSelector((state: RootState) => state.auth)
    const snapPoints = useMemo(() => ["38%"], [])
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [ file, setFile ] = useState<string | null>(null)
    const [ extension, setExtension ] = useState<string>("")
    const [ loading, setLoading ] = useState<boolean>(false)
    const [status, requestPermission] = Picker.useMediaLibraryPermissions();
    const allowedImgFormat = [ "jpg", "jpeg", "png", "gif" ]
    const allowedVideoFormat: Array<string> = [ "mov", "mp4", "mpeg" ]
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    // console.log(status);
    
    const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
                opacity={0.8}
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),[]
	);

    const handleSelectPhoto = async() => {
        if (status?.granted) {
            const image = await Picker.launchImageLibraryAsync({
                mediaTypes: Picker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [9, 16],
                quality: 1
            })
            if (!image.canceled) {
                console.log(image.assets[0].uri);
                setFile(image.assets[0].uri);
            }
        } else {
            requestPermission()
        }
    }

    const handleSelectVideo = async() => {
        if (status?.granted) {
            const video = await Picker.launchImageLibraryAsync({
                mediaTypes: Picker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [9, 16],
                videoQuality: 1,
                videoMaxDuration: 120
            })
            if (!video.canceled) {
                console.log(video.assets[0].uri);
                setFile(video.assets[0].uri);
            }
        } else {
            requestPermission()
        }
    }

    const generateThumbnail = async (filename: string, time: number) => {
        try {
          const { uri, height, width } = await VideoThumbnails.getThumbnailAsync(filename, { time });
          setThumbnail(uri);
          return uri;
        } catch (e) {
          console.warn(e);
        }
      };

    const selectPhoto = async() => {
        setLoading(true)
        const image = await Picker.launchImageLibraryAsync({
            mediaTypes: Picker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
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

            if (image.assets[0].fileSize &&  image.assets[0].fileSize > 10000000) {
                setLoading(false)
                Toast.show({
                    type: "error",
                    text1: "Photo too large!",
                    text2: "Image size must not exceed 10MB"
                })
                return;
            }

            setFile(image.assets[0].uri);
            setExtension(fileExtension as string)
            handleCloseSheet()
            navigation.navigate("Uploader", 
            { 
                file: image.assets[0].uri, 
                type: image.assets[0].type, 
                extension: fileExtension, 
                placeholder: image.assets[0].uri 
            })
        }
        setLoading(false)
    }

    const selectVideo = async() => {
        setLoading(true)
        const video = await Picker.launchImageLibraryAsync({
            mediaTypes: Picker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [9, 16],
            videoQuality: 1,
            videoMaxDuration: 120,
        })
        if (!video.canceled) {
            const fileExtension = video.assets[0].uri.split('.').pop();
            if (!allowedVideoFormat.includes(fileExtension as string)) {
                setLoading(false)
                Toast.show({
                    type: "error",
                    text1: "Video format not supported!",
                    text2: "Only .mp4, .mpeg, and .mov formats are allowed"
                })
                return;
            }

            if (video.assets[0].fileSize &&  video.assets[0].fileSize > 50000000) {
                setLoading(false)
                Toast.show({
                    type: "error",
                    text1: "Video too large!",
                    text2: "Video size must not exceed 5MB"
                })
                return;
            }
            
            const duration = Math.floor(Number(video.assets[0].duration)/1000)
            
            const placeholder = await generateThumbnail(video.assets[0].uri, Math.floor(duration/2))
            setFile(video.assets[0].uri);
            setExtension(fileExtension as string)
            handleCloseSheet()
            navigation.navigate("Uploader", 
            { 
                file: video.assets[0].uri, 
                type: video.assets[0].type, 
                extension: fileExtension, 
                placeholder: placeholder 
            })
        }
        setLoading(false)
    }

    const handleOpenSheet = () => bottomSheetRef.current?.expand()
    const handleCloseSheet = () => bottomSheetRef.current?.close()
    
    return (
        <View className='bg-secondary w-full h-full'>
            <StatusBar style='light' />
            <View className='h-full'>
                {auth.user ? auth.user.dp ? <Image 
                    source={`${process.env.EXPO_PUBLIC_STOREURL}${auth.user.dp}?width=200&height=200`} 
                    className='w-full h-full bg-secondary'
                    contentFit="cover"
                    placeholder={""}
                    transition={1000}
                /> : null : null}
                <SafeAreaView className='w-full h-full bg-black/80 absolute top-0 left-0'>
                    <View className='flex-row items-center justify-between px-4 py-2'>
                        <View className='flex-row'>
                            <Image source={require("../assets/images/Logo.png")} className='w-7 h-7 mr-3' />
                            {/* {auth.user ? auth.user.username ? <Text className='text-inverse text-lg'>{auth.user.username}</Text> : null : null} */}
                        </View>
                        {auth.user ? <View className='flex-row space-x-3'>
                            <TouchableOpacity className='p-3 bg-white/5 rounded-lg' onPress={() => navigation.navigate("SinglePostView")}>
                                <Ionicons name='paper-plane-outline' size={18} color={"white"} />
                            </TouchableOpacity>
                            <TouchableOpacity className='p-3 bg-white/5 rounded-lg' onPress={() => navigation.navigate("Options")}>
                                <Ionicons name='ellipsis-vertical-sharp' size={18} color={"white"} />
                            </TouchableOpacity>
                        </View> : null}
                    </View>
                    <View>
                        {/* <FlatList
                            ListHeaderComponent={<Header />}
                            data={[{ id: "myprofile" }]}
                            renderItem={({ item }) => <Body />}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            // ListFooterComponent={() => <View className='bg-white h-4'></View>}
                        /> */}
                     </View>
                </SafeAreaView>
                {auth.user ? <TouchableOpacity className='w-16 h-16 rounded-full flex-row justify-center items-center bg-yellow-500 absolute bottom-28 right-5' onPress={handleOpenSheet}>
                    <Ionicons name='flash-sharp' size={20} color={"black"} />
                </TouchableOpacity> : null}
            </View>
            <BottomSheet 
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints} 
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                // detached={true}
                // handleIndicatorStyle={{ backgroundColor: "" }}
                backgroundStyle={{ backgroundColor: "#fff"}}>
                <View className='h-full px-5'>
                    <Text className='text-xl font-bold text-center mb-7'>Upload Content</Text>
                    <TouchableOpacity className='flex-row items-center space-x-2 mb-5' onPress={selectPhoto}>
                        <View className='bg-gray-200 p-3 rounded-lg'>
                            <Ionicons name='image-outline' size={20} />
                        </View>
                        <Text className='text-base'>Select Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center space-x-2' onPress={selectVideo}>
                        <View className='bg-gray-200 p-3 rounded-lg'>
                            <Ionicons name='videocam-outline' size={20} />
                        </View>
                        <Text className='text-base'>Select Video</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            {loading ? <View className='h-full w-full bg-secondary/50 absolute top-0 left-0 flex-row justify-center items-center'><ActivityIndicator /></View> : null}
        </View>
    )
}

export default Page