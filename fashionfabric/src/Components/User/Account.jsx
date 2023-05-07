import { useContext, useState, useEffect } from "react";
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
	Spinner
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import User from "./User";
import Favourites from "./Favourites";
import Orders from "./Orders";
import axios from "axios";

function isFormValid(formData, setInputValidatorMessage) {
	if (formData.firstName === "") {
		setInputValidatorMessage("The first name is required");
		return false;
	}
	if (formData.lastName === "") {
		setInputValidatorMessage("The last name is required");
		return false;
	}
	if (/^\d\d\d\d\d\d\d\d\d\d$/.test(formData.phone) === false) {
		setInputValidatorMessage("The phone number should have 10 digits");
		return false;
	}
	if (/.+@.+mail.com/.test(formData.email) === false) {
		setInputValidatorMessage("The email is invalid");
		return false;
	}
	if (formData.address === "") {
		setInputValidatorMessage("The address is required");
		return false;
	}
	if (/......../.test(formData.password) === false) {
		setInputValidatorMessage("The password should have atleast 8 characters");
		return false;
	}
	return true;
}

function AccountFormModal({ baseURL, signInUser }) {
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	const [InputValidatorMessage, setInputValidatorMessage] = useState(
		"Information should be in correct format"
	);
	const initialFormData = {
		firstName: "",
		lastName: "",
		phone: 0,
		email: "",
		address: "",
		password: "",
		cart: [],
		favourites: [],
		orders: []
	};
	const [formData, setFormData] = useState(initialFormData);

	const handleInputChange = (key, value) => {
		setFormData((formData) => ({ ...formData, [key]: value }));
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
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
						"content-type": "application/json"
					},
					data: formData
				});
				setFormData(initialFormData);
				onClose();
				signInUser(response.data);
				console.log({ formData, response });
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
			<Button onClick={onOpen}>Sign up</Button>
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
							required
						/>
						<Input
							type="text"
							placeholder="Last name"
							onChange={(event) => handleInputChange("lastName", event.target.value)}
							required
						/>
						<Input
							type="number"
							placeholder="Phone number"
							onChange={(event) => handleInputChange("phone", event.target.value)}
							minLength="10"
							maxLength="10"
							required
						/>
						<Input
							type="email"
							placeholder="Email"
							onChange={(event) => handleInputChange("email", event.target.value)}
							required
						/>
						<Input
							type="text"
							placeholder="Address"
							onChange={(event) => handleInputChange("address", event.target.value)}
							required
						/>
						<Input
							type="password"
							placeholder="Password"
							onChange={(event) => handleInputChange("password", event.target.value)}
							required
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

function AccountEmailModal({ baseURL, setUserSearch, passEmail }) {
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	const [responseStatus, setResponseStatus] = useState("success");
	const [doesUserExist, setDoesUserExist] = useState(false);
	const [email, setEmail] = useState("");

	async function searchUser() {
		try {
			let response = await axios({ method: "get", baseURL, url: `/users?email=${email}` });
			if (response.data.length === 1) {
				setDoesUserExist(true);
				setUserSearch("emailExist");
				passEmail(response.data[0].email);
				onClose();
			} else {
				setUserSearch("emailDoesNotExist");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return responseStatus === "loading" ? (
		<Spinner />
	) : responseStatus === "error" ? (
		<Text>Failed</Text>
	) : responseStatus === "success" ? (
		<Box>
			<Button onClick={onOpen}>Sign up</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent alignItems="center">
					<ModalHeader>Account</ModalHeader>
					<ModalCloseButton />
					<ModalBody as={VStack} spacing="10px" width="80%">
						<Input
							type="email"
							placeholder="Email"
							onChange={({ target: { value } }) => setEmail(value)}
							required
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={searchUser}>
							Check Account
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	) : null;
}

function AccountPasswordModal({ setUserSearch, email, baseURL, signInUser }) {
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	const [responseStatus, setResponseStatus] = useState("success");
	const [password, setPassword] = useState(null);

	async function searchUser() {
		try {
			let response = await axios({
				method: "get",
				baseURL,
				url: `/users?email=${email}&password=${password}`
			});
			if (response.data.length === 1) {
				setUserSearch("passwordIsCorrect");
				signInUser(response.data[0]);
				onClose();
			} else {
				alert("Wrong password");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return responseStatus === "loading" ? (
		<Spinner />
	) : responseStatus === "error" ? (
		<Text>Failed</Text>
	) : responseStatus === "success" ? (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent alignItems="center">
				<ModalHeader>Account</ModalHeader>
				<ModalCloseButton />
				<ModalBody as={VStack} spacing="10px" width="80%">
					<Input
						type="password"
						placeholder="Password"
						onChange={({ target: { value } }) => setPassword(value)}
						required
					/>
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

function AccountDetails({ user, signOutUser, setUserSearch }) {
	return (
		<Tabs
			width="70vw"
			height="fit-content"
			minHeight="80vh"
			border="1px"
			borderRadius="20px"
			margin="10px"
			padding="10px"
			isFitted
			variant="enclosed"
			size="lg"
			align="center"
		>
			<TabList>
				<Tab _selected={{ fontWeight: "bolder", fontSize: "2xl" }}>Profile</Tab>
				<Tab _selected={{ fontWeight: "bolder", fontSize: "2xl" }}>Favourites</Tab>
				<Tab _selected={{ fontWeight: "bolder", fontSize: "2xl" }}>Orders</Tab>
				<Tab _selected={{ fontWeight: "bolder", fontSize: "2xl" }}>Exit</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<User user={user} />
				</TabPanel>
				<TabPanel>
					<Favourites user={user} />
				</TabPanel>
				<TabPanel>
					<Orders user={user} />
				</TabPanel>
				<TabPanel>
					<Button
						colorScheme="orange"
						width="20%"
						onClick={() => {
							signOutUser();
							setUserSearch(null);
						}}
						marginTop="10%"
						padding="30px 50px"
					>
						Signout
					</Button>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}

export default function Account() {
	const { baseURL, user, signInUser, signOutUser } = useContext(appContext);
	const [userSearch, setUserSearch] = useState(user);
	const [email, setEmail] = useState(null);

	useEffect(() => {
		setUserSearch(user);
	}, [user]);

	return (
		<Center minHeight="70vh">
			{userSearch === null ? (
				<AccountEmailModal
					setUserSearch={setUserSearch}
					baseURL={baseURL}
					passEmail={(email) => setEmail(email)}
				/>
			) : userSearch === "emailExist" ? (
				<AccountPasswordModal
					setUserSearch={setUserSearch}
					email={email}
					baseURL={baseURL}
					signInUser={signInUser}
				/>
			) : userSearch === "emailDoesNotExist" ? (
				<AccountFormModal baseURL={baseURL} signInUser={signInUser} />
			) : userSearch === "passwordIsCorrect" || typeof userSearch === "object" ? (
				<AccountDetails
					user={user}
					signOutUser={signOutUser}
					setUserSearch={setUserSearch}
				/>
			) : null}
		</Center>
	);
}
