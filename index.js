// Make name update automatically

const cardName = document.querySelector('#card-name');
const nameInput = document.querySelector('#name');

nameInput.addEventListener('input', () => {
    cardName.textContent = nameInput.value;
})

// Make number update automatically

const cardNumber = document.querySelector('#card-number');
const numberInput = document.querySelector('#number');

numberInput.addEventListener('input', () => {
    cardNumber.textContent = numberInput.value;
})

// Make expiration date update automatically

const expirationMonth = document.querySelector('#month');
const monthInput = document.querySelector('#expiration-month');

monthInput.addEventListener('input', () => {
   expirationMonth.textContent = monthInput.value;
})

const expirationYear = document.querySelector('#year');
const yearInput = document.querySelector('#expiration-year');

yearInput.addEventListener('input', () => {
   expirationYear.textContent = yearInput.value;
})

// Make cvc update automatically

const cvc = document.querySelector('#security-code');
const cvcInput = document.querySelector('#cvc');

cvcInput.addEventListener('input', () => {
    cvc.textContent = cvcInput.value;
})

// --------------------------------------------------------------Form Validation----------------------------------------------

const confirm = document.querySelector('#confirm');
const inputs = document.querySelectorAll('input');

confirm.addEventListener('click', (e) => {
    e.preventDefault();

    let nameIsValid = true;
    let numbersAreValid = true;

    inputs.forEach((input) => {
        const parent = input.closest('.parent');
        const blank = parent.querySelector('.blank');
        const invalid = parent.querySelector('.format');
        const value = input.value.trim().replace(/\s/g, ''); // Remove spaces
        

        // Reset error messages initially
        if (blank) blank.style.display = 'none';
        if (invalid) invalid.style.display = 'none';

        // Check for blank input
        if (value === "") {
            if (blank) blank.style.display = 'block';
            if (input.classList.contains('digits')) numbersAreValid = false;
            if (input.id === 'name') nameIsValid = false;
            return; // Skip further checks for this input
        }

        // Check for invalid numbers
        if (input.classList.contains('digits') && isNaN(value)) {
            if (invalid) invalid.style.display = 'block';
            numbersAreValid = false;
        }
    });

    // Check overall validity
    if (nameIsValid && numbersAreValid) {
        const completed = document.querySelector('#completed');
        const form = document.querySelector('form');

        form.style.display = 'none';
        completed.style.display = 'flex';
    }
});


//----------------------------------------------------------------Back to Normal State-----------------------------------


    const continueButton = document.querySelector('#continue');
    continueButton.addEventListener('click', () => {
        window.location.reload();
    })



//---------------------------------------------------------------Format card number field--------------------------------


numberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    value = value.match(/.{1,4}/g)?.join(' ') || ''; // Group into chunks of 4 digits
    e.target.value = value; // Update the input field
});

numberInput.addEventListener('blur', (e) => {
    // Optional: Add validation for the credit card number format
    const value = e.target.value.replace(/\s/g, ''); // Remove spaces
    if (value.length !== 16) {
        // Show an error if the card number is not 16 digits
        const parent = e.target.closest('.parent');
        const invalid = parent.querySelector('.format');
        if (invalid) invalid.style.display = 'block';
    }
});
