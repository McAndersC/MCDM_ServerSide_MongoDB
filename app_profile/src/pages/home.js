import { StyleSheet, Text, View, ImageBackground} from 'react-native';
function Home() {
    return (
        <View style={styles.page}>
            <ImageBackground  style={styles.logo} source={require('../../assets/logo_compact.png')}>
              <Text style={styles.text}>Medieskolen Viborg</Text>
              <Text style={styles.text}>Demo Version</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',

  },  
  logo: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  }
});
export default Home