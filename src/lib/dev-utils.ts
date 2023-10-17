let scrollPosition: number = 0;

if (import.meta.hot) {
  const main = document.querySelector("main");

  if (main) {
    import.meta.hot.on("vite:beforeFullReload", () => {
      scrollPosition = main.scrollTop;
      localStorage.setItem("scrollPosition", scrollPosition.toString());
    });

    import.meta.hot.on("vite:ws:connect", () => {
      const savedScroll = localStorage.getItem("scrollPosition");
      if (savedScroll) {
        scrollPosition = parseInt(savedScroll);

        const originalScrollBehavior = main.style.scrollBehavior;
        main.style.scrollBehavior = "auto";
        main.scrollTo(0, scrollPosition);
        main.style.scrollBehavior = originalScrollBehavior;
      }
    });
  }
}
