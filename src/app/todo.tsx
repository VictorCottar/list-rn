import { View, Text, TouchableOpacity, FlatList, TextInput, Modal } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { FooterTodo } from "../components/footers/footerTodo";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { HeaderTodo } from "../components/headers/headerTodo";

export default function Todo() {
  const { username } = useLocalSearchParams();

  type Task = {
    title: string;
    description: string;
    priority: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const priorityOptions = [
    { label: 'alta', value: 'alta' },
    { label: 'média', value: 'média' },
    { label: 'baixa', value: 'baixa' },
  ];

  const handleAddTask = () => {
    if (newTaskTitle != '' && newTaskDescription != '' && priority != '') {
      const newTask = { title: newTaskTitle, description: newTaskDescription, priority };
      setTasks([...tasks, newTask]);
      setModalVisible(false);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setPriority('média');
    } else {
      alert("você precisa preencher todos os campos");
    }
  };

  const handleCompleteTask = () => {
    if (selectedTask) {
      const updatedTasks = tasks.filter(task => task !== selectedTask);
      setTasks(updatedTasks);
      setSelectedTask(null);
    }
  };

  function handleTaskPress(item: { title: string; description: string; priority: string; }) {
    setSelectedTask(item);
  }

  return (
    <View className='flex-1 items-center font-archivo'>

      <HeaderTodo username={username as string} />

      <View className="flex justify-center items-center w-full h-2/3 mt-8 space-y-4">

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-11/12 h-16 border-2 border-b-4 border-r-4 rounded-sm shadow-shape p-1 mt-4 ml-4 overflow-hidden justify-center "
              onPress={() => handleTaskPress(item)}
            >
              <Text className="text-lg font-medium ml-3" numberOfLines={1} ellipsizeMode="tail">
                {item.title} - {item.priority}
              </Text>
            </TouchableOpacity>

          )}
          style={{ width: '93%', marginLeft: 2 }}
        />


        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View className='flex flex-row justify-between items-end w-full h-24 border-b-2 bg-black'>
            <Text className="text-3xl font-semibold text-white left-24">adicionar tarefa</Text>
            <TouchableOpacity
              className="absolute top-14 right-5 p-2 rounded-full"
              onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={32} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-center items-center bg-white">
            <View className="w-10/12 bg-white p-5 border-2 border-r-4 border-b-4 rounded-sm space-y-2 mb-24">
              <Text className="text-2xl font-semibold">título da tarefa</Text>
              <TextInput
                placeholder="título da tarefa"
                className='border-2 border-r-4 border-b-4 h-12 w-70 p-2 rounded-sm shadow-shape'
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
              />
              <Text className="text-2xl font-semibold">descrição da tarefa</Text>
              <TextInput
                placeholder="descrição da tarefa"
                className='border-2 border-r-4 border-b-4 h-20 w-70 p-2 rounded-sm shadow-shape'
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
                numberOfLines={3}

              />

              <Text className="text-2xl font-semibold">prioridade</Text>
              <View className="flex justify-center items-center">
                <Dropdown
                  className="w-full border-2 border-r-4 border-b-4 h-12 p-2 rounded-sm shadow-shape"
                  data={priorityOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="selecione a prioridade"
                  value={priority}
                  onChange={item => setPriority(item.value)}
                />
              </View>

              <TouchableOpacity
                className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-70 mt-4 p-2 rounded-sm shadow-shape'
                onPress={handleAddTask}
              >
                <Text className="text-base font-bold">salvar tarefa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={!!selectedTask} transparent={true} animationType="slide">

          <View className='flex flex-row justify-center items-end w-full h-24 border-b-2 bg-black'>
            <Text className="text-3xl font-semibold text-white">detalhes da tarefa</Text>
          </View>

          <View className="flex-1 justify-center items-center bg-white">


            <View className="flex flex-col justify-between w-10/12 h-1/2 bg-white p-5 border-2 border-r-4 border-b-4 rounded-sm space-y-2 mb-24">

              <View className="flex flex-col space-y-2">
                <Text className="text-2xl font-semibold">{selectedTask?.title}</Text>
                <Text className="text-lg mt-2">{selectedTask?.description}</Text>
                <Text className="text-lg mt-2">prioridade da tarefa: {selectedTask?.priority}</Text>
              </View>

              <View className="flex flex-col space-y-6 mt-14">
                <TouchableOpacity
                  className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-70 mt-4 p-2 rounded-sm shadow-shape'
                  onPress={handleCompleteTask}
                >
                  <Text className="text-base font-bold">concluir tarefa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-70 mt-4 p-2 rounded-sm shadow-shape'
                  onPress={() => setSelectedTask(null)}
                >
                  <Text className="text-base font-bold">voltar</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </Modal>

      </View>

      <FooterTodo setModalVisible={setModalVisible} />

    </View>
  );
}