import {
  LIKE,
  BOOKMARK,
  FOLLOW,
  CHEF,
  CHEF_PROFILE
} from '../constants/ActionTypes'

const initialStae = {
  chef: {
    id: null,
    name: "",
    description: "",
    followed: false,
    picture: ""
  },
  recipes: [
    {
      id: 6,
      name: 'Bánh Mật Hoa Dâm Bụt',
      description: '4151 Calo, Khó ăn dễ nấu',
      image: '/resource/pictures/6.jpg',
      hearts: 0,
      liked: false,
      bookmark: false,
    },
    {
      id: 7,
      name: 'Chưa đặt tên',
      description: '2656 Calo, Dễ nấu - Dễ ăn - Dễ Tiêu - Dễ Thải',
      image: '/resource/pictures/7.jpg',
      hearts: 0,
      liked: false,
      bookmark: false,
    },
    {
      id: 8,
      name: 'Mì Italy',
      description: '123 Calo, Cùng Shopee pipipi',
      image: '/resource/pictures/8.jpg',
      hearts: 0,
      liked: false,
      bookmark: false,
    },
    {
      id: 9,
      name: 'Bánh mì Chảo - Không bánh',
      description: '111 Calo, Sale 91%',
      image: '/resource/pictures/9.jpg',
      hearts: 0,
      liked: false,
      bookmark: false,
    }
  ],
  snaps: [
    {
      id: null,
      recipe_id: 3,
      src: "https://i.ytimg.com/vi/hYvkSHYh_WQ/hqdefault.jpg"
    },
    {
      id: null,
      recipe_id: 4,
      src: "https://us.hola.com/en/imagenes/lifestyle/2017120810920/russian-girl-most-beautiful-in-world/0-17-240/anastasia-most-beautiful-t.jpg"
    },
    {
      id: null,
      recipe_id: 5,
      src: "http://sohanews.sohacdn.com/thumb_w/660/2017/photo-4-1509012560460-0-0-409-660-crop-1509012656515.jpg"
    },
    {
      id: null,
      recipe_id: 6,
      src: "https://ichef.bbci.co.uk/news/660/cpsprodpb/43A3/production/_103051371_hannahmackenzie.jpg"
    },
    {
      id: null,
      recipe_id: 7,
      src: "https://ichef.bbci.co.uk/news/660/cpsprodpb/43A3/production/_103051371_hannahmackenzie.jpg"
    },
    {
      id: null,
      recipe_id: 8,
      src: "http://imgt.taimienphi.vn/cf/Images/tt/2018/4/24/hinh-anh-anime-dep-2.jpg"
    },
  ],
  bookmarks: [
    {
      id: 7,
      name: 'Chưa đặt tên',
      description: '2656 Calo, Dễ nấu - Dễ ăn - Dễ Tiêu - Dễ Thải',
      image: '/resource/pictures/7.jpg',
      hearts: 0,
      liked: false,
      bookmark: false,
    },
    {
      id: 8,
      name: 'Mì Italy',
      description: '123 Calo, Cùng Shopee pipipi',
      image: '/resource/pictures/8.jpg',
      hearts: 0,
      liked: false,
      bookmark: false,
    },
    {
      id: 9,
      name: 'Bánh mì Chảo - Không bánh',
      description: '111 Calo, Sale 91%',
      image: '/resource/pictures/9.jpg',
      hearts: 0,
      liked: false,
      bookmark: false,
    }
  ],
}

export default function dish(state = initialStae, action) {
  switch (action.type) {
    case LIKE:
      return {
        ...state,
        recipes: state.recipes.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            liked: !recipe.liked,
            hearts: recipe.liked === true ? recipe.hearts-1 : recipe.hearts+1,
          } : recipe
        ))
      }
    case BOOKMARK:
      return {
        ...state,
        recipes: state.recipes.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            bookmark: !recipe.bookmark
          } : recipe
        ))
      }
    case FOLLOW: 
      return {
        ...state,
        chef: {
          ...state.chef,
          followed: !state.chef.followed
        }
      }
    case CHEF:
      return action.payload

    case CHEF_PROFILE: 
      console.log(action.payload)
      return {
        ...state,
        chef: {
          ...state.chef,
          id: action.payload.id,
          name: action.payload.name,
          picture: action.payload.picture,
        }
        
      }
    default:
      return state
  }
}