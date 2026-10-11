document.addEventListener("DOMContentLoaded", () => {
  // 1. Kalkulator Perubahan Estimasi Harga Kartu Layanan
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    const denomSelect = card.querySelector(".denom-select");
    const priceDisplay = card.querySelector(".total-price");

    if (denomSelect && priceDisplay) {
      function updatePrice() {
        const selectedPrice = parseInt(denomSelect.value);
        priceDisplay.textContent = selectedPrice.toLocaleString("id-ID");
      }
      denomSelect.addEventListener("change", updatePrice);
    }
  });

  // 2. Fitur Accordion FAQ
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        item.classList.toggle("active");
        const icon = question.querySelector("span");
        if (icon) {
          if (item.classList.contains("active")) {
            icon.textContent = "−";
          } else {
            icon.textContent = "+";
          }
        }
      });
    }
  });

  // 3. Menampilkan Nama File Foto/Video dalam Bahasa Indonesia
  const mediaInput = document.getElementById("deviceMedia");
  const fileNameDisplay = document.getElementById("file-name");

  if (mediaInput && fileNameDisplay) {
    mediaInput.addEventListener("change", function() {
      if (this.files && this.files.length > 0) {
        fileNameDisplay.textContent = this.files[0].name;
        fileNameDisplay.style.color = "#0F172A"; // Warna teks gelap saat file dipilih
      } else {
        fileNameDisplay.textContent = "Belum ada berkas yang dipilih";
        fileNameDisplay.style.color = "#334155";
      }
    });
  }

  // 4. Pengiriman Form Booking ke WhatsApp (DIPERBAIKI MENGGUNAKAN NEW URL)
  const form = document.getElementById("serviceForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Ambil nilai dari setiap input form
      const name = document.getElementById("custName").value;
      const area = document.getElementById("custArea").value;
      const address = document.getElementById("custAddress").value;
      const device = document.getElementById("deviceType").value;
      const mode = document.getElementById("serviceMode").value;
      
      // Cek status lampiran file
      const hasMedia = mediaInput && mediaInput.files.length > 0 ? "Ya (Akan dikirim via chat berikutnya)" : "Tidak ada";

      // Menyusun teks WhatsApp secara lengkap
      const rawMessage = `Halo Amanah Service, saya ingin booking perbaikan elektronik:

*Nama:* ${name}
*Wilayah:* ${area}
*Alamat Lengkap:* ${address}
*Perangkat & Keluhan:* ${device}
*Metode Servis:* ${mode}`;

      // Cara alternatif merakit URL tanpa mengetik garis miring manual
      const linkWa = new URL("https://wa.me");
      linkWa.pathname = "6288901489107";
      linkWa.searchParams.append("text", rawMessage);
      
      // Mengirimkan hasil rakitan tautan URL ke browser
      window.open(linkWa.href, "_blank");
    });
  }
});
