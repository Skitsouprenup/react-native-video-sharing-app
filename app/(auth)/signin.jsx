import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { loginFields } from '@/shared/constants';
import CutomizableButton from '@/components/CutomizableButton';
import { Link, router } from 'expo-router';
import { signIn } from '@/lib/usercrud';
import { useGlobalContext } from '@/context/GlobalContext';

const Signin = () => {
  const { setCurrentUser } = useGlobalContext();

  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const submitForm = async () => {
    if(!formFields.email || !formFields.password) {
      Alert.alert('Empty Fields', 'All fields must be filled with values!');
      return;
    }

    setSubmitting(true);
    
    try {
      await signIn(formFields.email, formFields.password, formFields.username);
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
    //console.log('field', field)
    setFormFields({
      ...formFields,
      [field]: value
    })
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
            <Text className="font-semibold text-xl">Sign in with VidSharing</Text>
          </View>

          <View className="w-full flex flex-col">
            {
              loginFields.map((item) => (
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
            title="Sign In"
            handlePress={submitForm}
            loading={submitting}
            containerStyles="w-full p-4 bg-yellow-500 rounded-xl mt-4"
            textStyles="text-md text-center"
          />

          <View className="justify-center flex flex-col mt-2">
            <Text className="text-lg">Don't Have an account? </Text>
            <Link href="/signup" className="text-lg underline">Sign Up Here!</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin