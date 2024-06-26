# FCFS Lecture Application

## 개요

선착순 수강 신청 시스템을 구현하기 위한 백엔드 애플리케이션입니다.

## 주요 기능

- 강의 및 스케줄 생성
- 사용자 수강 신청
- 수강 신청 강의 스케줄 목록 조회
- 동시성 제어를 위한 비관적 락 사용
  - 선착순 수강 신청 서비스에 성격상 특정 시간에 트래픽이 몰려 충돌이 많이 발생할 것으로 생각되었습니다.
  - 충돌이 많이 발생할 경우 낙관적 락은 에러 핸들링 혹은 재시도 로직등을 고려해야 하고 오히려 성능이 저하될 수 있다고 생각했습니다.
  - 비관적 락은 내부적으로 Queue를 통해 Transaction을 관리하기 때문에 요청에 의한 순차처리도 가능하여 더 적합하다고 판단했습니다.

## ERD 다이어그램

![ERD 다이어그램](assets/images/fcfs_applications_erd.png)

## API 목록

- 강의 생성 (`POST /lectures`)
- 강의 스케줄 수강 신청 (`POST /lectures/apply`)
- 강의 스케줄 생성 (`POST /lectures/:lectureId/schedules`)
- 강의 스케줄 목록 조회 (`GET /lectures`)
- 사용자 수강 신청 목록 조회 (`GET /lectures/application/:userId`)
