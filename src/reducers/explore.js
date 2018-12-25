import {
  LIKE,
  EXPLORE,
  BOOKMARK
} from '../constants/ActionTypes'

// {
//   id: 6,
//   name: 'Bánh Mật Hoa Dâm Bụt',
//   description: '4151 Calo, Khó ăn dễ nấu',
//   image: '/resource/pictures/6.jpg',
//   hearts: 0,
//   liked: false,
//   bookmark: false,
// },

const initialState = {
  didMount: false,
  follow:  [
  ],
  hot: [
  ],
  new: [
  ]
}

let concatAndDeDuplicateObjectsDeep = (p, ...arrs) => [ ...new Set( [].concat(...arrs).map(a => JSON.stringify(a)) ) ].map(a => JSON.parse(a))


export default function explore(state = initialState, action) {
  switch (action.type) {
    case LIKE:
      return {
        ...state,
        follow: state.follow.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            liked: !recipe.liked,
            hearts: recipe.liked === true ? recipe.hearts-1 : recipe.hearts+1,
          } : recipe
        )),
        hot: state.hot.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            liked: !recipe.liked,
            hearts: recipe.liked === true ? recipe.hearts-1 : recipe.hearts+1,
          } : recipe
        )),
        new: state.new.map(recipe => (
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
        follow: state.follow.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            bookmark: !recipe.bookmark
          } : recipe
        )),
        hot: state.hot.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            bookmark: !recipe.bookmark
          } : recipe
        )),
        new: state.new.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            bookmark: !recipe.bookmark
          } : recipe
        ))
      }
    case EXPLORE:
      return {
        ...state,
        follow: concatAndDeDuplicateObjectsDeep('id', state.follow, action.payload.follow),
        hot: concatAndDeDuplicateObjectsDeep('id', state.hot, action.payload.hot),
        new: concatAndDeDuplicateObjectsDeep('id', state.new, action.payload.new)
      }
    default:
      return state
  }
}