/* ═══════════════════════════════════════════════════════════
   logger.js — سجل النشاطات الشامل (مستقل عبر REST API)
   يغطي كل إجراءات لوحة الإدارة
   ═══════════════════════════════════════════════════════════ */

console.log('📦 logger.js بدأ التحميل');

/* ─── الحصول على رابط Firebase ─── */
function getDbUrl() {
  try {
    var b = window.STORE_BOOTSTRAP;
    if (!b || !b.firebaseConfig) return null;
    var c = b.firebaseConfig;
    if (c.databaseURL) return c.databaseURL.replace(/\/$/, '');
    if (c.projectId) return 'https://' + c.projectId + '-default-rtdb.firebaseio.com';
    return null;
  } catch (e) { return null; }
}

/* ─── التحقق من تفعيل الميزة ─── */
function isActivityLogEnabled() {
  try {
    if (window.storeFeatures && window.storeFeatures.activityLog === false) return false;
    return true;
  } catch (e) { return true; }
}

/* ─── الكتابة ─── */
window.logActivity = function(action, target, changesOrDetails, order) {
  /* ✅ إذا كانت الميزة معطّلة → لا ترفع شيئاً نهائياً */
  if (!isActivityLogEnabled()) return;

  var url = getDbUrl();
  if (!url) { console.warn('❌ logger: databaseURL مفقود'); return; }
  try {
    var data = {
      user: localStorage.getItem("user") || "?",
      role: localStorage.getItem("role") || "seller",
      action: action,
      target: String(target || '').substring(0, 120),
      timestamp: Date.now()
    };
    if (Array.isArray(changesOrDetails)) {
      if (changesOrDetails.length) data.changes = changesOrDetails;
    } else if (typeof changesOrDetails === 'string' && changesOrDetails) {
      data.details = String(changesOrDetails).substring(0, 250);
    }

    /* ✅ payload wrapper:
       - legacy: order object مباشر (order_confirm)
       - جديد: { __p:true, order, product, bulkInfo, orderKey, orderType, productId }
    */
    if (order && typeof order === 'object') {
      if (order.__p === true) {
        Object.keys(order).forEach(function(k) {
          if (k === '__p') return;
          data[k] = order[k];
        });
      } else {
        data.order = order;
      }
    }

    fetch(url + '/activity_log.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); console.log('✅', action, target); })
    .catch(function(e) { console.error('❌ فشل:', e); });
  } catch (e) { console.error('❌ logActivity:', e); }
};

/* ─── أدوات مساعدة ─── */
var $g = function(id) { var el = document.getElementById(id); return el ? el.value : ''; };
var $c = function(id) { var el = document.getElementById(id); return el ? el.checked : false; };

/* ═══════════════ 1. المنتجات ═══════════════ */

/* ✅ حذف منتج — يحفظ نسخة كاملة من المنتج */
document.addEventListener('click', function(e) {
  var b = e.target.closest('.btn-delete');
  if (!b) return;
  var p = (window.allProducts || {})[b.dataset.id];
  if (p) {
    window.logActivity('product_delete', p.name, '', {
      __p: true,
      product: p,
      productId: b.dataset.id
    });
  }
}, true);

/* إظهار منتج */
document.addEventListener('click', function(e) {
  var b = e.target.closest('.btn-show');
  if (!b) return;
  var p = (window.allProducts || {})[b.dataset.showId];
  if (p) window.logActivity('product_show', p.name);
}, true);

/* إضافة/تعديل منتج */
document.addEventListener('submit', function(e) {
  if (!e.target || e.target.id !== 'productForm') return;
  var id = $g('editId'), name = $g('name').trim();
  var price = $g('price'), sq = $g('stockQuantity'), cp = $g('costPrice');
  var wp = $g('wholesalePrice'), qb = $g('quantityPerBox');
  var fam = $g('familySelect');
  var imgFile = document.getElementById('imageFile');
  var camFile = document.getElementById('cameraInput');
  var imgChanged = (imgFile && imgFile.files[0]) || (camFile && camFile.files[0]);

  if (id) {
    var ex = (window.allProducts || {})[id];
    if (ex) {
      var ch = [];
      if ((ex.name||'') !== name) ch.push({ field:'الاسم', from: ex.name||'—', to: name });
      if (Number(ex.price||0) !== Number(price||0)) ch.push({ field:'سعر البيع', from:String(ex.price||0), to:String(price||0) });
      if (Number(ex.costPrice||0) !== Number(cp||0)) ch.push({ field:'ثمن الشراء', from:String(ex.costPrice||0), to:String(cp||0) });
      if (Number(ex.stockQuantity||0) !== Number(sq||0)) ch.push({ field:'الكمية', from:String(ex.stockQuantity||0), to:String(sq||0) });
      if (Number(ex.wholesalePrice||0) !== Number(wp||0)) ch.push({ field:'سعر الجملة', from:String(ex.wholesalePrice||0), to:String(wp||0) });
      if (Number(ex.quantityPerBox||0) !== Number(qb||0)) ch.push({ field:'الكمية في العلبة', from:String(ex.quantityPerBox||0), to:String(qb||0) });
      if ((ex.family||'') !== (fam||'')) ch.push({ field:'العائلة', from: ex.family||'بدون', to: fam||'بدون' });
      if (imgChanged) ch.push({ field:'الصورة', from:'قديمة', to:'جديدة' });
      if (ch.length) {
        var only = ch.length === 1 && ch[0].field === 'الكمية';
        window.logActivity(only ? 'product_stock' : 'product_edit', name, ch);
      }
    }
  } else {
    if (name) window.logActivity('product_add', name, [
      { field:'سعر البيع', from:'—', to:String(price||0) },
      { field:'العائلة', from:'—', to: fam || 'بدون' }
    ]);
  }
}, true);

/* إضافة عائلة */
document.addEventListener('click', function(e) {
  if (!e.target.closest('#addFamilyBtn')) return;
  var btn = e.target.closest('#addFamilyBtn');
  var inp = document.getElementById('newFamilyInput');
  if (inp && inp.style.display === 'block' && inp.value.trim()) {
    setTimeout(function() {
      var v = inp.value.trim();
      if (v) window.logActivity('family_add', v);
    }, 100);
  }
}, true);

/* تعديل/حذف عائلة */
document.addEventListener('click', function(e) {
  var eb = e.target.closest('.family-action-btn.edit-btn');
  var db = e.target.closest('.family-action-btn.delete-btn');
  if (eb) {
    var oldName = eb.parentElement.parentElement.querySelector('.filter-btn').textContent.trim().split(' ').slice(1).join(' ').trim();
    setTimeout(function() {
      var el = eb.parentElement.parentElement.querySelector('.filter-btn');
      var newName = el ? el.textContent.trim().split(' ').slice(1).join(' ').trim() : '';
      if (oldName && newName && oldName !== newName) {
        window.logActivity('family_edit', oldName, [{ field:'الاسم', from: oldName, to: newName }]);
      }
    }, 200);
  }
  if (db) {
    var w = db.parentElement.parentElement;
    var fname = w ? w.querySelector('.filter-btn').textContent.trim().split(' ').slice(1).join(' ').trim() : '';
    if (fname) setTimeout(function() { window.logActivity('family_delete', fname); }, 200);
  }
}, true);

/* ═══════════════ 2. التخفيضات ═══════════════ */
document.addEventListener('click', function(e) {
  if (e.target.closest('#saveDiscountBtn')) {
    var id = $g('discountProductId'), np = $g('discountNewPrice');
    var unlimited = $c('discountUnlimited');
    setTimeout(function() {
      var p = (window.allProducts || {})[id];
      if (p) window.logActivity('discount_add', p.name, [
        { field:'السعر الجديد', from:'—', to:String(np) },
        { field:'النوع', from:'—', to: unlimited ? 'دائم' : 'مؤقت' }
      ]);
    }, 1500);
  }
  if (e.target.closest('#removeDiscountBtn')) {
    var id2 = $g('discountProductId');
    var p2 = (window.allProducts || {})[id2];
    if (p2) window.logActivity('discount_remove', p2.name);
  }
}, true);

/* ═══════════════ 3. الترويج ═══════════════ */
document.addEventListener('click', function(e) {
  if (!e.target.closest('#saveLandingBtn')) return;
  var id = $g('landingEditProductId');
  if (!id) return;
  var p = (window.allProducts || {})[id];
  if (!p) return;
  var en = $c('landingEnabled');
  var was = p.landing && p.landing.enabled === true;
  var ch = [];

  if (en !== was) ch.push({ field:'حالة الترويج', from: was?'مفعّل':'متوقف', to: en?'مفعّل':'متوقف' });

  var themeEl = document.querySelector('input[name="pageTheme"]:checked');
  var theme = themeEl ? themeEl.value : 'default';
  var oldTheme = p.landing && p.landing.theme || 'default';
  if (theme !== oldTheme) ch.push({ field:'الستايل', from: oldTheme, to: theme });

  var oldName = p.landing && p.landing.pageName || '';
  var newName = $g('landingPageName');
  if (oldName !== newName) ch.push({ field:'اسم الصفحة', from: oldName || '—', to: newName || '—' });

  var oldPName = p.landing && p.landing.productName || '';
  var newPName = $g('landingProductName');
  if (oldPName !== newPName) ch.push({ field:'اسم المنتج', from: oldPName || '—', to: newPName || '—' });

  var oldPrice = p.landing && p.landing.price || '';
  var newPrice = $g('landingPrice');
  if (String(oldPrice) !== String(newPrice)) ch.push({ field:'السعر الخاص', from: oldPrice || '—', to: newPrice || '—' });

  var oldDesc = p.landing && p.landing.description || '';
  var newDesc = $g('landingDescription');
  if (oldDesc !== newDesc) ch.push({ field:'الوصف', from:'قديم', to:'محدّث' });

  var oldLogo = p.landing && p.landing.logo ? 'موجود' : 'بدون';
  var newLogo = window.currentLandingLogo || document.getElementById('landingLogoPreview')?.src || '';
  var newLogoStatus = newLogo ? 'موجود' : 'بدون';
  if (oldLogo !== newLogoStatus) ch.push({ field:'شعار الصفحة', from: oldLogo, to: newLogoStatus });

  var oldBundle = p.landing && p.landing.bundle && p.landing.bundle.enabled ? 'مفعّل' : 'متوقف';
  var newBundle = $c('landingBundleEnabled') ? 'مفعّل' : 'متوقف';
  if (oldBundle !== newBundle) ch.push({ field:'عروض الكمية', from: oldBundle, to: newBundle });

  var oldFree = p.landing && p.landing.bundle && p.landing.bundle.freeShipping && p.landing.bundle.freeShipping.enabled ? 'مفعّل' : 'متوقف';
  var newFree = $c('landingFreeShippingEnabled') ? 'مفعّل' : 'متوقف';
  if (oldFree !== newFree) ch.push({ field:'التوصيل المجاني', from: oldFree, to: newFree });

  var oldRV = p.landing && p.landing.showReviews !== false ? 'مرئي' : 'مخفي';
  var newRV = $c('landingShowReviews') ? 'مرئي' : 'مخفي';
  if (oldRV !== newRV) ch.push({ field:'التقييمات', from: oldRV, to: newRV });

  var oldVV = p.landing && p.landing.showVisitors !== false ? 'مرئي' : 'مخفي';
  var newVV = $c('landingShowVisitors') ? 'مرئي' : 'مخفي';
  if (oldVV !== newVV) ch.push({ field:'عداد الزوار', from: oldVV, to: newVV });

  var oldFP = p.landing && p.landing.pixelId || '';
  var newFP = $g('landingItemPixel');
  if (oldFP !== newFP) ch.push({ field:'FB Pixel', from: oldFP || '—', to: newFP || '—' });

  var oldTP = p.landing && p.landing.tiktokPixelId || '';
  var newTP = $g('landingItemTiktokPixel');
  if (oldTP !== newTP) ch.push({ field:'TikTok Pixel', from: oldTP || '—', to: newTP || '—' });

  if (ch.length) {
    window.logActivity(en !== was && ch.length === 1 ? (en ? 'promote_on' : 'promote_off') : 'promote_edit', p.name, ch);
  }
}, true);

/* ═══════════════ 4. الطلبات ═══════════════ */

/* تأكيد طلب */
document.addEventListener('click', function(e) {
  var b = e.target.closest('[data-act="confirm"]');
  if (!b) return;
  var c = document.getElementById('orderDetailContent');
  if (!c) return;
  var txt = c.textContent || '';
  var mC = txt.match(/العميل:\s*([^\n]+?)(?:\s+الهاتف:|$)/);
  var mP = txt.match(/الهاتف:\s*([^\n]+?)(?:\s+العنوان:|$)/);
  var mT = txt.match(/الإجمالي:\s*([\d,\.]+)/);
  var cn = mC ? mC[1].trim() : '';
  var ph = mP ? mP[1].trim() : '';
  var t = mT ? Number(mT[1].replace(/,/g,'')) : 0;
  setTimeout(function() {
    window.logActivity('order_confirm', cn, '', { customerName: cn, phone: ph, total: t });
  }, 2200);
}, true);

/* ✅ حذف طلب — يحفظ نسخة كاملة من الطلب (من window.__orderForDeletion)
   التي يتم تعيينها بواسطة admin.html عند فتح تفاصيل الطلب. */
document.addEventListener('click', function(e) {
  var b = e.target.closest('[data-act]');
  if (!b) return;
  var a = b.dataset.act;
  if (a !== 'del-wa' && a !== 'del-conf') return;

  /* نسخة كاملة من الطلب */
  var fullOrder = window.__orderForDeletion;
  var orderKey = window.__orderForDeletionKey;

  /* احتياطي: إذا لم تكن متوفرة → قراءة بسيطة من DOM */
  if (!fullOrder) {
    var c = document.getElementById('orderDetailContent');
    var name = '';
    if (c) {
      var m = c.textContent.match(/العميل:\s*([^\n]+?)(?:\s+الهاتف:|$)/);
      if (m) name = m[1].trim();
    }
    setTimeout(function() { window.logActivity('order_delete', name); }, 200);
    return;
  }

  setTimeout(function() {
    window.logActivity('order_delete', fullOrder.customerName || '', '', {
      __p: true,
      order: fullOrder,
      orderKey: orderKey || null,
      orderType: a === 'del-wa' ? 'whatsapp' : 'confirmed'
    });
    /* نظّف الذاكرة */
    delete window.__orderForDeletion;
    delete window.__orderForDeletionKey;
  }, 200);
}, true);

/* ✅ حذف جميع الطلبات المؤكدة — يحفظ ملخص العملية */
document.addEventListener('click', function(e) {
  if (e.target.closest('#deleteAllConfirmedBtn')) {
    setTimeout(function() {
      window.logActivity('orders_delete_all', '', '', {
        __p: true,
        bulkInfo: {
          type: 'orders',
          label: 'حذف جميع الطلبات المؤكدة'
        }
      });
    }, 300);
  }
}, true);

/* ═══════════════ 5. التقييمات ═══════════════ */
document.addEventListener('click', function(e) {
  var b = e.target.closest('[data-del-review]');
  if (b) setTimeout(function() { window.logActivity('review_delete', b.dataset.delProduct || ''); }, 100);
}, true);

/* ═══════════════ 6. الإعدادات ═══════════════ */
document.addEventListener('click', function(e) {
  if (e.target.closest('#saveStoreSettingsBtn')) {
    var ch = [
      { field:'الاسم', from:'—', to: $g('setStoreName') },
      { field:'العملة', from:'—', to: $g('setCurrency') }
    ];
    setTimeout(function() { window.logActivity('settings_general', $g('setStoreName'), ch); }, 1000);
  }
  if (e.target.closest('#saveLandingSettingsBtn')) window.logActivity('settings_landing', 'الشريط الإعلاني');
  if (e.target.closest('#savePoliciesBtn')) window.logActivity('settings_policies', 'السياسات');
  if (e.target.closest('#savePixelsBtn')) {
    var ch2 = [];
    if ($c('pixelEnableFB')) ch2.push({ field:'Facebook', from:'—', to: $g('pixelFBId') });
    if ($c('pixelEnableTT')) ch2.push({ field:'TikTok', from:'—', to: $g('pixelTTId') });
    window.logActivity('settings_pixels', '', ch2);
  }
}, true);

/* الغلاف */
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'coverFileInput2' && e.target.files[0]) {
    window.logActivity('settings_cover', '', 'تحديث الغلاف');
  }
}, true);
document.addEventListener('click', function(e) {
  if (e.target.closest('#btnCoverRemove')) setTimeout(function() { window.logActivity('settings_cover', '', 'حذف الغلاف'); }, 300);
}, true);

