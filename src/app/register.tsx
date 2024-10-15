import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRegisterUser } from '../database/auth';
import { Footer } from '../components/footers/footer';
import { TextInputField } from '../components/textInput'
import { Header } from '../components/headers/header'
import { ButtonAcess } from '../components/buttonAcess'
import { AuthLink } from '../components/authLink';

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

      <ButtonAcess text='criar conta' onPress={register} />

      <AuthLink text='já tem conta? ' linkText='faça o login!' href={'/'} />

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}