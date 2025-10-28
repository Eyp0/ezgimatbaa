// ============================================
// 1. SAYFA İÇİ NAVİGASYON (YUMUŞAK KAYDIRMA)
// ============================================
const tumLinkler = document.querySelectorAll('a[href^="#"]');

tumLinkler.forEach(link => {
    link.addEventListener('click', function(e) {
        const hedef = this.getAttribute('href');
        
        // Eğer sadece # varsa çık
        if (hedef === '#') {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const hedefId = hedef.substring(1); // # işaretini kaldır
        const hedefBolum = document.getElementById(hedefId);
        
        // Hedefe yumuşak kaydır
        if (hedefBolum) {
            hedefBolum.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ============================================
// 2. BAŞLIK ANİMASYONLARI
// ============================================
const basliklar = document.querySelectorAll('.section-title');

// Başlık görünürse animasyon başlat
const animasyonBaslat = new IntersectionObserver((liste) => {
    liste.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.remove('animate');
            void item.target.offsetWidth; // Tarayıcıyı zorla
            item.target.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

// Her başlığı izle
basliklar.forEach(baslik => animasyonBaslat.observe(baslik));

// Menü linklerine tıklandığında da animasyon yap
const menuLinkleri = document.querySelectorAll('a[href="#hizmetler"], a[href="#urunler"], a[href="#iletisim"]');

menuLinkleri.forEach(link => {
    link.addEventListener('click', function() {
        const hedefId = this.getAttribute('href').substring(1);
        const hedefBaslik = document.querySelector(`#${hedefId} .section-title`);
        
        if (hedefBaslik) {
            hedefBaslik.classList.remove('animate');
            void hedefBaslik.offsetWidth;
            hedefBaslik.classList.add('animate');
        }
    });
});


// ============================================
// 3. KATALOG VERİLERİ
// ============================================
const kataloglar = {
    erdem: Array.from({length: 176}, (_, i) => ({
        resim: `images/erdem/erdem (${i + 1}).jpg`,
        kod: `ERD-${String(i + 1).padStart(3, '0')}`
    })),
    ekonom: Array.from({length: 279}, (_, i) => ({
        resim: `images/ekonom/ekonom (${i + 1}).jpg`,
        kod: `EKO-${String(i + 1).padStart(3, '0')}`
    })),
    sunnet: Array.from({length: 119}, (_, i) => ({
        resim: `images/sunnet/sunnet (${i + 1}).jpg`,
        kod: `SUN-${String(i + 1).padStart(3, '0')}`
    })),
    butiqline: Array.from({length: 117}, (_, i) => ({
        resim: `images/butik/butik (${i + 1}).jpg`,
        kod: `BTQ-${String(i + 1).padStart(3, '0')}`
    })),
    kase: Array.from({length: 4}, (_, i) => ({
        resim: `images/kase/kase(${i + 1}).jpeg`,
        kod: `SIRDAŞ ${910 + i}`
    }))
};


// ============================================
// 4. MODAL (AÇILIR PENCERE) FONKSİYONLARI
// ============================================

// Modal aç
function modalAc(baslik, icerik) {
    const modal = document.getElementById('catalogModal');
    const modalBaslik = document.querySelector('.modal-title');
    const modalIcerik = document.querySelector('.catalog-grid');
    
    modalBaslik.textContent = baslik;
    modalIcerik.innerHTML = icerik;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Arka planı sabitle
}

// Modal kapat
function modalKapat() {
    const modal = document.getElementById('catalogModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Kaydırmayı geri aç
}

// İletişim butonları HTML'i oluştur
function iletisimButonlari() {
    return `
        <div class="modal-contact-buttons">
            <a href="https://wa.me/905324539279" class="contact-button whatsapp" target="_blank">
                <i class="fab fa-whatsapp"></i> WhatsApp'tan Yaz
            </a>
            <a href="tel:(0212) 880 37 03" class="contact-button phone">
                <i class="fas fa-phone"></i> Hemen Ara
            </a>
        </div>
    `;
}

// Özellik ikonu oluştur
function ozellikIkonu(ikon, yazi) {
    return `
        <div class="feature-item">
            <i class="fas fa-${ikon}"></i>
            <span>${yazi}</span>
        </div>
    `;
}


// ============================================
// 5. ÜRÜN MODALLARI
// ============================================

// Kartvizit modalı
function kartvizitModalGoster() {
    const icerik = `
        <div class="modal-info kartvizit-modal">
            <div class="modal-icon"><i class="fas fa-id-card"></i></div>
            <h3>Profesyonel Kartvizit Hizmeti</h3>
            <p>Size özel tasarlanmış, profesyonel kartvizitler için hemen iletişime geçin.</p>
            <div class="kartvizit-features">
                ${ozellikIkonu('palette', 'Özel Tasarım')}
                ${ozellikIkonu('print', 'Kaliteli Baskı')}
                ${ozellikIkonu('clock', 'Hızlı Teslimat')}
            </div>
            ${iletisimButonlari()}
        </div>
    `;
    modalAc('Kartvizit Tasarımı', icerik);
}

// Broşür modalı
function brosurModalGoster() {
    const icerik = `
        <div class="modal-info brosur-modal">
            <div class="modal-icon"><i class="fas fa-file-alt"></i></div>
            <h3>Profesyonel Tanıtım Materyalleri</h3>
            <p>İşletmeniz için özel tasarlanmış broşür, el ilanı ve magnet çözümleri sunuyoruz.</p>
            <div class="brosur-features">
                ${ozellikIkonu('palette', 'Özel Tasarım')}
                ${ozellikIkonu('print', 'Kaliteli Baskı')}
            </div>
            ${iletisimButonlari()}
        </div>
    `;
    modalAc('Broşür & El İlanı & Magnet', icerik);
}

// Otokopi modalı
function otokopiModalGoster() {
    const icerik = `
        <div class="modal-info otokobi-modal">
            <div class="modal-icon"><i class="fas fa-receipt"></i></div>
            <h3>Profesyonel Otokopili Makbuzları</h3>
            <p>İşletmeniz için özel tasarlanmış, resmi geçerliliği olan otokopili makbuzları sunuyoruz.</p>
            <div class="otokobi-features">
                ${ozellikIkonu('star', 'Yüksek Kalite')}
                ${ozellikIkonu('print', 'Kaliteli Baskı')}
            </div>
            ${iletisimButonlari()}
        </div>
    `;
    modalAc('Otokopili Makbuzu', icerik);
}

// Zarf modalı
function zarfModalGoster() {
    const icerik = `
        <div class="modal-info zarf-modal">
            <div class="modal-icon"><i class="fas fa-envelope-open-text"></i></div>
            <h3>Profesyonel Zarf & Antetli Kağıt</h3>
            <p>Kurumsal kimliğinizi güçlendiren, özel tasarım zarf ve antetli kağıt çözümleri sunuyoruz.</p>
            <div class="zarf-features">
                ${ozellikIkonu('star', 'Yüksek Kalite')}
                ${ozellikIkonu('print', 'Kaliteli Baskı')}
            </div>
            ${iletisimButonlari()}
        </div>
    `;
    modalAc('Zarf & Antetli Kağıt', icerik);
}


// ============================================
// 6. AKTİF MENÜ VURGULAMA
// ============================================
function menuVurgula() {
    const bolumler = document.querySelectorAll('section[id]');
    const scrollKonumu = window.pageYOffset;
    
    bolumler.forEach(bolum => {
        const bolumYuksekligi = bolum.offsetHeight;
        const bolumBaslangici = bolum.offsetTop - 100;
        const bolumId = bolum.getAttribute('id');
        
        // Eğer bu bölümdeyiz
        if (scrollKonumu > bolumBaslangici && scrollKonumu <= bolumBaslangici + bolumYuksekligi) {
            // Tüm menü linklerinden active sınıfını kaldır
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.remove('active');
            });
            
            // Sadece bu bölümün linkine active ekle
            const aktifLink = document.querySelector(`.nav-links a[href="#${bolumId}"]`);
            if (aktifLink) {
                aktifLink.classList.add('active');
            }
        }
    });
}


// ============================================
// 7. SAYFA YÜKLENDİĞİNDE ÇALIŞACAKLAR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Modal elementlerini al
    const modal = document.getElementById('catalogModal');
    const katalogAlani = document.querySelector('.catalog-grid');
    const modalBaslik = document.querySelector('.modal-title');

    // Katalog butonlarına tıklama olayı ekle
    const katalogButonlari = document.querySelectorAll('.catalog-trigger');
    
    katalogButonlari.forEach(buton => {
        // Sadece link (A) elementlerine işlem yap
        if (buton.tagName === 'A') {
            buton.addEventListener('click', function(e) {
                e.preventDefault(); // Sayfanın başa dönmesini engelle
                
                // Hangi katalog?
                const hangiKatalog = this.dataset.catalog;
                const urunListesi = kataloglar[hangiKatalog];
                
                // Ürün kartının başlığını al
                const baslik = this.closest('.product-card').querySelector('h3').textContent;
                
                // Modal başlığını ayarla
                if (hangiKatalog === 'kase') {
                    modalBaslik.textContent = `${baslik} Detayları`;
                } else {
                    modalBaslik.textContent = `${baslik} Kataloğu`;
                }
                
                // Katalog alanını temizle
                katalogAlani.innerHTML = '';
                
                // Ürünler varsa göster
                if (urunListesi && urunListesi.length > 0) {
                    urunListesi.forEach(urun => {
                        katalogAlani.innerHTML += `
                            <div class="catalog-item">
                                <img src="${urun.resim}" alt="${urun.kod}">
                                <div class="overlay">${urun.kod}</div>
                            </div>
                        `;
                    });
                } else {
                    katalogAlani.innerHTML = '<p>Bu kategoride henüz ürün bulunmamaktadır.</p>';
                }
                
                // Modalı göster
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Modal kapatma butonuna tıklama
    const kapatButonu = document.querySelector('.close-modal');
    kapatButonu.addEventListener('click', modalKapat);

    // Modal dışına tıklanırsa kapat
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modalKapat();
        }
    });

    // ESC tuşuna basılırsa kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modalKapat();
        }
    });

    // Scroll olayını dinle ve menüyü vurgula
    window.addEventListener('scroll', menuVurgula);
    
    // Sayfa yüklendiğinde bir kez çalıştır
    menuVurgula();
});
