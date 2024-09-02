import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import { checkEmailExists, checkUsernameExists, addUser } from '../../lib/supabase';
import { checkEmailExists, checkUsernameExists, addUser } from '../../lib/supabase';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../../features/authSlice';
import { AppDispatch } from '../../features/store';
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import bs58 from "bs58"

type Props = {}

type TUser = {
    id: string,
    fullname: string,
    email: string,
    username: string,
    dp?: string,
    title?: string,
    bio?: string,
    private?: boolean,
    ghost?: boolean
}

const Register = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>()
    const [ fullname, setFullname ] = useState("");
    const [ step, setStep ] = useState(1);
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ key, setKey ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ secure, setSecure ] = useState(true)
    const [ loading, setLoading ] = useState(false)


    // const fullnameRegex = /^([a-zA-Z ]+)$/;
    const usernameRegex = /^([a-zA-Z0-9\-_]+)$/;
    const emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;

    const [ interests, setInterest ] = useState<Array<string>>([])
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({
        'entertainment': false,
        'sports': false,
        'art and craft': false,
        'politics': false,
        'science and technology': false
      });

    useEffect(() => {
    // Update checkbox state initially
    const updatedCheckboxStates = { ...checkboxStates };
    for (const item of Object.keys(updatedCheckboxStates)) {
        updatedCheckboxStates[item] = interests.includes(item);
    }
    setCheckboxStates(updatedCheckboxStates);
    }, [interests]);

    const handleCheckboxChange = (label: string, isChecked: boolean) => {
        const updatedCheckboxStates = { ...checkboxStates, [label]: isChecked };
        setCheckboxStates(updatedCheckboxStates);
        
        if (isChecked) {
            setInterest((prevSelectedItems) => {
                if (prevSelectedItems.length >= 3) {
                    // Alert.alert("Limit reached", "You can only choose three of your interest")
                    return [...prevSelectedItems]
                } else {
                    return [...prevSelectedItems, label]
                }
            });
        } else {
            setInterest((prevSelectedItems) => prevSelectedItems.filter((item) => item !== label));
        }
    };

    const handleSecureText = () => {
        if (secure) {
            setSecure(false)
        } else {
            setSecure(true)
        }
        return;
    }

    const handleProceed = async() => {
        if (!email || !username || !password) {
            Toast.show({
                type: "error",
                text1: "Please fill in all fields!"
            })
            return;
        }

        // check for username REGEX
        if (!usernameRegex.test(username)) {
            Toast.show({
                type: "error",
                text1: "Username should not include @#$%&!"
            })
            return;
        }

        // check for email REGEX
        if (!emailRegex.test(email)) {
            Toast.show({
                type: "error",
                text1: "Wrong email address format!"
            })
            return;
        }

        // check username availability
        setLoading(true)
        if (await checkUsernameExists(username)) {
            Toast.show({
                type: "error",
                text1: "Username already taken!"
            })
            setLoading(false)
            return;
        }

        // check email availability
        if (await checkEmailExists(email)) {
            Toast.show({
                type: "error",
                text1: "Email already taken!",
            })
            setLoading(false)
            return;
        }
        
        setLoading(false)
        setStep(2)
    }

    const handleSkip = async() => {
        // Create wallet
        const keypair = Keypair.generate();
        const walletaddress = keypair.publicKey.toBase58()
        const walletsecret = bs58.encode(keypair.secretKey)
        const accumulation = 10
        console.log({ keypair, walletaddress, walletsecret });
        setLoading(true)
        // console.log(keypair.publicKey.toBase58());
        try {
            const userInfo = await addUser({ username: username.toLowerCase(), email: email.toLowerCase(), password, address: walletaddress, key: walletsecret, accumulation })
            // Send welcome message to E-mail address
            dispatch(registerUser(userInfo as TUser))
            navigation.goBack();
            return;
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return;
    }

    const handleFinish = async() => {
        // Create wallet
        const keypair = Keypair.generate();
        const walletaddress = keypair.publicKey.toBase58()
        const walletsecret = bs58.encode(keypair.secretKey)
        const accumulation = 10;
        console.log({ keypair, walletaddress, walletsecret });
        setLoading(true)
        try {
            const userInfo = await addUser({ username: username.toLowerCase(), email: email.toLowerCase(), password, interests, address: walletaddress, key: walletsecret, accumulation })
            // Send welcome message to E-mail address
            dispatch(registerUser(userInfo as TUser))
            setLoading(false)
            navigation.goBack()
            return;
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return;
    }

    return (
        <>
            {step == 1 ? <ScrollView className='hidde'>
                <View className='w-96 self-center'>
                    <View className='flex-row items-center justify-center mb-7 space-x-4 mt-10'>
                        <View>
                            <Image source={require("../../assets/images/Logo.png")} className='w-10 h-10' />
                        </View>
                        <Text className='text-2xl text-inverse font-sansmedium'>Sign Up</Text>
                    </View>
                    <View className='space-y-5 px-5'>
                        <View className='space-y-2'>
                            <Text className='text-xs ml-1 text-inverse font-sansregular'>Username</Text>
                            <TextInput placeholder='e.g john_doe23' className='py-3 px-3 bg-secondary rounded-lg border border-secondary focus:border-accent text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='text' placeholderTextColor={"#A5A6A7"} value={username} onChangeText={setUsername} />
                        </View>
                        <View className='space-y-2'>
                            <Text className='text-xs ml-1 text-inverse font-sansregular'>Email address</Text>
                            <TextInput placeholder='e.g johndoe@gmail.com' className='py-3 px-3 bg-secondary rounded-lg border border-secondary focus:border-accent text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='email' placeholderTextColor={"#A5A6A7"} value={email} onChangeText={setEmail} />
                        </View>
                        <View className='space-y-2'>
                            <Text className='text-xs ml-1 text-inverse font-sansregular'>Password</Text>
                            <View className='bg-secondary rounded-lg flex-row w-full justify-between items-center border border-secondary focus:border-accent'>
                                <TextInput placeholder='e.g xxxxxxxxxx' className='py-[14px] px-3 flex-1 text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='none' placeholderTextColor={"#A5A6A7"} value={password} onChangeText={setPassword} secureTextEntry={secure} />
                                <TouchableOpacity className='px-3' onPress={handleSecureText}>
                                    <Ionicons name={secure ? `eye-outline` : `eye-off-outline`} color="white" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View className='mt-5'>
                        <Text className='text-xs text-inverse text-center font-sansregular'>By signing up, you agree to all our terms and conditions</Text>
                    </View>
                    <View className='px-5 mt-7'>
                        <TouchableOpacity className='py-4 bg-accent rounded-lg' onPress={handleProceed}>
                            <Text className='text-center font-sansmedium'>Procced</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row justify-center mt-10 space-x-5 hidde'>
                        <TouchableOpacity className='justify-center items-center w-12 h-12 rounded-xl bg-inverse'>
                            <Ionicons name='logo-google' size={20} color={"red"} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity className='w-12 h-12 rounded-xl bg-inverse justify-center items-center'>
                            <Ionicons name='logo-twitter' size={20} color={"#1DA1F2"} />
                        </TouchableOpacity> */}
                        <TouchableOpacity className='w-12 h-12 rounded-xl bg-inverse justify-center items-center'>
                            <Ionicons name='logo-apple' size={20} color={"black"} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity className='w-12 h-12 rounded-xl bg-inverse justify-center items-center'>
                            <Ionicons name='logo-instagram' size={20} color={"purple"} />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView> : <View className='h-4/5 w-full flex-row justify-center items-center'>
                <View className='w-96'>
                    <View className='flex-row items-center justify-center mb-7 space-x-4'>
                        <Text className='text-lg text-inverse font-sansbold'>Select (3) of your Interests</Text>
                    </View>
                    <View className='space-y-6 px-5'>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['entertainment']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Entertainment</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("entertainment") ? true : false}
                                onPress={(isChecked) => handleCheckboxChange('entertainment', isChecked)}
                            />
                        </View>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['art and craft']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Art and Craft</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("art and craft") ? true : false}
                                // isChecked={false}
                                onPress={(isChecked) => handleCheckboxChange('art and craft', isChecked)}
                            />
                        </View>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['sports']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Sport</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("sport") ? true : false}
                                onPress={(isChecked) => handleCheckboxChange('sports', isChecked)}
                            />
                        </View>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['science and technology']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Science and Technology</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("science and technology") ? true : false}
                                onPress={(isChecked) => handleCheckboxChange('science and technology', isChecked)}
                            />
                        </View>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['politics']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base font-sansmedium'>Politics</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("politics") ? true : false}
                                onPress={(isChecked) => handleCheckboxChange('politics', isChecked)}
                            />
                        </View>
                    </View>
                    <View className='px-5 mt-9'>
                        <TouchableOpacity className='py-4 bg-accent rounded-lg' onPress={handleFinish}>
                            <Text className='text-center font-sansmedium'>Finish</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>}
            {loading ? <View className='bg-inverse/10 h-screen absolute w-full flex-row items-center justify-center'>
                <ActivityIndicator />
            </View> : null}
            {step == 2 ? <TouchableOpacity className='bg-inverse absolute bottom-12 right-7 flex-row items-center py-2 px-5 rounded-lg' onPress={handleSkip}>
                <Text className='text-xs font-sansmedium'>Skip</Text>
                <Ionicons name='chevron-forward-outline' size={20} />
            </TouchableOpacity> : null}
        </>
    )
}

export default Register