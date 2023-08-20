
const tableBody = document.getElementById('table__body');
const numberOfColumns = document.querySelectorAll("table thead tr th").length - 2;
const calculateBtn = document.querySelector('.calculate__btn');
const resetBtn = document.querySelector('.reset__btn');

calculateBtn.addEventListener('click', () => {
    let result = calculate();
    showResult(result);
})

resetBtn.addEventListener('click', () => {
    resetTableValues();
})

const addInputs = (offerToShow) => {
    const columnsFromEachRow = [...Array(numberOfColumns)];
    return columnsFromEachRow.map((column, index) => {
        const inputToAdd = `<td>
        <input
        type="number"
        placeholder="ingresar valor"
        class="table__input"
        value=${offerToShow.valores[index]} />
        </td>`;
        return inputToAdd;
    }).join("");
}

function calculate() {
    let inputs = [...document.querySelectorAll('input')];
    let valuesPerRow = [];
    let resultPerRow = [];
    
    for (let i = 0; i < inputs.length; i += 3) {
        valuesPerRow.push(inputs.slice(i, i + 3).map(input => input.value));
    }

    valuesPerRow.forEach((rowValues) => {
        let result = (rowValues[0] * rowValues[1] * (rowValues[2] / 100)) / 100;
        resultPerRow.push(result);
    })
    
    return resultPerRow;
}

function showResult(result) {

    let cellsResult = document.querySelectorAll('.result');
    
    cellsResult.forEach((cell, index) => {
        cell.textContent = result[index];
    })
}

function resetTableValues() {

    const inputsToReset = document.querySelectorAll('input');
    const cellsResult = document.querySelectorAll('.result');
    
    cellsResult.forEach((cell, index) => {
        cell.textContent = undefined;
    })

    inputsToReset.forEach(input => input.value = '0');
}

(() => {

    creditOffers.forEach(offer => {
        tableBody.innerHTML +=
            `<tr>
            <th scope="row" class="table__month">
            ${offer.name}
            </th>
            ${addInputs(offer)}
            <td class="result"></td>
        </tr>`;
    })

})()
