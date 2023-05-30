const months = [31,28,31,30,31,30,31,31,30,31,30,31];
const form = document.querySelector('form');

let dayField = document.querySelector('.day-field');
let dayInput = document.querySelector('.day');
let monthField = document.querySelector('.month-field');
let monthInput = document.querySelector('.month');
let yearField = document.querySelector('.year-field');
let yearInput = document.querySelector('.year');

let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;
let currentDate = today.getDate()

form.addEventListener('submit',calculateAge);

function checkDay(){
  let erroTxt = document.querySelector('.error-text-d');
  let validator = true;
  if(dayInput.value > 31){
    dayField.classList.add('invalid');
    erroTxt.innerText = 'Must be a valid day';
    validator = false;
  }else if(dayInput.value == ''){
    dayField.classList.add('invalid');
    erroTxt.innerText = 'This field is required';
    validator = false;
  }else{
    dayField.classList.remove('invalid');
    validator = true;
  }
  return validator
}
function checkMonth(){
  let erroTxt = document.querySelector('.error-text-m');
  let validator = true;
  if(monthInput.value > 12){
    monthField.classList.add('invalid');
    erroTxt.innerText = 'Must be a valid month';
    validator = false;
  }else if(monthInput.value == ''){
    monthField.classList.add('invalid');
    erroTxt.innerText = 'This field is required';
    validator = false;
  }else{
    monthField.classList.remove('invalid');
    validator = true;
  }  
  return validator
}
function checkYear(){
  let erroTxt = document.querySelector('.error-text-y');
  let validator = true;
  if(yearInput.value > currentYear || yearInput.value == currentYear){
    yearField.classList.add('invalid');
    erroTxt.innerText = 'Must be in the past';
    validator = false;
  }else if(yearInput.value == ""){
    yearField.classList.add('invalid');
    erroTxt.innerText = 'This field is required';
    validator = false;
  }else{
    yearField.classList.remove('invalid');
    validator = true;
  }
 return validator;
}

function leapChecker(year){
  if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
    months[1]=29
  }else{
    months[1]=28
  }
}

function displayResult(bYear,bMonth,bDay){
  document.getElementById('yy').textContent = bYear;
  document.getElementById('mm').textContent = bMonth;
  document.getElementById('dd').textContent = bDay;
}

function calculateAge(e){
  e.preventDefault();
  checkDay();
  checkMonth();
  checkYear();

  dayInput.addEventListener('keyup',checkDay);
  monthInput.addEventListener('keyup',checkMonth);
  yearInput.addEventListener('keyup',checkYear);
    
  if(checkDay() && checkMonth() && checkYear()){
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

