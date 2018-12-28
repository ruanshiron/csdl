import * as types from '../constants/ActionTypes'
import axios from 'axios'

const API = 'http://localhost:8080/api/'


export const facebookLogin = (user) => ({type: types.FACEBOOK_LOGIN, user})

export const tapMessage = (id) => ({type: types.TAP_MESSAGE, id})

export const like = (id) => ({type: types.LIKE, id})
export const bookmark = (id) => ({type: types.BOOKMARK, id})
export const comment = (data) => ({type: types.COMMENT, data})

export const follow = (targetID) => ({type: types.FOLLOW, targetID})

export const post = (data) => ({type: types.POST, data})

export const snap = (data) => ({type: types.SNAP, data})

export const explore = (data) => ({
  type: types.EXPLORE, 
  payload: data
})

export const dish = (data) => ({
  type: types.DISH,
  payload: data
})

export const chef = (data) => ({
  type: types.CHEF,
  payload: data
})

export const edit = (data) => ({
  type: types.EDIT,
  payload: data
})

export const submit = (data) => ({
  type: types.SUBMIT,
  payload: data
})

export const dishRecipe = (data) => ({
  type: types.DISH_RECIPE,
  payload: data
})

export const dishIngredients = (data) => ({
  type: types.DISH_INGREDIENTS,
  payload: data
})

export const dishSteps = (data) => ({
  type: types.DISH_STEPS,
  payload: data
})

export const dishChef = (data) => ({
  type: types.DISH_CHEF,
  payload: data
})

export const dishSnaps = (data) => ({
  type: types.DISH_SNAPS,
  payload: data
})

export const dishComments = (data) => ({
  type: types.DISH_COMMENTS,
  payload: data
})

export const editRecipe = (data) => ({
  type: types.EDIT_RECIPE,
  payload: data
})

export const editIngredients = (data) => ({
  type: types.EDIT_INGREDIENTS,
  payload: data
})

export const editSteps = (data) => ({
  type: types.EDIT_STEPS,
  payload: data
})

export const editImage = (data) => ({
  type: types.EDIT_IMAGE,
  payload: data
})

export const chefProfile = (data) => ({
  type: types.CHEF_PROFILE,
  payload: data
})
//API FETCHER

export const fetchExplore = (data) => {
  return (dispatch) => {
    return axios.post(API + 'explore', data)
      .then((response) => {
        dispatch(explore(response.data))
      })
      .catch((err) => {
        throw(err)
      })
    }
}

export const fetchDish = (data) => {
  return (dispath) => {
    return axios.post(API + 'dish', {data})
      .then(response => {
        dispath(dish(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchChef = (data) => {
  return (dispath) => {
    return axios.post(API + 'chef', {data})
      .then(response => {
        dispath(chef(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchEdit = (data) => {
  return (dispath) => {
    return axios.post(API + 'edit', {data})
      .then(response => {
        dispath(edit(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchLike = (id, userID, liked) => {
  return (dispath) => {
    return axios.post(API + 'like', {id, userID, liked})
      .then(response => {
        dispath(like(response.data.id))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchBookmark = (id, userID, did_bookmark) => {
  return (dispath) => {
    return axios.post(API + 'bookmark', {id, userID, did_bookmark: did_bookmark})
      .then(response => {
        dispath(bookmark(response.data.id))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchFollow = (data) => {
  return (dispath) => {
    return axios.post(API + 'follow', {data})
      .then(response => {
        dispath(follow(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}


export const fetchComment = (id, user, text) => {
  return (dispath) => {
    return axios.post(API + 'comment', {id, userID: user.userID, text: text})
      .then(response => {
        dispath(comment({text: response.data.text, chef: {id: user.userID, picture: user.picture}}))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchPost = (data) => {
  return (dispath) => {
    return axios.post(API + 'post', {data})
      .then(response => {
        dispath(comment(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchUploadImage = (data) => {
  return (dispath) => {
    return axios.post(API + 'upload', data)
      .then(response => {
        console.log(response.data)
        dispath(snap(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchDishRecipe = (id, userID) => {
  return (dispath) => {
    return axios.post(API + 'dish/recipe', {id, userID})
      .then(response => {
        dispath(dishRecipe(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchDishIngredients = (id) => {
  return (dispath) => {
    return axios.post(API + 'dish/ingredients', {id})
      .then(response => {
        dispath(dishIngredients(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchDishSteps = (id) => {
  return (dispath) => {
    return axios.post(API + 'dish/steps', {id})
      .then(response => {
        dispath(dishSteps(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchDishChef = (id, userID) => {
  return (dispath) => {
    return axios.post(API + 'dish/chef', {id, userID})
      .then(response => {
        console.log({data: response.data, userID})
        dispath(dishChef({data: response.data, userID}))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchDishSnaps = (id) => {
  return (dispath) => {
    return axios.post(API + 'dish/snaps', {id})
      .then(response => {
        dispath(dishSnaps(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchDishComments = (id) => {
  return (dispath) => {
    return axios.post(API + 'dish/comments', {id})
      .then(response => {
        dispath(dishComments(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchLogin = (user) => {
  return (dispath) => { 
    return axios.post(API + 'login', {user: user})
    .then(response => { 
      dispath(facebookLogin({...user, new_id: response.data.id}))
    })
    .catch(err => {
      throw(err)
    })
  }
}

export const fetchEditRecipe = (id) => {
  return (dispath) => {
    return axios.post(API + 'edit/recipe', {id})
      .then(response => {
        dispath(editRecipe(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchEditIngredients = (id) => {
  return (dispath) => {
    return axios.post(API + 'edit/ingredients', {id})
      .then(response => {
        dispath(editIngredients(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchEditSteps = (id) => {
  return (dispath) => {
    return axios.post(API + 'edit/steps', {id})
      .then(response => {
        dispath(editSteps(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchUploadBuffer = (data, type) => {
  return (dispath) => {
    return axios.post(API + 'buffer', data)
      .then(response => {
        console.log({...response.data, type})
        dispath(editImage({...response.data, type}))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchSubmit = (data) => {
  return (dispath) => {
    return axios.post(API + 'submit', data)
      .then(response => {
        dispath(submit(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchChefProfile = (chef_id) => {
  return (dispath) => {
    return axios.post(API + 'chef/profile', {chef_id})
      .then(response => {
        dispath(chefProfile(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}