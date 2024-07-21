import { useEffect, useState } from 'react';
import '../styles/currencyconvertor.css';
import axios from 'axios';

const CurrencyConvertor = () => {

    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [exchangeRate,setexchangeRate] = useState(null);

    useEffect(() => {
        const getExchangeRate = async () => {
            try {
                let URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
                const response = await axios.get(URL);
                setexchangeRate(response.data.rates[toCurrency]);                
            } catch (err) {
                console.log(err);
            }
        }
        getExchangeRate();
    }, [fromCurrency,toCurrency]);

    useEffect(()=>{
        if(exchangeRate !== null){
            setConvertedAmount((+amount * +exchangeRate).toFixed(2) as any)
        }
    },[amount,exchangeRate])

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setAmount(+e.target.value)
    }

    const handleFromCurrencyChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setFromCurrency(e.target.value);
    }

    const handleToCurrencyChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setToCurrency(e.target.value);
    }

    return (
        <div className='currency-convertor'>
            <div className="currency-container">
                <div className="currency-img"></div>
                <h1 className='heading'>Currency Convertor</h1>
                <div className="amount-grp">
                    <label htmlFor="amt">Amount:</label>
                    <input type="number" id='amt' value={amount} onChange={handleAmountChange} />
                </div>
                <div className="currency-input-group">
                    <label htmlFor="from">From Currency:</label>
                    <select id="from" value={fromCurrency} onChange={handleFromCurrencyChange} >
                        <option value="USD">USD - United State Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound Sterling</option>
                        <option value="JPY">JPY - Japnese Yen</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="CNY">CNY - Chinese Yuan</option>
                        <option value="INR">INR - Indian Rupees</option>
                        <option value="BRL">BRL - Brazilian Real</option>
                        <option value="ZAR">ZAR - South African Rand</option>
                    </select>
                </div>
                <div className="currency-input-group">
                    <label htmlFor="to">To Currency:</label>
                    <select id="to" value={toCurrency} onChange={handleToCurrencyChange}>
                        <option value="USD">USD - United State Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound Sterling</option>
                        <option value="JPY">JPY - Japnese Yen</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="CNY">CNY - Chinese Yuan</option>
                        <option value="INR">INR - Indian Rupees</option>
                        <option value="BRL">BRL - Brazilian Real</option>
                        <option value="ZAR">ZAR - South African Rand</option>
                    </select>
                </div>
                <div className="currency-result">
                    <p>{amount} {fromCurrency} equal to {convertedAmount} {toCurrency}</p>
                </div>
            </div>
        </div>
    )
}

export default CurrencyConvertor