# 원티드 프리온보딩 프론트엔드 코스 - 오드컨셉
[✨결과물 보러가기✨](https://wanted-codestates-project-2-5-1.netlify.app/)

바로가기 링크  
1. [동진 - Aside 컴포넌트 구현](#동진---aside-컴포넌트-구현)
1. [상우 - 검색 및 페이지네이션 구현](#상우---검색-및-페이지네이션-구현)
1. [민 - 검색 로직 및 페이지네이션](#민---검색-로직-및-페이지네이션-구현)

## [동진] - Aside 컴포넌트 구현


https://user-images.githubusercontent.com/70435257/157583917-89e184dd-ca23-4af4-8ff0-69246927de0a.mp4


## 요구 사항1

1. queryString을 통하여 키워드를 가져온다.
2. 이때, img_url인지 product_code인지 알 수 없다.
3. 로딩 처리를 한다.
4. 캐싱을 한다.

## 구현 방법

### queryString 가져오기

우선 쿼리 스트링으로부터 데이터를 가져와야 합니다. qs 라이브러리를 사용할 수 있었지만 외부 라이브러리를 사용하고 싶지 않았고, 따라서 직접 구현을 했습니다.

useSearchParams훅을 통해 원하는 결과를 얻어올 수 있습니다.

```tsx
const [searchParams] = useSearchParams();
const data =  searchParams.get('code');
```

하지만 위와 같은 코드는 명령형 방식이고, 만약, 원하는 데이터들이 추가로 있다면 추가적인 로직들을 또 작성하여야 합니다. 

따라서 저는 재사용성있는 훅을 만들기 위해 어떻게 사용하고 싶은지 먼저 생각하였습니다.

`useGetQs('target', 'option')` 이런 식으로 원하는 쿼리스트링의 키 값들을 입력하고, 그 키들에 해당하는 데이터들을 가져온다면 재사용성이 많이 증가할 것이라 생각했습니다. 위의 코드의 결과는 target과 option을 키로 가지는 객체가 나오게 됩니다.

그럼 재사용성있는 useGetQs훅을 만들어 보겠습니다.

우선 param들은 모두 키의 값이고 일관된 동작(searchParams를 통해 queryString에서 데이터를 가져는 행위)을 합니다.

따라서 전개 연산자를 통해 params들을 하나의 배열로 바꿔줍니다. 다음으로 reduce를 통해 수행된 동작을 하나의 객체로 더해주면 원하는 결과가 나오게 됩니다.

최종 코드

```tsx
interface ParseQs {
  [x: string]: string | null;
}
const useGetQs = (...args: string[]) => {
  const [searchParams] = useSearchParams();
  return args.reduce((acc: ParseQs, cur: string) => {
    acc[cur] = searchParams.get(cur);
    return acc;
  }, {});
};
```

### api 호출하기

규모가 큰 프로젝트의 경우 axios Instance를 사용하여 보다 예측가능하고 재사용성있는 코드를 작성할 수 있지만 지금 프로젝트의 경우 그정도의 규모가 아니라 생각했습니다. 

하지만 api키가 올라가는것은 막아야하기 때문에 .env에 baseUrl을 보관하였습니다.

따라서  제가 사용할 부분의 api만 별도로 만들어 주었습니다.

저는 에러가 났을 경우와 나지 않았을 경우 모두 동일한 데이터 구조를 가지고 있어야 사용하는 곳에서 편리하게 사용할 수 있을것이라 생각했습니다. 따라서 api의 결과는 항상 아래와 같은 구조를 가지고 있습니다.

```tsx
{
	status,
	data,
	isLoading: false,
}
```

### 캐싱하기

api를 호출할 때 하나 더 생각해야 할 부분이 캐싱입니다.

따라서 “키"가 localStorage에 존재한다면, 캐싱된 데이터를 사용하며, 존재하지 않는다면 api를 호출하며 localStorage를 업데이트 합니다.

이를 위해 useLocalStorage훅을 만들어 주었습니다.

useLocalStorage훅을 만든 이유는 다음과 같습니다.

1. 캐싱을 하기 위해 localStorage를 사용한다.
2. 다른 기능에서도 localStorage를 사용할 수 있으므로 추상화한다.
3. localStorage는 App에서 사용할 떄 state에 보관한다.
4. 따라서 useLocalStorage훅을 만들어 localStorage에서 아이템을 가져오고 state에 저장하는 중복작업을 최소화한다.

이때 어떤 데이터를 저장할 지 모르기 때문에 제네릭으로 정의하였습니다.

[코드 보기]([https://github.com/wanted-pre-onboarding-team-2/wanted-codestates-project-2-5-1/blob/main/src/hooks/useLocalStorage.ts](https://github.com/wanted-pre-onboarding-team-2/wanted-codestates-project-2-5-1/blob/main/src/hooks/useLocalStorage.ts))

useLocalStorage훅을 만들어 주었기 때문에 로직은 다음과 같습니다.

1. useLocalStorage에서 데이터가 있는지 확인한다.
    1. 데이터가 존재한다면 결과를 반환한다.
2. 데이터가 없다면api호출을 한다.
    1. 데이터를 캐싱한다.
    2. 결과를 반환한다.

### 로딩 처리하기

로딩중일 경우 spinner와 skeleton ui를 대표적으로 생각할 수 있습니다.

skeleton의 경우에는 앞으로 보게 될 화면의 구조를 직관적으로 나타내기 때문에 더 나은 사용자 경험을 제공하는것은 skeleton ui라 생각합니다.  따라서 skeleton을 구현하게 되었습니다.

```tsx
<Skeleton>
	<Skeleton.Item />
<Skeleton>
```

다음과 같은 방식으로 사용될 수 있도록 구현하였습니다.

이 컴포넌트로 api 호출 시 로딩되는 부분을 대체하였습니다.

[코드 보기]([https://github.com/wanted-pre-onboarding-team-2/wanted-codestates-project-2-5-1/tree/main/src/components/Skeleton](https://github.com/wanted-pre-onboarding-team-2/wanted-codestates-project-2-5-1/tree/main/src/components/Skeleton))

## 생각 했던 부분

중요하게 생각했던 부분은 함수의 역할과 책임입니다.

하나의 함수에 하나의 책임만을 가진다면 테스트하기 쉬워지고 재사용하기 더 편해진다고 생각합니다. 

따라서 하나의 기능만을 가질 수 있도록 노력했습니다.

또한 사람들이 index.tsx를 보았을 때 원하는것은 마크업이라 생각합니다. 따라서 tsx에는 마크업만 들어갈 수 있도록 노력하였고, 로직은 훅으로 분리하였습니다.

## [상우] - 검색 및 페이지네이션 구현
### 요구사항
	1. 검색 컴포넌트
	2. 검색 쿼리 전달
	3. 페이지네이션
	4. 검색어 강조

### 구현 방법
#### 1. 검색 컴포넌트  
검색 컴포넌트는 메인, 검색  페이지에서 사용되기 때문에 컴포넌트를 따로 만들어 재사용성을 높이고 싶었습니다.  검색 공간을 확보하기 위해 min-width를 통해 컴포넌트의 최소 너비를 제한하였고, 그 외에는 화면의 넓이에 반응하도록 제작하였습니다.
UX적인 측면을 고려하여 Enter키를 통한 검색을 가능하게 하였고,
검색어가 없는 경우에 대해서는 반응하지 않도록 처리해주었습니다.
```tsx
const navigateToSearch = () => {
    if (userInput !== '') {
      navigation(`/search?option=${searchOption}&target=${userInput}`);
    }
  };

  const handleKeyboardControl = (event: any) => {
    if (event.keyCode === 13) {
      navigateToSearch();
    }
  };
```

#### 2. 검색 쿼리 전달  
요구사항의  'url에 검색 쿼리에 사용한 데이터가 직관적으로 보여야 합니다'에 따라 url에 querystring으로 검색어와 검색 타입(keyword 또는 url/code) 을 다음과 같이 넘겨주었습니다.
```
/search?option=keyword&target=조끼
```
 #### 3. 페이지네이션  
페이지네이션을 구현하면서 라이브러리를 사용해서 구현 가능하지만, 허민 님과 함께 구현해보는 것을 목표로 제작하였습니다. 허민 님께서 페이지를 구분해주셨고, 저는 아래 페이지네이션을 조작할 수 있는 인터페이스를 제작하였습니다.
허민 님께서 전달해주신 페이지 정보로 페이지네이션 state를 만들어 페이지네이션 버튼의 상태를 관리해주었습니다. handlePagination() 메소드를 통해 화면에 보여질 페이지를 조작할 수 있도록 했습니다.
```tsx
const [pageState, setPageState] = useState<Array<number>>([]);

  useEffect(() => {
    const arr: number[] = [];
    new Array(totalPages).fill(0).forEach((num, index) => {
      arr.push(index + 1);
    });
    setPageState(arr);
  }, [currentPage, totalPages]);

  const handlePagination = (number: number) => {
    if (number > 0 && number < totalPages + 1) {
      setCurrentPage(number);
      window.scrollTo(0, 0);
    }
  };

```
#### 4. 검색어 강조
검색어 강조를 위해 제품 이름에서 검색어를 추출해내는 과정이 필요했습니다. 제가 구현한 방법은 검색어(target)으로 제품 이름을 .split() 하여 배열을 우선 만들어주었습니다. split 배열을 .map() 함수를 통해 빈 문자열이 들어올 경우 검색어로 간주하여 <mark>태그로 감싸서 전달해주었습니다. 그 외의 문자열은 일반 문자열로 넘겨 주었습니다.
	
```tsx
const ImpactTarget = ({ productName }: productType) => {
    if (option === 'keyword' && typeof target === 'string') {
      const splitWithTarget = productName.split(target);
      return (
	<>
	  {splitWithTarget.map((part, index) => {
	    return part === '' ? <mark key={index}>{target}</mark> : part;
	  })}
	</>
      );
    }
    return <>{productName}</>;
  };
```

## [민] - 검색 로직 및 페이지네이션 구현

검색로직은 요구명세에 두 가지가 있었습니다. 

1. ```keyword``` 검색 시
2. ```image_url``` 또는 ```produce_code``` 검색 시

매핑 조건이 요구명세에 제시되지 않았기 때문에 고민을 많이 하였고, 어떤 사용자가 어떤 마음으로 해당 내용을 검색할지를 생각해 보았습니다. 

1. ```keyword``` 검색 시 ➡️ ```특정 제품의 존재를 모르는 유저```가 제품을 검색하고 싶은 경우 사용한다고 판단
2. ```image_url``` 또는 ```produce_code``` 검색 시 ➡️ ```특정 제품의 존재를 알고 있는 유저```가 제품을 검색하고 싶은 경우 사용한다고 판단

### 1. keyword 검색

키워드 검색 시에는 해당 검색어의 명령어가 ```product.json```의 ```name```에 포함되어 있을 경우에 해당하는 아이템을 페이지에 보여주도록 구현하였습니다. 
이 때 키워드의 개념은 명사(ex. 원피스, 조끼, 바지)라고 생각하여 정규표현식을 입력을 구분해주었습니다. 
```typescript
  const regexKeyword = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
  
   // 키워드 검색일 경우
    if (regexKeyword.test(e.target.value)) {
      setSearchOption('keyword'); //이후 검색 쿼리에 keyword 검색이라고 명시 해준다.
      setUserInput(e.target.value); //이후 검색 쿼리에 target(사용자가 검색한 내용)에 명시 해준다.
    }
```
```typescript
      case 'keyword':
        if (target) {
          const filteredArr: ProdData[] = [];
          prodData.map((value) => {
            if (value.name.includes(target)) {
              filteredArr.push(value); //검색한 키워드를 포함하는 제품의 정보만 담는다.
            }
          });
          setPosts(filteredArr);
        } else {
          console.log('err');
        }
        break;
```

### 2. ```image_url``` 또는 ```product_code``` 검색 시

```image_url```은 ```product.json```의 ```"image_url": "https://static.pxl.ai/problem/images/VT-070.jpg",```에서 맨 마지막 조건인 ```VT-070``` 과 같은 상품 코드에 집중하였습니다. 모든 상품 이미지 뒤에는 ```제품이니셜-넘버링``` 과 같은 형태로 명시되어 있어서 처음에는 https://static.pxl ~~~ 로 하는 url 그 자체로 생각을 하였지만 얼마나 많은 사용자가 과연 image_url 전체를 입력해서 검색을 할까? 에 대해 생각을 해보았고 
> image_url 내에서 어떤 내용이 제품을 구분 지을까란 고민이 해당 검색 매핑 조건을 세우는데 도움을 주었습니다.

그리고 이후 매핑 조건을 따진 후에는 페이지에 표시해주는 부분은 keyword 검색과 로직이 동일하여 정리하자면
> image_url 또는 product_code 검색시 ➡️ 해당 하는 제품의 name을 찾는다. ➡️ 해당 제품의 name을 활용해 keyword 검색과 동일하게 페이지에 출력한다.
```typescirpt
  // product_code 검색 시 숫자만 입력되도록 구현
  const regexCode = /^[0-9]+$/;
  //image_url 검색 시 영어-숫자의 형태만 입력되도록 구현
  const regexImg = /^[A-Z]+-+[0-9]+$/;
```
  
```typescript 
    // image_url 검색 일때
    else if (regexImg.test(e.target.value)) {
      setSearchOption('code'); //이후 검색 쿼리에 code 검색이라고 명시 해준다. (porduct_code, image_url은 code 검색이라고 합의)
      setUserInput(e.target.value);
    }
    // product_id 검색 일때
    else if (regexCode.test(e.target.value)) {
      setSearchOption('code');
      setUserInput(e.target.value);
    }
```

```image_url``` 해당 내용을 포함하는 url을 가진 제품의 name을 알아내고 해당 name의 앞부분(ex. 원피스-001 이면 원피스, 조끼-002 이면 조끼)을 가지고 keyword 검색과 동일한 방법으로 페이지에 표시해준다. 

```typescript
 // url 혹은 product_id 검색
      case 'code':
        if (target) {
          // url 검색 일때
          if (regexImg.test(target)) {
            const filteredArr: ProdData[] = [];
            let prodName = '';
            // url에 해당하는 아이템의 name을 찾는다.
            prodData.map((value) => {
              if (value.image_url.includes(target)) {
                prodName = value.name;
              }
            });
            if (prodName) {
              const tmpSplitArr = prodName.split('_', 1);
              prodName = tmpSplitArr[0];
              prodData.map((value) => {
                if (value.name.includes(prodName)) {
                  filteredArr.push(value);
                }
              });
            }
            setPosts(filteredArr);
```

```product_id``` 검색 시에는 해당 product_code를 가진 제품의 name을 알아내고 해당 name의 앞부분(ex. 원피스-001 이면 원피스, 조끼-002 이면 조끼)을 가지고 keyword 검색과 동일한 방법으로 페이지에 표시해준다. 

```typescript
            // product_id 검색일때
          } else if (!isNaN(Number(target))) {
            const filteredArr: ProdData[] = [];
            let prodName = '';
            // product_id에 해당하는 아이템의 name을 찾는다.
            prodData.map((value) => {
              if (value.product_code === Number(target)) {
                prodName = value.name;
              }
            });
            if (prodName) {
              const tmpSplitArr = prodName.split('_', 1);
              prodName = tmpSplitArr[0];
              prodData.map((value) => {
                if (value.name.includes(prodName)) {
                  filteredArr.push(value);
                }
              });
            }
            setPosts(filteredArr);
          }
        }
        break;
```

### 검색어를 구현하며 어려웠던 점 

검색어 구현을 하며 가장 어려웠던 점은 검색 매핑 조건이 명확하게 주어지지 않아서 직접 조건을 세워서 검색을 해야했다는 점입니다. 그래서 어떤 조건이 어떤 검색으로 구분되어야 할지에 대해 먼서 기준을 세우는데 많은 시간을 썼습니다.
또한 동진님과 함께 검색을 구현하지만 동진님은 regions.json을 활용한 검색 로직을 사용하셨고 저는 product.json을 활용한 검색을 했기 때문에 제공된 json안에 데이터가 어떤 의미를 갖고 있는 지와 product.json과 regions.json이 공통적으로 가진 항목은 무엇인지 고민을 많이 하였습니다. 검색에 필요한 공통적인 기준을 작성하는게 구현을 하며 어려웠으나 지속적인 소통을 통해 함께 개발을 잘 마칠 수 있었습니다. 

### 3. 페이지네이션 구현

페이지네이션은 React hook인 useState, useEffect와 자바스크립트 array 메소드인 slice를 활용해 라이브러리를 활용하지 않고 구현을 하였습니다. Posts 페이지에서는 keyowrd 검색이 된 내용을 표시해주는 컴포넌트 입니다. 어떤 검색을 하든 결과적으로 Aside를 제외하고는 모두 keyword 검색을 마지막에 하도록 로직을 짰기 때문에 한개의 컴포넌트를 통해 구현을 할 수 있었습니다.

```typescript
  const [currentPage, setCurrentPage] = useState(1); 
  const [postsPerPage, setPostsPerPage] = useState(60); 
  const indexOfLast = currentPage * postsPerPage; 
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (tmp: ProdData[]) => { 
    const currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
```

총 데이터를 postsPerPage 만큼 등분해서 보여줍니다.
예를 들어 총 100개의 데이터를 10등분해서, 1~10까지 보여주고, 그 다음 11~20까지 보여주고, 그 다음 21~30, … 이렇게 배열의 데이터를 나누어서 보여주어야 합니다.
이를 위해 indexOfLast, indexOfFirst 변수를 선언합니다.

이후 해당 페이지의 첫 번째와 마지막 인덱스 번호 값을 구합니다.
예를 들어, 첫 번째 페이지의 가장 처음 인덱스는 1번이고, 마지막은 10번이 됩니다. 두 번째 페이지는 11번 ~ 20번이 됩니다.
처음과 끝 인덱스 번호를 구한 다음, currentPosts 함수를 통해, 100개의 배열 데이터를 slice 함수로 분할해 줍니다. 이후 분할된 새로운 배열을 리턴합니다.

사용자가 선택한 페이지 넘버에 따라, currentPage 의 값이 변경되도록 구현하였습니다. 예를 들어 사용자가 3번을 선택하면, currentPage 상태값을 사용한 indexOfLast, indexOfFirst 변수의 값도 변경되면서 분할되는 데이터들도 달라질 것입니다.

이때 Posts에 저장된 내용과 로딩 상태가 Posts 컴포넌트에 Prop으로 전달하게 됩니다. 이때 Posts.length가 0일 경우 검색 결과가 없다고 출력되고 로딩 중일 경우 로딩 상태를 알리는 컴포넌트, 그게 아니라면 해당 페이지에 해당하는 제품이 ```map``` 함수를 활용하여 출력되게 됩니다.

### 페이지네이션을 구현하며 어려웠던 점 

페이지네이션을 처음 구현하는 것이였기 떄문에 해당 로직을 떠올리는 것이 어려웠습니다. 특히 페이지의 인덱스 번호를 생각해내는 것이 어려워 많은 레퍼런스를 참고하며 개발을 하였습니다. 하지만 라이브러리 없이 직접 구현을 했기 때문에 매우 뿌듯했으며 이번 과제를 통해 한층 성장하였다고 생각했습니다.

