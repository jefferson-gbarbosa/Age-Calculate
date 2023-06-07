const months = [31,28,31,30,31,30,31,31,30,31,30,31];
const form = document.querySelector('form');

let dayField = document.querySelector('.day-field');
let dayInput = document.querySelector('.day');
let monthField = document.querySelector('.month-field');
let monthInput = document.querySelector('.month');
let yearField = document.querySelector('.year-field');
let yearInput = document.querySelector('.year');

let labelMonth = document.querySelector('.l-month');
let labelYear = document.querySelector('.l-year');

let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;
let currentDate = today.getDate();

form.addEventListener('submit',ageCalculate);

// day check function
// if it is within 01 and 31 days and also the months that are 30 and 31 days
function checkDay(){
  let erroTxtDay = document.querySelector('.error-text-d');
  let validator = true;

  if(dayInput.value == ''){
    dayField.classList.add('invalid');
    erroTxtDay.innerText = 'This field is required';
    validator = false;

  }else if(dayInput.value < 1 || dayInput.value > 31){
    dayField.classList.add('invalid');
    erroTxtDay.innerText = 'Must be a valid day';    
    validator = false;

  }else if(dayInput.value == 31 && (monthInput.value == 2 || monthInput.value == 4 || monthInput.value == 6 ||monthInput.value == 9 || monthInput.value == 11)){
    dayField.classList.add('invalid');
    labelMonth.setAttribute("id","l-month");
    monthInput.setAttribute("id","month");
   
    labelYear.setAttribute("id","l-year");
    yearInput.setAttribute("id","year");

    erroTxtDay.innerText = 'Must be a valid day';
    validator = false;
  }else{
    dayField.classList.remove('invalid');
    validator = true;
  }
  return validator
}
//month check function
// check if the month is between January and December (1 to 12)
function checkMonth(){
  let erroTxtMonth = document.querySelector('.error-text-m');
  let validator = true;

  if(monthInput.value == ''){
    monthField.classList.add('invalid');
    erroTxtMonth.innerText = 'This field is required';
    validator = false;
  
  }else if(monthInput.value < 1 || monthInput.value > 12){
    monthField.classList.add('invalid');
    erroTxtMonth.innerText = 'Must be a valid month';
    validator = false;
  }else{
    monthField.classList.remove('invalid');
    labelMonth.removeAttribute("id","l-month");
    monthInput.removeAttribute("id","month");
    validator = true;

  } 
  return validator
}
// year check function
//check that the year entered is not the same as the current or future year
function checkYear(){
  let erroTxtYear = document.querySelector('.error-text-y');
  let validator = true;
  if(yearInput.value > currentYear || yearInput.value == currentYear){
    yearField.classList.add('invalid');
    erroTxtYear .innerText = 'Must be in the past';
    validator = false;
  }else if(yearInput.value == ""){
    yearField.classList.add('invalid');
    erroTxtYear .innerText = 'This field is required';
    validator = false;
  }else{
    yearField.classList.remove('invalid');
    labelYear.removeAttribute("id","l-year");
    yearInput.removeAttribute("id","year");
    validator = true;
  }
  return validator;
}
// function to allow calculations of years that have a month of 29 days
function checkLeapYear(){
  let erroTxtDay = document.querySelector('.error-text-d');
  let validator = false;
  let validationLeapYear = leapChecker();
  if(monthInput.value == 2){
    if(validationLeapYear){
      validator = true;
      dayField.classList.remove('invalid');
        
    }else if(dayInput.value <= 28 || dayInput.value >= 30 ){
      validator = true;
      dayField.classList.remove('invalid');
    }
    else{
      dayField.classList.add('invalid'); 
      erroTxtDay.innerText = 'Must be a valid day';
    }
  }else{
    validator = true;
  }
  return validator
}
// check if the year is a leap year
function leapChecker(year){
  if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
   months[1]=29
   return new Date(year,1,29).getMonth()==1;
  }else{
    months[1]=28
  }
}
// function display
function displayResult(bYear,bMonth,bDay){
  document.getElementById('yy').textContent = bYear;
  document.getElementById('mm').textContent = bMonth;
  document.getElementById('dd').textContent = bDay;
}
// age calculate
function ageCalculate(e){
  e.preventDefault();
  checkDay();
  checkMonth();
  checkYear();
  dayInput.addEventListener('keyup',checkDay);
  monthInput.addEventListener('keyup',checkMonth);
  yearInput.addEventListener('keyup',checkYear);

  let day = dayInput.value;
  let month = monthInput.value;
  let year = yearInput.value;

  let inputDate = new Date(`${year}-${month}-${day}`);
  
  let birthYear,birthMonth,birthDay;
  
  let birthDetails = {
    year:inputDate.getFullYear(),
    month:inputDate.getMonth()+1,
    date:inputDate.getDate()
  }

  if(checkDay() && checkMonth() && checkYear() && checkLeapYear()){
    leapChecker(currentYear);
    birthYear = currentYear - birthDetails.year;

    if(currentMonth >= birthDetails.month){
      birthMonth = currentMonth - birthDetails.month;
    }else{
      birthYear --;
      birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if(currentDate >= birthDetails.date){
      birthDay = currentDate - birthDetails.date;
    }else{
      birthMonth--;
      let day = months[currentMonth - 2];
      birthDay = day + currentDate - birthDetails.date;

      if(birthMonth < 0){
        birthMonth = 11;
        birthYear --;
      }
    }
    displayResult(birthYear,birthMonth,birthDay);
  }
}

