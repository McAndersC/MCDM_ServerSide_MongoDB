import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions} from 'react-native';
import {Camera} from 'expo-camera';
import React from 'react';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import mime from 'mime';
import config from '../misc/config';

const Booth = (props) => {

    let camera: Camera;

    const { height, width } = Dimensions.get('window');
    const [ previewVisible, setPreviewVisible ] = React.useState(false);

    let serverPath = config.serverPath;

    const finalize = async (manipResult) => {

        try {
            
            if(manipResult) {

                let fileName = props.profileData._id + '_' +  Date.now();
                let formData = new FormData();

                formData.append('profile', { uri: manipResult.uri, name: fileName, type: mime.getType(manipResult.uri) });
                formData.append('username', props.profileData.username);
                formData.append('id', props.profileData._id);
                formData.append('fileName', fileName);

                    await fetch(serverPath + 'profileimage', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    }).then( ()=> {
                 
                        props.setServerMessage({message: 'Billede er uploaded'})

                    })

                    let postObj = {
                        id : props.profileData._id,
                        username: props.profileData.username,
                        profile: fileName + '.png' 
                    }

                    await fetch(serverPath + 'profile', {
                        method: 'POST',
                        body: JSON.stringify(postObj),
                         headers: {
                            'content-type': 'application/json' 
                        },
                    }).then(()=> {
                        props.setServerMessage({message: 'Billede er opdateret'})
                    })
                    
            } 

         } catch (error) {

            console.log(error)

        }

    }

    const takePicture = async () => {

        const photo = await camera.takePictureAsync({
            quality: 0
        })

        const manipResult = await manipulateAsync(
            
        photo.localUri || photo.uri,
        [
            { flip: FlipType.Horizontal },
        ]
        )
        
        props.setCapturedImage(manipResult);
        // setCapturedImage(manipResult);
     
        const final = await finalize(manipResult);

        props.setStartCamera(false);
    }

    return <View style={styles.booth}>

            {!previewVisible ? <View
            style={{
                position: 'absolute',
                top: 50,
                height: 250,
                left: -25,
                width: 250,
                backgroundColor: 'red',
                borderRadius : 125,
                zIndex: 100,
                overflow: 'hidden'
            }}
            >
            <Camera
              type={'front'}
              ratio={"4:3"}
              autoFocus={false}
              style={{
                height: 250,
                width: 250,
              }}
              ref={(r) => {
                camera = r
              }}
            >
             
            </Camera></View> : <View><Text>Preview</Text></View>}

            <View
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                position: 'absolute',
                bottom: 0,
                height: 50,
            }}
            >
         
            <TouchableOpacity
                onPress={takePicture}
                style={{
                width: 100,
                height: 50,
                bottom: 0,
                top: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: '#fff'
                }}
            >
            <Text>Take Picture</Text>
            </TouchableOpacity>
            
            </View>
    </View>

}

const styles = StyleSheet.create({
  booth : {
     width: 200,
     height: 360,
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'space-evenly'
  }
});

export default Booth;