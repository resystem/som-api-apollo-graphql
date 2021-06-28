export const parseSort = (string = '') => {
  if (!string) return null;
  const object = {};
  const sort = string.split(',');

  sort.forEach((field) => {
    if (field[0] === '-') object[field.substring(1)] = -1;
    else object[field] = 1;
  });

  return object;
};

export const parseFields = (string = '') => {
  if (!string) return null;
  const object = {};
  const fields = string.split(',');

  fields.forEach((field) => {
    object[field] = 1;
  });

  return Object.keys(object).length ? object : null;
};

export const parseFilter = (filter = {}) => {
  if (!filter) return {};
  const object = typeof filter === 'string' ? JSON.parse(filter) : filter;

  Object.keys(object).forEach((row) => {
    const value = object[row];

    if (value[0] === '/' && value[value.length - 1] === '/') object[row] = new RegExp(value.slice(1, -1), 'i');

    if (typeof value === 'object') {
      value.forEach((item) => {
        Object.keys(item).forEach((sub) => {
          const v = item[sub];
          const itemCopy = item;

          if (v[0] === '/' && v[v.length - 1] === '/') itemCopy[sub] = new RegExp(v.slice(1, -1), 'i');

          if (typeof v === 'object' && sub[0] === '$') {
            v.forEach((nv) => {
              Object.keys(nv).forEach((or) => {
                const n = nv[or];
                const nvCopy = nv;
                if (n[0] === '/' && n[n.length - 1] === '/') nvCopy[or] = new RegExp(n.slice(1, -1), 'i');
              });
            });
          }
        });
      });
    }
  });

  return object;
};
