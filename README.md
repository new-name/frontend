# 🪪 New Name

`Text`, `SVG`, `Image`, `GIF`를 이용할 수 있는 세로형 모바일 명함 생성 어플리케이션입니다.

쉽게 텍스트, 모양, 이미지, GIF를 이용해 명함을 생성, 저장, 편집할 수 있습니다.

<br>

# 📖 Table of Contents

- [💪 Motivation](#💪-motivation)
- [🔥 Issue Points](#🔥-issue-points)

* [1. 어떻게 하면 모바일에서 손가락을 이용해 요소들을 내가 원하는 대로 다룰 수 있을까?](#1-어떻게-하면-모바일에서-손가락을-이용해-요소들을-내가-원하는-대로-다룰-수-있을까?)
  - [1) `PanResponder`를 이용해 원하는 요소를 손가락의 이동만큼 이동시킬 수 있을까?](#1-`PanResponder`를-이용해-원하는-요소를-손가락의-이동만큼-이동시킬-수-있을까?)
  - [2) 사이즈를 조절할 때는 어떻게 해야 할 까?](#2-사이즈를-조절할-때는-어떻게-해야-할-까?)
* [2. `SVG`, `Text`, `Image`, `GIF`를 하나의 데이터로 저장할 수 있는 방법이 무엇일까?](#2-`SVG`,-`Text`,-`Image`,-`GIF`를-하나의-데이터로-저장할-수-있는-방법이-무엇일까?)
  - [1) 캡쳐한 데이터를 어떻게하면 GIF로 만들 수 있을까?](#1-캡쳐한-데이터를-어떻게하면-GIF로-만들-수-있을까?)
* [3. 여러 요소의 상태 관리를 용이하게 하는 방법은 무엇일까?](#3-여러-요소의-상태-관리를-용이하게-하는-방법은-무엇일까?)
  - [1) 요소마다 변경되는 속성을 어떻게 바로바로 관리해줄 수 있을까?](#1-요소마다-변경되는-속성을-어떻게-바로바로-관리해줄-수-있을까?)
  - [2) 변경된 레이어(zIndex)를 어떻게 모든 요소에 적용해 줄 수 있을까?](#2-변경된-레이어zindex를-어떻게-모든-요소에-적용해-줄-수-있을까)
* [4. 어떻게 하면 유저 친화적으로 만들 수 있을 까?](#4-어떻게-하면-유저-친화적으로-만들-수-있을-까)
  - [1) 드래그 앤 드랍을 활용해 보자!](#1-드래그-앤-드랍을-활용해-보자)

- [🗓 Schedule](#🗓-schedule)
- [🔗 Repository Link](#🔗-repository-link)
- [🛠 Tech Stacks](#🛠-tech-stacks)
- [🏠 Member](#🏠-member)

<br>
<br>

# 💪 Motivation

이번 프로젝트의 목표는 React-Native를 효과적으로 다루는 것에 초점을 둘 수 있는 모바일 어플리케이션을 만들어보고자 하였습니다.

이 목표에 적합한 아이디어를 고민하다 원하는 이미지를 생성하는 이미지 에디터라는 것을 모바일로 구현할 경우 공부할 요소가 많을 것이라 판단하였습니다. 이미지라는 범위를 핸드폰 화면 크기에 맞는 이미지로 한정 짓고자 하였고 명함이라는 컨텐츠가 생각났습니다.

현대의 명함은 실물을 가지고 다님과 동시에 디지털로 보관을 하는 형태를 취하고 있습니다. 이를 유저가 사용하는 입장에서 생각을 해보며, 실물을 스캔하는 것이 아닌 처음부터 명함을 에어드랍과 같은 제스처 하나만으로 보내는 형태들로 바뀔 수도 있지 않을까? 라는 가정을 해보았습니다.

그렇다면 명함이라는 요소는 자신의 아이덴티티를 나타내는 것이라고 생각하였고, 이를 좀 더 디지털이라는 요소를 이용해 효과적으로 보여줄 수 있는 요소는 GIF와 같은 동적 이미지가 들어간다면 셀프 브랜딩에 효과적일 것이라 판단하여 시작하였습니다.

<br>

# 🔥 Issue Points

3주간 여러가지 이슈들이 있었지만 그 중에서 모바일이라는 요소에서 어려움을 겪는 것들은 크게 3가지였습니다.

## 1. 어떻게 하면 모바일에서 손가락을 이용해 요소들을 내가 원하는 대로 다룰 수 있을까?

모바일 어플리케이션이라는 특성상 손가락의 제스처를 이용해 요소를 원하는 대로 컨트롤하는 것이 가장 중요한 요소라고 생각이 되었습니다. 이에는 많은 라이브러리들이 있었지만 `expo`라는 `React Native`(이하 `RN`)를 좀 더 간편하게 사용할 수 있게 만들어 주는 프레임 워크를 이미 이용하고 있는 입장에서 이러한 제스처를 쉽게 다루는 속성을 라이브러리로 해결하기 보다는 `RN`의 내장 `API`인 `PanResponder`를 이용해 멀티 터치를 하나의 액션으로 바꿀 수 있는 것을 근본적으로 알아가려 하였습니다.

<br>

### 1) `PanResponder`를 이용해 원하는 요소를 손가락의 이동만큼 이동시킬 수 있을까?

처음 `PanResponder`객체를 생성함에는 두가지 방법이 있습니다. `PanResponder.create`를 통해 새로운 PanResponder 객체를 생성합니다. 이를 `useRef` 혹은 `useState`를 이용해 상태를 관리할 수 있습니다.

여기에서 `useRef`를 이용하지 않고 `useEffect`와 `useState`를 이용하였는데 그 이유는 `useRef`를 이용할 경우 값이 변경되어도 재렌더링이 되지 않고 값을 참조할 수 있습니다. 하지만 이미지나 GIF 또는 다른 요소들의 크기를 변경하는 작업은 렌더링이 다시 되어야 하기 때문에 후자를 이용하는 것이 나은 방법이라 판단하였습니다.

이 `PanResponder`를 이용해 요소를 부드럽게 조절하려면 Animated라는 속성을 같이 이용해 Animated.View를 이용해 그 속의 transform과 scale등의 속성을 같이 이용해 주어야 합니다.

이를 위해 새로운 `Animated.Value`를 생성해 주어야 합니다.

- `onPanResponderGrant` : `PanResponder`의 손가락이 닿고나서 처음 움직일 시의 이벤트를 액션으로 바꿀 수 있는 속성입니다. 이전의 `Animated.Value`를 초기화시켜주어야 그 전의 참조 값을 참조하지 않습니다. 처음 움직임 시 선택된 요소의 좌표와 값을 초기화 시켜준 뒤 첫번째 인자인 `event`와 `gestureState`객체를 이용해 손가락의 위치를 얻을 수 있습니다. 이 후 이를 이용해 손가락이 이동한 거리를 이용해 요소의 크기 혹은 좌표를 변경하였습니다.
- `onPanResponderMove`: Grant는 첫 움직임 시 만의 값을 참조하기 때문에 그 후의 값은 onPanResponderMove를 이용해 값을 조절할 수 있습니다. 이는 손가락이 첫 움직임이 생긴 후 떼지기 전까지 일련의 연속적인 제스처를 액션으로 컨트롤 합니다. closure
- `onPanResponderRelease`: 손가락이 떨어지는 순간 액션을 정의할 수 있습니다. 값을 반영 시켜준 후 `Animated.Value`를 다시 초기화 시켜주어야 합니다.

아래는 예시 코드입니다.

```javascript
useEffect(() => {
  setMoveResponder(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        positionRef.current = {
          x: gestureState.dx,
          y: gestureState.dy,
        };

        movePan.setOffset(positionRef.current);
        movePan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: movePan.x, dy: movePan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: ({ nativeEvent }, gestureState) => {
        if (selectedIndexRef.current === null) return;

        positionRef.current = {
          x: positionRef.current.x + gestureState.dx,
          y: positionRef.current.y + gestureState.dy,
        };

        dispatch(
          updateImagePosition({
            index: selectedIndexRef.current,
            x: positionRef.current.x,
            y: positionRef.current.y,
          }),
        );

        movePan.setValue({ x: 0, y: 0 });
      },
    }),
  );
}, [movePan]);
```

여기에서 useState의 값을 이용하는 것이 아닌 useRef를 사용할 수 없었던 요소를 서술하고자 합니다.

`PanResponder`를 이용할 경우 `useState`의 경우 `batch`라는 여러 상태 업데이트를 일괄 처리하는 속성을 이용해 실행이 되다 보니, `PanResponder` 속의 `closure`안으로 들어갈 수 없었습니다.

이에 `useRef`는 항상 최신의 상태를 참조할 수 있기 때문에 `closure`에 문제를 일으키지 않음을 알 수 있어 이를 이용해 해결하였습니다.

<br>

### 2) 사이즈를 조절할 때는 어떻게 해야 할 까?

이동을 다루는 것은 손가락이 이동한 거리만큼을 `useRef`를 이용해 변경해줄 수 있었는데, 사이즈를 조절하는 것은 어떻게 해야할 까? 라는 고민에 맞닥뜨리게 되었습니다.

- 두 손가락의 거리가 처음 닿았을 때를 구하는 것부터 시작을 해보자라고 생각을 하였고,
- 첫번 째 이벤트 인자속의 `nativeEvent`를 구조분해할당을 이용해 빼낸 뒤 그 속에서 `touches`라는 현재 닿아 있는 터치를 구할 수 있는 속성을 이용해 현재 `touches`의 길이가 손가락이 두개가 닿지 않았을 때는 `early return`하게 하는 식으로 처음 시작을 잡았습니다.
- 여기에서 두 손가락 사이의 거리를 `getDistance`함수를 표현 한 뒤 피타고라스의 정리를 이용해 구해보았습니다.

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

- `onPanResponderGrant`의 `distance`를 초기 값으로 잡아 준 뒤 그 값을 이동 중일 때 비교해주려 하였습니다.

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

- 그 후에는 X축과 Y축의 scale을 별도로 조절 할 수는 없을까? 라는 고민을 해보게 되었습니다.

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

- `mode`를 설정한 뒤 비례 모드가 아닐 때는 `X`와 `Y`의 `scaleFactor`를 거리의 차를 이용해 구해주었습니다.

<br>
<br>

## 2. `SVG`, `Text`, `Image`, `GIF`를 하나의 데이터로 저장할 수 있는 방법이 무엇일까?

이를 위해 조사를 해본 뒤 두가지의 방법을 확인하게 되었습니다.

1. 각 데이터를 변환 시켜 하나의 이미지로 만드는 방법
2. 하나의 영역을 캡쳐하는 방법

이 중에서 2번의 방법을 선택하는 것이 에러를 핸들링하기에 용이할 것이라 생각해 선택하였습니다.

<br>

### 1) 캡쳐한 데이터를 어떻게하면 GIF로 만들 수 있을까?

이제 다음 문제는 `Image`의 경우에는 쉽게 캡쳐를 하면 됐지만 `GIF`의 경우 어떻게 저장할 수 있을까?에 대한 문제가 있었습니다.
`GIF`로 변환 해주는 것을 `PNG`로 영역 내의 가장 긴 명함의 길이 만큼 프레임마다 캡쳐해준 뒤 그것을 `GIF`로 이어주면 되지 않을까? 라는 접근을 해보고자 하였습니다.

`PNG`를 `GIF`로 바꾸는 것은 라이브러리를 이용하지 않는 것은 제가 처음에 목표한 챌린지의 주제(RN을 효과적으로 다뤄보자!)와 조금 별개라 생각하여 라이브러리를 이용하기로 판단하였습니다.

이에는 문제가 있었습니다.

- `RN`이 가지는 한계점: `RN`이기 때문에 `PNG`를 `GIF`로 바꾸는 라이브러리가 `NODE`기반이기에 사용할 수 없어 서버로 보내준 뒤 그것들을 서버에서 `GIF`로 만들어 다시 `RN`으로 보내주는 방식을 채택하였습니다.
- 번거로운 일련의 작업: `PNG`를 `GIF`로 바꾸는 작업은 상당히 많은 작업이 필요로 여겨집니다.

1. `PNG`를 프레임마다 캡쳐하여 배열로 만들기
2. 캡쳐한 `PNG`를 `base64`로 인코딩
3. `base64`로 인코딩한 `PNG`들의 배열을 서버로 보내주기
4. 서버에서는 `base64`을 디코딩하여 `GIF`로 변환한 뒤 다시 `base64`로 인코딩 한 후 `RN`으로 반환
5. `RN`에서는 `base64`를 다시 디코딩한 후 `GIF`로 저장하기.

- 여기에서 `base64`란 이미지등을 쉽게 변환할 수 있는 아스키코드의 문자들로 이루어진 64진법으로 인코딩한 방식이다.

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
  const { data, info } = await sharp(buffer)
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

## 3. 여러 요소의 상태 관리를 용이하게 하는 방법은 무엇일까?

세번째는 많은 요소의 상태를 일련적으로 관리하는 작업에 어려움을 겪었다.
이를 해결하기 위해 Redux를 이용한 Global한 상태 관리를 선택하였다.

### 1) 요소마다 변경되는 속성을 어떻게 바로바로 관리해줄 수 있을까?

- 하나의 화면에 여러 요소를 보여줄 수 있는 방법을 고민해 본 뒤, 각 요소마다 Elements를 분리해 렌더링할 수 있게 하였다.

```javascript
<ContentBox color={UNACTIVE_COLOR}>
  <ViewShot
    style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
    ref={imageRef}
    collapsable={false}
    onLayout={() => setIsLayoutReady(true)}
  >
    <View style={styles.contentContainer}>
      <TextElements />
      <ImageElements />
      <GifElements updateLongestLottieRef={updateLongestLottieRef} />
      <ShapeElements />
    </View>
  </ViewShot>
  <LayerModal />
  <ImageModal />
  <GifModal />
  <FontModal />
  <ColorModal />
  <IconModal />
</ContentBox>
```

- 이렇게 생성된 각 Elements를 생성됨과 동시에 editorSlice의 allElements에 추가 시켜주는 작업을 통해 동기화 시켜주었다.

```javascript
useEffect(() => {
  dispatch(updateNewElements(textElements));
}, [textElements]);

useEffect(() => {
  dispatch(updateNewElements(gifElements));
}, [gifElements]);

useEffect(() => {
  dispatch(updateNewElements(imageElements));
}, [imageElements]);

useEffect(() => {
  dispatch(updateNewElements(shapeElements));
}, [shapeElements]);
```

### 2) 변경된 레이어(zIndex)를 어떻게 모든 요소에 적용해 줄 수 있을까?

- 이미지 툴의 경우에는 필수적으로 레이어라는 개념이 도입이 된다.
- 그렇다면 layer를 변화시킬 필요가 있을 때는 어떻게 요소들을 관리할 수 있을까? 가 두번재 화두로 떠올랐다.
- 생각한 방법은 이걸 단방향으로 상태를 관리하면 되지 않을까? 라는 생각을 하였다.
- 각 Elements => allElements => layerElements
- 다시 변경된 layerElements를 통해 각 요소에 뿌려주는 작업을 진행하였다.

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

  if (shapes.length > 0) {
    dispatch(updateAllShapes(shapes));
  }

  if (texts.length > 0) {
    dispatch(updateAllTexts(texts));
  }

  if (gifs.length > 0) {
    dispatch(updateAllGifs(gifs));
  }

  if (images.length > 0) {
    dispatch(updateAllImages(images));
  }
}, [layerElements]);
```

<br>

## 4. 어떻게 하면 유저 친화적으로 만들 수 있을 까?

모바일 이라는 특성상 손가락으로 접촉해 컨트롤 하는 것들은 유저의 사용자 경험이 웹보다 더 극대화 될 수 있다고 판단하였다.
이를 위해 어떻게 하면 좀 더 유저들이 느끼기에 편하게 할 수 있을까? 라는 고민이 생겼다.

### 1) 드래그 앤 드랍을 활용해 보자!

- Layer의 순서를 변경할 때 드래그 앤 드랍을 활용하는 것이 사용자 경험 면에서 좀 더 친화적일 것이라 판단 하였다.
- 이를 위해 PanResponder의 이벤트 속에서 일정 수치 만큼을 넘어갈 때 자료의 순서가 변경되게 개발하였다.
- `newIndex`를 생성한 뒤 구조 분해 할당을 이용해 배열의 순서를 변경해 주었다.
- 그 뒤 zIndex를 재정렬 해준 뒤 업데이트 시켜주는 작업을 진행하였다.

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

# 🗓 Schedule

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

# 🔗 Repository Link

- [New Name Client](https://github.com/new-name/client)
- [New Name Server](https://github.com/new-name/server)

<br>
<br>

# 🛠 Tech Stacks

### Frontend

- React Native
- React-Redux
- Expo
- ESLint

### Backend

- [Node.js](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)
- [MongoDB](https://www.mongodb.com/cloud/atlas/register)
- [Mongoose](https://mongoosejs.com/)
- AWS S3
- ESLint

<br>
<br>

# 🏠 Member

- [정영빈](https://github.com/oyobbeb) : oyobbeb@gmail.com
