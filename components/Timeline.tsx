import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View, ViewToken, useWindowDimensions } from 'react-native'
// import { stagedata, audiencedata } from '../../data'
// import FeedTiles from './FeedTiles'
import Feed from '../components/cards/HomeFeeds'
import { getCelebrityPosts } from '../lib/supabase'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '../features/store'
import { TContent } from "../types"

const Timeline = () => {
    const navigation = useNavigation<any>()
    const auth = useSelector((state: RootState) => state.auth)
    const [ data, setData ] = useState<Array<TContent> | null>(null)
    const [ activePostId, setActivePostId ] = useState<string | null>(null)
    const [ loading, setLoading] = useState(false)

    const loadData = async() => {
        setLoading(true)
        try {
            const stagedata: any = await getCelebrityPosts(auth.user?.id as string, 0, 9)
            setData(stagedata as Array<TContent>)
            setActivePostId(stagedata[0]?.id as string)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const { width } = useWindowDimensions()

    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig: { itemVisiblePercentThreshold: 50 },
            onViewableItemsChanged: ({ changed, viewableItems }: { changed: ViewToken[], viewableItems: ViewToken[] }) => {
                if (viewableItems.length > 0 && viewableItems[0].isViewable) {
                    setActivePostId(viewableItems[0].item.id)
                }
            }
        }
    ]);

    return (
        <View style={{ width: width, height: "100%" }}>
            {loading ? <View className='w-full h-4/6 justify-center items-center'><ActivityIndicator /></View> : 
            <FlatList
                // ListHeaderComponent={<FeedTiles />}
                data={(data)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Feed item={item as TContent} activePostId={activePostId as string} />}
                ItemSeparatorComponent={() => <View className='h-7'></View>}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                ListFooterComponent={() => <View className='h-56'></View>}
            />}
        </View>
    )
}

export default Timeline