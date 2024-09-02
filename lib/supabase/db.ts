import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
// import { MSROOT, SUPABASEURL, SUPABASEANONKEY } from "@env"

const supabaseUrl: string = `${process.env.EXPO_PUBLIC_SUPABASEURL}`
const supabaseAnonKey = `${process.env.EXPO_PUBLIC_SUPABASEANONKEY}`

// export const db = createClient(supabaseUrl, supabaseAnonKey)

export const db = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })