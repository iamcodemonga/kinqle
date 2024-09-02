import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View, ViewToken, useWindowDimensions } from 'react-native'
import FeedTiles from '../tiles/FeedTiles'
import Feed from '../cards/HomeFeeds'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/store'
import { TContent } from '../../types'
import { getCelebrityPosts } from '../../lib/supabase'

type Props = {}

const TrendsForYou = (props: Props) => {
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
        <View className='mt-5' style={{ width: width }}>
            {loading ? <View className='w-full h-5/6 justify-center items-center'><ActivityIndicator /></View> : 
            <FlatList
                ListHeaderComponent={<FeedTiles />}
                data={(data)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item}) => <Feed item={item} activePostId={activePostId as string} />}
                // renderItem={({ item}) => <AudienceFeed item={item} activePostId={activePostId} />}
                ItemSeparatorComponent={() => <View className='h-7'></View>}
                ListFooterComponent={<View className='h-52'></View>}
                // viewabilityConfig={{
                //     itemVisiblePercentThreshold: 50
                // }}
                // onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />}
        </View>
    )
}

export default TrendsForYou