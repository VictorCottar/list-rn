import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  priorityOptions: Array<{ label: string; value: string; }>;
}

export const AddTaskModal = ({
  visible,
  onClose,
  onSave,
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  priorityOptions
}: AddTaskModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className='flex flex-row justify-between items-end w-full h-24 border-b-2 bg-black'>
        <Text className="text-3xl font-medium text-white left-24">adicionar tarefa</Text>
        <TouchableOpacity
          className="absolute top-14 right-5 p-2 rounded-full"
          onPress={onClose}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center bg-white">
        <View className="w-10/12 bg-white p-5 border-2 border-r-4 border-b-4 rounded-sm space-y-2 mb-24">
          <Text className="text-2xl font-medium">título da tarefa</Text>
          <TextInput
            placeholder="título da tarefa"
            className='border-2 border-r-4 border-b-4 h-12 w-70 p-2 rounded-sm shadow-shape'
            value={title}
            onChangeText={setTitle}
          />
          <Text className="text-2xl font-medium">descrição da tarefa</Text>
          <TextInput
            placeholder="descrição da tarefa"
            className='border-2 border-r-4 border-b-4 h-20 w-70 p-2 rounded-sm shadow-shape'
            value={description}
            onChangeText={setDescription}
            numberOfLines={3}
          />

          <Text className="text-2xl font-medium">prioridade</Text>
          <View className="flex justify-center items-center">
            <Dropdown
              style={{ width: '100%', borderWidth: 2, borderRightWidth: 4, borderBottomWidth: 4, height: 48, padding: 8,
              borderRadius: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4 }}
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
            onPress={onSave}
          >
            <Text className="text-base font-medium">salvar tarefa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};