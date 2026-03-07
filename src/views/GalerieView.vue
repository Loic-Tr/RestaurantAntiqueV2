<template>
<div>
   <div class="hero-scene text-center text-white">
      <div class="hero-scene-content">
  <h1 class="text-center mb-4">Galerie</h1>
      </div>
  </div>

  <!-- bouton ajout -->
  <div class="text-center mb-4">
    <button
      v-if="isAdmin"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#EditionPhotoModal"
      @click="prepareAdd"
    >
      Ajouter une photo
    </button>
  </div>

  <!-- galerie -->
  <div class="row row-cols-2 row-cols-lg-3">

    <div
      class="col p-3"
      v-for="(image,index) in images"
      :key="index"
    >
      <div class="image-card text-white">

        <img
          :src="image.url"
          class="rounded w-100"
          :alt="image.titre"
        />

        <p class="titre-image">{{ image.titre }}</p>

        <div v-if="isAdmin" class="action-image-buttons">

          <button
            class="btn btn-outline-light me-2"
            data-bs-toggle="modal"
            data-bs-target="#EditionPhotoModal"
            @click="prepareEdit(image,index)"
          >
            ✏️
          </button>

          <button
            class="btn btn-outline-light"
            data-bs-toggle="modal"
            data-bs-target="#SuppressionPhotoModal"
            @click="prepareDelete(index)"
          >
            🗑
          </button>

        </div>

      </div>
    </div>

  </div>

</div>

<!-- Modal edition -->
<div class="modal fade" id="EditionPhotoModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">
          {{ editMode ? "Modifier la photo" : "Ajouter une photo" }}
        </h5>
      </div>

      <div class="modal-body">

        <div class="mb-3">
          <label class="form-label">Titre</label>
          <input
            v-model="form.titre"
            type="text"
            class="form-control"
          >
        </div>

        <div class="mb-3">
          <label class="form-label">Image</label>
          <input
            type="file"
            class="form-control"
            @change="handleFile"
          >
        </div>

        <div class="text-center">
          <button
            class="btn btn-primary"
            @click="saveImage"
            data-bs-dismiss="modal"
          >
            Enregistrer
          </button>
        </div>

      </div>
    </div>
  </div>
</div>

<!-- Modal suppression -->
<div class="modal fade" id="SuppressionPhotoModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h5>Supprimer cette photo ?</h5>
      </div>

      <div class="modal-body text-center">

        <button
          class="btn btn-danger me-2"
          @click="deleteImage"
          data-bs-dismiss="modal"
        >
          Supprimer
        </button>

        <button
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Annuler
        </button>

      </div>

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const isAdmin = true

const images = ref([
{
titre: "Chef cuisinier",
url: "https://picsum.photos/400/300"
}
])

const editMode = ref(false)
const editIndex = ref<number | null>(null)

const deleteIndex = ref<number | null>(null)

const form = ref({
titre: "",
url: ""
})

function handleFile(event:any){

const file = event.target.files[0]

if(file){
form.value.url = URL.createObjectURL(file)
}

}

function prepareAdd(){

editMode.value = false

form.value = {
titre:"",
url:""
}

}

function prepareEdit(image:any,index:number){

editMode.value = true
editIndex.value = index

form.value = {...image}

}

function saveImage(){

if(editMode.value && editIndex.value !== null){

images.value[editIndex.value] = {...form.value}

}else{

images.value.push({...form.value})

}

}

function prepareDelete(index:number){

deleteIndex.value = index

}

function deleteImage(){

if(deleteIndex.value !== null){

images.value.splice(deleteIndex.value,1)

}

}
</script>