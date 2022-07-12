import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Alert,
  TextInput,

} from "react-native";
import { Fontisto } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { theme } from "./colors.js";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  // useEffect(() => {
  //   loadToDos();
  // }, []);

  const changeTheme = async (isWork) => {
    setWorking(isWork);
    await AsyncStorage.setItem('isWork', JSON.stringify(isWork));
  }
  const onChangeText = (payload) => {setText(payload)};
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    // setToDos(JSON.parse(s));
    const isWork = await AsyncStorage.getItem('isWork')
    // if(!isWork) setWorking(false) 
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    console.log('ddd')
    const newToDos = {...toDos,
      [Date.now()]: { text, working },
    }
    // Object.assign({},toDos, {},  [Date.now()]: { text, work: working })
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  return (
    <View>
      <Text>df</Text>
    </View>
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <View style={styles.header}>
    //   <TouchableOpacity onPress={changeTheme(true)}>
    //       <Text
    //         style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
    //       >
    //         Work
    //       </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={changeTheme(false)}>
    //       <Text
    //         style={{
    //           ...styles.btnText,
    //           color: !working ? "white" : theme.grey,
    //         }}
    //       >
    //         Travel
    //       </Text>
    //     </TouchableOpacity>
    //     {/* 누르면 투명도가 변하는 이벤트
    //     <TouchableOpacity activeOpacity={0}> 
    //       <Text style={styles.btnText}>TouchableOpacity</Text>
    //     </TouchableOpacity>
    //     누르면 색 등의 이벤트
    //     <TouchableHighlight underlayColor="red" activeOpacity={0} onPress={() => {console.log('press')}}> 
    //       <Text style={styles.btnText}>TouchableHighlight</Text>
    //     </TouchableHighlight>
    //     누르면 UI 변화 없는 이벤트
    //     <TouchableWithoutFeedback underlayColor="red" activeOpacity={0} onPress={() => {console.log('press')}}> 
    //       <Text style={styles.btnText}>TouchableWithoutFeedback</Text>
    //     </TouchableWithoutFeedback>
    //     누르면 더 섬세한 이벤트
    //     <Pressable underlayColor="red" activeOpacity={0} onPress={() => {console.log('press')}}> 
    //       <Text style={styles.btnText}>Pressable</Text>
    //     </Pressable>
    //     hitslope: 버튼 범위설정 */}
    //   </View>
    //   <TextInput
    //     onChangeText={onChangeText}
    //     onSubmitEditing={addToDo}
    //     returnKeyType="done"
    //     value={text}
    //     placeholder={
    //       working ? "What do you have to do?" : "Where do you want to go?"
    //     }
    //     style={styles.input}
    //   />
    //    <ScrollView>
    //    {Object.keys(toDos).map((key) =>
    //       toDos[key].working === working ? (
    //         <View style={styles.toDo} key={key}>
    //           <Text style={styles.toDoText}>{toDos[key].text}</Text>
    //           <TouchableOpacity onPress={() => deleteToDo(key)}>
    //             <Fontisto name="trash" size={18} color={theme.grey} />
    //           </TouchableOpacity>
    //         </View>
    //       ) : null
    //     )}
    //   </ScrollView>
    //   {/* textInput의 props: keyboardType: 입력하는 키보드 타입 설정, returnkeyType: 버튼 이름 설정, secureTextEntry:비밀번호 입력시
    //   multiple: 여러 줄 가능, */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,

    marginBottom: 10,
    paddingVertical: 20,  
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",

  },
});
