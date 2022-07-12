import { StyleSheet, Text, View,Pressable, ActivityIndicator,ScrollView,Dimensions, Button,Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {listData} from "./src/ListData"
import React, { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons'; 
import uuid from 'react-native-uuid';
import RoutineDetail from "./src/routineDetail.js";
import CategoryList from "./src/categoryList.js";
import { Feather } from '@expo/vector-icons'; 

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [data, setData] = useState([""])
  const [category, setCategory] = useState(0)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() =>{
    setData(listData)
    // console.log(listData)
  },[])
  const pressCategory = (i) =>() => {
    setCategory(i)
  }
  return (
    
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      > 
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
              <Text  style={{fontSize:18,fontWeight: 'bold'}}>루틴 목록</Text>
              <Pressable><Feather name="x" size={24} color="black" onPress={() => setModalVisible(!modalVisible)}/></Pressable>
            </View>
           
            <CategoryList setCategory = {setCategory} category={category} width={SCREEN_WIDTH/5} setModalVisible={setModalVisible}/>        

          </View>
        </View>


      </Modal>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="gray" />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>루틴 목록</Text>
        <Pressable onPress={() => {setModalVisible(true)}}><MaterialCommunityIcons name="square-rounded-outline" size={28} color="gray" /></Pressable>
      </View>
      <CategoryList setCategory = {setCategory} category={category} width={SCREEN_WIDTH/6.5} />
      <View style={styles.contents}>
        <ScrollView showsVerticalScrollIndicator={false} >
        {data.length===1? 
        <Text>로딩중</Text>
        :category === 0? data.flat().sort((a,b) => b.num - a.num).map((el,index) =>(
            <RoutineDetail key={uuid.v4()} el={el} index={index} isAll={true}/>
            ))
        :data[category-1].map((el,index) => (
          <RoutineDetail key={uuid.v4()} el={el} index={index} isAll={false}/>
            ))}
        </ScrollView>
      </View>
      
      
      <View style={styles.footer}>
        <Text>실천하고 싶은 루틴을 요일반복과 함께 모두 추가해보세요!</Text>
        <Button title="루틴 추가하기" color="green  "/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: .6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  header: {
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'yellow',
    paddingHorizontal: 17,
    // paddingVertical: 20,
    flex:.4,
    marginTop: 30
  },
 
  contents: { 
    flex: 3,
    width: '100%',
    backgroundColor: 'red',
    paddingHorizontal: 18,

  },
  footer: { 
    flex: .6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
