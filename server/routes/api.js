// api.js
var express = require('express')
var router = express.Router()

const db = require('../db')

module.exports = router

// TODO 

router.get('/', (req, res) => {
  console.log('noop')
  res.send('noop')
})

router.get('/test' ,(req, res) => {
  if (req.hihi = 'test') {
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
    
    res.send(cards)
  }
})

