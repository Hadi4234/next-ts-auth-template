import { db } from "./db";
import { products } from "./schema";
import { faker } from '@faker-js/faker';
const main = async () => { 
  const data: (typeof products.$inferInsert)[] = [];
 
	for (let i = 0; i < 20; i++) {
		data.push({
			name: faker.commerce.productName(),
      price: faker.commerce.price({max: 1000, min: 10}),
      description: faker.commerce.productDescription(),
      image: "https://picsum.photos/300/300",
      countInStock: faker.number.int({ min: 0, max: 100 }),
      

		});
	}
 
	console.log("Seed start",data);
	await db.insert(products).values(data);
	console.log("Seed done");
};

main()