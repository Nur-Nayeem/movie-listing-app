// src/AuthScreen.tsx
import { account, AppwriteUser } from '@/services/appWrite';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ Import gradient
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ID } from 'react-native-appwrite';

export default function AuthScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [isLoginView, setIsLoginView] = useState<boolean>(true);

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error: any) {
      console.log('No user logged in:', error.message);
      setUser(null);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (user) {
        console.log('User already logged in:', user);
        await account.deleteSession('current');
      }
      const response = await account.create(ID.unique(), email, password, name);
      console.log('Signup successful:', response);
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      Alert.alert('Success', 'Account created and logged in successfully!');
      setEmail('');
      setPassword('');
      setName('');
      router.push('/(tabs)');
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Error', error.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (user) {
        console.log('User already logged in:', user);
        await account.deleteSession('current');
      }
      const response = await account.createEmailPasswordSession(email, password);
      console.log('Login successful:', response);
      const currentUser = await account.get();
      setUser(currentUser);
      Alert.alert('Success', 'Logged in successfully!');
      setEmail('');
      setPassword('');
      router.push('/(tabs)');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Failed to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#7e22ce', '#4f46e5']} // Purple to indigo gradient
      className="flex-1 justify-center items-center"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 w-full justify-center items-center"
      >
        <View className="w-11/12 max-w-md bg-white rounded-2xl p-8 shadow-xl items-center">
          <Text className="text-4xl font-bold text-gray-800 mb-3 font-inter-bold">
            {isLoginView ? 'Welcome Back!' : 'Create Account'}
          </Text>
          <Text className="text-base text-gray-600 mb-8 text-center font-inter-regular">
            {isLoginView
              ? 'Sign in to continue'
              : 'Join us and start your journey'}
          </Text>

          {!isLoginView && (
            <TextInput
              className="w-full h-12 bg-gray-50 rounded-xl px-4 text-base text-gray-800 mb-4 border border-gray-200 font-inter-regular"
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}
          <TextInput
            className="w-full h-12 bg-gray-50 rounded-xl px-4 text-base text-gray-800 mb-4 border border-gray-200 font-inter-regular"
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="w-full h-12 bg-gray-50 rounded-xl px-4 text-base text-gray-800 mb-4 border border-gray-200 font-inter-regular"
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="w-full h-12 bg-blue-600 rounded-xl justify-center items-center mt-2 shadow-lg shadow-blue-600/30"
            onPress={isLoginView ? handleLogin : handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg font-bold font-inter-bold">
                {isLoginView ? 'Login' : 'Sign Up'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6 py-2"
            onPress={() => setIsLoginView(!isLoginView)}
          >
            <Text className="text-blue-600 text-base font-inter-regular">
              {isLoginView
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
