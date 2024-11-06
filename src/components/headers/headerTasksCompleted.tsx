import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface HeaderTasksCompletedProps {
  username: string | string[] | undefined;
}

export function HeaderTasksCompleted({ username }: HeaderTasksCompletedProps) {
  // converter username para string se for array ou undefined
  const usernameString = Array.isArray(username) ? username[0] : username || '';

  return (
    <>
      <View className='flex flex-row items-end w-full h-24 border-b-2 bg-black'>
        <View className="flex flex-row justify-between items-end ml-10 w-60">
          <TouchableOpacity
            className="flex justify-center items-start h-16 w-16 top-4 right-5"
            onPress={() => router.push({
              pathname: '/todo',
              params: { username: usernameString }
            })}
          >
            <AntDesign name="back" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text className='text-3xl font-medium text-white right-11'>tarefas</Text>
          </View>
        </View>
      </View>

      <View className="flex justify-end items-center w-full h-12 mt-3">
        <Text className="text-xl font-medium">tarefas concluídas</Text>
      </View>
    </>
  );
}