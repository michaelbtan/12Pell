import db from '../db/connection.js'
import Post from '../models/post.js'

const insertData = async () => {
  await db.dropDatabase()

  const posts =
    [
      {
        "title": "$60 haircuts!!! WTFFFFF",
        "author": "Mike T"
      },
      {
        "title": "Engaged and don't care anymore",
        "author": "Angel"
      },
      {
        "title": "Be there in 10 minutes...",
      "author": "Karho"
      },
      {
        "title": "I'm a kpop star",
        "author": "Simon"
      }
    ]

  await Post.insertMany(posts)
  console.log("Created posts!")
  db.close()
}

insertData()