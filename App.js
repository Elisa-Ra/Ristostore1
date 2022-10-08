// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Image,ScrollView,SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import 'react-native-gesture-handler';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import Constants from 'expo-constants';
// import { Card } from 'react-native-paper';, useEffect 
// import { Dimensions } from 'react-native';
import React, { useRef} from 'react';


const Stack = createStackNavigator();
// const win = Dimensions.get('window');
// const ratio = win.width / 434;
// const FadeInView = (props) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

//   React.useEffect(() => {
//     Animated.timing(
//       fadeAnim,
//       {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//         delay:props.ritardo
//       }
//     ).start();
//   }, [fadeAnim])

//   return (
//     <Animated.View                 // Special animatable View
//       style={{
//         ...props.style,
//         opacity: fadeAnim,         // Bind opacity to animated value
//       }}
//     >
//       {props.children}
//     </Animated.View>
//   );
// }


function ScreenA({navigation}){ //pagina iniziale
  // const screenb= () => {
  //   navigation.navigate('Ristostore');
  // }
  // const screenc= () => {
  //   navigation.navigate('Area Drivers');
  // }
  // const screend= () => {
  //   navigation.navigate('Area Gestori');
  // }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.container}> 
          {/* <FadeInView  style={styles.div} ritardo={400}>
            <TouchableWithoutFeedback onPress={screenb}>
              <Image source={require('./assets/entra.jpg')}  
              style={{
                width: win.width,
                height: 217 * ratio,
              }}/>
          </TouchableWithoutFeedback>
          <Text style={styles.text}>Prova la nostra app</Text>
          </FadeInView>
        
          <FadeInView style={styles.div}  ritardo={800}>
            <TouchableWithoutFeedback onPress={screenc}>
              <Image source={require('./assets/rider.jpg')}  
              style={{
                width: win.width,
                height: 217 * ratio,
              }}
              />
            </TouchableWithoutFeedback> 
            <Text style={styles.text}>Area Driver</Text>
          </FadeInView>
        
          <FadeInView style={styles.div} ritardo={1200}>
            <TouchableWithoutFeedback onPress={screend}>
              <Image source={require('./assets/gestori.jpg')} 
              style={{
                width: win.width,
                height: 217 * ratio,
              }}
              />
            </TouchableWithoutFeedback> 
          <Text style={styles.text}>Area Gestori</Text>
          </FadeInView> */}
          <WebView name='1' style={styles.div}
            source={{ uri: 'https://ristostore.it/' }} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// function ScreenB(){ //ristostore home
//   return (
//       <WebView name='1'
//         source={{ uri: 'https://ristostore.it/' }} 
//       />
  
//   );
// }
// function ScreenC(){ //ristostore driver
//   return (
    
//       <WebView name='2'
//         source={{ uri: 'https://ristostore.it/Area_Drivers/accesso' }} 
//       />
   
//   );
// }
// function ScreenD(){ //ristostore gestori
//   return (
    
//       <WebView name='3'
//         source={{ uri: 'https://ristostore.it/Area_Gestori/accesso' }} 
//       />
    
//   );
// }

export default function App() {
    return (
      <WebView name='1'
            source={{ uri: 'https://ristostore.it/' }} 
          />
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name="Ristostore App" component = {ScreenA}/>
      //     {/* <Stack.Screen name="Ristostore" component = {ScreenB} /> */}
      //     {/* <Stack.Screen name="Area Drivers" component = {ScreenC}/>
      //     <Stack.Screen name="Area Gestori" component = {ScreenD}/> */}
      //   </Stack.Navigator>
      // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  div:{
    flex:1,
    width:'100%',
    height:'100%'
  },
  img:{
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    
  }, 
  text:{
    textAlign:'center',
    color:'#17a2b8',
    fontFamily:'serif',
    fontSize:20
  },
  // text1:{
  //   textAlign:'center',
  //   color:'#17a2b8',
  //   fontSize:20,
  //   fontFamily:'serif'
  // },
  // fadingContainer: {
  //   padding: 20,
  //   backgroundColor: 'powderblue',
  // },
  // fadingText: {
  //   fontSize: 28,
  // },

});