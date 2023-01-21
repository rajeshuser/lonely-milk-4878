import { Stack, Input, Box, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useState, useReducer } from "react";

export default function FilterSortSearch({ handleSearchParams }) {
    const initialState = {};
    const [state, dispatcher] = useReducer(updater, initialState);

    function updater(state, { param, value }) {
        if (value === "") {
            return;
        }
        const newSearchParams = { ...state, [param]: value };
        handleSearchParams(newSearchParams);
        return newSearchParams;
    }

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            borderWidth="thin"
            borderColor="black"
            direction="row"
        >
            <select
                onChange={({ target: { value } }) => {
                    dispatcher({ param: "_order", value });
                }}
            >
                <option defaultValue value="">
                    SORT ORDER
                </option>
                <option value="asc">Price Low To high</option>
                <option value="desc">Price High To Low</option>
            </select>

            <select
                onChange={({ target: { value } }) => {
                    dispatcher({ param: "gender", value });
                }}
            >
                <option defaultValue value="">
                    GENDER
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select>

            <select
                onChange={({ target: { value } }) => {
                    dispatcher({ param: "ageGroup", value });
                }}
            >
                <option defaultValue value="">
                    AGE GROUP
                </option>
                <option value="adult">Adult</option>
                <option value="child">Child</option>
            </select>

            <select
                onChange={({ target: { value } }) => {
                    dispatcher({ param: "category", value });
                }}
            >
                <option defaultValue value="">
                    CATEGORY
                </option>
                <option value="knitwear">Knitwear</option>
                <option value="coats">Coats</option>
                <option value="bags">Bags</option>
                <option value="scarves">Scarves</option>
                <option value="wallets">Wallets</option>
            </select>

            <select
                onChange={({ target: { value } }) => {
                    dispatcher({ param: "style", value });
                }}
            >
                <option defaultValue value="">
                    STYLE
                </option>
                <option value="cardigan">Cardigan</option>
                <option value="skirt">Skirt</option>
                <option value="sweater">Sweater</option>
            </select>

            <select
                onChange={({ target: { value } }) => {
                    dispatcher({ param: "color", value });
                }}
            >
                <option defaultValue value="">
                    COLOR
                </option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="brown">Brown</option>
                <option value="pink">Pink</option>
                <option value="grey">Grey</option>
            </select>

            <select
                onChange={({ target: { value } }) => {
                    dispatcher({ param: "size", value });
                }}
            >
                <option defaultValue value="">
                    SIZE
                </option>
                <option value="xxs">XXS</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
            </select>

            <HStack justifyContent="center" width="20%">
                <Input
                    boxSize="50%"
                    type="search"
                    border="1px"
                    onChange={({ target: { value } }) => {
                        dispatcher({ param: "q", value });
                    }}
                    padding="5px 10px"
                />
                <SearchIcon boxSize="10%" _hover={{ color: "blue", cursor: "pointer"}} />
            </HStack>
        </Stack>
    );
}
