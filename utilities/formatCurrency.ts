const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {currency: 'BRL', style: 'currency',})

export function formatCurrency(number: number){
    return CURRENCY_FORMATER.format(number)
}