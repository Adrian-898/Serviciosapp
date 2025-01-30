import { createContext, useContext, useState } from 'react';
import { authContextProps } from '../utils/types';

const AuthContext = createContext<authContextProps>({
	user: null,
	setUser: () => {},
});

const useAuthContext = () => {
	return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<{} | null>(null);

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, useAuthContext };
