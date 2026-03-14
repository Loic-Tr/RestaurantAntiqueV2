<template>
<div>

  <!-- HERO -->
  <div class="hero-scene text-center text-white">
    <div class="hero-scene-content">
      <h1>Notre Carte</h1>
    </div>
  </div>

  <div class="container py-5">

    <!-- CATEGORIES -->
    <div v-for="categorie in carte" :key="categorie.nom" class="mb-5">

      <h2 class="text-center mb-4">{{ categorie.nom }}</h2>

      <div class="row">

        <div
          class="col-md-6 col-lg-4 mb-4"
          v-for="plat in categorie.plats"
          :key="plat.nom"
        >

          <div class="card h-100 shadow-sm">

            <div class="card-body">

              <h5 class="card-title">
                {{ plat.nom }}
              </h5>

              <p class="card-text text-muted">
                {{ plat.description }}
              </p>

            </div>

            <div class="card-footer text-end fw-bold">
              {{ plat.prix }} €
            </div>

          </div>

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

      carte: [

        {
          nom: "Entrées",
          plats: [
            {
              nom: "Soupe à l’oignon",
              description: "Soupe traditionnelle gratinée au fromage",
              prix: 8
            },
            {
              nom: "Salade César",
              description: "Poulet, parmesan, croûtons, sauce César",
              prix: 10
            }
          ]
        },

        {
          nom: "Plats",
          plats: [
            {
              nom: "Entrecôte grillée",
              description: "Servie avec frites maison",
              prix: 22
            },
            {
              nom: "Saumon rôti",
              description: "Accompagné de légumes de saison",
              prix: 20
            }
          ]
        },

        {
          nom: "Desserts",
          plats: [
            {
              nom: "Tiramisu",
              description: "Recette italienne traditionnelle",
              prix: 7
            },
            {
              nom: "Moelleux au chocolat",
              description: "Avec cœur coulant",
              prix: 8
            }
          ]
        },

        {
          nom: "Boissons",
          plats: [
            {
              nom: "Coca-Cola",
              description: "",
              prix: 3
            },
            {
              nom: "Verre de vin",
              description: "Rouge / Blanc / Rosé",
              prix: 5
            }
          ]
        }

      ]

    }
  }

}
</script>