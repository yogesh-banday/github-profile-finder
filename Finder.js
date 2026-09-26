 async function getuser(username) {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
        );

        if (!response.ok) {
          throw new Error("User not found!");
        }

        const data = await response.json();

        return data;
      }

      const username = document.getElementById("username");
      const fetchProfile = document.getElementById("fetchProfile");
      const profile = document.getElementById("profile");

      async function user_display() {
        try {
          const user_name = username.value.trim();

          if (!user_name) {
            profile.innerHTML = "<h1>Please enter a Username</h1>";
            return;
          }

          profile.innerHTML = "<h1>Loading...</h1>";

          const user = await getuser(user_name);

          const name = user.name || "No name provided";
          const loctn = user.location || "No location provided";
          const avatar = user.avatar_url;
          const repo = user.public_repos;

          profile.innerHTML = `<h1>Name</h1>
          <h3>${name}</h3>
          <h1>Location</h1><h3>${loctn}</h3>
          <h1>Avatar</h1><img src="${avatar}" width="150">
          <h1>Public Repo</h1>
          <h3>${repo}</h3>`
          ;
        //   profile.innerHTML += `<h3>${name}</h3>`;

        //   profile.innerHTML += "<h1>Location</h1>";
        //   profile.innerHTML += `<h3>${loctn}</h3>`;

        //   profile.innerHTML += "<h1>Avatar</h1>";
        //   profile.innerHTML += `<img src="${avatar}" width="150">`;

        //   profile.innerHTML += "<h1>Public Repo</h1>";
        //   profile.innerHTML += `<h3>${repo}</h3>`;
        } catch (error) {
          profile.innerHTML = `<h1>${error.message}</h1>`;
          console.error(error);
        }
      }

      fetchProfile.addEventListener("click", user_display);