const getProfile = () => {
    axios
        .get('/api/user')
        .then((res) => {
            console.log(res.data)
            //reloadListing(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

// AXIOS INSTANCES
//Render to browser
const loadProfile = (profile) => {
    // code here
    console.log("Loading user profile");
    $("#profile").html(profileTemplate({ profile: profile }));
  };

//Tempalate for user profile
let profileTemplate = Handlebars.compile(
    `  
    {{#each listings}}  
        <div class="card">
        <div>
            <h3>{{company_name}}</h3>
        </div>
        <h4>{{title}}</h4>
        <h5>{{location}}</h5>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lorem mauris. Nulla fermentum tincidunt nulla et dignissim. In porttitor sem id velit lobortis aliquam. Duis et purus ac orci porttitor luctus at quis leo. Mauris vulputate pellentesque est, sit amet egestas tellus facilisis sit amet. Cras sodales bibendum tellus, a gravida tortor hendrerit sed. Pellentesque blandit posuere nisl, sit amet cursus nisl dignissim non.
        </p>
        </div>
    {{/each}}
    `
)

  // Event listeners
  //document.getElementById('getProf').addEventListener('click', getProfile);