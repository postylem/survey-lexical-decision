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

    // Make heading clickable
    heading.classList.add("collapsible-heading");
    heading.addEventListener("click", () => {
      heading.classList.toggle("collapsed");
      wrapper.classList.toggle("collapsed");
    });
  });
});
</script>
