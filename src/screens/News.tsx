import { Text, View } from "react-native";

function NewsScreen(prop: any){
  return (
    <View>
      <Text>News Screen</Text>
      {/* when using TabNavigator, you may not use prop.navigation.navigate function */}
      {/* <Button title={'Jump to Home Screen'} onPress={() => prop.navigation.navigate('Home')} /> */}
    </View>
  )
}
export default NewsScreen;
