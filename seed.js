const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Function to generate random number between 1 and 1000
  function getRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  // Function to generate user image URL
  function getUserImageUrl() {
    return `https://picsum.photos/seed/${getRandomNumber()}/200/`;
  }

  // Delete all existing data
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();
  await prisma.room.deleteMany();

  // Realistic names and emails
  const usersData = [
    { name: "John", surname: "Doe", email: "john.doe@example.com" },
    { name: "Alice", surname: "Smith", email: "alice.smith@example.com" },
    { name: "Bob", surname: "Johnson", email: "bob.johnson@example.com" },
    { name: "Emma", surname: "Brown", email: "emma.brown@example.com" },
    { name: "Michael", surname: "Davis", email: "michael.davis@example.com" },
    { name: "Sarah", surname: "Miller", email: "sarah.miller@example.com" },
    { name: "David", surname: "Wilson", email: "david.wilson@example.com" },
    { name: "Jennifer", surname: "Moore", email: "jennifer.moore@example.com" },
    { name: "James", surname: "Taylor", email: "james.taylor@example.com" },
    { name: "Emily", surname: "Anderson", email: "emily.anderson@example.com" },
  ];

  // Create users
  const users = [];
  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        pwhash: "password123",
        image: getUserImageUrl(),
      },
    });
    users.push(user);
  }

  // Create rooms
  const roomsData = [
    { name: "General", description: "General discussion room" },
    { name: "Random", description: "Random topics room" },
    { name: "Tech Talk", description: "Discussion about technology" },
    { name: "Music Lovers", description: "Share your favorite music" },
    { name: "Book Club", description: "Discuss books and literature" },
  ];

  const rooms = [];
  for (const roomData of roomsData) {
    const room = await prisma.room.create({
      data: {
        name: roomData.name,
        description: roomData.description,
        image: `https://picsum.photos/seed/${getRandomNumber()}/200/`,
      },
    });
    rooms.push(room);
  }

  // Realistic conversations
  const conversations = [
    { roomIndex: 0, content: "Hello everyone!" },
    { roomIndex: 1, content: "Any plans for the weekend?" },
    { roomIndex: 2, content: "Did you hear about the new iPhone?" },
    { roomIndex: 3, content: "What is your favorite genre of music?" },
    { roomIndex: 4, content: "I just finished reading a great book!" },
  ];

  for (const conv of conversations) {
    await prisma.message.create({
      data: {
        content: conv.content,
        timestamp: new Date(),
        room: {
          connect: { id: rooms[conv.roomIndex].id },
        },
        user: {
          connect: { id: users[Math.floor(Math.random() * users.length)].id },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
