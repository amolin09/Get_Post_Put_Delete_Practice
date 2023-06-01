const express = require('express')

const app = express()

app.use(express.json())

let db = []

let idCounter = 1001


app.post('/games', function(req, res){
  let t = req.body.title
  let n = req.body.notes
  let c = req.body.completed
  let r = req.body.rating

  let newGame = {
    title: t,
    notes: n,
    completed: c,
    rating: r,
    id : idCounter
  }
  idCounter++

  db.push(newGame)

  res.json(newGame)
})

app.get('/games', function(req, res){
  
  let library = db.map(function(game){
    let overview = {}
    overview.id = game.id
    overview.title = game.title
    overview.completed = game.completed
    overview.rating = game.rating
    return overview
  })

  res.json(library)
})


//I added my own route to filter out if a game has been completed or not. does not overwrite the original array
app.get('/games/completion/:status', function(req, res){

  let completion = req.params.status

  let found = db.find(function(game){
    if(game.completed == completion){
      return true
    }
    else{
      return false
    }
  })

  if(found){
    let newdb = db.filter(function(game){
      if(game.completed == completion){
        return true
      }
      else{
        return false
      }
    })

    let library = newdb.map(function(game){
      let overview = {}
      overview.id = game.id
      overview.title = game.title
      overview.completed = game.completed
      overview.rating = game.rating
      return overview
    })
  
    res.json(library) 

  }
  else{
    res.sendStatus(404)
  }
  
  
})


//another custom route to filter games based on their rating
app.get('/games/rating/:rating', function(req, res){

  let rating = req.params.rating

  let found = db.find(function(game){
    if(game.rating == rating){
      return true
    }
    else{
      return false
    }
  })

  if(found){
    let newdb = db.filter(function(game){
      if(game.rating == rating){
        return true
      }
      else{
        return false
      }
    })

    let library = newdb.map(function(game){
      let overview = {}
      overview.id = game.id
      overview.title = game.title
      overview.completed = game.completed
      overview.rating = game.rating
      return overview
    })
  
    res.json(library) 

  }
  else{
    res.sendStatus(404)
  }
  
  
})


app.get('/games/:id', function(req, res){

  let id = req.params.id

  let found = db.find(function(game){
    if(game.id == id){
      return true
    }
    else{
      return false
    }
  })

  if(found){
    res.json(found)
  }
  else{
    res.sendStatus(404)
  }
  
})

app.delete('/games/:id', function(req, res){
  
  let id = req.params.id

  let found = db.find(function(game){
    if(game.id == id){
      return true
    }
    else{
      return false
    }
  })

  if(found){
    let newdb = db.filter(function(game){
      if(game.id == id){
        return false
      }
      else{
        return true
      }
    })
  
    db = newdb

    res.sendStatus(204)
  }
  else{
    res.sendStatus(404)
  }

  
})

app.put('/games/:id', function(req, res){
  
  let id = req.params.id

  let t = req.body.title
  let n = req.body.notes
  let c = req.body.completed
  let r = req.body.rating

  let found = db.find(function(game){
    if(game.id == id){
      return true;
    }
    else{
      return false;
    }
  })


  if(found){
    found.title = t
    found.notes = n
    found.completed = c
    found.rating = r
    res.status(200).json(found)
  }
  else{
    res.sendStatus(404)
  }
})

let PORT = 9696
app.listen(PORT, function(){
  console.log('App is running on port ', PORT)
})