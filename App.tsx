/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import AppBar from './AppBar';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon, {caretup} from 'react-native-vector-icons/FontAwesome';



function App(): JSX.Element {
  const [fieldValue, setFieldValue] = useState<String>("");
  const [equation, setEquation] = useState<String>("");
  const [theme, setTheme] = useState<Theme>({primary: "skyblue", secondary:"navy", font1:"#FBECFC"});
  
  useEffect(()=>{
    AsyncStorage.getItem('theme').then((value) => {
      if (value) {
        setTheme(JSON.parse(value));
        console.log("from storageL ", theme)
      }
      else{
        setTheme({primary: "#AED7F1", secondary:"#2471A3", font1:"#FBECFC"});
      }
    });
  },[])

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme?.primary,
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
    },
    top: {
      backgroundColor: 'white',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40%',
      width: '100%',
    },
    input: {
      display: 'flex',
      justifyContent: "center",
      position: 'absolute',
      bottom: "10%",
      backgroundColor: 'transparent',
      paddingRight: 30,
      opacity: 1,
      width: "100%",
      height: "60%",
      padding: 20,
    },
    inputText: {
      color: theme?.secondary,
      fontSize: 35,
      textAlign: "right",
    },
    equation: {
      color: theme?.primary,
      fontSize: 20,
      textAlign: "right",
      marginBottom: 20,  
    },
    buttonBox: {
      height: '60%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      padding: "2%",
      flexWrap: "wrap",
    },
    enterButton: {
      backgroundColor: "#CD6161",
      height: "16%",
      width: "20%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: "2%",
      borderRadius: 12,
    },
    button: {
      backgroundColor: theme?.secondary,
      height: "16%",
      width: "20%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: "2%",
      borderRadius: 12,
    },
    buttonText: {
      color: theme?.font1,
      fontSize: 20,
    },
  });
  interface Theme {
    primary: string;
    secondary: string;
    font1: string;
  }

  const setFieldText = (input: any) => {
    if(fieldValue.length < 5){
      setFieldValue(fieldValue + input);
    }
    // let lastChar:String = fieldValue.slice(-1)
    // console.log(lastChar);
  }
  const equalsTo = (input: any) => {
    try{
      setEquation(fieldValue + input);
      let result = eval(fieldValue.toString());
      setFieldValue(result);
    }
    catch(error){
      console.log(error);
    }
  }
  const modulus100 = () => {
    setEquation(fieldValue);
    let result:any = Number(fieldValue)/100;
    setFieldValue(result);
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <AppBar colors={(t) => setTheme(t)} theme={theme} /> 
        {/* <TextInput
          style={styles.input}
          onFocus={Keyboard.dismiss()} 

          // autoFocus={true}
          // onChangeText={onChangeText}
          // value={text}
        /> */}
        <View style={styles.input}>
          <Text style={styles.equation}>{equation}</Text>
          <Text style={styles.inputText}>{fieldValue}</Text>
        </View>
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={()=>{setFieldValue(""); setEquation("")}}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldValue(
          fieldValue.substring(0, fieldValue.length - 1))}>
          <Text style={styles.buttonText}>&#x2190;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>modulus100()}>
          <Text style={styles.buttonText}>&#x25;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("/")}>
          <Text style={styles.buttonText}>&#247;</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("1")}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("2")}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("3")}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("*")}>
          <Text style={styles.buttonText}>&#9587;</Text>
          {/* <Icon name="caretup" size={30} color="#900" /> */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("4")}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("5")}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("6")}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("-")}>
          <Text style={styles.buttonText}>&#8722;</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("7")}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("8")}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("9")}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("+")}>
          <Text style={styles.buttonText}>&#x2b;</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("00")}>
          <Text style={styles.buttonText}>00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText("0")}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setFieldText(".")}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.enterButton} onPress={()=>equalsTo("=")}>
          <Text style={styles.buttonText}>&#x3d;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default App;
