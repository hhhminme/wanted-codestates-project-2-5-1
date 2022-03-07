export interface Region {
  product_code: number;
  region_id: number;
  image_url: string;
  gender: string;
  attributes: [RegionsAttr];
  category_names: string[];
}
interface RegionsAttr {
  style: string;
  season: string;
  occasion: string;
  fabric: string;
  sense: string;
  pattern: string;
}
export interface GetAllAsideItemApi {
  status: number | undefined;
  data: Region[] | undefined;
  isLoading: boolean;
}
