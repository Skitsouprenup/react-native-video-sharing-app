import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalContext'
import useAppwrite from '@/lib/hooks/useAppwrite'
import { getUserPosts } from '@/lib/postcrud'
import VideoCard from '@/components/VideoCard'

import { SafeAreaView } from 'react-native-safe-area-context';

import { AntDesign } from '@expo/vector-icons'
import { signOut } from '@/lib/usercrud'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setCurrentUser } = useGlobalContext();
  const { posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setCurrentUser('logout');
    router.replace('/signin');
  }

  return (
    <SafeAreaView 
      className="flex-1"
    >
      <View className="flex-1">
        <FlatList
          className="flex-1 h-full"
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <VideoCard 
              video={
                {
                  title: item.title,
                  thumbnail: item.thumbnail,
                  video: item.video,
                  prompt: item?.prompt,
                  creator: item.creator
                }
              } 
            />
          )}
          ListHeaderComponent={() => (
            <View className="p-4">
              <View className="items-end">
                <TouchableOpacity
                  onPress={logout}
                >
                  <AntDesign name="logout" size={34} color="tomato" />
                </TouchableOpacity>
              </View>

              <View className="mt-4">
                <View className="justify-center items-center">
                  <View className="w-fit h-fit border border-yellow-500 rounded-xl overflow-hidden">
                    <Image 
                      className="w-16 h-16"
                      resizeMode='contain'
                      source={{ uri: user?.avatar }}
                    />
                  </View>
                  <Text className="text-2xl">
                    {user?.username}
                  </Text>
                </View>

                <View className="justify-center items-center mt-2">
                  <Text className="text-xl">
                    {posts?.length}
                  </Text>
                  <Text className="text-lg text-stone-500 -mt-2">
                    {posts?.length > 1 ? 'Posts' : 'Post'}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 flex justify-center items-center px-4">
              <Text className="text-2xl">
                No Videos Found
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile