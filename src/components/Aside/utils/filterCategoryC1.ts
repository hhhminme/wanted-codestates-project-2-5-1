export const filterCategoryC1 = (category_names: string[]) =>
  category_names.filter((c) => c.includes('c1')).map((c) => c.replace(/c1\./gi, ''));
