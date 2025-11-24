import Papa from 'papaparse';

export interface Property {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  tipo: string;
  habitaciones: number;
  banos: number;
  area: number;
  precio: number;
  descripcion: string;
  caracteristicas: string[];
  imagen: string;
  bono: number;
  ordenBono: number;
  [key: string]: any;
}

const SPREADSHEET_ID = '1iF8PuF84cUNPZ3GM50guWsLwwp-slUZNbP0MWtaEPFM';
const SHEET_PROPERTIES = 'Total de propiedades';
const SHEET_BONOS = 'Bonos';

function getPublicUrl(sheetName: string) {
  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

async function fetchCSV(url: string): Promise<any[]> {
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching CSV:', error);
    throw error;
  }
}

function columnIndexToLetter(index: number): string {
  let letter = '';
  while (index >= 0) {
    letter = String.fromCharCode((index % 26) + 65) + letter;
    index = Math.floor(index / 26) - 1;
  }
  return letter;
}

function getColumnByIndex(row: any, index: number): any {
  const keys = Object.keys(row);
  return row[keys[index]];
}

export async function getProperties(): Promise<Property[]> {
  try {
    const [propertiesData, bonosData] = await Promise.all([
      fetchCSV(getPublicUrl(SHEET_PROPERTIES)),
      fetchCSV(getPublicUrl(SHEET_BONOS))
    ]);

    const bonosMap = new Map();
    bonosData.forEach((row) => {
      const propertyId = getColumnByIndex(row, 0); 
      const bonoValue = parseFloat(getColumnByIndex(row, 4) || '0'); 
      const ordenValue = parseFloat(getColumnByIndex(row, 6) || '0'); 
      
      if (propertyId) {
        bonosMap.set(propertyId, { bono: bonoValue, orden: ordenValue });
      }
    });

    const properties: Property[] = propertiesData.map((row, index) => {
      const propertyId = getColumnByIndex(row, 0) || `prop-${index}`;
      const bonoInfo = bonosMap.get(propertyId) || { bono: 0, orden: 0 };

      const property: Property = {
        id: propertyId,
        nombre: getColumnByIndex(row, 1) || 'Sin nombre',
        direccion: getColumnByIndex(row, 2) || '',
        ciudad: getColumnByIndex(row, 3) || '',
        tipo: getColumnByIndex(row, 4) || '',
        habitaciones: parseInt(getColumnByIndex(row, 5) || '0'),
        banos: parseInt(getColumnByIndex(row, 6) || '0'),
        area: parseFloat(getColumnByIndex(row, 7) || '0'),
        precio: parseFloat(getColumnByIndex(row, 8) || '0'),
        descripcion: getColumnByIndex(row, 9) || '',
        caracteristicas: [],
        imagen: getColumnByIndex(row, 10) || '/placeholder.jpg',
        bono: bonoInfo.bono,
        ordenBono: bonoInfo.orden
      };

      for (let i = 11; i < Object.keys(row).length; i++) {
        const columnLetter = columnIndexToLetter(i);
        if (columnLetter !== 'AE' && columnLetter !== 'AG' && columnLetter !== 'AJ') {
          const value = getColumnByIndex(row, i);
          if (value && value.toString().trim()) {
            property[`col_${columnLetter}`] = value;
          }
        }
      }

      return property;
    });

    properties.sort((a, b) => b.ordenBono - a.ordenBono);

    return properties;
  } catch (error) {
    console.error('Error loading properties:', error);
    return [];
  }
}