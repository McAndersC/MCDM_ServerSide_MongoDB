import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { NativeRouter } from "react-router-native";
import Core from "./Core";


export default function App() {
  
  return (
    <NativeRouter>
      <Core />
    </NativeRouter>
  );
}