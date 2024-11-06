import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Task } from "../types/task";

interface CompletedTaskDetailProps {
  task: Task | null;
  visible: boolean;
  onClose: () => void;
}

export function CompletedTaskDetail({ task, visible, onClose }: CompletedTaskDetailProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className='flex flex-row justify-center items-end w-full h-24 border-b-2 bg-black'>
        <Text className="text-3xl font-medium text-white">detalhes da tarefa</Text>
      </View>

      <View className="flex-1 justify-center items-center bg-white">
        <View className="flex flex-col justify-between w-10/12 h-1/2 bg-white p-5 border-2 border-r-4 border-b-4 rounded-sm space-y-2 mb-24">
          <View className="flex flex-col space-y-3">
            <Text className="text-2xl font-semibold text-center underline">{task?.title}</Text>
            <Text className="text-base mt-2">{task?.description}</Text>
            <Text className="text-base mt-2">prioridade da tarefa: {task?.priority}</Text>
          </View>

          <View className="flex flex-col space-y-6 mt-14">
            <TouchableOpacity
              className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-70 mt-4 p-2 rounded-sm shadow-shape'
              onPress={onClose}
            >
              <Text className="text-base font-medium">voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}