/* الميزات on/off */
document.addEventListener('change', function(e) {
  if (e.target && e.target.dataset && e.target.dataset.feat) {
    window.logActivity('settings_features', e.target.dataset.feat,
      [{ field:'الحالة', from:'—', to: e.target.checked ? 'مفعّل' : 'متوقف' }]);
  }
}, true);

/* المستخدمون */
document.addEventListener('click', function(e) {
  if (e.target.closest('#addUserBtn')) {
    var nu = $g('newUserName'), isA = $c('isAdminCheck');
    if (nu) setTimeout(function() {
      window.logActivity('user_add', nu, [{ field:'الدور', from:'—', to: isA ? 'مدير' : 'بائع' }]);
    }, 300);
  }
  var ub = e.target.closest('[data-user]');
  if (ub) setTimeout(function() { window.logActivity('user_delete', ub.dataset.user, ub.dataset.role); }, 100);
}, true);

/* المالك */
document.addEventListener('click', function(e) {
  if (e.target.closest('#saveOwnerBtn')) {
    var nn = $g('newOwnerName');
    if (nn) window.logActivity('owner_change', nn);
  }
}, true);

/* رمز الجملة */
document.addEventListener('click', function(e) {
  if (e.target.closest('#saveWholesaleCodeBtn')) {
    window.logActivity('wholesale_code', '', [{ field:'رمز جديد', from:'—', to: $g('wholesaleCodeInput') }]);
  }
}, true);

