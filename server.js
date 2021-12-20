import express from 'express'
import logger from 'morgan'

const PORT = process.env.PORT || 3000

import db from './db/connection.js'
import Post from './models/post.js'

const app = express()

app.use(express.json())
app.use(logger('dev'))

db.on('connected', () => {
  console.log('Connected to MongoDB!')
  app.listen(PORT, () =>
    console.log(`Express server application is runnign on port ${PORT}`)
  )
})

app.get('/', (req, res) => res.send("This is root!"))

app.get('/post', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/post', async (req, res) => {
  try {
    const post = await new Post(req.body)
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.put('/post/:id', async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.delete('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send("Post deleted")
    }
    throw new Error("Post not found")
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

