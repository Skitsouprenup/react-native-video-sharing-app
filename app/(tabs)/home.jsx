import { Text, FlatList, RefreshControl, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '@/components/home/HomeHeader'
import { getAllPosts, getLatestPosts } from '@/lib/postcrud'
import useAppwrite from '@/lib/hooks/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalContext'

const Home = () => {
  const { user } = useGlobalContext();
  const { posts, fetchData } = useAppwrite(getAllPosts);
  const { posts: latestPosts } = useAppwrite(getLatestPosts);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    setRefresh(true);
    await fetchData();
    setRefresh(false);
  }

  return (
    <SafeAreaView>
      <FlatList 
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
          <HomeHeader 
            latestPosts={latestPosts}
            username={user?.username}
          />
        )}
        ListEmptyComponent={() => (
          <View className="w-full h-full text-xl items-center justify-center">
            <Text className="text-xl">
              No Videos Found
            </Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home