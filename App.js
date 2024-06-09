import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from  '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import  Movies  from './Pages/Movies.js'  ;
import  MovieDetails  from './Pages/MovieDetails.js'  ;
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './Store/Store.js';
import FavoriteMoviesList from './Pages/FavoriteMovie.js';
// ايه الفرق لما اعملها يقوسين او لا
export default function App() {

  const Stack = createNativeStackNavigator();

  const Drawer = createDrawerNavigator();
   const MainStack = () => {
     return (
       <Stack.Navigator> 
         <Stack.Screen name="Movies" component={Movies} />
         <Stack.Screen name="MovieDetails"
         component={MovieDetails} />    
       </Stack.Navigator> 
     )
   }
        

  return (
    <Provider store={store}>
        <NavigationContainer>
             <Drawer.Navigator>
                      <Drawer.Screen name="Movies List" component={MainStack}/>
                      <Drawer.Screen name="Favorite Movies List" component={FavoriteMoviesList}/>
                      {/* <Drawer.Screen name="Movies List2" component={MainStack}/> */}
                      
             </Drawer.Navigator>
        </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
