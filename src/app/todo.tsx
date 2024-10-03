import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import { router, useLocalSearchParams } from 'expo-router';


export default function Todo() {
  const { username } = useLocalSearchParams();

  return (
    <View className='flex-1 items-center font-archivo'>
      
      <View className='flex justify-end items-start w-full h-24 border-b-2 bg-black'>
        <Text className='text-3xl font-semibold text-white ml-5'>olá, {username}</Text>
      </View>

      <View className="flex justify-end items-center w-full h-12 mt-3">
        <Text className="text-xl font-semibold">qual o plano para hoje?</Text>
      </View>

      <View className="flex justify-start items-center w-full h-2/3 mt-8 space-y-4">
        <View className="flex justify-start items-start w-11/12 h-16 p-1 border-2 border-b-4 border-r-4 rounded-sm shadow-shape">
          <Text className="text-lg font-medium ml-3">terminar tela do App</Text>
        </View>

        <View className="flex justify-start items-start w-11/12 h-16  p-1 border-2 border-b-4 border-r-4 rounded-sm shadow-shape">
          <Text className="text-lg font-medium ml-3">terminar tela do App</Text>
        </View>      

        <View className="flex justify-start items-start w-11/12 h-16  p-1 border-2 border-b-4 border-r-4 rounded-sm shadow-shape">
          <Text className="text-lg font-medium ml-3">terminar tela do App</Text>
        </View>
      
      </View>

      <View className="w-full h-28 bg-black">
          <View className="flex flex-row justify-around items-start">
            <TouchableOpacity
              className="flex justify-center items-center h-16 w-16"
            >
              <FontAwesome5 name="list" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex justify-center items-center h-20 w-20 bg-white rounded-full border-4 bottom-5"
            >
              <Entypo name="plus" size={38} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              
              className="flex justify-center items-center h-16 w-16"
              onPress={() => router.push({ pathname: '/profile', params: { username }})}
            >
              <FontAwesome5 name="user" size={24} color="white" />
            </TouchableOpacity>

          </View>
      </View>
    </View>
  );
}