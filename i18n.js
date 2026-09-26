/* ═══════════════════════════════════════════════════════════
   i18n.js — نظام الترجمة الكامل — النسخة النهائية
   ═══════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  const I18N = {
    ar: {
      loading:"جاري التحميل...", notAllowed:"غير مسموح", noOrders:"لا توجد طلبات",
      noConfirmed:"لا توجد طلبات مؤكدة", noProducts:"لا توجد منتجات", noReviews:"لا توجد تقييمات بعد",
      noZones:"لا توجد مناطق", noUsers:"لا يوجد", noLandingPages:"لا توجد صفحات ترويج بعد",
      goToProducts:"اذهب إلى المنتجات واضغط على الزر.", noHiddenProducts:"لا توجد منتجات مخفية",
      orderIncoming:"طلب وارد", orderConfirmed:"طلب مؤكد",
      actionConfirmPrint:"تأكيد وطباعة", actionPrint:"طباعة", actionDelete:"حذف",
      orderConfirmedMsg:"تم تأكيد الطلب", wholesaleBadgeLabel:"جملة",
      unknownFamily:"غير مصنف", deletedProduct:"منتج محذوف",
      discountBadge:"تخفيض", discountActive:"دائم", discountTemp:"تخفيض",
      promotionBadge:"ترويج", promotedBadge:"مُروَّج", confirmedBadge:"مؤكد",
      newOrderBadge:"جديد", promotionSourceBadge:"من صفحة ترويج",
      hideProduct:"إخفاء", showProduct:"إظهار", bundleBadge:"عرض",
      langBtnLabel:"FR",
      edit:"تعديل", del:"حذف", save:"حفظ", add:"إضافة", view:"عرض", cancel:"إلغاء",
      cannotDeleteOwner:"لا يمكن الحذف", confirmDeleteUser:"حذف",
      active:"نشطة", copy:"نسخ", open:"فتح",
      freeShippingDefault:"التوصيل علينا"
    },
    fr: {
      loading:"Chargement...", notAllowed:"Non autorisé", noOrders:"Aucune commande",
      noConfirmed:"Aucune commande confirmée", noProducts:"Aucun produit", noReviews:"Aucun avis",
      noZones:"Aucune zone", noUsers:"Aucun", noLandingPages:"Aucune page promo",
      goToProducts:"Allez dans Produits et cliquez sur le bouton.", noHiddenProducts:"Aucun produit masqué",
      orderIncoming:"Commande reçue", orderConfirmed:"Commande confirmée",
      actionConfirmPrint:"Confirmer & imprimer", actionPrint:"Imprimer", actionDelete:"Supprimer",
      orderConfirmedMsg:"Commande confirmée", wholesaleBadgeLabel:"Gros",
      unknownFamily:"Non classé", deletedProduct:"Produit supprimé",
      discountBadge:"Promo", discountActive:"Permanent", discountTemp:"Promo",
      promotionBadge:"Promo", promotedBadge:"Promu", confirmedBadge:"Confirmée",
      newOrderBadge:"Nouveau", promotionSourceBadge:"Page promo",
      hideProduct:"Masquer", showProduct:"Afficher", bundleBadge:"offre",
      langBtnLabel:"AR",
      edit:"Modifier", del:"Supprimer", save:"Enregistrer", add:"Ajouter", view:"Voir", cancel:"Annuler",
      cannotDeleteOwner:"Non supprimable", confirmDeleteUser:"Supprimer",
      active:"Active", copy:"Copier", open:"Ouvrir",
      freeShippingDefault:"Livraison offerte"
    }
  };

  const WILAYAS_FR = {
    "أدرار":"Adrar", "الشلف":"Chlef", "الأغواط":"Laghouat", "أم البواقي":"Oum El Bouaghi",
    "باتنة":"Batna", "بجاية":"Béjaïa", "بسكرة":"Biskra", "بشار":"Béchar",
    "البليدة":"Blida", "البويرة":"Bouira", "تمنراست":"Tamanrasset", "تبسة":"Tébessa",
    "تلمسان":"Tlemcen", "تيارت":"Tiaret", "تيزي وزو":"Tizi Ouzou", "الجزائر":"Alger",
    "الجلفة":"Djelfa", "جيجل":"Jijel", "سطيف":"Sétif", "سعيدة":"Saïda",
    "سكيكدة":"Skikda", "سيدي بلعباس":"Sidi Bel Abbès", "عنابة":"Annaba", "قالمة":"Guelma",
    "قسنطينة":"Constantine", "المدية":"Médéa", "مستغانم":"Mostaganem", "المسيلة":"M'Sila",
    "معسكر":"Mascara", "ورقلة":"Ouargla", "وهران":"Oran", "البيض":"El Bayadh",
    "إليزي":"Illizi", "برج بوعريريج":"Bordj Bou Arreridj", "بومرداس":"Boumerdès",
    "الطارف":"El Tarf", "تندوف":"Tindouf", "تيسمسيلت":"Tissemsilt", "الوادي":"El Oued",
    "خنشلة":"Khenchela", "سوق أهراس":"Souk Ahras", "تيبازة":"Tipaza", "ميلة":"Mila",
    "عين الدفلى":"Aïn Defla", "النعامة":"Naâma", "عين تموشنت":"Aïn Témouchent",
    "غرداية":"Ghardaïa", "غليزان":"Relizane", "تيميمون":"Timimoun",
    "برج باجي مختار":"Bordj Badji Mokhtar", "أولاد جلال":"Ouled Djellal",
    "بني عباس":"Béni Abbès", "إن صالح":"In Salah", "إن قزام":"In Guezzam",
    "تقرت":"Touggourt", "جانت":"Djanet", "المغير":"El M'Ghair", "المنيعة":"El Meniaa"
  };

  const AR_TO_FR = {
    "لوحة الإدارة":"Panneau d'administration",
    "جاري التحميل...":"Chargement...",
    "تسجيل الخروج":"Déconnexion",
    "تسجيل الدخول":"Connexion", "دخول":"Entrer",
    "الإعدادات مفقودة":"Configuration manquante",
    "config.js غير موجود.":"config.js introuvable.",
    "الإعدادات غير مكتملة":"Configuration incomplète",
    "افتح setup.html أولاً.":"Ouvrez d'abord setup.html.",

    "تأكيد":"Confirmer", "إلغاء":"Annuler", "حفظ":"Enregistrer", "حذف":"Supprimer",
    "تعديل":"Modifier", "إضافة":"Ajouter", "إظهار":"Afficher", "إخفاء":"Masquer",
    "رجوع":"Retour", "المالك":"Propriétaire", "مدير":"Admin", "بائع":"Vendeur",
    "مالك":"Propriétaire", "زبون":"Client", "لا يوجد":"Aucun",
    "الكل":"Tout", "بحث":"Rechercher", "رؤية":"Voir", "نسخ":"Copier", "فتح":"Ouvrir",
    "نشطة":"Active", "جديد":"Nouveau", "مؤكد":"Confirmé",

    "المنتجات":"Produits", "الطلبات":"Commandes", "المخزون":"Stock",
    "التقييمات":"Avis", "الترويج":"Promotion", "الإعدادات":"Paramètres",

    "المخفية":"Masqués", "بحث...":"Rechercher...",
    "لا توجد منتجات":"Aucun produit", "لا توجد منتجات مخفية":"Aucun produit masqué",
    "غير مصنف":"Non classé",

    "طلبات جديدة":"Nouvelles commandes", "مؤكدة":"Confirmées",
    "حذف جميع الطلبات المؤكدة":"Supprimer toutes les commandes confirmées",
    "لا توجد طلبات":"Aucune commande", "لا توجد طلبات مؤكدة":"Aucune commande confirmée",
    "طلب وارد":"Commande reçue", "طلب مؤكد":"Commande confirmée",
    "تأكيد وطباعة":"Confirmer & imprimer", "طباعة":"Imprimer",
    "عرض كمية":"Offre quantité", "توصيل مجاني":"Livraison gratuite",
    "من صفحة ترويج":"Page promo",
    "توصيل مجاني - تم تطبيق العرض":"Livraison gratuite — offre appliquée",
    "الشحن:":"Livraison :", "الإجمالي:":"Total :",

    "اليوم":"Aujourd'hui", "هذا الأسبوع":"Cette semaine", "هذا الشهر":"Ce mois",
    "هذه السنة":"Cette année", "نظرة عامة":"Vue d'ensemble",
    "الأكثر مبيعاً":"Top ventes", "المنتجات الأكثر مبيعاً":"Produits les plus vendus",
    "إجمالي المبيعات":"Total des ventes", "الربح الصافي":"Bénéfice net",
    "تكلفة البضاعة":"Coût des marchandises", "عدد الطلبات":"Nombre de commandes",
    "قيمة المخزون:":"Valeur du stock :", "قيمة المخزون":"Valeur du stock",
    "إجمالي القطع:":"Total pièces :", "إجمالي القطع":"Total pièces",
    "حالة المخزون":"État du stock", "المنتج":"Produit", "الكمية":"Qté",
    "الكمية المباعة":"Qté vendue", "ثمن الشراء":"Prix d'achat", "سعر البيع":"Prix de vente",
    "الفائدة/قطعة":"Marge/pièce", "التكلفة":"Coût", "الحالة":"Statut",
    "نفد":"Épuisé", "منخفض":"Faible", "متوفر":"En stock",
    "المبيعات":"Ventes", "الربح":"Bénéfice",
    "لا توجد منتجات يتم تتبع مخزونها بعد.":"Aucun produit suivi en stock.",
    "لا توجد مبيعات في هذه الفترة":"Aucune vente pour cette période",
    "لا توجد بيانات في هذه الفترة":"Aucune donnée pour cette période",
    "تفاصيل المبيعات":"Détails des ventes", "تفاصيل الطلبات":"Détails des commandes",
    "تفاصيل الأرباح":"Détails des bénéfices", "تفاصيل التكلفة":"Détails des coûts",
    "تفاصيل قيمة المخزون":"Valeur du stock", "تفاصيل الكميات":"Détails des quantités",
    "منتجات على وشك النفاد":"Produits bientôt épuisés", "منتجات نفدت":"Produits épuisés",
    "المخزون بحالة جيدة":"Stock en bon état", "الإجمالي":"Total",
    "الفترة:":"Période :", "الفترة":"Période", "العميل":"Client",
    "الهاتف":"Téléphone", "العنوان":"Adresse", "المبلغ":"Montant",
    "التاريخ":"Date", "حد التنبيه":"Seuil", "لا توجد بيانات للطباعة":"Aucune donnée à imprimer",

    "يوجد":"Il y a",
    "منتج نفد من المخزون":"produit(s) épuisé(s)",
    "منتج على وشك النفاد":"produit(s) bientôt épuisé(s)",

    "عام":"Général", "الغلاف":"Couverture", "الميزات":"Fonctionnalités",
    "الصفحات":"Pages", "السياسات":"Politiques", "البكسل":"Pixels",
    "الشحن":"Livraison", "المستخدمون":"Utilisateurs", "متقدم":"Avancé",

    "معلومات المتجر":"Informations boutique", "اسم المتجر":"Nom de la boutique",
    "عنوان المتجر":"Adresse de la boutique",
    "رقم الهاتف (يظهر للعملاء)":"Téléphone (visible clients)",
    "رقم واتساب (لاستقبال الطلبات)":"N° WhatsApp (commandes)",
    "مفتاح ImgBB (لرفع الصور)":"Clé ImgBB (upload)", "العملة":"Devise",
    "تفعيل الطلبات عبر واتساب":"Activer commandes WhatsApp",
    "تفعيل زر GPS":"Activer le bouton GPS",
    "شعار المتجر":"Logo de la boutique",
    "يظهر في كل الصفحات (المتجر، الفواتير، صفحات الترويج).":"Visible sur toutes les pages.",
    "من المعرض":"Galerie", "كاميرا":"Caméra", "لا يوجد شعار":"Aucun logo",
    "تنبيهات المخزون":"Alertes de stock",
    "حد التنبيه العام (الكمية الدنيا قبل إظهار التنبيه)":"Seuil d'alerte global",
    "حفظ الإعدادات":"Enregistrer les paramètres",
    "غلاف المتجر":"Couverture de la boutique",
    "صورة كبيرة تظهر أعلى صفحة المتجر الرئيسية.":"Grande image en haut de la boutique.",
    "لا يوجد غلاف":"Aucune couverture",
    "إدارة الميزات":"Gestion des fonctionnalités",
    "سعر الشراء":"Prix d'achat", "تتبع المخزون":"Suivi du stock",
    "الكمية في العلبة":"Quantité par boîte", "الرقم التسلسلي (SKU)":"Référence (SKU)",
    "سعر الجملة":"Prix de gros", "التخفيضات":"Promotions",
    "صفحات الترويج":"Pages promotionnelles",
    "الشريط الإعلاني":"Bandeau publicitaire",
    "نص الشريط العلوي (عام لكل الصفحات)":"Texte du bandeau (général)",
    "اكتب النص هنا":"Écrivez ici",
    "إظهار التقييمات":"Afficher les avis",
    "إظهار عداد الزوار":"Afficher le compteur visiteurs",
    "إظهار عدد الزوار":"Afficher le compteur visiteurs",
    "سياسات المتجر":"Politiques de la boutique",
    "كل سياسة تحتوي على عنوان + نص الشرح.":"Chaque politique : titre + description.",
    "إضافة سياسة جديدة":"Ajouter une politique",
    "حفظ السياسات":"Enregistrer les politiques",
    "عنوان السياسة":"Titre de la politique",
    "اكتب نص السياسة هنا...":"Écrivez le contenu de la politique...",
    "لا توجد سياسات بعد.":"Aucune politique pour le moment.",
    "تفعيل Facebook Pixel":"Activer Facebook Pixel",
    "من Events Manager إلى Pixel ID":"Depuis Events Manager → Pixel ID",
    "تفعيل TikTok Pixel":"Activer TikTok Pixel",
    "من TikTok Ads Manager إلى Events ثم Pixel ID":"Depuis TikTok Ads Manager → Events → Pixel ID",

    "مناطق الشحن":"Zones de livraison", "إضافة منطقة":"Ajouter une zone",
    "لا توجد مناطق":"Aucune zone", "منطقة شحن":"Zone de livraison",
    "اسم المنطقة":"Nom de la zone",
    "سعر للمنزل (دج)":"Prix à domicile (DA)",
    "سعر للمكتب (دج)":"Prix au bureau (DA)",
    "الولايات":"Wilayas", "تحديد الكل":"Tout sélectionner",
    "إلغاء الكل":"Tout désélectionner",

    "إضافة مستخدم جديد":"Ajouter un utilisateur",
    "اسم المستخدم":"Nom d'utilisateur", "كلمة المرور":"Mot de passe",
    "مدير (Admin)":"Admin (Admin)", "قائمة المستخدمين":"Liste des utilisateurs",
    "لا يمكن الحذف":"Non supprimable",

    "بيانات المالك":"Données du propriétaire",
    "الاسم الجديد":"Nouveau nom", "كلمة المرور الجديدة":"Nouveau mot de passe",
    "سجل النشاطات":"Journal des activités",
    "فتح سجل النشاطات":"Ouvrir le journal des activités",

    "الرقم السري للجملة":"Code secret de gros",
    "استيراد المنتجات من Excel":"Importer des produits depuis Excel",
    "رفع ملف Excel":"Charger un fichier Excel",
    "معالج الإعداد (setup)":"Assistant de configuration",
    "فتح setup.html":"Ouvrir setup.html", "منطقة الخطر":"Zone de danger",
    "حذف كل المنتجات":"Supprimer tous les produits",

    "إضافة منتج":"Ajouter un produit", "تعديل المنتج":"Modifier le produit",
    "اسم المنتج":"Nom du produit",
    "الرقم التسلسلي / المرجع (SKU)":"Référence / SKU",
    "سعر البيع (دج)":"Prix de vente (DA)",
    "سعر الجملة (اختياري)":"Prix de gros (optionnel)",
    "الكمية في العلبة (اختياري)":"Qté par boîte (optionnel)",
    "ثمن الشراء (تكلفة الوحدة)":"Prix d'achat (coût unitaire)",
    "الكمية المتوفرة في المخزون":"Quantité en stock",
    "-- اختر عائلة --":"-- Choisir une famille --",
    "اسم العائلة الجديدة":"Nom nouvelle famille",

    "إدارة التخفيض":"Gérer la promotion", "المنتج:":"Produit :",
    "السعر بعد التخفيض":"Prix après réduction",
    "تخفيض دائم":"Promotion permanente", "المدة":"Durée",
    "من":"De", "إلى":"À", "إزالة":"Retirer",

    "تعديل صفحة الترويج":"Modifier la page promo",
    "المنتج الأصلي:":"Produit original :",
    "تفعيل صفحة الترويج":"Activer la page promo",
    "ستايل الصفحة":"Style de la page", "الستايل الحالي":"Style actuel",
    "أخضر":"Vert", "أبيض":"Blanc", "داكن":"Sombre", "وردي":"Rose",
    "ذهبي":"Doré", "أزرق":"Bleu", "رمادي":"Gris", "تركواز":"Turquoise",
    "بنفسجي":"Violet", "برتقالي":"Orange", "أحمر":"Rouge", "كحلي":"Marine",
    "كريمي":"Crème", "ليموني":"Citron", "بني":"Marron",
    "شعار الصفحة":"Logo de la page", "النصوص الظاهرة":"Textes visibles",
    "اسم الصفحة":"Nom de la page",
    "سعر خاص لصفحة الترويج":"Prix spécial page promo",
    "اتركه فارغاً للعام":"Vide pour le général",
    "وصف المنتج":"Description du produit",
    "صور صفحة الترويج":"Images de la page promo",
    "لا توجد صور بعد":"Aucune image pour le moment",
    "لماذا تختارنا؟ (المميزات)":"Pourquoi nous choisir ? (avantages)",
    "إضافة ميزة":"Ajouter un avantage",
    "رابط الصفحة":"Lien de la page",
    "لا توجد مميزات بعد":"Aucun avantage pour le moment",

    "صفحات الترويج المستقلة":"Pages promotionnelles indépendantes",
    "تظهر هنا":"Apparaissent ici",
    "المنتجات المُفعَّلة فقط":"les produits activés uniquement",
    ". لتفعيل منتج، اذهب إلى":". Pour activer un produit, allez à",
    "واضغط على زر.":"et cliquez sur le bouton.",
    "لا توجد صفحات ترويج بعد":"Aucune page promo",

    "اختر طريقة الطباعة":"Méthode d'impression",
    "طباعة حرارية":"Impression thermique",
    "طباعة عادية":"Impression normale",

    "اختر أيقونة":"Choisir une icône",
    "رفع أيقونة مخصصة":"Uploader une icône personnalisée",
    "التوصيل":"Livraison", "الدفع":"Paiement", "الجودة":"Qualité",
    "الضمان":"Garantie", "الخدمة":"Service", "متنوع":"Divers",

    "تفعيل":"Activer", "إيقاف":"Désactiver",
    "مفعّل":"Activé", "متوقف":"Désactivé",
    "قديم":"Ancien", "بدون":"Sans", "محدّث":"Mis à jour", "موجود":"Existant",
    "نعم":"Oui", "لا":"Non",
    "معالجة...":"Traitement...",
    "جاري الحفظ...":"Enregistrement...",
    "جاري الرفع...":"Téléchargement...",
    "جاري القراءة...":"Lecture en cours...",

    "تم الحفظ":"Enregistré", "تم الحذف":"Supprimé", "تم التعديل":"Modifié",
    "تمت الإضافة":"Ajouté", "تم الرفع":"Téléchargé", "تم الإظهار":"Affiché",
    "تم الإخفاء":"Masqué", "تم النسخ":"Copié",

    "مفتاح ImgBB مفقود":"Clé ImgBB manquante", "خطأ: ":"Erreur : ",
    "فشل الرفع":"Échec du téléchargement",
    "فشل الحفظ":"Échec de l'enregistrement",
    "فشل الحذف":"Échec de la suppression", "فشل النسخ":"Échec de la copie",
    "اسم المتجر مطلوب":"Nom de la boutique requis",
    "اسم المنطقة مطلوب":"Nom de zone requis",
    "اختر ولاية واحدة على الأقل":"Choisissez au moins une wilaya",
    "اسم فارغ":"Nom vide", "اسم قصير":"Nom trop court",
    "اسم موجود مسبقاً":"Nom déjà utilisé",
    "العائلة موجودة":"Famille déjà existante",
    "سعر غير صحيح":"Prix invalide",
    "حدد المدة":"Définir la durée", "وقت غير صحيح":"Heure invalide",
    "املأ الحقول":"Remplissez les champs", "أدخل الرقم":"Entrez le code",
    "أدخل البيانات":"Entrez les données", "بيانات خاطئة":"Données incorrectes",
    "ملف فارغ":"Fichier vide",

    "حذف المنتج؟":"Supprimer le produit ?",
    "حذف التقييم؟":"Supprimer l'avis ?",
    "حذف الشعار؟":"Supprimer le logo ?",
    "حذف شعار المتجر؟":"Supprimer le logo de la boutique ?",
    "حذف الغلاف؟":"Supprimer la couverture ?",
    "حذف السياسة؟":"Supprimer la politique ?",
    "إزالة التخفيض؟":"Retirer la promotion ?",
    "تأكيد حذف المنطقة؟":"Confirmer la suppression de la zone ?",
    "تأكيد الحذف؟":"Confirmer la suppression ?",
    "تأكيد حذف الكل؟":"Confirmer la suppression totale ?",
    "تسجيل الخروج؟":"Se déconnecter ?",
    "تأكيد الحذف":"Confirmer",
    "حذف جميع الطلبات":"Supprimer toutes les commandes",

    "تنبيه:":"Alerte :",
    "لديك":"Vous avez",
    "طلب مؤكد. يُنصح بحذف الطلبات الأقدم من شهر والاحتفاظ بطلبات الشهر الأخير، لتجنّب ثقل المتجر وبطء التحميل.":"commande(s) confirmée(s). Il est recommandé de supprimer les commandes de plus d'un mois et de conserver celles du dernier mois, pour éviter la surcharge et le ralentissement du magasin.",
    "حذف الأقدم من شهر":"Supprimer les anciennes (> 1 mois)",
    "لا توجد طلبات أقدم من شهر":"Aucune commande de plus d'un mois",
    "هل تريد المتابعة؟":"Voulez-vous continuer ?",

    "أي منتج كميته أقل من أو يساوي هذا الحد سيُعتبر \"منخفضاً\" في المخزون.":"Tout produit dont la quantité est inférieure ou égale à ce seuil sera considéré comme faible dans le stock.",
    "تحكم في الميزات التي تظهر في متجرك ولوحة التحكم. التغييرات تُحفظ تلقائياً.":"Contrôlez les fonctionnalités affichées dans votre boutique et le panneau d'administration. Les modifications sont sauvegardées automatiquement.",
    "ارفع شعاراً خاصاً. إذا لم تُضف، شعار المتجر الأساسي يُستخدم.":"Téléchargez un logo spécifique. S'il n'est pas ajouté, le logo principal sera utilisé.",
    "سعر منفصل تماماً يظهر فقط في صفحة الترويج.":"Prix séparé qui apparaît uniquement sur la page promotionnelle.",
    "ارفع صوراً متعددة. إذا لم تُضف، الصورة الأساسية تُستخدم.":"Téléchargez plusieurs images. Si aucune n'est ajoutée, l'image principale sera utilisée.",
    "كل ميزة: أيقونة + عبارة صغيرة":"Chaque avantage : icône + petite phrase",
    "يقرأ الملف تلقائياً ويتعرف على الأعمدة (Code, Désignation, Prix, PA TTC…).":"Lit automatiquement le fichier et reconnaît les colonnes (Code, Désignation, Prix, PA TTC…).",
    "لإعادة توليد config.js من جديد.":"Pour régénérer config.js.",
    "حذف كل المنتجات والتخفيضات نهائياً (لا يمكن التراجع).":"Suppression définitive de tous les produits et promotions (irréversible).",
    "تغيير اسم المالك سيخرجك من الجلسة. سجّل الدخول مجدداً بعد الحفظ.":"Changer le nom du propriétaire vous déconnectera. Reconnectez-vous après l'enregistrement.",
    "عرض كل ما فعله المستخدمون (بائع/مدير) مع إمكانية التصفية حسب اليوم/الأسبوع/الشهر.":"Voir tout ce que les utilisateurs (vendeur/admin) ont fait, avec la possibilité de filtrer.",
    "صورة كبيرة تظهر أعلى صفحة المتجر الرئيسية.":"Grande image affichée en haut de la page principale.",

    "تفعيل حساب تكلفة الشراء والأرباح لكل منتج.":"Activer le calcul du coût d'achat et des bénéfices.",
    "تفعيل تتبع الكميات وإحصائيات المخزون.":"Activer le suivi des quantités et les statistiques du stock.",
    "تفعيل خيار تحديد عدد الوحدات داخل العلبة الواحدة.":"Activer l'option pour définir le nombre d'unités dans une boîte.",
    "تفعيل خانة الرقم التسلسلي/المرجعي لكل منتج.":"Activer le champ référence/SKU pour chaque produit.",
    "تفعيل أسعار الجملة والرمز السري الخاص بزبائن الجملة.":"Activer les prix de gros et le code secret des clients en gros.",
    "تفعيل نظام التخفيضات الزمنية على المنتجات.":"Activer le système de promotions temporaires.",
    "تفعيل إنشاء صفحات ترويج مستقلة لكل منتج.":"Activer la création de pages promotionnelles indépendantes.",
    "تفعيل نظام تقييمات العملاء على المنتجات.":"Activer le système d'avis clients.",
    "تفعيل إدارة مناطق الشحن والولايات والأسعار.":"Activer la gestion des zones de livraison, wilayas et tarifs.",
    "تفعيل تسجيل عمليات المستخدمين (بائع/مدير) وعرضها للمالك.":"Activer le journal des opérations utilisateurs.",

    /* ═══ عروض وامتيازات ═══ */
    "عروض وامتيازات":"Offres et avantages",
    "تفعيل عروض الكمية":"Activer les offres de quantité",
    "مستويات العرض:":"Niveaux d'offre :",
    "مستويات العرض":"Niveaux d'offre",
    "عدد القطع":"Nb de pièces",
    "إجمالي الحزمة":"Total du lot",
    "إضافة مستوى جديد":"Ajouter un niveau",
    "الحد الأقصى للكمية (اختياري)":"Quantité maximale (optionnel)",
    "مثال: 10":"Ex : 10",
    "تفعيل التوصيل المجاني":"Activer la livraison gratuite",
    "عند شراء عدد القطع:":"À partir de :",
    "نص الإعلان:":"Texte de l'annonce :",
    "التوصيل علينا":"Livraison offerte",
    "معاينة العرض:":"Aperçu de l'offre :",
    "معاينة العرض":"Aperçu de l'offre",
    "لم تُضف أي مستوى بعد":"Aucun niveau ajouté",
    "قطعة":"pièce",
    "قطع":"pièces",

    "عرض خاص":"Offre spéciale",
    "عروض خاصة":"Offres spéciales",
    "لا توجد بيانات":"Aucune donnée",

    "التوصيل مجاني":"Livraison offerte",
    "توصيل مجاني":"Livraison gratuite",
    "التوصيل مجاني عند شراء":"Livraison offerte à partir de",
    "قطع أو أكثر":"pièces ou plus",
    "بكسل خاص بهذا المنتج (اختياري)":"Pixel spécifique à ce produit (optionnel)",
    "بكسل خاص بهذا المنتج":"Pixel spécifique à ce produit",

    /* ═══ النصوص الناقصة التي ظهرت في الصور ═══ */
    "أضف مستويات متعددة. النظام يختار تلقائياً":"Ajoutez plusieurs niveaux. Le système choisit automatiquement",
    "أرخص سعر للقطعة":"le meilleur prix unitaire",
    "حسب كمية الزبون.":"selon la quantité du client.",
    "حسب كمية الزبون":"selon la quantité du client",
    "نص الشريط الإعلاني (اختياري)":"Texte du bandeau publicitaire (optionnel)",
    "نص الشريط الإعلاني":"Texte du bandeau publicitaire",

    /* ═══ زر إظهار/إخفاء الغلاف ═══ */
    "إظهار الغلاف في المتجر":"Afficher la couverture dans la boutique",
    "عند الإيقاف، يختفي الغلاف تمامًا من صفحة المنتجات.":"Si désactivé, la couverture disparaît complètement de la page des produits.",
    "إظهار الغلاف":"Afficher la couverture",
    "إخفاء الغلاف":"Masquer la couverture",
    "تم تفعيل الغلاف":"Couverture activée",
    "تم إخفاء الغلاف":"Couverture masquée"
  };

  const PATTERNS = [
    { regex: /^يوجد (\d+) منتج نفد من المخزون$/, fn:(m,n)=>`Il y a ${n} produit(s) épuisé(s)` },
    { regex: /^يوجد (\d+) منتج على وشك النفاد$/, fn:(m,n)=>`Il y a ${n} produit(s) bientôt épuisé(s)` },
    { regex: /^الفترة:\s*(.+)$/, fn:(m,p)=>`Période : ${p.trim()}` },
    { regex: /^الفترة :\s*(.+)$/, fn:(m,p)=>`Période : ${p.trim()}` },
    { regex: /^منزل:\s*(.+)$/, fn:(m,p)=>`Domicile : ${p.trim()}` },
    { regex: /^مكتب:\s*(.+)$/, fn:(m,p)=>`Bureau : ${p.trim()}` },
    { regex: /^(\d+)\s*طلب$/, fn:(m,n)=>`${n} commande(s)` },
    { regex: /^(\d+)\s*منتج$/, fn:(m,n)=>`${n} produit(s)` },
    { regex: /^(\d+)\s*قطعة$/, fn:(m,n)=>`${n} pièce(s)` },
    { regex: /^(\d+)\s*قطع$/, fn:(m,n)=>`${n} pièces` },
    { regex: /^(\d+)\s*علبة$/, fn:(m,n)=>`${n} boîte(s)` },
    { regex: /^(\d+)\s*فائدة$/, fn:(m,n)=>`${n} marge` },
    { regex: /^(\d+)\s*عرض خاص$/, fn:(m,n)=>`${n} offre spéciale` },
    { regex: /^(\d+)\s*عروض خاصة$/, fn:(m,n)=>`${n} offres spéciales` },
    { regex: /^(\d+)\s*عرض$/, fn:(m,n)=>`${n} offre` },
    { regex: /^(\d+)\s*عروض$/, fn:(m,n)=>`${n} offres` },
    { regex: /^(\d+)\s*تقييم$/, fn:(m,n)=>`${n} avis` },
    { regex: /^(\d+)\s*منطقة$/, fn:(m,n)=>`${n} zone(s)` },
    { regex: /^المنتج:\s*(.+)$/, fn:(m,p)=>`Produit : ${p.trim()}` },
    { regex: /^الإجمالي:\s*(.+)$/, fn:(m,p)=>`Total : ${p.trim()}` },
    { regex: /^العميل:\s*(.+)$/, fn:(m,p)=>`Client : ${p.trim()}` },
    { regex: /^الهاتف:\s*(.+)$/, fn:(m,p)=>`Téléphone : ${p.trim()}` },
    { regex: /^العنوان:\s*(.+)$/, fn:(m,p)=>`Adresse : ${p.trim()}` },
    { regex: /^سيتم حذف (\d+) طلب أقدم من شهر\.$/, fn:(m,n)=>`Seront supprimées ${n} commande(s) de plus d'un mois.` },
    { regex: /^سيُحتفظ بـ (\d+) طلب خلال الشهر الأخير\.$/, fn:(m,n)=>`Seront conservées ${n} commande(s) du dernier mois.` },
    { regex: /^تم حذف (\d+) طلب$/, fn:(m,n)=>`${n} commande(s) supprimée(s)` }
  ];

  const EMOJI_RE = /^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]+\s*/u;
  const WILAYA_SPLIT_RE = /\s*[•·∙⋅]\s*/;

  let LANG = localStorage.getItem('store_lang') || 'ar';
  window.currentLang = LANG;

  function t(k) {
    return (I18N[LANG] && I18N[LANG][k]) || (I18N.ar && I18N.ar[k]) || k;
  }

  function collapseWS(s) {
    return String(s || '').replace(/\s+/g, ' ').trim();
  }

  function normalizeKey(s) {
    return String(s || '')
      .replace(/[\u064B-\u0652\u0670\u0640]/g, '')
      .replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
      .replace(/[()[\]{}（）［］｛｝﴾﴿]/g, '')
      .replace(/[\u060C\u061B\u061F]/g, '')
      .replace(/[«»""''‹›]/g, '')
      .replace(/…/g, '...')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const AR_TO_FR_NORM = {};
  Object.keys(AR_TO_FR).forEach(k => {
    AR_TO_FR_NORM[normalizeKey(k)] = AR_TO_FR[k];
  });

  function translateWilayaList(text) {
    if (!WILAYA_SPLIT_RE.test(text)) return null;
    const parts = text.split(WILAYA_SPLIT_RE);
    if (parts.length < 2) return null;
    let translatedAll = false;
    const result = parts.map(p => {
      const trimmed = p.trim();
      if (WILAYAS_FR[trimmed]) { translatedAll = true; return WILAYAS_FR[trimmed]; }
      return trimmed;
    });
    return translatedAll ? result.join(' • ') : null;
  }

  function lookupTranslation(text) {
    if (!text) return null;
    const trimmed = text.trim();
    if (!trimmed) return null;

    if (AR_TO_FR[trimmed]) return AR_TO_FR[trimmed];

    const collapsed = collapseWS(trimmed);
    if (collapsed !== trimmed && AR_TO_FR[collapsed]) return AR_TO_FR[collapsed];

    const normKey = normalizeKey(trimmed);
    if (AR_TO_FR_NORM[normKey]) return AR_TO_FR_NORM[normKey];

    if (WILAYAS_FR[trimmed]) return WILAYAS_FR[trimmed];
    if (collapsed !== trimmed && WILAYAS_FR[collapsed]) return WILAYAS_FR[collapsed];

    const wilayaList = translateWilayaList(trimmed);
    if (wilayaList) return wilayaList;

    const noEmoji = trimmed.replace(EMOJI_RE, '').trim();
    const noEmojiCollapsed = collapseWS(noEmoji);
    if (noEmoji && noEmoji !== trimmed) {
      if (AR_TO_FR[noEmoji]) return AR_TO_FR[noEmoji];
      if (AR_TO_FR[noEmojiCollapsed]) return AR_TO_FR[noEmojiCollapsed];
      if (WILAYAS_FR[noEmoji]) return WILAYAS_FR[noEmoji];
      const normKey2 = normalizeKey(noEmoji);
      if (AR_TO_FR_NORM[normKey2]) return AR_TO_FR_NORM[normKey2];
    }

    for (const p of PATTERNS) {
      const m = noEmoji.match(p.regex) || trimmed.match(p.regex) || collapsed.match(p.regex);
      if (m) return p.fn(...m);
    }
    return null;
  }

  function translateText(text) {
    if (!text || LANG !== 'fr') return text;
    const trimmed = text.trim();
    if (!trimmed) return text;
    const trans = lookupTranslation(trimmed);
    if (trans) {
      const leading = text.substring(0, text.indexOf(trimmed));
      return leading + trans;
    }
    return text;
  }

  function translateAttrValue(value) {
    if (!value || LANG !== 'fr') return value;
    return lookupTranslation(value) || value;
  }

  function translateNode(node) {
    if (LANG !== 'fr') return;
    if (node.nodeType === 3) {
      const original = node.nodeValue;
      const translated = translateText(original);
      if (translated !== original) node.nodeValue = translated;
    } else if (node.nodeType === 1) {
      if (node.placeholder) node.placeholder = translateAttrValue(node.placeholder);
      if (node.title)       node.title = translateAttrValue(node.title);
      if (node.alt)         node.alt = translateAttrValue(node.alt);
      if (node.tagName === 'OPTION' && node.textContent) {
        const tr = translateAttrValue(node.textContent.trim());
        if (tr) node.textContent = tr;
      }
    }
  }

  function walkAndTranslate(root) {
    if (LANG !== 'fr' || !root) return;
    if (root.nodeType === 1) {
      const tag = root.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: function(n) {
        if (n.nodeType === 1 && (n.tagName === 'SCRIPT' || n.tagName === 'STYLE' || n.tagName === 'NOSCRIPT'))
          return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let n;
    while (n = walker.nextNode()) nodes.push(n);
    nodes.forEach(translateNode);
  }

  function lockDirection() {
    const html = document.documentElement;
    const body = document.body;
    if (html) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', LANG === 'fr' ? 'fr' : 'ar');
      html.style.direction = 'rtl';
    }
    if (body) {
      body.setAttribute('dir', 'rtl');
      body.style.direction = 'rtl';
      body.style.textAlign = 'right';
    }
  }

  function applyTranslations() {
    lockDirection();
    const lb = document.getElementById('langBtnLabel');
    if (lb) lb.textContent = LANG === 'fr' ? 'AR' : 'FR';
    if (LANG !== 'fr') return;
    walkAndTranslate(document.body);
    document.title = document.title.replace("لوحة الإدارة", "Panneau d'administration");
  }

  let _observerStarted = false;
  function startI18nObserver() {
    if (LANG !== 'fr' || _observerStarted) return;
    _observerStarted = true;
    const observer = new MutationObserver(mutations => {
      if (LANG !== 'fr') return;
      let needsTranslate = false;
      mutations.forEach(m => {
        if (m.type === 'childList' && m.addedNodes.length) needsTranslate = true;
        if (m.type === 'characterData') needsTranslate = true;
      });
      if (needsTranslate) {
        clearTimeout(window._i18nTimer);
        window._i18nTimer = setTimeout(() => {
          mutations.forEach(m => {
            m.addedNodes.forEach(node => {
              if (node.nodeType === 1) walkAndTranslate(node);
              else if (node.nodeType === 3) translateNode(node);
            });
          });
        }, 40);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    window._i18nObserver = observer;
  }

  function bindLangButton() {
    const btn = document.getElementById('langToggleBtn');
    if (!btn || btn._langBound) return;
    btn._langBound = true;
    btn.addEventListener('click', function(e) {
      e.preventDefault(); e.stopPropagation();
      LANG = LANG === 'ar' ? 'fr' : 'ar';
      localStorage.setItem('store_lang', LANG);
      window.location.reload();
    });
  }

  function initI18n() {
    try {
      lockDirection();
      bindLangButton();
      applyTranslations();
      startI18nObserver();
    }
    catch (err) { console.error("I18n init error:", err); }
  }

  function guardDirection() {
    const html = document.documentElement;
    if (html.getAttribute('dir') !== 'rtl') {
      html.setAttribute('dir', 'rtl');
      html.style.direction = 'rtl';
    }
  }

  window.I18N = I18N;
  window.t = t;
  window.translateText = translateText;
  window.applyTranslations = applyTranslations;
  window.lockDirection = lockDirection;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initI18n);
  else initI18n();
  setTimeout(bindLangButton, 500);
  setTimeout(bindLangButton, 1500);
  setTimeout(bindLangButton, 3000);
  setTimeout(() => { if (LANG === 'fr') walkAndTranslate(document.body); }, 2000);
  setTimeout(() => { if (LANG === 'fr') walkAndTranslate(document.body); }, 4000);
  setTimeout(() => { if (LANG === 'fr') walkAndTranslate(document.body); }, 6000);

  setInterval(guardDirection, 500);
})();