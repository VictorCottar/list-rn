import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Task() {
  const { username } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center font-archivo">

      <View className='flex flex-row items-end w-full h-24 border-b-2 bg-black'>

        <View className="flex flex-row justify-between items-end  ml-10 w-60">
          <TouchableOpacity
            className="flex justify-center items-start h-16 w-16 top-4 right-3"
            onPress={() => router.push({ pathname: '/todo', params: { username } })}
          >
            <AntDesign name="back" size={24} color="white" />
          </TouchableOpacity>
          <Text className='text-3xl font-semibold text-white right-11'>tarefas</Text>

        </View>
      </View>

    </View>
  );
}