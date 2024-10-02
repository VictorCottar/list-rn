import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Link, SplashScreen, router } from 'expo-router';
import { useLoginUser } from '../database/auth';

export default function Login() {
  
  const [loaded, error] = useFonts({
    'archivo': require('../assets/fonts/Archivo-VariableFont_wdth,wght.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = useLoginUser();

  async function login() {
    try {
      const response = await loginUser.login({ username, password });
      if (response) {
        router.push({ pathname: '/todo', params: { username } });
      }
    } catch (error) {
      alert(error);
    }
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className='flex-1 items-center'>

      <View className='flex justify-end items-center w-full h-28'>
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
          onPress={login}
        >
          <Text className='text-xl font-bold font-archivo'>entrar</Text>
        </TouchableOpacity>
      </View>

      <View className='flex flex-row justify-center w-full h-6 mt-5'>
        <Text className='text-base font-bold font-archivo'>não tem conta? </Text>
        <TouchableOpacity activeOpacity={1}>
            <Text>
              <Link className='text-base font-bold font-archivo underline' href={"/register"}>
                crie agora!
              </Link>
            </Text>
          </TouchableOpacity>
      </View>

      <View className='flex w-full items-center absolute bottom-4'>
        <Text className='font-bold font-archivo'>&copy; 2024 list. todos os direitos reservados</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
