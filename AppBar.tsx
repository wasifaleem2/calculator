import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Theme {
  primary: string;
  secondary: string;
  font1: string;
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
      height: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      flexDirection: "row",
    },
    headerHeading: {
      color: props.theme.secondary,
      fontSize: 30,
      marginLeft: 30,
      marginRight: "auto"
    },
    pickerLabel: {
      color: props.theme.secondary,
      fontSize: 15,
    },
    picker: {
      width: 50,
      marginRight: 30,
      color: props.theme.secondary,
    },
  });

  // useEffect(()=>{
  //   AsyncStorage.setItem('theme', JSON.stringify(props.theme));
  //   console.log("save", props.theme)
  // },[props.colors])

  return (
    <View style={styles.header}>
      <Text style={styles.headerHeading}>{'Calculator'}</Text>
      <Text style={styles.pickerLabel}>{'theme'}</Text>
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
        {/* <Picker.Item label="default" value={{primary: "#AED7F1", secondary:"#2471A3", font1:"#FBECFC"}} /> */}
        <Picker.Item label="blue" value={{primary: "#AED6F1", secondary:"#2471A4", font1:"#FBFCFC"}} />
        <Picker.Item label="green" value={{primary: "#ABFF6E", secondary:"#438117", font1:"#FBFCFC"}} />
        <Picker.Item label="pink" value={{primary: "#FFAEE6", secondary:"#D66BB5", font1:"#FBFCFC"}} />
        <Picker.Item label="coral" value={{primary: "#F08080", secondary:"#CD5C5C", font1:"#FBFCFC"}} />
        <Picker.Item label="dark" value={{primary: "#34495E", secondary:"#17202A", font1:"#FBFCFC"}} />
      </Picker>
    </View>
  );
}

export default AppBar;
