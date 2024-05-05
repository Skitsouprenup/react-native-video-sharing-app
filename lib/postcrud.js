import { appwriteConfig } from '@/lib/appwriteConfig';
import { databases } from '@/lib/appwrite';

import { Query } from 'react-native-appwrite';

export const createPost = async (formFields, userId) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(formFields.thumbnail, 'image'),
      uploadFile(formFields.video, 'video')
    ])

    const post = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(), 
      {
        title: formFields.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: formFields.prompt,
        creator: userId
      }
    )

    return post;
  }
  catch(error) {
    console.error(error);
    throw new Error('Something went wrong in the process of creating post.');
  }
}

export const getAllPosts = async () => {
  //console.log('getAllPosts');
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
    )
    return posts.documents;
  }
  catch(error) {
    console.log('Error in getAllPosts function');
    console.log(error);
    //throw new Error('Something went wrong while getting posts.');
  }
}

// Get video posts created by user
export const getUserPosts = async (userId) => {
  //console.log('getUserPosts');
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    console.log('Error in getUserPosts function');
    console.log(error);
    //throw new Error(error);
  }
}

// Get latest created video posts
export const getLatestPosts = async () => {
  //console.log('getLatestPosts');
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );

    return posts.documents;
  } catch (error) {
    console.log('Error in getAllPosts function');
    console.log(error);
    //throw new Error(error);
  }
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query), Query.orderDesc("$createdAt")]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}