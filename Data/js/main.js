function toggleMap() {
    var mapContainer = document.querySelector('.map-container');
    mapContainer.style.display = (mapContainer.style.display === 'none') ? 'block' : 'none';
  }

  let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
   let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
   arrowParent.classList.toggle("showMenu");
    });
  }
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".bx-menu");
  console.log(sidebarBtn);
  sidebarBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });  
  

  $(".close").click(function(){
    $('.outside').toggleClass('in');
    $('.bar').toggleClass('active');
    $(this).toggleClass('is-showing');
  });