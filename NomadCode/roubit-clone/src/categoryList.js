import { StyleSheet, Text, View,Pressable, ActivityIndicator,ScrollView,Dimensions, Button } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'; 

import uuid from 'react-native-uuid';

export default function CategoryList (props) {
  
  const pressBtn = (index)=>() => {
    props.setCategory(index)
    if(props.setModalVisible!==undefined) props.setModalVisible(false)
  }
  return (
    <View style={{...styles.Category,paddingHorizontal: props.setModalVisible? 0: 15}}>
        {props.setModalVisible?
          <View style={{flexDirection: 'row',flexWrap: 'wrap', alignItems: 'center',justifyContent: 'center'}}>
            {['전체 루틴','건강','지식','힐링','동기부여','기타'].map((el,index) =>  
            <Pressable key={uuid.v4()} onPress = {pressBtn(index)} style={styles.categoryText} ><FontAwesome name="chevron-circle-down" color={index===props.category? "black": "gray"}size={props.width}  /><Text style={{color: index===props.category? "black": "gray" }}>{el}</Text></Pressable>
            )}

          </View>
        : <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          {['전체 루틴','건강','지식','힐링','동기부여','기타'].map((el,index) =>  
          <Pressable key={uuid.v4()} onPress = {pressBtn(index)} style={styles.categoryText} ><FontAwesome name="chevron-circle-down" color={index===props.category? "black": "gray"}size={props.width}  /><Text style={{color: index===props.category? "black": "gray" }}>{el}</Text></Pressable>
          )}

        </ScrollView>}
      </View>
  )
}
const styles = StyleSheet.create({
  Category: {
    // width: '100%',
    flex: .6,
    flexDirection: "row",
    paddingVertical: 10,

  },
  categoryText: {
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
})