import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


interface Theme {
  primary: string;
  secondary: string;
  font1: string;
  font2: string;
}
interface AppBarProps {
  colors: (t: Theme) => void;
  theme: Theme;
}
function AppBar(props: AppBarProps): JSX.Element {
  // const [theme, setTheme] = useState({primary: "skyblue", secondary:"navy"});
  // let colors = {
  //   blue: {
  //     light: "skyblue",
  //     dark: "navy"
  //   },
  //   green: {
  //     light: "#6BCC23",
  //     dark: "#5A9231"
  //   },

  // }
  const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      backgroundColor: props.theme.primary,
      width: '100%',
      height: 48,
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      flexDirection: "row",
    },
    headerHeading: {
      color: props.theme.secondary,
      fontSize: 25,
      fontWeight: "800",
      marginLeft: 30,
      marginRight: "auto"
    },
    pickerLabel: {
      color: props.theme.secondary,
      fontSize: 15,
    },
    picker: {
      width: 50,
      marginRight: 10,
      color: props.theme.secondary,
    },
  });

  // useEffect(()=>{
  //   AsyncStorage.setItem('theme', JSON.stringify(props.theme));
  //   console.log("save", props.theme)
  // },[props.colors])

  return (
    <View style={styles.header}>
      <Text style={styles.headerHeading}>{'WA Calculator'}</Text>
      {/* <Text style={styles.pickerLabel}>{'theme'}</Text> */}
      <MaterialIcons name="invert-colors" size={20} color="white" />
      <Picker
        style={styles.picker}
        selectedValue={props.theme}
        selectionColor={props.theme.primary}
        onValueChange={(itemValue) =>
          {props.colors(itemValue)
            AsyncStorage.setItem('theme', JSON.stringify(itemValue));
            console.log("save", itemValue)
          }
        }>
        <Picker.Item style={{display:"none"}} enabled={false} label="Select Color" value={{primary: "#F7F7F7", secondary:"#FFB22C", font1:"#854836", font2:"#C14600"}} />
        <Picker.Item label="Yellow" value={{primary: "#F7F7F7", secondary:"#FFB22C", font1:"#854836", font2:"#C14600"}} />
        <Picker.Item label="blue" value={{primary: "#A1E3F9", secondary:"#3674B5", font1:"#FBFCFC", font2:"#7886C7"}} />
        <Picker.Item label="dark" value={{primary: "#34495E", secondary:"#17202A", font1:"#FBFCFC", font2:"#34495E"}} />
        <Picker.Item label="green" value={{primary: "#A3D1C6", secondary:"#3D8D7A", font1:"#FBFFE4", font2:"#3D8D7A"}} />
        <Picker.Item label="coral" value={{primary: "#FFE4D5", secondary:"#E5989B", font1:"#DE3163", font2:"#E5989B"}} />
      </Picker>
    </View>
  );
}

export default AppBar;
