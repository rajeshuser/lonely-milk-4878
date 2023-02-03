import { Heading, Box, FormControl, FormLabel, Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	function putAdminInLocalStorage() {
		localStorage.setItem("admin", "true");
	}

	function handleAdminLogin() {
		if (username === "admin" && password === "admin") {
			navigate("/admindashboard");
			putAdminInLocalStorage();
		} else {
			alert("Please enter correct details");
		}
	}

	return (
		<Box width="70%" margin="auto">
			<Heading margin="20px">Admin</Heading>
			<VStack width="40%" margin="auto" spacing="10px">
				<FormControl>
					<FormLabel>Username</FormLabel>
					<Input
						type="text"
						placeholder="Username"
						onChange={(event) => setUsername(event.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						placeholder="Password"
						onChange={(event) => setPassword(event.target.value)}
					/>
				</FormControl>
				<Button width="100%" colorScheme="blue" onClick={handleAdminLogin}>
					Login
				</Button>
			</VStack>
		</Box>
	);
}
