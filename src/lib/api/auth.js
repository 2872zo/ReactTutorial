import client from "./client";

// 로그인
export const login = ({ userId, password }) =>
	client.post("/api/auth/login", { userId, password });

// 회원가입
export const register = ({ userId, username, password }) =>
	client.post("/api/auth/register", { userId, username, password });

// 로그인 상태 확인
export const check = () => client.get("/api/auth/check");

// 로그아웃
export const logout = () => client.post("/api/auth/logout");

// 회원가입시 아이디 중복 체크
export const userValidationCheck = ({ userId }) =>
	client.post("/api/auth/userValidationCheck", { userId });
