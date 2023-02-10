import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TodoItemType} from '../types';

interface TodoItemProps {
  data: TodoItemType;
  finish: (item: TodoItemType) => void;
  update: (text: string, item: TodoItemType) => void;
  remove: (item: TodoItemType) => void;
}

export default function TodoItem(props: TodoItemProps): JSX.Element {
  const {data} = props;
  return (
    <View key={data.id} style={styles.todoItemWrapper}>
      <TouchableOpacity
        style={styles.todoItemCheckbox}
        onPress={() => props.finish(data)}>
        {data.isDeleted && <Text style={{color: '#409EFF'}}>✔</Text>}
      </TouchableOpacity>

      {data.isDeleted ? (
        <Text
          style={[
            styles.todoItemText,
            {
              textDecorationLine: 'line-through',
            },
          ]}>
          {data.value}
        </Text>
      ) : (
        <TextInput
          style={styles.todoItemText}
          value={data.value}
          onChangeText={text => props.update(text, data)}
        />
      )}

      <TouchableOpacity onPress={() => props.remove(data)}>
        <Text
          style={{
            fontSize: 22,
            color: '#949494',
          }}>
          ×
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItemWrapper: {
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  todoItemCheckbox: {
    borderWidth: 1,
    borderColor: '#409EFF',
    width: 20,
    height: 20,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItemText: {
    flex: 1,
    padding: 0,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
});
