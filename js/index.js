let lis = document.querySelector(".menu");

lis.onclick = function (e) {
  let ulElemt = e.target.lastElementChild;
  console.log(ulElemt);
  let eleDisplay = ulElemt.style.display;
  console.log(eleDisplay);
  if (!eleDisplay || eleDisplay == "none") {
    ulElemt.style.display = "block";
  } else {
    ulElemt.style.display = "none";
  }
};
