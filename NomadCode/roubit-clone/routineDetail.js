import {StyleSheet, Pressable, Text, View,  TouchableOpacity,} from "react-native"
import React, { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import uuid from 'react-native-uuid';


export default function RoutineDetail (props) {
  const [validDays, setValidDays] = useState(new Array(8).fill(false))
  const toggle = (index) =>() => {
    const temp = [...validDays]
    temp[index] = !temp[index]
    setValidDays(temp)
    console.log(validDays)
  }
  return (
    <View style={{...styles.rouWrapper}}>
       {props.isAll? props.index<5: props.el.num>40 && <Text style={styles.hot}>HOT</Text>}
            <View style ={{flexDirection: 'row'}}> 
              <Text style={styles.title}>{props.el.title}</Text>
              <Text style={styles.num}>{props.el.num}K</Text>
              <Pressable  activeOpacity={0} onPress={toggle(0)}>{validDays[0]?<Feather name="x" size={20} color="black" />:<AntDesign name="plus" size={20} color="green" />}</Pressable>
            </View>
            <Text style={styles.des}>{props.el.des}</Text>

            {/* <View style ={{flexDirection: 'row'}}>
              
            </View> */}
            {validDays[0] &&<View style={styles.days}>
              {['일','월','화','수','목','금','토'].map((el,index) => (
                <TouchableOpacity onPress={toggle(index)} key={uuid.v4()} ><Text style={{...styles.day, backgroundColor: validDays[index]===true? "green": "none"}}>{el}</Text></TouchableOpacity>
              ))}
            </View>}
    </View>
  )
}
const styles = StyleSheet.create({
  rouWrapper: {
    borderWidth: .5,
    marginTop: 15,
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: "space-between",
    backgroundColor: "#f5f5dc",
    borderColor: '#f5f5dc',

    position: 'relative'

  },
  title: {
    fontWeight: "bold",
    flexGrow: 1,
  },
  des: {
    fontSize: 12,

  },
  num: {
    color:'gray',
    marginTop: 3,
    marginRight: 9,
    fontWeight: "bold",
    fontSize: 12,

  },
  hot:{
    position:'absolute',
    fontSize: 10, 
    borderWidth: .2,
    borderRadius: 20,
    backgroundColor: 'orange',
    top: -8,
    left:15,
    borderColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: 'white',
  },
  days: {
    width: '100%',
    flexDirection: 'row',
    bottom:0,
    left:0,
    justifyContent: "space-between",
    paddingHorizontal:5.
  },
  day: {
    borderWidth: .5,
    borderColor: 'green',
    borderRadius:50,
    paddingHorizontal:6.5, 
    paddingVertical:3,
    marginTop: 8,
  }
})