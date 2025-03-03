import { Boss } from '@/types/game';

export const bossList: Boss[] = [
  {
    id: 1,
    name: 'Blazing Titan',
    health: 60,
    attack: 10,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740556979/TCG%20Battle%20Adventure/z6354126054525_2ad806dc0b05292389e3814fd4a52b4b_hdltr9.jpg',
    class: ['FIRE', 'EARTH'],
    description:
      'Quái vật khổng lồ với cơ thể rực lửa và lớp vỏ đá cứng, tấn công bằng những đợt phun trào dung nham.',
  },
  {
    id: 2,
    name: 'Frost Leviathan',
    health: 90,
    attack: 12,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740556978/TCG%20Battle%20Adventure/z6354127462033_6522a713b85733977e587a86db918449_ecvusk.jpg',
    class: ['WATER', 'METAL'],
    description:
      'Một con rắn biển khổng lồ với lớp vảy kim loại băng giá, có khả năng đóng băng mọi thứ xung quanh.',
  },
  {
    id: 3,
    name: 'Verdant Inferno',
    health: 100,
    attack: 14,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740556978/TCG%20Battle%20Adventure/z6354126054382_4bcfc92da6d1c2a8317d54a0c40d3815_mxqnxq.jpg',
    class: ['WOOD', 'FIRE'],
    description:
      'Sinh vật rừng sâu với cơ thể kết hợp giữa cây cối và ngọn lửa cháy rừng, gây sát thương diện rộng.',
  },
  {
    id: 4,
    name: 'Iron Storm Drake',
    health: 85,
    attack: 11,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740556977/TCG%20Battle%20Adventure/z6354126035445_4e24d6074dd8af1d7f2cfe8ba6ee3279_qp0iux.jpg',
    class: ['METAL', 'WATER'],
    description:
      'Rồng bọc thép với khả năng triệu hồi bão tố, kết hợp sức mạnh kim loại và nước.',
  },
  {
    id: 5,
    name: 'Ember Root Behemoth',
    health: 95,
    attack: 13,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740556977/TCG%20Battle%20Adventure/z6354126460479_d294b8588d9bf0ec4599a7ca75036b4f_lwotj7.jpg',
    class: ['FIRE', 'WOOD'],
    description:
      'Quái thú khổng lồ với rễ cây cháy âm ỉ, có sức bền và khả năng tấn công dữ dội.',
  },
  {
    id: 6,
    name: 'Abyssal Stone Lord',
    health: 110,
    attack: 15,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740556977/TCG%20Battle%20Adventure/z6354126007751_4e9ead0f3b3db2b7d40e494a59521368_aosny8.jpg',
    class: ['EARTH', 'METAL'],
    description:
      'Chúa tể đá từ vực sâu, với lớp giáp kim loại không thể xuyên thủng và sức mạnh hủy diệt.',
  },
];
