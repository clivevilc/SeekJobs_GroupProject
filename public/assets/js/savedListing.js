
// SAVED LISTING PAGE //////////////////////////////////////////////////// 

//const { default: knex } = require("knex")

//const { default: axios } = require("axios")

//setup applications


// saved listing template
let listingTemplate = Handlebars.compile(
  `  
  {{#each listings}}  
      <div class="card">
      <div>
          <h3>{{title}}</h3>
      </div>
      <h4>{{job_type}}</h4>
      <h5>HKD{{salary}}</h5>
      <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lorem mauris. Nulla fermentum tincidunt nulla et dignissim. In porttitor sem id velit lobortis aliquam. Duis et purus ac orci porttitor luctus at quis leo. Mauris vulputate pellentesque est, sit amet egestas tellus facilisis sit amet. Cras sodales bibendum tellus, a gravida tortor hendrerit sed. Pellentesque blandit posuere nisl, sit amet cursus nisl dignissim non.
      </p>
      {{!--  <button class="remove btn btn-danger" data-id={{id}}>DELETE</button> --}}
      </div>
  {{/each}}
  `
)

//get listing
const getSaved = () => {
    axios
        .get('/api/user/clive/saved') //Change to saved listing API
        .then((res) => {
            console.log(res.data)
            reloadListing(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

//delete listing
// Add an event listener onto the buttons that we generate along with each note, we target the class remove and listen for a click event.
$("#res").on("click", ".remove", (event) => {
  // show saving message on DOM
  // code here
  //beginSaving(event.currentTarget);
  console.log("DELETING FILE")
  AppRouter.deleteSavedListing(($(event.currentTarget).data("id")))
    .then((res) =>{
      //endSaving(event.currentTarget); //remove saving message from DOM
      reloadListing(res.data) //render updated notes
    })
    .catch((e) => {
      //endSaving(e.currentTarget);
      alert(e);
    })
});

// AXIOS INSTANCES

const reloadListing = (listings) => {
    // code here
    console.log("RELOADING");
    $("#res").html(listingTemplate({ listings: listings }));
  };
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getSaved);

/*   document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken); */


  