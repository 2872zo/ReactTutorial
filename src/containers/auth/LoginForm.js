import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";

const LoginForm = ({ history }) => {
	const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
		form: auth.login,
		auth: auth.auth,
		authError: auth.authError,
		user: user.user
	}));

	// 인풋 변경 이벤트 핸들러
	const onChange = e => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: "login",
				key: name,
				value
			})
		);
	};

	const onSubmit = e => {
		e.preventDefault();
		const { userId, password } = form;
		if ([userId, password].includes("")) {
			setError("빈 칸을 모두 입력하세요.");
			return;
		}
		dispatch(login({ userId, password }));
	};

	useEffect(() => {
		dispatch(initializeForm("login"));
	}, [dispatch]);

	useEffect(() => {
		if (authError) {
			// 로그인 아이디, 비밀번호 틀릴 시
			if (authError.response.status === 401) {
				setError("아이디, 비밀번호를 확인하세요");
				return;
			}
			setError("알 수 없는 오류 발생. 오류코드 : " + authError.response.status);
			console.log("오류발생");
			console.log(authError);
			return;
		}
		if (auth) {
			console.log("로그인 성공");
			dispatch(check());
		}
	}, [auth, authError, dispatch]);

	useEffect(() => {
		if (user) {
			history.push("/");
			try {
				localStorage.setItem("user", JSON.stringify(user));
			} catch (e) {
				console.log("[LoginForm]localStroage is not working");
			}
		}
	});

	return (
		<AuthForm
			type="login"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			error={error}
		/>
	);
};

export default withRouter(LoginForm);
