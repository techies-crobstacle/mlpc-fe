import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'


const PrayerPoints = () => {
  return (
    <View style={{flex:1}}>
                <ImageBackground style={{flex:1}} source={require('../assets/images/3.jpg')}>
    <View style={{padding:20, paddingTop:60}}>
    <View style={styles.container}>
      <Text style={{fontSize:16, fontWeight:"bold" , paddingBottom:10}}>Pray the Media Leaders & Cultural Influencers</Text>
      <FlatList
          data={[
            { key: 'Tokyo' },
            { key: 'Delhi' },
            { key: 'Shanghai' },
            { key: 'Sao Paolo' },
            { key: 'Mexico City' },
            { key: 'Cairo' },
            { key: 'Dhaka' },
            { key: 'Mumbai' },
            { key: 'Beijing' },
            { key: 'Osaka' },
          ]}
          renderItem={({ item }) => {
            return (
             
              <View style={{ marginBottom: 10 }}>
                <Text style={{fontWeight:"500"}}>{`\u2022 ${item.key}`}</Text>
              </View>
             
            );
          }}
        />
    </View>
    </View>
    </ImageBackground>
    </View>
  )
}

export default PrayerPoints

const styles = StyleSheet.create({

    container:{
        borderWidth:1,
        borderRadius:10,
        padding:18,
        backgroundColor:"white",
        opacity:0.9
        
     },

})