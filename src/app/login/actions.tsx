"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

// const testUser = {
//   id: "1",
//   email: "contact@cosdensolutions.io",
//   password: "12345678",
// };

async function getUsers() {
    const res = await fetch("http://localhost:3000/api/getData", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return res.json();
}

let users: any[] = [];
(async () => {
    try {
        users = await getUsers();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
})();
//inefficient but who the hell cares



const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

const userExists = users.some(
    (user: { email: string; password: string }) =>
        user.email === email && user.password === password
);

if (!userExists) {
    return {
        errors: {
            email: ["Invalid email or password"],
        },
    };
}

  const matchedUser = users.find(
    (user: { email: string; password: string }) =>
      user.email === email && user.password === password
  );

  if (matchedUser) {
    await createSession(matchedUser._id);
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}