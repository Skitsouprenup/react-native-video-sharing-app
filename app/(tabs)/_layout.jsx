import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { tabs } from '@/shared/constants.jsx';

const TabIcon = ({icon, focused, name}) => {

  return (
    <View className="items-center justify-center mt-2">
      {icon}
      <Text
        className={`${ focused ? 'font-semibold' : 'font-normal'}`}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false
        }}
      >
        {
          tabs.map((item) => (
            <Tabs.Screen
              key={item.name} 
              name={item.name}
              options={{
                title: `${item.title}`,
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIcon 
                    icon={item.icon}
                    focused={focused}
                    name={item.name}
                  />
                )
              }} 
            />
          ))
        }
      </Tabs>
    </>
  )
}

export default TabsLayout