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
        >

        <div class="invalid-feedback">
          Les mots de passe ne correspondent pas.
        </div>
        <div class="valid-feedback">
          Les mots de passe correspondent.
        </div>
      </div>

      <div class="text-center">
        <button class="btn btn-primary">
          Inscription
        </button>
      </div>

    </form>

    <div class="text-center pt-3">
      <a href="/connexion">Vous avez déjà un compte ? Connectez-vous ici !</a>
    </div>
  </div>
</div>
</template>

<script>
export default {

  data() {
    return {
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

    emailClass() {
      if (!this.form.email) return ""

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(this.form.email) ? "is-valid" : "is-invalid"
    },

    passwordClass() {
      if (!this.form.password) return ""

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
      return regex.test(this.form.password) ? "is-valid" : "is-invalid"
    },

    confirmPasswordClass() {
      if (!this.form.passwordConfirm) return ""

      return this.form.password === this.form.passwordConfirm
        ? "is-valid"
        : "is-invalid"
    }

  },

  methods: {

    inputClass(value) {
      if (!value) return ""
      return value.length > 1 ? "is-valid" : "is-invalid"
    },

    inscription() {

      if (
        this.form.nom &&
        this.form.prenom &&
        this.form.email &&
        this.form.password &&
        this.form.password === this.form.passwordConfirm
      ) {
        console.log("Formulaire envoyé", this.form)
      } else {
        alert("Veuillez corriger le formulaire")
      }

    }

  }

}
</script>