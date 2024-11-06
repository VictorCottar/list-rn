// components/HeaderProfile.tsx
import { TouchableOpacity, View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";

interface HeaderProfileProps {
  username: string;
  onBackPress?: () => void;
}

export function HeaderProfile({ username, onBackPress }: HeaderProfileProps) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      // fallback padrão se não houver onBackPress
      router.push({
        pathname: '/todo',
        params: { username }
      });
    }
  };

  return (
    <View className='flex flex-row items-end w-full h-24 border-b-2 bg-black'>
      <View className="flex flex-row mt-8 justify-between items-end ml-10 w-60">
        <TouchableOpacity
          className="flex justify-center items-start h-16 w-16 top-4 right-3"
          onPress={handleBackPress}
        >
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text className='text-3xl font-medium text-white ml-1'>
          perfil do {username}
        </Text>
      </View>
    </View>
  );
}