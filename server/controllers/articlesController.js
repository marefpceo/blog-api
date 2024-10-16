const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Handle site visit count
exports.articles_site_count = asyncHandler(async (req, res, next) => {
  const storedTotal = await prisma.count.findUnique({
    where: {
      id: process.env.SITE_COUNT_ID,
    }
  });

  await prisma.count.update({
    where: {
      id: process.env.SITE_COUNT_ID,
    }, 
    data: {
      count_total: parseInt(storedTotal.count_total) + 1
    }
  });
  res.json(storedTotal);
});

// Display article listing
exports.articles_list_get = asyncHandler(async (req, res, next) => {
  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
    },
    include: {
      comment: {
        include: {
          comment_user: true,
        },
      },
    },
  });
  res.json(articles);
});

// Display selected article
exports.article_get = asyncHandler(async (req, res, next) => {
  const selectedArticle = await prisma.article.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!selectedArticle.isPublished) {
    res.sendStatus(403);
  } else {
    res.json(selectedArticle);
  }
});
