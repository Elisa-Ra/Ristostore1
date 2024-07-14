import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,ScrollView,SafeAreaView,Image,Text,TouchableOpacity } from 'react-native';
import { TextInput, Button, Portal, Dialog,Provider} from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
// import 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Constants from 'expo-constants';
// import { Card } from 'react-native-paper';, useEffect 
import { Animated, Dimensions } from 'react-native';
import React, { useRef,useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import React from 'react';


const apiroot="https://ristostore.it/Ristoapp/";
async function richiesta(oggetto, api='api',altro=false){
  let formdata = new FormData();
  for (const [key, value] of Object.entries(oggetto)) {
    formdata.append(key, value);
  }
  try {
    let res = await fetch((api && !altro?apiroot+api:altro), {
      method: 'POST',
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      } ,
      body: formdata
    });
    res = await res.json();
    return res;
  } catch (e) {
    return e;
  }
}
async function getData(key){
  let value = await AsyncStorage.getItem(key);
  return value;
}

async function getLocal() {
  let Id_User = await getData('@Id_User');
  let Nominativo = await getData('@Nominativo');
  let secret_Value = await getData('@secret_Value');
  let Email = await getData('@Email');
  let dati={};
  dati.Id_User=Id_User;
  dati.Nominativo=Nominativo;
  dati.secret_Value=secret_Value;
  dati.Email=Email;
  if(Id_User!="" && typeof(Id_User)!="undefined" && Id_User!=null && secret_Value!="" && typeof(secret_Value)!="undefined" && secret_Value!=null){
    dati.connesso=true;
  } else {
    dati.connesso=false;
  }
  return dati;
};

const Stack = createStackNavigator();
const win = Dimensions.get('window');
const ratio = win.width / 434;
const FadeInView = (props) => {
const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        delay:props.ritardo
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}


