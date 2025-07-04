import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Image, ImageBackground, View } from 'react-native'
// import { Image, ImageBackground } from 'expo-image'
import { Tabs } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'

const TabIcons = ({focused, icon, title} : any)=>{
    if(focused){
            return (
        <ImageBackground 
                source={images.highlight} 
                className="flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
                    <Image source={icon} tintColor="#151312" className='text-5xl'/>
                    <Text className='text-secondary text-base font-semibold ml-2' >{title}</Text>
                     
        </ImageBackground>
    )
    }
    return(
        <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source={icon} tintColor='#A8D5DB' className='size-5' />
        </View>
    )

}

const _layout = () => {
  return (
    <Tabs 
    screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle:{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        tabBarStyle: {
            backgroundColor: '#221f3d',
            borderRadius: 50,
            marginHorizontal:10,
            marginBottom: 36,
            height:52,
            position: 'absolute',
            borderWidth: 1,
            borderColor: '0f0D23',
        }
    }}
    >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcons focused={focused} icon={icons.home} title="Home"/>
            )
            
          }}
          />
        <Tabs.Screen 
        name='search'
        options={{
          title: 'Search',
          
          headerShown: false,
          tabBarIcon: ({focused}) => (
                <TabIcons focused={focused} icon={icons.search} title="Search"/>
            )
        }}
        />
        <Tabs.Screen 
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({focused}) => (
                <TabIcons focused={focused} icon={icons.save} title="Saved"/>
            ),
          headerShown: false
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => (
                <TabIcons focused={focused} icon={icons.person} title="Profile"/>
            ),
          headerShown: false
        }}
        />

    </Tabs>
  )
}

export default _layout

