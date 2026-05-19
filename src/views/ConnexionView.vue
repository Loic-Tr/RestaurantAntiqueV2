<template>
<div>

  <div class="hero-scene text-center text-white">
      <div class="hero-scene-content">
          <h1>Connexion</h1>
      </div>
  </div>

  <section class="container my-5">
      <div class="row justify-content-center">
          <div class="col-md-6">

              <form @submit.prevent="login">

                  <div class="mb-3">
                      <label class="form-label">Adresse e-mail</label>

                      <input
                        type="email"
                        class="form-control"
                        placeholder="Entrez votre e-mail"
                        v-model="email"
                        required
                      >
                  </div>

                  <div class="mb-3">
                      <label class="form-label">Mot de passe</label>

                      <input
                        type="password"
                        class="form-control"
                        placeholder="Entrez votre mot de passe"
                        v-model="password"
                        required
                      >
                  </div>

                  <div class="text-center">
                      <button class="btn btn-primary" type="submit" :disabled="isLoading">
                        {{ isLoading ? "Connexion..." : "Se connecter" }}
                      </button>
                  </div>

              </form>

              <div class="text-center pt-3">
                  <RouterLink to="/inscription">
                      Pas encore de compte ? Inscrivez-vous ici
                  </RouterLink>
              </div>

              <p v-if="errorMessage" class="text-danger text-center mt-3">
                {{ errorMessage }}
              </p>

          </div>
      </div>
  </section>

</div>
</template>

<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"
import { loginRequest } from "@/services/authService"

const email = ref("")
const password = ref("")
const errorMessage = ref("")
const isLoading = ref(false)

const router = useRouter()

async function login() {

  errorMessage.value = ""
  isLoading.value = true

  try {

    await loginRequest(email.value, password.value)

    router.push("/")

  } catch (error) {

    errorMessage.value = "Email ou mot de passe incorrect"

  } finally {

    isLoading.value = false

  }
}
</script>