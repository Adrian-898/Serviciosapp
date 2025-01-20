import { createContext } from 'react';
import { authContextProps } from '../utils/types';

export default createContext<authContextProps>({
	user: null,
	setUser: null,
});
