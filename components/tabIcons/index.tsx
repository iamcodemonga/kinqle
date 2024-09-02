import { Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

export const HomeIcon = (active: boolean) => {
    return (<View className="absolute py-2">
        <View className="w-full flex-row justify-center pb-1">
          {active ? <Ionicons name="tv" size={20} color="#22B8BD" /> : <Ionicons name="tv-outline" size={20} color="#A5A6A7" />
          }
        </View>
        <Text className={active ? "text-accent text-center font-sansbold" : "text-gray-400 text-center text-xs font-sansregular"}>Home</Text>
      </View>)
}

export const TrendIcon = (active: boolean) => {
    return (<View className="absolute py-2">
        <View className="w-full flex-row justify-center pb-1">
          {active ? <Ionicons name="flame" size={20} color="#22B8BD" /> : <Ionicons name="flame-outline" size={20} color="#A5A6A7" />
          }
        </View>
        <Text className={active ? "text-accent text-center font-sansbold" : "text-gray-400 text-center text-xs font-sansregular"}>Trending</Text>
      </View>)
}

export const BellIcon = (active: boolean) => {
  return (<View className="absolute py-2">
      <View className="w-full flex-row justify-center pb-1">
        {active ? <Ionicons name="notifications" size={20} color="#22B8BD" /> : <Ionicons name="notifications-outline" size={20} color="#A5A6A7" />
        }
      </View>
      <Text className={active ? "text-accent text-center font-sansbold" : "text-gray-400 text-center text-xs font-sansregular"}>Notifications</Text>
    </View>)
}

export const ProfileIcon = (active: boolean) => {
  return (<View className="absolute py-2">
      <View className="w-full flex-row justify-center pb-1">
        {active ? <Ionicons name="person" size={20} color="#22B8BD" /> : <Ionicons name="person-outline" size={20} color="#A5A6A7" />
        }
      </View>
      <Text className={active ? "text-accent text-center font-sansbold" : "text-gray-400 text-center text-xs font-sansregular"}>Me</Text>
    </View>)
}