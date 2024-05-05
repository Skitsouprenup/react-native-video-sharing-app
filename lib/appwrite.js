import { appwriteConfig } from '@/lib/appwriteConfig';

import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
// Init your react-native SDK
const client = new Client();

client
    // Your Appwrite Endpoint
    .setEndpoint(appwriteConfig.endpoint)
    // Your project ID
    .setProject(appwriteConfig.projectId)
    // Your application ID or bundle ID.
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
//Used to create a google-like default profile picture.
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

