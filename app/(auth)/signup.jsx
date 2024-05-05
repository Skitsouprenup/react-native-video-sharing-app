import { View, Text, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { registerFields } from '@/shared/constants';
import CutomizableButton from '@/components/CutomizableButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/usercrud';
import { useGlobalContext } from '@/context/GlobalContext';

const SignUp = () => {
  const { setCurrentUser } = useGlobalContext();

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const submitForm = async () => {
    if(!formFields.username || !formFields.email || !formFields.password) {
      Alert.alert('Empty Fields', 'All fields must be filled with values!');
      return;
    }

    setSubmitting(true);
    
    try {
      await createUser(formFields.email, formFields.password, formFields.username);
      await setCurrentUser();
      router.replace('/home');
    }
    catch(error) {
      Alert.alert('Error', error.message);
    }
    finally {
      setSubmitting(false);
    }
    
  }

  const handleChange = (value, field) => {
    setFormFields(prevState =>(
      {
        ...prevState,
        [field]: value
      }
    ))
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%'
        }}
      >
        <View 
          className="w-full h-full justify-center px-8"
        >
          <View className="w-full">
            <Text className="font-semibold text-xl">Sign Up with VidSharing</Text>
          </View>

          <View className="w-full flex flex-col">
            {
              registerFields.map((item) => (
                <FormField
                  key={item.label}
                  label={item.label}
                  placeholder={item.placeholder}
                  value={formFields[item.stateField]}
                  handleChange={(e) => handleChange(e, item.stateField)}
                  passField={item.passField}
                />
              ))
            }
          </View>
          
          <CutomizableButton 
            title="Sign Up"
            handlePress={submitForm}
            loading={submitting}
            containerStyles="w-full p-4 bg-yellow-500 rounded-xl mt-4"
            textStyles="text-md text-center"
          />

          <View className="justify-center flex flex-col mt-2">
            <Text className="text-lg">Already have an account? </Text>
            <Link href="/signin" className="text-lg underline">Sign In Here!</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp