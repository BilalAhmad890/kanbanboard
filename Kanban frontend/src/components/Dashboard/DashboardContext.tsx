import React, { createContext, useContext, useEffect, useState } from 'react';
import { useIsAuthenticated } from '@/lib/isUser'; 

interface DashboardContextType {
    user: any; 
    isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: authData, isLoading } = useIsAuthenticated();
    const [user, setUser] = useState<any>(null);
    
    useEffect(() => {
        if (authData?.isAuthenticated) {
            setUser(authData.user);
        } else {
            setUser(null);
        }
    }, [authData]);

    return (
        <DashboardContext.Provider value={{ user, isLoading }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }
    return context;
};