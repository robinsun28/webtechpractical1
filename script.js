async function handleSubmit(e) {
    e.preventDefault();
  document.getElementById("result-head").innerHTML = "";
  const result = document.getElementById("result");
  result.innerHTML = "";

  const profile = await getProfile();

  if (profile != null) {
    document
      .getElementById("result-div")
      .classList.add("container", "bg-white", "p-4");
    document.getElementById("result-head").innerHTML = "Github Profile Details";

    const li1 = document.createElement("li");
    li1.innerHTML = "Username: " + profile.login;
    const li2 = document.createElement("li");
    li2.innerHTML = "ID: " + profile.id;
    const li3 = document.createElement("li");
    li3.innerHTML = "CREATED AT: " + profile.created_at;
    const li4 = document.createElement("li");
    li4.innerHTML = "URL: " + profile.url;

    result.appendChild(li1);
    result.appendChild(li2);
    result.appendChild(li3);
    result.appendChild(li4);
    document
      .getElementById("result-div")
      .classList.add("container", "bg-white", "p-4");
    document.getElementById("result-head").innerHTML = "Github Profile Details";
  }
}
  
  
  document.getElementById("myform").addEventListener("submit", handleSubmit);
  
  async function getProfile() {
    let username = document.getElementById("username").value;
  
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const rate = response.headers.get("X-RateLimit-Remaining");
      if (rate === 0) {
        document
        .getElementById("result-div")
        .classList.add("container", "bg-white", "p-4");
      document.getElementById("result-head").innerHTML = "Rate  Limit exceeded!";
        return;
      }
      if (response.status === 404) {
        document
        .getElementById("result-div")
        .classList.add("container", "bg-white", "p-4");
      document.getElementById("result-head").innerHTML = "User not found!";
        return;
      }
      profile = await response.json();
      console.log(profile);
      return profile;
    } catch (e) {
      alert("An error occuered while making the request. Please try again...");
    }
  }
  
  
  