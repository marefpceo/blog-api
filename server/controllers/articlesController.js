const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Display article listing
exports.articles_list_get = asyncHandler(async (req, res, next) => {
  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
    },
    include: {
      comment: true,
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
