// api.js
var express = require('express')
var router = express.Router()
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public')
  },
  filename: function(req, file, cb) {
    cb(null, 'image_'+Date.now().toString()+'.jpg')
  }
})
 
var upload = multer({storage: storage})

const db = require('../db')

module.exports = router

// TODO 

router.post('/', (req, res) => {
  res.send(Date.now().toString())
})

router.post('/dish/recipe', (req, response) => {
  const qRecipe = `select r.recipe_id, r.recipe_name, r.recipe_des, r.recipe_image, r.recipe_created
                    from recipes r
                    where r.recipe_id = $1`;

  const newQRecipe = `select r.recipe_id, 
                        r.recipe_name, 
                        r.recipe_image,
                        r.recipe_des, 
                        r.recipe_created,
                        (select count(likes.recipe_id) from likes where likes.recipe_id = r.recipe_id) recipe_like,
                        COALESCE(l.likeds, false) liked, 
                        COALESCE(b.actives, false) active from recipes r
                      left join (
                      select *, (case 
                        when chef_id not in($2) 
                        then false 
                        else true
                      end) likeds from likes 
                      where chef_id = $2
                      ) l on l.recipe_id = r.recipe_id
                      left join (
                      select *, (case 
                        when chef_id not in($2) 
                        then false 
                        else true
                      end) actives from bookmarks
                      where chef_id = $2
                      ) b on b.recipe_id = r.recipe_id
                      where r.recipe_id = $1`;

  const params = [req.body.id, req.body.userID]
  console.log(req.body.id)
  db.query(newQRecipe, params, (err, res) => {
    if (err) throw(err)
    response.json({
      id: res.rows[0].recipe_id,
      name:  res.rows[0].recipe_name,
      description: res.rows[0].recipe_des,
      picture: res.rows[0].recipe_image,
      created_at: res.rows[0].recipe_created,
      liked: res.rows[0].liked,
      did_bookmark: res.rows[0].active,
      hearts: res.rows[0].recipe_like === '0' ? 0 : res.rows[0].recipe_like,
    })
  })
})

