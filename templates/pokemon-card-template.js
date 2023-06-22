const fs = require('fs');

const NEWLINE = '\n';
const EMPTY = '';


const a = () => {
  `<section class="card">
            <div class="img">
              <a
                ><img
                  src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png"
              /></a>
            </div>
            <h2 class="pokemon-name">Bulbasaur</h2>
            <div class="attributes-container">
              <div class="types attribute">
                <h3>Type:</h3>
                Grass Poison
              </div>
              <div class="weight attribute">
                <h3>Weight:</h3>
                69
              </div>
              <div class="hp attribute">
                <h3>HP:</h3>
                45
              </div>
              <div class="xp attribute">
                <h3>XP:</h3>
                64
              </div>
              <div class="attack attribute">
                <h3>Attack:</h3>
                49
              </div>
              <div class="defence attribute">
                <h3>Defence:</h3>
                49
              </div>
            </div>
          </section>`
}

const htmlTableTemplate = ({ id, types, weight, hp, xp, names, attack, defense }) => {
  return `<section class="card">
  <div class="img">
    <a
      ><img
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png"
    /></a>
  </div>
  <h2 class="pokemon-name">${names}</h2>
  <div class="attributes-container">
    <div class="types attribute">
      <h3>Type:</h3>
      ${types}
    </div>
    <div class="weight attribute">
      <h3>Weight:</h3>
      ${weight}
    </div>
    <div class="hp attribute">
      <h3>HP:</h3>
      ${hp}
    </div>
    <div class="xp attribute">
      <h3>XP:</h3>
      ${xp}
    </div>
    <div class="attack attribute">
      <h3>Attack:</h3>
      ${attack}
    </div>
    <div class="defence attribute">
      <h3>Defence:</h3>
      ${defense}
    </div>
  </div>
</section>`
};

const templateImplementer = (data) => {
  const lines = data.split(NEWLINE);
  return lines.slice(1).reduce((htmlCodeContext, line) => {
    const [idNum, names, types, speed, hp, xp, attack, defense, weight] = line.split('|');
    const id = '0'.repeat(3 - idNum.length) + idNum;
    const table = htmlTableTemplate({ id, types, names, hp, xp, attack, defense, weight })
    htmlCodeContext += NEWLINE + table;
    return htmlCodeContext;
  }, EMPTY);
};

fs.readFile("./resources/sample-file.txt", 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(templateImplementer(data));
});
