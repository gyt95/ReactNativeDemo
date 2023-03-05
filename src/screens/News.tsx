import { useState } from "react";
import { FlatList, SectionList, Text, TouchableOpacity, View } from "react-native";
import { FLAT_LIST_DATA, SECTION_LIST_DATA } from '../constants';
import { styles } from "./Home";

function NewsScreen(prop: any){

  const [selectedId, setSelectedId] = useState('')

  const Item = ({ title }: any) => (
    <View style={styles.SectionListItem}>
      <Text style={styles.SectionListTitle}>{title}</Text>
    </View>
  );
  
  const renderItem = ({ item }: any) => {
    const backgroundColor = item.id === selectedId ? '#dfb' : '#f9c2ff'
    return (
      <TouchableOpacity style={[styles.SectionListItem, { backgroundColor }]} onPress={() => {
        setSelectedId(item.id)
      }}>
        <Text style={styles.SectionListTitle}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Text>News Screen</Text>
      {/* when using TabNavigator, you may not use prop.navigation.navigate function */}
      {/* <Button title={'Jump to Home Screen'} onPress={() => prop.navigation.navigate('Home')} /> */}

      <View>
        <Text style={styles.commonTitleText}>SectionList</Text>
        <SectionList
          sections={SECTION_LIST_DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.SectionListHeader}>{title}</Text>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'red' }}></View>
          )}
          ListEmptyComponent={() => (<Text>No datas</Text>)}
          ListHeaderComponent={() => (<Text style={{ fontSize: 40 }}>SectionList Title</Text>)}
          ListFooterComponent={() => (<Text style={{ fontSize: 25 }}>SectionList Footer</Text>)}
        // can't be used in <ScrollView>
        // refreshing={false}
        // onRefresh={() => Alert.alert('dropdown refresh')}
        // onEndReachedThreshold={0.1}
        // onEndReached={() => Alert.alert('Tips', 'End.')}
        />

        <Text style={styles.commonTitleText}>FlatList</Text>
        <FlatList
          data={FLAT_LIST_DATA}
          keyExtractor={item => item.id + item.title}
          renderItem={renderItem}
          horizontal={false}  // horizontal layout
          initialScrollIndex={1}  // make any item in top 
          initialNumToRender={3}  // render first four items and then render others
          numColumns={2}  // assign columns, the same height, not waterfall
          inverted={true} // list reverse include ListHeader and ListFooter
          extraData={selectedId}  // 

          ItemSeparatorComponent={() => (
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'red' }}></View>
          )}
          ListEmptyComponent={() => (<Text>No datas!!</Text>)}
          ListHeaderComponent={() => (<Text style={{ fontSize: 40 }}>FlatList Title</Text>)}
          ListFooterComponent={() => (<Text style={{ fontSize: 25 }}>FlatList Footer</Text>)}
        // can't be used in <ScrollView>
        // refreshing={false}
        // onRefresh={() => Alert.alert('dropdown refresh')}
        // onEndReachedThreshold={0.1}
        // onEndReached={() => Alert.alert('Tips', 'End.')}
        ></FlatList>
      </View>
    </View>
  )
}
export default NewsScreen;
