import { router, useLocalSearchParams } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from "react";
import { useTask } from "../hooks/tasks";

export default function Profile() {
  const { username } = useLocalSearchParams();
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const { countTasksCompleted } = useTask();

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const count = await countTasksCompleted();
        setCompletedTasks(count); // atualiza o estado com o número de tarefas concluídas
      } catch (error) {
        console.error('erro ao contar tarefas concluídas:', error);
      }
    };

    fetchCompletedTasks(); // chama a função ao montar o componente
  }, [countTasksCompleted]);

  return (

    <View className='flex-1 items-center font-archivo'>

      <View className='flex flex-row items-end w-full h-24 border-b-2 bg-black'>
        <View className="flex flex-row mt-8 justify-between items-end  ml-10 w-60">
          <TouchableOpacity
            className="flex justify-center items-start h-16 w-16 top-4 right-3"
            onPress={() => router.push({ pathname: '/todo', params: { username } })}
          >
            <AntDesign name="back" size={24} color="white" />
          </TouchableOpacity>
          <Text className='text-3xl font-medium text-white ml-1'>perfil do {username}</Text>
        </View>
      </View>

      <View className="flex justify-center items-center w-11/12 h-32 p-2 border-2 border-b-4 border-r-4 mt-10 rounded-sm shadow-shape">
        <Text className="text-2xl font-medium">parabéns!</Text>
        <Text className="text-xl font-medium underline">você já concluiu {completedTasks} tarefas</Text>
      </View>

      <TouchableOpacity
        className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-11/12 p-2 rounded-sm shadow-shape mt-12'
        onPress={() => router.push('/')}
      >
        <Text className='text-xl font-medium'>logout</Text>
      </TouchableOpacity>

    </View>
  )
}