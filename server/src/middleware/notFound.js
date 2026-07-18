module.exports = (req, res, next) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({
      status: 'error',
      message: `Cannot find ${req.originalUrl} on this server`
    });
  }
  
  res.status(404).render('error', {
    title: '404 Not Found',
    message: 'The page you are looking for does not exist.',
    statusCode: 404
  });
};
