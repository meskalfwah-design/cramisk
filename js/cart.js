/* ============================================
   CARAMISC - Shared Cart (localStorage)
   ============================================ */

const CART_KEY = 'caramisc_cart_v1';

const ALL_PRODUCTS = [
    // Products
    { id:1, name:"كيك كراميل كلاسيكي", origin:"طبقات إسفنجية بصوص الكراميل", price:85, category:"cake", emoji:"🍰", img:"classic.jpg", desc:"كيك إسفنجي فانيلا مغطى بكريمة الزبدة بالكراميل ومزين بالجوز. نكهة غنية ومتوازنة.", gift:false },
    { id:2, name:"تشيز كيك الكراميل", origin:"تشيز كيك بارد بصوص الكراميل", price:95, category:"cheesecake", emoji:"🧀", img:"cheese.jpg", desc:"قاعدة بسكويت مع حشوة جبن كريمي غنية وطبقة كراميل مملح.", gift:false },
    { id:3, name:"براوني الكراميل", origin:"براوني شوكولاتة بصوص الكراميل", price:75, category:"cake", emoji:"🍫", img:"brownie.jpg", desc:"براوني شوكولاتة داكنة مع عروق كراميل لزجة ورشة ملح بحري.", gift:false },
    { id:4, name:"تارت الكراميل بالتمر", origin:"تارت كراميل فانيلا طرابلسي", price:70, category:"cake", emoji:"🥧", img:"tart.jpg", desc:"تارت محشو بكريمة التمر والكراميل مع طبقة كراميل مقرمشة.", gift:false },
    { id:5, name:"كب كيك الكراميل (6)", origin:"6 حبات كب كيك محشية", price:60, category:"cake", emoji:"🧁", img:"cupcake.jpg", desc:"كب كيك فانيلا طري محشو بصوص الكراميل ومغطى بكريمة ذهبية.", gift:false },
    { id:6, name:"حلويات مشكلة", origin:"تشكيلة منوعة من حلويات الكراميل", price:120, category:"special", emoji:"🍬", img:"mixed.jpg", desc:"طبق يضم قطعاً مختارة من أشهر حلوياتنا: كيك، براوني، تارت، وكب كيك.", gift:false },
    { id:7, name:"مالفي زمان", origin:"كيكة مالفي كراميل تقليدية", price:90, category:"special", emoji:"🥮", img:"malvi.jpg", desc:"وصفة قديمة من المطبخ الليبي: كيكة مالفي محشوة بصوص الكراميل والمكسرات.", gift:false },
    { id:8, name:"تورتة زمان", origin:"تورتة كراميل فاخرة", price:150, category:"special", emoji:"🎂", img:"torta.jpg", desc:"تورتة كبيرة متعددة الطبقات بكريمة الكراميل والجوز، مثالية للمناسبات.", gift:true },
    { id:9, name:"طبق كيك الكراميل المشكل", origin:"مجموعة تذوق – 4 أنواع", price:180, category:"gift", emoji:"🎁", img:"sampler.jpg", desc:"شرائح متنوعة من جميع كيكات الكراميل لدينا. مثالي للهدايا.", gift:true },
    // New arrivals
    { id:101, name:"كيك كراميل بالفستق", origin:"فستق حلبي مُحمص مع كراميل ذهبي", price:110, category:"cake", emoji:"🥜", img:"pistachio.jpg", desc:"طبقات إسفنجية فانيلا مع كريمة كراميل غنية ومكسرات فستق حلبي محمصة يدوياً.", isNew:true },
    { id:102, name:"تشيز كيك التوت البري", origin:"توت بري طازج مع صوص الكراميل", price:105, category:"cheesecake", emoji:"🫐", img:"berry.jpg", desc:"تشيز كيك كريمي مع طبقة توت بري طازج وصوص كراميل مملح، مزيج مثالي من الحموضة والحلاوة.", isNew:true },
    { id:103, name:"كيك التمر باللوز", origin:"تمر مجهول + لوز محمص", price:95, category:"cake", emoji:"🌴", img:"dates.jpg", desc:"كيك غني بالتمر المجهول الطرابلسي مع قطع اللوز المحمص وصوص الكراميل.", isNew:true },
    { id:104, name:"سوفتي كراميل", origin:"كيك اسفنجي طري بالكراميل", price:80, category:"cake", emoji:"🍮", img:"softy.jpg", desc:"كيك اسفنجي فائق الطراوة مغموس بصوص الكراميل الدافئ، يذوب في الفم.", isNew:true }
];

