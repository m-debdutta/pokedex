const fs = require('fs');

const NEWLINE = '\n';
const EMPTY = '';

const htmlTableTemplate = ({ id, types, weight, hp, xp, names, attack, defense }) => {
  return `<section class="table">
            <div class="table-row">
              <div class="img">
              <a><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png"/></a>
              </div>
            </div>
            <div class="table-row">
              <div class="pokemon-name">
                ${names}
              </div>
            </div>
            <div class="attributes">
              <table>
                <tr>
                  <th>Types</th>
                  <td>${types}</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>${weight}</td>
                </tr>
                <tr>
                  <th>HP</th>
                  <td>${hp}</td>
                </tr>
                <tr>
                  <th>XP</th>
                  <td>${xp}</td>
                </tr>
                <tr>
                  <th>Attack</th>
                  <td>${attack}</td>
                </tr>
                <tr>
                  <th>Defense</th>
                  <td>${defense}</td>
                </tr>
              </table>
            </div>
          </section>`
};

const templateImplementer = (data) => {
  const lines = data.split(NEWLINE);
  let section = EMPTY;
  let htmlCode = lines.slice(1).reduce((htmlCodeContext, line) => {
    const [idNum, names, types, speed, hp, xp, attack, defense, weight] = line.split('|');
    const id = '0'.repeat(3 - idNum.length) + idNum;
    const table = htmlTableTemplate({ id, types, names, hp, xp, attack, defense, weight })
    section += NEWLINE + table;
    if (+id % 4 === 0) {
      htmlCodeContext += `<section class="chart-row">${section}${NEWLINE}</section>${NEWLINE}`;
      section = EMPTY;
    }
    return htmlCodeContext;
  }, EMPTY);

  if (section !== EMPTY) {
    htmlCode += `<section class="chart-row">${section}${NEWLINE}</section>${NEWLINE}`;
  }
  return htmlCode;
};

fs.readFile("./resources/sample-file-demo.txt", 'utf-8', (err, data) => {
  console.log(templateImplementer(data));
});

