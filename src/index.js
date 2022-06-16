const express = require('express')
const app = express()

require('./db')
const Article = require('./models/Articles')

app.set('port', process.env.PORT || 3000)
app.use(express.json())

// GET
app.get('/articles', async (req, res) => {
  const articles = await Article.find()
    .catch(err => console.log(err))
  res.json(articles)
})

// GET BY ID
app.get('/articles/:id', async(req, res) => {
  const { id } = req.params
  const articles = await Article.findById(id)
    .then(articles => res.json(articles))
    .catch(err => {
      console.log(err)
      res.json()
    })
})

// GET BY TITLE
app.get('/articles/title/:titleArticle', async (req, res) => {
  const { titleArticle } = req.params

  const articles = await Article.find({ title: titleArticle })
    .then(articles => res.json(articles))
    .catch(err => {
      console.log(err)
      res.json()
    })

})

// POST
app.post('/articles', async (req, res) => {
  const { title, description } = req.body

  const newArticle = new Article({
    title,
    description
  })

  const articleSaved = await newArticle.save()
    .catch(err => console.log(err))

  res.json(articleSaved)

})

// DELETE
app.delete('/articles', async (req, res) => {
  await Article.deleteMany()
    .catch(err => console.log(err))
  res.status(204).json()
})

// DELETE BY ID
app.delete('/articles/:id', async (req, res) => {
  const { id } = req.params

  await Article.findByIdAndDelete(id)
    .then(res.json())
    .catch(err => {
      console.log(err)
      res.json()
    })
})

// PUT [Replace Entire Document]
app.put('/articles/:id', async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  await Article.replaceOne({_id : id}, 
  {
    title: title,
    description: description
  })
    .catch(err => console.log(err))

  res.json()

})

// PATCH [Replace Especific Field in Document]
app.patch('/articles/:id', async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const articleUpdated = await Article.findOneAndUpdate({_id : id}, 
  {
    title: title,
    description: description
  }, { new: true })
    .then(articleUpdated => res.json(articleUpdated))
    .catch(err => console.log(err))

})

// ---- Server On Port ---- //
app.listen(app.get('port'), () => {
  console.log('Server On Port ', app.get('port'))
})