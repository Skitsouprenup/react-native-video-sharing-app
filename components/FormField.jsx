import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'

const FormField = ({label, placeholder, value, handleChange, passField, disabled = true}) => {
  const [showPass, setShowPass] = useState(passField);

  useEffect(() => {
    setShowPass(passField);
  }, []);
  return (
    <View className="w-full flex flex-col gap-2 mt-2">
      <Text className="text-xl">{label}</Text>

      <View className="flex flex-row w-full bg-gray-300 p-2 rounded-xl focus:border focus:border-yellow-500">
        <TextInput 
          className="flex-1 text-xl"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChange}
          secureTextEntry={showPass}
          editable={disabled}
        />

        {
          passField && 
          <TouchableOpacity
            onPress={() => setShowPass(!showPass)}
          >
            <Entypo name={showPass ? 'eye' : 'eye-with-line'} size={34} color="black" />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default FormField