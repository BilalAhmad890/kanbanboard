import React, { createContext, useContext } from 'react';
import { useGetBoardData } from './GetBoardsdata'; // Adjust the import path as necessary
import { BoardContextType } from '@/Types/types';


const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: boards, isLoading, isError, error } = useGetBoardData();

    return (
        <BoardContext.Provider value={{ boards, isLoading, isError, error }}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoardContext = () => {
    const context = useContext(BoardContext);
    if (context === undefined) {
        throw new Error('useBoardContext must be used within a BoardProvider');
    }
    return context;
};