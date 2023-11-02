import { useState } from "react";
import "./App.css";
import imgArrow from "./assets/images/icon-arrow.svg";
import { Box, Grid, Stack } from "@mui/material";

const getMessageDisplay = (inputValue, showError, showValidation) => {
  return {
    display: showError ? 'block' : (showValidation ? 'block' : 'none')
  };
};


function App() {
  const [dayInput, setDay] = useState('');
  const [monthInput, setMonth] = useState();
  const [yearInput, setYear] = useState();
  const [age, setAge] = useState({})

  const [validDay, setValidDay] = useState(false)
  const [validMonth, setValidMonth] = useState(false)
  const [validYear, setValidYear] = useState(false)

  const [errorDay, setErrorDay] = useState(false)
  const [errorMonth, setErrorMonth] = useState(false)
  const [errorYear, setErrorYear] = useState(false)

  const CalcAge = () => {
    const selectedDate = new Date(yearInput, monthInput - 1, dayInput);
    const currentDate = new Date();
    const difference = currentDate.getTime() - selectedDate.getTime();

    const calcYears = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    const calcMonths = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const calcDays = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    setAge({ year: calcYears, month: calcMonths, day: calcDays });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();

    setValidDay(dayInput === '');
    setValidMonth(monthInput === '');
    setValidYear(yearInput === '');

    if (
      dayInput !== "" &&
      monthInput !== "" &&
      yearInput !== "" &&
      !validDay &&
      !validMonth &&
      !validYear
    ) {
      if (
        !(dayInput > 30 || monthInput > 12 || yearInput > date.getFullYear())
      ) {
        CalcAge();
      }
    }

    setErrorDay(dayInput > 30);
    setErrorMonth(monthInput > 12);
    setErrorYear(yearInput > date.getFullYear());
  }

  return (
    <Stack className="App">
      <Box className="boxCalc" sx={{ width: { xs: "100%", sm: "600px" } }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6} sm={4}>
              <div className="input">
                <label style={errorDay || validDay ? {color: 'red'} : {}}>Day</label>
                <input
                  type="text"
                  placeholder="DD"
                  value={dayInput}
                  onChange={(e) => setDay(e.target.value)}
                  style={errorDay || validDay ? {borderColor: 'red'} : {}}
                />
                <span style={getMessageDisplay(dayInput, errorDay, validDay)}>
                  {errorDay ? "Must be a valid day" : "This field is required"}
                </span>
              </div>
            </Grid>

            <Grid item xs={6} sm={4}>
              <div className="input">
                <label style={errorMonth || validMonth ? {color: 'red'} : {}}>Month</label>
                <input
                  type="text"
                  placeholder="MM"
                  value={monthInput}
                  onChange={(e) => setMonth(e.target.value)}
                  style={errorMonth || validMonth ? {borderColor: 'red'} : {}}
                />
                <span
                  style={getMessageDisplay(monthInput, errorMonth, validMonth)}
                >
                  {errorMonth
                    ? "Must be a valid month"
                    : "This field is required"}
                </span>
              </div>
            </Grid>

            <Grid item xs={6} sm={4}>
              <div className="input">
                <label style={errorYear || validYear ? {color: 'red'} : {}}>Year</label>
                <input
                  type="text"
                  placeholder="YYYY"
                  value={yearInput}
                  onChange={(e) => setYear(e.target.value)}
                  style={errorYear || validYear ? {borderColor: 'red'} : {}}
                />
                <span
                  style={getMessageDisplay(yearInput, errorYear, validYear)}
                >
                  {errorYear
                    ? "Must be a valid year"
                    : "This field is required"}
                </span>
              </div>
            </Grid>

          </Grid>
          <hr />
          <button type="submit">
            <img src={imgArrow} alt="Arrow" width="20px" />
          </button>
        </form>

        <div className="calcAge">
          <div className="calc">
            <span>{age.year || "--"}</span>
            <p>years</p>
          </div>
          <div className="calc">
            <span>{age.month ? age.month : "--"}</span>
            <p>months</p>
          </div>
          <div className="calc">
            <span>{age.day ? age.day : "--"}</span>
            <p>days</p>
          </div>
        </div>
      </Box>
    </Stack>
  );
}

export default App;
