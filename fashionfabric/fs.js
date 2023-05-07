const fs = require("fs");

const imagesArray = [
	{
		gender: "male",
		category: "knitwear",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/515C38AA-AA74-474F-A1D3-3A059832AD69?$BBY_V2_SL_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/7FDA8271-E4C9-4C26-A3BC-13868119A0E4?$BBY_V2_SL_1x1$&wid=887&hei=887"
		]
	},
	{
		gender: "male",
		category: "scarves",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/E76A0B0F-53B2-4850-937B-86995867BC8E?$BBY_V2_SL_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/4466C244-F55E-413F-B45B-DEEEFA006FD9?$BBY_V2_SL_1x1$&wid=887&hei=887"
		]
	},
	{
		gender: "male",
		category: "bags",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/FE8163AB-E124-4878-9CE4-1960564B253C?$BBY_V2_SL_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/437A2474-8192-411D-B805-07C6D42C2521?$BBY_V2_SL_1x1$&wid=887&hei=887"
		]
	},
	{
		gender: "male",
		category: "coats",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/4D0CA864-923E-4AA4-8371-DFB8D23CC29B?$BBY_V2_SL_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/A68F9DFD-0242-4D1F-B15A-1518E4B43F22?$BBY_V2_SL_1x1$&wid=887&hei=887"
		]
	},
	{
		gender: "female",
		category: "knitwear",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887"
		]
	},
	{
		gender: "female",
		category: "scarves",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/3424EE38-5BCC-4CED-9781-11D6EFE32F3A?$BBY_V2_SL_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/7083DDF4-B1DB-44D1-B550-5809DDA565CD?$BBY_V2_ML_1x1$&wid=887&hei=887"
		]
	},
	{
		gender: "female",
		category: "bags",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/6EB20AB2-3A9A-4D28-9F4F-BD2A2F731BFF?$BBY_V2_SL_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/42A0B1E4-C92E-49FC-B8E5-D20A469E1E5F?$BBY_V2_SL_1x1$&wid=887&hei=887"
		]
	},
	{
		gender: "female",
		category: "coats",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/FD76CCF6-F1E6-4D52-B567-305D9CF96A16?$BBY_V2_SL_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/D7B19DB3-D438-424B-9793-2FFC12B9A849?$BBY_V2_ML_1x1$&wid=887&hei=887"
		]
	}
];

function getImagesFor(query) {
	const imageObject = imagesArray.find(
		(imageObject) =>
			imageObject.gender === query.gender && imageObject.category === query.category
	);
	if (imageObject) return imageObject.images;
	return [
		"https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
		"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887"
	];
}

generate()

async function generate() {
	const fileName = "dbCopy.json";
	const db = { products: [], users: [] };
	for (let i = 1; i <= 100; i++) {
		let product = { id: i };
		const productSchema = getProductSchema();
		for (let key in productSchema) {
			product[key] = random(productSchema[key]);
		}
		product.images = getImagesFor({ gender: product.gender, category: product.category });
		db.products.push(product);
	}
	db.users = getUsers();
	fs.writeFileSync(fileName, JSON.stringify(db));
	console.log("done");
}

function random(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function getProductSchema() {
	return {
		images: [
			[
				"https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
				"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887"
			]
		],
		name: [
			"Et collines prennent il va",
			"Sur barbares defiance par",
			"Ne et cheveux en faisait",
			"Ordonnance partageait permission"
		],
		price: [
			1000, 1250, 1399, 1400, 1650, 1799, 1800, 2050, 2199, 2200, 2450, 2599, 2600, 2850,
			2999, 3000
		],
		color: ["green", "blue", "brown", "pink", "grey"],
		category: ["coats", "bags", "scarves", "knitwear"],
		style: ["cardigan", "skirt", "sweater"],
		size: ["xxs", "xs", "s", "m", "l", "xl", "xxl"],
		gender: ["male", "female"],
		ageGroup: ["adult", "child"],
		season: ["winter", "summer", "mansoon"],
		description:
			"Beginning green spirit be fly bring shall their our dry cattle to she light heaven"
	};
}

function getUsers() {
	return [
		{
			id: 1,
			firstName: "Arjun",
			lastName: "Reddy",
			phone: "9654125632",
			email: "arjun@email.com",
			address: "Radetzkystraße 511, Zimmer 668, 7678, Neudorf bei Staatz, Salzburg, Austria",
			password: "arjun",
			cart: [
				[1, 2],
				[2, 2],
				[3, 5],
				[4, 1]
			],
			favourites: [12, 1, 3],
			orders: [
				[3, 5],
				[4, 1]
			]
		},
		{
			id: 2,
			firstName: "harry",
			lastName: "Potter",
			phone: "4578963210",
			email: "harry@email.com",
			address: "Gösting 75, Apt. 256, 8765, Waldkirchen am Wesen, Tirol, Austria",
			password: "harry",
			cart: [
				[4, 2],
				[7, 5],
				[2, 2]
			],
			favourites: [13, 2, 3],
			orders: [
				[3, 5],
				[4, 1]
			]
		},
		{
			id: 3,
			firstName: "Spider",
			lastName: "Man",
			phone: "9874563201",
			email: "spider@email.com",
			address: "Jochriemgutstraße 08a, 1 OG, 9537, Gößnitz, Tirol, Austria",
			password: "spider",
			cart: [
				[13, 2],
				[24, 5]
			],
			favourites: [4, 7, 1, 3],
			orders: [
				[3, 3],
				[14, 1]
			]
		},
		{
			id: 4,
			firstName: "Captain",
			lastName: "America",
			phone: "8765433456",
			email: "captain@email.com",
			address: "Lindenweg 18b, 2 OG, 5224, Innerbraz, Salzburg, Austria",
			password: "captain",
			cart: [
				[21, 2],
				[22, 3],
				[13, 5],
				[4, 1]
			],
			favourites: [4, 5],
			orders: [
				[3, 1],
				[4, 1],
				[5, 1]
			]
		},
		{
			id: 5,
			firstName: "Katniss",
			lastName: "Everdeen",
			phone: "4263698752",
			email: "katniss@email.com",
			address: "Wasen 85, Zimmer 557, 6783, Sankt Johann im Saggautal, Wien, Austria",
			password: "katniss",
			cart: [
				[12, 2],
				[13, 1],
				[9, 1]
			],
			favourites: [19, 5, 3],
			orders: [
				[33, 2],
				[4, 1]
			]
		}
	];
}
