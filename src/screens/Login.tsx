import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

export default function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const getLogin = async () => {
    if (username === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    }

    if (username.length > 5 && password.length > 5) {
      alert('Usuário e senha corretos');
    } else {
      alert('Usuário ou senha precisa ser maior que 5 caracteres');
    }
  };

  return (
    <View className='flex-1 items-center'>

      <View className='flex justify-end items-center w-full h-36'>
        <Text className='text-5xl font-bold font-archivo'>list</Text>
      </View>

      <View className='flex justify-center items-center w-full h-40'>
        <FontAwesome name='check-square' size={80} />
        <Text className='text-2xl font-bold font-archivo'>bem-vindo de volta!</Text>
      </View>

      <View className='flex flex-col gap-1'>
        <Text className='text-2xl font-bold font-archivo'>usuário</Text>
        <TextInput
          className='border-2 border-r-4 border-b-4 h-12 w-80 p-2 rounded-sm shadow-shape'
          placeholder='Digite seu usuário'
          value={username}
          onChangeText={setUsername}
        />

        <Text className='text-2xl font-bold font-archivo'>senha</Text>
        <View className='flex flex-row items-center'>
          <TextInput
            className='border-2 border-r-0 border-b-4 h-12 w-72 p-2 shadow-shape'
            placeholder='Digite sua senha'
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            activeOpacity={1} 
            className='flex items-left justify-center w-8 h-12 border-b-4 border-r-4 border-t-2 rounded-sm rounded-l-none'
            onPress={() => setShowPassword(!showPassword)}
          >
            <Entypo name={showPassword ? 'eye-with-line' : 'eye'} size={22} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-80 p-2 rounded-sm shadow-shape'
          onPress={getLogin}
        >
          <Text className='text-xl font-bold font-archivo'>entrar</Text>
        </TouchableOpacity>
      </View>

      <View className='flex flex-row w-full h-6 mt-5'>
        <Text className='text-base font-bold font-archivo'>não tem conta? </Text>
        <TouchableOpacity onPress={() => {/* Navegar para a tela de cadastro ou abrir um modal */}}>
        <Text className='text-base font-bold font-archivo underline'>crie agora!</Text>
        </TouchableOpacity>
      </View>

      <View className='flex w-full items-center absolute bottom-7'>
        <Text className='font-bold font-archivo'>&copy; 2024 list. todos os direitos reservados</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
