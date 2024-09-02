import Masonry from "@react-native-seoul/masonry-list"
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { topcreatorsdata } from '../../data'
import ProfileCard from '../cards/ProfileCard'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyFlips } from "../../features/contentSlice"
import { AppDispatch, RootState } from "../../features/store"
import { useNavigation } from "@react-navigation/native"
import { getAllUserPosts } from "../../lib/supabase"

type Props = {}

const Museum = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const auth = useSelector((state: RootState) => state.auth)
    const uploads = useSelector((state: RootState) => state.content)
    const [ post, setPost ] = useState<any>([])
    const navigation = useNavigation<any>()

    const loadPosts = async() => {
        await dispatch(fetchMyFlips(auth.user?.id as string))
        console.log(uploads.myUploads);
    }
    

    useEffect(() => {
        loadPosts()
    }, [])

    return (
        <View className="h-full w-full bg-inverse">
                <Masonry
                    data={uploads.myFlips}
                    renderItem={({ item, i }: any) => <ProfileCard fulldata={uploads.myFlips} item={item} index={i} />}
                    numColumns={2}
                    ListEmptyComponent={uploads.myFlipsLoading ? <View className="h-80 w-full flex-row justify-center items-start pt-10">
                        <ActivityIndicator />
                    </View> : <View className="h-80 w-full flex-row justify-center items-center"><Text className="text-slate-500">No Flips uploaded</Text>
                </View>}
                    contentContainerStyle={styles.masonrystyle}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View className="h-20"></View>}
                />
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

export default Museum