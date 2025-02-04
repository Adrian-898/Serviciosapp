import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { ThemedView } from './ThemedView';

/*
children: componente a remontar
onReconnect: callback opcional (sirve para ejecutar cualquier accion al recuperar la conexion)
(!!! en caso de usar onReconnect SE DEBE DEFINIR dentro de un USECALLBACK en el componente padre para evitar re-renderizados innecesarios !!!)
*/
type NetworkAwareResetProps = {
	children: React.ReactNode;
	onReconnect?: () => void;
};

const NetworkAwareReset = ({ children, onReconnect }: NetworkAwareResetProps) => {
	// el key vuelve a montar el componente (children) cuando el estado de la red pasa a conectado nuevamente
	const [key, setKey] = useState(0);

	// calcula el estado actual de la conexion a internet
	const netInfo = useNetInfo();
	const isOnline = !!netInfo.isInternetReachable && !!netInfo.isConnected;

	useEffect(() => {
		if (isOnline) {
			// al reconectarse se vuelve a montar el componente (children) por el cambio en el valor de key
			setKey((prev) => prev + 1);

			// se ejecuta la funcion onReconnect si se proporciona en el componente padre
			onReconnect?.();
		}
	}, [isOnline, onReconnect]);

	return (
		<ThemedView key={key} style={styles.container}>
			{children}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default NetworkAwareReset;
