import { User, SignupCredentials, LoginCredentials } from "@/types";

const USERS_KEY = "yatraai-users";
const CURRENT_USER_KEY = "yatraai-current-user";

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

function saveUsers(users: User[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function signup(credentials: SignupCredentials): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  
  if (users.some(u => u.email === credentials.email)) {
    return { success: false, error: "Email already exists" };
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name: credentials.name,
    email: credentials.email,
    password: credentials.password, // No real hashing since it's a prototype constraint
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  // Auto login
  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  }

  return { success: true, user: newUser };
}

export function login(credentials: LoginCredentials): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  return { success: true, user };
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}
