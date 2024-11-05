import { router, useLocalSearchParams } from "expo-router";
import { Entypo, FontAwesome5  } from '@expo/vector-icons';
import { TouchableOpacity, View } from "react-native";

interface FooterTodoProps {
  setModalVisible: (visible: boolean) => void;
}

export function FooterTodo({ setModalVisible }: FooterTodoProps) {
  const { username } = useLocalSearchParams();


  return (
    <View className="w-full h-28 bg-black">
      <View className="flex flex-row justify-around items-start">
        <TouchableOpacity
          className="flex justify-center items-center h-16 w-16"
          onPress={() => router.push({ pathname: '/tasksCompleted', params: { username } })}
        >
          <FontAwesome5 name="check-circle" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex justify-center items-center h-20 w-20 bg-white rounded-full border-4 bottom-5"
          onPress={() => setModalVisible(true)}
          >
          <Entypo name="plus" size={38} color="black" />
        </TouchableOpacity>

        <TouchableOpacity

          className="flex justify-center items-center h-16 w-16"
          onPress={() => router.push({ pathname: '/profile', params: { username } })}
        >
          <FontAwesome5 name="user" size={24} color="white" />
        </TouchableOpacity>

      </View>
    </View>
  );
}