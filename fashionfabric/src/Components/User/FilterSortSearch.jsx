import { Stack, Input, Box, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useState, useReducer } from "react";

export default function FilterSortSearch({ searchParams, handleSearchParams }) {
	const { _order, gender, ageGroup, category, style, color, size, q } = searchParams;
	const [searchValue, setSearchValue] = useState("");

	return (
		<Stack
			justifyContent="center"
			alignItems={["stretch", "stretch", "stretch", "center", "center"]}
			borderWidth="thin"
			borderColor="black"
			width="fit-content"
			margin="auto"
			direction={["column", "column", "column", "row", "row"]}
			padding="20px"
			borderRadius="10px"
			boxShadow="5px 5px 5px black"
		>
			<select
				onChange={({ target: { value } }) => {
					handleSearchParams({ _sort: "price", _order: value });
				}}
				defaultValue={_order}
				style={{ flex: 1 }}
			>
				<option value="">SORT BY PRICE</option>
				<option value="asc">Low To high</option>
				<option value="desc">High To Low</option>
			</select>

			<select
				onChange={({ target: { value } }) => {
					handleSearchParams({ gender: value });
				}}
				defaultValue={gender}
				style={{ flex: 1 }}
			>
				<option value="">GENDER</option>
				<option value="female">Female</option>
				<option value="male">Male</option>
			</select>

			<select
				onChange={({ target: { value } }) => {
					handleSearchParams({ ageGroup: value });
				}}
				defaultValue={ageGroup}
				style={{ flex: 1 }}
			>
				<option value="">AGE GROUP</option>
				<option value="adult">Adult</option>
				<option value="child">Child</option>
			</select>

			<select
				onChange={({ target: { value } }) => {
					handleSearchParams({ category: value });
				}}
				defaultValue={category}
				style={{ flex: 1 }}
			>
				<option value="">CATEGORY</option>
				<option value="knitwear">Knitwear</option>
				<option value="coats">Coats</option>
				<option value="bags">Bags</option>
				<option value="scarves">Scarves</option>
			</select>

			<select
				onChange={({ target: { value } }) => {
					handleSearchParams({ style: value });
				}}
				defaultValue={style}
				style={{ flex: 1 }}
			>
				<option value="">ATTIRE STYLE</option>
				<option value="cardigan">Cardigan</option>
				<option value="skirt">Skirt</option>
				<option value="sweater">Sweater</option>
			</select>

			<select
				onChange={({ target: { value } }) => {
					handleSearchParams({ color: value });
				}}
				defaultValue={color}
				style={{ flex: 1 }}
			>
				<option value="">COLOR</option>
				<option value="red">Red</option>
				<option value="green">Green</option>
				<option value="blue">Blue</option>
				<option value="brown">Brown</option>
				<option value="pink">Pink</option>
				<option value="grey">Grey</option>
			</select>

			<select
				onChange={({ target: { value } }) => {
					handleSearchParams({ size: value });
				}}
				defaultValue={size}
				style={{ flex: 1 }}
			>
				<option value="">SIZE</option>
				<option value="xxs">XXS</option>
				<option value="xs">XS</option>
				<option value="s">S</option>
				<option value="m">M</option>
				<option value="l">L</option>
				<option value="xl">XL</option>
				<option value="xxl">XXL</option>
			</select>

			<HStack
				justifyContent="space-between"
				width={["100%", "100%", "100%", "20%", "20%"]}
				style={{ flex: 1 }}
				gap="5px"
			>
				<Input
					boxSize="70%"
					type="search"
					border="1px"
					onChange={({ target: { value } }) => {
						setSearchValue(value);
					}}
					minWidth="150px"
					padding="5px 10px"
					flex="1"
				/>
				<SearchIcon
					boxSize="20px"
					onClick={() => handleSearchParams({ q: searchValue })}
					_hover={{ color: "blue", cursor: "pointer" }}
				/>
			</HStack>
		</Stack>
	);
}
