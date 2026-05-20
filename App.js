import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./pages/LoginScreen";
import DashboardScreen from "./pages/DashboardScreen";
import SapiScreen from "./pages/SapiScreen";
import KambingScreen from "./pages/KambingScreen";
import DombaScreen from "./pages/DombaScreen";
import DetailScreen from "./pages/DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
        />

        <Stack.Screen
          name="Sapi"
          component={SapiScreen}
        />

        <Stack.Screen
          name="Kambing"
          component={KambingScreen}
        />

        <Stack.Screen
          name="Domba"
          component={DombaScreen}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}