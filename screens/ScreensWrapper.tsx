import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { NavigationContainer } from "@react-navigation/native";
import ActiveTraining from "./ActiveTraining";
import PassiveTraining from "./PassiveTraining";
import SettingsScreen from "./SettingsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackPrams";
import 'react-native-gesture-handler';

export default function ScreensWrapper() {
    const Stack = createStackNavigator<RootStackParamList>();
    const { settings } = useContext(SettingsContext)

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={settings.trainingMode === 'active' ? 'ActiveTraining' : 'PassiveTraining'}
                screenOptions={{
                    gestureEnabled: false,
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='Settings'
                    component={SettingsScreen}
                />
                <Stack.Screen
                    name='ActiveTraining'
                    component={ActiveTraining}
                    options={{
                        animationEnabled: false,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name='PassiveTraining'
                    component={PassiveTraining}
                    options={{
                        animationEnabled: false,
                        gestureEnabled: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>)
}