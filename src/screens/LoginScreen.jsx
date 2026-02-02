import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Mock user data
    const userData = {
      _id: 'mock_user_id',
      email,
      fullName: 'Test User',
      profilePic: null,
    };
    dispatch(login(userData));
  };

  const handleSocialLogin = provider => {
    const userData = {
      _id: `mock_${provider}_user`,
      email: `${provider}@test.com`,
      fullName: `${provider} User`,
      profilePic: null,
    };
    dispatch(login(userData));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E2E" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity
          style={[styles.socialButton, styles.googleButton]}
          onPress={() => handleSocialLogin('Google')}
        >
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.githubButton]}
          onPress={() => handleSocialLogin('GitHub')}
        >
          <Text style={styles.socialButtonText}>Sign in with GitHub</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#2D2D3F',
    color: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3E3E55',
  },
  loginButton: {
    backgroundColor: '#4ADE80',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#4ADE80',
  },
  createAccountButtonText: {
    color: '#4ADE80',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 24,
  },
  socialButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  githubButton: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000', // Default for Google
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#aaa',
    fontSize: 14,
  },
  linkText: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// Fix for GitHub text color
styles.githubButton = {
  ...styles.githubButton,
  backgroundColor: '#24292e',
};
// We need to override text color for GitHub
// Ideally handle this with conditional styling in render, but let's just make a separate style or use inline for simplicity in complex logic
// Refactoring render slightly to use style array for text

export default LoginScreen;
