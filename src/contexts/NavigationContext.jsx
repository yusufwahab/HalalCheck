import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigation = () => {
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 3000);
  };

  return (
    <NavigationContext.Provider value={{ isNavigating, startNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};