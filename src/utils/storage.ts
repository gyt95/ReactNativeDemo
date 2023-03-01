import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  /**
   * add data
   * @param {string} key 
   * @param {any} value 
   * @returns {Promise}
   */
  static set(key: string, value: any){
    return AsyncStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * get data
   * @param {string} key 
   * @returns {Promise}
   */
  static async get(key: string){
    const value = await AsyncStorage.getItem(key)
    if(value && value !== ''){
      const jsonValue = JSON.parse(value)
      return jsonValue
    }
    return null
  }

  /**
   * update data
   * @param {string} key 
   * @param {any} newValue 
   * @returns {Promise}
   */
  static async update(key: string, newValue: any){
    const oldValue = await AsyncStorage.getItem(key)
    newValue = typeof newValue === 'string' ? newValue : Object.assign({}, oldValue, newValue)
    return AsyncStorage.setItem(key, JSON.stringify(newValue))
  }

  /**
   * 
   * @param {string} key 
   * @returns {Promise}
   */
  static delete(key: string){
    return AsyncStorage.removeItem(key)
  }

  /**
   * 
   * @returns {Promise}
   */
  static clear(){
    return AsyncStorage.clear()
  }
}

export default Storage