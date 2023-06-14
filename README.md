# New Name

<br>
<p>
  <img width=300 src="https://github.com/new-name/client/assets/113571767/13483535-2a78-49b5-b364-d378b436b3db" />
</p>
<br>

New Name은 `Text`, `SVG`, `Image`, `GIF`를 이용해 쉽게 세로형 명함을 생성할 수 있는 모바일 어플리케이션입니다.

명함을 생성하고 이미지 혹은 GIF로 저장하여 손쉽게 명함을 전달할 수 있습니다.

<br>

# 목차

- [동기](#동기)
- [서비스 화면](#서비스-화면)
- [고민한 부분](#고민한-부분)

  - [핑거 제스쳐 다루기](#핑거-제스쳐-다루기)
    - [`PanResponder`를 이용해 원하는 요소를 손가락의 이동만큼 이동시킬 수 있을까?](#panresponder를-이용해-원하는-요소를-손가락의-이동만큼-이동시킬-수-있을까)
    - [`PanResponder` 이슈](#panresponder-이슈)
      - [원하는 만큼 이동되지 않는 이슈](#원하는-만큼-이동되지-않는-이슈)
      - [값이 변화하지 않는 이슈](#값이-변화하지-않는-이슈)
    - [사이즈를 조절할 때는 어떻게 해야 할까?](#사이즈를-조절할-때는-어떻게-해야-할까)
      - [두개의 손가락을 이용해 핀치 줌,아웃으로 사이즈를 조절 하는 방법](#두개의-손가락을-이용해-핀치-줌아웃으로-사이즈를-조절-하는-방법)
      - [X축과 Y축 개별 조절](#x축과-y축-개별-조절)
  - [상태 관리](#상태-관리)
    - [여러 요소의 상태 관리를 용이하게 하는 방법은 무엇일까?](#여러-요소의-상태-관리를-용이하게-하는-방법은-무엇일까)
    - [요소마다 변경되는 속성을 어떻게 바로바로 관리해줄 수 있을까?](#요소마다-변경되는-속성을-어떻게-바로바로-관리해줄-수-있을까)
    - [변경된 레이어(zIndex)를 어떻게 모든 요소에 적용해 줄 수 있을까?](#변경된-레이어zindex를-어떻게-모든-요소에-적용해-줄-수-있을까)
  - [저장하기](#저장하기)
    - [`SVG`, `Text`, `Image`, `GIF`를 하나의 데이터로 저장할 수 있는 방법이 무엇일까?](#svg-text-image-gif를-하나의-데이터로-저장할-수-있는-방법이-무엇일까)
    - [캡쳐한 데이터를 어떻게하면 GIF로 만들 수 있을까?](#캡쳐한-데이터를-어떻게하면-gif로-만들-수-있을까)
  - [UX](#ux)
    - [드래그 앤 드랍을 활용해 보자!](#드래그-앤-드랍을-활용해-보자)
    - [이미지 에디터 툴의 유저 자유도를 위한 Color Picker 구현](#이미지-에디터-툴의-유저-자유도를-위한-color-picker-구현)

- [작업 기록](#schedule)
- [Repository Link](#repository-link)
- [기술 스택](#tech-stacks)
- [Memoir](#memoir)

<br>
<br>

# 동기

이번 프로젝트의 목표는 모바일이라는 특성상 마우스가 아닌 **손가락을 이용해 `GUI`를 잘 이용할 수 있는 기능이 있는 모바일 어플리케이션**을 만들어보고자 하였습니다.

<p>
  <img width=150 src="https://github.com/new-name/client/assets/113571767/b04fcfc2-c7cc-47ea-96f4-d9a25965fe51" />
</p>

그렇다면 "터치를 이용해 이미지를 편집하는 것은 어떨까?" 라는 고민에서 시작해 범위를 핸드폰 화면으로 한정시켜 **명함 에디터**라는 컨텐츠로 결정짓게 되었습니다.

기존의 명함을 스캔해 핸드폰에 저장하는 상황을 유저가 사용하는 입장에서 생각을 해보았을 때, **"실물을 스캔하는 것이 아닌 처음부터 명함을 데이터로만 갖고 다닐 수 있게 하면 되겠다"** 라는 생각으로 이어졌습니다.

추가적으로 명함은 자신의 아이덴티티를 나타내는 요소 중 하나라 생각했습니다. 이에 **GIF 같은 동적 이미지**가 들어간다면 디지털 명함이 더 재밌어 질 거라 생각해 접목해보고자 하였습니다.

<p>
  <img src="https://github.com/new-name/client/assets/113571767/6f86f463-4baa-4e32-a165-dd7983de939d" width="300"/>
  <img src="https://github.com/new-name/client/assets/113571767/eb9d26ae-c3dc-4fe0-abc5-b44b55ec58a3" width="200"/>
</p>
<p>
  GIF가 명함에 추가된다면 어떨까?
</p>

<br>

# **서비스 화면**

<p>
  <img src="https://github.com/new-name/client/assets/113571767/ebda12bd-8a68-4873-9b31-acc224ead392" width="200"/>
  <img src="https://github.com/new-name/client/assets/113571767/34729d7d-0194-4409-b4c8-0d8bd21bff3e" width="200"/>
  <img src="https://github.com/new-name/client/assets/113571767/5b3cdbc1-b899-4129-bed6-f3f230e9acea" width="200" height="380"/>
  <img src="https://github.com/new-name/client/assets/113571767/50ffbe1b-02cc-4191-ae2a-33f918cd56a8" width="200" height="380"/>
</p>
<p>
  NEWNAME으로 만든 예시 명함들과 서비스 화면
</p>

[🎥 영상으로 확인하기!](https://vimeo.com/834884864?share=copy)

# **고민한 부분**

## **핑거 제스쳐 다루기**

프로젝트 진행 중 제일 먼저 고려했던 부분은 터치요소를 어떻게 내가 원하는 방식으로 컨트롤 할 지 였습니다.

모바일 어플리케이션이라는 특성상 손가락의 제스처를 이용해 요소를 원하는 대로 다루는 것이 가장 중요한 요소라고 생각하였고,
이러한 제스처를 다루는 기능을 라이브러리로 해결하면 의존성이 높아질 것이라 판단하였습니다.

이에 `RN`의 내장 `API`인 `PanResponder`를 이용해 **멀티 터치를 하나의 액션으로 바꿀 수 있는 기능**에 대해 근본적으로 알아가보고자 하였습니다.

<br>

<p>
  <img width="500" src="https://github.com/new-name/client/assets/113571767/b1e5fdc4-c2ed-4769-8d08-229fa5771c3f"/>
</p>

<br>

### **_`PanResponder`를 이용해 원하는 요소를 손가락의 이동만큼 이동시킬 수 있을까?_**

<hr>

`PanResponder`는 `RN`의 라이프 사이클을 관리하는 `Gesture Responder System`에 의해 터치가 하는 일의 예측을 가능하게 해줍니다.

1. `PanResponder` 인스턴스를 생성하기 위해서는 `PanResponder`의 정적 메소드인 `PanResponder.create`를 통해 PanResponder의 인스턴스를 생성합니다.
2. 이를 React의 함수형 컴포넌트 안에서 상태로 관리하기 위해서는 useRef 또는 useEffet와 useState를 결합한 상태로 관리할 수 있습니다.

<br>

<p>
  <img width="600" alt="image" src="https://github.com/new-name/frontend/assets/113571767/32cf74cc-a11a-4fc3-ba19-78e315072fdf">
</p>

<br>

여기에서 저는 `useRef`를 이용하지 않고 `useEffect`와 `useState`를 이용하였습니다. 그 이유는 `useRef`를 이용할 경우 값이 변경되어도 리페인팅이 되지 않고 값을 참조할 수 있으나,
이미지나 GIF 또는 다른 요소들의 크기혹은 위치가 변경되는 작업은 리페인팅이 다시 되어야 하기 때문에 후자를 이용하는 것이 나은 방법이라 판단하였습니다.

추가적으로 `RN`상에서는 어떤 `View`를 터치할 경우 이벤트 버블링이 발생해 제스처에 대응하는 이벤트 핸들링이 가장 아래 `View`(RN UI의 기본 단위)로 부터 시작합니다.
이를 제스처 컨트롤이 내부의 자식 `View`부터 이벤트를 컨트롤 하는 것을 원치 않는다면 `PanResponder`의 `onStartShouldSetPanResponder` 속성을 `true`로 만들어줘야 합니다.
또한 `PanResponder`로 인스턴스를 부드럽게 관리하기 위해서는 `View`가 아닌 RN의 내장 API인 Animated.View와 Animated.Value를 이용해야 합니다.

<br>

<p>
  <img width=600 src="https://github.com/new-name/frontend/assets/113571767/5373e262-5e7d-4060-8b30-a979c481c469" />
</p>

<br>

<img width="508" alt="image" src="https://github.com/new-name/frontend/assets/113571767/95db5143-327d-4c4d-9af3-ab0bdde53602">

다음은 onPanResponder의 속성입니다.

- `onPanResponderGrant` : `PanResponder`의 **손가락이 닿고나서 처음 움직일 시**의 이벤트를 액션으로 바꿀 수 있는 속성입니다.
- `onPanResponderMove`: **움직이는 도중** 이벤트를 액션으로 바꾸는 속성입니다. 이는 손가락이 첫 움직임이 생긴 후 떼지기 전까지 일련의 연속적인 제스처를 액션으로 컨트롤 합니다.
- `onPanResponderRelease`: **손가락이 떨어지는 순간** 액션을 정의할 수 있습니다.

<br>

## `PanResponder` 이슈

<br>

### **원하는 만큼 이동되지 않는 이슈**

<hr>

위의 속성을 이용해 처음 생각은 **손가락이 이동한 만큼 누적시켜주면 되지 않을까?** 라는 생각을 했었습니다.

하지만 **원하는 만큼 값이 이동되지 않고 계속해서 누적되는 이슈**가 있었습니다.

이를 해결하기 위해 여러 시도를 해보았고 값을 액션마다 초기화 시켜주어야 한다는 것을 알았습니다.

아래는 예시 코드입니다.

<p>
  <img width="750" alt="image" src="https://github.com/new-name/frontend/assets/113571767/9d74fd57-000c-41aa-9460-0fdaed1bec34">
</p>

 <br>

### **값이 변화하지 않는 이슈**

<hr>

처음 구현 당시 터치를 해서 이동할 경우, 원하는 값 만큼 이동하지 않고 예상되는 값이 아닌 다른 값을 얻는 이슈가 발생하였습니다.
문제를 생각해보니 `PanResponder`를 이용할 경우 `useState`의 경우 **`batch`라는 여러 상태 업데이트를 일괄 처리하는 속성**을 이용해 실행이 됩니다.
이는 비동기적으로 실행이 되다 보니 즉각적으로 값이 반영 되지 않을 수 있었습니다.

이로 인해 터치가 될 때, 터치가 바로 눌린 현재의 값만 이용할 수 있었고 `PanResponder` 인스턴스 속에 `useState`로 관리한 값의 경우 즉각적으로 피드백되어 반영될 수 없었습니다.
그래서 `useRef`를 이용하였습니다. `useRef`는 항상 최신의 상태를 참조할 수 있었기에 해결 할 수 있었습니다.

<p>
  <img width="672" alt="image" src="https://github.com/new-name/frontend/assets/113571767/85ab64ee-df3a-4c9c-8119-9feb87d12bd5">
</p>

<br>

## **사이즈를 조절할 때는 어떻게 해야 할까?**

<hr>

이동을 다루는 것은 하나의 손가락이 이동한 거리만큼을 누적으로 합산해 표시를 해주었는데, 사이즈를 조절하는 것은 어떻게 해야할까? 라는 고민에 맞닥뜨리게 되었습니다.

이에 사용자가 친숙하게 느낄 수 있는 사이즈 조절 방법을 두가지 생각해보게 되었습니다.

1. 두개의 손가락을 이용해 핀치 줌,아웃을 이용하는 방법
2. 슬라이더 스크롤을 이용해 정밀하게 조절하는 방법!

<p>
  <img width=150 src="https://github.com/new-name/frontend/assets/113571767/5b364cf7-5a39-4ccf-9ffc-48b503c57f3d" />
  <img width=150 src="https://github.com/new-name/frontend/assets/113571767/9667b149-1d5e-4075-8f71-764d75ef6535" />
</p>

<br>

### **두개의 손가락을 이용해 핀치 줌,아웃으로 사이즈를 조절 하는 방법**

<hr>

<br>

저는 두가지의 방법을 다 적용하되, 처음 방법인 두 손가락의 거리가 처음 닿았을 때를 구하는 것부터 시작을 해보자라고 생각을 하였습니다.
이를 위해서는 두 손가락이 닿는 변수를 가져올 필요가 있었습니다. 이에 `PanResponder`의 각 속성의 내부를 확인했습니다.

<p>
  <img width=400 src="https://github.com/new-name/frontend/assets/113571767/07ada4af-0241-4704-904d-0bdc457f2143" />
</p>

- 여기서 `event`인자 속의 `nativeEvent`를 찾았고 거기에서 `touches`라는 배열을 볼 수 있었습니다.
- 이후 `touches` 배열의 길이는 손가락이 맞닿아 있는 상태의 길이라는 것을 알 수 있었습니다.

**어떻게 하면 두 손가락의 이동하는 거리를 구할 수 있을까?** 이 그 다음의 화두 였습니다.

1. 크기의 조절은 핀치 줌등을 통해 조절한다는 것을 조사를 통해 알 수 있었습니다.

<p>
  <img width=300 src="https://github.com/new-name/frontend/assets/113571767/df858586-9575-4f7a-9936-27459fac8276" />
</p>

2. 두 점 사이의 거리를 구한다라는 개념으로 접근해 보니 피타고라스의 정리를 떠올릴 수 있었습니다.

<p>
  <img width=300 src="https://github.com/new-name/frontend/assets/113571767/7b5a783b-7ad1-48ed-8de2-56f185b4eb97" />
</p>

3. 여기에서 두 손가락 사이의 거리를 구하는 피타고라스의 정리를 이용해 `getDistance`함수를 표현하여 값을 구하였습니다.

<p>
  <img width="400" alt="image" src="https://github.com/new-name/frontend/assets/113571767/b68098c1-137a-43fc-bc8d-afe60935f986">
</p>

<p>
  <img width="450" alt="image" src="https://github.com/new-name/frontend/assets/113571767/aa06ea45-e5af-4346-9815-1aa684dbd2b9">
</p>

4. `onPanResponderGrant`의 `distance`를 초기 값으로 잡아 준 뒤 `onPanResponderMove`를 이용해 이동 중일 때의 값과 초기 값을 비교하여 `scaleFactor`를 계산해주었습니다.

<p>
  <img width="500" alt="image" src="https://github.com/new-name/frontend/assets/113571767/abb0842c-d0af-47db-8ae6-f06afc3c1f24">
</p>

5. 이를 이용해 `Animate.View`의 크기를 변화 시켜 주었습니다.

<br>

### **X축과 Y축 개별 조절**

<hr>

그 이후는 비례가 아닌 X축과 Y축의 scale을 개별적으로 조절 할 수는 없을까? 라는 고민을 해보게 되었습니다.

- 이번에는 피타고라스의 정리를 이용하는 것이 아닌 손가락의 X축 이동 범위와 Y축 이동 범위중 큰 부분이 중심이 되어 이동하면 되겠다 라고 생각하였습니다.
<p>
  <img width="800" alt="image" src="https://github.com/new-name/frontend/assets/113571767/07190253-27ea-48d3-aa5b-a594b07cbe46">
</p>

- `sizeProportionMode`를 설정한 뒤 비례 모드가 아닐 때는 `X`와 `Y`의 `scaleFactor`를 거리의 차를 이용해 구해주었습니다.

<br>
<br>

## **상태 관리**

<br>

### **여러 요소의 상태 관리를 용이하게 하는 방법은 무엇일까?**

<hr>

이렇게 위의 고민들을 지나쳐 오니 이미지와 요소들을 터치를 이용해 조절하는 방법은 강구하였으나, 추가적인 문제가 있었습니다.
Text, Image, Gif, SVG들에게 **각각의 값을 개별적으로 저장하고, 레이어를 관리하는 작업을 하기 위해** 각 객체마다의 상태를 통합적으로 관리하는 작업이 필요했습니다.

각 컴포넌트의 엘레멘트들을 하나로 모을 수 있는 전역 상태 관리가 필요했고, 이를 위해 Redux를 선택하게 되었습니다.

<p>
  <img width="500" alt="Untitled" src="https://github.com/new-name/frontend/assets/113571767/253a3fd7-fcfe-4883-b917-d610980adeb3">
</p>

<br>

### **요소마다 변경되는 속성을 어떻게 바로바로 관리해줄 수 있을까?**

<hr>

하나의 화면에 여러 요소를 보여줄 수 있는 방법을 고민해 본 뒤, 각 요소마다 Elements를 분리해 렌더링할 수 있게 하였습니다.

Text요소 예시

1. `TextEditor` 컴포넌트를 통해 `Text` 추가를 누를 경우,
2. `Redux`를 통해 `textSlice`에 포함되고 `TextElements`에서 렌더링 됩니다.
3. 추가된 요소들을 다시 `EditorRenderer` 컴포넌트에서 `editorSlice`에 추가해준 후 Layer를 부여합니다.

<br>

<p>
  <img width="500" alt="Untitled" src="https://github.com/new-name/frontend/assets/113571767/14a52fc0-2da6-4857-80c5-e13829c3f00b">
</p>

<br>

<p>
  <img width="192" alt="image" src="https://github.com/new-name/frontend/assets/113571767/640962d8-3744-4966-9c35-82e9656e2f1b">
</p>

모든 요소가 렌더링 되는 View

<p>
  <img width="428" alt="image" src="https://github.com/new-name/frontend/assets/113571767/6efd04c4-6a57-4a8c-a593-b2aedf8c6278">
</p>

<br>

### **변경된 레이어(zIndex)를 어떻게 모든 요소에 적용해 줄 수 있을까?**

<hr>

이미지 툴의 경우에는 편집이 자주 일어나기 때문에 레이어가 수시로 바뀔 수 있습니다.

그렇다면 위에서 부여한 **layer를 변화시킬 필요가 있을 때는 어떻게 해야할까?** 가 두번재 화두로 떠올랐습니다.
생각한 방법은 **이걸 단방향으로 상태를 관리하면 되지 않을까?** 라는 생각으로 진행하였습니다.

1. `textElements` => `allElements` => `layerElements`
2. `layerElements` => `textElements` (layer 변경사항 반영)

<br>

<p>
  <img width="350" alt="Untitled" src="https://github.com/new-name/frontend/assets/113571767/dde93bde-1df8-493a-b770-6e0e4f66798c">
</p>

<img width="550" alt="image" src="https://github.com/new-name/frontend/assets/113571767/dde688f1-65d4-45d9-9bdf-33cf14fab2be">

<br>

## **저장하기**

<br>

### **`SVG`, `Text`, `Image`, `GIF`를 하나의 데이터로 저장할 수 있는 방법이 무엇일까?**

<hr>

이렇게 변경된 객체들을 다시 렌더링 시켜주는 작업까지 완료하였으나, **각각의 다른 객체들을 어떻게 하나로 저장해야 하지?** 라는 생각이 떠올랐습니다.

이를 위해 조사를 해본 뒤 두가지의 방법을 확인하게 되었습니다.

1. 각 데이터를 변환 시켜 하나의 이미지로 만드는 방법
2. 하나의 영역을 캡쳐하는 방법

이 중에서 2번의 방법을 선택하는 것이 하나의 캡쳐 영역만 관리하면 되기 때문에 에러를 핸들링하기에 용이할 것이라 생각해 진행하였습니다.

<br>

### **캡쳐한 데이터를 어떻게하면 GIF로 만들 수 있을까?**

<hr>

이제 다음 문제는 `Image`의 경우에는 쉽게 `Expo`의 내장 `API`를 이용해 캡쳐를 하면 됐지만 `GIF`의 경우 어떻게 저장할 수 있을까?에 대한 문제가 있었습니다.

**`GIF`로 변환 해주는 것을 `PNG`로 영역 내의 가장 긴 GIF의 길이 만큼 프레임마다 캡쳐해준 뒤 그것을 `GIF`로 만들어주면 되지 않을까?** 라는 접근으로 시작해 보았습니다.

`PNG`를 `GIF`로 바꾸는 것은 라이브러리를 이용하지 않고 시도해 보았으나, PNG를 GIF로 바꾸는 것에 상당한 무리가 있었기에 라이브러리를 이용하기로 판단하였습니다.

이에도 문제는 있었습니다.

- `RN`이 가지는 한계점: `RN`이기 때문에 `PNG`를 `GIF`로 바꾸는 라이브러리가 `NODE`기반이기에 사용할 수 없어 서버로 보내준 뒤 그것들을 서버에서 `GIF`로 만들어 다시 `RN`으로 보내주는 방식을 채택하였습니다.
- 번거로운 일련의 작업: `PNG`를 `GIF`로 바꾸는 작업은 상당히 많은 작업이 필요로 여겨집니다.

1. `PNG`를 프레임마다 캡쳐하고 `Expo`의 파일 시스템에 저장
2. 파일 시스템에 저장된 `PNG`를 `base64`로 인코딩
3. `base64`로 인코딩한 `PNG` 배열을 서버로 보내주기
4. 서버에서는 `base64`을 디코딩하여 `GIF`로 변환한 뒤 다시 `base64`로 인코딩 한 후 `RN`으로 반환
5. `RN`에서는 `base64`를 다시 디코딩한 후 `GIF`로 저장하기.

<p>
  <img width="400" alt="Untitled" src="https://github.com/new-name/client/assets/113571767/bbf2a3da-5687-4158-8f69-61114463a3ac">
</p>

여기에서 `base64`란 이미지등을 쉽게 변환할 수 있는 아스키코드의 문자들로 이루어진 64진법으로 인코딩한 방식입니다.

<img width="600" alt="image" src="https://github.com/new-name/frontend/assets/113571767/7a947876-d244-41b3-a6de-c56c1fa7a304">

`frame`이 반복되는 수 만큼 `capture`를 해준 뒤

<img width="800" alt="image" src="https://github.com/new-name/frontend/assets/113571767/42b88418-1a13-43c8-8002-bd4c8cc0cf14">

`frames`에 `capture`가 된 것을 프로미스를 통해 체크 => 이것들을 `base64`로 변환해서 다시 배열에 담아 서버로 전송.

**서버에서 받은 뒤**

<img width="600" alt="image" src="https://github.com/new-name/frontend/assets/113571767/18e4e7d0-4e46-4100-8cbd-1a2ec03daf21">

서버에서 GIF 라이브러리와 이미지 리사이징 라이브러리를 통해 GIF 구현

`Buffer`를 이용해 한 프레임의 `base64`가 다 들어오면 하나하나마다 `sharp` 라이브러리를 통해 `PNG`로 다시 만들어 준 뒤 `GIFEncoder`라이브러리의 프레임 마다 넣어 `GIF`로 만들어 주었습니다.

<br>

<p>
  <img width="150" alt="Untitled (1)" src="https://github.com/new-name/client/assets/113571767/9e529a73-e8d8-48ae-975d-2c4bba216458">
</p>
<p>
  하나의 성공적인 GIF가 생성되었습니다!
</p>

<br>

## **UX**

<br>

**어떻게 하면 유저 친화적으로 만들 수 있을 까?**

저는 항상 유저의 입장에서 생각해 보기 때문에 유저가 불편함을 느끼지 않을 화면 단계와 조작부를 구현하고 싶었습니다.

첫번째는 모바일 이라는 특성상 손가락으로 접촉해 컨트롤 하는 것들이 웹보다 더 크게 다가올 수 있는 요소라고 판단하였습니다.

그렇다면 터치로 조작하는 것을 어떻게 하면 좀 더 유저들이 느끼기에 편하게 할 수 있을까? 라는 고민이 생겼습니다.

두번째는 화면 구성을 유저들이 기시감을 느끼지 않을 화면 단계와 GUI로 구성하고 싶었습니다.

<br>

### **드래그 앤 드랍을 활용해 보자!**

<hr>

1. `Layer`의 순서를 변경할 때 드래그 앤 드랍을 활용하는 것이 사용자 경험 면에서 좀 더 친화적일 것이라 판단하였습니다.
2. 이를 위해 `PanResponder`의 이벤트 속에서 드래그한 레이어를 옮기는 행위가 일정 수치 범위 이상을 넘어갈 때 자료의 순서가 변경되게 하였습니다.
3. `newIndex`를 생성한 뒤 구조 분해 할당을 이용해 배열의 순서를 변경해 주었습니다.
4. `zIndex`를 이용해 객체들을 재정렬 해준 뒤 업데이트 시켜주는 작업을 진행하였습니다.
5. `Stack`(LIFO) 구조를 차용해 마지막 생긴 엘레멘트가 가장 위에 쌓이게 설계하였습니다.

<img width="350" alt="image" src="https://github.com/new-name/frontend/assets/113571767/126836cb-121d-4f07-a56d-23e2f25f4929">

<p>
  <img width="600" alt="image" src="https://github.com/new-name/frontend/assets/113571767/787b1d88-f483-4941-8f89-6b483dfe038a">
</p>

<p>
  <img width="150" alt="image" src="https://github.com/new-name/frontend/assets/113571767/77690f24-16da-4b2a-8ba1-2644db6869ab">
</p>

### **이미지 에디터 툴의 유저 자유도를 위한 Color Picker 구현**

<hr>

3rd Party 라이브러리를 이용해 의존성을 높이기 보다는, 자체적으로 Color Picker를 구현해 이미지 에디터 툴의 자유도를 높이고 싶었습니다. 
Fill, Stroke, Opacity Slider를 구현하였고,

`PanResponder`를 사용해 `Opacity` Slider를 컨트롤 하고 싶었습니다.
이에 손가락의 위치를 `Opacity Handler`에 제한 시켜 그 안에서 x좌표로 이동한 값 만큼의 `Opacity`를 계산하였습니다.

<p>
  <img width="650" alt="image" src="https://github.com/new-name/frontend/assets/113571767/976d3806-878b-4e4f-b175-a0c7413a01f8">
</p>

<p>
  <img width="150" alt="image" src="https://github.com/new-name/frontend/assets/113571767/6d6372dd-3e25-4ec7-8fd7-751f025692d7">
  <img width="150" alt="image" src="https://github.com/new-name/frontend/assets/113571767/c9c73fc6-8f54-499c-9c9e-462c136dd3a3">
  <img width="150" alt="image" src="https://github.com/new-name/frontend/assets/113571767/ca3f6a24-ff16-4016-97ff-baf27a88e5c6">
  <img width="150" alt="image" src="https://github.com/new-name/frontend/assets/113571767/44599cd8-b82f-4790-ab4d-9bad79325a7b">
</p>

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

### **1. Why Redux?**

- 관리의 용이: 하나의 저장소로 부터 근원적으로 관리되는 상태 관리를 할 수 있습니다.
- 예측성: 엄격한 단방향 데이터 흐름을 제공하고, 이전 상태와 액션을 받아 다음 상태를 반환하는 순수 함수인 리듀서를 통해 예측 가능성이 높습니다.
- 디버깅: 앱의 상태가 언제, 어디서, 왜, 어떻게 바뀌었는지 쉽게 추적할 수 있는 기능을 제공해 유용합니다.
- 확장성: 다른 상태 관리 라이브러리에 비해 무거워 대규모 어플리케이션 관리에 용이해 높은 확장성을 가지고 있어 사용하였습니다.

### Backend

- [Node.js](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)
- [MongoDB](https://www.mongodb.com/cloud/atlas/register)
- [Mongoose](https://mongoosejs.com/)
- [AWS S3](https://aws.amazon.com/ko/s3/)
- [ESLint](https://eslint.org/)

### **2. Why MongoDB?**

- 자유로운 스키마: 규격화 된 스키마를 제공하는 것이 아니라 구조 변경을 원할 때 자유롭게 수정할 수 있어 확장 또한 자유롭습니다.
- 문서 지향: 다양한 데이터 필드 세트를 담을 수 있는 유연한 JSON(BSON) 유사 형식으로 저장되어, 복잡한 것을 단순화 시키기에 용이합니다.
- 풍부한 쿼리: 다양한 텍스트 검색과 위치 등 풍부한 쿼리 언어와 보조 인덱스를 제공해 DB를 손쉽게 이용할 수 있습니다.

<br>
<br>

# Memoir

React Native를 처음 다뤄보며 느꼈던 점은 "손가락이라는 접점으로 벌어지는, 수 많은 일들이 있구나" 였습니다. 웹만을 공부했다면 집중해보지 못했을 제스쳐라는 부분이 재미있는 요소로써 작용했던 것 같습니다.

이와 동시에 기존의 제가 사용하던 앱들이 그냥 허투로 만들어진 것이 아니고 디테일을 챙긴 부분들이 정말 많구나라는 것을 다시금 느껴보게 되었습니다. 이번 경험을 통해 기존에 사용하던 모바일 서비스들을 손가락이 눌릴 때 부터 떼어질 때 까지의 일들에 대한 관심을 많이 가져보게 된 계기가 되어 저에게 좋은 영향을 주었습니다.

저는 앞으로도 이와 같이 해결해야 할 요소들이 가득한 프로젝트들과 함께할 것인데 이 상황이 개발을 지속적으로 흥미있게 만들어 준다 생각합니다.

이러한 지속적인 흥미와 탐구를 통해 여러 프로젝트들을 풀어 나가보고 싶다는 생각을 가지게 되어 좋은 경험이었습니다.

- [정영빈](https://github.com/oyobbeb) : oyobbeb@gmail.com
