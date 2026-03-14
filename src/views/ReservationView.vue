<template>
<div>

  <div class="hero-scene text-center text-white">
      <div class="hero-scene-content">
          <h1>Vos réservations</h1>
      </div>
  </div>

  <div class="container text-center pb-3">
      <router-link to="/reserver" class="btn btn-primary">
          Réserver
      </router-link>
  </div>

  <div class="container text-center allreservations">

      <a 
        v-for="reservation in reservations"
        :key="reservation.id"
        href="#"
        class="d-block mb-2"
      >
          <span>{{ reservation.date }}</span> | 
          <span>{{ reservation.heure }}</span> | 
          <span>{{ reservation.personnes }} personnes</span> | 
          <span>{{ reservation.allergies || 'Pas d’allergie' }}</span>
      </a>

  </div>

</div>
</template>

<script>
export default {

  data() {
    return {

      reservations: [
        {
          id: 1,
          date: "12/05/2023",
          heure: "12:10",
          personnes: 5,
          allergies: "Pas d’allergie"
        },
        {
          id: 2,
          date: "13/05/2023",
          heure: "19:30",
          personnes: 2,
          allergies: "Arachides"
        },
        {
          id: 3,
          date: "15/05/2023",
          heure: "20:00",
          personnes: 4,
          allergies: ""
        }
      ]

    }
  }

}
</script>