const express = require('express');
const { Pool } = require('pg');
const app = express();

// PostgreSQL DB 연결 설정 (도커 컴포즈의 환경변수를 읽어옵니다)
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// DB 테이블 초기화 함수 (방문자 수를 담을 그릇 만들기)
const initDB = async () => {
  try {
    // visitors 테이블이 없으면 생성
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INT PRIMARY KEY,
        count INT NOT NULL
      );
    `);
    // 초기값 0 세팅 (이미 있으면 무시)
    await pool.query(`
      INSERT INTO visitors (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;
    `);
    console.log("✅ DB 테이블 초기화 완료!");
  } catch (err) {
    console.error("❌ DB 연결 실패 (DB가 아직 켜지는 중일 수 있습니다):", err.message);
  }
};

initDB();

// API 엔드포인트
app.get('/api/visit', async (req, res) => {
  try {
    // 카운트를 1 증가시키고, 그 결과를 바로 가져옵니다.
    const result = await pool.query(`
      UPDATE visitors SET count = count + 1 WHERE id = 1 RETURNING count;
    `);
    res.send({ visit_count: result.rows[0].count });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "DB 쿼리 에러" });
  }
});

const server = app.listen(process.env.APP_PORT, () => console.log(`🚀 App running on ${process.env.APP_PORT}`));

// 우아한 종료 (Graceful Shutdown)
process.on('SIGTERM', () => {
  console.log('종료 신호 수신. 서버와 DB 연결을 안전하게 닫습니다.');
  server.close(() => {
    pool.end(); // DB 커넥션 풀 종료
    process.exit(0);
  });
});