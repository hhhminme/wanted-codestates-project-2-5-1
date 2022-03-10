# 원티드 프리온보딩 프론트엔드 코스 - 오드컨셉
[✨결과물 보러가기✨](https://lucid-wiles-7ae8e7.netlify.app/)

바로가기 링크  
1. [동진 - Aside 컴포넌트 구현](#동진---aside-컴포넌트-구현)
1. [상우 - 검색 및 페이지네이션 구현](#상우---검색-및-페이지네이션-구현)
1. [민 - ]()


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

