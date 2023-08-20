
const tableBody = document.getElementById('table__body');
const numberOfColumns = document.querySelectorAll("table thead tr th").length - 1;
const calculateBtn = document.querySelector('.calculate__btn');
const resetBtn = document.querySelector('.reset__btn');
const statusAlert = document.querySelector('.status__alert');

calculateBtn.addEventListener('click', () => {
    let result = calculate();
    let status = showResult(result);
    console.log(status);
})

resetBtn.addEventListener('click', () => {
    resetTableValues();
})

const getMonthName = (monthNumber) => {
    const date = new Date("01/01/2023");
    date.setMonth(monthNumber);
    return date.toLocaleString('es-AR', { month: "long" });
};

const addInputs = (month) => {
    const columnsFromEachRow = [...Array(numberOfColumns)];
    return columnsFromEachRow.map((column, index) => {
        const inputToAdd = `<td>
        <input
        type="number"
        placeholder="ingresar valor"
        class="table__input"
        value=${getCorrectDefaultValue(month, index)} />
        </td>`;
        return inputToAdd;
    }).join("");
}

const getCorrectDefaultValue = (month, index) => {
    let isEven = index % 2 == 0;
    return isEven ? flujoDeCaja[month]['ingresos'] : flujoDeCaja[month]['egresos'];
}

function calculate() {
    let inputs = [...document.querySelectorAll('input')];
    let sumaIngresos = 0;
    let sumaEgresos = 0;

    inputs.forEach((input, index) => {
        if (index % 2 == 0) {
            sumaIngresos += input.valueAsNumber;
        } else {
            sumaEgresos += input.valueAsNumber;
        }
    })

    return sumaIngresos - sumaEgresos;
}

function showResult(result) {

    removePreviousResult();
    
    const p = document.createElement("p");
    const loss = `La empresa generó pérdidas por: ${result}`;
    const revenue = `La empresa obtuvo una ganancia de: ${result}`;
    let finalMessage = "La empresa obtuvo el mismo número de ingresos que de egresos";
    let status = 0;

    if (result != 0) {
        finalMessage = result > 0 ? revenue : loss;
        status = result > 0 ? 1 : -1;
    }

    p.textContent = finalMessage;
    statusAlert.append(p);
    return status;
}

function removePreviousResult() {
    if (statusAlert.children[0]) {
        statusAlert.removeChild(statusAlert.children[0]);
    }
}

function resetTableValues() {

    removePreviousResult();

    const inputsToReset = document.querySelectorAll('input');
    inputsToReset.forEach(input => input.value = '0');
}

(() => {

    for (let month = 0; month < 12; month++) {

        let monthName = getMonthName(month);
        tableBody.innerHTML +=
            `<tr>
            <th scope="row" class="table__month">
            ${monthName}
            </th>
            ${addInputs(month)}
        </tr>`;
    }

})()
