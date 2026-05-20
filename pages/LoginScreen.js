import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

  try {

    if (
      username === "zahra" &&
      password === "zahra123"
    ) {

      await AsyncStorage.setItem(
        "username",
        username
      );

      alert("Login berhasil");

      navigation.navigate("Dashboard");

    } else {

      alert("Username / Password salah");

    }

  } catch (error) {

    console.log(error);

    alert(error);

  }
};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Farm Apps 014
      </Text>

      <Text>Username</Text>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text>Password</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>

        <TouchableOpacity
          style={styles.button}
          onPress={login}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUsername("");
            setPassword("");
          }}
        >
          <Text>Clear</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "#ADD8E6",
    padding: 12,
    width: "45%",
    alignItems: "center",
    borderRadius: 5,
  },

});