//da same as login but u have to deal w/ emails already existing.
'use server';
import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

// const testUser = {
//   id: "1",
//   email: "contact@cosdensolutions.io",
//   password: "12345678",
// };
async function createUser(email: string, password: string) {
    const res = await fetch("http://localhost:3000/api/saveData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Failed to create user");
    }

    return res.json();
}
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

const fetchedUsers = await getUsers();

const userExists = fetchedUsers.some(
    (user: { email: string }) => user.email === email
);

if (userExists) {
    return {
        errors: {
            email: ["There's already an account with that email."],
        },
    };
}
  const newUser = await createUser(email, password);
  await createSession(newUser._id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}