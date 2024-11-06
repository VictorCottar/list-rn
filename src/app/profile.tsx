import { router, useLocalSearchParams } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from "react";
import { useTask } from "../hooks/tasks";
import { HeaderProfile } from "../components/headers/headerProfile";

export default function Profile() {
  const params = useLocalSearchParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username || '';

  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const { countTasksCompleted } = useTask();

  const handleBackPress = () => {
    // garante que o username seja passado corretamente na navegação
    router.push({
      pathname: '/todo',
      params: { username }
    });
  };

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

      <HeaderProfile
        username={username}
        onBackPress={handleBackPress}
      />

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