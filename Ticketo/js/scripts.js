export const Movies = [
  {
    id: generateUUID(),
    name: "Avengers : Infinity War",
    image: "image/1.webp",
    date: [
      {
        date: "8/7/2024 14:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/11/2024 16:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/21/2024 18:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
    ],
  },
  {
    id: generateUUID(),
    name: "Avengers : EndGame",
    image: "image/2.webp",
    date: [
      {
        date: "8/7/2024 15:30",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/20/2024 17:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/30/2024 19:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
    ],
  },
  {
    id: generateUUID(),
    name: "Fall",
    image: "image/3.webp",
    date: [
      {
        date: "8/7/2024 13:45",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/10/2024 18:30",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/22/2024 20:15",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
    ],
  },
  {
    id: generateUUID(),
    name: "The Lord of the Rings: The Rings of Power",
    image: "image/4.webp",
    date: [
      {
        date: "8/7/2024 12:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/8/2024 16:30",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/9/2024 18:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
    ],
  },
  {
    id: generateUUID(),
    name: "The Lord of the Rings: The Two Towers",
    image: "image/5.webp",
    date: [
      {
        date: "8/7/2024 10:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/25/2024 15:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/28/2024 17:45",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
    ],
  },
  {
    id: generateUUID(),
    name: "The Lord of the Rings: The Return of the King",
    image: "image/6.webp",
    date: [
      {
        date: "8/7/2024 11:15",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/8/2024 14:30",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/16/2024 19:30",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
    ],
  },
  {
    id: generateUUID(),
    name: "Thor: Ragnarok",
    image: "image/7.webp",
    date: [
      {
        date: "8/7/2024 13:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/11/2024 16:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/20/2024 14:15",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
    ],
  },
  {
    id: generateUUID(),
    name: "Thor: The Dark World",
    image: "image/8.webp",
    date: [
      {
        date: "8/7/2024 12:45",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/12/2024 15:30",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
      {
        date: "8/18/2024 20:00",
        chairs: Array.from({ length: 100 }, (_, index) => index + 1),
      },
    ],
  },
];

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export const userReservation = [];
