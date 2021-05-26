function doMagic(e, MilliSeconds) {
  let Seconds = MilliSeconds * 1000;
  e.preventDefault();
  e.target.classList.add("d-none");

  setTimeout(() => {
    e.target.classList.remove("d-none");
  }, Seconds);
}
