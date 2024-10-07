import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Link, SplashScreen, router } from 'expo-router';
import { useLoginUser } from '../database/auth';
import { Footer } from '../components/footer';
import { Header } from '../components/header'
import { TextInputField } from '../components/textInput';

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

      <Header />

      <View className='flex justify-center items-center w-full h-40'>
        <FontAwesome name='check-square' size={80} />
        <Text className='text-2xl font-bold font-archivo'>bem-vindo de volta!</Text>
      </View>

      <TextInputField
        inputClassName='border-2 border-r-4 border-b-4 h-12 w-80 p-2 rounded-sm shadow-shape'
        label='usuário'
        placeholder='digite seu usuário'
        value={username}
        onChangeText={setUsername}
      />
      <View className='flex flex-row items-center'>
        <TextInputField
          inputClassName='border-2 border-r-0 border-b-4 h-12 w-72 p-2 shadow-shape'
          label='senha'
          placeholder='digite sua senha'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
        />
      </View>

      <TouchableOpacity
        className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 mt-2 w-80 p-2 rounded-sm shadow-shape'
        onPress={login}
        >
        <Text className='text-xl font-bold font-archivo'>entrar</Text>
      </TouchableOpacity>

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

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}