module.exports = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log(req.params.id);
    if (req.user.email !== 'imanadmin@admin.com')
      throw new Error('You do not have access to this page');
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
