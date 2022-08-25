process.on('message', cant => {

  const result = randoms(cant)
  process.send(result)
  setTimeout( process.exit, 5000 )
})

const randoms = (cant) => {
  const e = Number(cant);
  const numbers = {};
  
  for(let i=0; i<e; i++){
    const randomNum = Math.floor((Math.random() * (1000)) + 1)
    if(!numbers[randomNum]){
      numbers[randomNum] = 1
    } else {
      numbers[randomNum] ++
    }
  }
  return numbers;
}