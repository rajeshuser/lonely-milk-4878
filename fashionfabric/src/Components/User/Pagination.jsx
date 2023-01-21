import { HStack, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Pagination(props) {
    const { active = 3, limit = 5, total = 100, handleSearchParams } = props;
    const totalButtons = Math.ceil(total / limit);
    const countOfVisibleButtons = 5;
    const [activeButton, setActiveButton] = useState(active);
    const [startButton, setStartButton] = useState(1);
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
                    backgroundColor: "black",
                }}
            >
                {b}
            </Button>
        );
    }

    const changeActiveButton = (newActiveButton) => {
        if (activeButton === 1 || activeButton === totalButtons) {
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
