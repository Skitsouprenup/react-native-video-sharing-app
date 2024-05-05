import { View, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import SearchInput from '@/components/SearchInput'
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';
import { animatable } from '@/shared/animconst';
import { Video, ResizeMode } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';

const TrendingItem = ({ activeItemId, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      animation={
        activeItemId === item.$id 
        ? animatable.zoomIn 
        : animatable.zoomOut
      }
      duration={500}
    >
      {
        play ? (
          <Video
            className="w-52 h-72 rounded-2xl bg-white/10"
            source={{ uri: item.video }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if(status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            className="w-52 h-72 my-2 rounded-2xl overflow-hidden"
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              className="relative w-full h-full shadow-lg shadow-black/30"
              resizeMode='cover'
              source={{ uri: item.thumbnail }}
            />

            <View className="absolute w-full h-full items-center justify-center">
              <AntDesign name="playcircleo" size={64} color="yellow" />
            </View>
          </TouchableOpacity>
        )
      }
    </Animatable.View>
  )
}

const HomeHeader = ({latestPosts, username}) => {
  const [activeItemId, setActiveItemId] = 
    useState(latestPosts?.length > 0 ? latestPosts[0].$id : null);

  const viewableItemsChanged = ({ items }) => {
    if(items?.length > 0) {
      setActiveItemId(items[0].key);
    }
  }

  return (
    <View className="p-4">
      <View>
        <Text className="text-2xl">
          Hello {username}!
        </Text>
        <SearchInput />
        <Text className="text-xl">
          Latest Videos
        </Text>

        {/*
          viewAreaCoveragePercentThreshold determines
          the visibility of an item in flatlist in percent.
          If the selected item is not visible at the specified percent,
          onViewableItemsChanged will be triggered.
          
          contentOffset intially moves the flatlist scroll to
          specified coordinates
        */}
        <FlatList 
          data={latestPosts}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <TrendingItem 
              activeItemId={activeItemId} 
              item={item}
            />
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityviewabilityConfig={{
            viewAreaCoveragePercentThreshold: 75
          }}
          contentOffset={{ x: 175 }}
          horizontal
        />

      </View>
    </View>
  )
}

export default HomeHeader