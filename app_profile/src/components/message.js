import { Animated, Alert, StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback, Image, SafeAreaView, TextInput, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

function MessageDialog(props) {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
        toValue: 0,
        duration:300,
        useNativeDriver: true
        }).start();
    };

    useEffect(() => {
        
        if(Object.keys(props.serverMessage).length != 0)
        {
            fadeIn();

        } else {

            fadeOut();

        }

    },[props.serverMessage])
    
    return (
        <Animated.View style={styles.serverMessageContainer} 
                    style={[
                    styles.serverMessageContainer,
                    {
                        // Bind opacity to animated value
                        opacity: fadeAnim
                    }
                    ]}
                >
                <TouchableWithoutFeedback onPress={fadeOut}><View ><Text style={styles.serverMessage}>{props.serverMessage.message}</Text></View></TouchableWithoutFeedback>
         </Animated.View>
    )

}

const styles = StyleSheet.create({
 
  serverMessageContainer : {
    color: '#ffffff',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    padding: 0,
    textAlign: 'center'
  },

  serverMessage : {
    color: '#ffffff',
    padding: 20,
    backgroundColor: 'green',
    textAlign: 'center',
  }

});

export default MessageDialog
