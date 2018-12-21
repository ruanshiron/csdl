import {
  LIKE,
  EXPLORE,
  BOOKMARK
} from '../constants/ActionTypes'

const initialState = {
  follow:  [
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
  hot: [
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
  new: [
    {
      id: 9,
      name: 'Bánh mì Chảo - Không bánh',
      description: '111 Calo, Sale 91%',
      image: '/resource/pictures/9.jpg',
      hearts: 0,
      liked: false,
      bookmark: false,
    }
  ]
}

let concatAndDeDuplicateObjectsDeep = (p, ...arrs) => [ ...new Set( [].concat(...arrs).map(a => JSON.stringify(a)) ) ].map(a => JSON.parse(a))


export default function explore(state = initialState, action) {
  switch (action.type) {
    case LIKE:
      console.log('LIKE ID: ' + action.id)
      return {
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
      console.log('BOOKMARD ID: ' + action.id)
      return {
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
        follow: concatAndDeDuplicateObjectsDeep('id', state.follow, action.payload),
        hot: concatAndDeDuplicateObjectsDeep('id', state.hot, action.payload),
        new: concatAndDeDuplicateObjectsDeep('id', state.new, action.payload)
      }
    default:
      return state
  }
}