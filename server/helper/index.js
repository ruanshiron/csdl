export default stepsParser = (data) => {
  var res = {}
  data.map(item=>{
    if (res[item.index] === undefined) 
      res[item.index] = {text: item.text, images: [item.image_src]}
    else
      res[item.index].images.push(item.image_src)
  })
  return res
}

export default convertExplore = (rest,value ) =>{
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