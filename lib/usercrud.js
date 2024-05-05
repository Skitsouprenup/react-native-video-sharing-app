import { appwriteConfig } from '@/lib/appwriteConfig';

import { ID, Query } from 'react-native-appwrite';
import { account, databases } from '@/lib/appwrite';

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  }
  catch(error) {
    console.error(error);
    throw new Error('Something went wrong when loggin in.');
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const createUser = async (email, password, username) => {
  try {
    //Create an account for appwrite's auth
    const newAccount = await account.create(ID.unique(), email, password, username);

    if(!newAccount)
      throw new Error('Failed to create an account!');

    //Create a google-like default profile picture.
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    //Register the created account in our database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountid: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser;
  }
  catch(error) {
    console.error(error);
    throw new Error('Something went wrong in the process of creating an account.');
  }
}

const getFilePreview = async (id, type) => {
  let url;

  try {
    if(type === 'video') {
      url = storage.getFileView(appwriteConfig.storageId, id);
    }
    
    if(type === 'image') {
      url = storage.getFilePreview(appwriteConfig.storageId, id, 2000, 2000, 'top', 100);
    }

    if(!url) throw new Error('Invalid File URL!');
  }
  catch(error) {
    throw new Error(error);
  }

  return url;
}

const uploadFile = async (file, type) => {
  if(!file) return;

  /* For DocumentPicker
  const { mimeType, ...others } = file;
  const asset = { type: mimeType, ...others };
  */

  //console.log('file', file)
  //For ImagePicker
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.filesize,
    uri: file.uri
  }
  //console.log('asset', asset)
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    //console.log(uploadedFile);
    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  }
  catch(error) {
    throw new Error(error);
  }
}



export const getCurrentUser = async () => {
  //console.log('getCurrentUser');
  try {
    //get the current session of this user/requester
    const currentAccount = await account.get();

    if(!currentAccount) throw new Error('No user session found!');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      //Check if the account is registered in 'users' database
      [Query.equal('accountid', currentAccount.$id)]
    )

    if(!currentAccount) throw new Error('User not registered in database!');

    return currentUser.documents[0];
  }
  catch(error) {
    console.log(error);
    //throw new Error('Something went wrong while getting current user.');
  }
}