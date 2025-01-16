// objeto para almacenar informacion de los lugares que se quiere marcar en el mapa
export type Lugar = {
	id: number;
	coords: { latitude: number; longitude: number };
	name: string;
};

// para manejar informacion de la region (Parametros LatLng & Region de componente MapView) se usa en los atributos InitialRegion y Region de MapView
export type Region = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

// Credenciales de inicio de sesion
export type LoginCredentials = {
	email: string;
	password: string;
};

export type RequestLogin = LoginCredentials & {
	device_name: string | unknown;
};

// Credenciales de Registro de usuario
export type RegisterCredentials = {
	email: string;
	password: string;
	confirmPassword: string;
};

export type RequestRegister = RegisterCredentials & {
	device_name: string | unknown;
};
