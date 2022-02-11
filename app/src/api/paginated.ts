export type Paginated = {
  skip: number;
  limit: number;
};

export const fromSkipLimit = (skip: number, limit: number): Paginated => ({
  skip,
  limit,
});

export const fromPage = (page: number, perPage = 10): Paginated => ({
  skip: page * perPage,
  limit: perPage,
});
