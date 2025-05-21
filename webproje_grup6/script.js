$(document).ready(function() { // DOM hazır olduğunda kodun çalışmasını sağlar

  let allOpen = false;
  let isDark = true;

  /**
   * Metindeki özel karakterleri (aksanlar vb.) temel karakterlere dönüştürür,
   * Türkçe'ye özgü 'ı' harfini 'i' ye çevirir ve metni küçük harfe dönüştürür.
   * @param {string} text Normalleştirilecek metin.
   * @returns {string} Normalleştirilmiş metin.
   */
  function normalizeTurkishString(text) {
    if (typeof text !== 'string') {
      return '';
    }
    return text
      .normalize('NFD') // Aksanları ayır (ör: "â" -> "a" + "  GEREKTİRMEYEN BİRLEŞTİRİCİ SİRKUMFLEKS")
      .replace(/[\u0300-\u036f]/g, '') // Unicode aksan işaretlerini kaldır
      .replace(/ı/g, 'i') // Küçük 'ı' harfini 'i' yap
      .replace(/İ/g, 'I') // Büyük 'İ' harfini 'I' yap (arama büyük/küçük harf duyarlı olacaksa bu da önemli)
      .toLowerCase(); // Tüm metni küçük harfe çevir
  }

  $('#toggleAll').click(function () {
    const action = allOpen ? 'removeClass' : 'addClass';
    // Bootstrap 5'te 'show' sınıfı doğrudan .accordion-collapse üzerinde çalışır.
    $('.accordion-collapse').each(function() {
      const collapseElement = bootstrap.Collapse.getInstance(this) || new bootstrap.Collapse(this, { toggle: false });
      if (allOpen) {
        collapseElement.hide();
      } else {
        collapseElement.show();
      }
    });
    // Butonların 'collapsed' sınıfını güncelle
    $('.accordion-button').toggleClass('collapsed', allOpen);
    $(this).text(allOpen ? 'Hepsini Aç' : 'Hepsini Kapat');
    allOpen = !allOpen;
  });

  $('#searchInput').on('input', function () {
    const searchTerm = normalizeTurkishString($(this).val()); // Arama terimini normalleştir
    $('.accordion-item').each(function () {
      const itemText = normalizeTurkishString($(this).text()); // SSS metnini normalleştir
      // Eğer normalleştirilmiş SSS metni, normalleştirilmiş arama terimini içeriyorsa göster, değilse gizle.
      $(this).toggle(itemText.indexOf(searchTerm) > -1);
    });
  });

  $('#themeToggle').click(function () {
    $('body').toggleClass('dark-theme light-theme');
    isDark = !isDark;
    $(this).text(isDark ? 'Gündüz Modu' : 'Gece Modu');
    $(this).toggleClass('btn-outline-light btn-outline-dark');
  });

}); // document.ready sonu