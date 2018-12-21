import {
  LIKE,
  COMMENT,
  BOOKMARK,
  DISH,
} from '../constants/ActionTypes'

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
    "",
    ""
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
      return state
    case BOOKMARK:
      return state
    case COMMENT:
      return state
    case DISH:
      return action.payload
    default:
      return state
  }
}