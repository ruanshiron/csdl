import {
  LIKE_RECIPE,
  EXPLORE_MORE_RECIPE,
  BOOKMARK_RECIPE
} from '../constants/ActionTypes'

const initialState = [
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
]

const cards = [
  {
    id: 1,
    name: 'Tỏi Nướng',
    description: '236 Calo, Tốt cho sức khỏe',
    image: '/resource/pictures/hqdefault.jpg',
    hearts: 0,
    liked: false,
    bookmark: false,
  }, 
  {
    id: 2,
    name: 'Cà rốt xào chân rết',
    description: '1000 Calo, Ngon bổ rẻ',
    image: '/resource/pictures/2.jpg',
    hearts: 0,
    liked: false,
    bookmark: false,
  },
  {
    id: 3,
    name: 'Thịt Nướng Bóng Đêm',
    description: '23121 Calo, Ăn vào có người yêu',
    image: '/resource/pictures/3.jpg',
    hearts: 0,
    liked: false,
    bookmark: false,
  },
  {
    id: 4,
    name: 'Bánh Nướng Ban đêm',
    description: '414 Calo, Thức ăn cho vua chúa',
    image: '/resource/pictures/4.jpg',
    hearts: 0,
    liked: false,
    bookmark: false,
  },
  {
    id: 5,
    name: 'Ăn cả bàn',
    description: '1212 Calo, Không thể ăn',
    image: '/resource/pictures/5.jpg',
    hearts: 0,
    liked: false,
    bookmark: false,
  },
]

let concatAndDeDuplicateObjectsDeep = (p, ...arrs) => [ ...new Set( [].concat(...arrs).map(a => JSON.stringify(a)) ) ].map(a => JSON.parse(a))


export default function recipes(state = cards, action) {
  switch (action.type) {
    case LIKE_RECIPE:
      console.log('LIKE ID: ' + action.id)
      return state.map(recipe => (
        recipe.id === action.id ?
        {
          ...recipe,
          liked: !recipe.liked,
          hearts: recipe.liked === true ? recipe.hearts-1 : recipe.hearts+1,
        } : recipe
      ))
    case BOOKMARK_RECIPE:
      console.log('BOOKMARD ID: ' + action.id)
      return state.map(recipe => (
        recipe.id === action.id ?
        {
          ...recipe,
          bookmark: !recipe.bookmark
        } : recipe
      ))
    case EXPLORE_MORE_RECIPE:
      return concatAndDeDuplicateObjectsDeep('id', state, initialState)
    default:
      return state
  }
}