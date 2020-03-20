const asyncWrapper = fn => {
  return async function (ctx, next) {
    try {
      return await fn(ctx);
    } catch (error) {
      console.error(ctx, 'asyncWrapper error, %O', error);
      ctx.reply('Something went wrong!!!');
      return next();
    }
  };
};

module.exports = asyncWrapper;