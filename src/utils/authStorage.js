const USERS_KEY = "hopehands-users";
const CURRENT_KEY = "hopehands-current-user";

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function findUser(email) {
  return getUsers().find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function setCurrentUser(email) {
  localStorage.setItem(CURRENT_KEY, email.toLowerCase());
}

export function getCurrentUser() {
  const email = localStorage.getItem(CURRENT_KEY);
  if (!email) return null;
  return findUser(email) || null;
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_KEY);
}