export const priceFormatter = (price: number) => {
    
    let result = '';
    result = price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });

    return result;
}