import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

const App = () => {

  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let serverPath = 'http://192.168.0.29:3000/';
  
  useEffect(() => {

      fetch(serverPath + "users")
      .then(response => response.json())
      .then(data => {
        
        setTimeout( () => {

          setIsLoading(false)
          setProfiles(data)

        }, 3000)
       
      }).catch( (err) => console.log(err))
      
  },[])

  return (
      <View style={styles.page}>
        <View>{isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text>Profiler</Text>}</View>
           {profiles.map( (profile) => {
                  return <View key={profile._id} style={styles.profile}> 

                  <Text>{profile.username}</Text>

                  <Image
                    style={styles.profilePic}
                    source={{uri: serverPath + profile.profile}}
                  />
                  </View>
            })}
      </View>
  );
}

const styles = StyleSheet.create({

  page : {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePic : {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'red',
    backgroundColor: 'green',
    borderWidth: 2
  },
  profile : {
    display: 'flex',
    alignItems: 'center'
  }
});

export default App;