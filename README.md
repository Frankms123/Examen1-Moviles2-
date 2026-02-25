# Fake Store App - React Native & Expo

Este proyecto es una aplicación móvil de tienda virtual desarrollada para la **Primera Prueba Parcial de Móviles 2**. La aplicación utiliza la [Fake Store API](https://fakestoreapi.com/) para gestionar productos, categorías y autenticación.

## Requisitos Previos

1.  **Node.js**
2.  **Expo Go**

## Instalación y Ejecución

1.  **Clonar o descargar el proyecto** en tu máquina local.
2.  **Instalar las dependencias**:
    Abre una terminal en la carpeta del proyecto y ejecuta:
    npm install
    
3.  **Iniciar el servidor de desarrollo**:
    npm start

4.  **Abrir en tu dispositivo**:
    *   Escanea el **código QR** que aparece en la terminal usando la aplicación **Expo Go** (Android) o la cámara (iOS).

## Credenciales de Prueba (Login)
(incluidos por defecto):
*   **Username**: `mor_2314`
*   **Password**: `83r5^_`

## Características Implementadas

*   **Autenticación**: Login con persistencia de token y usuario mediante `AsyncStorage`.
*   **Pasarela de Productos**: Visualización de catálogo dinámico.
*   **Filtros**: Búsqueda por categorías (Electronics, Jewelry, Men's Clothing, Women's Clothing).
*   **Detalle del Producto**: Vista ampliada con descripción y opción de compra.
*   **Carrito de Compras**:
    *   Suma de subtotales y gran total.
    *   Ajuste de cantidades.
    *   Eliminación de productos.
    *   Persistencia de datos local.
*   **Diseño**: Interfaz moderna con encabezado en azul vibrante y tipografía legible.

**Desarrollado por**: Frank Mora Sanchez
**Para**: Examen 1 - Móviles 2
