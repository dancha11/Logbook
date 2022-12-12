import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { Header, Icon, Input, Button, ListItem } from 'react-native-elements';
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';


export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyCHQQE83Ap9caL_8sBAyPHkLMnqU1xFY4c",
    authDomain: "final-9aa2d.firebaseapp.com",
    projectId: "final-9aa2d",
    storageBucket: "final-9aa2d.appspot.com",
    messagingSenderId: "260486058750",
    appId: "1:260486058750:web:ebd7b94eefd8321b644baf",
    databaseURL: "https://final-9aa2d-default-rtdb.europe-west1.firebasedatabase.app/"

  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const [deptime, setDeptime] = useState('');
  const [arrtime, setArrtime] = useState('');
  const [arrairport, setArrairport] = useState('');
  const [depairport, setDepairport] = useState('');
  const [aircraftreg, setAircraftreg] = useState('');
  const [date, setDate] = useState('');

  const [items, setItems] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const firebaseItems = Object.values(data);
        const firebaseKeys = Object.keys(data);
        setItems(firebaseItems);
        setKeys(firebaseKeys);
      } else {
        setItems([]);
      }
    })
  }, []);

  const saveItem = () => {
    push(
      ref(database, 'items/'),
      { 'date': date,'depairport': depairport, 'deptime': deptime, 'arrairport': arrairport, 'arrtime': arrtime, 'aircraftreg' :aircraftreg });
    setDate('');
    setDepairport('');
    setDeptime('');
    setArrairport('');
    setArrtime('');
    setAircraftreg('');

  }

  const deleteItem = (index) => {
    var key = keys[index];
    remove(ref(database, 'items/' + key));
  }

  return (
    <View >
    <View>

    <Header centerComponent={{ text: 'FlightLog', style: { color: '#fff' } }}/>

<Input placeholder='Date' label='Date' onChangeText={date => setDate(date)} value={date} />
<Input  placeholder='Departure airport' label='Departure airport' onChangeText={depairport => setDepairport(depairport)} value={depairport} />
<Input placeholder='Departure time' label='Departure time' onChangeText={deptime => setDeptime(deptime)} value={deptime} />
<Input placeholder='Arrival airport' label='Arrival airport' onChangeText={arrairport => setArrairport(arrairport)} value={arrairport} />
<Input  placeholder='Arrival time' label='Arrival time' onChangeText={arrtime => setArrtime(arrtime)} value={arrtime} />
<Input placeholder='Aicraft registration' label='Aircraft registration' onChangeText={aircraftreg => setAircraftreg(aircraftreg)} value={aircraftreg} />
<Button raised icon={{name:'save', color:'white'}} onPress={saveItem} title="SAVE" />
</View>
<View >

  <FlatList 
    data={items}
    renderItem={({ item, index }) =>
    <ListItem bottomDivider>
      <ListItem.Content >
        <ListItem.Title>{item.date}</ListItem.Title>
        <ListItem.Subtitle>{item.depairport}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.deptime}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.arrairport}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.arrtime}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.aircraftreg}</ListItem.Subtitle>

        </ListItem.Content>
        <Icon
       name='delete' color='red' type='material' onPress={() => deleteItem(index)}/>
        
      </ListItem>
    }
  />
           </View>
           </View>


);
}


