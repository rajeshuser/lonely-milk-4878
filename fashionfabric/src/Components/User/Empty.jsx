import { Heading, HStack } from "@chakra-ui/react"

export default function Empty({ width = "100%", height = "100%", minHeight = "10vh" }) {
	return (
		<HStack
			width={width}
			height={height}
			minHeight={minHeight}
			justifyContent="center"
			alignItems="center"
			margin="auto"
		>
			<Heading margin="auto">Empty</Heading>
		</HStack>
	)
}
