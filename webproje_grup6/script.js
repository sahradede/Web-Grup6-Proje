$(document).ready(function() { // DOM hazır olduğunda kodun çalışmasını sağlar

  let allOpen = false;
  let isDark = true;

  function normalizeTurkishString(text) {
    if (typeof text !== 'string') {
      return '';
    }
    return text
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '') 
      .replace(/ı/g, 'i') 
      .replace(/İ/g, 'I') 
      .toLowerCase(); 
  }

  $('#toggleAll').click(function () {
    const action = allOpen ? 'removeClass' : 'addClass';
   
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
    const searchTerm = normalizeTurkishString($(this).val()); 
    $('.accordion-item').each(function () {
      const itemText = normalizeTurkishString($(this).text()); 
     
      $(this).toggle(itemText.indexOf(searchTerm) > -1);
    });
  });

  $('#themeToggle').click(function () {
    $('body').toggleClass('dark-theme light-theme');
    isDark = !isDark;
    $(this).text(isDark ? 'Gündüz Modu' : 'Gece Modu');
    $(this).toggleClass('btn-outline-light btn-outline-dark');
  });

}); 
