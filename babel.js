const babel = require("@babel/core");
const index = require('./index');

babel.transformSync(index, optionsObject);