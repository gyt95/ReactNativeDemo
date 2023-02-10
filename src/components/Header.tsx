import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  Header: {
    color: '#0d6efd',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 40,
  },
});

export default function Header(): JSX.Element {
  return (
    <View>
      <Text style={styles.Header}>Todo List</Text>
    </View>
  );
}
