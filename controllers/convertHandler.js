function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"]
  let string = input.match(/[a-zA-Z]+/g)[0]

  return [number[0], string]
}
function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/")
  if (nums.length > 2){
    return false
  }

  return nums
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0]
    let nums = checkDiv(result)
    if(!nums){
      return undefined
    }
    let num1 = nums[0]
    let num2 = nums[1] || "1"
    result = parseFloat(num1) / parseFloat(num2)
    if( isNaN(num1) || isNaN(num2) ){
      return undefined
    }
    return result
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase()
    switch(result) {
      case 'km': 
        return 'km';
      case 'gal':
        return 'gal';
      case 'lbs':
        return 'lbs';
      case 'mi':
        return 'mi';
      case 'l':
        return 'L';
      case 'kg':
        return 'kg';
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case 'gal':
        return 'L';
      case 'l':
        return 'gal';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        return undefined
    }
  };

  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case 'km':
        return 'kilometers';
      case 'gal':
        return 'gallons';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'mi':
        return 'miles';
      case 'l':
        return 'liters';
      default:
        return 'Dont know'
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase()
    let result;

    switch (unit) {
      case 'km':
        result = initNum / miToKm
        break;
      case 'gal':
        result = initNum * galToL
        break;
      case 'lbs':
        result = initNum * lbsToKg
        break;
      case 'mi':
        result = initNum * miToKm
        break;
      case 'l':
        result = initNum / galToL
        break;
      case 'kg':
        result = initNum / lbsToKg
        break;
      default:
        result = undefined
    }
    
    return parseFloat(result.toFixed(5))
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
}

module.exports = ConvertHandler;
