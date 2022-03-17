import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-native";
import config from '../misc/config';
// Profile View
const Profile = (props) => {

  let navigate = useNavigate();
  let serverPath = config.serverPath;



  const handleClick = () => {
    navigate(`/create/${props.profile._id}`, { replace: true });
  }

  return (
    <View style={styles.profile}>
  
      <TouchableOpacity onPress={handleClick}>
          <Image
            style={styles.profilePic}
            source={{uri: serverPath + props.profile.profile}}
          />
          <Text style={styles.profileText}>{props.profile.username}</Text>
        </TouchableOpacity>

    </View>
  )
}

// Profiles Page
function Profiles() {

    const [profiles, setProfiles] = useState([]);
    let serverPath = config.serverPath;
    
    useEffect(() => {
        fetch(serverPath + "users")
        .then(response => response.json())
        .then(data => setProfiles(data))

    },[])

    return (
    
        <ImageBackground  style={styles.logo} source={require('../../assets/logo_compact.png')}>
          <ScrollView style={styles.profilesPageScroll}>
              <View style={styles.profilesPage}>
              {profiles.map( (profile) => {
                  return <Profile key={profile._id} profile={profile}/>
              })}

              {profiles.length === 0 ? <Text style={{color: '#fff'}}>Ingen Brugere Oprettet</Text> : <Text></Text>}
              </View>
          </ScrollView>
        </ImageBackground>
   
    )

}

const styles = StyleSheet.create({

  profilesPage: {

    backgroundColor: '#000',
    flexDirection: 'row',
    paddingTop : 60,
    paddingLeft : 10,
    paddingRight : 10,
    marginBottom: 50,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    color: '#fff'

  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  profilesPageScroll : {
    backgroundColor: '#000',
    height: '100%'
  },
  profilePic : {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2
  },
  profile : {
    marginBottom: 30,
    width: '33%',
    height: 130,
    color: '#fff',
     alignItems: 'center'
  },
  profilePagePic : {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderColor: 'white',
    borderWidth: 2
  },
  profileText : {
    marginTop: 10,
    marginBottom: 10,
    textAlign : 'center',
    fontSize: 22,
    color: '#fff'
  }
});

export default Profiles