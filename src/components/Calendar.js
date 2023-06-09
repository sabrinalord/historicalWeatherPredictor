import React, { useState, useEffect }  from 'react';
import './Calendar.css';
import DayDetails from './DayDetails';


const Calendar = ( {month, year, averages, weatherDataRangeInYears, location, weatherDataByYear}) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const [selectedDay, setSelectedDay] = useState("");

  const parsedMonth = new Date(`${month.value} 1, ${year}`).getMonth() + 1; 
  const parsedYear = parseInt(year, 10); 
  const daysInMonth = getDaysInMonth(parsedYear, parsedMonth);
  const firstDayOfWeek = new Date(parsedYear, parsedMonth - 1, 1).getDay() || 7;
  const blankSquares = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div 
    key={`blank-${index}`} 
    className=" blank-square">
    </div>
  ));
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1 );

  const [isModalOpen, setModalOpen] = useState(false);


const openModal = () => {
  setModalOpen(true);
};


  const handleDayClick = (day) => {
    console.log(`this  is the day inside Calendar ${day}`)
    openModal();
    setSelectedDay(day.toString().padStart(2, '0'));
    console.log(selectedDay)

    // Implement your logic to open WeatherDetails and pass the necessary props
  };


  const renderDaySquare = (day) => {
    const dayData = averages[day - 1];
    const { averageTemperature, frequencyOfRain } =
      dayData || {};

     const frequencyOfRainAsPercentage = Math.ceil((frequencyOfRain / weatherDataRangeInYears) * 100);

  
    return (
      <div key={day} className="calendar-grid-square" onClick={() => handleDayClick(day)}>
        <div className="date-underline"><span className="card-header">{day}</span></div>
        {dayData && (
          <div>
            <p>Average Temp: {averageTemperature}°C</p>

            {frequencyOfRainAsPercentage > 60 ? 
            <span className="card-emoji">☔</span> 
            : frequencyOfRainAsPercentage > 49 ? 
            <span className="card-emoji">☂️</span> 
            : <span className="card-emoji">☀️</span>
          }
            <p>Rained {frequencyOfRain} times in the last {weatherDataRangeInYears} years.</p>

          </div>
        )}
    </div>
    );
  };



    return (
      <div className="calendar">
        <div className="calendar-header">
        <h1>{month.name}, {year} </h1>
        <h3>in {location}</h3>
        </div>
      <div className="calendar-grid">
        <div className="calendar-grid-days">Sun</div>
        <div className="calendar-grid-days">Mon</div>
        <div className="calendar-grid-days">Tue</div>
        <div className="calendar-grid-days">Wed</div>
        <div className="calendar-grid-days">Thu</div>
        <div className="calendar-grid-days">Fri</div>
        <div className="calendar-grid-days">Sat</div>
        {blankSquares}
        {daysArray.map((day) => renderDaySquare(day))} 
        {isModalOpen && (
          <DayDetails
            day={selectedDay}
            month={month}
            weatherDataRangeInYears={weatherDataRangeInYears}
            weatherDataByYear={weatherDataByYear}
            onCloseModal={() => setModalOpen(false)}
          />
        )}
    </div>
    </div>
    );
};

export default Calendar;