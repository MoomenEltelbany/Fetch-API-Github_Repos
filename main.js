// Catching the elements that we will use to work
const inputText = document.querySelector("input");
const inputButton = document.querySelector("button");
const showRepos = document.querySelector(".show-repos");

inputButton.onclick = () => {
    showRepos.innerHTML = "";
    if (inputText.value === "") {
        showRepos.innerHTML = "<div>The input field is empty</div>";
    } else {
        fetch(`https://api.github.com/users/${inputText.value}/repos`)
            .then((response) => {
                if (response.status !== 200) {
                    showRepos.innerHTML = `The provided name ${inputText.value} is not a valid name.`;
                }
                return response.json();
            })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    // Creating the Main Div
                    let mainDiv = document.createElement("div");
                    mainDiv.className = "repos-data";
                    // Creating the repos name inside the div we created for each repository content
                    let repoName = document.createElement("p");
                    repoName.innerHTML = `${data[i].name}`;

                    // Creating the div that will contain the whole other information like the the stars and forks etc
                    let reposStars = document.createElement("div");
                    reposStars.className = "repos-stars";

                    // The part of the stars
                    let starsSpan = document.createElement("span");
                    starsSpan.className = "stars";
                    starsSpan.innerHTML = `Stars: ${data[i].stargazers_count}`;

                    // The part of the forks
                    let forksSpan = document.createElement("span");
                    forksSpan.className = "forks";
                    forksSpan.innerHTML = `<i class="fa-solid fa-code-fork"></i> ${data[i].forks_count}`;

                    // The Links Part
                    let repoLink = document.createElement("a");
                    repoLink.setAttribute("target", "_blank");
                    repoLink.href = `https://github.com/${inputText.value}/${data[i].name}`;
                    repoLink.innerHTML = "Visit";
                    // Appending the info of each repos inside the big div of the info
                    reposStars.appendChild(starsSpan);
                    reposStars.appendChild(forksSpan);
                    reposStars.appendChild(repoLink);

                    // Appending the div inside the div that contain all the information

                    mainDiv.appendChild(repoName);
                    mainDiv.appendChild(reposStars);

                    showRepos.appendChild(mainDiv);
                }
            });
    }
};
