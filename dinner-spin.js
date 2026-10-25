const ComponentFunction = function() {
  // @section:imports @depends:[]
  const React = require('react');
  const { View, Text: NativeText, ScrollView: NativeScrollView, TouchableOpacity, TextInput: NativeTextInput, Image, StyleSheet, StatusBar, Platform, Alert, LayoutAnimation, Modal, Animated, PanResponder } = require('react-native');
  var ScrollView = function(props) {
    return React.createElement(NativeScrollView, Object.assign({
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false
    }, props), props.children);
  };
  const { Ionicons } = require('@react-native-vector-icons/ionicons');
  const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');
  const { createStackNavigator } = require('@react-navigation/stack');
  const { useSafeAreaInsets } = require('react-native-safe-area-context');
  const { useQuery, useMutation, useStorage, seedSampleRows, useCamera } = require('platform-hooks');
  const Slider = require('@react-native-community/slider').default;
  // @end:imports

  // @section:theme @depends:[]
  var primaryColor = '#F4E6D4';
  var accentColor = '#FF5C38';
  var backgroundColor = '#0C0B0A';
  var cardColor = '#171513';
  var textPrimary = '#F8F4EF';
  var textSecondary = '#A39B93';
  var surfaceAltColor = '#241F1B';
  var borderColor = '#3A342E';
  var onAccentColor = '#1A0C08';
  var accentSoftColor = '#3C241C';
  var radiusSm = 14;
  var radiusMd = 24;
  var radiusPill = 999;
  var TAB_MENU_HEIGHT = Platform.OS === 'web' ? 56 : 49;
  var SCROLL_EXTRA_PADDING = 16; // <--- Вернули недостающую переменную
  // @end:theme

  // @section:navigation-setup @depends:[]
  var Tab = createBottomTabNavigator();
  var Stack = createStackNavigator();
  // @end:navigation-setup

  // @section:ThemeContext @depends:[theme]
  var translations = {
    'Dinner Spin': 'Ужин наугад', 'Recipes': 'Рецепты', 'Pick': 'Выбор',
    'Add dish': 'Добавить блюдо', 'Add Dish': 'Добавить блюдо', 'Edit Dish': 'Редактирование рецепта',
    'Save Changes': 'Сохранить изменения', 'SPIN DISH': 'ВЫБРАТЬ БЛЮДО', 'SPINNING…': 'ВЫБИРАЕМ…',
    'Tonight’s choice starts here': 'Выбор ужина начинается здесь',
    'Add a dish to your menu, then set a budget and spin for dinner.': 'Добавьте блюдо, задайте бюджет и выберите ужин.',
    'Open Recipes to add your first dish': 'Откройте рецепты, чтобы добавить первое блюдо',
    'Dinner budget': 'Бюджет на ужин', 'TONIGHT’’S PICK': 'ВЫБОР НА СЕГОДНЯ', 'TONIGHT’S PICK': 'ВЫБОР НА СЕГОДНЯ',
    'Choose a dish': 'Выберите блюдо', 'estimated': 'примерно', 'estimated total': 'примерная стоимость',
    'min': 'мин', 'dish fits': 'блюдо подходит', 'dishes fit': 'блюда подходят',
    'Your dishes didn’t load': 'Не удалось загрузить блюда',
    'Dinner Spin couldn’t open your saved menu.': 'Не удалось открыть сохранённое меню.',
    'Try loading dishes again': 'Загрузить блюда ещё раз', 'Your saved recipes': 'Ваши рецепты',
    'Couldn’t load your recipes. Try again from Recipes.': 'Не удалось загрузить рецепты.',
    'Add a dish from Recipes to keep its recipe here.': 'Добавьте блюдо, чтобы сохранить его здесь.',
    'Your dinner menu starts here': 'Ваше меню ужина начинается здесь',
    'Your dishes couldn’t load. Please try again.': 'Не удалось загрузить блюда. Попробуйте ещё раз.',
    'Add a dish to keep its price and recipe close at hand.': 'Добавьте блюдо, чтобы сохранить его цену и рецепт.',
    'Try again': 'Попробовать ещё раз', 'View recipe': 'Смотреть рецепт', 'View Recipe': 'Смотреть рецепт',
    'Congratulations!': 'Поздравляем!', 'Tonight’s pick': 'Выбор на сегодня', 'Dinner': 'Ужин',
    'No, I want something else': 'Нет, хочу что-нибудь другое',
    'No dishes fit your budget': 'В бюджет не подходит ни одно блюдо',
    'Raise your dinner budget to include more dishes.': 'Увеличьте бюджет, чтобы добавить больше блюд.',
    'Raise dinner budget': 'Увеличить бюджет', 'Recipe': 'Рецепт', 'Ingredients': 'Ингредиенты',
    'Method': 'Приготовление', 'No ingredients added yet.': 'Ингредиенты пока не добавлены.',
    'No cooking steps added yet.': 'Шаги приготовления пока не добавлены.',
    'This recipe is no longer in your menu.': 'Этого рецепта больше нет в меню.',
    'Dish name': 'Название блюда', 'Price': 'Цена', 'Recipe steps': 'Шаги приготовления',
    'Ingredient name': 'Название ингредиента', 'Amount': 'Кол-во', 'Unit': 'Ед. изм.',
    'Add ingredient': '+ Добавить ингредиент', 'Add step': '+ Добавить шаг',
    'Please fill in the dish name, price, ingredients and recipe.': 'Укажите название блюда, цену, ингредиенты и рецепт.',
    'Couldn’t save this dish. Your details are still here—try saving again.': 'Не удалось сохранить блюдо.',
    'Camera access is off': 'Нет доступа к камере',
    'You can still add a dish without a photo. Your menu and recipes are unchanged.': 'Вы можете добавить блюдо без фото.',
    'Try camera again': 'Попробовать снова', 'Add Photo': 'Добавить фото',
    'Take a photo of your dish': 'Сфотографируйте блюдо', 'ADDING A PHOTO TO': 'ДОБАВЛЯЕМ ФОТО К',
    'New dish': 'Новое блюдо', 'A clear overhead photo works best.': 'Лучше всего подойдёт чёткое фото сверху.',
    'Use Photo': 'Использовать', 'Retake': 'Переснять', 'Take Photo': 'Сделать фото', 'Dish photo': 'Фото блюда',
    'Add a photo of the finished dish': 'Добавьте фото готового блюда',
    'Please fill in all the dish details before saving.': 'Заполните все данные о блюде перед сохранением.',
    'Changes couldn’t be saved. Your dish details are still here.': 'Не удалось сохранить изменения.',
    'Couldn’t delete this dish. Please try again.': 'Не удалось удалить блюдо. Попробуйте ещё раз.',
    'Delete dish': 'Удалить блюдо', 'Delete this dish from your menu?': 'Удалить это блюдо из меню?',
    'Cancel': 'Отмена', 'Delete': 'Удалить', 'This dish is no longer in your menu.': 'Этого блюда больше нет в меню.',
    'Fish': 'Рыба', 'Chicken': 'Курица', 'Beef': 'Говядина', 'Veal': 'Телятина', 'Restaurant': 'Ресторан', 'Cafe': 'Кафе',
    'About': 'Около', 'Untitled dish': 'Без названия', 'RU': 'RU', 'EN': 'EN',
    'Matching dishes: ': 'Подходит по бюджету: ', 'dishes': 'блюда', 'Saving…': 'Сохраняем…',
    'Choose a dish photo': 'Выберите фото блюда', 'Choose photo source': 'Выберите источник фото',
    'Choose from gallery': 'Выбрать из галереи', 'Photo added': 'Фото добавлено',
    'Visual hint': 'Визуальная подсказка', 'Select unit': 'Выберите единицу',
    'Step description...': 'Опишите шаг приготовления...',
    'View photo': 'Посмотреть фото', 'Replace photo': 'Заменить фото', 'Remove photo': 'Удалить фото',
    'History': 'История выпавших блюд', 'No history yet': 'История пока пуста',
    'Filter dishes': 'Фильтр блюд', 'Restaurants / Cafes': 'Рестораны / Кафе',
    'Recipes & Places': 'Рецепты и заведения', 'Pasta': 'Паста', 'Comfort food': 'Домашняя еда',
    'Fill in the highlighted fields': 'Заполните отмеченные поля',
    'You can stop deciding': 'Можно больше не выбирать.'
  };
  var translateText = function(value, language) {
    if (typeof value !== 'string') return value;
    if (language === 'RU') return translations[value] || value;
    var found = Object.keys(translations).find(function(key) { return translations[key] === value; });
    return found || value;
  };
  var ThemeContext = React.createContext(null);
  var ThemeProvider = function(props) {
    var languageStore = useStorage('dinner-language', 'RU');
    var language = languageStore[0] === 'EN' ? 'EN' : 'RU';
    var setLanguage = languageStore[1];
    var value = {
      theme: { colors: { primary: primaryColor, accent: accentColor, background: backgroundColor, card: cardColor, textPrimary: textPrimary, textSecondary: textSecondary } },
      language: language,
      setLanguage: setLanguage,
      translate: function(text) { return translateText(text, language); }
    };
    return React.createElement(ThemeContext.Provider, { testID: 'Provider-1', value: value }, props.children);
  };
  var useTheme = function() { return React.useContext(ThemeContext); };
  var Text = function(props) {
    var context = useTheme();
    var children = props.children;
    var translated = typeof children === 'string' ? translateText(children, context.language) :
      Array.isArray(children) ? children.map(function(item) { return typeof item === 'string' ? translateText(item, context.language) : item; }) : children;
    return React.createElement(NativeText, Object.assign({}, props, { testID: 'NativeText-1' }), translated);
  };
  var TextInput = function(props) {
    var context = useTheme();
    return React.createElement(NativeTextInput, Object.assign({}, Object.assign({}, props, {
      placeholder: translateText(props.placeholder, context.language),
      placeholderTextColor: props.placeholderTextColor || textSecondary,
      keyboardAppearance: props.keyboardAppearance || 'dark',
      underlineColorAndroid: 'transparent'
    }), { testID: 'NativeTextInput-1' }));
  };
  // @end:ThemeContext

  // @section:sample-data @depends:[]
  var SAMPLE_ROWS = {
    dishes: [
      { dish_name: 'Salmon Steak with Vegetables', price_rubles: 1800, ingredients: 'Salmon steak | 2 | pcs\nBroccoli florets | 300 | g\nLemon | 1 | pcs\nOlive oil | 1 | tbsp', recipe_steps: 'Heat the oven to 200°C. Cut the broccoli into florets and toss with olive oil, salt and pepper.', photo_uri: 'IMAGE:salmon-steak-roasted-vegetables', tags: ['Fish', 'Restaurant'] },
      { dish_name: 'Pasta Carbonara', price_rubles: 550, ingredients: 'Spaghetti | 250 | g\nBacon | 150 | g\nCream | 100 | ml\nParmesan | 60 | g', recipe_steps: 'Cook spaghetti in salted water until al dente.', photo_uri: 'IMAGE:pasta-carbonara', tags: ['Cafe'] },
      { dish_name: 'Siberian Pelmeni', price_rubles: 350, ingredients: 'Pelmeni | 400 | g\nSour cream | 3 | tbsp\nButter | 1 | tbsp', recipe_steps: 'Bring a large pot of salted water to a boil.', photo_uri: 'IMAGE:siberian-pelmeni', tags: ['Home'] }
    ]
  };
  var DEFAULT_BUDGET = { amount: 2000 };
  // @end:sample-data

  // @section:shared-components @depends:[ThemeContext,styles]
  var formatPrice = function(value) { return '₽' + Number(value || 0).toLocaleString('en-US'); };
  var parseStructuredIngredients = function(raw) {
    if (!raw) return [];
    var lines = String(raw).split(/\n+/).map(function(l) { return l.trim(); }).filter(Boolean);
    return lines.map(function(line) {
      var parts = line.split('|').map(function(p) { return p.trim(); });
      return { name: parts[0] || line, amount: parts[1] || '', unit: parts[2] || 'г' };
    });
  };
  var serializeStructuredIngredients = function(items) {
    return items.filter(function(i) { return i.name.trim(); }).map(function(i) {
      return i.name.trim() + ' | ' + (i.amount || '1') + ' | ' + (i.unit || 'г');
    }).join('\n');
  };
  var parseStructuredSteps = function(raw) {
    if (!raw) return [];
    var lines = String(raw).split(/\n+/).map(function(l) { return l.trim(); }).filter(Boolean);
    return lines.map(function(line) {
      var parts = line.split('|#|').map(function(p) { return p.trim(); });
      return { text: parts[0] || line, photo: parts[1] || '' };
    });
  };
  var serializeStructuredSteps = function(steps) {
    return steps.filter(function(s) { return s.text.trim(); }).map(function(s) {
      return s.text.trim() + (s.photo ? ' |#| ' + s.photo : '');
    }).join('\n');
  };
  var dishDetails = function(dish) {
    var name = String(dish?.dish_name || '');
    if (name.indexOf('Salmon') >= 0 || name.indexOf('лосося') >= 0) return { kind: 'Fish', minutes: 30 };
    if (name.indexOf('Pasta') >= 0 || name.indexOf('паста') >= 0) return { kind: 'Pasta', minutes: 25 };
    return { kind: 'Comfort food', minutes: 20 };
  };
  var placePhotos = function(place) {
    if (!place) return [];
    if (Array.isArray(place.photos) && place.photos.length) return place.photos.filter(Boolean);
    if (place.photo) return [place.photo];
    return [];
  };
  var getDishImage = function(dish) {
    if (dish?.photo_uri) return dish.photo_uri;
    var name = String(dish?.dish_name || '');
    if (name === 'Salmon Steak with Vegetables' || name === 'Стейк из лосося с овощами') return 'IMAGE:salmon-steak-roasted-vegetables';
    if (name === 'Pasta Carbonara' || name === 'Паста карбонара') return 'IMAGE:pasta-carbonara';
    if (name === 'Siberian Pelmeni' || name === 'Сибирские пельмени') return 'IMAGE:siberian-pelmeni';
    return null;
  };
  var DishImage = function(props) {
    var uri = getDishImage(props.dish);
    var isNetworkOrLocal = uri && (uri.startsWith('http') || uri.startsWith('file') || uri.startsWith('content') || uri.startsWith('data'));
    return isNetworkOrLocal ? React.createElement(Image, { testID: 'Image-1', source: { uri: uri }, resizeMode: 'cover', style: props.style, componentId: props.componentId }) :
      uri ? React.createElement(Image, { testID: 'Image-1-static', source: { uri: uri }, resizeMode: 'cover', style: props.style, componentId: props.componentId }) :
      React.createElement(View, { testID: 'View-1', style: [props.style, styles.imageFallback], componentId: props.componentId + '-placeholder' },
        React.createElement(Ionicons, { testID: 'Ionicons-1', name: 'restaurant-outline', size: 30, color: textSecondary }));
  };
  var Header = function(props) {
    return React.createElement(View, { testID: 'View-2', style: styles.header, componentId: props.id + '-header' },
      props.back ? React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-1', style: styles.backButton, onPress: props.back, componentId: props.id + '-back' },
        React.createElement(Ionicons, { testID: 'Ionicons-2', name: 'chevron-back', size: 24, color: textPrimary })) : null,
      React.createElement(Text, { testID: 'Text-1', style: styles.headerTitle, numberOfLines: 1, componentId: props.id + '-title' }, props.title),
      props.action || null);
  };
  var PrimaryButton = function(props) {
    return React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-2', style: [styles.primaryButton, props.style], onPress: props.onPress, disabled: props.disabled, componentId: props.id },
      props.icon ? React.createElement(Ionicons, { testID: 'Ionicons-3', name: props.icon, size: 22, color: onAccentColor }) : null,
      React.createElement(Text, { testID: 'Text-2', style: styles.primaryButtonText, componentId: props.id + '-label' }, props.label));
  };
  var LanguageSwitch = function() {
    var context = useTheme();
    return React.createElement(View, { testID: 'View-3', style: styles.languageSwitch, componentId: 'language-switch' },
      ['RU', 'EN'].map(function(code) {
        return React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-3',
          key: code, style: [styles.languageOption, context.language === code ? styles.languageOptionActive : null],
          onPress: function() { context.setLanguage(code); }, componentId: 'language-switch-' + code.toLowerCase()
        }, React.createElement(Text, { testID: 'Text-3', style: [styles.languageLabel, context.language === code ? styles.languageLabelActive : null], componentId: 'language-switch-label-' + code.toLowerCase() }, code));
      }));
  };
  var RecipeStepHint = function(props) {
    var openState = React.useState(false);
    var visible = openState[0];
    var setVisible = openState[1];
    var uri = props.stepPhoto || getDishImage({ dish_name: props.dishName });
    return React.createElement(View, { testID: 'View-4', style: styles.stepRow, componentId: props.id + '-row' },
      React.createElement(View, { testID: 'View-5', style: styles.stepNumber, componentId: props.id + '-number' },
        React.createElement(Text, { testID: 'Text-4', style: styles.medium, componentId: props.id + '-number-text' }, String(props.index + 1))),
      React.createElement(Text, { testID: 'Text-5', style: styles.stepText, componentId: props.id + '-text' }, props.step),
      React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-4', style: styles.questionButton, onPress: function() { setVisible(true); }, accessibilityLabel: 'Visual hint', componentId: props.id + '-question' },
        React.createElement(Text, { testID: 'Text-6', style: styles.questionMark, componentId: props.id + '-question-mark' }, '?')),
      React.createElement(Modal, { testID: 'Modal-1', visible: visible, transparent: true, animationType: 'fade', onRequestClose: function() { setVisible(false); } },
        React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-ModalBackdrop', style: styles.modalBackdrop, activeOpacity: 1, onPress: function() { setVisible(false); }, componentId: props.id + '-backdrop' },
          React.createElement(View, { testID: 'View-7', style: styles.hintModal, onStartShouldSetResponder: function() { return true; }, componentId: props.id + '-modal' },
            React.createElement(View, { testID: 'View-8', style: styles.modalHeader, componentId: props.id + '-modal-header' },
              React.createElement(Text, { testID: 'Text-7', style: styles.sectionTitle, componentId: props.id + '-modal-title' }, 'Visual hint'),
              React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-5', onPress: function() { setVisible(false); }, componentId: props.id + '-modal-close' },
                React.createElement(Ionicons, { testID: 'Ionicons-4', name: 'close-circle-outline', size: 28, color: textSecondary }))),
            uri ? React.createElement(Image, { testID: 'Image-2', source: { uri: uri }, style: styles.hintModalImage, resizeMode: 'cover', componentId: props.id + '-hint-image' }) :
              React.createElement(View, { testID: 'View-9', style: styles.hintModalEmpty, componentId: props.id + '-hint-empty' },
                React.createElement(Ionicons, { testID: 'Ionicons-5', name: 'restaurant-outline', size: 40, color: accentColor })),
            React.createElement(Text, { testID: 'Text-8', style: styles.bodyMuted, componentId: props.id + '-hint-caption' }, props.step)))));
  };
  // @end:shared-components

  var FOOD_TAGS = ['Fish', 'Chicken', 'Beef', 'Veal'];
  var PLACE_TAGS = ['Restaurant', 'Cafe'];
  var SEARCH_PAIRS = [
    ['salmon', 'лосос'], ['steak', 'стейк'], ['vegetable', 'овощ'], ['pasta', 'паста'],
    ['carbonara', 'карбонар'], ['siberian', 'сибирск'], ['pelmeni', 'пельмен'],
    ['chicken', 'куриц'], ['beef', 'говядин'], ['veal', 'телятин'], ['fish', 'рыб'],
    ['cafe', 'кафе'], ['restaurant', 'ресторан'], ['spaghetti', 'спагетти'], ['bacon', 'бекон']
  ];
  var foldSearch = function(value) { return String(value || '').toLowerCase().replace(/ё/g, 'е').trim(); };
  var expandSearch = function(text) {
    var base = foldSearch(text);
    var extra = [base];
    SEARCH_PAIRS.forEach(function(pair) {
      if (base.indexOf(pair[0]) >= 0) extra.push(pair[1]);
      if (base.indexOf(pair[1]) >= 0) extra.push(pair[0]);
    });
    return extra.join(' ');
  };
  var matchesQuery = function(query, text) {
    var needle = foldSearch(query);
    if (!needle) return true;
    var haystack = expandSearch(text);
    if (haystack.indexOf(needle) >= 0) return true;
    return expandSearch(needle).split(' ').some(function(part) { return part && haystack.indexOf(part) >= 0; });
  };
  var collectPhotoUris = function(result) {
    var list = [];
    var push = function(value) {
      if (!value) return;
      if (typeof value === 'string') list.push(value);
      else if (value.uri) list.push(value.uri);
    };
    if (!result) return [];
    if (Array.isArray(result)) result.forEach(push);
    else {
      push(result);
      ['assets', 'images', 'uris', 'photos'].forEach(function(key) {
        if (Array.isArray(result[key])) result[key].forEach(push);
      });
    }
    var unique = [];
    list.forEach(function(uri) { if (unique.indexOf(uri) < 0) unique.push(uri); });
    return unique.slice(0, 10);
  };
  var pickGalleryPhotos = function(camera) {
    var options = { allowsMultipleSelection: true, selectionLimit: 10, multiple: true, limit: 10, maxFiles: 10 };
    var call = function(method, args) {
      try {
        var pending = method.apply(camera, args);
        return pending && pending.then ? pending : Promise.resolve(pending);
      } catch (err) { return Promise.reject(err); }
    };
    var method = camera && (camera.pickImages || camera.pickMultipleImages || camera.pickImage);
    if (!method) return Promise.resolve([]);
    return call(method, [options]).then(collectPhotoUris).catch(function() {
      if (!camera.pickImage) return [];
      if (method === camera.pickImage) return call(camera.pickImage, []).then(collectPhotoUris);
      return call(camera.pickImage, [options]).then(collectPhotoUris).catch(function() { return call(camera.pickImage, []).then(collectPhotoUris); });
    });
  };
  var capturePhoto = function(camera, extra) {
    var payload = Object.assign({
      locale: 'ru', language: 'ru',
      retakeLabel: 'Переснять', usePhotoLabel: 'Использовать', cancelLabel: 'Отмена',
      retakeText: 'Переснять', confirmText: 'Использовать', cancelText: 'Отмена',
      labels: { retake: 'Переснять', usePhoto: 'Использовать', use: 'Использовать', cancel: 'Отмена' }
    }, extra || {});
    if (!camera || !camera.takePhoto) return Promise.reject(new Error('Camera is unavailable.'));
    var asPromise = function(pending) {
      return pending && pending.then ? pending : Promise.resolve(pending);
    };
    try {
      return asPromise(camera.takePhoto(payload));
    } catch (err) {
      try { return asPromise(camera.takePhoto()); }
      catch (fallbackErr) { return Promise.reject(fallbackErr); }
    }
  };
  var collectDishIssues = function(name, price, ingredients, steps) {
    var issues = {};
    if (!String(name || '').trim()) issues.name = true;
    if (!String(price || '').trim()) issues.price = true;
    var rows = ingredients || [];
    var complete = false;
    var partial = false;
    rows.forEach(function(item, index) {
      var hasName = !!String(item && item.name || '').trim();
      var hasAmount = !!String(item && item.amount || '').trim();
      if (!hasName && !hasAmount) return;
      partial = true;
      if (!hasName) issues['ing-' + index + '-name'] = true;
      if (!hasAmount) issues['ing-' + index + '-amount'] = true;
      if (hasName && hasAmount) complete = true;
    });
    if (!complete && !partial) {
      issues['ing-0-name'] = true;
      issues['ing-0-amount'] = true;
    }
    var stepList = steps && steps.length ? steps : [{ text: '' }];
    var stepOk = stepList.some(function(step) { return !!String(step && step.text || '').trim(); });
    if (!stepOk) stepList.forEach(function(step, index) {
      if (!String(step && step.text || '').trim()) issues['step-' + index] = true;
    });
    return issues;
  };
  var useInvalidFields = function() {
    var invalidState = React.useState({});
    var blinkState = React.useState(true);
    var invalid = invalidState[0];
    var setInvalid = invalidState[1];
    var blink = blinkState[0];
    var active = Object.keys(invalid).length > 0;
    React.useEffect(function() {
      if (!active) return undefined;
      var timer = setInterval(function() { blinkState[1](function(value) { return !value; }); }, 480);
      return function() { clearInterval(timer); };
    }, [active]);
    return {
      setInvalid: setInvalid,
      hot: function(key, empty) { return !!invalid[key] && !!empty && blink; }
    };
  };
  var SwipeRow = function(props) {
    var translate = React.useRef(new Animated.Value(0)).current;
    var openRef = React.useRef(false);
    var offsetRef = React.useRef(0);
    var rowIdRef = React.useRef(props.rowId);
    var setActiveRef = React.useRef(props.setActiveId);
    var onDeleteRef = React.useRef(props.onDelete);
    rowIdRef.current = props.rowId;
    setActiveRef.current = props.setActiveId;
    onDeleteRef.current = props.onDelete;
    var settle = function(open) {
      openRef.current = open;
      offsetRef.current = open ? -92 : 0;
      if (open && setActiveRef.current) setActiveRef.current(rowIdRef.current);
      Animated.spring(translate, { toValue: open ? -92 : 0, useNativeDriver: false, friction: 8, tension: 90 }).start();
    };
    React.useEffect(function() {
      if (props.activeId !== props.rowId && openRef.current) settle(false);
    }, [props.activeId, props.rowId]);
    var claimSwipe = function(_, gesture) {
      if (Math.abs(gesture.dx) < 16 || Math.abs(gesture.dx) < Math.abs(gesture.dy) * 1.7) return false;
      if (openRef.current) return true;
      return gesture.dx < 0;
    };
    var responder = React.useRef(PanResponder.create({
      onMoveShouldSetPanResponder: claimSwipe,
      onMoveShouldSetPanResponderCapture: claimSwipe,
      onPanResponderGrant: function() {
        if (translate.stopAnimation) translate.stopAnimation();
        offsetRef.current = openRef.current ? -92 : 0;
        if (setActiveRef.current) setActiveRef.current(rowIdRef.current);
      },
      onPanResponderMove: function(_, gesture) {
        var next = offsetRef.current + gesture.dx;
        if (next > 0) next = 0;
        if (next < -104) next = -104;
        translate.setValue(next);
      },
      onPanResponderRelease: function(_, gesture) {
        var next = offsetRef.current + gesture.dx;
        var shouldOpen = gesture.vx > 0.45 ? false : gesture.vx < -0.45 ? true : next < -46;
        settle(shouldOpen);
      },
      onPanResponderTerminate: function() { settle(false); }
    })).current;
    var deleteOpacity = translate.interpolate({ inputRange: [-92, -28, 0], outputRange: [1, 0, 0], extrapolate: 'clamp' });
    var child = React.Children.only(props.children);
    var childProps = child.props || {};
    var front = React.cloneElement(child, {
      activeOpacity: 1,
      style: [childProps.style, styles.swipeFront],
      onPress: function() {
        if (openRef.current) { settle(false); if (setActiveRef.current) setActiveRef.current(null); return; }
        if (setActiveRef.current) setActiveRef.current(null);
        if (childProps.onPress) childProps.onPress();
      }
    });
    return React.createElement(View, { style: styles.swipeShell },
      React.createElement(Animated.View, { style: [styles.swipeDelete, { opacity: deleteOpacity }], pointerEvents: 'box-none' },
        React.createElement(TouchableOpacity, { style: styles.swipeDeleteHit, activeOpacity: 0.85, onPress: function() { if (onDeleteRef.current) onDeleteRef.current(); } },
          React.createElement(Ionicons, { name: 'trash-outline', size: 18, color: '#FFFFFF' }),
          React.createElement(Text, { style: styles.swipeDeleteText }, 'Удалить'))),
      React.createElement(Animated.View, Object.assign({ style: [styles.swipeFront, { transform: [{ translateX: translate }] }] }, responder.panHandlers), front));
  };
  var TagGroup = function(props) {
    return React.createElement(View, { style: { marginTop: 8 } },
      React.createElement(Text, { style: styles.fieldLabel }, props.label),
      props.hint ? React.createElement(Text, { style: styles.smallMuted }, props.hint) : null,
      React.createElement(View, { style: styles.tagWrap },
        props.tags.map(function(tag) {
          var active = (props.selected || []).indexOf(tag) >= 0;
          return React.createElement(TouchableOpacity, { key: tag, style: [styles.tagChip, active ? styles.tagChipActive : null], onPress: function() { props.onToggle(tag); } },
            React.createElement(Text, { style: [styles.tagChipText, active ? styles.tagChipTextActive : null] }, tag));
        })));
  };
  var renderTagGroups = function(selected, setSelected) {
    var toggle = function(tag) {
      setSelected(function(prev) {
        var list = prev || [];
        if (list.indexOf(tag) >= 0) return list.filter(function(item) { return item !== tag; });
        return list.concat([tag]);
      });
    };
    return React.createElement(View, null,
      React.createElement(TagGroup, { label: 'Категории', hint: 'Ресторан или кафе', tags: PLACE_TAGS, selected: selected, onToggle: toggle }),
      React.createElement(TagGroup, { label: 'Теги', hint: 'Рыба, мясо и другое', tags: FOOD_TAGS, selected: selected, onToggle: toggle }));
  };
  // @section:HomeScreen @depends:[ThemeContext,shared-components,styles]
  var HomeScreen = function(props) {
    var insets = useSafeAreaInsets();
    var query = useQuery('dishes');
    var budgetStore = useStorage('dinner-budget', DEFAULT_BUDGET);
    var budget = budgetStore[0]?.amount ?? 2000;
    var setBudget = budgetStore[1];
    var context = useTheme();

    var filterStore = useStorage('dinner-filter-states', {});
    var filterStates = filterStore[0] || {};

    var filterModalState = React.useState(false);
    var filterModal = filterModalState[0], setFilterModal = filterModalState[1];

    var pickedState = React.useState(null);
    var picked = pickedState[0], setPicked = pickedState[1];
    var spinningState = React.useState(false);
    var spinning = spinningState[0], setSpinning = spinningState[1];
    var spinRef = React.useRef(null);
    var rows = query.data;
    var budgetMax = 5000;
    (rows || []).forEach(function(dish) {
      var price = Number(dish && dish.price_rubles);
      if (price > budgetMax) budgetMax = Math.ceil(price / 1000) * 1000;
    });
    var budgetStep = Math.max(50, Math.round(budgetMax / 100));

    var eligible = rows.filter(function(dish) {
      var priceOk = Number(dish?.price_rubles || 0) <= budget;
      if (!priceOk) return false;
      var dishTags = dish?.tags || [];
      for (var tag in filterStates) {
        var state = filterStates[tag];
        if (state === 'include') {
          if (!dishTags.includes(tag)) return false;
        } else if (state === 'exclude') {
          if (dishTags.includes(tag)) return false;
        }
      }
      return true;
    });

    var current = rows.find(function(dish) { return dish?.id === picked; }) || eligible[0] || rows[0] || null;
    
    var historyStore = useStorage('dinner-history', []);
    var history = historyStore[0] || [];
    var setHistory = historyStore[1];

    React.useEffect(function() { return function() { if (spinRef.current) clearInterval(spinRef.current); }; }, []);
    React.useEffect(function() {
      if (budget > budgetMax) setBudget({ amount: budgetMax });
    }, [budget, budgetMax]);
    
    var countText = context.language === 'RU' ? 'Подходит по бюджету: ' + eligible.length + ' ' +
      (eligible.length % 10 === 1 && eligible.length % 100 !== 11 ? 'блюдо' :
        eligible.length % 10 >= 2 && eligible.length % 10 <= 4 && (eligible.length % 100 < 12 || eligible.length % 100 > 14) ? 'блюда' : 'блюд') :
      'Matching dishes: ' + eligible.length;

    var spin = function() {
      if (spinning) return;
      if (!eligible.length) { props.navigation.navigate('SpinResult', { dishId: null, budget: budget }); return; }
      setSpinning(true);
      var ticks = 0;
      spinRef.current = setInterval(function() {
        var nextIndex = Math.floor(Math.random() * eligible.length);
        setPicked(eligible[nextIndex]?.id || null);
        ticks += 1;
        if (ticks >= 18) {
          clearInterval(spinRef.current);
          spinRef.current = null;
          var choice = eligible[Math.floor(Math.random() * eligible.length)];
          setPicked(choice?.id || null);
          setSpinning(false);
          
          var newRecord = {
            id: choice.id || String(Date.now()),
            dish_name: choice.dish_name,
            price_rubles: choice.price_rubles,
            photo_uri: getDishImage(choice),
            dateStr: new Date().toLocaleString()
          };
          setHistory([newRecord].concat(history.slice(0, 19)));

          props.navigation.navigate('SpinResult', { dishId: choice?.id || null, budget: budget });
        }
      }, 95);
    };

    var cycleFilter = function(tag) {
      filterStore[1](function(prev) {
        var copy = Object.assign({}, prev);
        if (!copy[tag]) copy[tag] = 'include';
        else if (copy[tag] === 'include') copy[tag] = 'exclude';
        else delete copy[tag];
        return copy;
      });
    };
    var renderFilterGroup = function(title, hint, tags) {
      return React.createElement(View, { style: { marginTop: 18 } },
        React.createElement(Text, { style: styles.sectionTitle }, title),
        React.createElement(Text, { style: styles.smallMuted }, hint),
        React.createElement(View, { style: styles.tagWrap },
          tags.map(function(tag) {
            var state = filterStates[tag];
            var chipStyle = state === 'include' ? styles.tagChipActive : state === 'exclude' ? styles.tagChipExclude : null;
            var textStyle = state === 'include' ? styles.tagChipTextActive : state === 'exclude' ? styles.tagChipTextExclude : null;
            return React.createElement(TouchableOpacity, { key: tag, style: [styles.tagChip, chipStyle], onPress: function() { cycleFilter(tag); } },
              React.createElement(Text, { style: [styles.tagChipText, textStyle] }, tag));
          })));
    };

    return React.createElement(View, { testID: 'View-10', style: styles.screen, componentId: 'home-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-1', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { testID: 'View-11', style: [styles.tabScreen, { paddingTop: insets.top, paddingBottom: TAB_MENU_HEIGHT + insets.bottom + 8 }], componentId: 'home-content' },
        React.createElement(Header, { testID: 'Header-1', id: 'home', title: 'Dinner Spin', action: React.createElement(View, { testID: 'View-12', style: styles.homeHeaderActions, componentId: 'home-actions' },
          React.createElement(LanguageSwitch),
          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-Filter', style: styles.iconAction, onPress: function() { setFilterModal(true); }, componentId: 'home-filter' },
            React.createElement(Ionicons, { testID: 'Ionicons-Filter', name: 'filter-outline', size: 24, color: textSecondary })),
          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-History', style: styles.iconAction, onPress: function() { props.navigation.navigate('History'); }, componentId: 'home-history' },
            React.createElement(Ionicons, { testID: 'Ionicons-History', name: 'time-outline', size: 24, color: textSecondary })) ) }),
        
        !rows.length ? React.createElement(View, { testID: 'View-13', style: styles.emptyCard, componentId: 'home-empty' },
          React.createElement(Text, { testID: 'Text-9', style: styles.title, componentId: 'home-empty-title' }, 'Tonight’s choice starts here'),
          React.createElement(Text, { testID: 'Text-10', style: styles.bodyMuted, componentId: 'home-empty-copy' }, 'Add a dish to your recipes, then spin for dinner.'),
          React.createElement(PrimaryButton, { testID: 'PrimaryButton-1', id: 'home-open-recipes', label: 'Open Recipes', onPress: function() { props.navigation.navigate('Recipes'); } })) :
          React.createElement(View, { testID: 'View-14', style: { flex: 1, justifyContent: 'space-between' }, componentId: 'home-picker-content' },
            React.createElement(View, { testID: 'View-15', style: styles.dinnerCard, componentId: 'home-dinner-card' },
              React.createElement(DishImage, { testID: 'DishImage-1', dish: current, style: styles.heroImage, componentId: 'home-dish-image' }),
              React.createElement(View, { testID: 'View-16', style: styles.dinnerCopy, componentId: 'home-dish-copy' },
                React.createElement(Text, { testID: 'Text-11', style: styles.overline, componentId: 'home-overline' }, 'TONIGHT’С PICK'),
                React.createElement(Text, { testID: 'Text-12', style: styles.title, numberOfLines: 1, componentId: 'home-dish-name' }, current?.dish_name || 'Choose a dish'),
                React.createElement(Text, { testID: 'Text-13', style: styles.bodyMuted, componentId: 'home-dish-meta' },
                  formatPrice(current?.price_rubles) + ' ' + context.translate('estimated') + ' · ' + dishDetails(current).minutes + ' ' + context.translate('min')))),
            
            // Горизонтальный слайдер бюджета
            React.createElement(View, { testID: 'View-17', style: styles.budgetCard, componentId: 'home-budget-card' },
              React.createElement(View, { testID: 'View-18', style: styles.budgetTop, componentId: 'home-budget-top' },
                React.createElement(Text, { testID: 'Text-14', style: styles.secondary, componentId: 'home-budget-label' }, 'Dinner budget'),
                React.createElement(Text, { testID: 'Text-15', style: styles.title, componentId: 'home-budget-value' }, formatPrice(budget))),
              React.createElement(Slider, { testID: 'Slider-1', style: { height: 32, width: '100%' }, minimumValue: 300, maximumValue: budgetMax, step: budgetStep, value: Math.min(Math.max(budget, 300), budgetMax),
                minimumTrackTintColor: accentColor, maximumTrackTintColor: borderColor, thumbTintColor: textPrimary,
                onValueChange: function(value) { setBudget({ amount: value }); },
                componentId: 'home-budget-slider' }),
              React.createElement(Text, { testID: 'Text-16', style: styles.smallMuted, componentId: 'home-fit-count' }, countText)),

            rows.length ? React.createElement(View, { testID: 'View-19', style: styles.pinnedAction, componentId: 'home-pinned-action' },
              React.createElement(PrimaryButton, { testID: 'PrimaryButton-2', id: 'home-spin', icon: 'dice-outline', label: spinning ? 'SPINNING…' : 'SPIN DISH', onPress: spin, disabled: spinning })) : null
          )),

      React.createElement(Modal, { visible: filterModal, transparent: true, animationType: 'fade', onRequestClose: function() { setFilterModal(false); } },
        React.createElement(View, { style: styles.sheetBackdrop },
          React.createElement(TouchableOpacity, { style: { flex: 1 }, activeOpacity: 1, onPress: function() { setFilterModal(false); } }),
          React.createElement(View, { style: styles.filterSheet },
            React.createElement(View, { style: styles.sheetHandle }),
            React.createElement(Text, { style: styles.sectionTitle }, 'Фильтр'),
            React.createElement(Text, { style: styles.smallMuted }, 'Один раз — оставить в выборе. Второй — убрать. Третий — сбросить.'),
            renderFilterGroup('Где', 'Ресторан или кафе', PLACE_TAGS),
            renderFilterGroup('Блюдо', 'Рыба, мясо и другое', FOOD_TAGS),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginTop: 22 }], onPress: function() { setFilterModal(false); } },
              React.createElement(Text, { style: styles.primaryButtonText }, 'Готово'))
          )
        )
      )
    );
  };
  // @end:HomeScreen

  // @section:RecipesScreen @depends:[ThemeContext,shared-components,styles]
  var RecipesScreen = function(props) {
    var insets = useSafeAreaInsets();
    var query = useQuery('dishes');
    var context = useTheme();
    return React.createElement(View, { testID: 'View-20', style: [styles.screen, { paddingTop: insets.top }], componentId: 'recipes-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-Recipes', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { testID: 'View-21', style: styles.tabScreen, componentId: 'recipes-content' },
        React.createElement(Header, { testID: 'Header-2', id: 'recipes', title: 'Recipes', action: React.createElement(View, { testID: 'View-RecipesActions', style: styles.homeHeaderActions },
          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-ManageMenu', style: styles.iconAction, onPress: function() { props.navigation.navigate('MenuManager'); }, componentId: 'recipes-manage' },
            React.createElement(Ionicons, { testID: 'Ionicons-Gear', name: 'settings-outline', size: 24, color: textSecondary }))
        ) }),
        !query.data.length ? React.createElement(View, { testID: 'View-22', style: styles.centerEmpty, componentId: 'recipes-empty' },
          React.createElement(Text, { testID: 'Text-17', style: [styles.title, { fontSize: 22}], componentId: 'recipes-empty-title' }, 'Your saved recipes'),
          React.createElement(Text, { testID: 'Text-18', style: styles.bodyMuted, componentId: 'recipes-empty-copy' }, 'Add a dish to keep its recipe here.'),
          React.createElement(PrimaryButton, { testID: 'PrimaryButton-AddFirst', id: 'recipes-empty-add', label: 'Add dish', onPress: function() { props.navigation.navigate('MenuManager'); } })) :
          React.createElement(ScrollView, { testID: 'ScrollView-2', style: styles.flexScroll, contentContainerStyle: { paddingTop: 16, paddingBottom: TAB_MENU_HEIGHT + insets.bottom + SCROLL_EXTRA_PADDING }, componentId: 'recipes-list' },
            query.data.map(function(dish, index) {
              return React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-7', key: String(dish?.id || index), style: styles.recipeCard, onPress: function() { props.navigation.navigate('RecipeDetail', { dishId: dish?.id }); }, componentId: 'recipes-item-' + index },
                React.createElement(DishImage, { testID: 'DishImage-2', dish: dish, style: styles.recipeListImage, componentId: 'recipes-image-' + index }),
                React.createElement(View, { testID: 'View-23', style: styles.recipeListCopy, componentId: 'recipes-copy-' + index },
                  React.createElement(Text, { testID: 'Text-19', style: styles.medium, componentId: 'recipes-name-' + index }, dish?.dish_name || 'Untitled dish'),
                  React.createElement(Text, { testID: 'Text-20', style: styles.smallMuted, componentId: 'recipes-meta-' + index }, formatPrice(dish?.price_rubles) + ' · ' + dishDetails(dish).minutes + ' ' + context.translate('min')),
                  React.createElement(Text, { testID: 'Text-21', style: styles.link, componentId: 'recipes-action-' + index }, 'View recipe')));
            }))));
  };
  // @end:RecipesScreen

  // @section:MenuManagerScreen @depends:[ThemeContext,shared-components,styles]
  var MenuManagerScreen = function(props) {
    var insets = useSafeAreaInsets();
    var query = useQuery('dishes');
    var context = useTheme();
    var camera = useCamera();
    var removeDish = useMutation('dishes', 'delete');
    var searchState = React.useState('');
    var search = searchState[0], setSearch = searchState[1];
    var activeTabState = React.useState('recipes');
    var activeTab = activeTabState[0], setActiveTab = activeTabState[1];

    var placesStore = useStorage('dinner-places', []);
    var places = placesStore[0] || [];
    var setPlaces = placesStore[1];

    var placeModalState = React.useState(false);
    var placeModal = placeModalState[0], setPlaceModal = placeModalState[1];
    var editingPlaceState = React.useState(null);
    var editingPlace = editingPlaceState[0], setEditingPlace = editingPlaceState[1];
    var pNameState = React.useState('');
    var pAddressState = React.useState('');
    var pDescState = React.useState('');
    var pPhotosState = React.useState([]);
    var placePhotosNow = pPhotosState[0] || [];
    var activeSwipeState = React.useState(null);
    var activeSwipe = activeSwipeState[0], setActiveSwipe = activeSwipeState[1];
    var galleryOpenState = React.useState(false);
    var galleryOpen = galleryOpenState[0], setGalleryOpen = galleryOpenState[1];
    var galleryDraftState = React.useState([]);
    var galleryDraft = galleryDraftState[0], setGalleryDraft = galleryDraftState[1];
    var galleryDraftRef = React.useRef([]);
    var shotState = React.useState('');
    var shotUri = shotState[0], setShotUri = shotState[1];
    var closeSwipes = function() { setActiveSwipe(null); };
    var scrollYRef = React.useRef(0);
    var onListScroll = function(event) {
      var y = event.nativeEvent.contentOffset.y;
      if (Math.abs(y - scrollYRef.current) > 6) closeSwipes();
      scrollYRef.current = y;
    };

    var openPlaceEditor = function(index) {
      if (index === null || index === undefined) {
        setEditingPlace(null);
        pNameState[1]('');
        pAddressState[1]('');
        pDescState[1]('');
        pPhotosState[1]([]);
      } else {
        var place = places[index] || {};
        setEditingPlace(index);
        pNameState[1](place.name || '');
        pAddressState[1](place.address || '');
        pDescState[1](place.desc || '');
        pPhotosState[1](placePhotos(place));
      }
      setShotUri('');
      setGalleryOpen(false);
      galleryDraftRef.current = [];
      setGalleryDraft([]);
      setPlaceModal(true);
    };
    var appendPlacePhoto = function(uri) {
      if (!uri) return;
      pPhotosState[1](function(prev) {
        var next = [].concat(prev || []);
        if (next.length >= 10 || next.indexOf(uri) >= 0) return next;
        next.push(uri);
        return next;
      });
    };
    var rememberDraft = function(list) {
      galleryDraftRef.current = list;
      setGalleryDraft(list.slice());
    };
    var absorbDraft = function(uris) {
      var next = galleryDraftRef.current.slice();
      (uris || []).forEach(function(uri) {
        if (uri && next.length < 10 && next.indexOf(uri) < 0) next.push(uri);
      });
      rememberDraft(next);
      return next;
    };
    var cancelGallery = function() {
      rememberDraft([]);
      setGalleryOpen(false);
    };
    var commitGallery = function() {
      galleryDraftRef.current.forEach(appendPlacePhoto);
      cancelGallery();
    };
    var pickMoreGallery = function() {
      if (galleryDraftRef.current.length >= 10) return;
      pickGalleryPhotos(camera).then(function(uris) {
        absorbDraft(uris);
        setGalleryOpen(true);
      }).catch(function() { setGalleryOpen(galleryDraftRef.current.length > 0); });
    };
    var startGallery = function() {
      rememberDraft([]);
      pickGalleryPhotos(camera).then(function(uris) {
        var next = absorbDraft(uris);
        if (next.length) setGalleryOpen(true);
      }).catch(function() {});
    };
    var shootPlace = function() {
      capturePhoto(camera, { skipConfirmation: true, skipPreview: true, preview: false }).then(function(res) {
        var uri = collectPhotoUris(res)[0] || '';
        if (uri) setShotUri(uri);
      }).catch(function() {});
    };
    var addPlacePhoto = function() {
      Alert.alert('Фото заведения', 'Сначала отметьте фото, затем нажмите «Использовать». Можно добавить до 10.', [
        { text: 'Сделать фото', onPress: shootPlace },
        { text: 'Выбрать из галереи', onPress: startGallery },
        { text: 'Отмена', style: 'cancel' }
      ]);
    };
    var savePlace = function() {
      var next = {
        name: String(pNameState[0] || '').trim(),
        address: String(pAddressState[0] || '').trim(),
        desc: String(pDescState[0] || '').trim(),
        photos: placePhotosNow.filter(Boolean)
      };
      if (!next.name) {
        Alert.alert('Название', 'Укажите название заведения.');
        return;
      }
      setPlaces(function(prev) {
        var list = prev || [];
        if (editingPlace === null || editingPlace === undefined) return list.concat([next]);
        return list.map(function(place, i) { return i === editingPlace ? next : place; });
      });
      setPlaceModal(false);
    };
    var deletePlace = function() {
      if (editingPlace === null || editingPlace === undefined) return;
      var action = function() {
        setPlaces(function(prev) { return (prev || []).filter(function(_, i) { return i !== editingPlace; }); });
        setPlaceModal(false);
      };
      if (Platform.OS === 'web') { if (window.confirm('Удалить это заведение?')) action(); }
      else Alert.alert('Удалить заведение', 'Удалить это заведение из списка?', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: action }
      ]);
    };
    var removePlaceAt = function(index) {
      var action = function() { setPlaces(function(prev) { return (prev || []).filter(function(_, i) { return i !== index; }); }); };
      if (Platform.OS === 'web') { if (window.confirm('Удалить это заведение?')) action(); }
      else Alert.alert('Удалить заведение', 'Удалить это заведение из списка?', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: action }
      ]);
    };
    var confirmRemoveDish = function(dishId) {
      var action = function() { removeDish.mutate({ id: dishId }); };
      if (Platform.OS === 'web') { if (window.confirm('Удалить это блюдо из меню?')) action(); }
      else Alert.alert('Удалить блюдо', 'Удалить это блюдо из меню?', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: action }
      ]);
    };
    var searchBar = function(onAdd) {
      return React.createElement(View, { style: styles.searchRow },
        React.createElement(TextInput, { style: styles.searchInput, value: search, onChangeText: setSearch, placeholder: 'Поиск по названию', autoCapitalize: 'none', autoCorrect: false }),
        React.createElement(TouchableOpacity, { style: styles.searchAdd, onPress: onAdd, accessibilityLabel: 'Добавить' },
          React.createElement(Ionicons, { name: 'add', size: 26, color: onAccentColor })));
    };

    return React.createElement(View, { testID: 'View-MenuManager', style: [styles.screen, { paddingTop: insets.top }], componentId: 'menu-manager-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-MenuMgr', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { testID: 'View-MenuMgrContent', style: styles.tabScreen, componentId: 'menu-manager-content' },
        React.createElement(Header, { testID: 'Header-MenuMgr', id: 'menu-mgr', title: 'Recipes & Places', back: function() { props.navigation.goBack(); } }),

        React.createElement(View, { style: styles.topSubTabs },
          React.createElement(TouchableOpacity, { style: [styles.subTabBtn, activeTab === 'recipes' ? styles.subTabBtnActive : null], onPress: function() { setActiveTab('recipes'); setSearch(''); closeSwipes(); } },
            React.createElement(Text, { style: [styles.medium, activeTab === 'recipes' ? { color: onAccentColor } : null] }, 'Рецепты')),
          React.createElement(TouchableOpacity, { style: [styles.subTabBtn, activeTab === 'places' ? styles.subTabBtnActive : null], onPress: function() { setActiveTab('places'); setSearch(''); closeSwipes(); } },
            React.createElement(Text, { style: [styles.medium, activeTab === 'places' ? { color: onAccentColor } : null] }, 'Рестораны / Кафе'))
        ),

        activeTab === 'recipes' ? (
          React.createElement(View, { style: { flex: 1 } },
            searchBar(function() { props.navigation.navigate('DishEditor'); }),
            !(query.data || []).length ? React.createElement(View, { testID: 'View-MenuEmpty', style: styles.centerEmpty, componentId: 'menu-mgr-empty' },
              React.createElement(Text, { testID: 'Text-EmptyTitle', style: styles.title }, 'Your dinner menu starts here'),
              React.createElement(Text, { style: styles.bodyMuted }, 'Add a dish to keep its price and recipe close at hand.')) :
            React.createElement(ScrollView, { testID: 'ScrollView-MenuMgr', style: styles.flexScroll, contentContainerStyle: { paddingBottom: insets.bottom + SCROLL_EXTRA_PADDING }, onScroll: onListScroll, onScrollBeginDrag: closeSwipes, scrollEventThrottle: 16, keyboardShouldPersistTaps: 'handled', componentId: 'menu-mgr-list' },
              (query.data || []).filter(function(dish) { return matchesQuery(search, dish && dish.dish_name); }).length ? null :
                React.createElement(Text, { style: [styles.bodyMuted, { textAlign: 'center', marginTop: 24 }] }, 'Ничего не найдено'),
              (query.data || []).map(function(dish, index) {
                if (!matchesQuery(search, dish && dish.dish_name)) return null;
                var details = dishDetails(dish);
                return React.createElement(SwipeRow, { key: String(dish?.id || index), rowId: 'dish-' + String(dish?.id || index), activeId: activeSwipe, setActiveId: setActiveSwipe, onDelete: function() { confirmRemoveDish(dish?.id); } },
                  React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-MenuRow', style: [styles.menuRow, { marginBottom: 0 }], onPress: function() { props.navigation.navigate('DishDetail', { dishId: dish?.id }); }, componentId: 'menu-mgr-item-' + index },
                    React.createElement(DishImage, { testID: 'DishImage-MenuMgr', dish: dish, style: styles.menuImage, componentId: 'menu-mgr-image-' + index }),
                    React.createElement(View, { testID: 'View-MenuInfo', style: styles.menuInfo, componentId: 'menu-mgr-info-' + index },
                      React.createElement(Text, { testID: 'Text-MenuName', style: styles.medium }, dish?.dish_name || 'Untitled dish'),
                      React.createElement(Text, { testID: 'Text-MenuPrice', style: styles.medium }, formatPrice(dish?.price_rubles)),
                      React.createElement(Text, { testID: 'Text-MenuKind', style: styles.smallMuted }, context.translate(details.kind) + ' · ' + details.minutes + ' ' + context.translate('min')))));
              }))
          )
        ) : (
          React.createElement(View, { style: { flex: 1 } },
            searchBar(function() { openPlaceEditor(null); }),
            !places.length ? React.createElement(View, { style: styles.centerEmpty },
              React.createElement(Text, { style: styles.title }, 'Нет добавленных кафе или ресторанов')) :
              React.createElement(ScrollView, { style: styles.flexScroll, contentContainerStyle: { paddingBottom: insets.bottom + SCROLL_EXTRA_PADDING }, onScroll: onListScroll, onScrollBeginDrag: closeSwipes, scrollEventThrottle: 16, keyboardShouldPersistTaps: 'handled' },
                places.some(function(place) { return matchesQuery(search, place && place.name); }) ? null :
                  React.createElement(Text, { style: [styles.bodyMuted, { textAlign: 'center', marginTop: 24 }] }, 'Ничего не найдено'),
                places.map(function(place, idx) {
                  if (!matchesQuery(search, place && place.name)) return null;
                  var photos = placePhotos(place);
                  var photoNote = photos.length > 1 ? photos.length + ' фото' : '';
                  var placeMeta = [place.desc, photoNote].filter(Boolean).join(' · ');
                  return React.createElement(SwipeRow, { key: 'place-' + idx, rowId: 'place-' + idx, activeId: activeSwipe, setActiveId: setActiveSwipe, onDelete: function() { removePlaceAt(idx); } },
                    React.createElement(TouchableOpacity, { style: [styles.menuRow, { marginBottom: 0 }], onPress: function() { openPlaceEditor(idx); } },
                      photos[0] ? React.createElement(Image, { source: { uri: photos[0] }, style: styles.menuImage, resizeMode: 'cover' }) :
                        React.createElement(View, { style: [styles.menuImage, styles.imageFallback] }, React.createElement(Ionicons, { name: 'restaurant-outline', size: 24, color: textSecondary })),
                      React.createElement(View, { style: styles.menuInfo },
                        React.createElement(Text, { style: styles.medium }, place.name),
                        React.createElement(Text, { style: styles.smallMuted }, place.address),
                        placeMeta ? React.createElement(Text, { style: styles.smallMuted }, placeMeta) : null
                      )
                    ));
                })
              )
          )
        ),

        React.createElement(Modal, { visible: placeModal, transparent: true, animationType: 'fade', onRequestClose: function() {
          if (shotUri) { setShotUri(''); return; }
          if (galleryOpen) { cancelGallery(); return; }
          setPlaceModal(false);
        } },
          React.createElement(View, { style: styles.modalBackdrop },
            React.createElement(View, { style: styles.placeModalCard },
              shotUri ? React.createElement(View, null,
                React.createElement(Text, { style: styles.sectionTitle }, 'Фото заведения'),
                React.createElement(Image, { source: { uri: shotUri }, style: styles.shotPreview, resizeMode: 'cover' }),
                React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginBottom: 8 }], onPress: function() { appendPlacePhoto(shotUri); setShotUri(''); } },
                  React.createElement(Text, { style: styles.primaryButtonText }, 'Использовать')),
                React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor, marginBottom: 8 }], onPress: shootPlace },
                  React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Переснять')),
                React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: function() { setShotUri(''); } },
                  React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Отмена'))
              ) : galleryOpen ? React.createElement(View, null,
                React.createElement(Text, { style: styles.sectionTitle }, 'Фото из галереи'),
                React.createElement(Text, { style: styles.smallMuted }, galleryDraft.length + ' из 10. После каждого снимка галерея закрывается — нажмите «Ещё фото», потом «Использовать».'),
                React.createElement(ScrollView, { style: styles.placeModalScroll, contentContainerStyle: { paddingBottom: 8 } },
                  React.createElement(View, { style: styles.placePhotoRow },
                    galleryDraft.map(function(uri, photoIndex) {
                      return React.createElement(View, { key: String(photoIndex), style: styles.placePhotoTile },
                        React.createElement(Image, { source: { uri: uri }, style: styles.placePhotoImage, resizeMode: 'cover' }),
                        React.createElement(TouchableOpacity, { style: styles.placePhotoRemove, onPress: function() {
                          rememberDraft(galleryDraftRef.current.filter(function(_, i) { return i !== photoIndex; }));
                        } },
                          React.createElement(Ionicons, { name: 'close', size: 14, color: textPrimary }))
                      );
                    })
                  )
                ),
                React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginTop: 12, marginBottom: 8, opacity: galleryDraft.length >= 10 ? 0.45 : 1 }], disabled: galleryDraft.length >= 10, onPress: pickMoreGallery },
                  React.createElement(Text, { style: styles.primaryButtonText }, 'Ещё фото')),
                React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginBottom: 8, opacity: galleryDraft.length ? 1 : 0.45 }], disabled: !galleryDraft.length, onPress: commitGallery },
                  React.createElement(Text, { style: styles.primaryButtonText }, 'Использовать')),
                React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: cancelGallery },
                  React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Отмена'))
              ) : React.createElement(View, null,
                React.createElement(Text, { style: styles.sectionTitle }, editingPlace === null || editingPlace === undefined ? 'Новое заведение' : 'Редактирование заведения'),
                React.createElement(ScrollView, { style: styles.placeModalScroll, contentContainerStyle: { paddingBottom: 8 } },
                  React.createElement(TextInput, { style: [styles.input, { width: '100%', marginBottom: 8 }], placeholder: 'Название кафе / ресторана', value: pNameState[0], onChangeText: pNameState[1] }),
                  React.createElement(TextInput, { style: [styles.input, { width: '100%', marginBottom: 8 }], placeholder: 'Адрес', value: pAddressState[0], onChangeText: pAddressState[1] }),
                  React.createElement(TextInput, { style: [styles.textArea, { width: '100%', marginBottom: 8, minHeight: 80 }], placeholder: 'Прайс, описание...', value: pDescState[0], onChangeText: pDescState[1], multiline: true }),
                  React.createElement(Text, { style: styles.fieldLabel }, 'Фотографии'),
                  React.createElement(Text, { style: styles.smallMuted }, 'До 10 фото. В галерее снимок выбирается по одному, затем «Использовать».'),
                  React.createElement(View, { style: styles.placePhotoRow },
                    placePhotosNow.map(function(uri, photoIndex) {
                      return React.createElement(View, { key: String(photoIndex), style: styles.placePhotoTile },
                        React.createElement(Image, { source: { uri: uri }, style: styles.placePhotoImage, resizeMode: 'cover' }),
                        React.createElement(TouchableOpacity, { style: styles.placePhotoRemove, onPress: function() {
                          pPhotosState[1](function(prev) { return (prev || []).filter(function(_, i) { return i !== photoIndex; }); });
                        } },
                          React.createElement(Ionicons, { name: 'close', size: 14, color: textPrimary }))
                      );
                    }),
                    placePhotosNow.length >= 10 ? null : React.createElement(TouchableOpacity, { style: styles.placePhotoAdd, onPress: addPlacePhoto },
                      React.createElement(Ionicons, { name: 'camera-outline', size: 22, color: accentColor }),
                      React.createElement(Text, { style: styles.smallMuted }, 'Добавить'))
                  )
                ),
                React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginTop: 12, marginBottom: 8 }], onPress: savePlace },
                  React.createElement(Text, { style: styles.primaryButtonText }, 'Сохранить')),
                editingPlace === null || editingPlace === undefined ? null : React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: '#E25B52', marginBottom: 8 }], onPress: deletePlace },
                  React.createElement(Text, { style: [styles.primaryButtonText, { color: '#FFF' }] }, 'Удалить заведение')),
                React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: function() { setPlaceModal(false); } },
                  React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Отмена'))
              )
            )
          )
        )
      ));
  };
  // @end:MenuManagerScreen

  // @section:HistoryScreen @depends:[ThemeContext,shared-components,styles]
  var HistoryScreen = function(props) {
    var insets = useSafeAreaInsets();
    var historyStore = useStorage('dinner-history', []);
    var history = historyStore[0] || [];
    var query = useQuery('dishes');

    return React.createElement(View, { testID: 'View-History', style: [styles.screen, { paddingTop: insets.top }], componentId: 'history-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-History', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { testID: 'View-HistoryContent', style: styles.tabScreen, componentId: 'history-content' },
        React.createElement(Header, { testID: 'Header-History', id: 'history', title: 'History', back: function() { props.navigation.goBack(); } }),
        !history.length ? React.createElement(View, { testID: 'View-HistoryEmpty', style: styles.centerEmpty, componentId: 'history-empty' },
          React.createElement(Text, { testID: 'Text-HistoryEmpty', style: styles.title }, 'No history yet')) :
          React.createElement(ScrollView, { testID: 'ScrollView-History', style: styles.flexScroll, contentContainerStyle: { paddingTop: 16, paddingBottom: insets.bottom + SCROLL_EXTRA_PADDING }, componentId: 'history-list' },
            history.map(function(item, index) {
              return React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-HistoryRow', key: String(item.id + index), style: styles.historyRow, onPress: function() {
                var found = query.data.find(function(d) { return d.dish_name === item.dish_name; });
                if (found) {
                  props.navigation.navigate('RecipeDetail', { dishId: found.id });
                } else {
                  Alert.alert('Рецепт', 'Это блюдо было удалено из рецептов.');
                }
              }, componentId: 'history-item-' + index },
                item.photo_uri ? React.createElement(Image, { source: { uri: item.photo_uri }, style: styles.historyImage, resizeMode: 'cover' }) :
                  React.createElement(View, { style: [styles.historyImage, { alignItems: 'center', justifyContent: 'center', backgroundColor: surfaceAltColor }] },
                    React.createElement(Ionicons, { name: 'restaurant-outline', size: 20, color: textSecondary })),
                React.createElement(View, { style: { flex: 1, gap: 4 } },
                  React.createElement(Text, { style: styles.medium }, item.dish_name),
                  React.createElement(Text, { style: styles.smallMuted }, item.dateStr + ' · ' + formatPrice(item.price_rubles))
                )
              );
            }))));
  };
  // @end:HistoryScreen

  // @section:SpinResultScreen @depends:[ThemeContext,shared-components,styles]
  var SpinResultScreen = function(props) {
    var insets = useSafeAreaInsets();
    var query = useQuery('dishes');
    var context = useTheme();
    var params = props.route?.params || {};
    var dish = query.data.find(function(row) { return row?.id === params.dishId; }) || null;
    var goRecipe = function() { if (dish) props.navigation.navigate('RecipeDetail', { dishId: dish.id }); };
    var revealRef = React.useRef(null);
    if (!revealRef.current) revealRef.current = new Animated.Value(0);
    var reveal = revealRef.current;
    var sparkRef = React.useRef(null);
    if (!sparkRef.current) {
      sparkRef.current = [];
      for (var sparkIndex = 0; sparkIndex < 14; sparkIndex += 1) sparkRef.current.push(new Animated.Value(0));
    }
    var sparks = sparkRef.current;
    React.useEffect(function() {
      reveal.setValue(0);
      var drop = Animated.spring(reveal, { toValue: 1, friction: 7, tension: 58, useNativeDriver: Platform.OS !== 'web' });
      drop.start();
      var bursts = sparks.map(function(value, index) {
        value.setValue(0);
        var burst = Animated.timing(value, { toValue: 1, duration: 980, delay: 120 + index * 18, useNativeDriver: Platform.OS !== 'web' });
        burst.start();
        return burst;
      });
      return function() {
        drop.stop();
        bursts.forEach(function(burst) { burst.stop(); });
      };
    }, [params.dishId]);
    var revealStyle = {
      width: '100%',
      alignItems: 'center',
      opacity: reveal.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
      transform: [
        { translateY: reveal.interpolate({ inputRange: [0, 1], outputRange: [48, 0] }) },
        { scale: reveal.interpolate({ inputRange: [0, 1], outputRange: [0.86, 1] }) }
      ]
    };

    return React.createElement(View, { testID: 'View-28', style: [styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }], componentId: 'result-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-Result', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { testID: 'View-29', style: styles.stackContent, componentId: 'result-content-wrap' },
        React.createElement(Header, { testID: 'Header-4', id: 'result', title: 'Congratulations!', back: function() { props.navigation.goBack(); } }),
        dish ? React.createElement(View, { testID: 'View-30', style: [styles.resultCenter, { justifyContent: 'flex-start', paddingTop: 18 }], componentId: 'result-content' },
          React.createElement(Animated.View, { style: revealStyle },
            React.createElement(View, { style: styles.resultReveal },
              React.createElement(Text, { testID: 'Text-28', style: styles.celebration, componentId: 'result-overline' }, 'Tonight’s pick'),
              React.createElement(View, { style: styles.sparkStage },
                React.createElement(View, { style: styles.resultGlow }),
                React.createElement(DishImage, { testID: 'DishImage-4', dish: dish, style: styles.resultImage, componentId: 'result-image' }),
                sparks.map(function(value, index) {
                  var angle = (Math.PI * 2 * index) / sparks.length;
                  var distance = 78 + (index % 3) * 22;
                  return React.createElement(Animated.View, { key: 'spark-' + index, pointerEvents: 'none', style: {
                    position: 'absolute', left: '50%', top: '46%', width: index % 2 ? 8 : 5, height: index % 2 ? 8 : 5, borderRadius: 6, marginLeft: -4,
                    backgroundColor: index % 3 === 0 ? '#F6C177' : index % 3 === 1 ? accentColor : '#F4E6D4',
                    opacity: value.interpolate({ inputRange: [0, 0.12, 1], outputRange: [0, 1, 0] }),
                    transform: [
                      { translateX: value.interpolate({ inputRange: [0, 1], outputRange: [0, Math.cos(angle) * distance] }) },
                      { translateY: value.interpolate({ inputRange: [0, 1], outputRange: [0, Math.sin(angle) * distance] }) },
                      { scale: value.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0.2, 1.15, 0.3] }) }
                    ]
                  } });
                })),
              React.createElement(Text, { testID: 'Text-29', style: [styles.title, { textAlign: 'center' }], componentId: 'result-name' }, dish.dish_name || 'Dinner'),
              React.createElement(View, { style: styles.resultChips },
                React.createElement(View, { style: styles.tagChip }, React.createElement(Text, { style: styles.tagChipText }, dishDetails(dish).minutes + ' ' + context.translate('min'))),
                React.createElement(View, { style: styles.tagChip }, React.createElement(Text, { style: styles.tagChipText }, context.translate(dishDetails(dish).kind)))),
              React.createElement(Text, { testID: 'Test-30', style: styles.bodyMuted, componentId: 'result-price' }, formatPrice(dish.price_rubles) + ' ' + context.translate('estimated total')),
              React.createElement(Text, { style: styles.cheerLine }, 'You can stop deciding'))),
          React.createElement(PrimaryButton, { testID: 'PrimaryButton-4', id: 'result-view-recipe', label: 'View Recipe', onPress: goRecipe }),
          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-10', style: styles.againButton, onPress: function() { props.navigation.goBack(); }, componentId: 'result-again' },
            React.createElement(Text, { testID: 'Text-31', style: styles.bodyMuted, componentId: 'result-again-label' }, 'No, I want something else'))) :
          React.createElement(View, { testID: 'View-31', style: styles.resultCenter, componentId: 'result-no-match' },
            React.createElement(Text, { testID: 'Text-32', style: styles.title, componentId: 'result-no-match-title' }, 'No dishes fit your budget'),
            React.createElement(Text, { testID: 'Text-33', style: styles.celebration, componentId: 'result-no-match-budget' }, formatPrice(params.budget || 300)),
            React.createElement(PrimaryButton, { testID: 'PrimaryButton-5', id: 'result-raise-budget', label: 'Raise dinner budget', onPress: function() { props.navigation.goBack(); } }))));
  };
  // @end:SpinResultScreen

  // @section:RecipeDetailScreen @depends:[ThemeContext,shared-components,styles]
  var RecipeDetailScreen = function(props) {
    var insets = useSafeAreaInsets();
    var query = useQuery('dishes');
    var context = useTheme();
    var id = props.route?.params?.dishId;
    var dish = query.data.find(function(row) { return row?.id === id; }) || null;
    var ingredients = parseStructuredIngredients(dish?.ingredients);
    var steps = parseStructuredSteps(dish?.recipe_steps);
    var dishTags = dish?.tags || [];

    return React.createElement(View, { testID: 'View-32', style: [styles.screen, { paddingTop: insets.top }], componentId: 'recipe-detail-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-RecipeDetail', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { testID: 'View-33', style: styles.stackContent, componentId: 'recipe-detail-content' },
        React.createElement(Header, { testID: 'Header-5', id: 'recipe-detail', title: 'Recipe', back: function() { props.navigation.goBack(); } }),
        React.createElement(ScrollView, { testID: 'ScrollView-4', style: styles.flexScroll, contentContainerStyle: { paddingTop: 16, paddingBottom: insets.bottom + SCROLL_EXTRA_PADDING }, componentId: 'recipe-detail-scroll' },
          dish ? React.createElement(View, { testID: 'View-34', style: styles.recipeDetailColumn, componentId: 'recipe-detail-body' },
            React.createElement(DishImage, { testID: 'DishImage-5', dish: dish, style: styles.detailImage, componentId: 'recipe-detail-image' }),
            React.createElement(Text, { testID: 'Text-34', style: styles.title, componentId: 'recipe-detail-name' }, dish.dish_name || 'Dinner'),
            React.createElement(Text, { testID: 'Test-35', style: styles.secondary, componentId: 'recipe-detail-meta' }, context.translate('About') + ' ' + dishDetails(dish).minutes + ' ' + context.translate('min') + ' · ' + formatPrice(dish.price_rubles)),
            
            dishTags.length ? React.createElement(View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } },
              dishTags.map(function(t) {
                return React.createElement(View, { key: t, style: styles.tagChip },
                  React.createElement(Text, { style: styles.tagChipText }, t)
                );
              })
            ) : null,

            React.createElement(View, { testID: 'View-35', style: styles.listPanel, componentId: 'recipe-detail-ingredients' },
              React.createElement(Text, { testID: 'Text-36', style: styles.sectionTitle, componentId: 'recipe-detail-ingredients-title' }, 'Ingredients'),
              ingredients.length ? ingredients.map(function(item, index) {
                return React.createElement(Text, { testID: 'Test-37', key: index, style: styles.ingredientLine, componentId: 'recipe-ingredient-' + index }, item.name + ' — ' + item.amount + ' ' + item.unit);
              }) : React.createElement(Text, { testID: 'Test-38', style: styles.emptyLine, componentId: 'recipe-no-ingredients' }, 'No ingredients added yet.')),
            React.createElement(View, { testID: 'View-36', style: styles.listPanel, componentId: 'recipe-detail-method' },
              React.createElement(Text, { testID: 'Text-39', style: styles.sectionTitle, componentId: 'recipe-detail-method-title' }, 'Method'),
              steps.length ? steps.map(function(stepObj, index) {
                return React.createElement(RecipeStepHint, { testID: 'RecipeStepHint-1', key: index, id: 'recipe-step-' + index, dishName: dish.dish_name, step: stepObj.text, stepPhoto: stepObj.photo, index: index });
              }) : React.createElement(Text, { testID: 'Test-40', style: styles.emptyLine, componentId: 'recipe-no-steps' }, 'No cooking steps added yet.'))) :
            React.createElement(Text, { testID: 'Test-41', style: styles.emptyLine, componentId: 'recipe-missing' }, 'This recipe is no longer in your menu.'))));
  };
  // @end:RecipeDetailScreen

  // @section:DishEditorScreen @depends:[ThemeContext,shared-components,styles]
  var DishEditorScreen = function(props) {
    var insets = useSafeAreaInsets();
    var context = useTheme();
    var camera = useCamera();
    var fields = useInvalidFields();
    
    var nameState = React.useState('');
    var priceState = React.useState('');
    var ingredientsState = React.useState([{ name: '', amount: '', unit: 'г' }]);
    var stepsState = React.useState([{ text: '', photo: '' }]);
    
    var tagsState = React.useState([]);
    var selectedTags = tagsState[0], setSelectedTags = tagsState[1];

    var errorState = React.useState('');
    
    var pickerModalState = React.useState({ visible: false, itemIndex: null });
    var pickerModal = pickerModalState[0], setPickerModal = pickerModalState[1];

    var dishPhotoModalState = React.useState(false);
    var dishPhotoModal = dishPhotoModalState[0], setDishPhotoModal = dishPhotoModalState[1];

    var stepPhotoModalState = React.useState({ visible: false, itemIndex: null, photoUri: null });
    var stepPhotoModal = stepPhotoModalState[0], setStepPhotoModal = stepPhotoModalState[1];

    var unitsList = ['г', 'кг', 'мл', 'л', 'шт.', 'ст. л.', 'ч. л.'];
    var insert = useMutation('dishes', 'insert');
    
    var name = nameState[0], setName = nameState[1];
    var price = priceState[0], setPrice = priceState[1];
    var ingredients = ingredientsState[0], setIngredients = ingredientsState[1];
    var steps = stepsState[0], setSteps = stepsState[1];
    var error = errorState[0], setError = errorState[1];
    
    var photoUriState = React.useState(null);
    var photoUri = photoUriState[0], setPhotoUri = photoUriState[1];

    var choosePhoto = function() {
      if (photoUri) {
        setDishPhotoModal(true);
        return;
      }
      Alert.alert(context.translate('Choose a dish photo'), context.translate('Choose photo source'), [
        { text: context.translate('Take Photo'), onPress: function() { capturePhoto(camera).then(function(res) { if (res?.uri) setPhotoUri(res.uri); }).catch(function() {}); } },
        { text: context.translate('Choose from gallery'), onPress: function() { camera.pickImage().then(function(res) { if (res?.uri) setPhotoUri(res.uri); }).catch(function() {}); } },
        { text: context.translate('Cancel'), style: 'cancel' }
      ]);
    };

    var chooseStepPhoto = function(index) {
      var currentStepPhoto = steps[index]?.photo;
      if (currentStepPhoto) {
        setStepPhotoModal({ visible: true, itemIndex: index, photoUri: currentStepPhoto });
        return;
      }
      Alert.alert('Фото шага', context.translate('Choose photo source'), [
        { text: context.translate('Take Photo'), onPress: function() {
          capturePhoto(camera).then(function(res) {
            if (res?.uri) {
              setSteps(function(prev) {
                var copy = [].concat(prev);
                if (copy[index]) copy[index] = Object.assign({}, copy[index], { photo: res.uri });
                return copy;
              });
            }
          }).catch(function() {});
        } },
        { text: context.translate('Choose from gallery'), onPress: function() {
          camera.pickImage().then(function(res) {
            if (res?.uri) {
              setSteps(function(prev) {
                var copy = [].concat(prev);
                if (copy[index]) copy[index] = Object.assign({}, copy[index], { photo: res.uri });
                return copy;
              });
            }
          }).catch(function() {});
        } },
        { text: context.translate('Cancel'), style: 'cancel' }
      ]);
    };

    var save = function() {
      var issues = collectDishIssues(name, price, ingredients, steps);
      if (Object.keys(issues).length) { fields.setInvalid(issues); setError('Fill in the highlighted fields'); return; }
      fields.setInvalid({});
      var serializedIngredients = serializeStructuredIngredients(ingredients);
      var serializedSteps = serializeStructuredSteps(steps);
      setError('');
      insert.mutate({ dish_name: name.trim(), price_rubles: Number(price), ingredients: serializedIngredients, recipe_steps: serializedSteps, photo_uri: photoUri, tags: selectedTags }).then(function() {
        props.navigation.goBack();
      }, function() { setError('Couldn’t save this dish. Your details are still here—try saving again.'); });
    };

    return React.createElement(View, { testID: 'View-37', style: [styles.screen, { paddingTop: insets.top }], componentId: 'dish-editor-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-Editor', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(Header, { testID: 'Header-6', id: 'dish-editor', title: 'Add Dish', back: function() { props.navigation.goBack(); } }),
      React.createElement(ScrollView, { testID: 'ScrollView-5', style: styles.flexScroll, contentContainerStyle: { paddingHorizontal: 16, paddingBottom: insets.bottom + 96 }, componentId: 'dish-editor-scroll' },
        error ? React.createElement(Text, { testID: 'Text-42', style: styles.errorText, componentId: 'dish-editor-error' }, error) : null,
        React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-11', style: styles.photoTile, onPress: choosePhoto, componentId: 'dish-editor-add-photo' },
          photoUri ? React.createElement(View, { style: [styles.photoThumb, { backgroundColor: '#6FBF90', alignItems: 'center', justifyContent: 'center' }] },
            React.createElement(Ionicons, { name: 'checkmark', size: 36, color: onAccentColor })) :
            React.createElement(View, { testID: 'View-38', style: styles.photoThumbFallback, componentId: 'dish-editor-photo-placeholder' }, React.createElement(Ionicons, { testID: 'Ionicons-8', name: 'camera-outline', size: 30, color: accentColor })),
          React.createElement(View, { testID: 'View-39', style: styles.photoTileCopy, componentId: 'dish-editor-photo-copy' },
            React.createElement(Text, { testID: 'Text-43', style: styles.medium, componentId: 'dish-editor-photo-title' }, 'Dish photo'),
            React.createElement(Text, { testID: 'Text-44', style: styles.smallMuted, componentId: 'dish-editor-photo-hint' }, photoUri ? 'Photo added' : 'Add a photo of the finished dish'))),
        React.createElement(Text, { testID: 'Text-45', style: styles.fieldLabel, componentId: 'dish-editor-name-label' }, 'Dish name'),
        React.createElement(TextInput, { testID: 'TextInput-1', style: [styles.input, fields.hot('name', !String(name || '').trim()) ? styles.invalidField : null], value: name, onChangeText: setName, placeholder: 'Dish name', autoCapitalize: 'words', componentId: 'dish-editor-name' }),
        React.createElement(Text, { testID: 'Text-46', style: styles.fieldLabel, componentId: 'dish-editor-price-label' }, 'Price'),
        React.createElement(TextInput, { testID: 'TextInput-2', style: [styles.input, fields.hot('price', !String(price || '').trim()) ? styles.invalidField : null], value: price, onChangeText: function(value) { setPrice(value.replace(/[^0-9]/g, '')); }, keyboardType: 'numeric', placeholder: '0', componentId: 'dish-editor-price' }),
        
        React.createElement(Text, { testID: 'Text-47', style: styles.fieldLabel, componentId: 'dish-editor-ingredients-label' }, 'Ingredients'),
        ingredients.map(function(item, index) {
          return React.createElement(View, { key: index, style: styles.ingredientRowBuilder },
            React.createElement(TextInput, { style: [styles.input, styles.ingNameInput, fields.hot('ing-' + index + '-name', !String(item.name || '').trim()) ? styles.invalidField : null], value: item.name, placeholder: 'Ingredient name', onChangeText: function(val) {
              setIngredients(function(prev) { var copy = [].concat(prev); copy[index] = Object.assign({}, copy[index], { name: val }); return copy; });
            } }),
            React.createElement(TextInput, { style: [styles.input, styles.ingAmountInput, fields.hot('ing-' + index + '-amount', !String(item.amount || '').trim()) ? styles.invalidField : null], value: item.amount, placeholder: '0', keyboardType: 'numeric', onChangeText: function(val) {
              setIngredients(function(prev) { var copy = [].concat(prev); copy[index] = Object.assign({}, copy[index], { amount: val.replace(/[^0-9.]/g, '') }); return copy; });
            } }),
            React.createElement(TouchableOpacity, { style: styles.unitPickerButton, onPress: function() {
              setPickerModal({ visible: true, itemIndex: index });
            } },
              React.createElement(Text, { style: styles.unitPickerButtonText }, item.unit || 'г'),
              React.createElement(Ionicons, { name: 'chevron-down', size: 14, color: textSecondary }))
          );
        }),
        React.createElement(TouchableOpacity, { style: styles.addRowButton, onPress: function() {
          setIngredients(function(prev) { return prev.concat([{ name: '', amount: '', unit: 'г' }]); });
        } }, React.createElement(Text, { style: styles.link }, '+ Добавить ингредиент')),

        React.createElement(Text, { testID: 'Text-48', style: styles.fieldLabel, componentId: 'dish-editor-steps-label' }, 'Recipe steps'),
        steps.map(function(stepObj, index) {
          return React.createElement(View, { key: index, style: styles.stepBuilderRow },
            React.createElement(TextInput, { style: [styles.input, styles.stepInputText, fields.hot('step-' + index, !String(stepObj.text || '').trim()) ? styles.invalidField : null], value: stepObj.text, placeholder: 'Step description...', multiline: true, onChangeText: function(val) {
              setSteps(function(prev) { var copy = [].concat(prev); copy[index] = Object.assign({}, copy[index], { text: val }); return copy; });
            } }),
            React.createElement(TouchableOpacity, { style: [styles.stepPhotoSmallBtn, stepObj.photo ? styles.stepPhotoSmallBtnDone : null], onPress: function() { chooseStepPhoto(index); } },
              stepObj.photo ? React.createElement(Ionicons, { name: 'checkmark', size: 18, color: onAccentColor }) :
                React.createElement(Ionicons, { name: 'camera-outline', size: 18, color: accentColor }))
          );
        }),
        React.createElement(TouchableOpacity, { style: styles.addRowButton, onPress: function() {
          setSteps(function(prev) { return prev.concat([{ text: '', photo: '' }]); });
        } }, React.createElement(Text, { style: styles.link }, '+ Добавить шаг')),

        renderTagGroups(selectedTags, setSelectedTags)
      ),
      
      React.createElement(Modal, { visible: dishPhotoModal, transparent: true, animationType: 'fade', onRequestClose: function() { setDishPhotoModal(false); } },
        React.createElement(View, { style: styles.modalBackdrop },
          React.createElement(View, { style: styles.unitModalContent },
            React.createElement(Text, { style: styles.sectionTitle }, 'Фото блюда'),
            photoUri ? React.createElement(Image, { source: { uri: photoUri }, style: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 }, resizeMode: 'cover' }) : null,
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginBottom: 8 }], onPress: function() {
              setDishPhotoModal(false);
              Alert.alert('Заменить фото', 'Выберите источник', [
                { text: 'Сделать фото', onPress: function() { capturePhoto(camera).then(function(res) { if (res?.uri) setPhotoUri(res.uri); }).catch(function() {}); } },
                { text: 'Выбрать из галереи', onPress: function() { camera.pickImage().then(function(res) { if (res?.uri) setPhotoUri(res.uri); }).catch(function() {}); } },
                { text: 'Отмена', style: 'cancel' }
              ]);
            } }, React.createElement(Text, { style: styles.primaryButtonText }, 'Заменить фото')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: '#E25B52', marginBottom: 8 }], onPress: function() {
              setPhotoUri(null);
              setDishPhotoModal(false);
            } }, React.createElement(Text, { style: [styles.primaryButtonText, { color: '#FFF' }] }, 'Удалить фото')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: function() { setDishPhotoModal(false); } },
              React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Закрыть'))
          )
        )
      ),

      React.createElement(Modal, { visible: pickerModal.visible, transparent: true, animationType: 'fade', onRequestClose: function() { setPickerModal({ visible: false, itemIndex: null }); } },
        React.createElement(View, { style: styles.modalBackdrop },
          React.createElement(View, { style: styles.unitModalContent },
            React.createElement(Text, { style: styles.sectionTitle }, 'Выберите единицу'),
            React.createElement(ScrollView, { style: { maxHeight: 220, width: '100%' } },
              unitsList.map(function(unit) {
                return React.createElement(TouchableOpacity, { key: unit, style: styles.unitModalItem, onPress: function() {
                  var idx = pickerModal.itemIndex;
                  if (idx !== null) {
                    setIngredients(function(prev) {
                      var copy = [].concat(prev);
                      copy[idx] = Object.assign({}, copy[idx], { unit: unit });
                      return copy;
                    });
                  }
                  setPickerModal({ visible: false, itemIndex: null });
                } },
                  React.createElement(Text, { style: styles.medium }, unit));
              })
            ),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginTop: 12 }], onPress: function() { setPickerModal({ visible: false, itemIndex: null }); } },
              React.createElement(Text, { style: styles.primaryButtonText }, 'Отмена'))
          )
        )
      ),

      React.createElement(Modal, { visible: stepPhotoModal.visible, transparent: true, animationType: 'fade', onRequestClose: function() { setStepPhotoModal({ visible: false, itemIndex: null, photoUri: null }); } },
        React.createElement(View, { style: styles.modalBackdrop },
          React.createElement(View, { style: styles.unitModalContent },
            React.createElement(Text, { style: styles.sectionTitle }, 'Фото шага'),
            stepPhotoModal.photoUri ? React.createElement(Image, { source: { uri: stepPhotoModal.photoUri }, style: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 }, resizeMode: 'cover' }) : null,
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginBottom: 8 }], onPress: function() {
              var idx = stepPhotoModal.itemIndex;
              setStepPhotoModal({ visible: false, itemIndex: null, photoUri: null });
              Alert.alert('Заменить фото', 'Выберите источник', [
                { text: 'Сделать фото', onPress: function() {
                  capturePhoto(camera).then(function(res) {
                    if (res?.uri) {
                      setSteps(function(prev) { var copy = [].concat(prev); if (copy[idx]) copy[idx] = Object.assign({}, copy[idx], { photo: res.uri }); return copy; });
                    }
                  }).catch(function() {});
                } },
                { text: 'Выбрать из галереи', onPress: function() {
                  camera.pickImage().then(function(res) {
                    if (res?.uri) {
                      setSteps(function(prev) { var copy = [].concat(prev); if (copy[idx]) copy[idx] = Object.assign({}, copy[idx], { photo: res.uri }); return copy; });
                    }
                  }).catch(function() {});
                } },
                { text: 'Отмена', style: 'cancel' }
              ]);
            } }, React.createElement(Text, { style: styles.primaryButtonText }, 'Заменить фото')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: '#E25B52', marginBottom: 8 }], onPress: function() {
              var idx = stepPhotoModal.itemIndex;
              setSteps(function(prev) {
                var copy = [].concat(prev);
                if (copy[idx]) copy[idx] = Object.assign({}, copy[idx], { photo: '' });
                return copy;
              });
              setStepPhotoModal({ visible: false, itemIndex: null, photoUri: null });
            } }, React.createElement(Text, { style: [styles.primaryButtonText, { color: '#FFF' }] }, 'Удалить фото')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: function() { setStepPhotoModal({ visible: false, itemIndex: null, photoUri: null }); } },
              React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Закрыть'))
          )
        )
      ),

      React.createElement(View, { testID: 'View-40', style: [styles.pinnedAction, { paddingBottom: insets.bottom + 12, paddingHorizontal: 16 }], componentId: 'dish-editor-footer' },
        React.createElement(PrimaryButton, { testID: 'PrimaryButton-6', id: 'dish-editor-save', label: insert.loading ? 'Saving…' : 'Save Changes', onPress: save, disabled: insert.loading }))
    );
  };
  // @end:DishEditorScreen

  // @section:DishDetailScreen @depends:[ThemeContext,shared-components,styles]
  var DishDetailScreen = function(props) {
    var insets = useSafeAreaInsets();
    var query = useQuery('dishes');
    var update = useMutation('dishes', 'update');
    var remove = useMutation('dishes', 'delete');
    var context = useTheme();
    var camera = useCamera();
    var fields = useInvalidFields();

    var dishId = props.route?.params?.dishId;
    var dish = query.data.find(function(row) { return row?.id === dishId; }) || null;
    var nameState = React.useState(dish?.dish_name || '');
    var priceState = React.useState(String(dish?.price_rubles ?? ''));
    var ingredientsState = React.useState(parseStructuredIngredients(dish?.ingredients));
    var stepsState = React.useState(parseStructuredSteps(dish?.recipe_steps));
    
    var tagsState = React.useState(dish?.tags || []);
    var selectedTags = tagsState[0], setSelectedTags = tagsState[1];

    var errorState = React.useState('');

    var photoUriState = React.useState(dish?.photo_uri || getDishImage(dish));
    var photoUri = photoUriState[0], setPhotoUri = photoUriState[1];

    var pickerModalState = React.useState({ visible: false, itemIndex: null });
    var pickerModal = pickerModalState[0], setPickerModal = pickerModalState[1];

    var dishPhotoModalState = React.useState(false);
    var dishPhotoModal = dishPhotoModalState[0], setDishPhotoModal = dishPhotoModalState[1];

    var stepPhotoModalState = React.useState({ visible: false, itemIndex: null, photoUri: null });
    var stepPhotoModal = stepPhotoModalState[0], setStepPhotoModal = stepPhotoModalState[1];

    var unitsList = ['г', 'кг', 'мл', 'л', 'шт.', 'ст. л.', 'ч. л.'];

    var name = nameState[0], setName = nameState[1];
    var price = priceState[0], setPrice = priceState[1];
    var ingredients = ingredientsState[0], setIngredients = ingredientsState[1];
    var steps = stepsState[0], setSteps = stepsState[1];
    var error = errorState[0], setError = errorState[1];

    React.useEffect(function() {
      if (dish) {
        setName(String(dish.dish_name || ''));
        setPrice(String(dish.price_rubles ?? ''));
        setIngredients(parseStructuredIngredients(dish.ingredients));
        setSteps(parseStructuredSteps(dish.recipe_steps));
        setPhotoUri(dish.photo_uri || getDishImage(dish));
        setSelectedTags(dish.tags || []);
      }
    }, [dish?.id]);

    var choosePhoto = function() {
      if (photoUri) {
        setDishPhotoModal(true);
        return;
      }
      Alert.alert(context.translate('Choose a dish photo'), context.translate('Choose photo source'), [
        { text: context.translate('Take Photo'), onPress: function() { capturePhoto(camera).then(function(res) { if (res?.uri) setPhotoUri(res.uri); }).catch(function() {}); } },
        { text: context.translate('Choose from gallery'), onPress: function() { camera.pickImage().then(function(res) { if (res?.uri) setPhotoUri(res.uri); }).catch(function() {}); } },
        { text: context.translate('Cancel'), style: 'cancel' }
      ]);
    };

    var chooseStepPhoto = function(index) {
      var currentStepPhoto = steps[index] && steps[index].photo;
      if (currentStepPhoto) {
        setStepPhotoModal({ visible: true, itemIndex: index, photoUri: currentStepPhoto });
        return;
      }
      Alert.alert('Фото шага', context.translate('Choose photo source'), [
        { text: context.translate('Take Photo'), onPress: function() {
          capturePhoto(camera).then(function(res) {
            if (res?.uri) {
              setSteps(function(prev) { var copy = [].concat(prev); if (copy[index]) copy[index] = Object.assign({}, copy[index], { photo: res.uri }); return copy; });
            }
          }).catch(function() {});
        } },
        { text: context.translate('Choose from gallery'), onPress: function() {
          camera.pickImage().then(function(res) {
            if (res?.uri) {
              setSteps(function(prev) { var copy = [].concat(prev); if (copy[index]) copy[index] = Object.assign({}, copy[index], { photo: res.uri }); return copy; });
            }
          }).catch(function() {});
        } },
        { text: context.translate('Cancel'), style: 'cancel' }
      ]);
    };

    var save = function() {
      var issues = collectDishIssues(name, price, ingredients, steps);
      if (Object.keys(issues).length) { fields.setInvalid(issues); setError('Fill in the highlighted fields'); return; }
      fields.setInvalid({});
      var serializedIngredients = serializeStructuredIngredients(ingredients);
      var serializedSteps = serializeStructuredSteps(steps);
      setError('');
      update.mutate({ id: dishId, data: { dish_name: name.trim(), price_rubles: Number(price), ingredients: serializedIngredients, recipe_steps: serializedSteps, photo_uri: photoUri, tags: selectedTags } }).then(function() {
        props.navigation.goBack();
      }, function() { setError('Changes couldn’t be saved. Your dish details are still here.'); });
    };
    var confirmDelete = function() {
      var action = function() { remove.mutate({ id: dishId }).then(function() { props.navigation.goBack(); }, function() { setError('Couldn’t delete this dish. Please try again.'); }); };
      if (Platform.OS === 'web') { if (window.confirm(context.translate('Delete this dish from your menu?'))) action(); }
      else Alert.alert(context.translate('Delete dish'), context.translate('Delete this dish from your menu?'), [
        { text: context.translate('Cancel'), style: 'cancel' }, { text: context.translate('Delete'), style: 'destructive', onPress: action }
      ]);
    };
    return React.createElement(View, { testID: 'View-41', style: [styles.screen, { paddingTop: insets.top }], componentId: 'dish-detail-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-Detail', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(Header, { testID: 'Header-7', id: 'dish-detail', title: 'Edit Dish', back: function() { props.navigation.goBack(); } }),
      React.createElement(ScrollView, { testID: 'ScrollView-6', style: styles.flexScroll, contentContainerStyle: { paddingHorizontal: 16, paddingBottom: insets.bottom + 96 }, componentId: 'dish-detail-scroll' },
        error ? React.createElement(Text, { testID: 'Text-49', style: styles.errorText, componentId: 'dish-detail-error' }, error) : null,
        dish ? React.createElement(View, { testID: 'View-42', componentId: 'dish-detail-fields' },
          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-11-detail', style: styles.photoTile, onPress: choosePhoto, componentId: 'dish-detail-add-photo' },
            photoUri ? React.createElement(View, { style: [styles.photoThumb, { backgroundColor: '#6FBF90', alignItems: 'center', justifyContent: 'center' }] },
              React.createElement(Ionicons, { name: 'checkmark', size: 36, color: onAccentColor })) :
              React.createElement(View, { testID: 'View-38-detail', style: styles.photoThumbFallback, componentId: 'dish-detail-photo-placeholder' }, React.createElement(Ionicons, { testID: 'Ionicons-8-detail', name: 'camera-outline', size: 30, color: accentColor })),
            React.createElement(View, { testID: 'View-39-detail', style: styles.photoTileCopy, componentId: 'dish-detail-photo-copy' },
              React.createElement(Text, { testID: 'Text-43-detail', style: styles.medium, componentId: 'dish-detail-photo-title' }, 'Dish photo'),
              React.createElement(Text, { testID: 'Text-44-detail', style: styles.smallMuted, componentId: 'dish-detail-photo-hint' }, photoUri ? 'Photo added' : 'Add a photo of the finished dish'))),

          React.createElement(Text, { testID: 'Text-50', style: styles.fieldLabel, componentId: 'dish-detail-name-label' }, 'Dish name'),
          React.createElement(TextInput, { testID: 'TextInput-5', style: [styles.input, fields.hot('name', !String(name || '').trim()) ? styles.invalidField : null], value: name, onChangeText: setName, componentId: 'dish-detail-name' }),
          React.createElement(Text, { testID: 'Text-51', style: styles.fieldLabel, componentId: 'dish-detail-price-label' }, 'Price'),
          React.createElement(TextInput, { testID: 'TextInput-6', style: [styles.input, fields.hot('price', !String(price || '').trim()) ? styles.invalidField : null], value: price, onChangeText: setPrice, keyboardType: 'numeric', componentId: 'dish-detail-price' }),
          
          React.createElement(Text, { testID: 'Text-52', style: styles.fieldLabel, componentId: 'dish-detail-ingredients-label' }, 'Ingredients'),
          ingredients.map(function(item, index) {
            return React.createElement(View, { key: index, style: styles.ingredientRowBuilder },
              React.createElement(TextInput, { style: [styles.input, styles.ingNameInput, fields.hot('ing-' + index + '-name', !String(item.name || '').trim()) ? styles.invalidField : null], value: item.name, placeholder: 'Ingredient name', onChangeText: function(val) {
                setIngredients(function(prev) { var copy = [].concat(prev); copy[index] = Object.assign({}, copy[index], { name: val }); return copy; });
              } }),
              React.createElement(TextInput, { style: [styles.input, styles.ingAmountInput, fields.hot('ing-' + index + '-amount', !String(item.amount || '').trim()) ? styles.invalidField : null], value: item.amount, placeholder: '0', keyboardType: 'numeric', onChangeText: function(val) {
                setIngredients(function(prev) { var copy = [].concat(prev); copy[index] = Object.assign({}, copy[index], { amount: val.replace(/[^0-9.]/g, '') }); return copy; });
              } }),
              React.createElement(TouchableOpacity, { style: styles.unitPickerButton, onPress: function() {
                setPickerModal({ visible: true, itemIndex: index });
              } },
                React.createElement(Text, { style: styles.unitPickerButtonText }, item.unit || 'г'),
                React.createElement(Ionicons, { name: 'chevron-down', size: 14, color: textSecondary }))
            );
          }),
          React.createElement(TouchableOpacity, { style: styles.addRowButton, onPress: function() {
            setIngredients(function(prev) { return prev.concat([{ name: '', amount: '', unit: 'г' }]); });
          } }, React.createElement(Text, { style: styles.link }, '+ Добавить ингредиент')),

          React.createElement(Text, { testID: 'Text-53', style: styles.fieldLabel, componentId: 'dish-detail-recipe-label' }, 'Recipe steps'),
          steps.map(function(stepObj, index) {
            var hasPhoto = Boolean(stepObj.photo);
            return React.createElement(View, { key: index, style: styles.stepBuilderRow },
              React.createElement(TextInput, { style: [styles.input, styles.stepInputText, fields.hot('step-' + index, !String(stepObj.text || '').trim()) ? styles.invalidField : null], value: stepObj.text, placeholder: 'Step description...', multiline: true, onChangeText: function(val) {
                setSteps(function(prev) { var copy = [].concat(prev); copy[index] = Object.assign({}, copy[index], { text: val }); return copy; });
              } }),
              React.createElement(TouchableOpacity, { style: [styles.stepPhotoSmallBtn, hasPhoto ? styles.stepPhotoSmallBtnDone : null], onPress: function() { chooseStepPhoto(index); } },
                hasPhoto ? React.createElement(Ionicons, { name: 'checkmark', size: 18, color: onAccentColor }) :
                  React.createElement(Ionicons, { name: 'camera-outline', size: 18, color: accentColor }))
            );
          }),
          React.createElement(TouchableOpacity, { style: styles.addRowButton, onPress: function() {
            setSteps(function(prev) { return prev.concat([{ text: '', photo: '' }]); });
          } }, React.createElement(Text, { style: styles.link }, '+ Добавить шаг')),

          renderTagGroups(selectedTags, setSelectedTags),

          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-12', style: styles.deleteRow, onPress: confirmDelete, componentId: 'dish-detail-delete' },
            React.createElement(Ionicons, { testID: 'Ionicons-9', name: 'trash-outline', size: 22, color: accentColor }),
            React.createElement(Text, { testID: 'Text-54', style: styles.link, componentId: 'dish-detail-delete-label' }, 'Delete dish'))) :
          React.createElement(Text, { testID: 'Test-55', style: styles.emptyLine, componentId: 'dish-detail-missing' }, 'This recipe is no longer in your menu.')),
      
      React.createElement(Modal, { visible: dishPhotoModal, transparent: true, animationType: 'fade', onRequestClose: function() { setDishPhotoModal(false); } },
        React.createElement(View, { style: styles.modalBackdrop },
          React.createElement(View, { style: styles.unitModalContent },
            React.createElement(Text, { style: styles.sectionTitle }, 'Фото блюда'),
            photoUri ? React.createElement(Image, { source: { uri: photoUri }, style: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 }, resizeMode: 'cover' }) : null,
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginBottom: 8 }], onPress: function() {
              setDishPhotoModal(false);
              Alert.alert('Заменить фото', 'Выберите источник', [
                { text: 'Сделать фото', onPress: function() { capturePhoto(camera).then(function(res) { if (res?.uri) setPhotoUri(res.uri); }).catch(function() {}); } },
                { text: 'Выбрать из галереи', onPress: function() { camera.pickImage().then(function(res) { if (res?.uri) setPhotoUri(res.uri); }).catch(function() {}); } },
                { text: 'Отмена', style: 'cancel' }
              ]);
            } }, React.createElement(Text, { style: styles.primaryButtonText }, 'Заменить фото')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: '#E25B52', marginBottom: 8 }], onPress: function() {
              setPhotoUri(null);
              setDishPhotoModal(false);
            } }, React.createElement(Text, { style: [styles.primaryButtonText, { color: '#FFF' }] }, 'Удалить фото')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: function() { setDishPhotoModal(false); } },
              React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Закрыть'))
          )
        )
      ),

      React.createElement(Modal, { visible: pickerModal.visible, transparent: true, animationType: 'fade', onRequestClose: function() { setPickerModal({ visible: false, itemIndex: null }); } },
        React.createElement(View, { style: styles.modalBackdrop },
          React.createElement(View, { style: styles.unitModalContent },
            React.createElement(Text, { style: styles.sectionTitle }, 'Выберите единицу'),
            React.createElement(ScrollView, { style: { maxHeight: 220, width: '100%' } },
              unitsList.map(function(unit) {
                return React.createElement(TouchableOpacity, { key: unit, style: styles.unitModalItem, onPress: function() {
                  var idx = pickerModal.itemIndex;
                  if (idx !== null) {
                    setIngredients(function(prev) {
                      var copy = [].concat(prev);
                      copy[idx] = Object.assign({}, copy[idx], { unit: unit });
                      return copy;
                    });
                  }
                  setPickerModal({ visible: false, itemIndex: null });
                } },
                  React.createElement(Text, { style: styles.medium }, unit));
              })
            ),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginTop: 12 }], onPress: function() { setPickerModal({ visible: false, itemIndex: null }); } },
              React.createElement(Text, { style: styles.primaryButtonText }, 'Отмена'))
          )
        )
      ),

      React.createElement(Modal, { visible: stepPhotoModal.visible, transparent: true, animationType: 'fade', onRequestClose: function() { setStepPhotoModal({ visible: false, itemIndex: null, photoUri: null }); } },
        React.createElement(View, { style: styles.modalBackdrop },
          React.createElement(View, { style: styles.unitModalContent },
            React.createElement(Text, { style: styles.sectionTitle }, 'Фото шага'),
            stepPhotoModal.photoUri ? React.createElement(Image, { source: { uri: stepPhotoModal.photoUri }, style: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 }, resizeMode: 'cover' }) : null,
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginBottom: 8 }], onPress: function() {
              var idx = stepPhotoModal.itemIndex;
              setStepPhotoModal({ visible: false, itemIndex: null, photoUri: null });
              Alert.alert('Заменить фото', 'Выберите источник', [
                { text: 'Сделать фото', onPress: function() {
                  capturePhoto(camera).then(function(res) {
                    if (res?.uri) {
                      setSteps(function(prev) { var copy = [].concat(prev); if (copy[idx]) copy[idx] = Object.assign({}, copy[idx], { photo: res.uri }); return copy; });
                    }
                  }).catch(function() {});
                } },
                { text: 'Выбрать из галереи', onPress: function() {
                  camera.pickImage().then(function(res) {
                    if (res?.uri) {
                      setSteps(function(prev) { var copy = [].concat(prev); if (copy[idx]) copy[idx] = Object.assign({}, copy[idx], { photo: res.uri }); return copy; });
                    }
                  }).catch(function() {});
                } },
                { text: 'Отмена', style: 'cancel' }
              ]);
            } }, React.createElement(Text, { style: styles.primaryButtonText }, 'Заменить фото')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: '#E25B52', marginBottom: 8 }], onPress: function() {
              var idx = stepPhotoModal.itemIndex;
              setSteps(function(prev) {
                var copy = [].concat(prev);
                if (copy[idx]) copy[idx] = Object.assign({}, copy[idx], { photo: '' });
                return copy;
              });
              setStepPhotoModal({ visible: false, itemIndex: null, photoUri: null });
            } }, React.createElement(Text, { style: [styles.primaryButtonText, { color: '#FFF' }] }, 'Удалить фото')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: function() { setStepPhotoModal({ visible: false, itemIndex: null, photoUri: null }); } },
              React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Закрыть'))
          )
        )
      ),

      dish ? React.createElement(View, { testID: 'View-43', style: [styles.pinnedAction, { paddingBottom: insets.bottom + 12, paddingHorizontal: 16 }], componentId: 'dish-detail-footer' },
        React.createElement(PrimaryButton, { testID: 'PrimaryButton-7', id: 'dish-detail-save', label: update.loading ? 'Saving…' : 'Save Changes', onPress: save, disabled: update.loading })) : null);
  };
  // @end:DishDetailScreen

  // @section:CameraScreen @depends:[ThemeContext,shared-components,styles]
  var CameraScreen = function(props) {
    var insets = useSafeAreaInsets();
    var camera = useCamera();
    var errorState = React.useState('');
    var error = errorState[0], setError = errorState[1];
    var source = props.route?.params?.source;
    var target = props.route?.params?.target;
    var stepIndex = props.route?.params?.stepIndex;

    var finish = function(result) {
      if (result?.error) { setError(result.error); return; }
      if (result?.uri) {
        if (target === 'step') {
          props.navigation.replace('DishEditor', { stepPhotoUri: result.uri, activePhotoStepIndex: stepIndex });
        } else if (target === 'stepDetail') {
          props.navigation.replace('DishDetail', { stepPhotoUri: result.uri, activePhotoStepIndex: stepIndex });
        } else if (target === 'dishDetail') {
          props.navigation.replace('DishDetail', { photoUri: result.uri });
        } else {
          props.navigation.replace('DishEditor', { photoUri: result.uri });
        }
      }
    };
    var take = function() { setError(''); capturePhoto(camera).then(finish, function(err) { setError(err?.message || 'Camera access is unavailable.'); }); };
    var pick = function() { setError(''); camera.pickImage().then(finish, function(err) { setError(err?.message || 'Gallery access is unavailable.'); }); };
    React.useEffect(function() { if (source === 'camera') take(); else if (source === 'gallery') pick(); }, [source]);
    var errorText = error || camera.error;
    return React.createElement(View, { testID: 'View-44', style: [styles.screen, { paddingTop: insets.top }], componentId: 'camera-screen' },
      React.createElement(Header, { testID: 'Header-8', id: 'camera', title: 'Add Photo', back: function() { props.navigation.goBack(); } }),
      errorText ? React.createElement(View, { testID: 'View-45', style: styles.centerEmpty, componentId: 'camera-error' },
        React.createElement(Text, { testID: 'Text-56', style: styles.title, componentId: 'camera-error-title' }, 'Camera access is off'),
        React.createElement(Text, { testID: 'Text-57', style: styles.bodyMuted, componentId: 'camera-error-copy' }, errorText),
        React.createElement(PrimaryButton, { testID: 'PrimaryButton-8', id: 'camera-retry', label: 'Try camera again', onPress: take }),
        React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-13', style: styles.cameraGalleryButton, onPress: pick, componentId: 'camera-gallery-retry' }, React.createElement(Text, { testID: 'Text-58', style: styles.link }, 'Choose from gallery'))) :
        React.createElement(View, { testID: 'View-46', style: styles.cameraBody, componentId: 'camera-body' },
          camera.photo?.uri ? React.createElement(Image, { testID: 'Image-4', source: { uri: camera.photo.uri }, style: styles.cameraStagePhoto, resizeMode: 'cover', componentId: 'camera-captured-photo' }) :
            React.createElement(View, { testID: 'View-47', style: styles.cameraStage, componentId: 'camera-stage' }, React.createElement(Ionicons, { testID: 'Ionicons-10', name: 'camera-outline', size: 32, color: accentColor }), React.createElement(Text, { testID: 'Test-59', style: styles.bodyMuted }, 'Take a photo of your dish')),
          camera.photo?.uri ? React.createElement(View, { style: styles.cameraChoices },
            React.createElement(PrimaryButton, { testID: 'PrimaryButton-9', id: 'camera-use-photo', label: 'Use Photo', onPress: function() { finish({ uri: camera.photo.uri }); } }),
            React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-Retake', style: styles.cameraGalleryButton, onPress: take, componentId: 'camera-retake' },
              React.createElement(Text, { style: styles.link }, 'Retake'))) :
            React.createElement(View, { testID: 'View-48', style: styles.cameraChoices, componentId: 'camera-choices' },
              React.createElement(PrimaryButton, { testID: 'PrimaryButton-10', id: 'camera-take-photo', label: 'Take Photo', onPress: take }),
              React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-14', style: styles.cameraGalleryButton, onPress: pick, componentId: 'camera-gallery-retry' }, React.createElement(Text, { testID: 'Text-60', style: styles.link }, 'Choose from gallery')))));
  };
  // @end:CameraScreen

  // @section:styles @depends:[theme]
  const styles = StyleSheet.create({
    screen: { flex: 1, width: '100%', backgroundColor: backgroundColor },
    tabScreen: { flex: 1, paddingHorizontal: 18 },
    stackContent: { flex: 1, paddingHorizontal: 18 },
    flexScroll: { flex: 1, minHeight: 0 },
    header: { height: 52, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16 },
    headerTitle: { flex: 1, color: textPrimary, fontSize: 20, fontWeight: '700', letterSpacing: -0.3 },
    backButton: { width: 40, height: 40, borderRadius: radiusPill, backgroundColor: cardColor, alignItems: 'center', justifyContent: 'center' },
    iconAction: { minWidth: 40, minHeight: 40, borderRadius: radiusPill, alignItems: 'center', justifyContent: 'center' },
    headerLink: { minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 6 },
    languageSwitch: { height: 32, borderRadius: radiusPill, backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor, flexDirection: 'row', padding: 3, alignItems: 'center' },
    languageOption: { minWidth: 32, height: 26, borderRadius: radiusPill, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
    languageOptionActive: { backgroundColor: accentColor },
    languageLabel: { color: textSecondary, fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
    languageLabelActive: { color: onAccentColor },
    homeHeaderActions: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    link: { color: accentColor, fontSize: 15, fontWeight: '600' },
    title: { color: textPrimary, fontSize: 20, lineHeight: 26, fontWeight: '700', letterSpacing: -0.3 },
    celebration: { color: accentColor, fontSize: 28, fontWeight: '700', textAlign: 'center', letterSpacing: -0.4 },
    medium: { color: textPrimary, fontSize: 16, lineHeight: 21, fontWeight: '600' },
    sectionTitle: { color: textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 10, letterSpacing: -0.2 },
    body: { color: textPrimary, fontSize: 15, lineHeight: 21 },
    bodyMuted: { color: textSecondary, fontSize: 14, lineHeight: 20 },
    secondary: { color: textSecondary, fontSize: 13, lineHeight: 18 },
    smallMuted: { color: textSecondary, fontSize: 12, lineHeight: 16 },
    overline: { color: accentColor, fontSize: 11, fontWeight: '700', letterSpacing: 1.4 },
    dinnerCard: { borderRadius: radiusMd, backgroundColor: cardColor, marginBottom: 10, flex: 1, maxHeight: '66%', borderWidth: 1, borderColor: borderColor, overflow: 'hidden' },
    heroImage: { width: '100%', height: '70%', borderTopLeftRadius: radiusMd, borderTopRightRadius: radiusMd, backgroundColor: surfaceAltColor, minHeight: 120 },
    imageFallback: { backgroundColor: surfaceAltColor, alignItems: 'center', justifyContent: 'center' },
    dinnerCopy: { paddingHorizontal: 16, paddingVertical: 14, gap: 4 },
    budgetCard: { backgroundColor: cardColor, paddingHorizontal: 16, paddingVertical: 14, borderRadius: radiusMd, marginBottom: 10, gap: 6, borderWidth: 1, borderColor: borderColor },
    budgetTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    pinnedAction: { paddingTop: 4, backgroundColor: backgroundColor },
    primaryButton: { minHeight: 52, width: '100%', borderRadius: radiusPill, backgroundColor: accentColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingHorizontal: 18 },
    primaryButtonText: { color: onAccentColor, fontSize: 15, fontWeight: '700', letterSpacing: 0.6 },
    emptyCard: { minHeight: 220, backgroundColor: cardColor, borderRadius: radiusMd, padding: 24, justifyContent: 'center', gap: 14, borderWidth: 1, borderColor: borderColor },
    centerEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14 },
    menuRow: { minHeight: 84, backgroundColor: cardColor, borderRadius: radiusMd, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10, borderWidth: 1, borderColor: borderColor },
    menuImage: { width: 64, height: 64, borderRadius: radiusSm, backgroundColor: surfaceAltColor },
    menuInfo: { flex: 1, minWidth: 0, gap: 3 },
    recipeCard: { minHeight: 108, borderRadius: radiusMd, backgroundColor: cardColor, flexDirection: 'row', marginBottom: 10, borderWidth: 1, borderColor: borderColor, overflow: 'hidden' },
    recipeListImage: { width: 96, height: 108, borderTopLeftRadius: radiusMd, borderBottomLeftRadius: radiusMd, backgroundColor: surfaceAltColor },
    recipeListCopy: { flex: 1, minWidth: 0, paddingHorizontal: 14, paddingVertical: 12, justifyContent: 'center', gap: 5 },
    resultCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 8, paddingBottom: 56 },
    resultReveal: { width: '100%', alignItems: 'center', gap: 14 },
    placeModalCard: { width: '92%', maxWidth: 420, maxHeight: '88%', backgroundColor: cardColor, borderRadius: radiusMd, padding: 18, borderWidth: 1, borderColor: borderColor },
    placeModalScroll: { width: '100%', maxHeight: 380 },
    placePhotoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10, marginBottom: 4 },
    placePhotoTile: { width: 76, height: 76, borderRadius: radiusSm, overflow: 'hidden', backgroundColor: surfaceAltColor },
    placePhotoImage: { width: 76, height: 76 },
    placePhotoRemove: { position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(12,11,10,0.75)', alignItems: 'center', justifyContent: 'center' },
    placePhotoAdd: { width: 76, height: 76, borderRadius: radiusSm, borderWidth: 1, borderColor: borderColor, backgroundColor: surfaceAltColor, alignItems: 'center', justifyContent: 'center', gap: 2 },
    resultImage: { width: '100%', height: 200, borderRadius: radiusMd, backgroundColor: surfaceAltColor },
    againButton: { minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
    recipeDetailColumn: { gap: 14, width: '100%' },
    detailImage: { width: '100%', height: 220, borderRadius: radiusMd, backgroundColor: surfaceAltColor },
    listPanel: { width: '100%', backgroundColor: cardColor, borderRadius: radiusMd, padding: 16, gap: 6, borderWidth: 1, borderColor: borderColor },
    ingredientLine: { color: textPrimary, fontSize: 15, lineHeight: 22, flexShrink: 1, flexWrap: 'wrap', width: '100%' },
    stepRow: { width: '100%', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: borderColor },
    stepNumber: { width: 26, height: 26, borderRadius: radiusPill, backgroundColor: accentSoftColor, alignItems: 'center', justifyContent: 'center' },
    stepText: { color: textPrimary, fontSize: 15, lineHeight: 21, flex: 1, flexShrink: 1, minWidth: 90 },
    questionButton: { width: 26, height: 26, borderRadius: radiusPill, borderWidth: 1, borderColor: accentColor, alignItems: 'center', justifyContent: 'center' },
    questionMark: { color: accentColor, fontSize: 14, fontWeight: '700' },
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(8,7,6,0.78)', alignItems: 'center', justifyContent: 'center', padding: 20 },
    hintModal: { width: '100%', maxWidth: 420, backgroundColor: cardColor, borderRadius: radiusMd, padding: 16, gap: 12, borderWidth: 1, borderColor: borderColor },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    hintModalImage: { width: '100%', height: 180, borderRadius: radiusSm, backgroundColor: surfaceAltColor },
    hintModalEmpty: { width: '100%', height: 120, borderRadius: radiusSm, backgroundColor: surfaceAltColor, alignItems: 'center', justifyContent: 'center' },
    emptyLine: { color: textSecondary, fontSize: 14, lineHeight: 20, paddingVertical: 6 },
    fieldLabel: { color: textSecondary, fontSize: 12, fontWeight: '600', letterSpacing: 0.4, marginTop: 14, marginBottom: 6 },
    input: { minHeight: 48, borderRadius: radiusSm, backgroundColor: cardColor, borderWidth: 1, borderColor: borderColor, paddingHorizontal: 14, color: textPrimary, fontSize: 15 },
    textArea: { minHeight: 96, borderRadius: radiusSm, backgroundColor: cardColor, borderWidth: 1, borderColor: borderColor, padding: 14, color: textPrimary, fontSize: 15, lineHeight: 21 },
    photoTile: { minHeight: 88, borderRadius: radiusMd, backgroundColor: cardColor, borderWidth: 1, borderColor: borderColor, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6 },
    photoTileCopy: { flex: 1, gap: 3 },
    photoThumb: { width: 64, height: 64, borderRadius: radiusSm, backgroundColor: surfaceAltColor },
    photoThumbFallback: { width: 64, height: 64, borderRadius: radiusSm, backgroundColor: surfaceAltColor, alignItems: 'center', justifyContent: 'center' },
    errorText: { color: accentColor, marginVertical: 8, lineHeight: 20, fontSize: 14 },
    deleteRow: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
    cameraBody: { flex: 1, padding: 18, justifyContent: 'center', gap: 16 },
    cameraStage: { height: 240, borderRadius: radiusMd, backgroundColor: cardColor, borderWidth: 1, borderColor: borderColor, alignItems: 'center', justifyContent: 'center', gap: 10 },
    cameraStagePhoto: { width: '100%', height: 240, borderRadius: radiusMd, backgroundColor: surfaceAltColor },
    cameraChoices: { gap: 12 },
    cameraGalleryButton: { minHeight: 48, borderRadius: radiusPill, borderWidth: 1, borderColor: accentColor, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
    ingredientRowBuilder: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    ingNameInput: { flex: 2, fontSize: 14 },
    ingAmountInput: { flex: 1, fontSize: 14, textAlign: 'center' },
    unitPickerButton: { flex: 1.2, height: 44, backgroundColor: cardColor, borderRadius: radiusSm, borderWidth: 1, borderColor: borderColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
    unitPickerButtonText: { color: textPrimary, fontSize: 13, fontWeight: '600' },
    unitModalContent: { width: '86%', maxWidth: 320, backgroundColor: cardColor, borderRadius: radiusMd, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: borderColor },
    unitModalItem: { width: '100%', paddingVertical: 12, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: borderColor },
    addRowButton: { paddingVertical: 8, marginBottom: 8 },
    stepBuilderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    stepInputText: { flex: 1, minHeight: 48, fontSize: 14 },
    stepPhotoSmallBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: cardColor, borderWidth: 1, borderColor: accentColor, justifyContent: 'center', alignItems: 'center' },
    stepPhotoSmallBtnDone: { backgroundColor: '#6FBF90', borderColor: '#6FBF90' },
    historyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: cardColor, borderRadius: radiusMd, padding: 12, marginBottom: 10, gap: 12, borderWidth: 1, borderColor: borderColor },
    historyImage: { width: 52, height: 52, borderRadius: radiusSm, backgroundColor: surfaceAltColor },
    topSubTabs: { flexDirection: 'row', backgroundColor: cardColor, borderRadius: radiusPill, padding: 4, marginVertical: 8, borderWidth: 1, borderColor: borderColor },
    subTabBtn: { flex: 1, height: 36, borderRadius: radiusPill, alignItems: 'center', justifyContent: 'center' },
    subTabBtnActive: { backgroundColor: accentColor },
    filterRowItem: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: borderColor },
    tagChip: { paddingHorizontal: 12, height: 32, borderRadius: radiusPill, backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor, justifyContent: 'center', alignItems: 'center' },
    tagChipActive: { backgroundColor: accentColor, borderColor: accentColor },
    tagChipText: { color: textSecondary, fontSize: 13, fontWeight: '600' },
    tagChipTextActive: { color: onAccentColor },
    tagChipExclude: { backgroundColor: '#3A221F', borderColor: '#E25B52' },
    tagChipTextExclude: { color: '#E7B2AD', textDecorationLine: 'line-through' },
    tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
    invalidField: { borderColor: '#E25B52', borderWidth: 1.5 },
    searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12, marginBottom: 12 },
    searchInput: { flex: 1, minHeight: 48, borderRadius: radiusPill, backgroundColor: cardColor, borderWidth: 1, borderColor: borderColor, paddingHorizontal: 16, color: textPrimary, fontSize: 15 },
    searchAdd: { width: 48, height: 48, borderRadius: 24, backgroundColor: accentColor, alignItems: 'center', justifyContent: 'center' },
    swipeShell: { marginBottom: 10, borderRadius: radiusMd, overflow: 'hidden', backgroundColor: cardColor },
    swipeFront: { backgroundColor: cardColor, width: '100%' },
    swipeDelete: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 92, backgroundColor: '#E25B52' },
    swipeDeleteHit: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', gap: 4 },
    swipeDeleteText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
    shotPreview: { width: '100%', height: 240, borderRadius: radiusMd, backgroundColor: surfaceAltColor, marginTop: 8, marginBottom: 14 },
    sheetBackdrop: { flex: 1, backgroundColor: 'rgba(8,7,6,0.72)', justifyContent: 'flex-end' },
    filterSheet: { backgroundColor: cardColor, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 28, borderTopWidth: 1, borderColor: borderColor },
    sheetHandle: { width: 42, height: 4, borderRadius: 2, backgroundColor: borderColor, alignSelf: 'center', marginBottom: 14 },
    sparkStage: { width: '100%', minHeight: 230, alignItems: 'center', justifyContent: 'center' },
    resultGlow: { position: 'absolute', width: 210, height: 210, borderRadius: 105, backgroundColor: 'rgba(255,92,56,0.16)' },
    resultChips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
    cheerLine: { color: textPrimary, fontSize: 15, lineHeight: 21, textAlign: 'center' }
  });
  // @end:styles

  // @section:TabNavigator @depends:[HomeScreen,RecipesScreen,navigation-setup]
  var TabNavigator = function() {
    var insets = useSafeAreaInsets();
    var language = useTheme().language;
    return React.createElement(View, { testID: 'View-49', style: { flex: 1, width: '100%', overflow: 'hidden' }, componentId: 'tab-shell' },
      React.createElement(Tab.Navigator, { testID: 'Navigator-1',
        screenOptions: {
          headerShown: false, hikariLiquidGlass: true, tabBarActiveTintColor: accentColor, tabBarInactiveTintColor: textSecondary,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600', letterSpacing: 0.2 },
          sceneContainerStyle: { backgroundColor: backgroundColor },
          tabBarStyle: { position: 'absolute', bottom: 0, height: Platform.OS === 'web' ? TAB_MENU_HEIGHT : TAB_MENU_HEIGHT + insets.bottom, paddingBottom: 0, borderTopWidth: 1, borderTopColor: borderColor, backgroundColor: cardColor }
        }
      },
        React.createElement(Tab.Screen, { testID: 'Screen-1', name: 'Pick', component: HomeScreen, options: { tabBarLabel: language === 'RU' ? 'Выбор' : 'Pick', tabBarIcon: function(info) { return React.createElement(Ionicons, { testID: 'Ionicons-11', name: info.focused ? 'home' : 'home-outline', size: 24, color: info.color }); } } }),
        React.createElement(Tab.Screen, { testID: 'Screen-2', name: 'Recipes', component: RecipesScreen, options: { tabBarLabel: language === 'RU' ? 'Рецепты' : 'Recipes', tabBarIcon: function(info) { return React.createElement(Ionicons, { testID: 'Ionicons-12', name: info.focused ? 'book' : 'book-outline', size: 24, color: info.color }); } } })));
  };
  // @end:TabNavigator

  // @section:MainNavigator @depends:[TabNavigator,SpinResultScreen,RecipeDetailScreen,DishEditorScreen,DishDetailScreen,CameraScreen,MenuManagerScreen,HistoryScreen,navigation-setup]
  var MainNavigator = function() {
    return React.createElement(Stack.Navigator, { testID: 'Navigator-2', initialRouteName: 'Main', screenOptions: { headerShown: false, cardStyle: { backgroundColor: backgroundColor } } },
      React.createElement(Stack.Screen, { testID: 'Screen-4', name: 'Main', component: TabNavigator }),
      React.createElement(Stack.Screen, { testID: 'Screen-5', name: 'SpinResult', component: SpinResultScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-6', name: 'RecipeDetail', component: RecipeDetailScreen }),
      React.createElement(Stack.Screen, { testID: 'Source-7', name: 'DishEditor', component: DishEditorScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-8', name: 'DishDetail', component: DishDetailScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-9', name: 'Camera', component: CameraScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-10', name: 'MenuManager', component: MenuManagerScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-11', name: 'History', component: HistoryScreen }));
  };
  // @end:MainNavigator

  // @section:return @depends:[ThemeContext,MainNavigator,sample-data,styles]
  if (seedSampleRows) seedSampleRows(SAMPLE_ROWS);
  return React.createElement(ThemeProvider, { testID: 'ThemeProvider-1' },
    React.createElement(View, { testID: 'View-50', style: styles.screen, componentId: 'app-root' },
      React.createElement(MainNavigator)));
  // @end:return
};
return ComponentFunction;