import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    prompt,
    creator: {
      username, 
      avatar
    }
  }
}) => {
  const [vidPlaying, setVidPlaying] = useState(false);

  return (
    <View className="w-full px-4 py-2">
      <View className="flex flex-row gap-2 items-center">
        <View>
          <Image 
            className="w-10 h-10 rounded-xl"
            resizeMode='contain'
            source={{ uri: avatar }}
          />
        </View>

        <View
          className="flex-1"
        >
          <Text
            className="text-lg"
          >
            {title}
          </Text>

          <Text
            className="text-md text-stone-500"
          >
            {username}
          </Text>
        </View>

        <View>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </View>
      </View>

      <View className="mt-2">
        {
          prompt && (
            <View className="flex flex-row items-center mb-1">
              <Text 
                className="font-semibold"
              >
                  AI Prompt:&nbsp;
              </Text>
              <Text>{prompt}</Text>
            </View>
          )
        }
        {
          vidPlaying ? (
            <Video
              className="w-full h-64 rounded-xl"
              source={{ uri: video }}
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
              onPress={() => setVidPlaying(true)}
              className="w-full h-64 relative"
            >
              <Image 
                className="w-full h-full rounded-xl"
                resizeMode='cover'
                source={{ uri: thumbnail }}
              />

              <View className="absolute w-full h-full items-center justify-center">
                <AntDesign name="playcircleo" size={64} color="yellow" />
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

export default VideoCard