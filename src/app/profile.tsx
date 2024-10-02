import { router, useLocalSearchParams } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Profile() {
  const { username } = useLocalSearchParams();

  return (


    <View className='flex-1 items-center font-archivo'>

      <View className='flex flex-row justify-end items-center w-full h-24 border-b-2 bg-black'>
        <Text className='text-3xl font-semibold text-white ml-5'>perfil do {username}</Text>
        <TouchableOpacity
          activeOpacity={1}
          className="flex justify-center items-center h-16 w-16"
          onPress={() => router.push({ pathname: '/todo', params: { username } })}
        >
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}