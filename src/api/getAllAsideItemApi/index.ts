import axios from 'axios';

export const getAllAsideItemApi = async () => {
  try {
    const { data, status, statusText } = await axios.get(
      `https://static.pxl.ai/problem/data/regions.json`,
    );
    const test = await axios.get(`https://static.pxl.ai/problem/data/regions.json`);
    console.log(test);

    if (status >= 400) {
      alert(`잘못된 요청입니다. statusText: ${statusText}`);
    } else if (status >= 500) {
      alert(`서버 에러입니다. statusText: ${statusText}`);
    }
    return {
      status,
      data,
      isLoading: false,
    };
  } catch (e: any) {
    alert(`에러가 발생했습니다. 잠시후 다시 실행해 주세요. `);
    return {
      status: e?.response?.status,
      data: undefined,
      isLoading: false,
    };
  }
};
