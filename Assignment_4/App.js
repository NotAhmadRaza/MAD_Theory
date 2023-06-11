import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const handleLogin = async () => {
    
    const email = enteredEmail;
    const password = enteredPassword;

    
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

    
      if (email === user.email && password === user.password) {
       
        navigation.navigate('Profile');
      } else {
       
      }
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={enteredEmail}
        onChangeText={setEnteredEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={enteredPassword}
        onChangeText={setEnteredPassword}
      />
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const SignupScreen = ({ navigation }) => {
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  const handleSignUp = async () => {
   
    const firstName = enteredFirstName;
    const lastName = enteredLastName;
    const email = enteredEmail;
    const password = enteredPassword;

   
    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    
    await AsyncStorage.setItem('user', JSON.stringify(user));

    
    setEnteredFirstName('');
    setEnteredLastName('');
    setEnteredEmail('');
    setEnteredPassword('');

    
    setAccountCreated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signup Screen</Text>
      {accountCreated && <Text style={styles.successText}>Your account has been created!</Text>}
      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={enteredFirstName}
        onChangeText={setEnteredFirstName}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={enteredLastName}
        onChangeText={setEnteredLastName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={enteredEmail}
        onChangeText={setEnteredEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={enteredPassword}
        onChangeText={setEnteredPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
     
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
   
    await AsyncStorage.removeItem('user');
    
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      {user && (
        <View>
          <Text>First Name: {user.firstName}</Text>
          <Text>Last Name: {user.lastName}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
  },
});

export default App;
