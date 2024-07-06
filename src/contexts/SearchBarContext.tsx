import React, { createContext, useRef, useContext, useState } from 'react';

// Define the type for the context
interface SearchBarContextType {
    searchInputRef: React.RefObject<HTMLInputElement>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with the defined type
const SearchBarContext = createContext<SearchBarContextType | null>(null);

export const SearchBarProvider = ({ children }: { children: React.ReactNode }) => {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <SearchBarContext.Provider value={{ searchInputRef, searchValue, setSearchValue }}>
            {children}
        </SearchBarContext.Provider>
    );
};

export const useSearchBar = () => {
    const context = useContext(SearchBarContext);
    if (context === null) {
        throw new Error('useSearchBar must be used within a SearchBarProvider');
    }
    return context;
};
