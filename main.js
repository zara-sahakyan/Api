/** @format */

(function ($) {
	let $window = $(window),
		$body = $("body");
	$window.on("load", function () {
		window.setTimeout(function () {
			$body.removeClass("is-preload");
		}, 100);
	});

	$(".scrolly").scrolly();
})(jQuery);

async function fetchUserData() {
	const username = document.getElementById("username").value.trim();
	const apiUrl = `https://api.github.com/users/${username}`;

	try {
		const userDataResponse = await fetch(apiUrl);
		const userData = await userDataResponse.json();

		const userInfoContainer = document.getElementById("user-info");
		userInfoContainer.innerHTML = `<h2>${userData.name || username}</h2>
                                       <p>Followers: ${userData.followers}</p>
                                       <p>Following: ${userData.following}</p>
                                       <p>Public Repos: ${
																					userData.public_repos
																				}</p>`;

		const reposUrl = userData.repos_url;
		const reposResponse = await fetch(reposUrl);
		const reposData = await reposResponse.json();

		const reposContainer = document.getElementById("repos");
		reposContainer.innerHTML = "";
		reposData.forEach((repo) => {
			const repoElement = document.createElement("li");
			repoElement.classList.add("repo");
			repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
			reposContainer.appendChild(repoElement);
		});
	} catch (error) {
		console.error("Error fetching user data:", error);
	}
}
