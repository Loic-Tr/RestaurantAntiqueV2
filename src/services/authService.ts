import { ref } from "vue"

const TOKEN_KEY = "accesstoken"
const ROLE_KEY = "role"
const API_URL = "http://127.0.0.1:8000/api/"

// 🔥 état réactif
export const isAuthenticated = ref(!!localStorage.getItem(TOKEN_KEY))
export const userRole = ref(localStorage.getItem(ROLE_KEY))

export function setAuth(token: string, role: string) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(ROLE_KEY, role)

  isAuthenticated.value = true
  userRole.value = role
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ROLE_KEY)

  isAuthenticated.value = false
  userRole.value = null
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export async function loginRequest(email: string, password: string) {

  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: email,
      password: password
    })
  })

  if (!response.ok) {
    throw new Error("Identifiants invalides")
  }

  const data = await response.json()

  setAuth(data.token, data.roles[0])

  return data
}