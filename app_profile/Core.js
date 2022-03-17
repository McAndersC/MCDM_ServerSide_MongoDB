import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View} from 'react-native';
import { Route, Routes, useNavigate } from "react-router-native";
import { ProfilesButton, HomeButton, TestButton } from "./src/components/navButtons";

import Home from "./src/pages/home";
import Profiles from "./src/pages/profiles";
import CreateProfile from "./src/pages/create";

import React from 'react';

// No Match Page
const NoMatch = () => <View style={styles.page}><Text style={styles.text}>Nothing.</Text></View>;

function Core() {

  let navigate = useNavigate();
 
  return (
    <View style={styles.container}>

      <StatusBar style="light" />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create" element={<CreateProfile />}>
          <Route path=":profileId" element={<CreateProfile />} />
        </Route>
        <Route path="/profiles" element={<Profiles />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>

      <View style={styles.nav}>

        <HomeButton nav={navigate}/>
        <ProfilesButton nav={navigate}/>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },

  nav : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 60,
  }

});

export default Core