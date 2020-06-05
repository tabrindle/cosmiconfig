/* eslint-disable @typescript-eslint/no-require-imports */

import importFreshType from 'import-fresh';
import { LoaderSync } from './index';
import { LoadersSync } from './types';

let importFresh: typeof importFreshType;
const loadJs: LoaderSync = function loadJs(filepath) {
  if (importFresh === undefined) {
    importFresh = require('import-fresh');
  }

  const result = importFresh(filepath);
  return result;
};

const loadJson: LoaderSync = function loadJson(filepath, content) {
  try {
    const result = JSON.parse(content);
    return result;
  } catch (error) {
    error.message = `JSON Error in ${filepath}:\n${error.message}`;
    throw error;
  }
};

const loaders: LoadersSync = { loadJs, loadJson };

export { loaders };
