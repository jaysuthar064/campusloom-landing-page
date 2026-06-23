import React, { createContext, useContext } from 'react';
import { defaultContent } from '../data/content';

const ContentContext = createContext();

export function ContentProvider({ children }) {
  // Now we serve the static content instantly! No loading screens or API calls.
  return (
    <ContentContext.Provider value={{ content: defaultContent, loading: false, error: null }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
