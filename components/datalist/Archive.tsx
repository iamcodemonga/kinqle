import Masonry from "@react-native-seoul/masonry-list"
import { StyleSheet, Text, View } from 'react-native'
import { topcreatorsdata } from '../../data'
import ProfileCard from '../cards/ProfileCard'

type Props = {}

const Archive = (props: Props) => {
    return (
        <View className="h-full w-full bg-inverse">
                {/* <Masonry
                    data={[]}
                    renderItem={({ item, i }: any) => <ProfileCard item={item} index={i} />}
                    numColumns={2}
                    ListEmptyComponent={<View className="h-80 w-full flex-row justify-center items-center">
                        <Text className="text-slate-500">No saved content</Text>
                    </View>}
                    contentContainerStyle={styles.masonrystyle}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View className="h-20"></View>}
                /> */}
            </View>
    )
}

const styles = StyleSheet.create({
    masonrystyle: {
        paddingTop: 10,
        // paddingHorizontal: 3,
        paddingBottom: 70
    }
})

export default Archive