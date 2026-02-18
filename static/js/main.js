document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA DEL SIDEBAR ---
    const btnToggle = document.querySelector('.toggle-btn');
    const sidebar = document.getElementById('sidebar');

    // Solo ejecutamos si los elementos existen en la página actual
    if (btnToggle && sidebar) {
        btnToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    // --- LÓGICA DEL MODAL ---
    const modalElement = document.getElementById('myModal');
    const carouselInner = document.getElementById('carouselInner');

    if (modalElement && carouselInner) {
        const myModal = new bootstrap.Modal(modalElement);

        // Usamos delegación de eventos para que funcione con elementos de Django
        document.addEventListener('click', function(event) {
            const button = event.target.closest('.openModalButton');
            
            if (button) {
                event.preventDefault();
                carouselInner.innerHTML = "";

                // Extraemos todas las imágenes del dataset (data-img1, data-img2, etc.)
                const fotos = Object.keys(button.dataset)
                    .filter(key => key.startsWith('img'))
                    .map(key => button.dataset[key]);

                if (fotos.length > 0) {
                    fotos.forEach((foto, index) => {
                        const div = document.createElement('div');
                        div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                        div.innerHTML = `<img src="${foto}" class="d-block w-100" style="max-height: 80vh; object-fit: contain;">`;
                        carouselInner.appendChild(div);
                    });

                document.getElementById('modalTitulo').textContent = button.dataset.titulo || '';
                document.getElementById('modalDescripcion').textContent = button.dataset.descripcion || '';
                const btnRepo = document.getElementById('modalRepositorioLink');
                btnRepo.href = button.dataset.repositorio;
                btnRepo.style.display = button.dataset.repositorio ? 'inline-block' : 'none';
                
                const btnLink = document.getElementById('modalLink');
                if (button.dataset.link) {
                    btnLink.href = button.dataset.link;
                }
                btnLink.style.display = button.dataset.link ? 'inline-block' : 'none';
                    myModal.show();
                }
            }
        });
    }
});

document.querySelectorAll('.openModalButton').forEach(button => {
    button.addEventListener('click',function() {
        const carouselInner = document.getElementById('carouselInner');
        carouselInner.innerHTML = '';

        Object.keys(this.dataset).forEach(key => {
            if (key.startsWith('img')) {
                const imgSrc = this.dataset[key];
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (key === 'img1') {
                    carouselItem.classList.add('active');
                }

                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imgElement.classList.add('d-block', 'w-100');
                imgElement.style.maxHeight = '80vh';
                imgElement.style.objectFit = 'contain';

                carouselItem.appendChild(imgElement);
                carouselInner.appendChild(carouselItem);
            }
        });
    });
});

    var form = document.getElementById("my-form");
	
	async function handleSubmit(event) {
	event.preventDefault();
	var status = document.getElementById("my-form-status");
	var data = new FormData(event.target);
	fetch(event.target.action, {
	method: form.method,
	body: data,
	headers: {
		'Accept': 'application/json'
	}
	}).then(response => {
	if (response.ok) {
		status.innerHTML = "¡Gracias por contactarte!. Te responderé a la brevedad";
		form.reset()
	} else {
		response.json().then(data => {
		if (Object.hasOwn(data, 'errors')) {
			status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
		} else {
			status.innerHTML = "Oops! Ha habido un error al enviar tu mensaje"
		}
		})
	}
	}).catch(error => {
	status.innerHTML = "Oops! Ha habido un error al enviar tu mensaje"
	});
}
form.addEventListener("submit", handleSubmit)

    