import { colors } from '@/constants/colors';

export const PAPER_SIZES = [
    {x: 25, y: 25},
    {x: 30, y: 30},
    {x: 30, y: 40},
]

export const PRINT_COLOR = [
    1,2,4
]

export const PAPER_COLOR = [
    colors.white, colors.kraft
]


export const QUANTITY = [
    "2.000", "5.000", "10.000", "20.000", "30.000", "100.000"
]

export const TEMPLATES = [
    { id: 1, name: 'Simple Grid', description: 'A classic repeating pattern with equal spacing.' },
    { id: 2, name: 'Tight Grid', description: 'Similar to Simple Grid but with reduced spacing.' },
    { id: 3, name: 'Staggered Grid', description: 'Offset logos in alternating rows for a dynamic layout.' },
    { id: 4, name: 'Dense Staggered', description: 'Tighter offset pattern for a compact design.' },
    { id: 5, name: 'Centered', description: 'Logos centered on the page with equal spacing.' },
  ]