import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();

// ----------------- Dummy Data -----------------
const dummyOffers = [
  { id: '1', title: 'Python Tutoring', user: 'Ali' },
  { id: '2', title: 'Guitar Lessons', user: 'Fatima' },
  { id: '3', title: 'Drawing Basics', user: 'Ahmed' },
  { id: '4', title: 'Yoga & Meditation', user: 'Sara' },
];

const user = {
  name: 'Your Name',
  skills: ['React Native', 'Guitar', 'Photography'],
  bio: 'A passionate developer and musician looking to share my skills with the world.',
};

// ----------------- Custom Button -----------------
function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#4db6ac', '#009688']}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ----------------- Login Screen -----------------
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email, 'Password:', password);
    navigation.navigate('HomeFeed');
  };

  return (
    <LinearGradient colors={['#b2dfdb', '#80cbc4']} style={styles.container}>
      <Text style={styles.title}>SkillSwap - Login</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <CustomButton title="Login" onPress={handleLogin} />
      <CustomButton title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </LinearGradient>
  );
}

// ----------------- Register Screen -----------------
function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Name:', name, 'Email:', email, 'Password:', password);
    navigation.navigate('Login');
  };

  return (
    <LinearGradient colors={['#b2dfdb', '#80cbc4']} style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <CustomButton title="Sign Up" onPress={handleRegister} />
      <CustomButton title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </LinearGradient>
  );
}

// ----------------- Home Feed Screen -----------------
function HomeFeedScreen({ navigation }) {
  return (
    <LinearGradient colors={['#b2dfdb', '#80cbc4']} style={styles.container}>
      <Text style={styles.title}>Skill Offers</Text>
      <FlatList
        data={dummyOffers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardUser}>by {item.user}</Text>
          </View>
        )}
      />
      <CustomButton title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
      <CustomButton title="Profile" onPress={() => navigation.navigate('Profile')} />
    </LinearGradient>
  );
}

// ----------------- Create Post Screen -----------------
function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');

  const handlePost = () => {
    console.log('New Post:', { title, user: userName });
    setTitle('');
    setUserName('');
    navigation.navigate('HomeFeed');
  };

  return (
    <LinearGradient colors={['#b2dfdb', '#80cbc4']} style={styles.container}>
      <Text style={styles.title}>Create New Skill Offer</Text>
      <TextInput placeholder="Skill Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Your Name" style={styles.input} value={userName} onChangeText={setUserName} />
      <CustomButton title="Post" onPress={handlePost} />
    </LinearGradient>
  );
}

// ----------------- Profile Screen -----------------
function ProfileScreen() {
  return (
    <LinearGradient colors={['#b2dfdb', '#80cbc4']} style={styles.container}>
      <Text style={styles.title}>{user.name}'s Profile</Text>
      <Text style={styles.sectionTitle}>Skills:</Text>
      {user.skills.map((skill, index) => (
        <Text key={index} style={styles.itemText}>- {skill}</Text>
      ))}
      <Text style={styles.sectionTitle}>Bio:</Text>
      <Text style={styles.itemText}>{user.bio}</Text>
    </LinearGradient>
  );
}

// ----------------- App -----------------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeFeed" component={HomeFeedScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#004d40",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    color: "#00695c",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
    color: "#004d40",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    padding: 12,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#ffffffaa",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#004d40",
  },
  cardUser: {
    fontSize: 14,
    color: "#00796b",
  },
});
