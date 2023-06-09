# New Name

<br>
<p align="center">
  <img width=300 src="https://github.com/new-name/client/assets/113571767/13483535-2a78-49b5-b364-d378b436b3db" />
</p>
<br>

New Name은 `Text`, `SVG`, `Image`, `GIF`를 이용해 쉽게 세로형 명함을 생성할 수 있는 모바일 어플리케이션입니다.

명함을 생성하고 이미지 혹은 GIF로 저장하여 손쉽게 명함을 전달할 수 있습니다.

<br>

# 목차

- [동기](#동기)
- [서비스 화면](#)
- [고민한 부분](#고려한-부분)

  - [핑거 제스쳐 다루기](#핑거-제스쳐-다루기)
    - [`PanResponder`를 이용해 원하는 요소를 손가락의 이동만큼 이동시킬 수 있을까?](#`PanResponder`를-이용해-원하는-요소를-손가락의-이동만큼-이동시킬-수-있을까?)
    - [값이 변화하지 않는 이슈](#값이-변화하지-않는-이슈)
    - [사이즈를 조절할 때는 어떻게 해야 할 까?](#사이즈를-조절할-때는-어떻게-해야-할-까)
    - [X축과 Y축 개별 조절](#x축과-y축-개별-조절)
  - [상태 관리](#상태-관리)
    - [여러 요소의 상태 관리를 용이하게 하는 방법은 무엇일까?](#여러-요소의-상태-관리를-용이하게-하는-방법은-무엇일까?)
    - [요소마다 변경되는 속성을 어떻게 바로바로 관리해줄 수 있을까?](#요소마다-변경되는-속성을-어떻게-바로바로-관리해줄-수-있을까?)
    - [변경된 레이어(zIndex)를 어떻게 모든 요소에 적용해 줄 수 있을까?](#변경된-레이어zindex를-어떻게-모든-요소에-적용해-줄-수-있을까)
  - [저장하기](#저장하기)
    - [`SVG`, `Text`, `Image`, `GIF`를 하나의 데이터로 저장할 수 있는 방법이 무엇일까?](#svg-text-image-gif를-하나의-데이터로-저장할-수-있는-방법이-무엇일까)
    - [캡쳐한 데이터를 어떻게하면 GIF로 만들 수 있을까?](#캡쳐한-데이터를-어떻게하면-GIF로-만들-수-있을까?)
  - [UX](#ux)
    - [드래그 앤 드랍을 활용해 보자!](#드래그-앤-드랍을-활용해-보자)

- [작업 기록](#schedule)
- [Repository Link](#repository-link)
- [기술 스택](#tech-stacks)
- [Memoir](#memoir)

<br>
<br>

# 동기

이번 프로젝트의 목표는 모바일이라는 특성상 마우스가 아닌 **손가락을 이용해 `GUI` 잘 이용할 수 있는 기능이 있는 모바일 어플리케이션**을 만들어보고자 하였습니다.

이 목표에 적합한 아이디어를 고민하다 원하는 이미지를 생성하는 **모바일 이미지 에디터 툴**을 구현할 경우 공부할 요소가 많을 것이라 판단하였습니다.

이미지라는 범위를 핸드폰 화면 크기에 맞는 이미지로 한정 짓고자 하였고 **명함**이라는 컨텐츠가 생각났습니다.

현대의 명함은 실물을 가지고 다님과 동시에 디지털로 보관을 하는 형태를 취하고 있습니다. 이를 유저가 사용하는 입장에서 생각을 해보며, **실물을 스캔하는 것이 아닌 처음부터 명함을 데이터 형태들로만 갖고 다닐 수도 있지 않을까?** 라는 가정을 해보았습니다.

그렇다면 명함이라는 요소는 자신의 아이덴티티를 나타내는 것이라고 생각하였는데, 이를 좀 더 **디지털 요소와 효과적으로 접목이 가능한 GIF 같은 동적 이미지**가 들어간다면 처음 받았을 때 더 재밌게 접근할 수 있을 것이라 생각해 시작하게 되었습니다.

<br>

# **서비스 화면**

<p align="center">
  <img src="https://github.com/new-name/client/assets/113571767/ebda12bd-8a68-4873-9b31-acc224ead392" width="150"/>
  <img src="https://github.com/new-name/client/assets/113571767/34729d7d-0194-4409-b4c8-0d8bd21bff3e" width="150"/>
  <img src="https://github.com/new-name/client/assets/113571767/5b3cdbc1-b899-4129-bed6-f3f230e9acea" width="150"/>
</p>

[영상으로 확인하기!](https://vimeo.com/834884864?share=copy)

# **고민한 부분**

## **핑거 제스쳐 다루기**

<hr>

프로젝트 진행 중 제일 먼저 고려했던 부분은 터치요소를 어떻게 내가 원하는 방식으로 컨트롤 할 지 였습니다.

모바일 어플리케이션이라는 특성상 손가락의 제스처를 이용해 요소를 원하는 대로 다루는 것이 가장 중요한 요소라고 생각이 되었습니다.

이러한 제스처를 다루는 기능을 라이브러리로 해결하면 의존성이 높아질 것이라 판단하였습니다.

이에 `RN`의 내장 `API`인 `PanResponder`를 이용해 멀티 터치를 하나의 액션으로 바꿀 수 있는 기능에 대해 근본적으로 알아가보고자 하였습니다.

<br>

### **_`PanResponder`를 이용해 원하는 요소를 손가락의 이동만큼 이동시킬 수 있을까?_**

<hr>

`PanResponder`는 `RN`의 라이프 사이클을 관리하는 `Gesture Responder System`에 의애 터치의 예측을 가능하게 해줍니다.

처음 `PanResponder` 인스턴스를 생성하기 위해서는 PanResponder 내부의 정적 메소드인 `PanResponder.create`를 통해 새로운 PanResponder 인스턴스를 생성합니다.

이를 `RN`상에서는 `useRef` 혹은 `useState`를 이용해 생성된 인스턴스의 상태를 관리할 수 있습니다.

여기에서 `useRef`를 이용하지 않고 `useEffect`와 `useState`를 이용하였는데 그 이유는 `useRef`를 이용할 경우 값이 변경되어도 재렌더링이 되지 않고 값을 참조할 수 있습니다.

하지만 이미지나 GIF 또는 다른 요소들의 크기를 변경하는 작업은 리페인팅이 다시 되어야 하기 때문에 후자를 이용하는 것이 나은 방법이라 판단하였습니다.

`RN`의 경우 `UI`구축의 가장 기본적인 구성요소로써 사용되는 `View`라는 형태를 사용해 원하는 `UI`를 표시하는 기능을 지원합니다.

이 `View`를 `PanResponder`를 이용해 요소를 부드럽게 조절하려면 `Animated`라는 `RN`의 내장 `API`를 같이 이용해 `Animated.View`로 이용해 주어야 합니다.

이를 위해 관리가 가능한 값인 `Animated.Value`를 이용합니다.

추가적으로 `RN`상에서는 어떤 `View`를 터치할 경우 이벤트 버블링이 발생해 제스처에 대응하는 이벤트 핸들링이 가장 아래 `View`로 부터 시작합니다.

이를 제스처 컨트롤이 내부의 자식 `View`부터 이벤트를 컨트롤 하는 것을 원치 않는다면 `PanResponder`의 `onStartShouldSetPanResponder` 속성을 `true`로 만들어줘야 합니다.

```js
  onStartShouldSetPanResponder: (evt, gestureState) => true,
```

다음은 onPanResponder의 속성입니다.

- `onPanResponderGrant` : `PanResponder`의 손가락이 닿고나서 처음 움직일 시의 이벤트를 액션으로 바꿀 수 있는 속성입니다. 이전의 `Animated.Value`를 초기화시켜주어야 그 전의 참조 값을 참조하지 않습니다. 처음 움직임 시 선택된 요소의 좌표와 값을 초기화 시켜준 뒤 첫번째 인자인 `event`와 `gestureState`객체를 이용해 손가락의 위치를 얻을 수 있습니다. 이 후 이를 이용해 손가락이 이동한 거리를 이용해 요소의 크기 혹은 좌표를 변경하였습니다.
- `onPanResponderMove`: Grant는 첫 움직임 시 만의 값을 참조하기 때문에 그 후의 값은 onPanResponderMove를 이용해 값을 조절할 수 있습니다. 이는 손가락이 첫 움직임이 생긴 후 떼지기 전까지 일련의 연속적인 제스처를 액션으로 컨트롤 합니다.
- `onPanResponderRelease`: 손가락이 떨어지는 순간 액션을 정의할 수 있습니다. 값을 반영 시켜준 후 `Animated.Value`를 다시 초기화 시켜주어야 합니다.

아래는 예시 코드입니다.

```javascript
useEffect(() => {
  setMoveResponder(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        position = {
          x: gestureState.dx,
          y: gestureState.dy,
        };

        movePan.setOffset(position);
        movePan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: movePan.x, dy: movePan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: ({ nativeEvent }, gestureState) => {
        if (selectedIndexRef.current === null) return;

        positionRef = {
          x: positionRef.x + gestureState.dx,
          y: positionRef.y + gestureState.dy,
        };

        dispatch(
          updateImagePosition({
            index: selectedIndexRef.current,
            x: position.x,
            y: position.y,
          }),
        );

        movePan.setValue({ x: 0, y: 0 });
      },
    }),
  );
}, [movePan]);
```

 <br>

### **값이 변화하지 않는 이슈**

<hr>

위에서 터치를 할 경우 원하는 값 만큼 이동하지 않고 예상되는 값이 아닌 다른 값을 얻는 이슈가 발생하였습니다.

`PanResponder`를 이용할 경우 `useState`의 경우 `batch`라는 여러 상태 업데이트를 일괄 처리하는 속성을 이용해 실행이 됩니다.

이로 인해 터치가 될 경우, 터치가 바로 눌린 현재의 값만 이용할 수 있었고 `PanResponder` 인스턴스 속에 `useState`로 관리한 값의 경우 즉각적으로 피드백되어 반영될 수 없었습니다.

그래서 `useRef`를 이용하였습니다. `useRef`는 항상 최신의 상태를 참조할 수 있었기에 해결 할 수 있었습니다.

```js
positionRef.current = {
  x: gestureState.dx,
  y: gestureState.dy,
};
```

<br>

### **사이즈를 조절할 때는 어떻게 해야 할 까?**

<hr>

이동을 다루는 것은 하나의 손가락이 이동한 거리만큼을 `useRef`를 이용해 변경해줄 수 있었는데, 사이즈를 조절하는 것은 어떻게 해야할 까? 라는 고민에 맞닥뜨리게 되었습니다.

이에 사용자가 친숙하게 느낄 수 있는 사이즈 조절 방법을 두가지 생각해보게 되었습니다.

1. 두개의 손가락을 이용해 핀치 줌,아웃을 이용하는 방법
2. 슬라이더 스크롤을 이용해 정밀하게 조절하는 방법

저는 처음 방법인 두 손가락의 거리가 처음 닿았을 때를 구하는 것부터 시작을 해보자라고 생각을 하였습니다.

- 첫번째 이벤트 인자속의 `nativeEvent`를 구조분해할당을 이용해 내부의 값들을 가져온 뒤 그 속에서 `touches`라는 현재 닿아 있는 터치를 구할 수 있는 속성을 이용해 현재 `touches` 배열의 길이를 이용해, 손가락이 두개가 닿지 않았을 때는 `early return` 하는 식으로 처음 시작을 잡았습니다.
- 여기에서 두 손가락 사이의 거리를 구하는 `getDistance`함수를 표현 한 뒤 피타고라스의 정리를 이용해 구해보았습니다.

```javascript
const getDistance = (touch1, touch2) => {
  const dx = touch1.pageX - touch2.pageX;
  const dy = touch1.pageY - touch2.pageY;

  return Math.sqrt(dx * dx + dy * dy);
};
```

```javascript
  onPanResponderGrant: ({ nativeEvent }) => {
    const { touches } = nativeEvent;
    if (selectedIndexRef.current === null || touches.length !== 2) return;

    if (touches.length === 2) {
      const [touch1, touch2] = touches;
      const distance = getDistance(touch1, touch2);

      sizePositionRef.current = {
        xy: distance,
      };

      scaleRefXY._startingDistance = distance;
    }
  },
```

- `onPanResponderGrant`의 `distance`를 초기 값으로 잡아 준 뒤 그 값을 이동 중일 때 비교해 주려 하였습니다.

```javascript
  onPanResponderMove: ({ nativeEvent }) => {
    const { touches } = nativeEvent;
    if (selectedIndexRef.current === null || touches.length !== 2) return;

    if (touches.length === 2) {
      const [touch1, touch2] = touches;
      const distance = getDistance(touch1, touch2);

      const scaleFactorAll = distance / scaleRefXY._startingDistance;

      scaleRefXY.setValue(scaleFactorAll);
    }
  },
```

- `onPanResponderMove` 도중의 `distance`를 `onPanResponderGrant`의 `distance`와 비교해 `scaleFactor`를 계산해주었습니다.

```javascript
return (
  <Animated.View
    key={element[index]?.id}
    style={[
      { position: "absolute" },
      positionStyle,
      { transform: [{ scale: scaleRefXY }] },
    ]}
    onPress={() => handleSelect(index)}
    {...resizeResponder.panHandlers}
  >
    <TouchableOpacity>{shapeElements}</TouchableOpacity>
  </Animated.View>
);
```

- 이를 이용해 `Animate.View`의 `scale`속성을 `scaleRef`를 이용해 `transform` 해주었습니다.

<br>

### **X축과 Y축 개별 조절**

<hr>

그 이후는 X축과 Y축의 scale을 각각 조절 할 수는 없을까? 라는 고민을 해보게 되었습니다.

- 이번에는 피타고라스의 정리를 이용하는 것이 아닌 손가락의 X축 이동 범위와 Y축 이동 범위중 큰 부분이 중심이 되어 이동하면 되겠다 라고 생각하였습니다.

```javascript
  onPanResponderGrant: ({ nativeEvent }) => {
    const { touches } = nativeEvent;
    if (selectedIndexRef.current === null || touches.length !== 2) return;

    if (touches.length === 2) {
      const [touch1, touch2] = touches;
      const distance = getDistance(touch1, touch2);
      const distanceX = Math.abs(touch1.pageX - touch2.pageX);
      const distanceY = Math.abs(touch1.pageY - touch2.pageY);

      sizePositionRef.current = {
        xy: distance,
        x: distanceX,
        y: distanceY,
      };

      scaleRef._startingDistance = {
        x: distanceX,
        y: distanceY,
      };

      scaleRefXY._startingDistance = distance;
    }
  },
  onPanResponderMove: ({ nativeEvent }) => {
    const { touches } = nativeEvent;
    if (selectedIndexRef.current === null || touches.length !== 2) return;

    if (touches.length === 2) {
      const [touch1, touch2] = touches;
      const distance = getDistance(touch1, touch2);
      const distanceX = Math.abs(touch1.pageX - touch2.pageX);
      const distanceY = Math.abs(touch1.pageY - touch2.pageY);

      const scaleFactorAll = distance / scaleRefXY._startingDistance;
      const scaleFactorX = distanceX / scaleRef._startingDistance.x;
      const scaleFactorY = distanceY / scaleRef._startingDistance.y;

      scaleRefXY.setValue(scaleFactorAll);

      if (scaleFactorX > scaleFactorY && !sizeProportionMode) {
        scaleRef.setValue({
          x: scaleFactorX,
          y: 1,
        });
      }

      if (scaleFactorX < scaleFactorY && !sizeProportionMode) {
        scaleRef.setValue({
          x: 1,
          y: scaleFactorY,
        });
      }
    }
  },
```

```javascript
if (sizeProportionMode) {
  transform.push({ scale: scaleRefXY });
} else {
  transform.push({ scaleX: scaleRef.x });
  transform.push({ scaleY: scaleRef.y });
}

return (
  <Animated.View
    key={element[index]?.id}
    onPress={() => handleSelect(index)}
    style={[{ position: "absolute" }, positionStyle, { transform }]}
    {...resizeResponder.panHandlers}
  >
    <TouchableOpacity>{shapeElements}</TouchableOpacity>
  </Animated.View>
);
```

- `sizeProportionMode`를 설정한 뒤 비례 모드가 아닐 때는 `X`와 `Y`의 `scaleFactor`를 거리의 차를 이용해 구해주었습니다.

<br>
<br>

이렇게 위의 고민들을 지나쳐 오며 이미지와 요소들을 터치를 이용해 조절하는 방법은 강구하였으니, 이제 각각의 값을 개별적으로 적용시켜주는 문제가 있었습니다.

<br>

## **상태 관리**

<hr>
<br>

### **여러 요소의 상태 관리를 용이하게 하는 방법은 무엇일까?**

<hr>

추가적인 문제는 많은 요소의 상태를 일련적으로 관리하는 작업이 문제였습니다.

예측이 가능하게하고, 디버깅에 용이하게 관리하기 위해 `Redux`를 이용한 전역 상태 관리를 선택하였습니다.

<br>

### **요소마다 변경되는 속성을 어떻게 바로바로 관리해줄 수 있을까?**

<hr>

하나의 화면에 여러 요소를 보여줄 수 있는 방법을 고민해 본 뒤, 각 요소마다 Elements를 분리해 렌더링할 수 있게 하였습니다.

1. 각각의 요소의 관리 컴포넌트를 나눕니다. ex) TextEditor
2. 각각의 Editor 컴포넌트에서 해당 프로퍼티에 맞는 action을 dispatch 합니다.
3. 생성된 객체는 각각의 slice에 포함되고 렌더링 됩니다. ex) TextElements
4. 이제 각각의 객체는 `EditorRenderer` 컴포넌트에서 `updateNewElements` action을 통해 `editorSlice`의 `allElements`로 `zIndex`의 순서대로 관리해주었습니다.

<p align="center">
  <img width="500" alt="Untitled" src="https://github.com/new-name/client/assets/113571767/59b257d9-adb0-4023-bdd2-36b2011ac977">
</p>

```javascript
<ContentBox>
  <View>
    <TextElements />
    <ImageElements />
    <GifElements />
    <ShapeElements />
  </View>
  <LayerModal />
  <ImageModal />
  <GifModal />
  <FontModal />
  <ColorModal />
  <IconModal />
</ContentBox>
```

```js
useEffect(() => {
  dispatch(updateNewElements(textElements));
}, [textElements]);
```

```js
updateNewElements: (state, action) => {
      const elements = action.payload;

      Object.keys(elements).forEach((key) => {
        const element = elements[key];
        state.allElements[element.zIndex] = element;
      });
    },
```

### 변경된 레이어(zIndex)를 어떻게 모든 요소에 적용해 줄 수 있을까?

- 이미지 툴의 경우에는 필수적으로 레이어라는 개념이 도입이 됩니다.
- 그렇다면 layer를 변화시킬 필요가 있을 때는 어떻게 요소들을 관리할 수 있을까? 가 두번재 화두로 떠올랐습니다.
- 생각한 방법은 이걸 단방향으로 상태를 관리하면 되지 않을까? 라는 생각을 하였습니다.
- 각 Elements => allElements => layerElements
- 다시 변경된 layerElements를 통해 각 요소에 뿌려주는 작업을 진행하였습니다.

<p align="center">
  <img width="500" alt="Untitled (1)" src="https://github.com/new-name/client/assets/113571767/e167f625-59ab-4aa5-968c-d5bddd2b027f">
</p>

```javascript
useEffect(() => {
  const updatedElements = Object.keys(layerElements)
    .sort((a, b) => layerElements[a].zIndex - layerElements[b].zIndex)
    .map((key) => layerElements[key]);

  const shapes = [];
  const texts = [];
  const gifs = [];
  const images = [];

  updatedElements.forEach((element) => {
    switch (element.type) {
      case SHAPE:
        shapes.push(element);
        break;
      case TEXT:
        texts.push(element);
        break;
      case GIF:
        gifs.push(element);
        break;
      case IMAGE:
        images.push(element);
        break;
      default:
        break;
    }
  });

  if (texts.length > 0) {
    dispatch(updateAllTexts(texts));
  }
}, [layerElements]);
```

<br>

## **저장하기**

<hr>
<br>

### **`SVG`, `Text`, `Image`, `GIF`를 하나의 데이터로 저장할 수 있는 방법이 무엇일까?**

<hr>
이렇게 변경된 객체들을 다시 렌더링 시켜주는 작업까지 완료하였으나, 저장이라는 문제가 있었습니다.

이를 위해 조사를 해본 뒤 두가지의 방법을 확인하게 되었습니다.

1. 각 데이터를 변환 시켜 하나의 이미지로 만드는 방법
2. 하나의 영역을 캡쳐하는 방법

이 중에서 2번의 방법을 선택하는 것이 에러를 핸들링하기에 용이할 것이라 생각해 선택하였습니다.

<br>

### **캡쳐한 데이터를 어떻게하면 GIF로 만들 수 있을까?**

<hr>

이제 다음 문제는 `Image`의 경우에는 쉽게 캡쳐를 하면 됐지만 `GIF`의 경우 어떻게 저장할 수 있을까?에 대한 문제가 있었습니다.

**`GIF`로 변환 해주는 것을 `PNG`로 영역 내의 가장 긴 GIF의 길이 만큼 프레임마다 캡쳐해준 뒤 그것을 `GIF`로 만들어주면 되지 않을까?** 라는 접근으로 시작해 보았습니다.

`PNG`를 `GIF`로 바꾸는 것은 라이브러리를 이용하지 않고 시도해 보았으나, PNG를 GIF로 바꾸는 것에 상당한 무리가 있었기에 라이브러리를 이용하기로 판단하였습니다.

이에도 문제는 있었습니다.

- `RN`이 가지는 한계점: `RN`이기 때문에 `PNG`를 `GIF`로 바꾸는 라이브러리가 `NODE`기반이기에 사용할 수 없어 서버로 보내준 뒤 그것들을 서버에서 `GIF`로 만들어 다시 `RN`으로 보내주는 방식을 채택하였습니다.
- 번거로운 일련의 작업: `PNG`를 `GIF`로 바꾸는 작업은 상당히 많은 작업이 필요로 여겨집니다.

1. `PNG`를 프레임마다 캡쳐하여 배열로 만들기
2. 캡쳐한 `PNG`를 `base64`로 인코딩
3. `base64`로 인코딩한 `PNG`들의 배열을 서버로 보내주기
4. 서버에서는 `base64`을 디코딩하여 `GIF`로 변환한 뒤 다시 `base64`로 인코딩 한 후 `RN`으로 반환
5. `RN`에서는 `base64`를 다시 디코딩한 후 `GIF`로 저장하기.

<p align="center">
  <img width="500" alt="Untitled (1)" src="https://github.com/new-name/client/assets/113571767/bbf2a3da-5687-4158-8f69-61114463a3ac">
</p>

- 여기에서 `base64`란 이미지등을 쉽게 변환할 수 있는 아스키코드의 문자들로 이루어진 64진법으로 인코딩한 방식입니다.

```javascript
const frames = [];
const encodedFrames = [];
const frameCount = Math.round(duration * 60);
const frameInterval = 1000 / (fps / 2);

for (let i = 0; i < frameCount; i++) {
  setTimeout(async () => {
    const frame = await captureRef(imageRef, {
      format: "png",
      quality: 1.0,
    });

    frames.push(frame);
  }, i * frameInterval);
}
```

- `frame`이 반복되는 수 만큼 `capture`를 해준 뒤

```javascript
await new Promise((resolve) => setTimeout(resolve, frameCount * frameInterval));

for (const frame of frames) {
  const base64Data = await FileSystem.readAsStringAsync(frame, {
    encoding: FileSystem.EncodingType.Base64,
  });
  encodedFrames.push(`data:image/png;base64,${base64Data}`);
}
```

- `frames`에 `capture`가 된 것을 프로미스를 통해 체크한 뒤 이것들을 `base64`로 변환한 뒤 다시 배열에 담아주었습니다.

그것들을 서버에서 받은 뒤

```javascript
const encoder = new GIFEncoder(Math.round(width), Math.round(height));
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(1000 / fps);
encoder.setQuality(5);

for (const frame of encodedFrames) {
  const buffer = Buffer.from(frame.split(",")[1], "base64");
  const { data, info } = await sharp(buffer) // sharp는 PNG 사이즈 조절 및 생성 라이브러리 입니다.
    .resize(Math.round(width), Math.round(height), {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  if (info.width !== Math.round(width) || info.height !== Math.round(height)) {
    console.error(
      `Skipping frame with invalid dimensions: ${info.width}x${info.height}`,
    );
    continue;
  }

  encoder.addFrame(data);
}

encoder.finish();
const gifBuffer = encoder.out.getData();

res.set("Content-Type", "image/gif");
res.send({ base64Gif: gifBuffer.toString("base64") });
```

- `Buffer`를 이용해 한 프레임의 `base64`가 다 들어오면 하나하나마다 `sharp` 라이브러리를 통해 `PNG`로 다시 만들어 준 뒤 `GIFEncoder`라이브러리의 프레임에 하나하나 넣어준 뒤 `GIF`로 만들어 주었습니다.

<br>

**하나의 성공적인 GIF가 생성되었습니다!**

<br>

## **UX**

<br>

**어떻게 하면 유저 친화적으로 만들 수 있을 까?**

모바일 이라는 특성상 손가락으로 접촉해 컨트롤 하는 것들의 사용자 경험이 웹보다 더 크게 다가올 수 있는 요소라고 판단하였습니다.

이를 위해 어떻게 하면 좀 더 유저들이 느끼기에 편하게 할 수 있을까? 라는 고민이 생겼습니다.

<br>

### **드래그 앤 드랍을 활용해 보자!**

<hr>

- `Layer`의 순서를 변경할 때 드래그 앤 드랍을 활용하는 것이 사용자 경험 면에서 좀 더 친화적일 것이라 판단하였습니다.
- 이를 위해 `PanResponder`의 이벤트 속에서 드래그한 레이어를 옮기는 행위가 일정 수치 범위 이상을 넘어갈 때 자료의 순서가 변경되게 하였습니다.
- `newIndex`를 생성한 뒤 구조 분해 할당을 이용해 배열의 순서를 변경해 주었습니다.
- 그 뒤 `zIndex`를 이용해 객체들을 재정렬 해준 뒤 업데이트 시켜주는 작업을 진행하였습니다.

```javascript
  onPanResponderRelease: (_, gestureState) => {
    const positionY = positionRef.current.y;
    const indexDiffByPosition = Math.min(
      Math.max(
        Math.round(Math.abs(positionY) / (SCREEN_HEIGHT * 0.125 * 0.9)),
        0,
      ),
      currentElements.length - 1,
    );

    let newIndex;
    if (indexDiffByPosition !== 0 && positionY > 0) {
      newIndex = currentIndex + indexDiffByPosition;
    }

    if (indexDiffByPosition !== 0 && positionY < 0) {
      newIndex = currentIndex - indexDiffByPosition;
    }

    if (newIndex === undefined || newIndex >= currentElements.length) {
      return movePan.setValue({ x: 0, y: 0 });
    }

    [currentElements[currentIndex], currentElements[newIndex]] = [
      currentElements[newIndex],
      currentElements[currentIndex],
    ];

    const newElements = currentElements.map((element, index) => {
      return { ...element, zIndex: currentElements.length - 1 - index };
    });

    selectedLayerIndex.current = newIndex;
    dispatch(updateAllElements(newElements));
  },
```

<br>
<br>

# Schedule

### 프로젝트 기간 : 2023.04.3 ~ 2023.04.24 / [기획 7일, 개발 14일]

<details>
<summary>1 주차 : 기획 및 설계</summary>

- 아이디어 수집
- 기술 스택 선정
- Git 작업 플로우 결정
- Figma를 사용한 Mockup 제작
- MongoDb를 이용한 DB Schema 설계
- Notion을 이용한 칸반 작성
</details>
<details>
<summary>2 ~ 3 주차 : 기능 개발 및 발표</summary>

- RN 구현
- 백엔드 서버 구현
- 리드미 작성
  </details>

    <br>
    <br>

# Repository Link

- [New Name Client](https://github.com/new-name/client)
- [New Name Server](https://github.com/new-name/server)

<br>
<br>

# Tech Stacks

### Frontend

- [React Native](https://reactnative.dev/)
- [React-Redux](https://ko.redux.js.org/)
- [Expo](https://expo.dev/)
- [ESLint](https://eslint.org/)

### Backend

- [Node.js](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)
- [MongoDB](https://www.mongodb.com/cloud/atlas/register)
- [Mongoose](https://mongoosejs.com/)
- [AWS S3](https://aws.amazon.com/ko/s3/)
- [ESLint](https://eslint.org/)

<br>
<br>

# Memoir

React Native를 처음 다뤄보며 느꼈던 점은 "손가락이라는 접점으로 벌어지는, 수 많은 일들이 있구나" 였습니다. 웹만을 공부했다면 집중해보지 못했을 제스쳐라는 부분이 재미있는 요소로써 작용했던 것 같습니다.

이와 동시에 기존의 제가 사용하던 앱들이 그냥 허투로 만들어진 것이 아니고 디테일을 챙긴 부분들이 정말 많구나라는 것을 다시금 느껴보게 되었습니다. 이번 경험을 통해 기존에 사용하던 모바일 서비스들을 손가락이 눌릴 때 부터 떼어질 때 까지의 일들에 대한 관심을 많이 가져보게 된 계기가 되어 저에게 좋은 영향을 주었습니다.

저는 앞으로도 이와 같이 해결해야 할 요소들이 가득한 프로젝트들과 함께할 것인데 이 상황이 개발을 지속적으로 흥미있게 만들어 준다 생각합니다.

이러한 지속적인 흥미와 탐구를 통해 여러 프로젝트들을 풀어 나가보고 싶다는 생각을 가지게 되어 좋은 경험이었습니다.

- [정영빈](https://github.com/oyobbeb) : oyobbeb@gmail.com
