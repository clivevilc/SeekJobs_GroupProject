/*--------------------------------------------------------------
# Search Bars X3
--------------------------------------------------------------*/
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
var jobsAndCompany = ["Full-Stack Web Developer", "Frontend Web Developer", "Backend Web Developer", "Meta", "Apple", "Accenture"];
var locations = ["Hong Kong", "Singapore", "USA", "Berlin", "UK", "Canada"];

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