var connesso=false;
function ScreenA({navigation}){ //pagina iniziale
  
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [checkconnesso, setconnesso] = useState(connesso);

  useEffect(() => {
    async function iniz(){
      var dati = await getLocal();
      setconnesso(dati.connesso);
      if(dati.connesso==true){
        if(dati.Id_User!="" && dati.secret_Value!="" && dati.Email!=""){
          let datiaccesso={
            "Operazione":"Accesso",
            "User":dati.Email,
            "Pass":dati.secret_Value,
          }
          // console.log('datiaccesso', datiaccesso);
          richiesta(datiaccesso).then((json) => {
            if(json.ok) {
              screenb();
            } else {
              alert("Dati errati");
            }
          });
        } else {
          alert("Login non riuscito. Assicurati che i campi Utente, Password siano corretti.");
        }
      } else {
          showDialog();
      }
    }
    iniz();
  }, []);
  
  const [user, setuser] = useState('');
  const [pwd, setpwd] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  var Value = user;
  var secret_Value = pwd;

  const screenb= () => {
    navigation.navigate('Ristostore');
  }
  // const screenc= () => {
  //   navigation.navigate('Area Drivers');
  // }
  // const screend= () => {
  //   navigation.navigate('Area Gestori');
  // }



  return (
    <Provider>
      <SafeAreaView style={[{backgroundColor:'#01a1ad', paddingBottom:16}]}>
        <ScrollView>

            <View style={[{backgroundColor:"#fff", width:"100%", alignItems:'center', paddingTop:24,paddingBottom:12}]}> 
              <Image source={require('./assets/logoorizzontale.jpg')}  
                style={{
                  width: 250,
                  height: 68
                }}
              />     
            </View>
            <View style={styles.container}> 
                <Text  style={[{color:'#fff', fontSize:24, margin:8, textAlign:'center'}]}>Ciao, sei su Ristostore, cosa posso portarti oggi?</Text>
            </View>
            <View style={styles.container}> 
              <View style={styles.container}> 
                <FadeInView  style={styles.div} ritardo={400}>
                  <TouchableWithoutFeedback onPress={screenb}>
                    <Image source={require('./assets/cibo.png')}  
                      style={{
                        width: 200,
                        height: 182,
                        // width: win.width,
                        // height: 217 * ratio,
                      }}
                    />
                  </TouchableWithoutFeedback>
                </FadeInView>
                <FadeInView  style={styles.div} ritardo={800}>
                  <TouchableWithoutFeedback onPress={screenb}>
                    <Image source={require('./assets/spesa.png')}  
                      style={{
                        width: 200,
                        height: 182,
                        // width: win.width,
                        // height: 217 * ratio,
                      }}
                    />
                  </TouchableWithoutFeedback>
                </FadeInView>
                <FadeInView  style={styles.div} ritardo={1200}>
                  <TouchableWithoutFeedback onPress={screenb}>
                    <Image source={require('./assets/negozi.png')}  
                      style={{
                        width: 200,
                        height: 182,
                        // width: win.width,
                        // height: 217 * ratio,
                      }}
                    />
                  </TouchableWithoutFeedback>
                </FadeInView>
                <FadeInView  style={styles.div} ritardo={1500}>
                  {
                    checkconnesso ?
                      <TouchableOpacity
                        onPress={
                          async () => {
                            let richiestadisconnessione={
                              "Operazione":"Disconnessione"
                            }
                            richiesta(richiestadisconnessione).then(async (json) => {
                              // if(json.risposta=="Logout_effettuato"){
                              // }
                              await AsyncStorage.clear().then(()=>{
                                  alert("Logout effettuato");
                                  setconnesso(false);
                                  setVisible(true);
                              });
                            });
                          }
                        }
                        style={[{ backgroundColor: '#00a1ae' }, styles.py10, styles.w100, styles.centro]}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Log Out</Text>
                      </TouchableOpacity>
                    :
                      <TouchableOpacity
                        onPress={showDialog}
                        style={[{ backgroundColor: '#00a1ae' }, styles.py10, styles.w100, styles.centro]}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Log In</Text>
                      </TouchableOpacity>
                  }
                </FadeInView>
              {/*
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
                {/* <WebView name='1' style={styles.div}
                  source={{ uri: 'https://ristostore.it/' }} 
                /> 
                 onDismiss={hideDialog}
                */}
              </View>  
              <Portal>
                <Dialog visible={visible} dismissable={false}>
                  <Dialog.Title>Effettua il login oppure registrati</Dialog.Title>
                  <Dialog.Content>
                  <Text style={[{textAlign: 'center'},styles.h3,styles.mt15]}>Effettua l'accesso:</Text>
                      <Text style={styles.mt15}>Utente:</Text>
                      <TextInput
                        style={[styles.input1,styles.w100]}
                        textAlign={'center'}
                        onChangeText={(Value) => {
                          setuser(Value)
                        }}
                        value={Value ?? ""}
                      />
                      <Text style={styles.mt15}>Password:</Text>
                      <TextInput
                        style={[styles.input1,styles.w100]}
                        textAlign={'center'}
                        onChangeText={(secret_Value) => {
                          setpwd(secret_Value)
                        }}
                        value={secret_Value ?? ""}

                        secureTextEntry={passwordVisible}
                        // right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                      />
                      <TouchableOpacity
                        onPress={
                          () => {
                            if(Value!="" && secret_Value!=""){
                              let datiaccesso={
                                "Operazione":"Accesso",
                                "User":Value,
                                "Pass":secret_Value,
                              }
                              richiesta(datiaccesso).then((json) => {
                                if(json.ok) {
                                  var Id_User=json.dati.Id;
                                  var Nominativo=json.dati.Nominativo;
                                  connesso=true;
                                  setconnesso(connesso);
                                  try {
                                    AsyncStorage.setItem('@Id_User', Id_User);
                                    AsyncStorage.setItem('@Nominativo', Nominativo);
                                    AsyncStorage.setItem('@secret_Value', secret_Value);
                                    AsyncStorage.setItem('@Email', Value);
                                    hideDialog();
                                    ScreenB();
                                  } catch (e) {
                                    console.log(e);
                                  }
                                } else {
                                  alert("Dati errati");
                                }
                              });
                            } else {
                              alert("Login non riuscito. Assicurati che i campi Utente, Password siano corretti.");
                            }
                          }
                        }
                        style={[{ backgroundColor: '#00a1ae' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Accedi</Text>
                      </TouchableOpacity>
                      <Button onPress={()=>{Linking.openURL("https://ristostore.it/Registrati?versioneperapp=si");}}  mode="contained"  style={[styles.w100, styles.mt15]}>Oppure Registrati</Button>
                      <Button onPress={()=>{Linking.openURL("https://ristostore.it/Recupero_Password?versioneperapp=si");}}  mode="outlined"  style={[styles.w100, styles.mt15]}>Recupera password</Button>
                      <Button onPress={()=>{
                        setVisible(false);
                      }}  mode="text"  style={[styles.w100, styles.mt15]}>Procedi come ospite</Button>

                  </Dialog.Content>
                </Dialog>
              </Portal>        
          </View>
          <StatusBar hidden={true} />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}
function ScreenB(){ //ristostore home
  return (
    <>
      <WebView name='1' source={{ uri: 'https://ristostore.it/' }}  />
      <StatusBar hidden={true} />
    </>
  );
}
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
      // <WebView name='1'
      //   source={{ uri: 'https://ristostore.it/' }} style={styles.mt}
      // />
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{    headerShown: false  }}>
          <Stack.Screen name="Ristostore App" component = {ScreenA}/>
          <Stack.Screen name="Ristostore" component = {ScreenB} />
          {/* <Stack.Screen name="Area Drivers" component = {ScreenC}/>
          <Stack.Screen name="Area Gestori" component = {ScreenD}/> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  div:{
    marginTop:20,
    flex:1,
    width:'100%',
    height:'100%'
  },
  mt:{
    marginTop:35,
  },
  mt15:{
    marginTop:35,
  },
  py10:{
    paddingVertical:10,
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
  },
  w100: {
    alignSelf: 'stretch',
    width:'100%',
  },
  centro: {
    alignItems: 'center',
    marginHorizontal:'auto'
  },
  input1: {
    height: 50,
    backgroundColor: "#fff",
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