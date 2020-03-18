var PetsView = (function() {
	var dao;
	var owner;
	
	// Referencia a this que permite acceder a las funciones públicas desde las funciones de jQuery.
	var self;
	
	var formId = 'pets-form';
	var listId = 'pets-list';
	var formQuery = '#' + formId;
	var listQuery = '#' + listId;
	
	var formContainerQuery;
	var listContainerQuery;
	
	function PetsView(ownerId, petsDao, formContainerId, listContainerId) {
		dao = petsDao;
		self = this;
		owner = ownerId;
		
		insertPetsForm($('#' + formContainerId));
		insertPetsList($('#' + listContainerId));
		
		formContainerQuery = '#' + formContainerId;
		listContainerQuery = '#' + listContainerId;
		
		this.init = function() {
			dao.listPetsByOwner(ownerId, function(pets) {
				$.each(pets, function(key, pet) {
					appendToTable(pet);
				});
			},
			function() {
			    	alert('No has sido posible acceder al listado de mascotas.');
			});
			
			// La acción por defecto de enviar formulario (submit) se sobreescribe
			// para que el envío sea a través de AJAX
			$(formQuery).submit(function(event) {
				var pet = self.getPetInForm();
				
				if (self.isEditing()) {
					dao.modifyPet(pet,
						function(pet) {
							$('#pet-' + pet.id + ' td.name').text(pet.name);
							self.resetForm();
						},
						showErrorMessage,
						self.enableForm
					);
				} else {
					dao.addPet(pet,
						function(pet) {
							console.log(pet);
							appendToTable(pet);
							self.resetForm();
						},
						showErrorMessage,
						self.enableForm
					);
				}
				
				return false;
			});
			
			$('#btnClear').click(this.resetForm);
			$('#btnBack').click(this.back);
		};

		this.getPetInForm = function() {
			var form = $(formQuery);
			return {
				'id': form.find('input[name="id"]').val(),
				'ownerId': owner,
				'name': form.find('input[name="name"]').val()		
			};
		};

		this.getPetInRow = function(id) {
			var row = $('#pet-' + id);

			if (row !== undefined) {
				return {
					'id': id,
					'name': row.find('td.name').text(),
					'ownerId' : owner
				};
			} else {
				return undefined;
			}
		};
		
		this.editPet = function(id) {
			var row = $('#pet-' + id);
			
			console.log("Entrando en editPet");

			if (row !== undefined) {
				var form = $(formQuery);
				
				form.find('input[name="id"]').val(id);
				form.find('input[name="name"]').val(row.find('td.name').text());
				
				$('input#btnSubmit').val('Modificar');
			}
			
			console.log("Saliendo de editPet");
		};
		
		this.deletePet = function(id) {
			if (confirm('Está a punto de eliminar a una mascota. ¿Está seguro de que desea continuar?')) {
				dao.deletePet(id,
					function() {
						$('tr#pet-' + id).remove();
					},
					showErrorMessage
				);
			}
		};
		
		this.back = function() {
			
			$(formContainerQuery).empty();
			$(listContainerQuery).empty();
			$(formContainerQuery).append('<h1 class="display-5 mt-3 mb-3">Personas</h1>');
			
			var view = new PeopleView(new PeopleDAO(),
					'people-container', 'people-container'
					);
			
			view.init();
			
		}

		this.isEditing = function() {
			console.log("Entrando en is editing");
			return $(formQuery + ' input[name="id"]').val() != "";
			console.log("Saliendo de is editing");
		};

		this.disableForm = function() {
			$(formQuery + ' input').prop('disabled', true);
		};

		this.enableForm = function() {
			$(formQuery + ' input').prop('disabled', false);
		};

		this.resetForm = function() {
			$(formQuery)[0].reset();
			$(formQuery + ' input[name="id"]').val('');
			$('#btnSubmit').val('Crear');
		};
	};
	
	var insertPetsList = function(parent) {
		parent.append(
			'<table id="' + listId + '" class="table">\
				<thead>\
					<tr class="row">\
						<th class="col-sm-9">Nombre</th>\
						<th class="col-sm-3">&nbsp;</th>\
					</tr>\
				</thead>\
				<tbody>\
				</tbody>\
			</table>'
		);
	};

	var insertPetsForm = function(parent) {
		parent.append(
			'<form id="' + formId + '" class="mb-5 mb-10">\
				<input name="id" type="hidden" value=""/>\
				<div class="row">\
					<div class="col-sm-9">\
						<input name="name" type="text" value="" placeholder="Nombre" class="form-control" required/>\
					</div>\
					<div class="col-sm-3">\
						<input id="btnSubmit" type="submit" value="Crear" class="btn btn-primary" />\
						<input id="btnClear" type="reset" value="Limpiar" class="btn" />\
						<input id="btnBack" type="reset" value="Atrás" class="btn btn-primary" />\
					</div>\
				</div>\
			</form>'
		);
	};

	var createPetRow = function(pet) {
		return '<tr id="pet-'+ pet.id +'" class="row">\
			<td class="name col-sm-9">' + pet.name + '</td>\
			<td class="col-sm-3">\
				<a class="edit btn btn-light" href="#">Editar</a>\
				<a class="delete btn btn-light" href="#">Eliminar</a>\
			</td>\
		</tr>';
		console.log(pet.id);
	};

	var showErrorMessage = function(jqxhr, textStatus, error) {
		alert(textStatus + ": " + error);
	};

	var addRowListeners = function(pet) {
		$('#pet-' + pet.id + ' a.edit').click(function() {
			self.editPet(pet.id);
		});
		
		$('#pet-' + pet.id + ' a.delete').click(function() {
			self.deletePet(pet.id);
		});
	};

	var appendToTable = function(pet) {
		$(listQuery + ' > tbody:last')
			.append(createPetRow(pet));
		addRowListeners(pet);
	};
	
	return PetsView;
})();
