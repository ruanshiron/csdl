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

router.post('/dish/recipe', (req, response) => {
  const qRecipe = `select r.recipe_id, r.recipe_name, r.recipe_des, r.recipe_image, r.recipe_created
                    from recipes r
                    where r.recipe_id = $1`;
  const params = [req.body.id.toString()]
  console.log(req.body.id)
  db.query(qRecipe, params, (err, res) => {
    if (err) return next(err)
    response.json({
      id: res.rows[0].recipe_id,
      name:  res.rows[0].recipe_name,
      description: res.rows[0].recipe_des,
      picture: res.rows[0].recipe_image,
      created_at: res.rows[0].recipe_created
    })
  })
})

router.post('/dish/ingredients', (req, response) => {
  const qIngredients = `select i.ingredient_name from ingredients i
                        join made_from m on i.ingredient_id = m.ingredient_id
                        where m.recipe_id = $1`;
  const params = [req.body.id.toString()] 

  db.query(qIngredients, params, (err, res) => {
    if (err) return next(err)
    response.json(
      res.rows.map((row) => {
        return row['ingredient_name']
      })
    )
  })
})

router.post('/dish/steps', (req, response) => {
  const qSteps = `select s.index, s.text, i.image_src
                  from steps s
                  left join images i on i.index = s.index and i.recipe_id = s.recipe_id
                  where s.recipe_id = $1 `;
  const params = [req.body.id.toString()] 

  db.query(qSteps, params, (err, res) => {
    if (err) return next(err)
    response.json(
      stepsParser(res.rows)
    )
  })
})

const stepsParser = (data) => {
  var res = {}
  data.map(item=>{
    if (res[item.index] === undefined) 
      res[item.index] = {text: item.text, images: [item.image_src]}
    else
      res[item.index].images.push(item.image_src)
  })
  return res
}

router.post('/dish/chef', (req, response) => {
  const qChef = `select c.chef_id, c.chef_name, c.chef_pic, 
                  exists (
                    select * from follows f
                    where f.from_chef_id = $2 and f.to_chef_id = c.chef_id) followed
                from chefs c, recipes
                where c.chef_id = recipes.chef_id and 
                  recipes.recipe_id = $1 `;
  console.log(req.body.id + req.body.userID)
  const params = [req.body.id, req.body.userID] 

  db.query(qChef, params, (err, res) => {
    if (err) return console.log(err)
    response.json({
      id: res.rows[0].chef_id,
      name: res.rows[0].chef_name,
      picture: res.rows[0].chef_pic,
      followed: res.rows[0].followed,
    })
  })
})

router.post('/dish/snaps', (req, response) => {
  const qSnaps = `select s.image_src from snaps s
  where s.recipe_id = $1`;

  const params = [req.body.id] 

  db.query(qSnaps, params, (err, res) => {
    if (err) return console.log(err)
    console.log(res)
    response.json(
      res.rows
    )
  })
})

router.post('/dish/comments', (req, response) => {
  const qComment = `select c.chef_id,chefs.chef_pic,c.comment_text,c.comment_created_at 
                      from comments c, chefs
                      where c.recipe_id = $1 and c.chef_id = chefs.chef_id`;

  const params = [req.body.id] 

  db.query(qComment, params, (err, res) => {
    if (err) return console.log(err)
    response.json(
      res.rows.map((item)=> {
        return {
          chef: {
            id: item.chef_id,
            picture: item.chef_pic,
          },
          text: item.comment_text,
          created_at: item.comment_created_at,
        }
      })
    )
  })
})

router.post('/dish' ,(req, res) => {
  const qRecipe = `select r.recipe_id, r.recipe_name, r.recipe_des, r.recipe_image, r.recipe_created
                    from recipes r
                    where r.recipe_id = 1`;
  const qIngredient= `select i.ingredient_name from ingredients i   
                        join made_from m on i.ingredient_id = m.ingredient_id
                        where m.recipe_id = 1`;
  const qStep = `select s.index,s.text,i.image_src  from steps s
                  left join images i on i.index = s.index and i.recipe_id = s.recipe_id
                  where s.recipe_id = 1`;
  const qChef = `select c.chef_id, c.chef_name, c.chef_pic, 
                    exists (
                      select * from follows f
                      where f.from_chef_id = 3 and f.to_chef_id = c.chef_id) followed
                  from chefs c, recipes
                  where c.chef_id = recipes.chef_id and 
                    recipes.recipe_id =1 `;
  const qSnap = `select s.image_src from snaps s
                  where s.recipe_id = 3`;
  const qComment = `select c.chef_id,chefs.chef_pic,c.comment_text,c.comment_created_at 
                      from comments c, chefs
                      where c.recipe_id = 2 and c.chef_id = chefs.chef_id`;
  db.query(qRecipe,(err,res0) => {
      var result = {}

      if (err) {
        return next(err)
      }

      result[id] = 
      db.query(qIngredient,(err,res1) => {
        if (err) {
          return next(err)
        }
        db.query(qStep,(err,res2) => {
          if (err) {
            return next(err)
          }
          db.query(qChef,(err,res3) => {
            if (err) {
              return next(err)
            }
            db.query(qSnap,(err,res4) => {
              if (err) {
                return next(err)
              }
              db.query(qComment,(err,res4) => {
                if (err) {
                  return next(err)
                }
                console.log(res0)
                res.send(res0)
              })
            })
          })
        })
      })
    })
  
  
  
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
    

})

