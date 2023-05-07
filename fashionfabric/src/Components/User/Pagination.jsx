import { HStack, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Pagination(props) {
	const { active = 1, limit = 5, total = 100, handleSearchParams } = props;
	const totalButtons = Math.ceil(total / limit);
	const countOfVisibleButtons = Math.min(5, totalButtons);
	const [activeButton, setActiveButton] = useState(active);

	const [startButton, setStartButton] = useState(
		activeButton -
			((activeButton % countOfVisibleButtons === 0
				? countOfVisibleButtons
				: activeButton % countOfVisibleButtons) -
				1)
	);

	let buttons = [];
	for (let b = startButton; b <= startButton + countOfVisibleButtons - 1; b++) {
		buttons.push(
			<Button
				key={b}
				onClick={() => changeActiveButton(b)}
				color={b === activeButton ? "white" : "black"}
				backgroundColor={b === activeButton ? "black" : "white"}
				_hover={{
					color: "white",
					backgroundColor: "black"
				}}
			>
				{b}
			</Button>
		);
	}

	const changeActiveButton = (newActiveButton) => {
		if (newActiveButton < 1 || newActiveButton > totalButtons) {
			return;
		}

		if (activeButton > newActiveButton && activeButton === startButton) {
			setStartButton((startButton) => startButton - countOfVisibleButtons);
		} else if (
			activeButton < newActiveButton &&
			activeButton === startButton + countOfVisibleButtons - 1
		) {
			setStartButton((startButton) => startButton + countOfVisibleButtons);
		}

		setActiveButton(newActiveButton);
		handleSearchParams({ _page: newActiveButton, _limit: limit });
	};

	if (totalButtons === 0) {
		return null;
	} else {
		return (
			<HStack justifyContent="center">
				<ChevronLeftIcon
					onClick={() => changeActiveButton(activeButton - 1)}
					_hover={{ cursor: "pointer" }}
				/>
				{buttons}
				<ChevronRightIcon
					onClick={() => changeActiveButton(activeButton + 1)}
					_hover={{ cursor: "pointer" }}
				/>
			</HStack>
		);
	}
}
