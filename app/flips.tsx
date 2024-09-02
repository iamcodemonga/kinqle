import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View, ViewToken, useWindowDimensions, Platform, StatusBar, Dimensions } from 'react-native'
import FlipFeed from '../components/cards/FlipFeed'
import { stagedata } from '../data'
import { SafeAreaView } from 'react-native-safe-area-context'
import ColorCards from '../components/cards/ColorCards'

type Props = {
    tabIndex: number
}

const Page = ({ route  }: any) => {
    const  { fulldata, index } = route.params
    const { width, height } = Dimensions.get("window")
    const [ data, setData ] = useState<any>(stagedata)
    const [ activePostId, setActivePostId ] = useState<number>(fulldata[index]?.id)

    // const { width, height } = Dimensions.get("screen")
    console.log(height, width);
    

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
        Platform.OS === "android" ? <SafeAreaView className='bg-primary'>
            <StatusBar barStyle="light-content" backgroundColor={"black"} />
            <FlatList
            className='bg-primary'
                data={(fulldata)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item}) => <FlipFeed item={item} activePostId={activePostId} />}
                style={{height: height}}
                // renderItem={({ item, index }) => <ColorCards color={index == 0 ? 'green' : index ==  1 ?  "red" : "blue"} />}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />
        </SafeAreaView> : <FlatList
            data={(fulldata)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item}) => <FlipFeed item={item} activePostId={activePostId} />}
            style={{height: height}}
            // renderItem={({ item, index }) => <ColorCards color={index == 0 ? 'green' : index ==  1 ?  "red" : "blue"} />}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            pagingEnabled
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />
    )
}

export default Page