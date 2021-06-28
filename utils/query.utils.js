/**
* sliceArgs - function that slice the args, following the args pattern of
* the graphql. return an object with query, filter and paginator keys.
*
* @function create
* @param  {object}  parent    it contains the result returned from the resolver on
* the parent type
* @param  {object}  args    it contains filter, sort, skip and limit to build the
* query
* @param  {object}  context   it contains all mongo collections
*/
export const sliceArgs = (args) => {
  let filter = {};
  let paginator = {};
  const query = {};

  Object.keys(args).forEach((key) => {
    if (key === 'filter') filter = { ...args[key] };
    else if (key === 'paginator') paginator = { ...args[key] };
    else query[key] = args[key];
  });

  return ({ query, filter, paginator });
};

export default ({
  sliceArgs,
});
