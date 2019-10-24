import React, { useEffect } from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { writePost, updatePost } from "../../modules/write";

const WriteActionButtonsContainer = ({ history }) => {
	const dispatch = useDispatch();
	const { title, body, tags, post, postError, originalPostNo } = useSelector(
		({ write }) => ({
			title: write.title,
			body: write.body,
			tags: write.tags,
			post: write.post,
			postError: write.postError,
			originalPostNo: write.originalPostNo
		})
	);

	// 포스트 등록
	const onPublish = () => {
		if (originalPostNo) {
			dispatch(updatePost({ title, body, tags, postNo: originalPostNo }));
			return;
		}
		dispatch(
			writePost({
				title,
				body,
				tags
			})
		);
	};

	// 취소
	const onCancel = () => {
		history.goBack();
	};

	// 성공 혹은 실패시 할 작업
	useEffect(() => {
		if (post) {
			const { postNo } = post;
			history.push(`/posts/${postNo}`);
		}
		if (postError) {
			console.log(postError);
		}
	}, [history, post, postError]);
	return (
		<WriteActionButtons
			onPublish={onPublish}
			onCancel={onCancel}
			isEdit={!!originalPostNo}
		/>
	);
};

export default withRouter(WriteActionButtonsContainer);
