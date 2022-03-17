import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-native";
import config from '../misc/config';

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
function Profiles() {
    
    const [profiles, setProfiles] = useState([]);

    let serverPath = config.serverPath;
    let dbCollection = config.dbCollection;

    useEffect(() => {

        fetch(serverPath + dbCollection)
        .then(response => response.json())
        .then(data => {

            setTimeout( () => {
              setProfiles(data)
            }, 3000)

        })

    },[])

    return (
        <View style={[styles.container]}>
            <View style={[styles.fixed]}>
                <Image style={[styles.img]} source={require('../../assets/logo_compact.png')}/>
            </View>
            <ScrollView style={[styles.fixed, {backgroundColor: 'transparent'}]}>

                    <View style={styles.profilesPage}>
                    {profiles.map( (profile) => {
                        return <Profile key={profile._id} profile={profile}/>
                    })}

                    {profiles.length === 0 ? <View style={styles.nousers}><ActivityIndicator size="large" color="white" /></View> : <></>}
                    </View>
            
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

  nousers : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

  profilesPage: {
    height: '100%',
    backgroundColor: 'transparent',
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
  container: {
    backgroundColor: '#000',
    flex: 1,
    height: '100%'
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  img : {
      height: '100%',
      width: '100%',
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
     alignItems: 'center',
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
})
export default Profiles