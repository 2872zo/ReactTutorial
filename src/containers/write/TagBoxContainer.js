import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TagBox from "../../components/write/TagBox";
import { changeField } from "../../modules/write";

const TagBoxContainer = () => {
	const dispatch = useDispatch();
	const tags = useSelector(state => state.write.tags);

	const onChangeTags = nextTages => {
		dispatch(
			changeField({
				key: "tags",
				value: nextTages
			})
		);
	};

	return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default TagBoxContainer;
