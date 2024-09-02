import React from 'react'
import { FlatList, View } from 'react-native'
// import TileShowcase from './TileShowcase'
// import { hashtagdata } from '../../data'

type Props = {}

const TrendingCartegories = (props: Props) => {
    return (
        <View className='mt-0'>
            <View className='mt-5'>
                {/* <FlatList
                    data={hashtagdata}
                    renderItem={({ item }) => <TileShowcase data={item} hashtags={false} />}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View className='h-7'></View>}
                    ListFooterComponent={<View className='h-44 mt-7'></View>}
                /> */}
            </View>
        </View>
    )
}

export default TrendingCartegories