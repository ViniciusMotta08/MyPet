document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const logoutButton = document.getElementById('logoutButton');
    let pets = []; // Lista de pets em memória
  
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
          pets = data.pets; // Atualiza a lista de pets em memória
          renderPets(pets); // Renderiza os pets na interface
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
                    <button class="edit-button" data-id="${pet.id}">Edit</button>
                    <button class="delete-button" data-id="${pet.id}">Delete</button>
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
      renderPets(filteredPets); // Renderiza os pets filtrados na interface
    });
  
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('edit-button')) {
        const petId = event.target.dataset.id;
        openEditModal(petId);
      } else if (event.target.classList.contains('delete-button')) {
        const petId = event.target.dataset.id;
        deletePet(petId);
      } else if (event.target.classList.contains('close')) {
        closeEditModal();
      }
    });
  
    function openEditModal(petId) {
        const pet = pets.find(pet => pet.id === parseInt(petId));
        if (!pet) {
            console.error('Pet not found');
            return;
        }
    
        // Preencher os campos do formulário com os detalhes do pet
        document.getElementById('editPetName').value = pet.nome;
        document.getElementById('editPetRace').value = pet.raca;
        document.getElementById('editPetColor').value = pet.cor;
    
        // Exibir o modal
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    }
  
    function deletePet(petId) {
        // Abrir o modal de confirmação
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();
    
        // Quando o usuário confirmar a exclusão
        document.getElementById('confirmDeleteButton').addEventListener('click', function() {
            fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/excluir/pet/${petId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete pet');
                }
                loadPets();
                deleteModal.hide(); // Esconder o modal após a exclusão
            })
            .catch(error => {
                console.error('Error deleting pet:', error.message);
            });
        });
    }    
  
    document.getElementById('addPetButton').addEventListener('click', function () {
      window.location.href = '../../pages/registerPet/createPet.html';
    });
});