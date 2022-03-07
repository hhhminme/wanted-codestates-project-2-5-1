type ParseQs = {
  [x: string]: string;
};
const parseQueryString = (qs: string): ParseQs =>
  qs
    .substring(1)
    .split('&')
    .reduce((acc: ParseQs, cur) => {
      const [key, value] = cur.split('=');
      acc[key] = value;
      return acc;
    }, {});

export default parseQueryString;
