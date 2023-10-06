const prompt = require('prompt-sync')({ sigint: true })


let name = prompt("Ande ditt namn: ")
console.log(`Hej ${name}! Du ska göra en fråge formulär som ska visa vilket djur passar dig bäst.`)
console.log("Instruktion. Man behöver välja nummer av svaralternativ som passar bäst.")

const data = require('./blanketData1.json')
const fs = require('fs')


const kat = 0;
const hund = 1;
const kanin = 2;
const fisk = 3;

const totalPoint = [0, 0, 0, 0];


for (q of data) {


  console.log(q.fråga)
  for (let i = 0; i < q.options.length; i++) { console.log(`${i + 1} - ${q.options[i].text}`) }
  let answer;
  while (isNaN(answer) || answer < 0 || answer > 4) { answer = parseInt(prompt(" Skriva ditt svar nummer: ")); }
  console.log(answer);

  let points = q.options[answer - 1].points;
  for (let i = 0; i < totalPoint.length; i++) { totalPoint[i] += points[i] }

}


console.log("===========================================================")

console.log("Vilket djur passar dig: ")

const totalSum = (totalPoint[0] + totalPoint[1] + totalPoint[2] + totalPoint[3])


katResult = (totalPoint[0] / totalSum * 100).toFixed(2)
hundResult = (totalPoint[1] / totalSum * 100).toFixed(2)
kaninResult = (totalPoint[2] / totalSum * 100).toFixed(2)
fiskResult = (totalPoint[3] / totalSum * 100).toFixed(2)


let sortera = [{ djur: "Kat  ", value: katResult },
{ djur: "Hund ", value: hundResult },
{ djur: "Kanin", value: kaninResult },
{ djur: "Fisk ", value: fiskResult },]


console.log(sortera.sort((first, second) => (first.value - second.value)).reverse())


console.log("============================================================")
console.log("Resultat: ")

console.log(`Namn: ${name} `);
const a = new Date();
console.log(`Data och tid: ${a} `);
console.log(`Djur som passar dig: ${sortera[0].djur}`)


fs.readFile("blanketSvar.json", (err, data) => {
  let svar = [];
  if (!err) {
    svar = JSON.parse(data)
  };
  svar.push({ Namn: name, Datum: a, Djur: sortera[0].djur + sortera[0].value + `%` })

  fs.writeFile("blanketSvar.json", JSON.stringify(svar, null, " "), (err) => {
    if (err) throw err;
    console.log(('Data written to file'))
  })

})