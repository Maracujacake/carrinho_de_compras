import { useContext } from 'react';
import { createContext } from 'react'
import { ReactNode, useState } from 'react'
import React from 'react'
import {ShoppingCart} from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

{/* types */}

type cartItem = {
    id: number
    quantity: number
}

type ShoppingCartProviderProps = { 
    children: ReactNode
}

type ShoppingCartContext = {
    cartQuantity: number
    cartItems: cartItem[]
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeCartQuantity: (id: number) => void

}



const ShoppingCartContext = createContext( {} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}


export function ShoppingCartProvider( {children}:ShoppingCartProviderProps ){
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<cartItem[]>("shopping-cart", [])
    const cartQuantity = cartItems.reduce( (quantity, item) => 
         item.quantity + quantity, 0
    )
    

    {/*principal functions*/}

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id:number){
        return (cartItems.find(item => item.id === id)?.quantity || 0)
    }

    function increaseCartQuantity(id:number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity: 1}]
            } else{
                return (currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity:item.quantity + 1}
                    }
                    else{
                        return item
                    }
                }))
            }
        })
    }

    function decreaseCartQuantity(id:number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else{
                return (currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity:item.quantity - 1}
                    }
                    else{
                        return item
                    }
                }))
            }
        })
    }

    function removeCartQuantity(id:number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return( <ShoppingCartContext.Provider value={
         {getItemQuantity,
          increaseCartQuantity, 
          decreaseCartQuantity, 
          removeCartQuantity,
          cartItems,
          cartQuantity,
          openCart,
          closeCart } }>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
)}