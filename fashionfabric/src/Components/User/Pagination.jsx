import { HStack, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Pagination(props) {
    const { active = 3, limit = 5, total = 100, handlePageChange = function () {} } = props;
    const totalButtons = Math.ceil(total / limit);
    const countOfVisibleButtons = 5;
    const [activeButton, setActiveButton] = useState(active);
    const [startButton, setStartButton] = useState(1);
    let buttons = [];
    for (let b = startButton; b <= startButton + countOfVisibleButtons - 1; b++) {
        buttons.push(
            <Button
                key={b}
                onClick={() => {
                    setActiveButton(b);
                }}
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

    return (
        <HStack justifyContent="center">
            <ChevronLeftIcon
                onClick={() => {
                    if (activeButton === 1) {
                        return;
                    }
                    if (activeButton === startButton) {
                        setStartButton((startButton) => startButton - countOfVisibleButtons);
                    }
                    setActiveButton((activeButton) => Math.max(activeButton - 1, 1));
                }}
                _hover={{ cursor: "pointer" }}
            />
            {buttons}
            <ChevronRightIcon
                onClick={() => {
                    if (activeButton === totalButtons) {
                        return;
                    }
                    if (activeButton === startButton + countOfVisibleButtons - 1) {
                        setStartButton((startButton) => startButton + countOfVisibleButtons);
                    }
                    setActiveButton((activeButton) => Math.min(activeButton + 1, totalButtons));
                }}
                _hover={{ cursor: "pointer" }}
            />
        </HStack>
    );
}
