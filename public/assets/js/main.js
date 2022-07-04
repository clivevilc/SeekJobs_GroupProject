/*--------------------------------------------------------------
# Search Bars X3
--------------------------------------------------------------*/
// 1st & 2nd: Job title or company, All locations
// Toggle between hiding and showing the dropdown when the btn is clicked
$(".dropbtn").click(function() {
  if ($("#search-bar-dropdown").hasClass("show")) {
    $("#search-bar-dropdown").removeClass("show");
  }
  else {
    $("#search-bar-dropdown").addClass("show");
  }
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = $("#search-bar-dropdown");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

// Filter keywords and return matching results
function filterFunction() {
  var input, filter, a, i;
  input = document.getElementById("input-job-company");
  filter = input.value.toUpperCase();
  a = document.getElementById("search-bar-dropdown").getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// Should be replaced with database or seperate .json file
var jobsAndCompany = ["Full-Stack Web Developer", "Frontend Web Developer", "Backend Web Developer", "Meta", "Apple", "Xccelerate"];
var locations = ["Hong Kong", "Singapore", "United States", "Germany", "United Kingdom", "Canada", "France"];
autocomplete(document.getElementById("input-job-company"), jobsAndCompany);
autocomplete(document.getElementById("input-location"), locations);

function autocomplete(input, arr) {
  var currentFocus;
  input.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
          input.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  input.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) { // press down on keyboard to select
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != input) {
      x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

// 3rd: Employment Types
var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
l = x.length;

for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*... contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current one*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
  /*all select boxes will be closed if clicked anywhere outside*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);



//SAVED LISTING 
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