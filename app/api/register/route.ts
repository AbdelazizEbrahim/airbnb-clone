import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        console.log("Starting to create user...");

        const body = await req.json();
        console.log("Received request body: ", body);
        const { email, name, password } = body;

        // Log the email and password securely (but not the plain password)
        console.log("Email: ", email, "Name: ", name);

        // Hash the password with 12 salt rounds
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log("Password hashed successfully.");

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        // If the user exists, return a conflict response
        if (existingUser) {
            console.log("User already exists with email:", email);
            return;
        }

        // Create user in the database
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        console.log("User created successfully: ", user);
        return NextResponse.json(user);
    } catch (error) {
        console.log("Error creating user:", error);
        return;
    }
}
