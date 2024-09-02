import React from 'react'
import { View } from 'react-native';

type Props = {
    color: string;
}

const ColorCards = ({ color }: Props) => {
  return (
    <View className='' style={{ backgroundColor: color, flex: 1}}>
    </View>
  )
}

export default ColorCards