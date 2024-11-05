import { Text, TouchableOpacity, FlatList } from "react-native";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
}

export const TaskList = ({ tasks, onTaskPress }: TaskListProps) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="w-11/12 h-16 border-2 border-b-4 border-r-4 rounded-sm shadow-shape p-1 mt-4 ml-4 overflow-hidden justify-center"
          onPress={() => onTaskPress(item)}
        >
          <Text className="text-lg font-medium ml-3" numberOfLines={1} ellipsizeMode="tail">
            {item.title} - {item.priority}
          </Text>
        </TouchableOpacity>
      )}
      style={{ width: '93%', marginLeft: 2 }}
    />
  );
};