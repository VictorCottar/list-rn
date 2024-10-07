import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useRegisterUser } from '../database/auth';
import { Footer } from '../components/footer';
import { TextInputField } from '../components/textInput'
import { Header } from '../components/header'

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = useRegisterUser();

  async function register() {
    try {
      const response = await registerUser.register({ username, password });
      alert('usuário cadastrado com sucesso! volte e faça seu login.');
      router.push('/');

    } catch (error) {
      alert(error);
    }
  }

  return (
    <View className='flex-1 items-center'>

      <Header />

      <View className='flex justify-center items-center w-full h-44 gap-1'>
        <FontAwesome name='check-square' size={80} />
        <Text className='text-2xl font-bold font-archivo'>vamos começar?</Text>
        <Text className='text-lg font-bold font-archivo'>crie sua conta e mantenha suas tarefas em dia!</Text>
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
        className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-80 mt-2 p-2 rounded-sm shadow-shape'
        onPress={register}
        >
        <Text className='text-xl font-bold font-archivo'>cadastrar-se</Text>
      </TouchableOpacity>

      <View className='flex flex-row justify-center w-full h-6 mt-5'>
        <Text className='text-base font-bold font-archivo'>já tem conta? </Text>
        <TouchableOpacity activeOpacity={1}>
          <Link className='text-base font-bold font-archivo underline' href={"/"}>
            faça o login!
          </Link>
        </TouchableOpacity>
      </View>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}