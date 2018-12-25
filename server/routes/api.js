// api.js
var express = require('express')
var router = express.Router()
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({storage: storage})

const db = require('../db')

module.exports = router

// TODO 

router.post('/', (req, res) => {
  db.query("SELECT NOW()", [], (req, result) => {
    res.send(result)
  })
})

router.post('/dish' ,(req, res) => {
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

router.post('/explore' ,(req, res) => {
  // var show =  {
  //   id: null,
  //   name: null,
  //   description:null,
  //   image:null,
  //   hearts: null,
  // }
  if ((req.body.value) == 0) {
    db.query("select distinct r.recipe_id, r.recipe_name, r.recipe_image, r.recipe_des, r.recipe_like from recipes r left join follows on r.chef_id = follows.to_chef_id   where follows.from_chef_id = 1", (err, res1) => {
      if (err) {
        return next(err)
      }
      // convertSql(res1);
      res.send(convertSql(res1))
      // res.send(res1)
    })
  }
})
//   console.log(req.body)
//   const initialStae =  {
//     follow:  [
//       {
//         id: 10,
//         name: 'Bánh Mật Hoa Dâm Bụt',
//         description: '4151 Calo, Khó ăn dễ nấu',
//         image: '/resource/pictures/6.jpg',
//         hearts: 0,
//         liked: false,
//         bookmark: false,
//       },
//       {
//         id: 7,
//         name: 'Chưa đặt tên',
//         description: '2656 Calo, Dễ nấu - Dễ ăn - Dễ Tiêu - Dễ Thải',
//         image: '/resource/pictures/7.jpg',
//         hearts: 0,
//         liked: false,
//         bookmark: false,
//       },
//       {
//         id: 8,
//         name: 'Mì Italy',
//         description: '123 Calo, Cùng Shopee pipipi',
//         image: '/resource/pictures/8.jpg',
//         hearts: 0,
//         liked: false,
//         bookmark: false,
//       },
//       {
//         id: 9,
//         name: 'Bánh mì Chảo - Không bánh',
//         description: '111 Calo, Sale 91%',
//         image: '/resource/pictures/9.jpg',
//         hearts: 0,
//         liked: false,
//         bookmark: false,
//       }
//     ],
//     hot: [
      
//     ],
//     new: [

//     ]
//   }
    
//   res.send(initialStae)
// })


router.post('/edit' ,(req, res) => {
  console.log(req.body)
    
  res.redirect('https://localhost:3000/chef/')
})
   

const convertSql = (rest ) =>{
  
  var res = {follows:[],
            hot:[],
            new:[]};
           
  rest.rows.map(element => {
    var cov = {};
    cov.id=element.recipe_id;
    cov.name=element.recipe_name;
    cov.desciption=element.recipe_des;
    cov.image=element.recipe_image;
    cov.hearts=element.recipe_like;
    console.log(cov);
    res.follows.push(cov);    
  });
  
  // console.log([cov,res]);
  return res;
}

router.post('/image', upload.array('image', 3), (req, res) => {
  console.log(req.body.id)

  res.send('dsds')
})
