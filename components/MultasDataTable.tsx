import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import { useLocalSearchParams } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { DataTable } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import getErrorMessage from '../utils/getErrorMessage';
import axios from 'axios';
import LoadingState from '@/components/LoadingState';

// tipo de dato User de prueba
type User = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
};

const MultasDataTable = () => {
	// Configuracion del componente DataTable
	const [page, setPage] = useState<number>(0);
	const [numberOfItemsPerPageList] = useState([1, 2, 5, 10]);
	const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

	// hook para acceder al estado enviado desde el componente padre (Multas.tsx)
	const params = useLocalSearchParams();

	// guarda los datos consultados a la API
	const [data, setData] = useState<User[] | null>(null);
	const [loading, setLoading] = useState(true);

	// Estado de la orientacion de la pantalla
	const [orientation, setOrientation] = useState(0);

	useEffect(() => {
		let subscription: any;

		const init = async () => {
			// 1. First unlock any previous locks
			await ScreenOrientation.unlockAsync();

			// 2. Get initial orientation
			const initial = await ScreenOrientation.getOrientationAsync();
			setOrientation(initial);

			// 3. Add orientation listener
			subscription = ScreenOrientation.addOrientationChangeListener((e) => {
				setOrientation(e.orientationInfo.orientation);
			});
		};

		init();

		return () => {
			// Cleanup: Remove listener and reset to default
			if (subscription) subscription.remove();

			// Lock to your app's default orientation (usually portrait)
			ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
		};
	}, []);

	useEffect(() => {
		// GET a la API para obtener los datos...
		const listUsers = async () => {
			try {
				setLoading(true);
				// consulta de prueba
				const response = await axios.get('https://jsonplaceholder.typicode.com/users');
				setData(response.data);
			} catch (error) {
				console.error('Ha ocurrido un error: ', getErrorMessage(error));
				setData(null);
			} finally {
				setLoading(false);
			}
		};
		listUsers();
	}, []);

	useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);

	if (loading || !data) return <LoadingState />;

	const from = page * itemsPerPage;
	const to = Math.min((page + 1) * itemsPerPage, data.length);

	return (
		<ThemedView style={styles.container}>
			<DataTable>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ThemedView style={styles.header}>
						<ThemedText type='defaultSemiBold'>Multas de: {params.cedula}</ThemedText>
					</ThemedView>

					<DataTable.Header>
						<DataTable.Title style={styles.title}>Descripción</DataTable.Title>
						<DataTable.Title style={styles.title}>Fecha</DataTable.Title>
						<DataTable.Title style={styles.title}>Estatus</DataTable.Title>
						<DataTable.Title style={styles.title}>Pagar</DataTable.Title>
					</DataTable.Header>

					{data.slice(from, to).map((item) => (
						<DataTable.Row key={item.id}>
							<DataTable.Cell style={styles.cell}>{item.name}</DataTable.Cell>
							<DataTable.Cell style={styles.cell}>{item.phone}</DataTable.Cell>
							<DataTable.Cell style={styles.cell}>{item.id}</DataTable.Cell>
							<DataTable.Cell style={styles.cell}>
								<IconButton
									mode='contained'
									size={30}
									icon='receipt'
									rippleColor='#001f7e'
									onPress={() => console.log('Pagar')}
								/>
							</DataTable.Cell>
						</DataTable.Row>
					))}

					<DataTable.Pagination
						theme={{
							roundness: 5,
						}}
						page={page}
						numberOfPages={Math.ceil(data.length / itemsPerPage)}
						onPageChange={(page) => setPage(page)}
						label={`${from + 1}-${to} de ${data.length}`}
						numberOfItemsPerPageList={numberOfItemsPerPageList}
						numberOfItemsPerPage={itemsPerPage}
						onItemsPerPageChange={onItemsPerPageChange}
						showFastPaginationControls
						selectPageDropdownLabel={'Filas por página'}
						selectPageDropdownRippleColor={'#001f7e'}
						paginationControlRippleColor={'#001f7e'}
						dropdownItemRippleColor={'#001f7e'}
						collapsable={false}
						style={styles.pagination}
					/>
				</ScrollView>
			</DataTable>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
		paddingHorizontal: 20,
		alignItems: 'center',
	},
	header: {
		alignSelf: 'center',
		padding: 5,
	},
	title: {
		justifyContent: 'center',
	},
	cell: {
		justifyContent: 'center',
	},
	pagination: { alignSelf: 'center' },
});

export default MultasDataTable;
