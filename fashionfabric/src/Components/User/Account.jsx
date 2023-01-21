import { useContext, useState } from "react";
import { appContext } from "../Contexts/AppContext";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    Box,
    useDisclosure,
    Center,
    VStack,
    Stack,
    Text,
    Spinner,
} from "@chakra-ui/react";
import axios from "axios";

function isFormValid(formData, setInputValidatorMessage) {
    if (formData.firstName === "") {
        setInputValidatorMessage("The first name is required");
        return;
    }
    if (formData.lastName === "") {
        setInputValidatorMessage("The last name is required");
        return;
    }
    if (formData.phone.length !== 10) {
        setInputValidatorMessage("The phone number should have 10 digits");
        return;
    }
    if (formData.email === "") {
        setInputValidatorMessage("The email is required");
        return;
    }
    if (formData.address === "") {
        setInputValidatorMessage("The address is required");
        return;
    }
    if (formData.password === "") {
        setInputValidatorMessage("The password is required");
        return;
    }
    return true;
}

function AccountFormModal() {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const [InputValidatorMessage, setInputValidatorMessage] = useState("I am input validator");
    const { baseURL, putUserInLocalStorage } = useContext(appContext);
    const initialFormData = {
        firstName: "",
        lastName: "",
        phone: 0,
        email: "",
        address: "",
        password: "",
        cart: [],
        favourites: [],
        orderHistory: [],
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (key, value) => {
        setFormData((formData) => ({ ...formData, [key]: value }));
    };

    const handleFormSubmit = (event) => {
        if (isFormValid(formData, setInputValidatorMessage) === false) {
            return;
        }
        postUser(formData);
        async function postUser() {
            try {
                const response = await axios({
                    method: "post",
                    baseURL,
                    url: "/users",
                    headers: {
                        "content-type": "application/json",
                    },
                    data: formData,
                });
                setFormData(initialFormData);
                onClose();
                putUserInLocalStorage(formData);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const InputValidator = () => {
        return <Text color="red">{InputValidatorMessage}</Text>;
    };

    return (
        <Box>
            <Button onClick={onOpen}>Sing in/Sign up</Button>
            <Modal isOpen={isOpen} onClose={onClose} bg="green">
                <ModalOverlay />
                <ModalContent alignItems="center">
                    <ModalHeader>Account</ModalHeader>
                    <ModalCloseButton />
                    <InputValidator />
                    <ModalBody as={VStack} spacing="10px" width="80%">
                        <Input
                            type="text"
                            placeholder="First name"
                            onChange={(event) => handleInputChange("firstName", event.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Last name"
                            onChange={(event) => handleInputChange("lastName", event.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="Phone number"
                            onChange={(event) => handleInputChange("phone", event.target.value)}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            onChange={(event) => handleInputChange("email", event.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Address"
                            onChange={(event) => handleInputChange("address", event.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            onChange={(event) => handleInputChange("password", event.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleFormSubmit}>
                            Sign up
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

function AccountEmailModal() {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const [responseStatus, setResponseStatus] = useState("loading");
    const [doesUserExist, setDoesUserExist] = useState(false);

	async function searchUser() {

	}
	
    return responseStatus === "loading" ? (
        <Spinner />
    ) : responseStatus === "error" ? (
        <Text>Failed</Text>
    ) : responseStatus === "success" ? (
        <Modal isOpen={isOpen} onClose={onClose} bg="green">
            <ModalOverlay />
            <ModalContent alignItems="center">
                <ModalHeader>Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={VStack} spacing="10px" width="80%">
                    Modal Body
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={searchUser}>
                        Sign in
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    ) : null;
}

function AccountDetails() {
    return <h1>Hey Boy</h1>;
}

export default function Account() {
    const { user } = useContext(appContext);
    return (
        <Center minHeight="70vh">
            {user === null ? <AccountFormModal /> : <AccountDetails />}
        </Center>
    );
}
