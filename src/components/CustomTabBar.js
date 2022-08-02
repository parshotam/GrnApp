import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Paragraph, IconButton} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
function CustomTabBar({state, descriptors, navigation, setActiveTab}) {
  return (
    <View style={styles.TabBarMainContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isdisable = (route.name == 'Year')
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onLayout = () => {
          console.log('route.name = ',route.name)
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          setActiveTab(route.name);

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            // disabled={isdisable}
            onIndexChange={onLayout}
            style={isFocused ? styles.focus_button : styles.button}
          >
            <Paragraph style={isFocused ? styles.focus_textStyle : styles.TextStyle}>
              {' '}
              {label}{' '}
            </Paragraph>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  TabBarMainContainer: {
    justifyContent: 'space-around',
    height: 50,
    flexDirection: 'row',
    width: '100%',
  },

  button: {
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    justifyContent: 'center',
    fontFamily: 'Flame-Regular',
    alignItems: 'center',
    flexGrow: 1,
  },
  buttonnew: {
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    justifyContent: 'center',
    fontFamily: 'Flame-Regular',
    alignItems: 'center',
    flexGrow: 1,
  },

  focus_button: {
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    borderRightWidth: 1,
    borderRightColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#e70',
    backgroundColor: '#fff',
    color:'#ff882e',
    justifyContent: 'center',
    fontFamily: 'Avenir',
    alignItems: 'center',
    flexGrow: 1,
  },

  TextStyle: {
    color: '#8c8782',
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: 'bold',
  },

  focus_textStyle: {
    color: '#ff882e',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default CustomTabBar;
