<template>
<div>

  <div class="hero-scene text-center text-white">
      <div class="hero-scene-content">
          <h1>Ma réservation</h1>
      </div>
  </div>

  <div class="container">
    <form @submit.prevent="reserver">

      <div class="mb-3">
        <label class="form-label">Nom</label>
        <input disabled type="text" class="form-control" v-model="reservation.nom">
      </div>

      <div class="mb-3">
        <label class="form-label">Prénom</label>
        <input disabled type="text" class="form-control" v-model="reservation.prenom">
      </div>

      <div class="mb-3">
        <label class="form-label">Allergies</label>
        <input
          type="text"
          class="form-control"
          placeholder="Vos allergies"
          v-model="reservation.allergies"
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Nombre de convives</label>
        <input
          type="number"
          class="form-control"
          v-model="reservation.nbConvives"
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Date de la réservation</label>
        <input
          type="date"
          class="form-control"
          v-model="reservation.date"
          required
        >
      </div>

      <div class="mb-3">

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            value="midi"
            v-model="reservation.service"
          >
          <label class="form-check-label">
            Midi
          </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            value="soir"
            v-model="reservation.service"
          >
          <label class="form-check-label">
            Soir
          </label>
        </div>

      </div>

      <div class="mb-3">
        <label class="form-label">Heure</label>

        <select class="form-select" v-model="reservation.heure">

          <option v-for="h in heures" :key="h">
            {{ h }}
          </option>

        </select>
      </div>

      <div class="text-center">
        <button class="btn btn-primary">
          Réserver
        </button>

        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#AnnulationResaModal"
        >
          Annuler
        </button>
      </div>

    </form>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="AnnulationResaModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h2 class="modal-title fs-5">
            Êtes-vous sûr de vouloir annuler cette réservation ?
          </h2>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body text-center">

          <button
            class="btn btn-danger"
            @click="annulerReservation"
            data-bs-dismiss="modal"
          >
            Oui
          </button>

          <button
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Non
          </button>

        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {

  data() {
    return {

      reservation: {
        nom: "John",
        prenom: "Doe",
        allergies: "Cacahouètes",
        nbConvives: 4,
        date: "",
        service: "soir",
        heure: "19:30"
      },

      heures: [
        "19:30",
        "19:45",
        "20:00",
        "20:15",
        "20:30",
        "20:45",
        "21:00"
      ]

    }
  },

  methods: {

    reserver() {

      console.log("Réservation envoyée :", this.reservation)

      alert("Réservation enregistrée")

    },

    annulerReservation() {

      console.log("Réservation annulée")

      alert("Votre réservation a été annulée")

    }

  }

}
</script>