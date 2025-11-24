# TuMatch Inmobiliario - Visualizador de Propiedades

Aplicación web para visualizar propiedades inmobiliarias desde Google Sheets con diseño glassmorphism y gradientes.

## Características

- Carga de datos desde Google Sheets
- Cards con efecto glassmorphism
- Ordenamiento por valor de bono (columna G)
- Animaciones con Framer Motion
- Diseño responsive
- Colores basados en la identidad de TuMatch

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Abrir [http://localhost:3000](http://localhost:3000)

## Estructura de Datos

La aplicación lee dos hojas del Google Sheets:
- **Total de propiedades**: Información principal (excluyendo columnas AE, AG, AJ)
- **Bonos**: Columna E (valor del bono) y columna G (orden)

## Tecnologías

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- NextUI
- Framer Motion
- PapaParse (para leer CSV)