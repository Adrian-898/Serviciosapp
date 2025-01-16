import { useState, useCallback } from 'react';
import {
	SafeAreaView,
	useWindowDimensions,
	Text,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import useLocationPermission from '@/hooks/useLocationPermission';
import Constants from 'expo-constants';
import getErrorMessage from '@/utils/getErrorMessage';
import type { Lugar, Region } from '@/utils/types';

// Ubicacion inicial donde se carga el mapa (coordenadas de la guaira), se actualiza al obtener la ubicacion actual
const initialRegion: Region = {
	latitude: 10.597032,
	longitude: -66.930431,
	latitudeDelta: 0.04,
	longitudeDelta: 0.04,
};

// De aqui se obtienen las coordenadas y el nombre de los lugares para crear los Pins en el mapa
const lugares: Lugar[] = [
	{
		id: 0,
		coords: { latitude: 10.598246, longitude: -66.930307 },
		name: 'Lugar 1',
	},
	{
		id: 1,
		coords: { latitude: 10.60062, longitude: -66.922652 },
		name: 'Lugar 2',
	},
];

// componente principal
const Map = () => {
	const colorScheme = useColorScheme();

	// dimensiones del dispositivo
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;

	// hook usado para permisos de ubicacion y geolocalizacion del ususario
	const location = useLocationPermission();

	// destino establecido al que ir, una vez se selecciona un marcador
	const [destination, setDestination] = useState<Lugar | undefined>();
	const [newDestination, setNewDestination] = useState<Lugar | undefined>();

	// estado visual (mostrado o no segun se toque un marcador del mapa) del boton para trazar ruta del usuario a un lugar determinado
	const [drawRouteButton, setDrawRouteButton] = useState(false);

	// estado de trazado de ruta del usuario a un lugar determinado (activo o no)
	const [drawRoute, setDrawRoute] = useState(false);

	// boton para trazar rutas
	const DrawRouteButton = () => {
		return (
			<TouchableOpacity
				style={styles.button}
				onPress={DrawRouteButtonPress}
			>
				<Text style={styles.buttonText}>
					Mostrar el camino a {newDestination?.name}
				</Text>
			</TouchableOpacity>
		);
	};

	// al presionar el boton para trazar rutas
	const DrawRouteButtonPress = () => {
		setDrawRouteButton(false);
		if (destination !== newDestination) {
			setDestination(newDestination);
			setDrawRoute(true);
		} else {
			console.log('Ya existe esta ruta en el mapa...');
		}
	};

	// al presionar un marcador
	const MarkerPress = (lugar: Lugar) => {
		if (!destination || destination.id !== lugar.id) {
			setNewDestination(lugar);
			setDrawRouteButton(true);
		}
	};

	// componente Pin en el mapa
	const MarkerComponent = useCallback(
		({ lugar }: { lugar: Lugar }) => (
			<Marker
				coordinate={{
					latitude: lugar.coords.latitude,
					longitude: lugar.coords.longitude,
				}}
				pinColor='red'
				tracksViewChanges={false}
				onSelect={() => MarkerPress(lugar)}
				onDeselect={() => setDrawRouteButton(false)}
			>
				<Callout>
					<Text
						style={{
							alignSelf: 'center',
							color: 'black',
							fontStyle: 'normal',
						}}
					>
						{lugar.name}
					</Text>
				</Callout>
			</Marker>
		),
		[lugares],
	);

	// Mensaje de alerta cuando no hay permisos de uso de ubicacion
	const Alerta = () => {
		return (
			<ThemedView
				style={
					colorScheme === 'light'
						? styles.alertContainer
						: styles.alertContainerDark
				}
			>
				<Icon
					name='exclamation'
					color={'red'}
					size={80}
					style={styles.alertIcon}
				/>
				<ThemedText
					type='defaultSemiBold'
					style={styles.alertMessage}
					adjustsFontSizeToFit={true}
				>
					Los permisos de ubicación fueron negados, ve a la
					configuración de la App para otorgar los permisos
				</ThemedText>
			</ThemedView>
		);
	};

	// renderiza el mapa y demas componentes
	return (
		<SafeAreaView style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={{ width: windowWidth, height: windowHeight }}
				userLocationUpdateInterval={5000}
				showsUserLocation
				showsMyLocationButton
				loadingEnabled
				toolbarEnabled={false}
				showsPointsOfInterest={false}
				showsIndoors={false}
				showsBuildings={false}
				showsScale={false}
				showsIndoorLevelPicker={false}
				showsTraffic={false}
				mapPadding={{ bottom: 50, left: 0, right: 0, top: 0 }}
				initialRegion={initialRegion}
				region={location.origin}
			>
				{
					// itera el arreglo lugares y renderiza un pin para cada instancia existente
					lugares.map((lugar, index) => (
						<MarkerComponent key={index} lugar={lugar} />
					))
				}
				{
					// Traza la ruta usando la API Directions de google maps (se debe cambiar el manejo de la apikey por seguridad):
					drawRoute && destination && (
						<MapViewDirections
							apikey='AIzaSyB-HqJBWka1qdhm5ZX7p5G1WFfOdoeBrSw'
							origin={location.origin}
							destination={destination.coords}
							mode='WALKING'
							language='es-419'
							region='VE'
							strokeColor='#001f7e'
							optimizeWaypoints={false}
							onError={(error) => {
								console.error(
									'Ha ocurrido un error: ',
									getErrorMessage(error),
								);
							}}
						/>
					)
				}
			</MapView>
			{
				// muestra el boton de trazar ruta:
				drawRouteButton && <DrawRouteButton />
			}
			{
				// muestra un mensaje si no hay permisos de uso de ubicacion:
				!location.permissionGranted && <Alerta />
			}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
	},
	alertContainer: {
		flexDirection: 'row',
		position: 'absolute',
		alignItems: 'center',
		alignSelf: 'center',
		maxWidth: '98%',
		maxHeight: '30%',
		borderRadius: 10,
		bottom: 50,
		paddingRight: 10,
	},
	alertContainerDark: {
		backgroundColor: '#222',
		flexDirection: 'row',
		position: 'absolute',
		alignItems: 'center',
		alignSelf: 'center',
		maxWidth: '98%',
		maxHeight: '30%',
		borderRadius: 10,
		bottom: 50,
		paddingRight: 10,
	},
	button: {
		position: 'absolute',
		backgroundColor: '#001f7e',
		justifyContent: 'center',
		alignSelf: 'center',
		borderColor: '#999',
		padding: 10,
		borderRadius: 10,
		bottom: 60,
		borderWidth: 0.5,
		elevation: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	alertIcon: { margin: 10 },
	alertMessage: { flex: 1 },
});

export default Map;
