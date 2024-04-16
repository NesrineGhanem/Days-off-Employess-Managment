import React, { createContext, useState, useEffect, useContext } from 'react';
import { isAuthenticated} from "./action"

export const AuthContext = createContext(null);

const AuthUserContext = () => {
	const userContext = useContext(AuthContext);
	if(!AuthContext) throw new Error('AuthUserContext must be used within a AuthProvider');
	return userContext;
}
export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [logged,setLogged] = useState(false);
  const [user,setUser] = useState(undefined);


  useEffect(() => {
		const checkLoggedIn = async () => {
			let user = isAuthenticated();
			if (user === null) {
				localStorage.setItem('user', '');
				user = '';
			}

			setUser(user);
		};

		checkLoggedIn();
	}, []);
  return (
    <AuthContext.Provider value={{ email, setEmail, password, setPassword,confirmPassword, setConfirmPassword , logged, 
    setLogged, user, setUser  }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthUserContext};
export default AuthProvider;