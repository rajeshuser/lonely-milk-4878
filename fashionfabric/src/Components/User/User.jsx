import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { Image, Stack, Heading } from "@chakra-ui/react";

const dummyUser = {
    firstName: "abc",
    lastName: "xyz",
    phone: "0123456789",
    email: "abc@xyz.com",
    address: "address",
    password: "123",
    image: "",
    cart: [],
    favourites: [],
    orderHistory: [],
    id: 1,
};

export default function User({user}) {
    const { firstName, lastName, phone, email, address, image } = user ? user : dummyUser;
    return (
        <Card _hover={{ cursor: "pointer" }}>
            <CardHeader as={Heading} fontSize="xl">
                {firstName + " " + lastName}
            </CardHeader>
            <CardBody width="100%" as={Stack} direction="row">
                <Image
                    src={image}
                    fallbackSrc="https://via.placeholder.com/150"
                    width="100%"
                    objectFit="contain"
                />
                <Table variant="simple">
                    <Tbody>
                        <Tr>
                            <Td>First name</Td>
                            <Td isNumeric>{firstName}</Td>
                        </Tr>
                        <Tr>
                            <Td>Last nmame</Td>
                            <Td isNumeric>{lastName}</Td>
                        </Tr>
                        <Tr>
                            <Td>Phone number</Td>
                            <Td isNumeric>{phone}</Td>
                        </Tr>
                        <Tr>
                            <Td>Email address</Td>
                            <Td isNumeric>{email}</Td>
                        </Tr>
                        <Tr>
                            <Td>House address</Td>
                            <Td isNumeric>{address}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </CardBody>
        </Card>
    );
}
