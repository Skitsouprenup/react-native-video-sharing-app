import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

/*
'name' property must be equal to file name in one of the
tabs component in (tabs)
*/
export const tabs = [
  {
    name: 'home',
    title: 'Home',
    icon: <Entypo name="home" size={24} color='black' />,
  },
  {
    name: 'create',
    title: 'Create',
    icon: <Entypo name="new-message" size={24} color="black" />,
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: <AntDesign name="profile" size={24} color="black" />,
  },
];

export const loginFields = [
  {
    stateField: 'email',
    label: "Email",
    placeholder: "Email Address",
    passField: false
  },
  {
    stateField: 'password',
    label: "Password",
    placeholder: "Password",
    passField: true
  }
];

export const registerFields = [
  {
    stateField: 'username',
    label: "Username",
    placeholder: "Username",
    passField: false
  },
  {
    stateField: 'email',
    label: "Email",
    placeholder: "Email Address",
    passField: false
  },
  {
    stateField: 'password',
    label: "Password",
    placeholder: "Password",
    passField: true
  }
];

export const createPostFields = [
  {
    stateField: 'title',
    label: "Title",
    placeholder: "",
    passField: false
  },
  {
    stateField: 'video',
    label: "Video",
    placeholder: "",
    passField: false
  },
  {
    stateField: 'thumbnail',
    label: "Thumbnail",
    placeholder: "",
    passField: false
  },
  {
    stateField: 'prompt',
    label: "AI Prompt",
    placeholder: "",
    passField: false
  }
]
