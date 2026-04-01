-- 1. visitors 테이블 생성
CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
);

-- 2. 업데이트할 대상인 id=1 인 초기 데이터 생성
INSERT INTO visitors (id, count) VALUES (1, 0);