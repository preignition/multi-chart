
module.exports = {
  moduleDirs: ['node_modules'],
  watch: true,
  // nodeResolve: true,
  appIndex: 'index.html'
  // preserveSymlinks: true,
  // customMiddlewares: [
  //   function rewriteIndex(context, next) {
  //     if (context.url === '/' || context.url === '/index.html' || context.url.startsWith('/post')) {
  //       console.info(context)
  //       context.url = '/demo/index.html';
  //     }

  //     return next();
  //   }
  // ],
};