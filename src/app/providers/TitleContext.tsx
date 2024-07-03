'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

const TitleContext = createContext<TitleContextType | undefined>(undefined);

interface TitleProviderProps {
  children: ReactNode;
}

export const TitleProvider: React.FC<TitleProviderProps> = ({ children }) => {
  const [title, setTitle] = useState('Title');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useTitle = (): TitleContextType => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error('useTitle must be used within a TitleProvider');
  }
  return context;
};
