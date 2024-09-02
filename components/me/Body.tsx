import { topcreatorsdata } from "../../data"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import ProfileCard from "../Cards/ProfileCard"
import { useRef, useState } from "react"
import Uploads from "../datalist/Uploads"
import Museum from "../datalist/Museum"
import Archive from "../datalist/Archive"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { RootState } from "../../features/store"
import EmptyCards from "./EmptyCards"
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {}

const ProfileBody = (props: Props) => {

    const [ tabIndex, setTabIndex ] = useState(0)
    const tabRef = useRef<any>();
    const navigation = useNavigation<any>()
    const auth = useSelector((state: RootState) => state.auth)

    const handleTopTabs = (index: number) => {
        setTabIndex(index)
        if (index < 2) {
            tabRef.current?.scrollTo()
        }
        if (index >= 2) {
            tabRef.current?.scrollToEnd()
        }
    }

    return (
        <View className="px-1 bg-inverse h-full rounded-t-3xl">
            <View>
                <ScrollView horizontal className='pl-3 pt-3' showsHorizontalScrollIndicator={false} ref={tabRef}>
                    <View className=''>
                        <TouchableOpacity className={tabIndex == 0 ? 'bg-inverse w-28 rounded-2xl pt-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(0)}>
                            <Text className={tabIndex == 0 ? "text-center text-accent font-sansbold" : "text-center font-sansbold text-slate-600"}>{auth.user ? `Uploads(48K)` : "Uploads"}</Text>
                            {tabIndex == 0 ? <View className="w-full items-center">
                                <Ionicons name='caret-down' color="#22B8BD" size={13} />
                            </View> : null}
                        </TouchableOpacity>
                    </View>
                    <View className='px-2'>
                        <TouchableOpacity className={tabIndex == 1 ? 'w-28 rounded-2xl pt-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(1)}>
                            <Text className={tabIndex == 1 ? "text-center text-accent font-sansbold" : "text-center font-sansbold text-slate-600"}>{auth.user ? `Flips(2.7M)` : "Flips"}</Text>
                            {tabIndex == 1 ? <View className="w-full items-center">
                                <Ionicons name='caret-down' color="#22B8BD" size={13} />
                            </View> : null}
                        </TouchableOpacity>
                    </View>
                    <View className=''>
                        <TouchableOpacity className={tabIndex == 2 ? 'bg-inverse w-28 rounded-2xl pt-3' : 'w-28 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(2)}>
                            <Text className={tabIndex == 2 ? "text-center text-accent font-sansbold" : "text-center font-sansbold text-slate-600"}>{auth.user ? `Archive(235k)` : "Archive"}</Text>
                            {tabIndex == 2 ? <View className="w-full items-center">
                                <Ionicons name='caret-down' color="#22B8BD" size={13} />
                            </View> : null}
                        </TouchableOpacity>
                    </View>
                    <View className='mr-8 hidde'>
                        <TouchableOpacity className={tabIndex == 3 ? 'bg-inverse w-36 rounded-2xl pt-3' : 'w-36 rounded-xl py-3'} activeOpacity={0.3} onPress={() => handleTopTabs(3)}>
                            <Text className={tabIndex == 3 ? "text-center text-accent font-sansbold" : "text-center font-sansbold text-slate-600"}>Assets(42)</Text>
                            {tabIndex == 3 ? <View className="w-full items-center">
                                <Ionicons name='caret-down' color="#22B8BD" size={13} />
                            </View> : null}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            {tabIndex === 0 ? auth.user ? <Uploads /> : <EmptyCards title="Sign up and start shooting content!" /> : null}
            {tabIndex === 1 ? auth.user ? <Museum /> : <EmptyCards title="Add your favourite contents to your museum!" /> : null}
            {tabIndex === 2 ? auth.user ? <Archive /> : <EmptyCards title="Save your private contents to your archive!" /> : null}
        </View>
    )
}

export default ProfileBody