router.post('/dish/ingredients', (req, response) => {
  const qIngredients = `select i.ingredient from ingredients i
                        where i.recipe_id = $1`;
  const params = [req.body.id.toString()] 

  db.query(qIngredients, params, (err, res) => {
    if (err) return next(err)
    response.json(
      res.rows.map((row) => {
        return row['ingredient']
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
      res.rows.map((row) => {
        return row['image_src']
      })
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


router.post('/explore' ,(req, res) => {
  const x=`select r.recipe_id, 
                  r.recipe_name, 
                  r.recipe_image,
                  r.recipe_des, 
                  (select count(likes.recipe_id) from likes where likes.recipe_id = r.recipe_id) recipe_like,
                  COALESCE(l.likeds, false) liked, 
                  COALESCE(b.actives, false) active from recipes r
          join follows f on r.chef_id = f.to_chef_id
          left join (
            select *, (case 
                  when chef_id not in($1) 
                  then false 
                  else true
                end) likeds from likes 
            where chef_id = $1
            ) l on l.recipe_id = r.recipe_id
          left join (
            select *, (case 
                  when chef_id not in($1) 
                  then false 
                  else true
                end) actives from bookmarks
            where chef_id = $1
            ) b on b.recipe_id = r.recipe_id
          where f.from_chef_id = $1
          and r.recipe_is_new = false`
          ;

const y = `select r.recipe_id, 
                  r.recipe_name, 
                  r.recipe_image,
                  r.recipe_des, 
                  (select count(likes.recipe_id) from likes where likes.recipe_id = r.recipe_id) recipe_like,
                  COALESCE(l.likeds, false) liked, 
                  COALESCE(b.actives, false) active 
            from recipes r
            left join (
              select *, (case 
                    when chef_id not in($1) 
                    then false 
                    else true
                  end) likeds from likes 
              where chef_id = $1
              ) l on l.recipe_id = r.recipe_id
            left join (
              select *, (case 
                    when chef_id not in($1) 
                    then false 
                    else true
                  end) actives from bookmarks
              where chef_id = $1
              ) b on b.recipe_id = r.recipe_id
            where r.recipe_is_new = false 
            order by recipe_like DESC
            limit 3`;

const z = `select r.recipe_id, 
                  r.recipe_name, 
                  r.recipe_image,
                  r.recipe_des, 
                  (select count(likes.recipe_id) from likes where likes.recipe_id = r.recipe_id) recipe_like,
                  COALESCE(l.likeds, false) liked, 
                  COALESCE(b.actives, false) active 
            from recipes r
            left join (
              select *, (case 
                    when chef_id not in($1) 
                    then false 
                    else true
                  end) likeds from likes 
              where chef_id = $1
              ) l on l.recipe_id = r.recipe_id
            left join (
              select *, (case 
                    when chef_id not in($1) 
                    then false 
                    else true
                  end) actives from bookmarks
              where chef_id = $1
              ) b on b.recipe_id = r.recipe_id
              where r.recipe_is_new = false
            order by r.recipe_created DESC
            limit 3`;
  if ((req.body.value) == 0) {
    db.query(x, [req.body.userID], (err, res0) => {
      if (err) {
        throw(err)
      }
      res.send(convertExplore(res0,0))
    })
  }
  if ((req.body.value) == 1) {
    db.query(y, [req.body.userID],(err, res1) => {
      if (err) {
        throw(err)
      }
      res.send(convertExplore(res1,1))
    })
  }
  if ((req.body.value) == 2) {
    db.query(z, [req.body.userID],(err, res2) => {
      if (err) {
        throw(err)
      }
      res.send(convertExplore(res2,2))
    })
  }
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
    value===0 && res.follow.push(cov);   
    value===1 && res.hot.push(cov); 
    value===2 && res.new.push(cov);
  });
  return res;
}

router.post('/upload', upload.array('image', 1), (req, response) => {
  const qUpload = `insert into snaps values($1, $2, $3, now())`

  const params = [req.body.userID, req.body.id, 'http://localhost:8080/images/' + req.files[0].filename]
  
  db.query(qUpload, params, (err, res) => {
    if (err) throw(err)

    response.json({src: 'http://localhost:8080/images/' + req.files[0].filename})
  })
  
})

router.post('/like', (req, response) => {
  const qLike = `insert into likes (chef_id, recipe_id, liked, like_created_at) 
                  select CAST($2 AS VARCHAR), $1, true, now()
                  where not exists (select 1 from likes where chef_id = $2 and recipe_id = $1)`
  
  const qDislike = 'delete from likes where likes.chef_id = $2 and likes.recipe_id = $1'

  const params = [req.body.id, req.body.userID]

  if (req.body.liked == false)
    db.query(qLike, params, (err, res) => {
      if (err) {
        console.error(err)
        return
      }
        if (res.rowCount == 0) {
          response.json({
            id: null
          })
        } else {
          response.json({id: req.body.id})
        }
    })
  else 
    db.query(qDislike, params, (err, res) => {
      if (err) throw(err)
      if (res.rowCount == 0) {
        response.json({
          id: null
        })
      } else {
        response.json({id: req.body.id})
      }
    })
})

router.post('/bookmark', (req, response) => {
  const qBookmark = `insert into bookmarks (chef_id, recipe_id, active, bookmark_created_at) 
                  select CAST($2 AS VARCHAR), $1, true, now()
                  where not exists (select 1 from bookmarks where chef_id = $2 and recipe_id = $1)`
  
  const qUnbookmark = 'delete from bookmarks where bookmarks.chef_id = $2 and bookmarks.recipe_id = $1'
  
  const params = [req.body.id, req.body.userID]

  

  if (!req.body.did_bookmark) 
    db.query(qBookmark, params, (err, res) => {
      if (err) throw(err)

      console.log(res)

      if (res.rowCount == 0) {
        response.json({
          id: null
        })
      } else {
        response.json({id: req.body.id})
      }
    })
  else 
    db.query(qUnbookmark, params, (err, res) => {
      if (err) throw(err)

      if (res.rowCount == 0) {
        response.json({
          id: null
        })
      } else {
        response.json({id: req.body.id})
      }
    })
  
})

router.post('/comment', (req, response) => {
  const qComment= 'insert into comments values($2, $1, $3, now())'

  const params = [req.body.id, req.body.userID, req.body.text]

  console.log(req.body)

  db.query(qComment, params, (err, res) => {
    if (err) throw(err) 

    response.json({
      text: req.body.text,
    })
  })
})

router.post('/login', (req, response) => {
  const qNewRecipe = `insert into chefs (chef_id, chef_name, chef_pic, created_at) 
                      select CAST($1 AS VARCHAR), $2, $3, now()
                      where not exists (select 1 from chefs where chef_id = $1 )`
  
  const qNew = `select recipe_id from recipes 
                where recipe_is_new = true and chef_id = $1`

  const params = [req.body.user.userID, req.body.user.name, req.body.user.picture]

  console.log(req.body)

  db.query(qNewRecipe, params, (err, res) => {
    if (err) console.log(err)
    
    if (res.rowCount == 1) {
      db.query(`insert into recipes(chef_id, recipe_is_new) values($1, true)`, [req.body.user.userID])
        .then(res => {
          db.query(qNew, [req.body.user.userID], (err, res) => {
            if (err) console.error(err)
    
            response.json({id: res.rows[0]})
          })
        })
      }
    else
      db.query(qNew, [req.body.user.userID], (err, res) => {
        if (err) console.error(err)

        response.json({id: res.rows[0].recipe_id})
      })
    
  })
})

router.post('/edit', (req, response) => {
  const qEdit = `select r.recipe_id, r.recipe_name, r.recipe_des, r.recipe_image 
                  from recipes r 
                  left join made_from m on m.recipe_id = r.recipe_id
                  left join ingredients i on i.ingredient_id = m.ingredient_id
                  left join step s on r.recipe_id = s.recipe_id
                  where r.recipe_id = $1 and r.chef_id = $2`

  const params = [req.body.id, req.body.userID]

  db.query(qEdit, params)
    .then(res => {
      
    })
    .catch(err => console.error(err))

})



router.post('/edit/recipe', (req, response) => {
  const qRecipe = `select r.recipe_id, r.recipe_name, r.recipe_des, r.recipe_image, r.recipe_created
                    from recipes r
                    where r.recipe_id = $1`;

  const newQRecipe = `select r.recipe_id, 
                        r.recipe_name, 
                        r.recipe_image,
                        r.recipe_des, 
                        r.recipe_created
                        from recipes r
                      where r.recipe_id = $1`;

  const params = [req.body.id]
  console.log(req.body.id)
  db.query(newQRecipe, params, (err, res) => {
    if (err) throw(err)
    response.json({
      id: res.rows[0].recipe_id,
      name:  res.rows[0].recipe_name,
      description: res.rows[0].recipe_des,
      picture: res.rows[0].recipe_image,
      created_at: res.rows[0].recipe_created,
    })
  })
})

router.post('/edit/ingredients', (req, response) => {
  const qIngredients = `select i.ingredient from ingredients i
                        where i.recipe_id = $1`;
  const params = [req.body.id.toString()] 

  db.query(qIngredients, params, (err, res) => {
    if (err) return next(err)
    response.json(
      res.rows.map((row) => {
        return row['ingredient']
      })
    )
  })
})

router.post('/edit/steps', (req, response) => {
  const qSteps = `select s.index, s.text, i.image_src
                  from steps s
                  left join images i on i.index = s.index and i.recipe_id = s.recipe_id
                  where s.recipe_id = $1 `;
  const params = [req.body.id] 

  db.query(qSteps, params, (err, res) => {
    if (err) console.error(err)
    response.json(
      stepsParser(res.rows)
    )
  })
})

router.post('/buffer', upload.array('image', 1), (req, response) => {
  
    response.json({src: 'http://localhost:8080/images/' + req.files[0].filename})
  
})


router.post('/submit', (req, response) => {
  const qSubmitRecipe =  `update recipes 
                          set recipe_name = $2,
                              recipe_created = now(),
                              recipe_is_new = false,
                              recipe_image = $3,
                              recipe_des = $4
                          where recipe_id = $1`
  const qSubmitIngredients = `insert into ingredients(recipe_id, ingredient)
                              values($1,$2)`
  
  const qSubmitSteps = `insert into steps(recipe_id, index, text)
                        values($1, $2, $3)`

  const qSubmitImages = `insert into images
                          values($1, $2, $3, now())`
  const qNew = `insert into recipes(chef_id, recipe_is_new) values($1, true)`

  db.query(qSubmitRecipe, [req.body.id, req.body.name, req.body.picture, req.body.description])
    .then(res => {
      db.query(qNew, [req.body.userID])

    })
    .catch(err => {
      console.error(err)
    })
 

  req.body.ingredients.map((ingredient => {
    db.query(qSubmitIngredients, [req.body.id, ingredient])
      .then(res => {

      })
      .catch(err => {
        console.error(err)
      })
  })) 

  req.body.steps.map(((step, index) => {
    db.query(qSubmitSteps, [req.body.id, index+1, step.text])
      .then(res => {

      })
      .catch(err => {
        console.error(err)
      })

    step.images.map((image) => {
      if (image != '') {
        db.query(qSubmitImages, [req.body.id, index+1, image])
          .then(res => {

          })
          .catch(err => {
            console.error(err)
          })
      } 
    })
  })) 

  response.json({isSubmitted: true})
  
})


router.post('/chef/profile', (req, response) => {
  const qProfile = `select * from chefs where chef_id = $1`

  const params = [req.body.chef_id]

  console.log(req.body)

  db.query(qProfile, params)
    .then(res => {
      response.json({
        id: res.rows[0].chef_id,
        picture:  res.rows[0].chef_pic,
        name:  res.rows[0].chef_name,
        created_at:  res.rows[0].created_at
      })
    })
    .catch(err => {
      console.error(err.stack)
    })
})

router.post('')