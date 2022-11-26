# Web Collage

 웹페이지의 HTML DOM요소를 가져와 사용자가 원하는 형식으로 재구성할 수 있는 스크랩 크롬 익스텐션입니다.

사용자는 웹페이지 상에 문서등을 읽을때 불필요한 사이드 바, 해더등을 제외하고 원하는 내용만 담아 가독성을 높일 수 있도록 재구성할 수 있습니다.

> Deploy(Chrome Web Store) : [Web Collage](https://chrome.google.com/webstore/detail/web-collage/pdiapdjejpnapdhjnlnifjkkddephbkb?hl=ko&authuser=0)
#
<br/>
<br/>

### `🗄 레포지토리 링크`

- [Frontend(Web)](https://github.com/serbi2012/web-collage-frontend)
- [Backend](https://github.com/serbi2012/web-collage-backend)

#
<br/>
<br/>

### `⚙️ 셋업 설명`

### Frontend

1. [해당 Repository](https://github.com/serbi2012/web-collage-frontend)를 git clone을 한다.
2. 환견변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력한다.
    
    ```jsx
    PORT=PORT
    SERVER_ADDRESS=SERVER_ADDRESS
    ```
    
3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ yarn install
    $ npm start
    ```
    
<br/>

### Backend

1. [해당 Repository](https://github.com/serbi2012/web-collage-backend)를 git clone을 한다.
2. 환경변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력한다.
    
    ```jsx
    MONGODB_URL=MONGODB_URL
    ```
    
3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm run dev
    ```
    
<br/>  
<br/>    

### `🎥 기능 시연 영상`

<details>
  <summary>Scrap</summary>
  
https://user-images.githubusercontent.com/99075014/204039646-bd28d3da-d5f5-4fbe-a28a-6ac68852f103.mov

</details>

<details>
  <summary>Select Mode</summary>
  
https://user-images.githubusercontent.com/99075014/204039674-25289de2-d466-462e-ae51-c4e8dbee43ca.mov

</details>

<details>
  <summary>Edit Mode</summary>
  
https://user-images.githubusercontent.com/99075014/204039700-73fd32f2-3e86-4c29-b151-eb872bbb984f.mov

</details>

<details>
  <summary>Box Mode</summary>
  
https://user-images.githubusercontent.com/99075014/204039717-89e088cd-cc32-436f-99b8-31485b115f97.mov

</details>


<details>
  <summary>Drawing Mode</summary>
  
https://user-images.githubusercontent.com/99075014/204039740-0c5bf28c-e446-4a4f-8f9a-c9ca94c1bb6c.mov

</details>

<details>
  <summary>Share Mode</summary>

https://user-images.githubusercontent.com/99075014/204039763-73f38fbb-bda4-43cb-a5a1-9d397e2281c5.mov

</details>

<details>
  <summary>Save Mode</summary>
  
https://user-images.githubusercontent.com/99075014/204039784-8aa35b64-f03d-468b-a898-8554079ae852.mov

</details>

<details>
  <summary>Theme Mode</summary>

https://user-images.githubusercontent.com/99075014/204039800-67c25fe5-df90-4a74-a1ea-a2369fdfa83e.mov

</details>

<br/>
<br/>

### `🛠 기술 스택`

## Frontend(web)

- React
- Canvas
- Socket io(Client)
- Redux-Toolkit
- Axios
- Cheerio

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Socket io(Server)

## Depoly

- Chrome Web Store (Frontend)
- AWS Elastic Beanstalk (Backend)

#
<br/>
<br/>

### `🗓 프로젝트 기간`

**2022년 11월 7일 ~ 11월 25일**

- 11월 7일 ~ 11월 12일 : 아이디어 기획, 기술 검증 및 구현 방법 리서치, 목업 작성, 칸반 작성
- 11월 13일 ~ 11월 25일 : 개발 진행, 배포, 테스트 작성

#
<br/>
<br/>

### `💡 핵심 구현 사항`

<details>
  <summary>Web Window</summary>
  
  Web Window는 사용자가 지정한 url에 해당하는 웹페이지를 보여주는 창이다. 사용자가 실제로 사용하는 웹페이지와 동일한 사용자 경험을 제공하기 위해서는 원본 웹페이지와 유사한 모습이어야 했다. 그리고 구현된 웹페이지에서 Dom 요소를 가져올 수 있어야 했다.
  
  처음 선택한 구현 방법은 iframe 이었다. iframe의 src 속성에 사용자가 지정한 URL을 추가하여 해당 웹페이지를 구현하는 것이었다. 하지만 google, naver 등 x-frame-options이 허용되지 않는 사이트는 접근이 불가능한 이슈가 있었다. 하지만 나는 Chrome Extension이라는 특성을 살려 chrome.webRequest라는 Chrome API를 통하여 x-frame-options을 우회하는 방법으로 해당 이슈를 해결했었다. 하지만 이러한 방법에는 큰 문제가 있었다. 바로 XSS를 비롯한 보안 이슈였다. iframe은 악의적인 사용자가 치명적인 플러그인 실행, 사용자의 클릭, 키 입력 도용 등을 유발할 수 있다. 이러한 보안적인 이유의 연장선상으로 cross-domain 간의 iframe DOM 접근 또한 차단되어 있었다.

  때문에 해당 웹페이지의 HTMLstring을 가져와 직접 구현하는 방향으로 선회하였다. 사용자가 지정한 URL을 axios를 통해 GET 요청을 하여 HTMLstring을 가져왔다. 그리고 해당 HTMLstring을 dangerouslySetInnerHTML을 통해 렌더링 하였다. 하지만 이 경우 Image, Video, Script, Link 등의 리소스를 제대로 불러오지 못하는 이슈가 있었다. 원인은 해당 리소스들의 경로가 상대 경로로 구성되었기 때문이었다. 때문에 cheerio를 통하여 HTMLstring 내에 상대 경로들을 source domain을 통한 절대 경로로 바꾸어주었다. 그 결과 정상적으로 Web Window가 구현이 되었다.

<br/>
<br/>

</details>

<details>
  <summary>Dom 요소 드래그 앤 드랍</summary>
  
React 환경에서 드래그 앤 드롭을 구현하고 싶다면 다양한 방법이 있다. 그중 가장 편리하고 빠른 방법은 react-beautiful-dnd과 같은 라이브러리를 사용하는 방법이다. 하지만 단순히 기능 구연만을 하는 것이 아니라 그 기능이 어떠한 원리로 구성되어 있는지를 배워가는 것이 더 가치 있다고 판단하여 드래그 앤 드롭을 라이브러리 없이 직접 구현하기로 결정하였다.
  
드래그 앤 드롭은 크게 3가지의 단계로 나뉜다. `mousedown, mousemove, mouseup` 이벤트가 발생할 때이다.
  
`mousedown`이 발생하면 마우스 위치에 있는 요소 즉, `event.target`을 가져온다. 그리고 현재 드래그 중임을 나타내는 dragging 변수를 ture로 바꾼다.
  
`mousemove`가 발생하면 해당 요소의 top, left 속성을 마우스의 위치 clientY, X와 동기화시킨다.
  
`mouseup` 이벤트가 발생하면 현재 마우스가 위치한 Element에 드래그한 DOM 요소를 넣는다.

하지만 드래그 앤 드롭이 완료되면 Web Window에 있는 요소가 사라지는 현상이 발생했다. 원인은 `insertAdjacentElement`가 실행되면 2번째 인자에 해당하는 노드는 사라지기 때문이었다. 때문에 `cloneNode(true)`를 사용하여 해당 노드를 깊은 복사한 노드를 insertAdjacentElement 하도록 로직을 수정하여 해결했다.

<br/>
<br/>

</details>

<details>
  <summary>ContentEditable</summary>
  
Edit Mode 구현에서 가장 중요한 점은 사용자가 수정을 할 때 해당 태그에 직접 입력 및 수정할 수 있어야 한다는 것이었다. 그리고 그 과정에서 해당 DOM 요소의 style 속성 또한 유지되어야 했다.
  
처음 선택한 구현 방법은 사용자가 선택한 요소를 innerText를 통해 수정하는 방법이었다. 사용자가 선택한 요소의 Text를 숨겨진 input을 통해 수정하는 방법이었다. 하지만 해당 방법으로 구현 시 커서의 구현이 어려웠다. 그리고 Edit Mode에서만 수정이 가능하도록 해당 input에 focus를 강제하는 로직 구현에도 난항이 계속되었다.
  
관련 레퍼런스를 리서치 중 ContentEditable이라는 속성을 발견하였다. ContentEditable 속성은 HTML 요소를 input이나 textarea처럼 텍스트를 작성하고 수정할 수 있는 상태로 만들어준다. ContentEditable의 이점은 단순히 텍스트를 추가, 제거하는 것만이 아니라 Bold, Underline 등 텍스트 중 일부분의 요소만 스타일을 변경하는 것이 가능하다는 것이다. 해당 속성을 적용함으로써 사용자가 Edit Mode 적용 시 텍스트 에디터를 사용하는듯한 사용자 경험을 제공할 수 있었다.

<br/>
<br/>

  </details>

<br/>
<br/>
