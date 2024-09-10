CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"image" text,
	"price" integer,
	"countInStock" integer,
	"createdAt" timestamp NOT NULL
);
