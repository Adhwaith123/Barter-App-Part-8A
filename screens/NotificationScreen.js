import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import MyHeader from '../components/MyHeader';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'


export default class NotificationScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      allNotifications : []
    }
  this.notificationsRef= null
  }

  getNotifications =()=>{
    this.notificationsRef = db.collection("allNotifications")
    .where("notifications_status","==","unread")
    .where("targeted_user_id", "==",this.state.userId)
    .onSnapshot((snapshot)=>{
        var allNotifications=[]
        snapshot.docs.map((doc)=>{
            var notifications=doc.data()
            notifications["doc_id"]=doc.id
            allnotifications.push(notifications);
        })
    })
    }
  componentDidMount(){
    this.getRequestedBooksList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
              onPress ={()=>{
                this.props.navigation.navigate("ThingsToRequest",{"ThinngsToRequest": item})
              }}
              >
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Donate Item" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.requestedItemsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Things</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
