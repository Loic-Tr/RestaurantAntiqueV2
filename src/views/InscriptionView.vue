<template>
<div>
  <div class="hero-scene text-center text-white">
      <div class="hero-scene-content">
          <h1>Inscription</h1>
      </div>
  </div>

  <div class="container">
    <form @submit.prevent="inscription">

      <!-- NOM -->
      <div class="mb-3">
        <label class="form-label">Nom</label>
        <input 
          type="text"
          class="form-control"
          v-model="form.nom"
          :class="inputClass(form.nom)"
          placeholder="Votre nom"
        >

        <div class="invalid-feedback">Ce champ est requis.</div>
        <div class="valid-feedback">Champ valide !</div>
      </div>

      <!-- PRENOM -->
      <div class="mb-3">
        <label class="form-label">Prénom</label>
        <input 
          type="text"
          class="form-control"
          v-model="form.prenom"
          :class="inputClass(form.prenom)"
          placeholder="Votre prénom"
        >

        <div class="invalid-feedback">Ce champ est requis.</div>
        <div class="valid-feedback">Champ valide !</div>
      </div>

      <!-- EMAIL -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input 
          type="email"
          class="form-control"
          v-model="form.email"
          :class="emailClass"
          placeholder="Entrez votre email"
        >

        <div class="invalid-feedback">
          Veuillez entrer une adresse email valide.
        </div>
        <div class="valid-feedback">
          Adresse email valide !
        </div>
      </div>

      <!-- PASSWORD -->
      <div class="mb-3">
        <label class="form-label">Mot de passe</label>
        <input 
          type="password"
          class="form-control"
          v-model="form.password"
          :class="passwordClass"
          placeholder="Entrez votre mot de passe"
        >

        <div class="invalid-feedback">
          Mot de passe trop faible.
        </div>
        <div class="valid-feedback">
          Mot de passe valide !
        </div>
      </div>

      <!-- CONFIRM PASSWORD -->
      <div class="mb-3">
        <label class="form-label">Confirmer le mot de passe</label>
        <input 
          type="password"
          class="form-control"
          v-model="form.passwordConfirm"
          :class="confirmPasswordClass"
          placeholder="Confirmez votre mot de passe"
        >

        <div class="invalid-feedback">
          Les mots de passe ne correspondent pas.
        </div>
        <div class="valid-feedback">
          Les mots de passe correspondent.
        </div>
      </div>

      <div class="text-center">
        <button class="btn btn-primary" type="submit" :disabled="loading">
           {{ loading ? "Inscription en cours..." : "S'inscrire" }}
        </button>
      </div>

    </form>

    <div class="text-center pt-3">
      <a href="/connexion">Vous avez déjà un compte ? Connectez-vous ici !</a>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useToast } from "vue-toastification"

const toast = useToast()

export default defineComponent({

  data() {
    return {
      loading: false,

      form: {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        passwordConfirm: ""
      }
    }
  },

  computed: {

    emailClass(): string {
      if (!this.form.email) return ""

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      return regex.test(this.form.email)
        ? "is-valid"
        : "is-invalid"
    },

    passwordClass(): string {
      if (!this.form.password) return ""

      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

      return regex.test(this.form.password)
        ? "is-valid"
        : "is-invalid"
    },

    confirmPasswordClass(): string {
      if (!this.form.passwordConfirm) return ""

      return this.form.password === this.form.passwordConfirm
        ? "is-valid"
        : "is-invalid"
    },

    isFormValid(): boolean {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

      return (
        this.form.nom.length > 1 &&
        this.form.prenom.length > 1 &&
        emailRegex.test(this.form.email) &&
        passwordRegex.test(this.form.password) &&
        this.form.password === this.form.passwordConfirm
      )
    }

  },

  methods: {

    inputClass(value: string): string {

      if (!value) return ""

      return value.length > 1
        ? "is-valid"
        : "is-invalid"
    },

    async inscription(): Promise<void> {

      if (!this.isFormValid) {
        toast.error("Veuillez corriger le formulaire")
        return
      }

      this.loading = true

      try {

        const response = await fetch(
          "http://localhost:8000/api/registration",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              firstName: this.form.prenom,
              lastName: this.form.nom,
              email: this.form.email,
              password: this.form.password
            })
          }
        )

        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription")
        }

        toast.success(
          `Inscription réussie ${this.form.prenom}`
        )

        window.location.href = "/connexion"

      } catch (error) {

        console.error(error)

        toast.error("Une erreur est survenue")

      } finally {

        this.loading = false
      }
    }

  }

})
</script>