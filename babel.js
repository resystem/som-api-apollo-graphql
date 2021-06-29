import babel from "@babel/core";
import index from './index.js';

babel.transformSync(index, optionsObject);