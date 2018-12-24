import {
  LIKE,
  COMMENT,
  BOOKMARK,
  DISH,
  FOLLOW,
} from '../constants/ActionTypes'

const initialStae = {
  recipe: {
    id: 1,
    name:"Món non",
    description: "cho mọi người, mọi gia đìn, mọi lứa tuổi",
    picture: "https://cdn.pose.com.vn/assets/2018/09/nancy2.jpg",
    ingredients: [
      "Thịt nạc",
      "Thịt mỡ",
      "Xôi",
      "Gạo lứt"
    ],
    steps: [
      {
        text: "đun sôi nước nóng aldkfk ldlk flak",
        images: [
          "https://pbs.twimg.com/profile_images/748953502970441728/5cVwlxPU_400x400.jpg",
          "https://image.dhgate.com/0x0/f2/albu/g4/M00/46/8B/rBVaEFdXeY-AVdYyAAJ8WYBS9mE880.jpg",

        ]
      },
      {
        text: "Để nguội nước lã",
        images: [
          "https://i.pinimg.com/originals/8a/75/36/8a7536255580a91b60eea8e6e2bc2fe3.jpg",
        ]
      },
      {
        text: "Không làm gì ả",
        images: []
      }
    ],
    created_at: "",
    chef: {
      id: 123321312,
      name: "Nancy",
      picture: "https://i.pinimg.com/originals/4a/5b/2e/4a5b2e54af1a42287e7d0af80fdc60c3.jpg",
      followed: true
    },
    liked: false,
    did_bookmark: false,
    hearts: 31,
  },
  snaps: [
    {
      id: null,
      chef_id: 3,
      src: "https://i.ytimg.com/vi/hYvkSHYh_WQ/hqdefault.jpg"
    },
    {
      id: null,
      chef_id: 4,
      src: "https://us.hola.com/en/imagenes/lifestyle/2017120810920/russian-girl-most-beautiful-in-world/0-17-240/anastasia-most-beautiful-t.jpg"
    },
    {
      id: null,
      chef_id: 5,
      src: "http://sohanews.sohacdn.com/thumb_w/660/2017/photo-4-1509012560460-0-0-409-660-crop-1509012656515.jpg"
    },
    {
      id: null,
      chef_id: 6,
      src: "https://ichef.bbci.co.uk/news/660/cpsprodpb/43A3/production/_103051371_hannahmackenzie.jpg"
    },
    {
      id: null,
      chef_id: 7,
      src: "https://ichef.bbci.co.uk/news/660/cpsprodpb/43A3/production/_103051371_hannahmackenzie.jpg"
    },
    {
      id: null,
      chef_id: 8,
      src: "http://imgt.taimienphi.vn/cf/Images/tt/2018/4/24/hinh-anh-anime-dep-2.jpg"
    },
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
 
export default function dish(state = initialStae, action) {
  switch (action.type) {
    case LIKE:
      return {
        ...state,
        recipe: state.recipe.id !== action.id ? state.recipe :
          {
            ...state.recipe,
            liked: !state.recipe.liked,
            hearts: !state.recipe.liked === true? state.recipe.hearts+1 : state.recipe.hearts-1,
          }
      }
    case BOOKMARK:
      return {
        ...state,
        recipe: state.recipe.id !== action.id ? state.recipe :
          {
            ...state.recipe,
            did_bookmark: !state.recipe.did_bookmark,
          }
      }
    case FOLLOW: 
      return {
        ...state,
        recipe:
          {
            ...state.recipe,
            chef: {
              ...state.recipe.chef,
              followed: !state.recipe.chef.followed,
            }
          }
      }
    case COMMENT:
      return {
        ...state,
        comments: [
          {chef: {id: null, picture:"https://img-global.cpcdn.com/005_steps/ff1a4f8e0519f866/480x360cq70/photo.jpg"}, text: action.text, created_at: Date()},
          ...state.comments,
        ]
      }
    case DISH:
      return action.payload
    default:
      return state
  }
}