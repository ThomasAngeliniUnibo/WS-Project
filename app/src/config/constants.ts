export const IS_PRODUCTION = import.meta.env.MODE === 'production';

export const IS_DEVELOPMENT = !IS_PRODUCTION;
