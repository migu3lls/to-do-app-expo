import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

export default function TodoScreen() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tasks, setTasks] = useState<{ id: string; titulo: string; descricao: string; done: boolean }[]>([]);

  const addTask = () => {
    if (titulo.trim() === '') return Alert.alert('Erro', 'Digite um título para a tarefa');

    setTasks(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        titulo,
        descricao,
        done: false,
      },
    ]);

    setTitulo('');
    setDescricao('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.taskContainer}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.taskTitle, item.done && styles.taskDone]}>
          {item.titulo}
        </Text>
        {item.descricao ? (
          <Text style={styles.taskDesc}>{item.descricao}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => toggleTask(item.id)}
        style={styles.doneButton}
      >
        <Text style={{ color: '#fff' }}>{item.done ? '↩️' : '✅'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={{ color: '#fff' }}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Lista de Tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, { marginTop: 10 }]}
        placeholder="Descrição (opcional)"
        value={descricao}
        onChangeText={setDescricao}
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDesc: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 4,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
});
