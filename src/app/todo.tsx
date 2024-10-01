import { View, Text } from "react-native";

export default function Todo() {
  return (
    <View className='flex-1 items-center font-archivo'>
      
      <View className='flex justify-end items-start w-full h-24 border-b-2 bg-black'>
        <Text className='text-3xl text-white ml-5 font-archivo'>olá, username</Text>
      </View>

      <View className="flex justify-end items-center w-full h-12 mt-3">
        <Text className="text-xl font-archivo">qual o plano para hoje?</Text>
      </View>

      <View className="flex justify-start items-start w-11/12 h-16 mt-14 border-2 border-b-4 border-r-4">
        <Text className="text-xl font-archivo">qual o plano para hoje?</Text>
      </View>



    </View>
  );
}