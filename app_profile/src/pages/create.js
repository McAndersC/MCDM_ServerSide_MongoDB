import { Animated, Alert, StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback, Image, SafeAreaView, TextInput, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import config from '../misc/config';
import Booth from "../components/booth";
import { Route, Routes, Link, useNavigate, useParams } from "react-router-native";
import MessageDialog from "../components/message";
import {Camera} from 'expo-camera';

function CreateProfile() {

  let params = useParams();
  let profileId = params.profileId;
  // let serverPath = 'http://192.168.0.29:3000/';
  // let serverPath = 'http://192.168.6.237:3000/';
  let serverPath = config.serverPath;
  let serverUsers = serverPath + 'users';

  const [startCamera, setStartCamera] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [serverMessage, setServerMessage] = useState({});
  const [nameEdit, setNameEdit] = useState('');

  

  useEffect(() => {

    fetch(serverUsers)
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => {
      setProfiles(data)
 
      let pro = data.find((profile) => profile._id === profileId)
      setNameEdit(pro.username)
      setProfileData(pro)

    })

  },[])

  const handleStartCamera = async () => {

    try {
      const {status} = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {

        setStartCamera(true)

      } else {

        Alert.alert('Access denied')

      }
    } catch (e) {

      return console.log(e);
    }
  }

  const NameContainer = () => {

    const [startEdit, setStartEdit] = useState(false);
  
    const [text, setChangeText] = React.useState('');
  

    const handleEdit = () => {

        setStartEdit(true);
        
        setChangeText(nameEdit);

    }

    const onChangeTextHandler = (text) => {

        setChangeText(text)

    }

    const handleEditEnd = (e) => {

       

          try {

            let postObj = {
                username: profileData.username,
                newUserName: text
            }

           fetch(serverUsers, {
                method: 'PUT',
                body: JSON.stringify(postObj),
                headers : {
                  'content-type' : 'application/json'
                }
            }).then((response) => response.json()).then((response) => {
                
       
                setNameEdit(response.message !== 'Bruger er opdateret.' ? profileData.username : text)
                setServerMessage(response)
  
            })

          } catch (error) {
               console.log(error);
          }

    }


    return (
        <View >
          {!startEdit ? <Text onPress={handleEdit} style={styles.text}>{nameEdit}</Text> 
          : 
              <SafeAreaView>
                <TextInput style={styles.text} value={text} onChangeText={onChangeTextHandler} onEndEditing={handleEditEnd} />
              </SafeAreaView>
          }
        </View>
    )
  }

    return (
        <View style={styles.page}>
            <TouchableOpacity onPress={handleStartCamera}>
        
            { !startCamera ?
            
                <Image
                style={styles.profilePagePic}
                source={capturedImage ? {uri: capturedImage.uri } : {uri: serverPath + profileData.profile}}
                />
            : 
                <Booth setStartCamera={setStartCamera} profileData={profileData} setCapturedImage={setCapturedImage} setServerMessage={setServerMessage}/>

            }
            </TouchableOpacity>

            { !startCamera ? 
                <NameContainer /> : <View></View> }
            <MessageDialog serverMessage={serverMessage} />
        </View>
    )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
  page: {
    flex: 1,
    backgroundColor: '#000',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },  
  profilesPage: {

    backgroundColor: '#000',
    flexDirection: 'row',
    paddingTop : 60,
    paddingLeft : 20,
    paddingRight : 20,
    marginBottom: 50,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    color: '#fff'

  },
  profilesPageScroll : {
    backgroundColor: '#000',
  },
  text: {
    top: 10,
    color: '#fff',
    fontSize: 42
  },
  nav : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 60,
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
    width: 100,
    height: 130,
    color: '#fff'
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

export default CreateProfile