const ALL_GIFTS = [
    { id:"g1", name:"صندوق تذوق الكراميل", desc:"4 قطع مختارة", price:99, emoji:"🎀", img:"box4.jpg" },
    { id:"g2", name:"صندوق الهدايا الفاخر", desc:"8 قطع مع تغليف ذهبي", price:180, emoji:"💝", img:"box8.jpg" },
    { id:"g3", name:"صندوق المناسبات", desc:"12 قطعة + نقش الاسم", price:280, emoji:"👑", img:"box12.jpg" }
];

let cart = [];

function loadCart() {
    try {
        const saved = localStorage.getItem(CART_KEY);
        if (saved) cart = JSON.parse(saved);
    } catch(e) { cart = []; }
}

function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch(e) {}
}

function getCart() { return cart; }

function findProduct(pid) {
    return ALL_PRODUCTS.find(p => p.id === pid);
}

function findGift(gid) {
    return ALL_GIFTS.find(g => g.id === gid);
}

function addToCart(productId, qty) {
    qty = qty || 1;
    var product = findProduct(productId);
    if (!product) return;
    var existing = cart.find(function(item) { return item.id === productId; });
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty: qty, product: product });
    saveCart();
    updateCartUI();
    showToast('✓ تمت الإضافة');
}

function addGiftToCart(giftId) {
    var gift = findGift(giftId);
    if (!gift) return;
    var existing = cart.find(function(item) { return item.giftId === giftId; });
    if (existing) existing.qty++;
    else cart.push({ giftId: giftId, qty: 1, product: { name: gift.name, price: gift.price, emoji: gift.emoji, origin: 'هدية', image: null } });
    saveCart();
    updateCartUI();
    showToast('✓ تمت الإضافة');
}

function updateQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart();
    updateCartUI();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function getCartTotal() {
    return cart.reduce(function(s, i) { return s + (i.product.price * i.qty); }, 0);
}

function getCartCount() {
    return cart.reduce(function(s, i) { return s + i.qty; }, 0);
}

function updateCartUI() {
    var countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = getCartCount();
    var itemsList = document.getElementById('cartItemsList');
    var totalEl = document.getElementById('cartTotal');
    if (!itemsList) return;
    if (cart.length === 0) {
        itemsList.innerHTML = '<div class="empty-cart-msg"><div style="font-size:3rem;margin-bottom:8px;">🧁</div><p>السلة فارغة</p></div>';
    } else {
        itemsList.innerHTML = cart.map(function(item, idx) {
            var thumb = item.product.img
                ? '<img src="images/' + item.product.img + '" alt="" loading="lazy">'
                : (item.product.emoji || '🎁');
            return '<div class="cart-item-row">' +
                '<div class="cart-item-thumb">' + thumb + '</div>' +
                '<div class="cart-item-info">' +
                    '<div class="name">' + item.product.name + '</div>' +
                    '<div class="meta">' + (item.product.origin || '') + '</div>' +
                    '<div class="price">' + item.product.price + ' د.ل × ' + item.qty + '</div>' +
                    '<div class="qty-controls">' +
                        '<button class="qty-btn" data-qidx="' + idx + '" data-delta="-1">−</button>' +
                        '<span style="font-weight:600;min-width:24px;text-align:center;">' + item.qty + '</span>' +
                        '<button class="qty-btn" data-qidx="' + idx + '" data-delta="1">+</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        document.querySelectorAll('.qty-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var idx = parseInt(btn.dataset.qidx);
                var delta = parseInt(btn.dataset.delta);
                updateQty(idx, delta);
            });
        });
    }
    if (totalEl) totalEl.textContent = getCartTotal() + ' د.ل';
}

function sendWhatsAppOrder() {
    if (cart.length === 0) { showToast('السلة فارغة'); return; }
    var msg = 'مرحباً CARAMISC، أود طلب:\n\n';
    var total = 0;
    cart.forEach(function(item) {
        msg += '• ' + item.product.name + ' (×' + item.qty + ') - ' + (item.product.price * item.qty) + ' د.ل\n';
        total += item.product.price * item.qty;
    });
    msg += '\nالمجموع: ' + total + ' دينار ليبي\n';
    msg += 'الرجاء التأكيد والتوصيل إلى: (يرجى كتابة عنوانك)';
    window.open('https://wa.me/218917021437?text=' + encodeURIComponent(msg), '_blank');
}

// ============ Toast ============
var toastTimer;
function showToast(msg) {
    var toast = document.getElementById('toastMsg');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
        toast.classList.remove('show');
    }, 2000);
}

// ============ Scroll Lock ============
var scrollY = 0;
function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
}
function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
}

