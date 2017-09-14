const cron = require('node-cron')
const firebase = require('firebase')


class MangoTree {

  // Initialize a new MangoTree
  constructor() {
    this.age = 0
    this.height = 0
    this.qty = 0
    this.stopHeight = 6
    this.healthyStatus = true
    this.maxAge = 20
    this.fruits = []
    this.harvested
    this.totalBuah = 0
  }

  getAge() {
    this.age++


  }
  getHeight() {

  }
  getFruits() {
  }
  getHealtyStatus() {
  }


  // Get current states here

  // Grow the tree
  grow() {
    this.age += 1


    if(this.height < this.stopHeight){
    let added_height = Math.random() * (1-0) + 0
    this.height += added_height
    }

    if(this.age === this.maxAge){
      this.healthyStatus = false
    }
  }

  // Produce some mangoes
  produceMangoes() {
  }

  // Get some fruits
  harvest() {
    let qty = Math.floor(Math.random() * 10)
    let statuses = ['good', 'bad']
    this.totalBuah += qty
    this.harvested = qty
    let jumlahGood = 0
    let jumlahBad = 0

    for(let i = 0; i < qty; i++){
      let randomStatus = Math.round(Math.random())
      if (randomStatus == 0){
        jumlahGood++
      } else {
        jumlahBad++
      }
      this.fruits.push(new Mango(statuses[randomStatus]))
    }
    this.harvested += ` | ${jumlahGood} good, ${jumlahBad} bad`
  }

}

class Mango {
  // Produce a mango
  constructor(status) {
    this.status = status
  }
}

// driver code untuk release 0
let tree = new MangoTree()
let task = cron.schedule('*/3 * * * * *', function(){
   if(tree.healthyStatus != false){
      tree.grow()
      tree.harvest();
      console.log(`[Year ${tree.age} Report] Height = ${tree.height} | Fruits harvested = ${tree.harvested} Total Buah : ${tree.totalBuah}`)


      const config = {
        databaseURL: "https://mango-achim.firebaseio.com",
        projectId: "mango-achim"
      }

      const db = firebase.initializeApp(config).database().ref(`mango${tree.age}`)
      let newData = {
        Year: tree.age,
        Height: tree.height,
        Fruit: `${tree.harvested}`,
        Total: tree.totalBuah
      }
      db.push(newData)
    } else {
      task.stop()
      console.log('pohonnya mati');
    }
  })
