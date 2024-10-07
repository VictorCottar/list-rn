import { View, Text } from 'react-native';

export function Footer() {
  return (
    <View className='flex w-full items-center absolute bottom-4'>
        <Text className='font-bold font-archivo'>&copy; 2024 list. todos os direitos reservados</Text>
    </View>
  );
}