// ============ Cart Drawer ============
function openCart() {
    updateCartUI();
    document.getElementById('cartOverlay').classList.add('active');
    document.getElementById('cartDrawer').classList.add('open');
    lockScroll();
}
function closeCart() {
    document.getElementById('cartOverlay').classList.remove('active');
    document.getElementById('cartDrawer').classList.remove('open');
    unlockScroll();
}

// ============ PDP ============
var currentProduct = null;
var currentQty = 1;

function openPdp(productId) {
    var product = findProduct(productId);
    if (!product) return;
    currentProduct = product;
    currentQty = 1;

    var pdpImage = document.getElementById('pdpImage');
    var pdpName = document.getElementById('pdpName');
    var pdpOrigin = document.getElementById('pdpOrigin');
    var pdpPrice = document.getElementById('pdpPrice');
    var pdpDesc = document.getElementById('pdpDesc');
    var pdpQty = document.getElementById('pdpQty');
    var pdpOverlay = document.getElementById('pdpOverlay');

    if (product.img) {
        pdpImage.innerHTML = '<img src="images/' + product.img + '" alt="' + product.name + '" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">';
    } else {
        pdpImage.innerHTML = '<span class="product-emoji" style="font-size:6rem;">' + product.emoji + '</span>';
    }
    pdpName.textContent = product.name;
    pdpOrigin.textContent = product.origin;
    pdpPrice.textContent = product.price + ' د.ل';
    pdpDesc.textContent = product.desc || '';
    pdpQty.textContent = '1';
    pdpOverlay.classList.add('active');
    lockScroll();
}

function closePdp() {
    document.getElementById('pdpOverlay').classList.remove('active');
    unlockScroll();
}

// ============ Init ============
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartUI();

    // Navbar scroll
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 25);
        }, { passive: true });
    }

    // Menu
    var menuToggle = document.getElementById('menuToggle');
    var navMenu = document.getElementById('navMenu');
    var menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
        navMenu.classList.add('open');
        menuOverlay.classList.add('show');
        menuToggle.textContent = '✕';
        menuToggle.setAttribute('aria-label', 'إغلاق القائمة');
        lockScroll();
    }
    function closeMenuFn() {
        navMenu.classList.remove('open');
        menuOverlay.classList.remove('show');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-label', 'فتح القائمة');
        unlockScroll();
    }
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (navMenu.classList.contains('open')) closeMenuFn();
            else openMenu();
        });
    }
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenuFn);
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.addEventListener('click', closeMenuFn);
    });

    // Cart
    var navCartIcon = document.getElementById('navCartIcon');
    var cartOverlay = document.getElementById('cartOverlay');
    var cartCloseBtn = document.getElementById('cartCloseBtn');
    var whatsappOrderBtn = document.getElementById('whatsappOrderBtn');

    if (navCartIcon) navCartIcon.addEventListener('click', openCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (whatsappOrderBtn) whatsappOrderBtn.addEventListener('click', sendWhatsAppOrder);

    // PDP
    var pdpCloseBtn = document.getElementById('pdpCloseBtn');
    var pdpOverlay = document.getElementById('pdpOverlay');
    var pdpMinus = document.getElementById('pdpMinus');
    var pdpPlus = document.getElementById('pdpPlus');
    var pdpAddBtn = document.getElementById('pdpAddBtn');

    if (pdpCloseBtn) pdpCloseBtn.addEventListener('click', closePdp);
    if (pdpOverlay) pdpOverlay.addEventListener('click', function(e) {
        if (e.target === pdpOverlay) closePdp();
    });
    if (pdpMinus) pdpMinus.addEventListener('click', function() {
        if (currentQty > 1) { currentQty--; document.getElementById('pdpQty').textContent = currentQty; }
    });
    if (pdpPlus) pdpPlus.addEventListener('click', function() {
        currentQty++; document.getElementById('pdpQty').textContent = currentQty;
    });
    if (pdpAddBtn) pdpAddBtn.addEventListener('click', function() {
        if (currentProduct) {
            addToCart(currentProduct.id, currentQty);
            closePdp();
        }
    });

    // Swipe to close PDP
    var pdpBox = document.querySelector('.pdp-box');
    var pdpTouchStartY = 0;
    if (pdpBox && pdpOverlay) {
        pdpBox.addEventListener('touchstart', function(e) {
            pdpTouchStartY = e.touches[0].clientY;
        }, { passive: true });
        pdpBox.addEventListener('touchmove', function(e) {
            var diff = e.touches[0].clientY - pdpTouchStartY;
            if (diff > 80 && pdpBox.scrollTop <= 0) {
                closePdp();
            }
        }, { passive: true });
    }

    // Reveal animations
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) {
        revealObserver.observe(el);
    });
});
