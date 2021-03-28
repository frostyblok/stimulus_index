import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
	static targets = ["table", "modal", "last", "save", "saveUser", "edit", "delete", "name", "title", "email", "phone", "status"];

	initialize() {
		this.render()
	}

	render() {
		this.getAllUser()
			.then(({ users }) => {
				let tr = '';
				users.forEach(function(user, index) {
					tr += `<tr>
								<td>${ index + 1 }</td>
								<td>${new Date(user.updated_at).toLocaleString()}</td>
								<td>${ user.name}</td>
								<td>${ user.email }</td>
								<td>${ user.title }</td>
								<td>${ user.phone }</td>
								<td style="background: ${user.status === 'active' ? 'green' : 'red' }">${ user.status }</td>
								<td>
									<div>
										<button data-action="click->user#openModal" data-user-target="edit" data-user-id="${user.id}">Edit</button>
										<button data-action="click->user#openDeleteModal" data-user-target="delete" data-user-id="${ user.id }">Delete</button>
									</div>
								</td>
							</tr>`;
				});
				this.tableTarget.insertAdjacentHTML('beforeend', tr);


			})
			.catch((error) => {
				console.log(error)
			});
	}
	getParameterByName(name, url = window.location.href) {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}


	openModal(event) {
		event.preventDefault();

		const element = event.target;
		const dset = element.dataset
		const userId = element.dataset.userId

		let button = '';
		if (dset.userId === undefined) {
			button += `<button data-user-target="save" data-user-id="${userId}" data-handle="create" data-action="click->user#handleUserSuccess">Save</button>`;
		} else {
			button += `<button data-user-target="save" data-user-id="${userId}" data-handle="update" data-action="click->user#handleUserSuccess">Update</button>`;
		}

		this.saveUserTarget.insertAdjacentHTML('beforeend', button)
		this.open();
	}

	openDeleteModal(event) {
		const element = event.target;
		const userId = element.dataset.userId
		let modal = document.getElementById('delete-modal');

		modal.classList.add("modal-open");
		modal.setAttribute("style", "display: block;");
		modal.classList.add("show");
		modal.insertAdjacentHTML('beforebegin', '<div class="modal-backdrop fade show"></div>')
		this.saveTarget.setAttribute('data-user-id', userId);
		console.log(this.saveTarget)
	}

	handleUserSuccess(event) {
		event.preventDefault();

		const element = event.target;
		let userPromiseObject;

		if (element.dataset.handle === "create") {
			userPromiseObject = this.createUser()
		} else {
			userPromiseObject = this.updateUser(element.dataset.userId);
		}

		userPromiseObject
			.then(({message}) => {
				if (message === "User created successfully" || message === "User updated successfully" || message === "User destroyed successfully") {
					console.log("suceesssss");
					this.close();
					// this.render();
				}
			})
			.catch((error) => {
				console.log(error)
				this.close();
				// this.render();
				// console.log(error)
			});
	}

	handleDeleteSuccess(event) {
		event.preventDefault();

		const userId = parseInt(this.saveTarget.dataset.userId)
		this.deleteUser(userId)
			.then(({message}) => {
				if (message === "User destroyed successfully") {
					console.log("suceesssss");
					this.close();
					this.render();
				}
			})
			.catch((error) => {
				this.close();
				this.render();
				console.log(error)
			});
	}

	getAllUser() {
		let sort_by = this.getParameterByName('sort');
		if (sort_by === null) {
			sort_by = ""
		}

		return new Promise((resolve, reject) => {
			Rails.ajax({
				type: 'GET',
				url: `/users_json?sort=${sort_by}`,
				success: function (data) {
					resolve(data)
				},
				error: function (error) {
					reject(error)
				},
			})
		})
	}



	createUser() {
		let formData = new FormData();

		formData.append('name', this.nameTarget.value);
		formData.append('title', this.titleTarget.value);
		formData.append('email', this.emailTarget.value);
		formData.append('phone', this.phoneTarget.value);
		formData.append('status', this.statusTarget.value);

		return new Promise((resolve, reject) => {
			Rails.ajax({
				type: 'POST',
				url: '/users',
				data: formData,
				success: function (data) {
					resolve(data)
				},
				error: function (error) {
					reject(error)
				},
			})
		})
	}

	updateUser(userId) {
		const parseUserId = parseInt(userId);

		let formData = new FormData();

		formData.append('name', this.nameTarget.value);
		formData.append('title', this.titleTarget.value);
		formData.append('email', this.emailTarget.value);
		formData.append('phone', this.phoneTarget.value);
		formData.append('status', this.statusTarget.value);

		return new Promise((resolve, reject) => {
			Rails.ajax({
				type: 'PUT',
				url: `/users/${parseUserId}`,
				data: formData,
				success: function (data) {
					resolve(data)
				},
				error: function (error) {
					reject(error)
				},
			})
		})
	}

	deleteUser(userId) {
		const parseUserId = parseInt(userId);

		return new Promise((resolve, reject) => {
			Rails.ajax({
				type: 'DELETE',
				url: `/users/${parseUserId}`,
				success: function (data) {
					resolve(data)
				},
				error: function (error) {
					reject(error)
				},
			})
		})
	}
	open() {
		let modal = document.getElementById('modal');
		modal.classList.add("modal-open");
		modal.setAttribute("style", "display: block;");
		modal.classList.add("show");
		modal.insertAdjacentHTML('beforebegin', '<div class="modal-backdrop fade show"></div>')
	}

	close() {

		let modal = document.getElementById('modal')
		modal.classList.remove("modal-open");
		this.saveTarget.remove();
		modal.removeAttribute("style");
		modal.classList.remove("show");
		document.getElementsByClassName("modal-backdrop")[0].remove();
		this.lastTarget.click();
	}

}
