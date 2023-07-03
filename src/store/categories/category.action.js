import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPE } from './category.type';

export const setCategoriesMap = (categories) =>
    createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP, categories);
