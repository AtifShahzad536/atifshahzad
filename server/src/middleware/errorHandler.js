module.exports = (err, req, res, next) => {
  console.error('💥 ERROR:', err.stack);
  const statusCode = err.statusCode || 500;
  
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(statusCode).json({
      status: 'error',
      message: err.message || 'Internal Server Error'
    });
  }
  
  res.status(statusCode).render('error', {
    title: 'Error',
    message: err.message || 'Internal Server Error',
    statusCode
  });
};
