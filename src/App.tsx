import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './component/layout';
import { lazy, Suspense } from 'react';
import Loading from './component/loading';

function App() {

  const WeatherApp = lazy(() => import('./tasklist/weatherApp'));
  const ProfileCard = lazy(() => import('./tasklist/profileCard'));
  const StopClock = lazy(() => import('./tasklist/stopClock'));
  const BmiCalculator = lazy(() => import('./tasklist/bmiCalculator'));
  const CurrencyConvertor = lazy(() => import('./tasklist/currencyConvertor'));
  const TodoList = lazy(() => import('./tasklist/todo'));

  return (
    <div className='app-container'>
      <Router>
        <Suspense fallback={<Loading />} >
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<WeatherApp />} />
              <Route path='/weather-app' element={<WeatherApp />} />
              <Route path='/profile-card' element={<ProfileCard />} />
              <Route path='/stop-clock' element={<StopClock />} />
              <Route path='/bmi-calculator' element={<BmiCalculator />} />
              <Route path='/currency-convertor' element={<CurrencyConvertor />} />
              <Route path='/todo-list' element={<TodoList />} />
              {/* <Route path='/todo-list' element={<TodoList />} />  */}
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
