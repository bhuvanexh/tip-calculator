const out = document.querySelector('#show');
const total = document.querySelector('#total');
const radios = document.querySelectorAll("input[name='perc']")
const people = document.querySelector('#people');
const bill = document.querySelector('#bill');
const reset = document.querySelector('#reset');
const custom = document.querySelector('#custom');
const billE = document.querySelector('#first')
const tipE = document.querySelector('#second')
const peopleE = document.querySelector('#third')
let cust = parseInt(custom.value);
const bruh = function (def = 0) {
    const tip = document.querySelector("input[name='perc']:checked").value;
    let tipv = 0;
    if (def) {
        tipv = def;
    } else {
        tipv = parseFloat(tip)
    }
    const billv = parseFloat(bill.value);
    const peoplev = parseInt(people.value);

    if (validate(billv, peoplev)) {
        const pretty = (billv * (tipv / 100)) / peoplev
        const cute = (billv * (1 + (tipv / 100))) / peoplev
        return { pretty, cute };
    } else {
        return false;
    }

}
bill.addEventListener('input', function () {

    if (bruh()) {
        cust = parseInt(custom.value);
        const { pretty, cute } = bruh(cust);

        out.innerHTML = `$${pretty.toFixed(2)}`;
        total.innerHTML = `$${cute.toFixed(2)}`;
    } else {
        console.log('nah')
    }
})
people.addEventListener('input', function () {
    if (bruh()) {
        cust = parseInt(custom.value);
        const { pretty, cute } = bruh(cust);
        out.innerHTML = `$${pretty.toFixed(2)}`;
        total.innerHTML = `$${cute.toFixed(2)}`;
    } else {
        console.log('nah')
    }
})
for (let radio of radios) {
    radio.addEventListener('click', function () {
        for (let radio of radios) {
            radio.parentElement.classList.remove('checked');
        }
        radio.parentElement.classList.add('checked');

        if (bruh()) {
            cust = parseInt(custom.value);
            const { pretty, cute } = bruh(cust);
            out.innerHTML = `$${pretty.toFixed(2)}`;
            total.innerHTML = `$${cute.toFixed(2)}`;
        } else {
            console.log('nah')
        }

    })
}
custom.addEventListener('input', function () {
    for (let radio of radios) {
        radio.checked = 'false'
        radio.parentElement.classList.remove('checked');

    }
    radios[5].checked = 'true';
    cust = parseInt(custom.value);
    if (cust <= 0) {
        out.innerHTML = 'UND';
        total.innerHTML = 'UND';
        tipE.classList.add('visible');
        setTimeout(() => {
            tipE.classList.remove('visible');
        }, 3000)
    }
    else if (bruh()) {
        const { pretty, cute } = bruh(cust);
        out.innerHTML = `$${pretty.toFixed(2)}`;
        total.innerHTML = `$${cute.toFixed(2)}`;
        tipE.classList.remove('visible');

    } else {
        console.log('nah')
    }


})
reset.addEventListener('click', function () {
    restart();
})

const validate = function (val1, val2) {

    if (val1 <= 0) {
        out.innerHTML = 'UND';
        total.innerHTML = 'UND';
        billE.classList.add('visible');
        billE.previousElementSibling.classList.add('visi');
        setTimeout(() => {
            billE.previousElementSibling.classList.remove('visi');
            billE.classList.remove('visible');
        }, 3000)
        return false;
    } else if (val2 <= 0) {
        out.innerHTML = 'UND';
        total.innerHTML = 'UND';
        peopleE.classList.add('visible');
        peopleE.previousElementSibling.classList.add('visi');
        setTimeout(() => {
            peopleE.previousElementSibling.classList.remove('visi');
            peopleE.classList.remove('visible');
        }, 3000)
        return false;
    }
    else {
        peopleE.previousElementSibling.classList.remove('visi');
        peopleE.classList.remove('visible');
        billE.previousElementSibling.classList.remove('visi');
        billE.classList.remove('visible');
        return true;
    }

}

const restart = function () {
    out.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
    bill.value = 0;
    people.value = 1;
    custom.value = '';
    for (let radio of radios) {
        radio.parentElement.classList.remove('checked');
    }
    radios[2].checked = 'true';
    radios[2].parentElement.classList.add('checked');
}