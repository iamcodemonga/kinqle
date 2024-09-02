import React from 'react'
import { FlatList, Text, View } from 'react-native'
import FeedTile from './Feedtile'

type Props = {}

const FeedTiles = (props: Props) => {
    return (
        <View className='mx-2 mb-5'>
            <Text className='mb-4 mt-1 ml-1 text-inverse text-base font-sansmedium'>Trending Flips</Text>
            <FlatList
                data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]}
                renderItem={({ item }) => <FeedTile />}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
                ItemSeparatorComponent={() => <View className='w-[8px]'></View>}
            />
            <Text className='text-base mt-5 text-inverse ml-1 font-sansmedium'>Explore More</Text>
        </View>
    )
}

export default FeedTiles