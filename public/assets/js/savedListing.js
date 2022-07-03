
const getSaved = () => {
    axios
        .get('/api/listing') //Change to saved listing API
        .then((res) => {
            console.log(res.data)
            reloadListing(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

// AXIOS INSTANCES

const reloadListing = (listings) => {
    // code here
    console.log("RELOADING");
    $("#res").html(listingTemplate({ listings: listings }));
  };


let listingTemplate = Handlebars.compile(
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
  