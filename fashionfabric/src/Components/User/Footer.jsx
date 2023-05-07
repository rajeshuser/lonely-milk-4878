import { Stack, Box, Text, Button } from "@chakra-ui/react";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
	const navigate = useNavigate();

	return (
		<Stack
			display="flex"
			direction={["column", "column", "row"]}
			padding="30px 100px"
			gap="10px"
			width="100%"
			margin="auto"
			marginTop="10vh"
			boxShadow="0px 0px 5px black"
		>
			<FormControl flex="1">
				<FormLabel fontSize="large">Sign up</FormLabel>
				<Text textAlign="justify" margin="10px auto">
					Sign up below for updates about the world of Fashion Fabric, including
					collection launches and early access to limited-edition products and
					collaborations.
				</Text>
				{/* <Input type="email" placeholder="Email" /> */}
				<Button width="100%" border="1px solid grey" onClick={() => navigate("/account")}>
					Signup
				</Button>
			</FormControl>

			<UnorderedList flex="1" listStyleType="none" textAlign="left" spacing="10px">
				<ListItem>Store Locator</ListItem>
				<ListItem>Download Our App</ListItem>
				<ListItem>Book An Appointment</ListItem>
			</UnorderedList>

			<Accordion allowToggle flex="1">
				<AccordionItem border="none">
					<h2>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left">
								Customer Service
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} textAlign="left" fontSize="sm">
						<Text>Contact Us</Text>
						<Text>Shipping</Text>
						<Text>Ordering & Payment</Text>
						<Text>Returns</Text>
						<Text>Fashion Fabric Services</Text>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem border="none">
					<h2>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left">
								Legal & Cookies
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} textAlign="left" fontSize="sm">
						<Text>Terms & Conditions</Text>
						<Text>Fashion Fabric x 4Gift - Terms & Conditions</Text>
						<Text>Privacy Policy</Text>
						<Text>Cookie Policy</Text>
						<Text>Accessibility Statement</Text>
						<Text>4Gift FAQ</Text>
						<Text>Japan only - SCTL indications</Text>
						<Text>Transparency in the Supply Chain and Modern Slavery Statements</Text>
						<Text>Do not sell my personal information</Text>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem border="none">
					<h2>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left">
								Follow Us
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} textAlign="left" fontSize="sm">
						<Text>Facebook</Text>
						<Text>Twitter</Text>
						<Text>Instagram</Text>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem border="none">
					<h2>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left">
								Our Company
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} textAlign="left" fontSize="sm">
						<Text>Our History</Text>
						<Text>Fashion Fabric Group Plc</Text>
						<Text>Careers</Text>
						<Text>Corporate Responsibility</Text>
						<Text>Site Map</Text>
						<Text>Sustainability</Text>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>

			<UnorderedList flex="1" listStyleType="none" textAlign="left" spacing="10px">
				<ListItem>
					Language
					<Text display="block" fontSize="sm">
						English
					</Text>
				</ListItem>
				<ListItem>
					Shipping To
					<Text display="block" fontSize="sm">
						United States
					</Text>
				</ListItem>
			</UnorderedList>
		</Stack>
	);
}
