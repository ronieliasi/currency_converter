import logo from './logo.svg';
import './App.css';
import CurrencyRow from './CurrencyRow'
import { useEffect, useState } from 'react';

function App() {
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyMapping, setCurrencyMapping] = useState({});
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [error, setError] = useState();

  // testing
  useEffect(() => {
      fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(response => {
      const firstCurrency = Object.keys(response.rates)[0];
      setCurrencyMapping(response.rates);
      const currencyRatesList = Object.keys(response.rates);
      setCurrencyList(currencyRatesList);
      setFromCurrency(response.base);
      setToCurrency(firstCurrency);
    }).catch((error) => {
      setError(error.message)
    });
  }, []);


useEffect(() => {
  if(fromCurrency != null && toCurrency != null)
  {
    const exchangeRate = currencyMapping[toCurrency] / currencyMapping[fromCurrency] ;
    setToAmount(fromAmount * exchangeRate)
  }
}, [fromAmount, fromCurrency, toCurrency, currencyMapping])

return (
  <>
    { error ? 
      <h1> {error} </h1> : 
    (<>
      <h1> Convert </h1>
      <CurrencyRow
        currencyList = {currencyList}
        selectedCurrency = {fromCurrency}
        onChangeCurrency = {e => setFromCurrency(e.target.value)}
        onChangeAmount = {e => setFromAmount(e.target.value)}
        amount = {fromAmount}
      />
      <div className = "equals"> = </div>
      <CurrencyRow
        disabled = {true}
        currencyList = {currencyList}
        selectedCurrency = {toCurrency}
        onChangeCurrency = {e => setToCurrency(e.target.value)}
        onChangeAmount = {() => {}}
        amount = {toAmount}
      /> </>) } 
  </> )

}

export default App;
