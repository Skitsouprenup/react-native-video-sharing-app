import { useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchInput from '@/components/SearchInput';
import { searchPosts } from '@/lib/postcrud';
import useAppwrite from '@/lib/hooks/useAppwrite';
import { useEffect } from 'react';
import VideoCard from '@/components/VideoCard'

const Search = () => {
  //get query param
  const { query } = useLocalSearchParams();

  const { posts, fetchData } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    fetchData();
  },[query]);

  return (
    <SafeAreaView 
      className="flex-1"
    >
      <View className="flex-1">
        <FlatList
          className="flex-1 h-full border border-blue-500"
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <VideoCard 
              video={
                {
                  title: item.title,
                  thumbnail: item.thumbnail,
                  video: item.video,
                  creator: item.creator
                }
              } 
            />
          )}
          ListHeaderComponent={() => (
            <View className="p-4">
              <Text 
                className="text-2xl"
              >
                Search for {`'${query}'`}
              </Text>

              <SearchInput />
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

export default Search