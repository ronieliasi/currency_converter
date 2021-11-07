import React from 'react'

export default function CurrencyRow(props) {
    const {
      currencyList,
      selectedCurrency,
      onChangeCurrency,
      onChangeAmount, 
      amount,
      disabled = false    
    } = props
    return (
        <div>
            <input disabled = {disabled} type = "number" className = "input" value = {amount} onChange = {onChangeAmount}/>
            <select value = {selectedCurrency} onChange = {onChangeCurrency}>
                {currencyList.map(option => (
                    <option key ={option} value ={option}> {option} </option>
                ))}
                
            </select>
        </div>
    )
}