/* Excel */
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'excelFileInput' && e.target.files[0]) {
    setTimeout(function() { window.logActivity('excel_import', e.target.files[0]?.name || ''); }, 8000);
  }
}, true);

/* ✅ حذف كل المنتجات — يحفظ ملخص العملية مع عدد المنتجات */
document.addEventListener('click', function(e) {
  if (e.target.closest('#btnDeleteAllProducts')) {
    setTimeout(function() {
      var count = Object.keys(window.allProducts || {}).length;
      window.logActivity('products_delete_all', '', '', {
        __p: true,
        bulkInfo: {
          type: 'products',
          count: count,
          label: 'حذف كل المنتجات'
        }
      });
    }, 300);
  }
}, true);

/* ═══════════════ 7. مناطق الشحن ═══════════════ */
document.addEventListener('click', function(e) {
  if (e.target.closest('#saveZoneBtn')) {
    var zid = $g('zoneEditId'), zn = $g('zoneName');
    var hp = $g('zoneHomePrice'), dp = $g('zoneDeskPrice');
    var ch = [
      { field:'المنزل', from:'—', to: hp },
      { field:'المكتب', from:'—', to: dp }
    ];
    if (zid) {
      var old = null;
      try {
        old = (window.shippingZones || []).find(function(z) { return z.id === zid; });
      } catch (er) {}
      if (old) {
        var ch2 = [];
        if ((old.name||'') !== zn) ch2.push({ field:'الاسم', from: old.name, to: zn });
        if (Number(old.homePrice||0) !== Number(hp||0)) ch2.push({ field:'المنزل', from: String(old.homePrice||0), to: String(hp||0) });
        if (Number(old.deskPrice||0) !== Number(dp||0)) ch2.push({ field:'المكتب', from: String(old.deskPrice||0), to: String(dp||0) });
        window.logActivity('settings_shipping_edit', zn, ch2.length ? ch2 : ch);
      } else {
        window.logActivity('settings_shipping_edit', zn, ch);
      }
    } else {
      window.logActivity('settings_shipping', zn, ch);
    }
  }
  var zb = e.target.closest('[data-zone-del]');
  if (zb) setTimeout(function() { window.logActivity('settings_shipping_delete', zb.dataset.zoneDel || ''); }, 100);
}, true);

/* ═══════════════ 8. تسجيل الدخول/الخروج ═══════════════ */
document.addEventListener('click', function(e) {
  if (e.target.closest('#loginBtn')) {
    setTimeout(function() {
      var u = localStorage.getItem("user");
      if (u && localStorage.getItem("auth") === "true") window.logActivity('login', u);
    }, 1500);
  }
  if (e.target.closest('#logoutBtn')) {
    var u = localStorage.getItem("user");
    window.logActivity('logout', u || '');
  }
}, true);

/* ═══════════════ جاهز ═══════════════ */
console.log('✅ logger.js جاهز — يغطي كل الإجراءات');