import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';

const SearchInput = () => {
  const pathname = usePathname();
  const [query, setQuery] = useState();

  return (
    <View className="w-full flex flex-col py-2">

      <View className="flex flex-row w-full bg-gray-300 p-2 rounded-xl focus:border focus:border-yellow-500">
        <TextInput 
          className="flex-1 text-xl"
          value={query}
          placeholder="Search Posts..."
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          onPress={() => {
            if(!query) {
              return Alert.alert('Empty Search', 'Please fill-up the search field.');
            }

            //Create query string
            if(pathname.startsWith('/search')) {
              router.setParams({query});
            }
            //search
            else router.push(`/search/${query}`);
          }}
        >
          <AntDesign name="search1" size={34} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchInput