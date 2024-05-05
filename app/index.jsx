import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';
import { Redirect, router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CutomizableButton from '@/components/CutomizableButton';
import { useGlobalContext } from '@/context/GlobalContext';

const index = () => {
  const { user, userLoading } = useGlobalContext();

  if(!userLoading && user) {
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%'
        }}
      >
        {
          userLoading ?
          (
            <View className="w-full h-full items-center justify-center px-8 gap-2">
              <Text className="text-xl">Loading...</Text>
            </View>
          ) :
          (
            <View 
              className="w-full h-full items-center justify-center px-8 gap-2"
            >
              <Text className="font-semibold text-4xl">VidSharing</Text>

              <View className="w-full">
                <Image 
                  source={require('@/assets/cartoon-video-recorder.png')}
                  className='w-full h-[300px]'
                  resizeMode='contain'
                />
              </View>

              <Text className="text-xl text-center">
                Share your videos with{' '}
                <Text className="italic text-xl">VidSharing</Text> 
              </Text>

              <Text className="text-md text-stone-400 text-center">
                Explore our app and experience a nice and secure 
                way to store and share videos!
              </Text>

              <CutomizableButton 
                title="Continue with Email"
                handlePress={() => router.push('/signin')}
                loading={false}
                containerStyles="w-full p-4 bg-yellow-500 rounded-xl mt-4"
                textStyles="text-md text-center"
              />
            </View>
          )
        }
      </ScrollView>

    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})