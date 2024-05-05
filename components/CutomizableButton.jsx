import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CutomizableButton = (
  {
    title, 
    containerStyles,
    textStyles,
    handlePress, 
    loading
  }
) => {

  /*
    activeOpacity determines the opacity of the component
    when users click on it.
  */
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${containerStyles} ${loading ? 'bg-stone-300 opacity-50' : ''}`}
      disabled={loading}
    >
      <Text className={textStyles}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CutomizableButton