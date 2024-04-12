import { createContext, useState } from "react";

//Crear el contexto
export const FiltersContext = createContext();

//Crear el Provider, para proveer el contexto
export function FiltersProvider({ children }) {
  //Retorna el estado global del contexto --> para estados muy pequeños q cambien con poca frecuencia
  //El valor q queremos proveer y donde lo queremos proveer ({children}) --> en este caso
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
