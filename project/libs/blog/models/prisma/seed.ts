import { PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

const PostTypes = {
  Video: 'VIDEO',
  Text: 'TEXT',
  Quote: 'QUOTE',
  Photo: 'PHOTO',
  Link: 'LINK',
} as const;

const tags = ['computers', 'cats'];

function getTags() {
  return [{ name: tags[0] }, { name: tags[1] }];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: PostTypes.Quote,
      content:
        '{ "quote": "Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.", "quoteAuthor": "Sir Albert Einstein" }',
      authorId: FIRST_USER_ID,
      tags: {
        connect: [{ name: tags[0] }, { name: tags[1] }],
      },
    },
    {
      id: SECOND_POST_UUID,
      type: PostTypes.Video,
      content:
        '{ "title": "Event loop", "url": "https://www.youtube.com/watch?v=cCOL7MC4Pl0" }',
      authorId: FIRST_USER_ID,
      comments: [
        {
          text: 'Very interesting.',
          authorId: FIRST_USER_ID,
        },
        {
          text: 'Jake Archibald rocks!',
          authorId: SECOND_USER_ID,
        },
      ],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: {
        name: tag.name,
      },
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        type: post.type,
        id: post.id,
        content: post.content,
        tags: post.tags,
        authorId: post.authorId,
        comments: post.comments
          ? {
              create: post.comments,
            }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();