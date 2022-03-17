import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HomeButton = (props) => {
 
  const handleClick = () => {
    props.nav("/", { replace: true });
  }

  return (
    <TouchableOpacity style={styles.link} onPress={handleClick}>
      
          <Text style={styles.linkText}><Ionicons name="md-home" size={32} color="black" /></Text>
      
    </TouchableOpacity>
  )
}

export const CreateButton = (props) => {
 
  const handleClick = () => {
    props.nav("/create", { replace: true });
  }

  return (
    <TouchableOpacity style={styles.link} onPress={handleClick}>
      
          <Text style={styles.linkText}>CREATE</Text>
      
    </TouchableOpacity>
  )
}

export const ProfilesButton = (props) => {
 
  const handleClick = () => {
    props.nav("/profiles", { replace: true });
  }

  return (
    <TouchableOpacity style={styles.link} onPress={handleClick}>
      
          <Text style={styles.linkText}><Ionicons name="person-outline" size={32} color="black" /></Text>
      
    </TouchableOpacity>
  )
}

export const TestButton = (props) => {
 
  const handleClick = () => {
    props.nav("/test", { replace: true });
  }

  return (
    <TouchableOpacity style={styles.link} onPress={handleClick}>
      
          <Text style={styles.linkText}><Ionicons name="person-outline" size={32} color="black" /></Text>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link : {
     width: '33%',
     height: '100%',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'space-evenly'
  },
  linkText : {
   color: '#000',
  }
});