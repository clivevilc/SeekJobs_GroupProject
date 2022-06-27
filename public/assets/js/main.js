/* When the btn is clicked,
toggle between hiding and showing the dropdown content */
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
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  a = document.getElementById("search-bar-dropdown").getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
      // return txtValue;
    }
  }
}
