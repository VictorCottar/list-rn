import { TouchableOpacity, Text } from "react-native";

interface ButtonAcessProps { 
  text: string;
  onPress: () => void;
}

export function ButtonAcess({ text, onPress }: ButtonAcessProps) {
  return (
    <TouchableOpacity
      className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-80 mt-2 p-2 rounded-sm shadow-shape'
      onPress={onPress}
    >
      <Text className='text-xl font-bold font-archivo'>{text}</Text>
    </TouchableOpacity>
  );
}