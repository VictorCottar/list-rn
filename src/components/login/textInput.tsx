import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  inputClassName?: string;
}

export function TextInputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPassword = false,
  toggleShowPassword,
  inputClassName,
}: TextInputProps) {
  return (
    <View className='flex flex-col gap-1'>
      <Text className='text-2xl font-bold font-archivo'>{label}</Text>
      <View className='flex flex-row items-center'>
        <TextInput
          className={inputClassName}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        {secureTextEntry && (
          <TouchableOpacity
            activeOpacity={1}
            className='flex items-left justify-center w-8 h-12 border-b-4 border-r-4 border-t-2 rounded-sm rounded-l-none'
            onPress={toggleShowPassword}
          >
            <Entypo name={showPassword ? 'eye-with-line' : 'eye'} size={22} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}