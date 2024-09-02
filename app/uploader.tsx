import React, { useEffect, useRef, useState, useDeferredValue } from 'react'
import { ActivityIndicator, FlatList, StyleProp, Text, TextInput, View, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'
import { Switch } from 'react-native'
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native'
import axios from "axios"
import Toast from 'react-native-toast-message'
import { addContent, createHashtag, searchHashtags } from '../lib/supabase'
import { LinearGradient } from 'expo-linear-gradient'
// import { EXPO_MSROOT } from "@env"
// import { Cache } from '@expo/image-utils';
// import { MentionInput, MentionSuggestions } from 'react-native-mentions';



type Props = {}

const Page = ({ route }: any) => {
    const navigation = useNavigation<any>()
    const { file, type, extension, placeholder } = route.params;
    const scrollRef = useRef<ScrollView>(null)
    // console.log({ file, type, extension, placeholder });
    

    const userid = "f274cf21-d570-4254-a0c2-002890e277eb";
    const [commenting, setCommenting] = useState(true)
    const [priced, setPriced] = useState(false)
    const [advanced, setAdvanced] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const textInputRef = useRef<TextInput>(null)
    const [ description, setDescription ] = useState("")

    const [openNetwork, setOpenNetwork] = useState(false);
    const [network, setNetwork] = useState("");

    const [openCategory, setOpenCategory] = useState(false);
    const [category, setCategory] = useState("Entertainment");

    const [openSuggestion, setOpenSuggestions] = useState(false);
    const [tagQuery, setTagQuery] = useState("");
    const [tagResults, setTagResults] = useState<Array<{ id: string, title: string, usage: null }>>([]);
    const [tagLoading, setTagLoading] = useState<boolean>(true);
    const [tagList, setTagList] = useState<Array<{ id: string, title: string, usage: null }>>([]);

    const [ createBtn, setCreateBtn ] = useState<boolean>(false)

    const [ range, setRange ] = useState<number>(25)

    const mockdata = [
        { id: "1", title: "#codemonga", usage: null },
        { id: "2", title: "#coolcats", usage: null },
        { id: "3", title: "#trendalong", usage: null },
        { id: "4", title: "#topdogs", usage: null },
        { id: "5", title: "#dontplay", usage: null },
        { id: "6", title: "#peterobi", usage: null },
        { id: "7", title: "#showworking", usage: null },
    ]

    const group = [ "Entertainment", "Sports", "Art and Craft", "Science and Technology", "Politics" ]
    const networks = [ "Ethereum", "Polygon", "Kinqle" ]

    const handletagQuery = async(text: string) => {
        if (text) {
            scrollRef.current?.scrollToEnd()
            setOpenSuggestions(true)
            setTagQuery(text)
            setTagLoading(true)
            setCreateBtn(false)
            try {
                const result: any = await searchHashtags(text)
                console.log(result);
                
                if (result.length > 0) {
                    setTagResults(result)
                } else {
                    setOpenSuggestions(false)
                    setTagResults([])
                    setCreateBtn(true)
                }
            } catch (error) {
                console.log(error);
                setCreateBtn(false)
            }
            setTagLoading(false)
        } else {
            setOpenSuggestions(false)
            setTagQuery(text)
            setCreateBtn(false)
            setTagResults([])
        }
        return;
    }

    const handleMock_tagQuery = async(text: string) => {
        if (text) {
            scrollRef.current?.scrollToEnd()
            setOpenSuggestions(true)
            setTagLoading(true)
            setTagQuery(text)
            setCreateBtn(false)
            setTimeout(() => {
                setTagResults(mockdata)
                setTagLoading(false)
            }, 2000);
        } else {
            setOpenSuggestions(false)
            setTagQuery(text)
            setCreateBtn(false)
            setTagResults([])
        }
        return;
    }

    const handleCreateHashtag = async(text: string) => {
        if (text) {
            setLoading(true)
            try {
                const result: any = await createHashtag(`#${text.toLowerCase().trim()}`, userid)
                console.log(result);
                
                if (result.length > 0) {
                    setCreateBtn(false);
                    setTagList(prev => [...prev, result[0]])
                    setTagQuery("")
                    Toast.show({
                        type: "success",
                        text1: "Hashtag created successfully!",
                        text2: `You have created the hashtag ${result[0].title}`
                    })
                } else {
                    Toast.show({
                        type: "error",
                        text1: "An error occurred!",
                        text2: "Could not create hashtag"
                    })
                }
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    text1: "Network error!",
                    text2: "Check internet connection"
                })
            }
            setLoading(false)
            return;
        } else {
            return;
        }
        
        return;
    }

    const handleSelectTag = (tag: { id: string, title: string, usage: null }) => {
        setTagList(prev => [...prev, tag])
        setTagQuery("");
        setOpenSuggestions(false)
        return;
    }

    const handleRemovetag = (id: string) => {
        const newList = tagList.filter((item) => item.id !== id)
        setTagList(newList)
        return;
    }

    const handleSelectCategory = (name: string) => {
        setCategory(name)
        setOpenCategory(false)
        return;
    }

    const handleSelectNetwork = (blockchain: string) => {
        setNetwork(blockchain)
        setOpenNetwork(false)
        return;
    }

    const uploadCloudinary = async(type: string) => {
        const formData: any = new FormData();
        formData.append('file', { 
            uri: file,
            type: type === "video" ? `video/${extension}` : type === "image" ? `image/${extension}` : null,
            name: type === "video" ? `video.${extension}` : type === "image" ? `image.${extension}` : null,
         });
        formData.append('upload_preset', type === "image" ? "photos_preset" : "videos_preset");

        try {
            const cloudname = process.env.CLOUDNAME;
            const resourcetype = (type === "image" ? "image" : type === "video" ? "video" : null)
            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/${resourcetype}/upload`, formData)
            console.log(data);
            const { secure_url } = data;
            const thumbnail = secure_url.replace("/upload/", "/upload/f_jpg/");
            return { secure_url, thumbnail };
            
        } catch (error) {
            console.log(error);
        }

    }

    const uploadFile = async(type: string) => {
        const imgExt = (type === "video" ? placeholder.split('.').pop() : "jpg");
        const formData: any = new FormData();
        type === "video" ? 
            formData.append('video', { 
                uri: file,
                type: `video/mp4`,
                name: `video.mp4`,
            }) : formData.append('photo', { 
                uri: file,
                type: `image/${extension}`,
                name: `image.${extension}`,
        })

        type === "video" ? formData.append('thumbnail', { 
            uri: placeholder,
            type: `video/${imgExt}`,
            name: `thumbnail.${imgExt}`,
        }) : null

        try {
            const resourcetype = (type === "image" ? "photo" : type === "video" ? "video" : null)
            const { data } = await axios.post(`${process.env.MSROOT}/upload/${resourcetype}`, formData)
            console.log(data);
            // const { url, screenshot, blurhash } = data.result;
            return data.result;
            
        } catch (error) {
            console.log(error);
        }

    }

    const getHashtags = (list: Array<{ id: string, title: string, usage: null }>) => {
        const tags = list.length > 0 ? list.map(tag => tag.title) : null
        return tags;
    }

    const handleSubmitCloudinary = async() => {
        setLoading(true)
        try {
            const { secure_url, thumbnail }: any = await uploadCloudinary(type)
            if (secure_url) {
                const content = await addContent({
                    creator_id: userid,
                    type: (type === "image" ? "photo" : type), // enum [ free, asset ]
                    premium: false,
                    url: secure_url,
                    thumbnail: (type === "video" ? thumbnail : null),
                    orientation: "potrait",
                    category,
                    description,
                    hashtags: getHashtags(tagList),
                    commenting
                })
                console.log(content);
                Toast.show({
                    type: "success",
                    text1: "Upload successful!",
                    text2: "File uploaded to cloudinary"
                })
                navigation.goBack();
            }
            console.log({ secure_url, thumbnail });
            setLoading(false)
            return;
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Network Error!",
                text2: "An error occurred, try again later!"
            })
            setLoading(false)
        }
    }

    const handleSubmit = async() => {
        setLoading(true)
        try {
            const { url, screenshot, blurhash }: any = await uploadFile(type)
            if (url) {
                const content = await addContent({
                    creator_id: userid,
                    type: (type === "image" ? "photo" : type), // enum [ free, asset ]
                    premium: false,
                    url,
                    thumbnail: (type === "video" ? screenshot : null),
                    orientation: "potrait",
                    category,
                    blurhash,
                    description,
                    hashtags: getHashtags(tagList),
                    commenting
                })
                console.log(content);
                Toast.show({
                    type: "success",
                    text1: "Upload successful!",
                    text2: "File uploaded to storage"
                })
                navigation.goBack();
            }
            console.log({ url, screenshot, blurhash });
            setLoading(false)
            return;
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Network Error!",
                text2: "An error occurred, try again later!"
            })
            setLoading(false)
        }
    }
    
    return (
        <LinearGradient className="h-full" colors={["#202124", "black"]} start={{ x: 0, y: 0.1 }}>
            <SafeAreaView className=''>
                <View className='py-2 px-3 flex-row items-center justify-between'>
                    <TouchableOpacity className='pr-3 py-3' onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={25} color={"#ffffff"} />
                    </TouchableOpacity>
                    <TouchableOpacity className='py-2 px-4 bg-inverse rounded-xl flex-row items-center space-x-1' onPress={handleSubmit}>
                        <Ionicons name='cloud-upload-outline' size={15} />
                        <Text className='font-sansmedium'>Upload</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className='h-full bg-primar' ref={scrollRef}>
                    <SafeAreaView>
                        <View className='w-full'>
                            <View className='items-center'>
                                <Image 
                                    source={(type === "video" ? placeholder : file)} 
                                    className='w-24 aspect-[9/16] bg-secondary'
                                    contentFit="cover"
                                    placeholder={""}
                                    transition={1000}
                                />
                                {type == "video" ? <View className='w-full h-full absolute top-0 left-0 justify-center items-center'>
                                    <View className='w-24 bg-secondary/40 h-full justify-center items-center'>
                                        <Ionicons name='play-outline' color="white" size={20} />
                                    </View>
                                </View> : null}
                            </View>
                        </View>
                        <View className='space-y- px-5 mt-10'>
                            <View className='space-y-2 mb-5'>
                                <Text className='text-xs text-gray-300 ml-1 font-sansregular'>Description</Text>
                                <TextInput placeholder='Write about it' className='py-3 px-3 h-28 bg-secondary rounded-lg border border-secondary text-inverse font-sansmedium' ref={textInputRef} autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='text' placeholderTextColor={"#A5A6A7"} multiline numberOfLines={5} cursorColor="#22B8BD" value={description} onChangeText={setDescription} />
                            </View>
                            <View className='mb-0'>
                                <Text className='text-xs mb-2 text-gray-300 ml-1 font-sansregular'>Hashtags</Text>
                                <View className='bg-secondary rounded-lg flex-row w-full justify-between items-center border border-secondary mb-2'>
                                    <TextInput placeholder='Add or Create your hashtags' className='py-[14px] px-3 flex-1 text-inverse font-sansmedium' autoCapitalize='none' autoComplete='off' autoCorrect={false} inputMode='none' placeholderTextColor={"#A5A6A7"} value={tagQuery} maxLength={30} onChangeText={(text) => handleMock_tagQuery(text)
                                    } />
                                    {createBtn ? <TouchableOpacity className='px-3 mr-[6px] py-2 rounded-lg bg-accent' onPress={() => handleCreateHashtag(tagQuery)}>
                                        <Text className='font-sansmedium'>Create</Text>
                                    </TouchableOpacity> : null}
                                </View>
                                {openSuggestion ? <View className='mb-2'>
                                    {tagLoading ? <View className='h-40 w-full rounded-lg bg-secondary items-center justify-center'><ActivityIndicator /></View> : <ScrollView className='h-40 w-full bg-secondary rounded-lg' style={{ zIndex: 10000}}>
                                        {tagResults.map((data: { id: string, title: string, usage: null }, index: number) => <TouchableOpacity className='py-3 px-3 w-full bg-gray-70 flex-row items-center justify-between' key={index} onPress={() => handleSelectTag(data)}>
                                            <Text className='text-inverse font-sansmedium'>{data.title}</Text>
                                            <Text className='text-xs text-slate-400 font-sansregular'>{data.usage}</Text>
                                        </TouchableOpacity>)}
                                    </ScrollView>}
                                </View> : null}
                                {!openSuggestion ? <View className='flex-row mt-1'>
                                    <Text className='font-sansmedium'>
                                        {tagList.length > 0 ? tagList.map((hashtag, index) => <TouchableOpacity className='px-2 py-1 bg-secondary rounded-lg flex-row items-center mr-2 mb-[6px]' key={index} onPress={() => handleRemovetag(hashtag.id)}>
                                            <Text className='text-inverse text-xs font-sansmedium'>{hashtag.title}</Text>
                                            <Ionicons name='close-outline' color="white" />
                                        </TouchableOpacity>) : null}
                                    </Text>
                                </View> : null}
                            </View>
                            <View className='space-y-2'>
                                <Text className='text-xs text-gray-300 ml-1 font-sansregular'>Category</Text>
                                <TouchableOpacity className='bg-secondary rounded-lg flex-row w-full justify-between items-center border border-secondary focus:border-accent py-[7px]' onPress={() => {
                                    scrollRef.current?.scrollToEnd()
                                    setOpenCategory(prev => !prev)
                                    }}>
                                    <View className='flex-1 pl-4'>
                                        {category ? <Text className='text-inverse font-sansmedium'>{category}</Text> : <Text className='text-tertiary'>Select category</Text>}
                                    </View>
                                    <View className='py-1 px-3'>
                                        <Ionicons name='chevron-down' size={20} color={"white"} />
                                    </View>
                                </TouchableOpacity>
                                {openCategory ? <View className='bg-secondary py-3 rounded-lg'>
                                    {group.map((data, index) => <TouchableOpacity className='py-4 px-3 w-full bg-gray-70 flex-row items-center justify-between' key={index} onPress={() => handleSelectCategory(data)}>
                                        <Text className='text-inverse text-bas font-sansregular'>{data}</Text>
                                    </TouchableOpacity>)}
                                </View> : null}
                            </View>
                        </View>
                        <TouchableOpacity className='mt-10 flex-row self-center items-center space-x-1' onPress={() => setAdvanced(prev => !prev)}>
                            <Text className='text-lg font-sansbold text-inverse text-center'>Advanced Options</Text>
                            <Ionicons name={advanced ? 'chevron-down' : 'chevron-up'} size={25} color={"white"} />
                        </TouchableOpacity>
                        <View className='px-5 mt-5 mb-40'>
                            {advanced ? <View>
                                <View className='flex-row items-center justify-between py-4 rounded-xl mx-1'>
                                    <Text className='text-base text-inverse font-sansmedium'>Allow comments</Text>
                                    <View className='flex-row items-center'>
                                        <Switch value={commenting} trackColor={{ false: "transparent", true: "#22B8BD"}} thumbColor={false ? "black" : "white"} onValueChange={(value) => setCommenting(value)}
                                        />
                                    </View>
                                </View>
                                <View className='flex-row items-center justify-between py-4 rounded-xl mx-1'>
                                    <Text className='text-base text-inverse font-sansmedium'>Priced content</Text>
                                    <View className='flex-row items-center'>
                                        <Switch value={priced} trackColor={{ false: "transparent", true: "#22B8BD"}} thumbColor={false ? "black" : "white"} onValueChange={(value) => setPriced(value)} />
                                    </View>
                                </View>
                                {priced ?  <View className='space-y-2 mt-3'>
                                    <Text className='text-xs text-gray-300 ml-1 font-sansregular'>Blockchain Network</Text>
                                    <TouchableOpacity className='bg-secondary rounded-lg flex-row w-full justify-between items-center border border-secondary focus:border-accent py-[7px]' onPress={() => setOpenNetwork(prev => !prev)}>
                                        <View className='flex-1 text-inverse pl-4'>
                                            {network ? <Text className='text-inverse font-sansmedium'>{network}</Text> : <Text className='text-tertiary'>Select Network</Text>}
                                        </View>
                                        <View className='py-1 px-3'>
                                            <Ionicons name='chevron-down' size={20} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                    {openNetwork ? <View className='bg-secondary py-3 rounded-lg'>
                                        {networks.map((data, index) => <TouchableOpacity className='py-4 px-3 w-full bg-gray-70 flex-row items-center justify-between' key={index} onPress={() => handleSelectNetwork(data)}>
                                            <Text className='text-inverse font-sansregular'>{data}</Text>
                                        </TouchableOpacity>)}
                                    </View> : null}
                                </View> : null}
                                {priced ? network ? <View className='mt-7'>
                                    <Text className='text-gray-300 text-xs mb-2 ml-1 font-sansregular'>Select Royalty</Text>
                                    <Slider
                                        style={{width: "100%", height: 20}}
                                        minimumValue={1}
                                        maximumValue={25}
                                        step={1}
                                        // value={range}
                                        minimumTrackTintColor="#22B8BD"
                                        maximumTrackTintColor="#202124"
                                        thumbTintColor='#22B8BD'
                                        onValueChange={(value) => setRange(value)}
                                    />
                                    <View className='w-full flex-row items-center justify-between px-2'>
                                        <Text className='text-inverse text-xs font-sansmedium'>1%</Text>
                                        <Text className='font-bold text-accent text-base font-sansmedium'>{range}%</Text>
                                        <Text className='text-inverse text-xs font-sansmedium'>25%</Text>
                                    </View>
                                </View> : null : null}
                                {priced ? network ? <View className='mt-10 flex-row items-center justify-between'>
                                    <Text className='text-inverse font-semibold text-base ml-1 font-sansbold'>Total cost</Text>
                                    <Text className='text-accent text-xl font-black ml-1 font-sansbold'>2.03SOL</Text>
                                </View> : null : null}
                            </View> : null}
                        </View>
                    </SafeAreaView>
                </ScrollView>
                {loading ? <View className='h-screen w-full bg-inverse/10 justify-center items-center absolute top-0 left-0'>
                    <ActivityIndicator />
                </View> : null}
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Page