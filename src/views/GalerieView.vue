<template>
  <div>
    <div class="hero-scene text-center text-white">
      <div class="hero-scene-content">
        <h1 class="mb-4">Galerie</h1>
      </div>
    </div>

    <div class="text-center mb-4">
      <button
        v-if="isAdmin"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#photoModal"
        @click="openCreate"
      >
        Ajouter une photo
      </button>
    </div>

    <div v-if="loading" class="text-center my-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <div v-else class="row row-cols-2 row-cols-lg-3">
      <div class="col p-3" v-for="img in images" :key="img.id">
        <div class="image-card text-white position-relative">

          <img
            :src="img.url"
            class="rounded w-100"
            :alt="img.titre"
          />

          <p class="titre-image">{{ img.titre }}</p>

          <div v-if="isAdmin" class="action-image-buttons">
            <button
              class="btn btn-outline-light me-2"
              data-bs-toggle="modal"
              data-bs-target="#photoModal"
              @click="openEdit(img)"
            >
              ✏️
            </button>

            <button
              class="btn btn-outline-light"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              @click="setDelete(img)"
            >
              🗑
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEdit ? "Modifier la photo" : "Ajouter une photo" }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Titre de l'image</label>
              <input
                v-model="form.title"
                class="form-control"
                placeholder="Ex: Salle principale du restaurant"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Fichier Image {{ isEdit ? '(Optionnel)' : '' }}</label>
              <input
                type="file"
                class="form-control"
                ref="fileInput"
                accept="image/*"
                @change="handleFile"
              />
            </div>

            <button
              class="btn btn-primary w-100"
              @click="save"
              :disabled="loading || (!isEdit && !selectedFile) || !form.title"
              data-bs-dismiss="modal"
            >
              <span v-if="loading">Enregistrement...</span>
              <span v-else>Enregistrer</span>
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content text-center">

          <div class="modal-header">
            <h5 class="modal-title">Supprimer l'image ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <p v-if="deleteTarget">Voulez-vous vraiment supprimer "<strong>{{ deleteTarget.titre }}</strong>" ?</p>
            <div class="mt-3">
              <button
                class="btn btn-danger me-2"
                @click="remove"
                data-bs-dismiss="modal"
                :disabled="loading"
              >
                Supprimer
              </button>
              <button class="btn btn-secondary" data-bs-dismiss="modal" :disabled="loading">
                Annuler
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import {getAdminStatus} from "@/services/authService"
import { useToast } from "vue-toastification"

/* TYPES */
interface ApiPicture {
  id: number
  titre: string
  url: string
}

/* STATE */
const isAdmin = ref(false)
const loading = ref(false)
const images = ref<ApiPicture[]>([])

const isEdit = ref(false)
const selectedFile = ref<File | null>(null)
const selectedId = ref<number | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const form = ref({
  id: null as number | null,
  title: ""
})

const deleteTarget = ref<ApiPicture | null>(null)

/* API BASE URL */
const API = "https://main-bvxea6i-lqgvam637pyno.fr-4.platformsh.site/api/picture"

/* FUNCTIONS */

// Réinitialiser le champ de fichier html natif
function resetFileInput() {
  if (fileInput.value) {
    fileInput.value.value = ""
  }
  selectedFile.value = null
}

// Charger le catalogue d'images
async function load() {
  loading.value = true
  try {
    const res = await fetch(`${API}/list`)
    if (!res.ok) throw new Error("Erreur lors de la récupération des données.")
    images.value = await res.json()
  } catch (e) {
    console.error("LOAD ERROR:", e)
  } finally {
    loading.value = false
  }
}

// Capturer le fichier sélectionné
function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

// Préparer l'ouverture du modal en création
function openCreate() {
  isEdit.value = false
  selectedId.value = null
  resetFileInput()
  form.value = {
    id: null,
    title: ""
  }
}

// Préparer l'ouverture du modal en édition
function openEdit(img: ApiPicture) {
  isEdit.value = true
  selectedId.value = img.id
  resetFileInput()
  form.value = {
    id: img.id,
    title: img.titre
  }
}

// Soumettre le formulaire (Création ou Édition)
async function save() {
  // Sécurité basique avant envoi
  if (!form.value.title) return
  if (!isEdit.value && !selectedFile.value) return

  loading.value = true

  const formData = new FormData()
  formData.append("title", form.value.title)
  formData.append("restaurant_id", "3") 

  if (selectedFile.value) {
    formData.append("image", selectedFile.value)
  }

  // NOTE backend : Les deux routes utilisent la méthode POST pour le multipart/form-data
  const url = isEdit.value && selectedId.value
    ? `${API}/${selectedId.value}`
    : `${API}/create`

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Erreur lors de la sauvegarde")
    }

  } catch (e) {
    console.error("SAVE ERROR:", e)
  } finally {
    resetFileInput()
    await load()
  }
}

// Préparer la suppression
function setDelete(img: ApiPicture) {
  deleteTarget.value = img
}

// Exécuter la suppression
async function remove() {
  if (!deleteTarget.value) return

  loading.value = true
  try {
    const response = await fetch(`${API}/${deleteTarget.value.id}`, {
      method: "DELETE"
    })

    if (!response.ok) throw new Error("Impossible de supprimer la ressource.")
  } catch (e) {
    console.error("DELETE ERROR:", e)
  } finally {
    deleteTarget.value = null
    await load()
  }
}

/* INITIALISATION */
onMounted(async () => {
  isAdmin.value = await getAdminStatus()
  await load()
})
</script>