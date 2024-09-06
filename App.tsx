import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (

    <View className='flex-1 items-center'>

      <View className='flex justify-end items-center w-full h-36'>
        <Text className='text-5xl font-bold'>list</Text>
      </View>

      <View className='flex justify-center items-center w-full h-40'>
        <FontAwesome name='check-square' size={80} />
        <Text className='text-2xl font-bold'>bem-vindo de volta!</Text>
      </View>
      
      <View className='flex flex-col gap-1'>
        <Text className='text-2xl font-bold'>usuário</Text>
        <TextInput
          className='border-2 border-r-4 border-b-4 h-12 w-80 p-2 rounded-sm shadow-shape'
          placeholder='digite seu usuário'
        />

        <Text className='text-2xl font-bold'>senha</Text>
        <TextInput
          className='border-2 border-r-4 border-b-4 h-12 w-80 p-2 rounded-sm shadow-shape'
          placeholder='digite sua senha'
          secureTextEntry={true}
        />
        

        <TouchableOpacity
          className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-80 p-2 rounded-sm shadow-shape'
        >

          <Text className='text-xl font-bold'>entrar</Text>

        </TouchableOpacity>


      </View>

      <View className='flex w-full items-center justify-center h-6 mt-5'>
        <Text className='text-base font-bold'>não tem conta? <Text className='underline'>crie agora!</Text></Text>
      </View>

      <View className='flex w-full items-center absolute bottom-7'>
        <Text className='fontr-bold'>&copy; 2024 list. Todos os direitos reservados </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
