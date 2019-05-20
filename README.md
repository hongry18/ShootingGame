# Shooting Game

## lists
* base canvas example
  * draw line, rect, arc
* 등속운동, 등가속도 운동
* 포물선 운동
* localStorage 사용

## convention
* 객체를 만드는 함수를 정의할 때 대문자로

## 게임 개요
* 땅에는 좌우로 움직이는 지대공 전차가 있다
* 하늘에는 비행기가 날아다니고
* 전차는 미사일을 발사할 수 있고
* 미사일을 발사하여 비행기를 맞추면 점수를 얻는다.

## 객체 구현
* flak (전차)
* missile
* plain

## 객체의 겹침
* 원 - 두 원의 중점의 거리가 각 원의 반지름의 합보다 작으면 겹쳐있다 r1(반지름) + r2(반지름) >= distance(두 원의 중점의 거리)
* 사각형일 경우 A, B 를 두고
  1. A.topRight.Y < B.bottomLeft.Y or A.bottomLeft.Y > B.topRight.Y
  2. A.topRight.X < B.bottomLeft.X or A.bottomLeft.X > B.topRight.X
  위 두경우를 제외한 모든 경우는 두 사각형이 겹쳐있다고 판단. 위 조건문에서는 사각형의 겹침이 아닌 것을 찾는게 더욱빠르다고한다
* polygon(다각형) - 현 게임에서는 사각형화 시켜 테두리끼리의 비교

## reference
* https://www.youtube.com/watch?v=6dzPVqpghOw (캔버스)
* https://www.youtube.com/watch?v=VstW4lXRoiY (캔버스와 타이머)
* https://www.youtube.com/watch?v=vqmUp2dED7w (캔버스와 포물선운동1)
* https://www.youtube.com/watch?v=0m8iXtDWJts (캔버스와 포물선운동2)
* https://www.youtube.com/watch?v=BicsKb9PY3M (비행기 1)
* https://www.youtube.com/watch?v=gDklaACqpuI (비행기 2)
* https://www.youtube.com/watch?v=3Eewfu3v_08 (비행기 3)