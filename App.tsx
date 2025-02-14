import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBar from './AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';

// const {width, height} = Dimensions.get('window');

interface HistoryInterface {
  equation: string;
  result: string;
}

const getScreenSize = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height, isPortrait: height >= width };
};

function App(): JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  const [screen, setScreen] = useState(getScreenSize());
  const [startNew, setStartNew] = useState<boolean>(false);
  const [fieldValue, setFieldValue] = useState<string>('');
  const [equation, setEquation] = useState<string>('');
  const [history, setHistory] = useState<HistoryInterface[] | []>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [theme, setTheme] = useState({primary: "#F7F7F7", secondary:"#FFB22C", font1:"#854836", font2:"#C14600"});

  useEffect(() => {
    AsyncStorage.getItem('theme').then(value => {
      if (value) {
        setTheme(JSON.parse(value));
      } else {
        setTheme({primary: "#F7F7F7", secondary:"#FFB22C", font1:"#854836", font2:"#C14600"});
      }
    });
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [showModal, history]);

  useEffect(() => {
    const updateScreenSize = () => setScreen(getScreenSize());
    const subscription = Dimensions.addEventListener('change', updateScreenSize);

    return () => subscription.remove();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.primary,
      width: '100%',
      height: '100%',
      flex: 1,
    },
    modal: {
      margin: '20%',
      height: screen.height * 0.6, 
      width: '60%',
      backgroundColor: theme.font1,
    },
    modalHeading: {
      color: 'black',
      fontSize: 20,
    },
    modalScroll: {
      height: screen.height * 0.48,
      width: '100%',
    },
    modalEquation: {
      fontSize: 15,
      color: theme.primary,
    },
    modalResult: {
      fontSize: 20,
      color: theme.secondary,
    },
    modalButton: {
      // backgroundColor: "red",
      justifyContent: 'center',
      alignItems: 'center',
      // width: "40%",
      alignSelf: 'flex-end',
      marginTop: 'auto',
      marginRight: '2%',
    },
    top: {
      backgroundColor: 'white',
      // padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: screen.height * 0.3,
      width: '100%',
    },
    input: {
      position: 'absolute',
      bottom: screen.height * 0.05,
      width: '90%',
    },
    inputText: {
      color: theme.secondary,
      fontSize: screen.isPortrait ? screen.width * 0.08 : screen.width * 0.03,
      textAlign: 'right',
    },
    equation: {
      color: theme.font2,
      fontSize: screen.isPortrait ? screen.width * 0.05 : screen.width * 0.03,
      textAlign: 'right',
      marginBottom: screen.isPortrait ? 10 : 4,
    },
    buttonBox: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      padding: screen.width * 0.02,
    },
    button: {
      backgroundColor: theme.secondary,
      height: screen.isPortrait ? screen.height * 0.1 : screen.height * 0.08,
      width: screen.width * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      margin: screen.isPortrait ? screen.width * 0.015 : screen.width * 0.01,
      borderRadius: 18,
    },
    enterButton: {
      backgroundColor: '#CD6161',
      height: screen.isPortrait ? screen.height * 0.1 : screen.height * 0.08,
      width: screen.width * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      margin: screen.isPortrait ? screen.width * 0.02 : screen.width * 0.01,
      borderRadius: 18,
    },
    buttonText: {
      color: theme.font1,
      fontSize: screen.isPortrait ? screen.width * 0.06 : screen.width * 0.03,
    },
  });

  const setFieldText = (input: string) => {
    if(input === "+" || input === "-" || input === "*" || input === "/"){
      setFieldValue(fieldValue + input);
    } else if (startNew) {
      setFieldValue(input);
      setStartNew(false);
    } else if (fieldValue.length < 30) {
      setFieldValue(fieldValue + input);
    }
  };

  let buttons = [
    {label: 'C', value: 'C'},
    {label: <Icon name="caret-left" size={20} color="white" />, value: 'B'},
    {label: <Icon name="percentage" size={20} color="white" />, value: '%'},
    {label: <Icon name="divide" size={20} color="white" />, value: '/'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: <EntypoIcon name="cross" size={28} color="white" />, value: '*'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: <Icon name="minus" size={20} color="white" />, value: '-'},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: <Icon name="plus" size={20} color="white" />, value: '+'},
    {label: '0', value: '0'},
    {label: '.', value: '.'},
    {label: 'Hst', value: 'Hst'},
    {label: <Icon name="equals" size={20} color="white" />, value: '='},
  ];

  const equalsTo = () => {
    try {
      setEquation(fieldValue);
      let result = eval(fieldValue.toString());
      let newResult: HistoryInterface = {
        equation: fieldValue,
        result: result.toString(),
      };
      setHistory(prevHistory => [...prevHistory, newResult]);
      setFieldValue(result.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.primary} barStyle="dark-content" />
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modal}>
          <Text style={styles.modalHeading}>History</Text>
          <ScrollView ref={scrollViewRef} style={styles.modalScroll}>
            {history.map((hst, index) => (
              <View key={index}>
                <Text style={styles.modalEquation}>{hst.equation}</Text>
                <Text style={styles.modalResult}>{hst.result}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setShowModal(false)}>
            <Icon name="window-close" size={40} color="red" />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.top}>
        <AppBar colors={t => setTheme(t)} theme={theme} />
        <View style={styles.input}>
          {/* <Pressable onPress={()=>setShowModal(true)}><Text>Hst</Text></Pressable> */}
          <Text style={styles.equation}>{equation}</Text>
          <Text style={styles.inputText}>{fieldValue}</Text>
        </View>
      </View>

      <View style={styles.buttonBox}>
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={btn.value === '=' ? styles.enterButton : styles.button}
            onPress={() => {
              if (btn.value === 'C') {
                setFieldValue('');
                setEquation('');
              } else if (btn.value === 'B') {
                setFieldValue(fieldValue.substring(0, fieldValue.length - 1));
              } else if (btn.value === 'Hst') {
                setShowModal(!showModal);
              } else if (btn.value === '%') {
                setFieldValue((Number(fieldValue) / 100).toString());
                setEquation(fieldValue);
                // equalsTo();
              } else if (btn.value === '=') {
                setStartNew(true);
                equalsTo();
              } else {
                setFieldText(btn.value);
              }
            }}>
            <Text style={styles.buttonText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default App;
