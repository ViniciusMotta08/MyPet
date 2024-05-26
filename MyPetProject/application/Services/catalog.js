document.addEventListener('DOMContentLoaded', function () {
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const logoutButton = document.getElementById('logoutButton');
  let pets = [];

  if (!loggedInUser) {
    window.location.href = '../../pages/auth/login.html';
  }

  logoutButton.addEventListener('click', function () {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = '../../pages/auth/login.html';
  });

  function loadPets() {
    fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/listar/pets')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        return response.json();
      })
      .then(data => {
        pets = data.pets;
        renderPets(pets);
      })
      .catch(error => {
        console.error('Error loading pets:', error.message);
      });
  }

  function renderPets(pets) {
    const petCardsContainer = document.getElementById('petCards');
    petCardsContainer.innerHTML = '';
    pets.forEach(pet => {
      const card = `
      <div class="col-md-4">
          <div class="pet-card">
              <img src="${pet.image}" alt="${pet.nome}">
              <div class="pet-details">
                  <h3>${pet.nome}</h3>
                  <p><strong>Color:</strong> ${pet.cor}</p>
                  <p><strong>Breed:</strong> ${pet.raca}</p>
              </div>
              <div class="pet-actions">
                  <button class="edit-button btn btn-primary" data-id="${pet.id}">Edit</button>
                  <button class="delete-button btn btn-danger" data-id="${pet.id}">Delete</button>
              </div>
          </div>
      </div>
      `;
      petCardsContainer.innerHTML += card;
    });
  }

  loadPets();

  document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredPets = pets.filter(pet =>
      pet.nome.toLowerCase().includes(searchTerm) ||
      pet.raca.toLowerCase().includes(searchTerm) ||
      pet.cor.toLowerCase().includes(searchTerm)
    );
    renderPets(filteredPets);
  });

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
      const petId = event.target.dataset.id;
      openEditModal(petId);
    } else if (event.target.classList.contains('delete-button')) {
      const petId = event.target.dataset.id;
      openDeleteModal(petId);
    } else if (event.target.classList.contains('close')) {
      closeEditModal();
    }
  });

  const editModalElement = document.getElementById('editModal');
  const addModalElement = document.getElementById('addModal');
  const deleteModalElement = document.getElementById('deleteModal');

  const editModal = new bootstrap.Modal(editModalElement);
  const addModal = new bootstrap.Modal(addModalElement);
  const deleteModal = new bootstrap.Modal(deleteModalElement);

  function openEditModal(petId) {
    const pet = pets.find(pet => pet.id === parseInt(petId));
    if (!pet) {
      console.error('Pet not found');
      return;
    }

    document.getElementById('editPetName').value = pet.nome;
    document.getElementById('editPetRace').value = pet.raca;
    document.getElementById('editPetColor').value = pet.cor;
    document.getElementById('editPetImageUrl').value = pet.image;
    document.getElementById('editPetId').value = pet.id;

    editModal.show();
  }

  function openDeleteModal(petId) {
    deleteModal.show();

    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    confirmDeleteButton.onclick = function() {
      deletePet(petId);
    };
  }

  function deletePet(petId) {
    fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/excluir/pet/${petId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }
      loadPets();
      deleteModal.hide();
    })
    .catch(error => {
      console.error('Error deleting pet:', error.message);
    });
  }

  document.getElementById('addPetButton').addEventListener('click', function () {
    addModal.show();
  });

  document.getElementById('addPetForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const pet = {
      nome: document.getElementById('addPetName').value,
      raca: document.getElementById('addPetRace').value,
      cor: document.getElementById('addPetColor').value,
      image: document.getElementById('addPetImageUrl').value
    };

    fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/novo/pet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pet)
    })
    .then(response => {
      loadPets();
      addModal.hide();
    })
    .catch(error => {
      console.error('Error adding pet:', error.message);
    });
  });

  document.getElementById('editPetForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const petId = parseInt(document.getElementById('editPetId').value);
    const pet = {
      nome: document.getElementById('editPetName').value,
      raca: document.getElementById('editPetRace').value,
      cor: document.getElementById('editPetColor').value,
      image: document.getElementById('editPetImageUrl').value
    };

    fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/atualizar/pet/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pet)
    })
    .then(response => {
      loadPets();
      editModal.hide();
    })
  });
});