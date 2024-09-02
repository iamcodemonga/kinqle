import { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {}

const PickInterests = (props: Props) => {

    const [ interests, setInterest ] = useState<Array<string>>([])
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({
        'entertainment': false,
        'sports': false,
        'art and craft': false,
        'politics': false,
        'science and technology': false
      });

      useEffect(() => {
        // Update checkbox state initially
        const updatedCheckboxStates = { ...checkboxStates };
        for (const item of Object.keys(updatedCheckboxStates)) {
          updatedCheckboxStates[item] = interests.includes(item);
        }
        setCheckboxStates(updatedCheckboxStates);
      }, [interests]);

    const handleCheckboxChange = (label: string, isChecked: boolean) => {
        const updatedCheckboxStates = { ...checkboxStates, [label]: isChecked };
        setCheckboxStates(updatedCheckboxStates);
        
        if (isChecked) {
            setInterest((prevSelectedItems) => {
                if (prevSelectedItems.length >= 3) {
                    // Alert.alert("Limit reached", "You can only choose three of your interest")
                    return [...prevSelectedItems]
                } else {
                    return [...prevSelectedItems, label]
                }
            });
        } else {
            setInterest((prevSelectedItems) => prevSelectedItems.filter((item) => item !== label));
        }
    };

    return (
        // <ScrollView>
            <View className='h-4/5 w-full flex-row justify-center items-center'>
                <View className='w-96'>
                    <View className='flex-row items-center justify-center mb-10 space-x-4'>
                        <Text className='text-lg text-inverse'>Select (3) of your Interests</Text>
                    </View>
                    <View className='space-y-6 px-5'>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['entertainment']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base'>Entertainment</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("entertainment") ? true : false}
                                onPress={(isChecked) => handleCheckboxChange('entertainment', isChecked)}
                            />
                        </View>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['art and craft']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base'>Art and Craft</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("art and craft") ? true : false}
                                // isChecked={false}
                                onPress={(isChecked) => handleCheckboxChange('art and craft', isChecked)}
                            />
                        </View>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['sports']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base'>Sport</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("sport") ? true : false}
                                onPress={(isChecked) => handleCheckboxChange('sports', isChecked)}
                            />
                        </View>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['science and technology']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base'>Science and Technology</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("science and technology") ? true : false}
                                onPress={(isChecked) => handleCheckboxChange('science and technology', isChecked)}
                            />
                        </View>
                        <View className='space-y-2 bg-secondary py-4 px-3 rounded-xl'>
                            <BouncyCheckbox
                                isChecked={checkboxStates['politics']}
                                size={30}
                                fillColor="#22B8BD"
                                unFillColor="transparent"
                                textComponent={<Text className='text-inverse ml-3 text-base'>Politics</Text>}
                                iconStyle={{ borderColor: "#22B8BD" }}
                                innerIconStyle={{ borderWidth: 1 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                // isChecked={interests.includes("politics") ? true : false}
                                onPress={(isChecked) => handleCheckboxChange('politics', isChecked)}
                            />
                        </View>
                    </View>
                    <View className='px-5 mt-9'>
                        <TouchableOpacity className='py-4 bg-accent rounded-lg'>
                            <Text className='text-xs text-center'>Finish</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        // </ScrollView>
    )
}

export default PickInterests