import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import nflLogo from './assets/NFL.jpg'; 

const url = 'https://jsonplaceholder.typicode.com/todos';


const MenuScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const displayPendientes = (option) => {
    let filterTodos;
    switch (option) {
      case 'Pendientes (Solo IDs)':
        filterTodos = todos;
        break;
      case 'Pendientes (IDs y Títulos)':
        filterTodos = todos.map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Pendientes sin resolver (IDs y Títulos)':
        filterTodos = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Pendientes resueltos (IDs y Títulos)':
        filterTodos = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Pendientes (IDs y UserIDs)':
        filterTodos = todos.map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      case 'Pendientes sin resolver (IDs y UserIDs)':
        filterTodos = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      case 'Pendientes resueltos (IDs y UserIDs)':
        filterTodos = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      default:
        filterTodos = [];
    }

    navigation.navigate('TodoDetails', { todos: filterTodos });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={nflLogo} style={styles.logo} resizeMode="contain" />
        {['Pendientes (Solo IDs)', 
          'Pendientes (IDs y Títulos)',
          'Pendientes sin resolver (IDs y Títulos)', 
          'Pendientes resueltos (IDs y Títulos)', 
          'Pendientes (IDs y UserIDs)', 
          'Pendientes sin resolver (IDs y UserIDs)', 
          'Pendientes resueltos (IDs y UserIDs)'].map(option => (
            <TouchableOpacity
              key={option}
              style={styles.Button}
              onPress={() => displayPendientes(option)}
            >
              <Text style={styles.Text}>{option}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Pantalla de Detalles de los Todos
const TodoDetailsScreen = ({ route }) => {
  const { todos } = route.params;

  return (
    <ScrollView style={styles.resultsContainer}>
      {todos.map((todo, index) => (
        <View key={todo.id.toString()} style={styles.Row}>
          <Text style={styles.Cell}>{`ID: ${todo.id}`}</Text>
          {todo.title && <Text style={styles.Cell}>{`Title: ${todo.title}`}</Text>}
          {todo.userId && <Text style={styles.Cell}>{`User: ${todo.userId}`}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen style={styles.title}  name="Menu" component={MenuScreen} options={{ title: 'Pendientes NFL' }} />
        <Stack.Screen name="TodoDetails" component={TodoDetailsScreen} options={{ title: 'Detalles de Todo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  Text: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '75%',
    height: 150, 
    marginBottom: 20,
  },
  Button: {
    width: '40%',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 5,
    backgroundColor: 'black',
  },
  Cell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  resultsContainer: {
    padding: 10,
  },
});

export default App;