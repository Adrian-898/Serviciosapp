import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				tabBarHideOnKeyboard: true,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='Home'
				options={{
					headerShown: false,
					title: 'Inicio',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='QRScanner'
				options={{
					title: 'QR',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'camera' : 'camera-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='Map'
				options={{
					title: 'Ubicación',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'location' : 'location-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='User'
				options={{
					title: 'Usuario',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'person' : 'person-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