router.post('/explore' ,(req, res) => {
  const x=`select r.recipe_id, r.recipe_name, r.recipe_image,r.recipe_des, r.recipe_like, COALESCE(l.likeds, false) liked, COALESCE(b.actives, false) active from recipes r
          join follows f on r.chef_id = f.to_chef_id
          left join (
            select *, (case 
                  when chef_id not in(1) 
                  then false 
                  else true
                end) likeds from likes 
            where chef_id =1
            ) l on l.recipe_id = r.recipe_id
          left join (
            select *, (case 
                  when chef_id not in(1) 
                  then false 
                  else true
                end) actives from bookmarks
            where chef_id =1
            ) b on b.recipe_id = r.recipe_id
          where f.from_chef_id = 1`;
const y = `select r.recipe_id, r.recipe_name, r.recipe_image,r.recipe_des, r.recipe_like,COALESCE(l.likeds, false) liked, COALESCE(b.actives, false) active 
            from recipes r
            left join (
              select *, (case 
                    when chef_id not in(1) 
                    then false 
                    else true
                  end) likeds from likes 
              where chef_id =1
              ) l on l.recipe_id = r.recipe_id
            left join (
              select *, (case 
                    when chef_id not in(1) 
                    then false 
                    else true
                  end) actives from bookmarks
              where chef_id =1
              ) b on b.recipe_id = r.recipe_id
            order by r.recipe_like DESC
            limit 3`;
const z = `select r.recipe_id, r.recipe_name, r.recipe_image,r.recipe_des, r.recipe_like,COALESCE(l.likeds, false) liked, COALESCE(b.actives, false) active 
            from recipes r
            left join (
              select *, (case 
                    when chef_id not in(1) 
                    then false 
                    else true
                  end) likeds from likes 
              where chef_id =1
              ) l on l.recipe_id = r.recipe_id
            left join (
              select *, (case 
                    when chef_id not in(1) 
                    then false 
                    else true
                  end) actives from bookmarks
              where chef_id =1
              ) b on b.recipe_id = r.recipe_id
            order by r.recipe_created DESC
            limit 3`;
  if ((req.body.value) == 0) {
    db.query(x, (err, res0) => {
      if (err) {
        return next(err)
      }
      res.send(convertExplore(res0,0))
    })
  }
  if ((req.body.value) == 1) {
    db.query(y, (err, res1) => {
      if (err) {
        return next(err)
      }
      res.send(convertExplore(res1,1))
    })
  }
  if ((req.body.value) == 2) {
    db.query(z, (err, res2) => {
      if (err) {
        return next(err)
      }
      res.send(convertExplore(res2,2))
    })
  }
})
router.post('/edit' ,(req, res) => {
  console.log(req.body)
    
  res.redirect('https://localhost:3000/chef/')
})
   

const convertExplore = (rest,value ) =>{
  var res = {follow:[],
            hot:[],
            new:[]};
           
  rest.rows.map(element => {
    var cov = {};
    cov.id=element.recipe_id;
    cov.name=element.recipe_name;
    cov.description=element.recipe_des;
    cov.image=element.recipe_image;
    cov.hearts=element.recipe_like;
    cov.liked=element.liked;
    cov.bookmark=element.active;
    console.log(cov);
    value===0 && res.follow.push(cov);   
    value===1 && res.hot.push(cov); 
    value===2 && res.new.push(cov);
  });
  return res;
}



router.post('/image', upload.array('image', 3), (req, res) => {
  console.log(req.body.id)

  res.send('dsds')
})

router.post('/like', (req, response) => {
  const qLike = `insert into likes (chef_id, recipe_id, liked, like_created_at) 
                  select $2, $1, true, now()
                  where not exists (select 1 from likes where chef_id = $2 and recipe_id = $1)`

  const params = [req.body.id, req.body.userID] 

  db.query(qLike, params, (err, res) => {
    if (err) return console.log(err)
    response.json(
      res.rowCount == 0 ? {
        id: null
      } : {
        id: req.body.id
      }
    )
  })
})
