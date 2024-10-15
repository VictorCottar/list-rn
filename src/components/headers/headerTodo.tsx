import { View, Text } from "react-native";

interface HeaderTodoProps { 
  username: string; 
}

export function HeaderTodo({ username }: HeaderTodoProps) {
  return (
    <View className='flex-1 items-center w-full'>
      <View className='flex justify-end items-start w-full h-24 border-b-2 bg-black'>
        <Text className='text-3xl font-semibold text-white ml-5'>olá, {username}</Text>
      </View>

      <View className="flex justify-end items-center w-full h-12 mt-3">
        <Text className="text-xl font-semibold">qual o plano para hoje?</Text>
      </View>
    </View>
  );
}