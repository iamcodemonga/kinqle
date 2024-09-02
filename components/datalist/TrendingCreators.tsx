import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View, useWindowDimensions } from 'react-native'
// import TopCreators from './TopCreators'
// import { hashtagdata, stagedata, topcreatorsdata } from '../../data'
// import MasonCreator from '../Cards/MasonCreator'
// import SuggestedCreators from './SuggestedCreators'

type Props = {}

const TrendingCreators = (props: Props) => {
    const [ data, setData ] = useState<any>([])
    const [ loading, setLoading] = useState(false)

    const loadData = () => {
        setLoading(true)
        setTimeout(() => {
            // setData(hashtagdata)
            setLoading(false)
        }, 3000);
    }

    useEffect(() => {
        loadData()
    }, [])

    const { width } = useWindowDimensions()

    return (
        <View className='mt-5' style={{ width: width }}>
            {/* {loading ? <ActivityIndicator /> : 
            <FlatList
                ListHeaderComponent={() => <TopCreators data={topcreatorsdata} />}
                data={(data)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => <View></View>}
                // renderItem={({ item}) => <AudienceFeed item={item} activePostId={activePostId} />}
                ItemSeparatorComponent={() => <View className='h-20'></View>}
                ListFooterComponent={<SuggestedCreators />}
                showsVerticalScrollIndicator={false}
            />} */}
        </View>
    )
}

export default TrendingCreators