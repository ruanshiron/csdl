// api.js
var express = require('express')
var router = express.Router()

const db = require('../db')

module.exports = router

// TODO 

router.get('/', (req, res) => {
  console.log('noop')
  res.send('noop')
})

router.get('/test' ,(req, res) => {
  const initialStae = {
    recipe: {
      id: null,
      name:"",
      desciption: "",
      picture: "",
      ingredients: [
        "",
        ""
      ],
      steps: [
        {
          text: "hfaodhf ajdk jakdjf kajekn knfmanjhflwfjanmnvkhjajkjfwlkfjlkamdk",
          images: [
            "https://pbs.twimg.com/profile_images/748953502970441728/5cVwlxPU_400x400.jpg",
            "https://image.dhgate.com/0x0/f2/albu/g4/M00/46/8B/rBVaEFdXeY-AVdYyAAJ8WYBS9mE880.jpg",
  
          ]
        },
        {
          text: "",
          images: [
            "",
            ""
          ]
        }
      ],
      created_at: "",
      chef: {
        id: null,
        name: "",
        picture: "",
        followed: true
      },
      liked: false,
      did_bookmark: false,
    },
    snaps: [
      "https://media3.s-nbcnews.com/j/MSNBC/Components/Video/201808/tdy_food_klg_chicken_180828_1920x1080.today-inline-vid-featured-desktop.jpg",
      "https://api.norecipes.com/wp-content/uploads/2018/08/teriyaki-chicken-recipe_007.jpg",
      "https://img.delicious.com.au/i3GozJrz/w759-h506-cfill/del/2017/05/one-pot-butter-chicken-with-dill-yoghurt-46876-2.jpg",
      "https://www.cbc.ca/food/content/images/recipes/WinterVegPie.jpg",
    ],
    comments: [
      {
        chef: {
          id: null,
          picture: "https://img-global.cpcdn.com/005_steps/ff1a4f8e0519f866/480x360cq70/photo.jpg",
        },
        text: "21212",
        created_at: "",
      }
    ]
  }
    
    res.send(initialStae)
})

