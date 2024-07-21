import '../styles/bmicalculator.css';
import Img from '../assets/bmi.jpg'
import { useState } from 'react';

const BmiCalculator = () => {

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [error, setError] = useState(false);
    const [bmi, setBmi] = useState("");
    const [bmiStatus, setBmiStatus] = useState("");

    const calculateBmi = () => {
        let numericHeight = +height;
        let numericWeight = +weight;
        let validHeight = /^\d+$/.test(height);
        let validWeight = /^\d+$/.test(weight);

        if (typeof numericHeight === 'number' && typeof numericWeight === 'number' && validHeight && validWeight) {
            const heightInMeters = numericHeight / 100;
            const bmiValue = numericWeight / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2) as any);
            if (bmiValue < 18.5) {
                setBmiStatus('Under Weight')
            } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
                setBmiStatus("Normal Weight")
            } else if (bmiValue >= 25 && bmiValue <= 29.9) {
                setBmiStatus("Normal Weight")
            } else {
                setBmiStatus("Obese")
            }
            setError(false);
        } else {
            setBmi("");
            setBmiStatus("");
            setError(true);
        }
    }

    const handleClear = ()=>{
        setHeight("");
        setWeight("");
        setError(false);
        setBmi("");
    }

    return (
        <div className='bmi-container'>
            <div className="box">
                <h1>BMI Calculator</h1>
                <div className="container-wrapper-bmi">
                    <div className="left">
                        <img src={Img} alt="img" />
                    </div>
                    <div className="right">
                        {error && <span className='bmi-error'>Please enter the numeric values for height and weight</span>}
                        <div className="input-group">
                            <label htmlFor="height">Height(cm): </label>
                            <input type="text" id='height' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeight(e.target.value)} value={height} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="weight">Weight(kg): </label>
                            <input type="text" id='weight' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)} value={weight} />
                        </div>
                        <div className="btn-grp">
                            <button onClick={calculateBmi}>Calculate</button>
                            <button onClick={handleClear}>Clear</button>
                        </div>
                        {bmi && <div className="result">
                            <p>Your BMI is : { bmi}</p>
                            <p>Status: {bmiStatus}</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BmiCalculator