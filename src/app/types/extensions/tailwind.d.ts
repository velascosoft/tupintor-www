/**
 * Un tipo que representa los colores de Tailwind CSS.
 * 
 * Puedes usarlo para asegurar que solo se utilicen colores válidos de Tailwind en tu código.
 * 
 * Ejemplo de uso:
 * ```typescript
 * const color: TailwindColor = 'blue-500'; // Correcto
 * const color: TailwindColor = 'purple-100'; // Correcto
 * const color: TailwindColor = 'pink-1000'; // Error: 'pink-1000' no es un color válido
 * ```
 * 
 * Los colores están organizados en diferentes familias (rojo, azul, verde, etc.) y cada familia tiene
 * tonos numerados del 50 al 900 (dependiendo de la familia).
 * 
 * @typedef {Object} TailwindColor
 * 
 * @see {@link https://tailwindcss.com/docs/colors} La documentación oficial de Tailwind CSS sobre colores.
 */

type TailwindColor =
    | 'transparent'
    | 'current'
    | 'black'
    | 'white'
    | 'gray' | 'gray-50' | 'gray-100' | 'gray-200' | 'gray-300' | 'gray-400' | 'gray-500' | 'gray-600' | 'gray-700' | 'gray-800' | 'gray-900'
    | 'red' | 'red-50' | 'red-100' | 'red-200' | 'red-300' | 'red-400' | 'red-500' | 'red-600' | 'red-700' | 'red-800' | 'red-900'
    | 'yellow' | 'yellow-50' | 'yellow-100' | 'yellow-200' | 'yellow-300' | 'yellow-400' | 'yellow-500' | 'yellow-600' | 'yellow-700' | 'yellow-800' | 'yellow-900'
    | 'green' | 'green-50' | 'green-100' | 'green-200' | 'green-300' | 'green-400' | 'green-500' | 'green-600' | 'green-700' | 'green-800' | 'green-900'
    | 'blue' | 'blue-50' | 'blue-100' | 'blue-200' | 'blue-300' | 'blue-400' | 'blue-500' | 'blue-600' | 'blue-700' | 'blue-800' | 'blue-900'
    | 'indigo' | 'indigo-50' | 'indigo-100' | 'indigo-200' | 'indigo-300' | 'indigo-400' | 'indigo-500' | 'indigo-600' | 'indigo-700' | 'indigo-800' | 'indigo-900'
    | 'purple' | 'purple-50' | 'purple-100' | 'purple-200' | 'purple-300' | 'purple-400' | 'purple-500' | 'purple-600' | 'purple-700' | 'purple-800' | 'purple-900'
    | 'pink' | 'pink-50' | 'pink-100' | 'pink-200' | 'pink-300' | 'pink-400' | 'pink-500' | 'pink-600' | 'pink-700' | 'pink-800' | 'pink-900'
    | 'orange' | 'orange-50' | 'orange-100' | 'orange-200' | 'orange-300' | 'orange-400' | 'orange-500' | 'orange-600' | 'orange-700' | 'orange-800' | 'orange-900'
    | 'teal' | 'teal-50' | 'teal-100' | 'teal-200' | 'teal-300' | 'teal-400' | 'teal-500' | 'teal-600' | 'teal-700' | 'teal-800' | 'teal-900'
    | 'cyan' | 'cyan-50' | 'cyan-100' | 'cyan-200' | 'cyan-300' | 'cyan-400' | 'cyan-500' | 'cyan-600' | 'cyan-700' | 'cyan-800' | 'cyan-900'
    | 'lime' | 'lime-50' | 'lime-100' | 'lime-200' | 'lime-300' | 'lime-400' | 'lime-500' | 'lime-600' | 'lime-700' | 'lime-800' | 'lime-900'
    | 'emerald' | 'emerald-50' | 'emerald-100' | 'emerald-200' | 'emerald-300' | 'emerald-400' | 'emerald-500' | 'emerald-600' | 'emerald-700' | 'emerald-800' | 'emerald-900'
    | 'amber' | 'amber-50' | 'amber-100' | 'amber-200' | 'amber-300' | 'amber-400' | 'amber-500' | 'amber-600' | 'amber-700' | 'amber-800' | 'amber-900'
    | 'rose' | 'rose-50' | 'rose-100' | 'rose-200' | 'rose-300' | 'rose-400' | 'rose-500' | 'rose-600' | 'rose-700' | 'rose-800' | 'rose-900';
