document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("imageContainer");

  fetch("https://picsum.photos/v2/list?page=1&limit=30")
    .then((response) => response.json())
    .then((images) => {
      images.forEach((image) => {
        const img = document.createElement("img");
        img.src = `${image.download_url}`;
        img.alt = image.author;
        img.className = "image-tile";

        img.onload = () => {
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          img.style.width = `${150 * aspectRatio}px`;
          img.style.height = "150px";
        };

        container.appendChild(img);
      });
    })
    .catch((error) => console.error("Error fetching images:", error));
});
