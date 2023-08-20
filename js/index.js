
const tableBody = document.getElementById('table__body');
const numberOfColumns = document.querySelectorAll("table thead tr th").length - 1;
const calculateBtn = document.querySelector('.calculate__btn');
const statusAlert = document.querySelector('.status__alert');

calculateBtn.addEventListener('click', () => {
    let result = calculate();
    showResult(result);
})

const getMonthName = (monthNumber) => {
    const date = new Date("01/01/2023");
    date.setMonth(monthNumber);
    return date.toLocaleString('es-AR', { month: "long" });
};

const addInputs = (month) => {
    const columnsFromEachRow =  [...Array(numberOfColumns)];
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

function calculate (){
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

    let p = document.createElement("p");
    let finalMessage = "La empresa obtuvo el mismo número de ingresos que de egresos";
    const loss = `La empresa generó pérdidas por: ${result}`
    const revenue = `La empresa obtuvo una ganancia de: ${result}`
    
    if (result != 0) {
        finalMessage = result > 0 ? revenue : loss;
    }
    
    p.textContent = finalMessage;
    statusAlert.append(p);
}

(() => {

    for(let month = 0; month < 12; month ++ ){

        let monthName = getMonthName(month);
        tableBody.innerHTML += 
        `<tr>
            <td class="month">
            ${monthName}
            </td>
            ${addInputs(month)}
        </tr>`;
    }

})()
