# 해시맵

## 미션

- [x] 문자열 키와 문자열 값을 저장하는 해시맵 라이브러리를 구현한다.
- [x] 고유한 Hash 함수를 정한다.
  - [x] put(String key, String value) 키-값을 추가한다.
  - [x] remove(String key) 해당 키에 있는 값을 삭제한다.
  - [x] containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
  - [x] get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
  - [x] isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
  - [x] keys() 전체 키 목록을 [String] 배열로 리턴한다.
  - [x] replace(String key, String value) 키-값으로 기존 값을 대체한다.
  - [x] size() 전체 아이템 개수를 리턴한다.
  - [x] clear() 전체 맵을 초기화한다.
- [x] 객체 형태로 만든다.
- 객체는 JavaScript prototype 속성을 활용한다.

## Hash Map 이란?

해시 테이블(hash table), 해시 맵(hash map), 해시 표는 컴퓨팅에서 키를 값에 매핑할 수 있는 구조인, 연관 배열 추가에 사용되는 자료 구조이다. 해시 테이블은 해시 함수를 사용하여 색인(index)을 버킷(bucket)이나 슬롯(slot)의 배열로 계산한다.
