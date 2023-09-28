const calculateButton = document.getElementById("calculateButton");

const formContainer = document.getElementById('formContainer');

const errorMessage = document.getElementById('errorMessage');

const resultsGroup = document.getElementById('resultsGroup');

const assumptionsButton = document.getElementById('assumptionsButton');

const assumptionsText = document.getElementById('assumptionsText');

function errorHandling(error){
    errorMessage.innerText = error
    errorMessage.style.display = 'block'
    formContainer.classList.add('wrong-input');
    setTimeout(() => {
        formContainer.classList.remove('wrong-input');
    }, 400)
}

let assumptions = false 

function showAssumptions() {

    if (assumptions) {
        assumptionsButton.style.transform = 'rotateX(0deg)';
        assumptionsText.style.animation = 'slideUp 0.6s ease-out';
        setTimeout(function() {
          assumptionsText.style.display = 'none';
        }, 600);
        assumptions = false;
    }else{

        assumptionsButton.style.transform = 'rotateX(180deg)';
        assumptionsText.style.animation = 'slideDown 0.6s ease-in-out'
        assumptionsText.style.display = 'block';
        assumptions = true;
    }
    
    
}

const compoundCalculation = () => {
    const initialInvestment = parseFloat(document.getElementById("initialInvestment").value);
    const regularContribution = parseFloat(document.getElementById("regularContribution").value);
    const contributionFrequency = document.getElementById("contributionFrequency").value;
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const yearsToGrow = parseFloat(document.getElementById("yearsToGrow").value);

    const yearsToGrowRange = document.getElementById("yearsToGrowRange");

 
    const totalValue = document.getElementById("totalValue");
    const totalInterest = document.getElementById("totalInterest");
    const summary = document.getElementById("summary");

    let yearlyContribution;

    // Format Numbers Functions

    function formatPercent(number) {
        if (isNaN(number)) {
            return "0%";
        }else{
            return number +'%'
        }
    }

    function formatNumberAsCurrency(number) {
        if (isNaN(number)) {
          return "$0";
        }
        
        const formattedNumber = parseFloat(number).toFixed(2);
        
        const [dollars, cents] = formattedNumber.split(".");
      
        const dollarsWithCommas = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
        const formattedCurrency = "$" + dollarsWithCommas + "." + cents;
      
        return formattedCurrency;
    }

    // Calculate Growth

    switch(contributionFrequency){
        
        case 'weekly':
            yearlyContribution = regularContribution *  52;
            break;

        case 'biWeekly':
            yearlyContribution = regularContribution * 26;
            break;

        case 'monthly':
            yearlyContribution = regularContribution * 12;
            break;
        
        case 'quarterly':
            yearlyContribution = regularContribution * 4;
            break;

        case 'yearly':
            yearlyContribution = regularContribution;
            break; 

        default:
            yearlyContribution = 0;
            break;  

    };

    let fullValue= initialInvestment;
    let moneyIn = initialInvestment 

    const interestPercentage = (interestRate/100) + 1

    for(let i = 1; i <= yearsToGrow; i++){
        moneyIn += yearlyContribution;
        fullValue +=  yearlyContribution;
        fullValue *= interestPercentage;
            
    }

    const interestEarned = fullValue - moneyIn


    // Error Handling

    if (interestRate > 30){

        errorHandling('Interest rate may not exceed 30%');

    } else if (fullValue == 0){
        
        errorHandling('Please add values so result will not be 0');
        
    }
    else if (initialInvestment == 0 && regularContribution == 0 && interestRate == 0 && yearsToGrow == 0) {

        errorHandling('All values cannot be 0');

    }
    else if (initialInvestment < 0 || regularContribution < 0 || interestRate < 0 || yearsToGrow < 0){

       errorHandling('Inputs cannot be negative');


    }else {
        // display results
        errorMessage.style.animation = 'disappear 0.4s ease-out'
        setTimeout( () => 
        {errorMessage.style.display = 'none';
        }, 400);
        totalValue.innerText =  formatNumberAsCurrency(fullValue.toFixed(2));
        totalInterest.innerText =  formatNumberAsCurrency(interestEarned.toFixed(2));
        summary.innerText = 'Your initial investment of ' + formatNumberAsCurrency(initialInvestment) + ' plus your ' + contributionFrequency + ' investment of ' + formatNumberAsCurrency(regularContribution) + ' at an annualized interest rate of ' + formatPercent(interestRate) + ' will be worth '+ formatNumberAsCurrency(fullValue.toFixed(2)) + ' after ' + yearsToGrow + ' years when compounded yearly.'
        resultsGroup.style.display = 'flex'

    }
       
};


calculateButton.addEventListener('click', compoundCalculation);
assumptionsButton.addEventListener('click', showAssumptions);

