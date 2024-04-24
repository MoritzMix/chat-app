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
    { name: "John", email: "john.doe@example.com" },
    { name: "Alice", email: "alice.smith@example.com" },
    { name: "Bob", email: "bob.johnson@example.com" },
    { name: "Emma", email: "emma.brown@example.com" },
    { name: "Michael", email: "michael.davis@example.com" },
    { name: "Sarah", email: "sarah.miller@example.com" },
    { name: "David", email: "david.wilson@example.com" },
    { name: "Jennifer", email: "jennifer.moore@example.com" },
    { name: "James", email: "james.taylor@example.com" },
    { name: "Emily", email: "emily.anderson@example.com" },
  ];

  // Create users
  const users = [];
  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
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
    // General room
    [
      "Hello everyone!",
      "What do you think about the latest news?",
      "Has anyone tried the new restaurant in town?",
      "I need some advice on buying a new laptop. Any recommendations?",
      "Check out this funny video I found!",
      "Do you prefer tea or coffee in the morning?",
      "I just finished watching a great movie. Highly recommend it!",
      "Is anyone interested in going hiking this weekend?",
      "I can't believe it's already Friday!",
      "I have a question about JavaScript. Can anyone help me?",
    ],
    // Random room
    [
      "What's your favorite color?",
      "Does anyone have a good recipe for spaghetti carbonara?",
      "I just adopted a new pet. Meet my adorable kitten!",
      "Anyone else excited about the upcoming game release?",
      "Let's share some interesting facts!",
      "What's the best vacation you've ever been on?",
      "I'm looking for a good book to read. Any suggestions?",
      "Has anyone tried meditation? I'm thinking of giving it a try.",
      "What are your thoughts on artificial intelligence?",
      "Let's talk about our favorite childhood memories.",
    ],
    // Tech Talk room
    [
      "What programming languages do you know?",
      "Have you heard about the latest iPhone features?",
      "I'm struggling with CSS. Any tips for improving my skills?",
      "Let's discuss the future of self-driving cars.",
      "Has anyone attended any interesting tech conferences lately?",
      "What's your favorite coding project you've worked on?",
      "Can anyone recommend a good coding bootcamp?",
      "I'm curious about blockchain technology. Can someone explain it to me?",
      "Let's share our favorite tech gadgets!",
      "I just launched my first website. Check it out and give me feedback!",
    ],
    // Music Lovers room
    [
      "What genre of music do you listen to the most?",
      "I discovered a new band recently. They're amazing!",
      "Let's create a playlist of our favorite songs.",
      "Does music help you concentrate when you're working?",
      "I play the guitar. Anyone else here play a musical instrument?",
      "What's the best concert you've ever been to?",
      "I'm looking for new music recommendations. Share your favorites!",
      "Let's talk about the evolution of music over the years.",
      "Music is a universal language. It brings people together.",
      "Who is your all-time favorite artist?",
    ],
    // Book Club room
    [
      "What book are you currently reading?",
      "I love getting lost in a good book.",
      "Let's start a book club and discuss our favorite novels.",
      "Has anyone read any Pulitzer Prize-winning books?",
      "What's the last book that made you cry?",
      "I'm a huge fan of fantasy novels. What's your favorite genre?",
      "I can't wait for the next book in my favorite series to come out!",
      "Let's share our favorite quotes from books.",
      "Books have the power to change lives. Let's talk about the books that have impacted us.",
      "I believe everyone should read this book at least once in their lifetime.",
    ],
  ];

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const roomConversations = conversations[i];
    const numMessages = Math.floor(Math.random() * 6) + 5; // Generate 5 to 10 messages per room
    for (let j = 0; j < numMessages; j++) {
      const messageContent =
        roomConversations[Math.floor(Math.random() * roomConversations.length)];
      await prisma.message.create({
        data: {
          content: messageContent,
          timestamp: new Date(),
          room: {
            connect: { id: room.id },
          },
          user: {
            connect: { id: users[Math.floor(Math.random() * users.length)].id },
          },
        },
      });
    }
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
