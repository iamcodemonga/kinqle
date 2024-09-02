import { Image } from 'expo-image'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import EditHeader from '../components/me/EditHeader';
import EditForm from '../components/me/EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Toast from 'react-native-toast-message';
import { checkUsernameExists, updateUser } from '../lib/supabase';
import { fetchUser } from '../features/authSlice';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const Page = () => {
    // const navigation = useNavigation()
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation()
    const snapGenderPoints = useMemo(() => ["38%"], [])
    const snapInterestPoints = useMemo(() => ["60%"], [])
    const genderBottomSheetRef = useRef<BottomSheet>(null);
    const InteresetBottomSheetRef = useRef<BottomSheet>(null);
    const [ interests, setInterest ] = useState<Array<string>>(auth.user?.interests as string[])
    const params = useLocalSearchParams()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ fullname, setFullname ] = useState<string>(auth.user?.fullname as string)
    const [ username, setUsername ] = useState<string>(auth.user?.username as string)
    const [ website, setWebsite ] = useState<string | undefined | null>(auth.user?.website)
    const [ bio, setBio ] = useState<string | undefined | null>(auth.user?.bio)
    const [ list, setList ] = useState<Array<string>>([])
    const [ gender, setGender ] = useState<string | undefined>(auth.user?.gender)
    const [ titles, setTitles ] = useState<Array<string>>(auth.user?.titles as string[])
    const [ country, setCountry ] = useState<string>(auth.user?.country as string)
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({
        'entertainment': false,
        'sports': false,
        'art and craft': false,
        'politics': false,
        'science and technology': false
      });
      const avatar = "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
    const [ dp, setDp ] = useState<string>(auth.user ? auth.user.dp ?  `${process.env.EXPO_PUBLIC_STOREURL}${auth.user.dp}?width=200&height=200` : avatar : avatar)
    const [ dpUploadBtn, setDpUploadBtn ] = useState<boolean>(false)
    const [ coverDp, setCoverDp ] = useState<string | null>(auth.user ? auth.user.dp ?  `${process.env.EXPO_PUBLIC_STOREURL}${auth.user.dp}?width=200&height=200` : null : null)

    // const addToList = (field: string) => {
    //     setList(prev => [...prev, field])
    // }

    // const removeFromList = (field: string) => {
    //     setList(prev => prev.filter(item => item !== field))
    // }

    useEffect(() => {
        const convertTitles = params.titles ? JSON.parse(params.titles as string) : null;
        if (convertTitles && convertTitles.length > 0) {
            setTitles(convertTitles as Array<string>)
        }
        console.log(convertTitles);
    }, [params.titles])

    useEffect(() => {
        if (params.country) {
            setCountry(params.country as string)
        }
    }, [params.country])

    useEffect(() => {
        // Update checkbox state initially
        const updatedCheckboxStates = { ...checkboxStates };
        for (const item of Object.keys(updatedCheckboxStates)) {
            updatedCheckboxStates[item] = interests.includes(item);
        }
        setCheckboxStates(updatedCheckboxStates);
    }, [interests]);

    const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
                opacity={0.9}
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),[]
	);

    const handleOpenGenderSheet = () => genderBottomSheetRef.current?.expand()
    const handleCloseGenderSheet = () => genderBottomSheetRef.current?.close()

    const handleChangeText = (field: string, text: string, initialValue: any) => {

        if (text) {
            if (text === initialValue) {
                if(list.includes(field)) {
                    setList(prev => prev.filter(item => item !== field))
                }
            } else {
                if(!list.includes(field)) {
                    setList(prev => [...prev, field])
                }
            }
        } else {
            setList(prev => prev.filter(item => item !== field))
        }

        if (field == "fullname") {
            setFullname(text)
        }

        if (field == "username") {
            setUsername(text)
        }

        if (field == "website") {
            setWebsite(text)
        }

        if (field == "bio") {
            setBio(text)
        }

    }

    const handleSelectGender = (selection: string, initialValue: string | null | undefined) => {
        setGender(selection)
        if (selection == initialValue) {
            if(list.includes(selection)) {
                setList(prev => prev.filter(item => item !== selection))
            }
        } else {
            if(!list.includes(selection)) {
                setList(prev => [...prev, selection])
            }
        }
        handleCloseGenderSheet()
    }

    const handleSubmit = async(fullname: string, username: string, website: string, bio: string, gender: string) => {
        if (!fullname) {
            Toast.show({
                type: "error",
                text1: "Fullname field cannot be empty!"
            })
            return;
        }

        if (!username) {
            Toast.show({
                type: "error",
                text1: "Username field cannot be empty!"
            })
            return;
        }

        if (!gender) {
            Toast.show({
                type: "error",
                text1: "Please select your gender!"
            })
            return;
        }

        if (!country) {
            Toast.show({
                type: "error",
                text1: "Please select your country!"
            })
            return;
        }

        setLoading(true)
        if (username !== auth.user?.username) {
            try {
                const checkuser = await checkUsernameExists(username)
                if (checkuser) {
                    Toast.show({
                        type: "error",
                        text1: "This username already exists!"
                    })
                    setLoading(false)
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        try {
            const result = await updateUser({ fullname, username, website, bio, gender }, auth.user?.id as string)
            if (!result) {
                Toast.show({
                    type: "error",
                    text1: "Could not update profile, try again!"
                })
                setLoading(false)
                return;
            }
            Toast.show({
                type: "success",
                text1: "Profile updated successfully!",
            })
            await dispatch(fetchUser())
            setLoading(false)
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View className='bg-primary w-full h-full'>
            <View className='h-full'>
                <Image 
                    source={coverDp} 
                    className='w-full h-full bg-secondary'
                    contentFit="cover"
                    placeholder={""}
                    transition={1000}
                />
                <SafeAreaView className='w-full h-full bg-black/80 absolute top-0 left-0'>
                    <View className='flex-row items-center justify-between px-4 py-2'>
                        <TouchableOpacity className='flex-row' onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={30} color={"white"} />
                        </TouchableOpacity>
                        <View className='flex-row space-x-3'>
                            <TouchableOpacity className={`py-2 px-5 bg-accent rounded-lg ${list.length < 1 ? "hidden" : null}`} onPress={() => handleSubmit(fullname, username, website as string, bio as string, gender as string)}>
                                <Text className='text-xs font-sansbold'>save</Text>
                                {/* <Ionicons name='ellipsis-vertical-sharp' size={18} color={"white"} /> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            ListHeaderComponent={<EditHeader dp={dp} changeDp={setDp} changeCover={setCoverDp} dpBtn={dpUploadBtn} changeDpBtn={setDpUploadBtn} loading={loading} setLoading={setLoading} />}
                            data={[{ id: "myprofile" }]}
                            renderItem={({ item }) => <EditForm fullname={fullname} username={username} website={website} bio={bio} interests={interests} newTitles={titles} nation={country} gender={gender as string} list={list} openGenderSheet={handleOpenGenderSheet} handleChangeText={handleChangeText} /> }
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={() => <View className='bg-white h-28'></View>}
                        />
                     </View>
                </SafeAreaView>
            </View>
            <BottomSheet 
                ref={genderBottomSheetRef}
                index={-1}
                snapPoints={snapGenderPoints} 
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                // detached={true}
                // handleIndicatorStyle={{ backgroundColor: "" }}
                backgroundStyle={{ backgroundColor: "#fff"}}>
                <View className='h-full px-5'>
                    <Text className='text-xl font-sansbold text-center mb-7'>Select gender</Text>
                    <TouchableOpacity className='flex-row items-center space-x-2 mb-5' onPress={() => handleSelectGender("male", auth.user?.gender)}>
                        <View className='bg-gray-200 p-3 rounded-lg'>
                            <Ionicons name='male-outline' size={20} />
                        </View>
                        <Text className='text-base font-sansmedium'>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center space-x-2 mb-5' onPress={() => handleSelectGender("female", auth.user?.gender)}>
                        <View className='bg-gray-200 p-3 rounded-lg'>
                            <Ionicons name='female-outline' size={20} />
                        </View>
                        <Text className='text-base font-sansmedium'>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center space-x-2' onPress={() => handleSelectGender("others", auth.user?.gender)}>
                        <View className='bg-gray-200 p-3 rounded-lg'>
                            <Ionicons name='male-female-outline' size={20} />
                        </View>
                        <Text className='text-base font-sansmedium'>Others</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            {loading ? <View className='flex justify-center items-center w-full h-screen absolute top-0 left-0 bg-black/90'>
                <ActivityIndicator />
            </View> : null}
        </View>
    )
}

export default Page