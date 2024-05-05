import { ScrollView, Text, TouchableOpacity, View, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField';
import { createPostFields } from '@/shared/constants';
import { Video, ResizeMode } from 'expo-av';
import { router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import CutomizableButton from '@/components/CutomizableButton';

import * as ImagePicker from 'expo-image-picker';

import { createPost } from '@/lib/postcrud';
import { useGlobalContext } from '@/context/GlobalContext';

const CreatePost = () => {
  const { user } = useGlobalContext()

  const [aiGenerated, setAiGenerated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formFields, setFormFields] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  });

  const handleChange = (value, field) => {
    setFormFields(prevState =>(
      {
        ...prevState,
        [field]: value
      }
    ))
  }

  const openFilePicker = async (filetype) => {
    const file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ((type) => {
          if(type === 'image') {
            return ImagePicker.MediaTypeOptions.Images
          }
          else {
            return ImagePicker.MediaTypeOptions.Videos
          }
        }
      )(filetype),
      quality: 1,
    })

    if(!file.canceled) {
      handleChange(file.assets[0], filetype === 'image' ? 'thumbnail' : filetype);
    }
  }

  const submitForm = async () => {
    if(
      !formFields.title || !formFields.video || !formFields.thumbnail ||
      (aiGenerated && !formFields.prompt)
    ) {
      Alert.alert('Empty Fields', 'All required fields must be filled with values!');
      return;
    }

    setSubmitting(true);

    try {
      await createPost(formFields, user.$id)
      setFormFields({});
      
      router.push('/home');
      Alert.alert('Success', 'Post has been created');
    }
    catch(error) {
      Alert.alert('Error', error.message);
    }
    finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    //If 'AI Generated?' checkbox is not checked.
    if(!aiGenerated) {
      handleChange('', 'prompt');
    }
  },[aiGenerated]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView className="flex-1">
        <View className="w-full flex flex-col p-4">
          <Text className="text-2xl font-semibold">
            Create Post
          </Text>
          {
            createPostFields.map((item) => {
              if(item.stateField === 'video') {
                return (
                  <View className="gap-2 mt-2" key={item.label}>
                    <Text className="text-xl">Upload Video</Text>

                    <TouchableOpacity onPress={() => openFilePicker('video')}>
                      {
                        formFields.video ? (
                          <Video 
                            source={{ uri: formFields.video.uri }}
                            resizeMode={ResizeMode.COVER}
                            isLooping
                            useNativeControls
                            className="w-full h-64 rounded-xl"
                          />
                        ) : 
                        (
                          <View className="w-full py-4 bg-gray-300 items-center justify-center rounded-xl">
                            <View 
                              className="w-fit items-center justify-center p-2 border-2 border-dashed
                              border-yellow-500"
                            >
                              <Entypo name="upload" size={34} color="black" />
                              <Text>Select Video</Text>
                            </View>
                          </View>
                        )
                      }
                    </TouchableOpacity>
                  </View>
                )
              }
              else if(item.stateField === 'thumbnail') {
                return <View className="gap-2 mt-2" key={item.label}>
                  <Text className="text-xl">Upload Thumbnail</Text>

                  <TouchableOpacity onPress={() => openFilePicker('image')}>
                    {
                      formFields.thumbnail ? (
                        <Image 
                          source={{ uri: formFields.thumbnail.uri }}
                          resizeMode='cover'
                          className="w-full h-44 rounded-xl"
                        />
                      ) : 
                      (
                        <View className="w-full py-4 bg-gray-300 items-center justify-center rounded-xl">
                          <View 
                            className="w-fit items-center justify-center p-2 border-2 border-dashed
                            border-yellow-500"
                          >
                            <Entypo name="upload" size={34} color="black" />
                            <Text>Select Image</Text>
                          </View>
                        </View>
                      )
                    }
                  </TouchableOpacity>
                </View>
              }
              else if(item.stateField === 'prompt') {
                return (
                  <View key={item.label}>
                    <FormField
                      className="mt-2"
                      label={item.label}
                      placeholder={item.placeholder}
                      value={formFields[item.stateField]}
                      handleChange={(e) => handleChange(e, item.stateField)}
                      passField={item.passField}
                      disabled={aiGenerated}
                    />
                    <View 
                      className="flex flex-row gap-1 mt-1"
                    >
                      <Checkbox 
                        value={aiGenerated}
                        onValueChange={setAiGenerated}
                      />
                      <Text>AI Generated?</Text>
                    </View>
                    
                  </View>
                )
              }
              else {
                return (
                  <FormField
                    key={item.label}
                    label={item.label}
                    placeholder={item.placeholder}
                    value={formFields[item.stateField]}
                    handleChange={(e) => handleChange(e, item.stateField)}
                    passField={item.passField}
                  />
                )
              }
            })
          }

          <CutomizableButton 
            title="Create & Publish Post"
            handlePress={submitForm}
            loading={submitting}
            containerStyles="w-full p-4 bg-yellow-500 rounded-xl mt-4"
            textStyles="text-md text-center"
          />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreatePost