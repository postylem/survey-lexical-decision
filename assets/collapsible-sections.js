<script>
document.addEventListener("DOMContentLoaded", function () {
  const defined = "H1 H2 H3 H4 H5 H6";
  const levels = defined.split(" ");

  document.querySelectorAll(defined.replace(/ /g, ", ")).forEach((heading) => {
    const level = levels.indexOf(heading.tagName);
    // Collect sibling nodes until the next heading of same or higher level
    const content = [];
    let sib = heading.nextElementSibling;
    while (sib) {
      if (levels.indexOf(sib.tagName) !== -1 && levels.indexOf(sib.tagName) <= level) break;
      content.push(sib);
      sib = sib.nextElementSibling;
    }
    if (content.length === 0) return;

    // Wrap in a container
    const wrapper = document.createElement("div");
    wrapper.className = "collapsible-body";
    heading.parentNode.insertBefore(wrapper, content[0]);
    content.forEach((el) => wrapper.appendChild(el));

    // Add indicator span
    const indicator = document.createElement("span");
    indicator.className = "collapse-indicator";
    indicator.textContent = " ▾";
    heading.appendChild(indicator);

    // Make heading clickable
    heading.classList.add("collapsible-heading");
    heading.addEventListener("click", (e) => {
      // Don't collapse when clicking anchor links inside the heading
      if (e.target.tagName === "A") return;
      heading.classList.toggle("collapsed");
      wrapper.classList.toggle("collapsed");
      indicator.textContent = heading.classList.contains("collapsed") ? " ▸" : " ▾";
    });
  });

  // Uncollapse ancestors when navigating via TOC or hash links
  function revealTarget(hash) {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    // Walk up and uncollapse any collapsed ancestors
    let el = target.closest(".collapsible-body.collapsed") || target;
    while (el) {
      if (el.classList && el.classList.contains("collapsible-body") && el.classList.contains("collapsed")) {
        el.classList.remove("collapsed");
        // Find the corresponding heading (previous sibling)
        const hd = el.previousElementSibling;
        if (hd && hd.classList.contains("collapsible-heading")) {
          hd.classList.remove("collapsed");
          const ind = hd.querySelector(".collapse-indicator");
          if (ind) ind.textContent = " ▾";
        }
      }
      el = el.parentElement;
    }
    // Also uncollapse if the target itself is a heading
    if (target.classList.contains("collapsed")) {
      target.classList.remove("collapsed");
      const ind = target.querySelector(".collapse-indicator");
      if (ind) ind.textContent = " ▾";
      const body = target.nextElementSibling;
      if (body && body.classList.contains("collapsible-body")) {
        body.classList.remove("collapsed");
      }
    }
  }

  window.addEventListener("hashchange", () => revealTarget(location.hash));
  // Handle initial page load with hash
  if (location.hash) revealTarget(location.hash);
});
</script>
