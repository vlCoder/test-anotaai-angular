import { Product } from "../models/products.model";

export const MockA= { 
    id: 1, 
    title: 'Fatia pizza', 
    description: 'It has survived not only five centuries,', 
    img: 'pizza-fatia.jpg', 
    type: '1' 
};
const MockB = { 
    id: 2, 
    title: 'Pizza inteira', 
    description: 'It has survived not only five centuries,', 
    img: 'pizza-inteira.jpg',
    type: '2' 
};
const mockC = { 
    id: 2, 
    title: 'Fatia de pizza', 
    description: 'Type and scrambled it to make a type specimen book,', 
    img: 'fatia-inteira.jpg',
    type: '3' 
};
export const mockProducts: Product[] = [
    MockA,
    MockB,
    MockB
];