export const providesList = <
  T extends string,
  R extends { id: string | number }[]
>(
  tagType: T,
  resultsWithIds: R | undefined,
  customTagId?: string
) => {
  return resultsWithIds
    ? [
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
        { type: tagType, id: customTagId ?? `LIST${tagType.toUpperCase()}` },
      ]
    : [{ type: tagType, id: customTagId ?? `LIST${tagType.toUpperCase()}` }];
};

export const providesSingle = <R extends string | number, T extends string>(
  tagType: T,
  resultId?: R | undefined,
  customTagId?: string
) => {
  return resultId
    ? [
        { type: tagType, id: resultId },
        { type: tagType, id: customTagId ?? `LIST${tagType.toUpperCase()}` },
      ]
    : [{ type: tagType, id: customTagId ?? `LIST${tagType.toUpperCase()}` }];
};
