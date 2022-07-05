document.addEventListener('DOMContentLoaded', function() {
  /* --------------------- 1. Search Bars --------------------- */
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
  // function filterFunction() {
  //   var input, filter, a, i;
  //   input = document.getElementById("input-job-company");
  //   filter = input.value.toLowerCase();
  //   a = document.getElementById("search-bar-dropdown").getElementsByTagName("a");
  //   for (i = 0; i < a.length; i++) {
  //     txtValue = a[i].textContent || a[i].innerText;
  //     if (txtValue.toLowerCase().indexOf(filter) > -1) {
  //       a[i].style.display = "";
  //     } else {
  //       a[i].style.display = "none";
  //     }
  //   }
  // }

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
          if (arr[i].substr(0, val.length).toLowerCase() == val.toLowerCase()) {
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
  // ------------- 2. Dynamic Job Cards (left column) -------------
  function jobListing() {
    fetch("/api/jobListing")
      .then(response => response.json())
      .then(data => data.forEach(e => $("#newCard")
        .append(`
          <div class="card" id=${e.id}>
            <div>
              <h3>${e.company_name}</h3>
              <img src="/assets/img/companyLogo-placeholder.png" alt="company logo placeholder" class="company-logo">
            </div>
            <h4>${e.title}</h4>
            <h5>${e.location}</h5>
            <p>${e.job_type}</p>
            <p>Salary: $${e.salary} per month</p>
          </div>
        `)))
      .catch(err => console.log(err));
  }
  jobListing();
  // ---------------- DON'T DELETE IT ! ----------------
  // const searchJobsData = async () => {
  //   const response = await fetch('/api/joblisting');
  //   if(response.status !== 200) {
  //     throw new Error(`fail to fetch the data`);
  //   } else {
  //     const data = await response.json();
  //     return data;
  //   }
  // };
  // ----------- 3. Dynamic Job Detail (right column) -----------
  // error: only the upper part of card is responsive 
  // possible solution: add a btn tp prompt job detail
  $('#left-column-jobs').click('.card', e => {
    console.log(e.target.getAttribute('id'));
    fetch("/api/jobListing")
      .then(response => response.json())
      .then(data => {
        console.log(e.currentTarget);

        var result = data.filter(object => 
          object.id == e.currentTarget.id);
          $('.job-detail').html(result[0].description);
      })
    // alert(`Hello there`);
  });
  // ----------- 4. filter jobs -----------
  // const searchBar = $("#input-job-company");
  // searchBar.on('keyup', e => {
  //   const term = e.target.value.toLowerCase();
  //   const jobs = $("#left-column-jobs .card");

  //   Array.from(jobs).forEach(job => {
  //     const title = job.firstElementChild.textContent;
  //     console.log(job);

  //     if (title.toLowerCase().indexOf(e.target.value) != -1) {
  //       job.style.display = 'block';
  //     } else {
  //       job.style.display = 'none';
  //     }
  //   });
  // });

  const searchCompany = $("#input-job-company");
  searchCompany.on('keyup', e => {
    let term = e.target.value.toLowerCase();
    let jobs = $("#left-column-jobs .card");
    Array.from(jobs).forEach(job => {
      const title = job.firstElementChild.textContent;
      if (title.toLowerCase().indexOf(e.target.value) != -1) {
        job.style.display = 'block';
      } else {
        job.style.display = 'none';
      }
    });
  });

  const searchLocation = $("#input-location");
  searchLocation.on('keyup', e => {
    let term = e.target.value.toLowerCase();
    let jobs = $("#left-column-jobs .card");
    Array.from(jobs).forEach(job => {
      // this line has some problems
      const title = job.document.querySelector('div h5:nth-child(1)').textContent;
      // console.log(title);
      if (title.toLowerCase().indexOf(e.target.value) != -1) {
        job.style.display = 'block';
      } else {
        job.style.display = 'none';
      }
    });
  });
})
