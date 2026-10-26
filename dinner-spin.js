const ComponentFunction = function() {
  // @section:imports @depends:[]
  const React = require('react');
  const { View, Text: NativeText, ScrollView: NativeScrollView, TouchableOpacity, TextInput: NativeTextInput, Image, StyleSheet, StatusBar, Platform, Alert, LayoutAnimation, Modal, Animated, PanResponder, Dimensions } = require('react-native');
  var ScrollView = React.forwardRef(function(props, ref) {
    return React.createElement(NativeScrollView, Object.assign({
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false
    }, props, { ref: ref }), props.children);
  });
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
    'Nothing matches this choice': 'Под этот выбор ничего не попало. Поменяйте фильтр или бюджет.',
    'No matches yet': 'Под фильтр ничего не попало',
    'Back to the choice': 'Вернуться к выбору',
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
    'You can stop deciding': 'Можно больше не выбирать.',
    'Search by name': 'Поиск по названию',
    'From outside': 'Извне',
    'Add from outside': 'Добавить извне',
    'Add a recipe from': 'Откуда добавить',
    'Online': 'Онлайн',
    'ZIP file': 'Файл ZIP',
    'Online is the catalog. A file is a zip with photos.': 'Онлайн — каталог с переводом. Файл — zip с фотографиями.',
    'Cook time': 'Время готовки',
    'Reading the archive…': 'Читаем архив…',
    'Search recipes': 'Найти рецепт',
    'Nothing in the catalog': 'В каталоге ничего не нашлось',
    'Catalog is unavailable': 'Каталог рецептов сейчас недоступен'
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
      { dish_name: 'Salmon Steak with Vegetables', price_rubles: 1800, ingredients: 'Salmon steak | 2 | pcs\nBroccoli florets | 300 | g\nLemon | 1 | pcs\nOlive oil | 1 | tbsp', recipe_steps: 'Heat the oven to 200°C. Cut the broccoli into florets and toss with olive oil, salt and pepper.', photo_uri: 'IMAGE:salmon-steak-roasted-vegetables', tags: ['Fish'] },
      { dish_name: 'Pasta Carbonara', price_rubles: 550, ingredients: 'Spaghetti | 250 | g\nBacon | 150 | g\nCream | 100 | ml\nParmesan | 60 | g', recipe_steps: 'Cook spaghetti in salted water until al dente.', photo_uri: 'IMAGE:pasta-carbonara', tags: [] },
      { dish_name: 'Siberian Pelmeni', price_rubles: 350, ingredients: 'Pelmeni | 400 | g\nSour cream | 3 | tbsp\nButter | 1 | tbsp', recipe_steps: 'Bring a large pot of salted water to a boil.', photo_uri: 'IMAGE:siberian-pelmeni', tags: [] }
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
  var PhotoViewer = function(props) {
    var uri = props.uri || '';
    var onCloseRef = React.useRef(props.onClose);
    onCloseRef.current = props.onClose;
    var scale = React.useRef(new Animated.Value(1)).current;
    var panX = React.useRef(new Animated.Value(0)).current;
    var panY = React.useRef(new Animated.Value(0)).current;
    var scaleRef = React.useRef(1);
    var panRef = React.useRef({ x: 0, y: 0 });
    var pinchRef = React.useRef(false);
    var startDistRef = React.useRef(0);
    var baseScaleRef = React.useRef(1);
    var basePanRef = React.useRef({ x: 0, y: 0 });
    var responder = React.useRef(PanResponder.create({
      onStartShouldSetPanResponder: function() { return true; },
      onMoveShouldSetPanResponder: function() { return true; },
      onPanResponderTerminationRequest: function() { return false; },
      onPanResponderGrant: function() {
        pinchRef.current = false;
        startDistRef.current = 0;
        basePanRef.current = { x: panRef.current.x, y: panRef.current.y };
        baseScaleRef.current = scaleRef.current || 1;
      },
      onPanResponderMove: function(evt, gesture) {
        var touches = evt.nativeEvent.touches || [];
        if (touches.length >= 2) {
          pinchRef.current = true;
          var dx = touches[0].pageX - touches[1].pageX;
          var dy = touches[0].pageY - touches[1].pageY;
          var dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (!startDistRef.current) {
            startDistRef.current = dist;
            baseScaleRef.current = scaleRef.current || 1;
          }
          var next = baseScaleRef.current * (dist / startDistRef.current);
          if (next < 1) next = 1;
          if (next > 4) next = 4;
          scaleRef.current = next;
          scale.setValue(next);
          return;
        }
        if (scaleRef.current > 1.01) {
          var x = basePanRef.current.x + gesture.dx;
          var y = basePanRef.current.y + gesture.dy;
          panRef.current = { x: x, y: y };
          panX.setValue(x);
          panY.setValue(y);
        }
      },
      onPanResponderRelease: function(_, gesture) {
        startDistRef.current = 0;
        var pinched = pinchRef.current;
        pinchRef.current = false;
        if (pinched) return;
        if (Math.abs(gesture.dx) > 12 || Math.abs(gesture.dy) > 12) return;
        if (onCloseRef.current) onCloseRef.current();
      },
      onPanResponderTerminate: function() { startDistRef.current = 0; pinchRef.current = false; }
    })).current;
    React.useEffect(function() {
      scale.setValue(1);
      panX.setValue(0);
      panY.setValue(0);
      scaleRef.current = 1;
      panRef.current = { x: 0, y: 0 };
    }, [uri]);
    if (!uri) return null;
    var size = Dimensions.get('window');
    return React.createElement(Modal, { visible: true, transparent: true, animationType: 'fade', onRequestClose: function() { if (onCloseRef.current) onCloseRef.current(); } },
      React.createElement(View, Object.assign({ style: styles.photoViewer }, responder.panHandlers),
        React.createElement(Animated.Image, {
          source: { uri: uri },
          resizeMode: 'contain',
          style: { width: size.width, height: size.height, transform: [{ translateX: panX }, { translateY: panY }, { scale: scale }] }
        })));
  };
  var RecipeStepHint = function(props) {
    var openState = React.useState(false);
    var visible = openState[0];
    var setVisible = openState[1];
    var zoomState = React.useState(false);
    var zoom = zoomState[0];
    var setZoom = zoomState[1];
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
            uri ? React.createElement(TouchableOpacity, { activeOpacity: 0.92, onPress: function() { setZoom(true); } },
              React.createElement(Image, { testID: 'Image-2', source: { uri: uri }, style: styles.hintModalImage, resizeMode: 'cover', componentId: props.id + '-hint-image' })) :
              React.createElement(View, { testID: 'View-9', style: styles.hintModalEmpty, componentId: props.id + '-hint-empty' },
                React.createElement(Ionicons, { testID: 'Ionicons-5', name: 'restaurant-outline', size: 40, color: accentColor })),
            React.createElement(Text, { testID: 'Text-8', style: styles.bodyMuted, componentId: props.id + '-hint-caption' }, props.step)))),
      React.createElement(PhotoViewer, { uri: zoom && uri ? uri : '', onClose: function() { setZoom(false); } }));
  };
  // @end:shared-components

  var FOOD_TAGS = ['Fish', 'Chicken', 'Beef', 'Veal'];
  var PLACE_TAGS = ['Restaurant', 'Cafe'];
  var onlyFoodTags = function(tags) {
    return (tags || []).filter(function(tag) { return FOOD_TAGS.indexOf(tag) >= 0; });
  };
  var placeCategoryOf = function(place) {
    var category = place && place.category;
    return category === 'Restaurant' || category === 'Cafe' ? category : '';
  };
  var cookMinutes = function(dish) {
    var tags = dish && dish.tags;
    var list = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(/[,|]/) : []);
    var i;
    for (i = 0; i < list.length; i += 1) {
      var match = String(list[i] || '').trim().match(/^min:(\d+)$/);
      if (match) return Number(match[1]);
    }
    var stored = Number(dish && (dish.cook_minutes || dish.cookMinutes));
    if (stored > 0) return Math.round(stored);
    return dishDetails(dish).minutes;
  };
  var tagsWithMinutes = function(tags, minutes) {
    var food = onlyFoodTags(tags);
    var count = Math.round(Number(minutes) || 0);
    if (count > 0) return food.concat(['min:' + count]);
    return food;
  };
  // @section:zip-import @depends:[shared-components]
  var inflateRaw = (function() {
    var module = { exports: {} };
    var exports = module.exports;
    /*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
    !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).pako={})}(this,(function(e){"use strict";var t=(e,t,i,n)=>{let a=65535&e|0,r=e>>>16&65535|0,o=0;for(;0!==i;){o=i>2e3?2e3:i,i-=o;do{a=a+t[n++]|0,r=r+a|0}while(--o);a%=65521,r%=65521}return a|r<<16|0};const i=new Uint32Array((()=>{let e,t=[];for(var i=0;i<256;i++){e=i;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[i]=e}return t})());var n=(e,t,n,a)=>{const r=i,o=a+n;e^=-1;for(let i=a;i<o;i++)e=e>>>8^r[255&(e^t[i])];return-1^e};const a=16209;var r=function(e,t){let i,n,r,o,s,l,d,f,c,h,u,w,b,m,k,_,g,p,v,x,y,E,R,A;const Z=e.state;i=e.next_in,R=e.input,n=i+(e.avail_in-5),r=e.next_out,A=e.output,o=r-(t-e.avail_out),s=r+(e.avail_out-257),l=Z.dmax,d=Z.wsize,f=Z.whave,c=Z.wnext,h=Z.window,u=Z.hold,w=Z.bits,b=Z.lencode,m=Z.distcode,k=(1<<Z.lenbits)-1,_=(1<<Z.distbits)-1;e:do{w<15&&(u+=R[i++]<<w,w+=8,u+=R[i++]<<w,w+=8),g=b[u&k];t:for(;;){if(p=g>>>24,u>>>=p,w-=p,p=g>>>16&255,0===p)A[r++]=65535&g;else{if(!(16&p)){if(0==(64&p)){g=b[(65535&g)+(u&(1<<p)-1)];continue t}if(32&p){Z.mode=16191;break e}e.msg="invalid literal/length code",Z.mode=a;break e}v=65535&g,p&=15,p&&(w<p&&(u+=R[i++]<<w,w+=8),v+=u&(1<<p)-1,u>>>=p,w-=p),w<15&&(u+=R[i++]<<w,w+=8,u+=R[i++]<<w,w+=8),g=m[u&_];i:for(;;){if(p=g>>>24,u>>>=p,w-=p,p=g>>>16&255,!(16&p)){if(0==(64&p)){g=m[(65535&g)+(u&(1<<p)-1)];continue i}e.msg="invalid distance code",Z.mode=a;break e}if(x=65535&g,p&=15,w<p&&(u+=R[i++]<<w,w+=8,w<p&&(u+=R[i++]<<w,w+=8)),x+=u&(1<<p)-1,x>l){e.msg="invalid distance too far back",Z.mode=a;break e}if(u>>>=p,w-=p,p=r-o,x>p){if(p=x-p,p>f&&Z.sane){e.msg="invalid distance too far back",Z.mode=a;break e}if(y=0,E=h,0===c){if(y+=d-p,p<v){v-=p;do{A[r++]=h[y++]}while(--p);y=r-x,E=A}}else if(c<p){if(y+=d+c-p,p-=c,p<v){v-=p;do{A[r++]=h[y++]}while(--p);if(y=0,c<v){p=c,v-=p;do{A[r++]=h[y++]}while(--p);y=r-x,E=A}}}else if(y+=c-p,p<v){v-=p;do{A[r++]=h[y++]}while(--p);y=r-x,E=A}for(;v>2;)A[r++]=E[y++],A[r++]=E[y++],A[r++]=E[y++],v-=3;v&&(A[r++]=E[y++],v>1&&(A[r++]=E[y++]))}else{y=r-x;do{A[r++]=A[y++],A[r++]=A[y++],A[r++]=A[y++],v-=3}while(v>2);v&&(A[r++]=A[y++],v>1&&(A[r++]=A[y++]))}break}}break}}while(i<n&&r<s);v=w>>3,i-=v,w-=v<<3,u&=(1<<w)-1,e.next_in=i,e.next_out=r,e.avail_in=i<n?n-i+5:5-(i-n),e.avail_out=r<s?s-r+257:257-(r-s),Z.hold=u,Z.bits=w};const o=15,s=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),l=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),d=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),f=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var c=(e,t,i,n,a,r,c,h)=>{const u=h.bits;let w,b,m,k,_,g,p=0,v=0,x=0,y=0,E=0,R=0,A=0,Z=0,S=0,T=0,O=null;const U=new Uint16Array(16),D=new Uint16Array(16);let I,B,N,C=null;for(p=0;p<=o;p++)U[p]=0;for(v=0;v<n;v++)U[t[i+v]]++;for(E=u,y=o;y>=1&&0===U[y];y--);if(E>y&&(E=y),0===y)return a[r++]=20971520,a[r++]=20971520,h.bits=1,0;for(x=1;x<y&&0===U[x];x++);for(E<x&&(E=x),Z=1,p=1;p<=o;p++)if(Z<<=1,Z-=U[p],Z<0)return-1;if(Z>0&&(0===e||1!==y))return-1;for(D[1]=0,p=1;p<o;p++)D[p+1]=D[p]+U[p];for(v=0;v<n;v++)0!==t[i+v]&&(c[D[t[i+v]]++]=v);if(0===e?(O=C=c,g=20):1===e?(O=s,C=l,g=257):(O=d,C=f,g=0),T=0,v=0,p=x,_=r,R=E,A=0,m=-1,S=1<<E,k=S-1,1===e&&S>852||2===e&&S>592)return 1;for(;;){I=p-A,c[v]+1<g?(B=0,N=c[v]):c[v]>=g?(B=C[c[v]-g],N=O[c[v]-g]):(B=96,N=0),w=1<<p-A,b=1<<R,x=b;do{b-=w,a[_+(T>>A)+b]=I<<24|B<<16|N|0}while(0!==b);for(w=1<<p-1;T&w;)w>>=1;if(0!==w?(T&=w-1,T+=w):T=0,v++,0==--U[p]){if(p===y)break;p=t[i+c[v]]}if(p>E&&(T&k)!==m){for(0===A&&(A=E),_+=x,R=p-A,Z=1<<R;R+A<y&&(Z-=U[R+A],!(Z<=0));)R++,Z<<=1;if(S+=1<<R,1===e&&S>852||2===e&&S>592)return 1;m=T&k,a[m]=E<<24|R<<16|_-r|0}}return 0!==T&&(a[_+T]=p-A<<24|64<<16|0),h.bits=E,0},h={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{Z_FINISH:u,Z_BLOCK:w,Z_TREES:b,Z_OK:m,Z_STREAM_END:k,Z_NEED_DICT:_,Z_STREAM_ERROR:g,Z_DATA_ERROR:p,Z_MEM_ERROR:v,Z_BUF_ERROR:x,Z_DEFLATED:y}=h,E=16180,R=16190,A=16191,Z=16192,S=16194,T=16199,O=16200,U=16206,D=16209,I=e=>(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24);function B(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const N=e=>{if(!e)return 1;const t=e.state;return!t||t.strm!==e||t.mode<E||t.mode>16211?1:0},C=e=>{if(N(e))return g;const t=e.state;return e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=E,t.last=0,t.havedict=0,t.flags=-1,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new Int32Array(852),t.distcode=t.distdyn=new Int32Array(592),t.sane=1,t.back=-1,m},z=e=>{if(N(e))return g;const t=e.state;return t.wsize=0,t.whave=0,t.wnext=0,C(e)},F=(e,t)=>{let i;if(N(e))return g;const n=e.state;return t<0?(i=0,t=-t):(i=5+(t>>4),t<48&&(t&=15)),t&&(t<8||t>15)?g:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=i,n.wbits=t,z(e))},L=(e,t)=>{if(!e)return g;const i=new B;e.state=i,i.strm=e,i.window=null,i.mode=E;const n=F(e,t);return n!==m&&(e.state=null),n};let M,H,j=!0;const K=e=>{if(j){M=new Int32Array(512),H=new Int32Array(32);let t=0;for(;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(c(1,e.lens,0,288,M,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;c(2,e.lens,0,32,H,0,e.work,{bits:5}),j=!1}e.lencode=M,e.lenbits=9,e.distcode=H,e.distbits=5},P=(e,t,i,n)=>{let a;const r=e.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new Uint8Array(r.wsize)),n>=r.wsize?(r.window.set(t.subarray(i-r.wsize,i),0),r.wnext=0,r.whave=r.wsize):(a=r.wsize-r.wnext,a>n&&(a=n),r.window.set(t.subarray(i-n,i-n+a),r.wnext),(n-=a)?(r.window.set(t.subarray(i-n,i),0),r.wnext=n,r.whave=r.wsize):(r.wnext+=a,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=a))),0};var Y={inflateReset:z,inflateReset2:F,inflateResetKeep:C,inflateInit:e=>L(e,15),inflateInit2:L,inflate:(e,i)=>{let a,o,s,l,d,f,h,B,C,z,F,L,M,H,j,Y,G,X,W,q,J,Q,V=0;const $=new Uint8Array(4);let ee,te;const ie=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(N(e)||!e.output||!e.input&&0!==e.avail_in)return g;a=e.state,a.mode===A&&(a.mode=Z),d=e.next_out,s=e.output,h=e.avail_out,l=e.next_in,o=e.input,f=e.avail_in,B=a.hold,C=a.bits,z=f,F=h,Q=m;e:for(;;)switch(a.mode){case E:if(0===a.wrap){a.mode=Z;break}for(;C<16;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(2&a.wrap&&35615===B){0===a.wbits&&(a.wbits=15),a.check=0,$[0]=255&B,$[1]=B>>>8&255,a.check=n(a.check,$,2,0),B=0,C=0,a.mode=16181;break}if(a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&B)<<8)+(B>>8))%31){e.msg="incorrect header check",a.mode=D;break}if((15&B)!==y){e.msg="unknown compression method",a.mode=D;break}if(B>>>=4,C-=4,J=8+(15&B),0===a.wbits&&(a.wbits=J),J>15||J>a.wbits){e.msg="invalid window size",a.mode=D;break}a.dmax=1<<a.wbits,a.flags=0,e.adler=a.check=1,a.mode=512&B?16189:A,B=0,C=0;break;case 16181:for(;C<16;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(a.flags=B,(255&a.flags)!==y){e.msg="unknown compression method",a.mode=D;break}if(57344&a.flags){e.msg="unknown header flags set",a.mode=D;break}a.head&&(a.head.text=B>>8&1),512&a.flags&&4&a.wrap&&($[0]=255&B,$[1]=B>>>8&255,a.check=n(a.check,$,2,0)),B=0,C=0,a.mode=16182;case 16182:for(;C<32;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}a.head&&(a.head.time=B),512&a.flags&&4&a.wrap&&($[0]=255&B,$[1]=B>>>8&255,$[2]=B>>>16&255,$[3]=B>>>24&255,a.check=n(a.check,$,4,0)),B=0,C=0,a.mode=16183;case 16183:for(;C<16;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}a.head&&(a.head.xflags=255&B,a.head.os=B>>8),512&a.flags&&4&a.wrap&&($[0]=255&B,$[1]=B>>>8&255,a.check=n(a.check,$,2,0)),B=0,C=0,a.mode=16184;case 16184:if(1024&a.flags){for(;C<16;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}a.length=B,a.head&&(a.head.extra_len=B),512&a.flags&&4&a.wrap&&($[0]=255&B,$[1]=B>>>8&255,a.check=n(a.check,$,2,0)),B=0,C=0}else a.head&&(a.head.extra=null);a.mode=16185;case 16185:if(1024&a.flags&&(L=a.length,L>f&&(L=f),L&&(a.head&&(J=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(o.subarray(l,l+L),J)),512&a.flags&&4&a.wrap&&(a.check=n(a.check,o,L,l)),f-=L,l+=L,a.length-=L),a.length))break e;a.length=0,a.mode=16186;case 16186:if(2048&a.flags){if(0===f)break e;L=0;do{J=o[l+L++],a.head&&J&&a.length<65536&&(a.head.name+=String.fromCharCode(J))}while(J&&L<f);if(512&a.flags&&4&a.wrap&&(a.check=n(a.check,o,L,l)),f-=L,l+=L,J)break e}else a.head&&(a.head.name=null);a.length=0,a.mode=16187;case 16187:if(4096&a.flags){if(0===f)break e;L=0;do{J=o[l+L++],a.head&&J&&a.length<65536&&(a.head.comment+=String.fromCharCode(J))}while(J&&L<f);if(512&a.flags&&4&a.wrap&&(a.check=n(a.check,o,L,l)),f-=L,l+=L,J)break e}else a.head&&(a.head.comment=null);a.mode=16188;case 16188:if(512&a.flags){for(;C<16;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(4&a.wrap&&B!==(65535&a.check)){e.msg="header crc mismatch",a.mode=D;break}B=0,C=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),e.adler=a.check=0,a.mode=A;break;case 16189:for(;C<32;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}e.adler=a.check=I(B),B=0,C=0,a.mode=R;case R:if(0===a.havedict)return e.next_out=d,e.avail_out=h,e.next_in=l,e.avail_in=f,a.hold=B,a.bits=C,_;e.adler=a.check=1,a.mode=A;case A:if(i===w||i===b)break e;case Z:if(a.last){B>>>=7&C,C-=7&C,a.mode=U;break}for(;C<3;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}switch(a.last=1&B,B>>>=1,C-=1,3&B){case 0:a.mode=16193;break;case 1:if(K(a),a.mode=T,i===b){B>>>=2,C-=2;break e}break;case 2:a.mode=16196;break;case 3:e.msg="invalid block type",a.mode=D}B>>>=2,C-=2;break;case 16193:for(B>>>=7&C,C-=7&C;C<32;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if((65535&B)!=(B>>>16^65535)){e.msg="invalid stored block lengths",a.mode=D;break}if(a.length=65535&B,B=0,C=0,a.mode=S,i===b)break e;case S:a.mode=16195;case 16195:if(L=a.length,L){if(L>f&&(L=f),L>h&&(L=h),0===L)break e;s.set(o.subarray(l,l+L),d),f-=L,l+=L,h-=L,d+=L,a.length-=L;break}a.mode=A;break;case 16196:for(;C<14;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(a.nlen=257+(31&B),B>>>=5,C-=5,a.ndist=1+(31&B),B>>>=5,C-=5,a.ncode=4+(15&B),B>>>=4,C-=4,a.nlen>286||a.ndist>30){e.msg="too many length or distance symbols",a.mode=D;break}a.have=0,a.mode=16197;case 16197:for(;a.have<a.ncode;){for(;C<3;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}a.lens[ie[a.have++]]=7&B,B>>>=3,C-=3}for(;a.have<19;)a.lens[ie[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,ee={bits:a.lenbits},Q=c(0,a.lens,0,19,a.lencode,0,a.work,ee),a.lenbits=ee.bits,Q){e.msg="invalid code lengths set",a.mode=D;break}a.have=0,a.mode=16198;case 16198:for(;a.have<a.nlen+a.ndist;){for(;V=a.lencode[B&(1<<a.lenbits)-1],j=V>>>24,Y=V>>>16&255,G=65535&V,!(j<=C);){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(G<16)B>>>=j,C-=j,a.lens[a.have++]=G;else{if(16===G){for(te=j+2;C<te;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(B>>>=j,C-=j,0===a.have){e.msg="invalid bit length repeat",a.mode=D;break}J=a.lens[a.have-1],L=3+(3&B),B>>>=2,C-=2}else if(17===G){for(te=j+3;C<te;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}B>>>=j,C-=j,J=0,L=3+(7&B),B>>>=3,C-=3}else{for(te=j+7;C<te;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}B>>>=j,C-=j,J=0,L=11+(127&B),B>>>=7,C-=7}if(a.have+L>a.nlen+a.ndist){e.msg="invalid bit length repeat",a.mode=D;break}for(;L--;)a.lens[a.have++]=J}}if(a.mode===D)break;if(0===a.lens[256]){e.msg="invalid code -- missing end-of-block",a.mode=D;break}if(a.lenbits=9,ee={bits:a.lenbits},Q=c(1,a.lens,0,a.nlen,a.lencode,0,a.work,ee),a.lenbits=ee.bits,Q){e.msg="invalid literal/lengths set",a.mode=D;break}if(a.distbits=6,a.distcode=a.distdyn,ee={bits:a.distbits},Q=c(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,ee),a.distbits=ee.bits,Q){e.msg="invalid distances set",a.mode=D;break}if(a.mode=T,i===b)break e;case T:a.mode=O;case O:if(f>=6&&h>=258){e.next_out=d,e.avail_out=h,e.next_in=l,e.avail_in=f,a.hold=B,a.bits=C,r(e,F),d=e.next_out,s=e.output,h=e.avail_out,l=e.next_in,o=e.input,f=e.avail_in,B=a.hold,C=a.bits,a.mode===A&&(a.back=-1);break}for(a.back=0;V=a.lencode[B&(1<<a.lenbits)-1],j=V>>>24,Y=V>>>16&255,G=65535&V,!(j<=C);){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(Y&&0==(240&Y)){for(X=j,W=Y,q=G;V=a.lencode[q+((B&(1<<X+W)-1)>>X)],j=V>>>24,Y=V>>>16&255,G=65535&V,!(X+j<=C);){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}B>>>=X,C-=X,a.back+=X}if(B>>>=j,C-=j,a.back+=j,a.length=G,0===Y){a.mode=16205;break}if(32&Y){a.back=-1,a.mode=A;break}if(64&Y){e.msg="invalid literal/length code",a.mode=D;break}a.extra=15&Y,a.mode=16201;case 16201:if(a.extra){for(te=a.extra;C<te;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}a.length+=B&(1<<a.extra)-1,B>>>=a.extra,C-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=16202;case 16202:for(;V=a.distcode[B&(1<<a.distbits)-1],j=V>>>24,Y=V>>>16&255,G=65535&V,!(j<=C);){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(0==(240&Y)){for(X=j,W=Y,q=G;V=a.distcode[q+((B&(1<<X+W)-1)>>X)],j=V>>>24,Y=V>>>16&255,G=65535&V,!(X+j<=C);){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}B>>>=X,C-=X,a.back+=X}if(B>>>=j,C-=j,a.back+=j,64&Y){e.msg="invalid distance code",a.mode=D;break}a.offset=G,a.extra=15&Y,a.mode=16203;case 16203:if(a.extra){for(te=a.extra;C<te;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}a.offset+=B&(1<<a.extra)-1,B>>>=a.extra,C-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){e.msg="invalid distance too far back",a.mode=D;break}a.mode=16204;case 16204:if(0===h)break e;if(L=F-h,a.offset>L){if(L=a.offset-L,L>a.whave&&a.sane){e.msg="invalid distance too far back",a.mode=D;break}L>a.wnext?(L-=a.wnext,M=a.wsize-L):M=a.wnext-L,L>a.length&&(L=a.length),H=a.window}else H=s,M=d-a.offset,L=a.length;L>h&&(L=h),h-=L,a.length-=L;do{s[d++]=H[M++]}while(--L);0===a.length&&(a.mode=O);break;case 16205:if(0===h)break e;s[d++]=a.length,h--,a.mode=O;break;case U:if(a.wrap){for(;C<32;){if(0===f)break e;f--,B|=o[l++]<<C,C+=8}if(F-=h,e.total_out+=F,a.total+=F,4&a.wrap&&F&&(e.adler=a.check=a.flags?n(a.check,s,F,d-F):t(a.check,s,F,d-F)),F=h,4&a.wrap&&(a.flags?B:I(B))!==a.check){e.msg="incorrect data check",a.mode=D;break}B=0,C=0}a.mode=16207;case 16207:if(a.wrap&&a.flags){for(;C<32;){if(0===f)break e;f--,B+=o[l++]<<C,C+=8}if(4&a.wrap&&B!==(4294967295&a.total)){e.msg="incorrect length check",a.mode=D;break}B=0,C=0}a.mode=16208;case 16208:Q=k;break e;case D:Q=p;break e;case 16210:return v;default:return g}return e.next_out=d,e.avail_out=h,e.next_in=l,e.avail_in=f,a.hold=B,a.bits=C,(a.wsize||F!==e.avail_out&&a.mode<D&&(a.mode<U||i!==u))&&P(e,e.output,e.next_out,F-e.avail_out),z-=e.avail_in,F-=e.avail_out,e.total_in+=z,e.total_out+=F,a.total+=F,4&a.wrap&&F&&(e.adler=a.check=a.flags?n(a.check,s,F,e.next_out-F):t(a.check,s,F,e.next_out-F)),e.data_type=a.bits+(a.last?64:0)+(a.mode===A?128:0)+(a.mode===T||a.mode===S?256:0),(0===z&&0===F||i===u)&&Q===m&&(Q=x),Q},inflateEnd:e=>{if(N(e))return g;let t=e.state;return t.window&&(t.window=null),e.state=null,m},inflateGetHeader:(e,t)=>{if(N(e))return g;const i=e.state;return 0==(2&i.wrap)?g:(i.head=t,t.done=!1,m)},inflateSetDictionary:(e,i)=>{const n=i.length;let a,r,o;return N(e)?g:(a=e.state,0!==a.wrap&&a.mode!==R?g:a.mode===R&&(r=1,r=t(r,i,n,0),r!==a.check)?p:(o=P(e,i,n,n),o?(a.mode=16210,v):(a.havedict=1,m)))},inflateInfo:"pako inflate (from Nodeca project)"};const G=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var X=function(e){const t=Array.prototype.slice.call(arguments,1);for(;t.length;){const i=t.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(const t in i)G(i,t)&&(e[t]=i[t])}}return e},W=e=>{let t=0;for(let i=0,n=e.length;i<n;i++)t+=e[i].length;const i=new Uint8Array(t);for(let t=0,n=0,a=e.length;t<a;t++){let a=e[t];i.set(a,n),n+=a.length}return i};let q=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){q=!1}const J=new Uint8Array(256);for(let e=0;e<256;e++)J[e]=e>=252?6:e>=248?5:e>=240?4:e>=224?3:e>=192?2:1;J[254]=J[254]=1;var Q=e=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(e);let t,i,n,a,r,o=e.length,s=0;for(a=0;a<o;a++)i=e.charCodeAt(a),55296==(64512&i)&&a+1<o&&(n=e.charCodeAt(a+1),56320==(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),a++)),s+=i<128?1:i<2048?2:i<65536?3:4;for(t=new Uint8Array(s),r=0,a=0;r<s;a++)i=e.charCodeAt(a),55296==(64512&i)&&a+1<o&&(n=e.charCodeAt(a+1),56320==(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),a++)),i<128?t[r++]=i:i<2048?(t[r++]=192|i>>>6,t[r++]=128|63&i):i<65536?(t[r++]=224|i>>>12,t[r++]=128|i>>>6&63,t[r++]=128|63&i):(t[r++]=240|i>>>18,t[r++]=128|i>>>12&63,t[r++]=128|i>>>6&63,t[r++]=128|63&i);return t},V=(e,t)=>{const i=t||e.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(e.subarray(0,t));let n,a;const r=new Array(2*i);for(a=0,n=0;n<i;){let t=e[n++];if(t<128){r[a++]=t;continue}let o=J[t];if(o>4)r[a++]=65533,n+=o-1;else{for(t&=2===o?31:3===o?15:7;o>1&&n<i;)t=t<<6|63&e[n++],o--;o>1?r[a++]=65533:t<65536?r[a++]=t:(t-=65536,r[a++]=55296|t>>10&1023,r[a++]=56320|1023&t)}}return((e,t)=>{if(t<65534&&e.subarray&&q)return String.fromCharCode.apply(null,e.length===t?e:e.subarray(0,t));let i="";for(let n=0;n<t;n++)i+=String.fromCharCode(e[n]);return i})(r,a)},$=(e,t)=>{(t=t||e.length)>e.length&&(t=e.length);let i=t-1;for(;i>=0&&128==(192&e[i]);)i--;return i<0||0===i?t:i+J[e[i]]>t?i:t},ee={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};var te=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};var ie=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const ne=Object.prototype.toString,{Z_NO_FLUSH:ae,Z_FINISH:re,Z_OK:oe,Z_STREAM_END:se,Z_NEED_DICT:le,Z_STREAM_ERROR:de,Z_DATA_ERROR:fe,Z_MEM_ERROR:ce}=h;function he(e){this.options=X({chunkSize:65536,windowBits:15,to:""},e||{});const t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new te,this.strm.avail_out=0;let i=Y.inflateInit2(this.strm,t.windowBits);if(i!==oe)throw new Error(ee[i]);if(this.header=new ie,Y.inflateGetHeader(this.strm,this.header),t.dictionary&&("string"==typeof t.dictionary?t.dictionary=Q(t.dictionary):"[object ArrayBuffer]"===ne.call(t.dictionary)&&(t.dictionary=new Uint8Array(t.dictionary)),t.raw&&(i=Y.inflateSetDictionary(this.strm,t.dictionary),i!==oe)))throw new Error(ee[i])}function ue(e,t){const i=new he(t);if(i.push(e),i.err)throw i.msg||ee[i.err];return i.result}he.prototype.push=function(e,t){const i=this.strm,n=this.options.chunkSize,a=this.options.dictionary;let r,o,s;if(this.ended)return!1;for(o=t===~~t?t:!0===t?re:ae,"[object ArrayBuffer]"===ne.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;;){for(0===i.avail_out&&(i.output=new Uint8Array(n),i.next_out=0,i.avail_out=n),r=Y.inflate(i,o),r===le&&a&&(r=Y.inflateSetDictionary(i,a),r===oe?r=Y.inflate(i,o):r===fe&&(r=le));i.avail_in>0&&r===se&&i.state.wrap>0&&0!==e[i.next_in];)Y.inflateReset(i),r=Y.inflate(i,o);switch(r){case de:case fe:case le:case ce:return this.onEnd(r),this.ended=!0,!1}if(s=i.avail_out,i.next_out&&(0===i.avail_out||r===se))if("string"===this.options.to){let e=$(i.output,i.next_out),t=i.next_out-e,a=V(i.output,e);i.next_out=t,i.avail_out=n-t,t&&i.output.set(i.output.subarray(e,e+t),0),this.onData(a)}else this.onData(i.output.length===i.next_out?i.output:i.output.subarray(0,i.next_out));if(r!==oe||0!==s){if(r===se)return r=Y.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,!0;if(0===i.avail_in)break}}return!0},he.prototype.onData=function(e){this.chunks.push(e)},he.prototype.onEnd=function(e){e===oe&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=W(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg};var we=he,be=ue,me=function(e,t){return(t=t||{}).raw=!0,ue(e,t)},ke=ue,_e=h,ge={Inflate:we,inflate:be,inflateRaw:me,ungzip:ke,constants:_e};e.Inflate=we,e.constants=_e,e.default=ge,e.inflate=be,e.inflateRaw=me,e.ungzip=ke,Object.defineProperty(e,"__esModule",{value:!0})}));
    return exports.inflateRaw;
  })();
  var u16 = function(bytes, offset) { return bytes[offset] | (bytes[offset + 1] << 8); };
  var u32 = function(bytes, offset) {
    return (bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) >>> 0;
  };
  var bytesToText = function(bytes) {
    if (typeof TextDecoder === 'function') {
      try { return new TextDecoder('utf-8').decode(bytes); } catch (err) {}
    }
    var out = '';
    var i = 0;
    while (i < bytes.length) {
      var c = bytes[i];
      if (c < 128) { out += String.fromCharCode(c); i += 1; }
      else if (c < 224) { out += String.fromCharCode(((c & 31) << 6) | (bytes[i + 1] & 63)); i += 2; }
      else if (c < 240) { out += String.fromCharCode(((c & 15) << 12) | ((bytes[i + 1] & 63) << 6) | (bytes[i + 2] & 63)); i += 3; }
      else {
        var cp = ((c & 7) << 18) | ((bytes[i + 1] & 63) << 12) | ((bytes[i + 2] & 63) << 6) | (bytes[i + 3] & 63);
        cp -= 0x10000;
        out += String.fromCharCode(0xD800 + (cp >> 10), 0xDC00 + (cp & 1023));
        i += 4;
      }
    }
    return out;
  };
  var bytesToBase64 = function(bytes) {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var out = '';
    var i = 0;
    for (; i + 2 < bytes.length; i += 3) {
      var n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
      out += alphabet[(n >> 18) & 63] + alphabet[(n >> 12) & 63] + alphabet[(n >> 6) & 63] + alphabet[n & 63];
    }
    if (i < bytes.length) {
      var rest = (bytes[i] << 16) | ((i + 1 < bytes.length ? bytes[i + 1] : 0) << 8);
      out += alphabet[(rest >> 18) & 63] + alphabet[(rest >> 12) & 63];
      out += i + 1 < bytes.length ? alphabet[(rest >> 6) & 63] : '=';
      out += '=';
    }
    return out;
  };
  var base64ToBytes = function(b64) {
    var clean = String(b64 || '').replace(/^data:.*?;base64,/, '').replace(/\s/g, '');
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var bytes = [];
    var i;
    for (i = 0; i < clean.length; i += 4) {
      var a = alphabet.indexOf(clean.charAt(i));
      var b = alphabet.indexOf(clean.charAt(i + 1));
      var c = alphabet.indexOf(clean.charAt(i + 2));
      var d = alphabet.indexOf(clean.charAt(i + 3));
      if (a < 0 || b < 0) break;
      var n = (a << 18) | (b << 12) | ((c < 0 ? 0 : c) << 6) | (d < 0 ? 0 : d);
      bytes.push((n >> 16) & 255);
      if (c >= 0) bytes.push((n >> 8) & 255);
      if (d >= 0) bytes.push(n & 255);
    }
    return new Uint8Array(bytes);
  };
  var findEocd = function(bytes) {
    var maxBack = Math.min(bytes.length, 22 + 65535);
    var start = bytes.length - maxBack;
    var i;
    for (i = bytes.length - 22; i >= start; i -= 1) {
      if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x05 && bytes[i + 3] === 0x06) return i;
    }
    return -1;
  };
  var readZipEntries = function(bytes) {
    var entries = [];
    var eocd = findEocd(bytes);
    if (eocd >= 0) {
      var count = u16(bytes, eocd + 10);
      var offset = u32(bytes, eocd + 16);
      var i;
      for (i = 0; i < count; i += 1) {
        if (offset + 46 > bytes.length || u32(bytes, offset) !== 0x02014b50) break;
        var method = u16(bytes, offset + 10);
        var compSize = u32(bytes, offset + 20);
        var rawSize = u32(bytes, offset + 24);
        var nameLen = u16(bytes, offset + 28);
        var extraLen = u16(bytes, offset + 30);
        var commentLen = u16(bytes, offset + 32);
        var localOff = u32(bytes, offset + 42);
        var name = bytesToText(bytes.subarray(offset + 46, offset + 46 + nameLen));
        var localNameLen = u16(bytes, localOff + 26);
        var localExtraLen = u16(bytes, localOff + 28);
        var dataOff = localOff + 30 + localNameLen + localExtraLen;
        entries.push({ name: name.replace(/\\/g, '/'), method: method, compSize: compSize, rawSize: rawSize, dataOff: dataOff });
        offset += 46 + nameLen + extraLen + commentLen;
      }
      if (entries.length) return entries;
    }
    var cursor = 0;
    while (cursor + 30 < bytes.length && u32(bytes, cursor) === 0x04034b50) {
      var method2 = u16(bytes, cursor + 8);
      var flag = u16(bytes, cursor + 6);
      var comp2 = u32(bytes, cursor + 18);
      var raw2 = u32(bytes, cursor + 22);
      var nameLen2 = u16(bytes, cursor + 26);
      var extra2 = u16(bytes, cursor + 28);
      var name2 = bytesToText(bytes.subarray(cursor + 30, cursor + 30 + nameLen2));
      var dataOff2 = cursor + 30 + nameLen2 + extra2;
      if ((flag & 8) && !comp2) break;
      entries.push({ name: name2.replace(/\\/g, '/'), method: method2, compSize: comp2, rawSize: raw2, dataOff: dataOff2 });
      cursor = dataOff2 + comp2;
    }
    return entries;
  };
  var unzipEntry = function(bytes, entry) {
    var slice = bytes.subarray(entry.dataOff, entry.dataOff + entry.compSize);
    if (entry.method === 0) return slice;
    if (entry.method === 8) return inflateRaw(slice);
    throw new Error('zip-method');
  };
  var imageDataUri = function(name, bytes) {
    var lower = String(name || '').toLowerCase();
    var mime = lower.indexOf('.png') >= 0 ? 'image/png' : lower.indexOf('.webp') >= 0 ? 'image/webp' : 'image/jpeg';
    return 'data:' + mime + ';base64,' + bytesToBase64(bytes);
  };
  var normalizeUnit = function(unit) {
    var raw = String(unit || '').trim().toLowerCase().replace(/\s+/g, '');
    var map = {
      'г': 'г', 'g': 'г', 'гр': 'г', 'грамм': 'г', 'грамма': 'г',
      'кг': 'кг', 'kg': 'кг',
      'мл': 'мл', 'ml': 'мл',
      'л': 'л', 'l': 'л',
      'шт': 'шт.', 'шт.': 'шт.', 'pcs': 'шт.', 'pc': 'шт.', 'piece': 'шт.',
      'ст.л.': 'ст. л.', 'стл': 'ст. л.', 'tbsp': 'ст. л.', 'tablespoon': 'ст. л.',
      'ч.л.': 'ч. л.', 'чл': 'ч. л.', 'tsp': 'ч. л.', 'teaspoon': 'ч. л.'
    };
    return map[raw] || 'г';
  };
  var mapFoodTag = function(tag) {
    var raw = String(tag || '').trim().toLowerCase();
    if (raw === 'рыба' || raw === 'fish') return 'Fish';
    if (raw === 'курица' || raw === 'chicken') return 'Chicken';
    if (raw === 'говядина' || raw === 'beef') return 'Beef';
    if (raw === 'телятина' || raw === 'veal') return 'Veal';
    if (['Fish', 'Chicken', 'Beef', 'Veal'].indexOf(tag) >= 0) return tag;
    return '';
  };
  var minutesInText = function(text) {
    var best = 0;
    var re = /(\d+)\s*[–—-]\s*(\d+)\s*(?:минут|мин|minutes|minute|min)|(\d+)\s*(?:минут|мин|minutes|minute|min)/gi;
    var match;
    while ((match = re.exec(String(text || '')))) {
      var n = match[2] ? Number(match[2]) : Number(match[3]);
      if (n > best && n < 24 * 60) best = n;
    }
    return best;
  };
  var recipeMinutes = function(recipe) {
    var direct = Number(recipe && (recipe.minutes || recipe.cook_minutes || recipe.cookMinutes || recipe.time_minutes));
    if (direct > 0 && direct < 24 * 60) return Math.round(direct);
    var steps = recipe && recipe.steps || [];
    var text = steps.map(function(step) { return step && (step.text || step) || ''; }).join('\n');
    return minutesInText(text);
  };
  var findZipFile = function(entries, path) {
    var want = String(path || '').replace(/\\/g, '/').replace(/^\.\//, '');
    var i;
    for (i = 0; i < entries.length; i += 1) {
      if (entries[i].name === want) return entries[i];
    }
    var base = want.split('/').pop().toLowerCase();
    for (i = 0; i < entries.length; i += 1) {
      if (entries[i].name.split('/').pop().toLowerCase() === base) return entries[i];
    }
    return null;
  };
  var recipesFromZipBytes = function(bytes) {
    var entries = readZipEntries(bytes).filter(function(entry) {
      return entry.name && entry.name.slice(-1) !== '/';
    });
    var groups = {};
    entries.forEach(function(entry) {
      var slash = entry.name.lastIndexOf('/');
      var folder = slash >= 0 ? entry.name.slice(0, slash) : '';
      if (!groups[folder]) groups[folder] = [];
      groups[folder].push(entry);
    });
    var dishes = [];
    Object.keys(groups).sort().forEach(function(folder) {
      var files = groups[folder];
      var recipeFile = null;
      var photoFile = null;
      files.forEach(function(entry) {
        var base = entry.name.split('/').pop().toLowerCase();
        if (base === 'recipe.json') recipeFile = entry;
        if (!photoFile && /^photo\.(jpe?g|png|webp)$/.test(base)) photoFile = entry;
      });
      if (!recipeFile) return;
      var recipe;
      try { recipe = JSON.parse(bytesToText(unzipEntry(bytes, recipeFile))); }
      catch (err) { return; }
      if (!recipe || !String(recipe.name || recipe.dish_name || '').trim()) return;
      var ingredients = (recipe.ingredients || []).map(function(item) {
        var amount = item && item.amount != null ? String(item.amount) : '1';
        return { name: String(item && item.name || '').trim(), amount: amount, unit: normalizeUnit(item && item.unit) };
      }).filter(function(item) { return item.name; });
      var steps = (recipe.steps || []).map(function(step) {
        var text = String(step && (step.text || step) || '').trim();
        var photo = '';
        var photoName = step && typeof step.photo === 'string' ? step.photo : '';
        if (photoName) {
          var photoEntry = findZipFile(entries, folder ? folder + '/' + photoName.replace(/^\.\//, '') : photoName);
          if (!photoEntry) photoEntry = findZipFile(entries, photoName);
          if (photoEntry) {
            try { photo = imageDataUri(photoEntry.name, unzipEntry(bytes, photoEntry)); } catch (err) { photo = ''; }
          }
        }
        return { text: text, photo: photo };
      }).filter(function(step) { return step.text; });
      var tags = [];
      (recipe.tags || []).forEach(function(tag) {
        var mapped = mapFoodTag(tag);
        if (mapped && tags.indexOf(mapped) < 0) tags.push(mapped);
      });
      var photoUri = '';
      if (photoFile) {
        try { photoUri = imageDataUri(photoFile.name, unzipEntry(bytes, photoFile)); } catch (err) { photoUri = ''; }
      }
      var minutes = recipeMinutes(recipe) || 30;
      dishes.push({
        dish_name: String(recipe.name || recipe.dish_name).trim(),
        price_rubles: Number(recipe.price != null ? recipe.price : recipe.price_rubles) || 0,
        ingredients: ingredients,
        steps: steps,
        photo_uri: photoUri,
        tags: tags,
        cook_minutes: minutes
      });
    });
    return dishes;
  };
  var isPickerCancel = function(err) {
    var msg = String(err && (err.code || err.message) || err || '');
    return /cancel|canceled|cancelled|CANCELED|ABORT_ERR/i.test(msg);
  };
  var readPickedBytes = function(asset) {
    var uri = '';
    if (typeof asset === 'string') uri = asset;
    else if (asset) uri = asset.uri || asset.fileCopyUri || asset.file || asset.path || '';
    if (typeof uri !== 'string') uri = '';
    var fromBase64 = function() {
      if (asset && asset.base64) return Promise.resolve(base64ToBytes(asset.base64));
      return Promise.reject(new Error('no-base64'));
    };
    var fromFetch = function() {
      if (!uri || typeof fetch !== 'function') return Promise.reject(new Error('no-uri'));
      return fetch(uri).then(function(response) {
        if (!response || !response.arrayBuffer) return Promise.reject(new Error('no-buffer'));
        return response.arrayBuffer();
      }).then(function(buffer) { return new Uint8Array(buffer); });
    };
    var readers = [];
    try {
      var FS = require('expo-file-system');
      var readString = FS && (FS.readAsStringAsync || (FS.default && FS.default.readAsStringAsync));
      var encoding = (FS && FS.EncodingType && FS.EncodingType.Base64) || 'base64';
      if (readString) readers.push(function() { return readString(uri, { encoding: encoding }).then(base64ToBytes); });
    } catch (fsErr) {}
    try {
      var RNFS = require('react-native-fs');
      var readFile = RNFS && (RNFS.readFile || (RNFS.default && RNFS.default.readFile));
      if (readFile) readers.push(function() { return readFile(String(uri).replace(/^file:\/\//, ''), 'base64').then(base64ToBytes); });
    } catch (rnfsErr) {}
    try {
      var blobUtil = require('react-native-blob-util');
      var util = blobUtil && (blobUtil.default || blobUtil);
      if (util && util.fs && util.fs.readFile) readers.push(function() { return util.fs.readFile(String(uri).replace(/^file:\/\//, ''), 'base64').then(base64ToBytes); });
    } catch (blobErr) {}
    var runReaders = function(index) {
      if (index >= readers.length) return Promise.reject(new Error('read'));
      return readers[index]().catch(function() { return runReaders(index + 1); });
    };
    return fromBase64().catch(fromFetch).catch(function() { return runReaders(0); });
  };
  var pickRecipeArchive = function() {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      return new Promise(function(resolve, reject) {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.zip,application/zip,application/octet-stream';
        input.onchange = function() {
          var file = input.files && input.files[0];
          if (!file) { reject(new Error('cancel')); return; }
          var reader = new FileReader();
          reader.onload = function() { resolve(new Uint8Array(reader.result)); };
          reader.onerror = function() { reject(new Error('read')); };
          reader.readAsArrayBuffer(file);
        };
        input.click();
      });
    }
    var attempts = [];
    var takeAsset = function(result) {
      if (!result || result.canceled || result.type === 'cancel') return Promise.resolve(null);
      var asset = result.assets && result.assets[0] ? result.assets[0] : result;
      if (!asset || asset.canceled || asset.type === 'cancel') return Promise.resolve(null);
      if (Array.isArray(asset)) asset = asset[0];
      if (!asset) return Promise.resolve(null);
      return readPickedBytes(asset);
    };
    try {
      var expoPicker = require('expo-document-picker');
      var getDocument = expoPicker && (expoPicker.getDocumentAsync || (expoPicker.default && expoPicker.default.getDocumentAsync));
      if (getDocument) attempts.push(function() {
        return getDocument({ type: ['application/zip', 'application/octet-stream', '*/*'], copyToCacheDirectory: true, multiple: false }).then(takeAsset);
      });
    } catch (expoErr) {}
    try {
      var legacyPicker = require('react-native-document-picker');
      var legacyPick = legacyPicker && (legacyPicker.pick || (legacyPicker.default && legacyPicker.default.pick));
      var zipType = legacyPicker && legacyPicker.types && legacyPicker.types.zip ? legacyPicker.types.zip : 'application/zip';
      if (legacyPick) attempts.push(function() {
        return legacyPick({ type: [zipType], copyTo: 'cachesDirectory' }).then(takeAsset);
      });
    } catch (legacyErr) {}
    try {
      var docsPicker = require('@react-native-documents/picker');
      var docsPick = docsPicker && (docsPicker.pick || (docsPicker.default && docsPicker.default.pick));
      if (docsPick) attempts.push(function() {
        return docsPick({ type: ['application/zip', 'application/octet-stream'] }).then(takeAsset);
      });
    } catch (docsErr) {}
    try {
      var native = require('react-native').NativeModules || {};
      ['RNDocumentPicker', 'RNCDocumentPicker', 'DocumentPicker'].forEach(function(name) {
        var mod = native[name];
        var pick = mod && (mod.pickSingle || mod.pick);
        if (!pick) return;
        attempts.push(function() { return Promise.resolve(pick.call(mod, { type: ['application/zip'] })).then(takeAsset); });
      });
    } catch (nativeErr) {}
    if (!attempts.length) return Promise.reject(new Error('no-picker'));
    var run = function(index) {
      if (index >= attempts.length) return Promise.reject(new Error('no-picker'));
      return attempts[index]().catch(function(err) {
        if (isPickerCancel(err)) return Promise.reject(err);
        return run(index + 1);
      });
    };
    return run(0);
  };
  // @end:zip-import
  var ruNoun = function(n, one, few, many) {
    var n10 = n % 10;
    var n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
    return many;
  };
  var decodeTranslated = function(value) {
    return String(value || '')
      .replace(/&#(\d+);/g, function(_, code) { return String.fromCharCode(Number(code)); })
      .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'");
  };
  var tidyTranslation = function(value) {
    var text = decodeTranslated(value).replace(/\u00a0/g, ' ');
    var pass;
    for (pass = 0; pass < 2; pass += 1) {
      if (!/%[0-9A-Fa-f]{2}/.test(text)) break;
      try { text = decodeURIComponent(text.replace(/\+/g, ' ')); }
      catch (err) { break; }
    }
    return text.replace(/%20/gi, ' ').replace(/%0A/gi, '\n').replace(/[ \t]{2,}/g, ' ').trim();
  };
  var translateOne = function(text, from, to) {
    var source = String(text || '').replace(/\s+/g, ' ').trim();
    if (!source) return Promise.resolve('');
    var body = 'q=' + encodeURIComponent(source).replace(/%20/g, '+') + '&langpair=' + from + '|' + to;
    return fetch('https://api.mymemory.translated.net/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    }).then(function(response) { return response.json(); }).then(function(data) {
      var raw = data && data.responseData && data.responseData.translatedText;
      if (!raw || /MYMEMORY WARNING|QUERY LENGTH LIMIT|INVALID LANGUAGE/i.test(raw)) return source;
      var tidy = tidyTranslation(raw);
      if (!tidy || /MYMEMORY WARNING|%20/i.test(tidy)) return source;
      return tidy;
    }).catch(function() { return source; });
  };
  var translateLines = function(lines, from, to) {
    var clean = (lines || []).map(function(line) { return String(line || '').replace(/\s+/g, ' ').trim(); });
    var out = clean.slice();
    var cursor = 0;
    var worker = function() {
      if (cursor >= clean.length) return Promise.resolve();
      var current = cursor;
      cursor += 1;
      if (!clean[current]) return worker();
      return translateOne(clean[current], from, to).then(function(line) {
        out[current] = line || clean[current];
        return worker();
      });
    };
    return Promise.all([worker(), worker(), worker()]).then(function() { return out; });
  };
  var parseMeasure = function(measure) {
    var fractions = { '¼': '1/4', '½': '1/2', '¾': '3/4', '⅓': '1/3', '⅔': '2/3', '⅛': '1/8' };
    var raw = String(measure || '').trim();
    Object.keys(fractions).forEach(function(mark) { raw = raw.split(mark).join(' ' + fractions[mark] + ' '); });
    raw = raw.replace(/,/g, '.').replace(/\s+/g, ' ').trim();
    if (!raw || /^to taste$/i.test(raw)) return { amount: '1', unit: 'шт.' };
    var num = null;
    var rest = raw;
    var mixed = raw.match(/^(\d+(?:\.\d+)?)\s+(\d+)\/(\d+)/);
    var fraction = raw.match(/^(\d+)\/(\d+)/);
    var decimal = raw.match(/^(\d+(?:\.\d+)?)/);
    if (mixed) {
      num = parseFloat(mixed[1]) + (parseFloat(mixed[2]) / parseFloat(mixed[3]));
      rest = raw.slice(mixed[0].length).trim();
    } else if (fraction) {
      num = parseFloat(fraction[1]) / parseFloat(fraction[2]);
      rest = raw.slice(fraction[0].length).trim();
    } else if (decimal) {
      num = parseFloat(decimal[1]);
      rest = raw.slice(decimal[0].length).trim();
    }
    if (num == null || !isFinite(num) || num <= 0) return { amount: '1', unit: 'шт.' };
    var rules = [
      [/^(kg|kgs|kilogram|kilograms)$/i, 'кг', 1],
      [/^(g|gm|gms|gram|grams)$/i, 'г', 1],
      [/^(ml|millilitre|millilitres|milliliter|milliliters)$/i, 'мл', 1],
      [/^(l|lt|litre|liter|litres|liters)$/i, 'л', 1],
      [/^(tbsp|tbsps|tablespoon|tablespoons|tbls)$/i, 'ст. л.', 1],
      [/^(tsp|tsps|teaspoon|teaspoons)$/i, 'ч. л.', 1],
      [/^(cup|cups)$/i, 'мл', 240],
      [/^(oz|ounce|ounces)$/i, 'г', 28],
      [/^(lb|lbs|pound|pounds)$/i, 'г', 454],
      [/^(clove|cloves|piece|pieces|slice|slices|whole|can|cans|jar|jars|bunch|bunches|sprig|sprigs|pinch|pinches|handful|large|small|medium|stalk|stalks)$/i, 'шт.', 1]
    ];
    var unit = 'шт.';
    var factor = 1;
    rest.split(/\s+/).some(function(word) {
      var token = word.replace(/[.,]/g, '');
      return rules.some(function(rule) {
        if (!rule[0].test(token)) return false;
        unit = rule[1];
        factor = rule[2];
        return true;
      });
    });
    num = num * factor;
    var amount = num >= 10 ? String(Math.round(num)) : String(Math.round(num * 10) / 10);
    if (amount.indexOf('.') >= 0) amount = amount.replace(/\.0$/, '');
    return { amount: amount, unit: unit };
  };
  var mealIngredients = function(meal) {
    var rows = [];
    for (var index = 1; index <= 20; index += 1) {
      var name = String(meal['strIngredient' + index] || '').trim();
      if (!name) continue;
      var parsed = parseMeasure(meal['strMeasure' + index]);
      rows.push({ name: name, amount: parsed.amount, unit: parsed.unit });
    }
    return rows.length ? rows : [{ name: '', amount: '', unit: 'г' }];
  };
  var shortenMethod = function(instructions) {
    var text = String(instructions || '').replace(/\r/g, '\n').trim();
    var splitSentences = function(value) {
      var out = [];
      var buf = '';
      for (var i = 0; i < value.length; i += 1) {
        var ch = value.charAt(i);
        buf += ch;
        if (/[.!?]/.test(ch) && (i === value.length - 1 || value.charAt(i + 1) === ' ')) {
          if (buf.trim()) out.push(buf.trim());
          buf = '';
          if (value.charAt(i + 1) === ' ') i += 1;
        }
      }
      if (buf.trim()) out.push(buf.trim());
      return out;
    };
    var chunks = text.split(/\n+/).map(function(line) {
      return line.replace(/^\s*(step\s*)?\d+[\).:\-]\s*/i, '').replace(/\s+/g, ' ').trim();
    }).filter(function(line) { return line.length >= 8; });
    if (chunks.length <= 1) chunks = splitSentences(text.replace(/\n+/g, ' ')).filter(function(line) { return line.length >= 8; });
    var steps = [];
    chunks.forEach(function(line) {
      if (line.length <= 180) steps.push(line);
      else splitSentences(line).forEach(function(sentence) {
        var clean = sentence.trim();
        if (clean.length < 8) return;
        steps.push(clean.length > 180 ? clean.slice(0, 177).replace(/\s+\S*$/, '') + '…' : clean);
      });
    });
    if (steps.length > 8) {
      var grouped = [];
      var size = Math.ceil(steps.length / 8);
      for (var start = 0; start < steps.length && grouped.length < 8; start += size) {
        var piece = steps.slice(start, start + size).join(' ');
        if (piece.length > 180) piece = piece.slice(0, 177).replace(/\s+\S*$/, '') + '…';
        grouped.push(piece);
      }
      steps = grouped;
    }
    if (!steps.length) steps = ['Cook the dish from the ingredients.'];
    return steps.map(function(line) { return { text: line, photo: '' }; });
  };
  var guessFoodTags = function(meal, ingredients) {
    var blob = [meal && meal.strCategory, meal && meal.strMeal, meal && meal.strTags].concat((ingredients || []).map(function(item) { return item.name; })).join(' ').toLowerCase();
    var tags = [];
    if (/chicken|turkey|курица/.test(blob)) tags.push('Chicken');
    if (/beef|steak|говяд/.test(blob)) tags.push('Beef');
    if (/veal|телят/.test(blob)) tags.push('Veal');
    if (/fish|salmon|tuna|prawn|shrimp|seafood|cod|trout|рыба|лосос/.test(blob)) tags.push('Fish');
    return tags;
  };
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
      else if (value.webPath) list.push(value.webPath);
      else if (value.path) {
        var path = String(value.path);
        list.push(path.indexOf('://') >= 0 ? path : 'file://' + path);
      }
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
  // Системный выбор нескольких фото, как «отметил — Прикрепить».
  // Свой альбом фото телефона не видит, поэтому сюда не возвращаемся.
  // Если оболочка умеет только одно фото, остаётся обычная галерея.
  var pickGallery = function(camera, limit) {
    var cap = Math.max(1, Math.min(10, limit || 1));
    var options = {
      mediaType: 'photo',
      selectionLimit: cap,
      quality: 0.8,
      includeBase64: false,
      allowsMultipleSelection: true,
      allowsEditing: false,
      presentationStyle: 'fullScreen'
    };
    var normalize = function(res) {
      if (!res || res.didCancel || res.cancelled || res.canceled || res.errorCode || res.errorMessage) return [];
      return collectPhotoUris(res).slice(0, cap);
    };
    var asPromise = function(launch) {
      return new Promise(function(resolve, reject) {
        var settled = false;
        var ok = function(res) { if (!settled) { settled = true; resolve(res); } };
        var bad = function(err) { if (!settled) { settled = true; reject(err); } };
        try {
          var pending = launch(options, ok);
          if (pending && pending.then) pending.then(ok, bad);
        } catch (err) { bad(err); }
      });
    };
    var launches = [];
    var addLaunch = function(fn) { if (typeof fn === 'function') launches.push(fn); };
    if (camera) {
      if (typeof camera.pickImages === 'function') addLaunch(camera.pickImages.bind(camera));
      if (typeof camera.pickMultipleImages === 'function') addLaunch(camera.pickMultipleImages.bind(camera));
      if (typeof camera.launchImageLibrary === 'function') addLaunch(camera.launchImageLibrary.bind(camera));
    }
    try {
      var picker = require('react-native-image-picker');
      picker = picker && (picker.default || picker);
      if (picker) addLaunch(picker.launchImageLibrary);
    } catch (err) {}
    try {
      var expoPicker = require('expo-image-picker');
      expoPicker = expoPicker && (expoPicker.default || expoPicker);
      if (expoPicker && typeof expoPicker.launchImageLibraryAsync === 'function') {
        addLaunch(function(opts) {
          var run = function() {
            return expoPicker.launchImageLibraryAsync(Object.assign({}, opts, {
              mediaTypes: expoPicker.MediaTypeOptions && expoPicker.MediaTypeOptions.Images ? expoPicker.MediaTypeOptions.Images : 'images'
            }));
          };
          if (typeof expoPicker.requestMediaLibraryPermissionsAsync === 'function') {
            return expoPicker.requestMediaLibraryPermissionsAsync().then(run, run);
          }
          return run();
        });
      }
    } catch (err) {}
    try {
      var mods = require('react-native').NativeModules || {};
      var nativePicker = mods.ImagePicker || mods.ImagePickerManager || mods.RNImagePicker;
      if (nativePicker && typeof nativePicker.launchImageLibrary === 'function') addLaunch(nativePicker.launchImageLibrary.bind(nativePicker));
    } catch (err) {}
    if (cap > 1 && launches.length) {
      var started = Date.now();
      return asPromise(launches[0]).then(normalize).catch(function() {
        if (Date.now() - started > 400 || !camera || typeof camera.pickImage !== 'function') return [];
        return camera.pickImage().then(normalize).catch(function() { return []; });
      });
    }
    if (!camera || typeof camera.pickImage !== 'function') return Promise.resolve([]);
    return camera.pickImage().then(normalize).catch(function() { return []; });
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
  var collectDishIssues = function(name, price, ingredients, steps, minutes) {
    var issues = {};
    if (!String(name || '').trim()) issues.name = true;
    if (!String(price || '').trim()) issues.price = true;
    if (!(Number(minutes) > 0)) issues.minutes = true;
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
    var reveal = 100;
    var translate = React.useRef(new Animated.Value(0)).current;
    var openRef = React.useRef(false);
    var offsetRef = React.useRef(0);
    var posRef = React.useRef(0);
    var rowIdRef = React.useRef(props.rowId);
    var setActiveRef = React.useRef(props.setActiveId);
    var onDeleteRef = React.useRef(props.onDelete);
    var setScrollRef = React.useRef(props.setListScroll);
    rowIdRef.current = props.rowId;
    setActiveRef.current = props.setActiveId;
    onDeleteRef.current = props.onDelete;
    setScrollRef.current = props.setListScroll;
    var lockScroll = function(locked) {
      if (setScrollRef.current) setScrollRef.current(!locked);
    };
    var settle = function(open) {
      openRef.current = open;
      offsetRef.current = open ? -reveal : 0;
      posRef.current = offsetRef.current;
      if (open && setActiveRef.current) setActiveRef.current(rowIdRef.current);
      Animated.spring(translate, { toValue: open ? -reveal : 0, useNativeDriver: false, friction: 8, tension: 90 }).start();
    };
    React.useEffect(function() {
      if (props.activeId !== props.rowId && openRef.current) settle(false);
    }, [props.activeId, props.rowId]);
    var claimSwipe = function(_, gesture) {
      if (Math.abs(gesture.dx) < 12 || Math.abs(gesture.dx) < Math.abs(gesture.dy)) return false;
      if (!openRef.current && gesture.dx > 0) return false;
      lockScroll(true);
      return true;
    };
    var endDrag = function(shouldOpen) {
      lockScroll(false);
      settle(shouldOpen);
    };
    var responder = React.useRef(PanResponder.create({
      onMoveShouldSetPanResponder: claimSwipe,
      onMoveShouldSetPanResponderCapture: claimSwipe,
      onPanResponderTerminationRequest: function() { return false; },
      onShouldBlockNativeResponder: function() { return true; },
      onPanResponderReject: function() { lockScroll(false); },
      onPanResponderGrant: function() {
        if (translate.stopAnimation) translate.stopAnimation();
        offsetRef.current = openRef.current ? -reveal : 0;
        lockScroll(true);
        if (setActiveRef.current) setActiveRef.current(rowIdRef.current);
      },
      onPanResponderMove: function(_, gesture) {
        var next = offsetRef.current + gesture.dx;
        if (next > 0) next = 0;
        if (next < -(reveal + 16)) next = -(reveal + 16);
        posRef.current = next;
        translate.setValue(next);
      },
      onPanResponderRelease: function(_, gesture) {
        var next = offsetRef.current + gesture.dx;
        var shouldOpen = gesture.vx > 0.45 ? false : gesture.vx < -0.45 ? true : next < -reveal / 2;
        endDrag(shouldOpen);
      },
      onPanResponderTerminate: function() { endDrag(posRef.current < -reveal / 2); }
    })).current;
    var deleteOpacity = translate.interpolate({ inputRange: [-100, -20, 0], outputRange: [1, 0, 0], extrapolate: 'clamp' });
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
      React.createElement(TagGroup, { label: 'Теги', hint: 'Рыба, мясо и другое', tags: FOOD_TAGS, selected: onlyFoodTags(selected), onToggle: toggle }));
  };
  // @section:HomeScreen @depends:[ThemeContext,shared-components,styles]
  var HomeScreen = function(props) {
    var insets = useSafeAreaInsets();
    var query = useQuery('dishes');
    var budgetStore = useStorage('dinner-budget', DEFAULT_BUDGET);
    var budget = budgetStore[0]?.amount ?? 2000;
    var setBudget = budgetStore[1];
    var context = useTheme();

    var placesStore = useStorage('dinner-places', []);
    var places = placesStore[0] || [];
    var filterStore = useStorage('dinner-filter-states', {});
    var filterStates = filterStore[0] || {};

    var filterModalState = React.useState(false);
    var filterModal = filterModalState[0], setFilterModal = filterModalState[1];

    var pickedState = React.useState(null);
    var picked = pickedState[0], setPicked = pickedState[1];
    var spinningState = React.useState(false);
    var spinning = spinningState[0], setSpinning = spinningState[1];
    var spinRef = React.useRef(null);
    var rows = query.data || [];
    var budgetMax = 5000;
    rows.forEach(function(dish) {
      var price = Number(dish && dish.price_rubles);
      if (price > budgetMax) budgetMax = Math.ceil(price / 1000) * 1000;
    });
    var budgetStep = Math.max(50, Math.round(budgetMax / 100));
    var includedPlaces = PLACE_TAGS.filter(function(tag) { return filterStates[tag] === 'include'; });
    var placeOnly = includedPlaces.length > 0;
    var placeExcluded = PLACE_TAGS.some(function(tag) { return filterStates[tag] === 'exclude'; });
    var dishOk = function(dish) {
      if (placeOnly) return false;
      if (Number(dish?.price_rubles || 0) > budget) return false;
      var dishTags = onlyFoodTags(dish?.tags);
      for (var i = 0; i < FOOD_TAGS.length; i += 1) {
        var tag = FOOD_TAGS[i];
        if (filterStates[tag] === 'include' && dishTags.indexOf(tag) < 0) return false;
        if (filterStates[tag] === 'exclude' && dishTags.indexOf(tag) >= 0) return false;
      }
      return true;
    };
    var placeOk = function(place) {
      var category = placeCategoryOf(place);
      if (placeOnly) return includedPlaces.indexOf(category) >= 0;
      if (!category) return !placeExcluded;
      return filterStates[category] !== 'exclude';
    };
    var options = [];
    rows.forEach(function(dish) {
      if (dishOk(dish)) options.push({ kind: 'dish', key: 'dish:' + String(dish?.id), dish: dish });
    });
    places.forEach(function(place, index) {
      if (placeOk(place)) options.push({ kind: 'place', key: 'place:' + index + ':' + String(place && place.name || ''), place: place, index: index });
    });
    var current = null;
    for (var optionIndex = 0; optionIndex < options.length; optionIndex += 1) {
      if (options[optionIndex].key === picked) { current = options[optionIndex]; break; }
    }
    if (!current) current = options[0] || null;
    
    var historyStore = useStorage('dinner-history', []);
    var history = historyStore[0] || [];
    var setHistory = historyStore[1];

    React.useEffect(function() { return function() { if (spinRef.current) clearInterval(spinRef.current); }; }, []);
    React.useEffect(function() {
      if (budget > budgetMax) setBudget({ amount: budgetMax });
    }, [budget, budgetMax]);
    
    var dishCount = options.filter(function(item) { return item.kind === 'dish'; }).length;
    var placeCount = options.length - dishCount;
    var countText = context.language === 'RU'
      ? (placeOnly ? 'В выборе только заведения: ' + placeCount :
        placeCount ? 'В выборе: ' + dishCount + ' ' + ruNoun(dishCount, 'домашнее блюдо', 'домашних блюда', 'домашних блюд') + ' и ' + placeCount + ' ' + ruNoun(placeCount, 'заведение', 'заведения', 'заведений') :
        'Подходит по бюджету: ' + dishCount + ' ' + ruNoun(dishCount, 'блюдо', 'блюда', 'блюд'))
      : (placeOnly ? 'Places only: ' + placeCount :
        placeCount ? 'In the mix: ' + dishCount + ' home and ' + placeCount + ' places' :
        'Matching dishes: ' + dishCount);

    var spin = function() {
      if (spinning) return;
      if (!options.length) { props.navigation.navigate('SpinResult', { dishId: null, place: null, budget: budget }); return; }
      setSpinning(true);
      var ticks = 0;
      spinRef.current = setInterval(function() {
        var nextIndex = Math.floor(Math.random() * options.length);
        setPicked(options[nextIndex].key);
        ticks += 1;
        if (ticks >= 18) {
          clearInterval(spinRef.current);
          spinRef.current = null;
          var choice = options[Math.floor(Math.random() * options.length)];
          setPicked(choice.key);
          setSpinning(false);
          var placeSnapshot = choice.kind === 'place' ? {
            name: choice.place.name,
            address: choice.place.address || '',
            desc: choice.place.desc || '',
            photos: placePhotos(choice.place),
            category: placeCategoryOf(choice.place)
          } : null;
          var newRecord = placeSnapshot ? {
            id: 'place-' + Date.now(),
            kind: 'place',
            dish_name: placeSnapshot.name,
            price_rubles: 0,
            photo_uri: placeSnapshot.photos[0] || '',
            dateStr: new Date().toLocaleString(),
            place: placeSnapshot
          } : {
            id: choice.dish.id || String(Date.now()),
            kind: 'dish',
            dish_name: choice.dish.dish_name,
            price_rubles: choice.dish.price_rubles,
            photo_uri: getDishImage(choice.dish),
            dateStr: new Date().toLocaleString()
          };
          setHistory([newRecord].concat(history.slice(0, 19)));
          props.navigation.navigate('SpinResult', { dishId: choice.kind === 'dish' ? (choice.dish.id || null) : null, place: placeSnapshot, budget: budget });
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
        
        !rows.length && !places.length ? React.createElement(View, { testID: 'View-13', style: styles.emptyCard, componentId: 'home-empty' },
          React.createElement(Text, { testID: 'Text-9', style: styles.title, componentId: 'home-empty-title' }, 'Tonight’s choice starts here'),
          React.createElement(Text, { testID: 'Text-10', style: styles.bodyMuted, componentId: 'home-empty-copy' }, 'Add a dish to your recipes, then spin for dinner.'),
          React.createElement(PrimaryButton, { testID: 'PrimaryButton-1', id: 'home-open-recipes', label: 'Open Recipes', onPress: function() { props.navigation.navigate('Recipes'); } })) :
          React.createElement(View, { testID: 'View-14', style: { flex: 1, justifyContent: 'space-between' }, componentId: 'home-picker-content' },
            !current ? React.createElement(View, { testID: 'View-15', style: [styles.dinnerCard, { alignItems: 'center', justifyContent: 'center', padding: 24 }], componentId: 'home-dinner-card' },
              React.createElement(Text, { style: styles.title, componentId: 'home-dish-name' }, 'No matches yet')) :
            current.kind === 'place' ? React.createElement(View, { testID: 'View-15', style: styles.dinnerCard, componentId: 'home-dinner-card' },
              placePhotos(current.place)[0] ? React.createElement(Image, { source: { uri: placePhotos(current.place)[0] }, style: styles.heroImage, resizeMode: 'cover' }) :
                React.createElement(View, { style: [styles.heroImage, styles.imageFallback] }, React.createElement(Ionicons, { name: 'restaurant-outline', size: 36, color: textSecondary })),
              React.createElement(View, { testID: 'View-16', style: styles.dinnerCopy, componentId: 'home-dish-copy' },
                React.createElement(Text, { testID: 'Text-11', style: styles.overline, componentId: 'home-overline' }, 'TONIGHT’С PICK'),
                React.createElement(Text, { testID: 'Text-12', style: styles.title, numberOfLines: 1, componentId: 'home-dish-name' }, current.place.name),
                React.createElement(Text, { testID: 'Text-13', style: styles.bodyMuted, numberOfLines: 2, componentId: 'home-dish-meta' },
                  (placeCategoryOf(current.place) ? context.translate(placeCategoryOf(current.place)) : 'Заведение') + (current.place.address ? ' · ' + current.place.address : '')))) :
            React.createElement(View, { testID: 'View-15', style: styles.dinnerCard, componentId: 'home-dinner-card' },
              React.createElement(DishImage, { testID: 'DishImage-1', dish: current.dish, style: styles.heroImage, componentId: 'home-dish-image' }),
              React.createElement(View, { testID: 'View-16', style: styles.dinnerCopy, componentId: 'home-dish-copy' },
                React.createElement(Text, { testID: 'Text-11', style: styles.overline, componentId: 'home-overline' }, 'TONIGHT’С PICK'),
                React.createElement(Text, { testID: 'Text-12', style: styles.title, numberOfLines: 1, componentId: 'home-dish-name' }, current.dish?.dish_name || 'Choose a dish'),
                React.createElement(Text, { testID: 'Text-13', style: styles.bodyMuted, componentId: 'home-dish-meta' },
                  formatPrice(current.dish?.price_rubles) + ' ' + context.translate('estimated') + ' · ' + cookMinutes(current.dish) + ' ' + context.translate('min')))),
            
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

            (rows.length || places.length) ? React.createElement(View, { testID: 'View-19', style: styles.pinnedAction, componentId: 'home-pinned-action' },
              React.createElement(PrimaryButton, { testID: 'PrimaryButton-2', id: 'home-spin', icon: 'dice-outline', label: spinning ? 'SPINNING…' : 'SPIN DISH', onPress: spin, disabled: spinning })) : null
          )),

      React.createElement(Modal, { visible: filterModal, transparent: true, animationType: 'fade', onRequestClose: function() { setFilterModal(false); } },
        React.createElement(View, { style: styles.sheetBackdrop },
          React.createElement(TouchableOpacity, { style: { flex: 1 }, activeOpacity: 1, onPress: function() { setFilterModal(false); } }),
          React.createElement(View, { style: styles.filterSheet },
            React.createElement(View, { style: styles.sheetHandle }),
            React.createElement(Text, { style: styles.sectionTitle }, 'Фильтр'),
            React.createElement(Text, { style: styles.smallMuted }, 'Один раз — оставить в выборе. Второй — убрать. Третий — сбросить.'),
            renderFilterGroup('Где', 'Отметить — только поход, без домашних рецептов. Вычеркнуть — убрать из выбора.', PLACE_TAGS),
            renderFilterGroup('Блюдо', 'Только для домашних рецептов.', FOOD_TAGS),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginTop: 22, backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: function() { filterStore[1]({}); } },
              React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'Сбросить')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginTop: 8 }], onPress: function() { setFilterModal(false); } },
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
    var searchState = React.useState('');
    var search = searchState[0], setSearch = searchState[1];
    var sourceState = React.useState(false);
    var sourceOpen = sourceState[0], setSourceOpen = sourceState[1];
    var importingState = React.useState(false);
    var importing = importingState[0], setImporting = importingState[1];
    var insertDish = useMutation('dishes', 'insert');
    var recipes = query.data || [];
    var visible = recipes.filter(function(dish) { return matchesQuery(search, dish && dish.dish_name); });
    var importArchive = function() {
      if (importing) return;
      setSourceOpen(false);
      setImporting(true);
      pickRecipeArchive().then(function(bytes) {
        if (!bytes || !bytes.length) return;
        var parsed = [];
        try { parsed = recipesFromZipBytes(bytes); }
        catch (parseErr) {
          Alert.alert('Файл', 'Не удалось прочитать архив. Нужен zip: в каждой папке photo.jpg и recipe.json.');
          return;
        }
        if (!parsed.length) {
          Alert.alert('Файл', 'В архиве нет рецептов. Нужны папки с recipe.json и photo.jpg.');
          return;
        }
        var known = {};
        recipes.forEach(function(dish) {
          known[String(dish && dish.dish_name || '').trim().toLowerCase()] = true;
        });
        var queue = [];
        var skipped = 0;
        parsed.forEach(function(recipe) {
          var key = String(recipe.dish_name || '').trim().toLowerCase();
          if (!key || known[key]) { skipped += 1; return; }
          known[key] = true;
          queue.push({
            dish_name: recipe.dish_name,
            price_rubles: recipe.price_rubles,
            ingredients: serializeStructuredIngredients(recipe.ingredients),
            recipe_steps: serializeStructuredSteps(recipe.steps),
            photo_uri: recipe.photo_uri || '',
            tags: tagsWithMinutes(recipe.tags, recipe.cook_minutes),
            cook_minutes: recipe.cook_minutes
          });
        });
        var chain = Promise.resolve();
        queue.forEach(function(dish) {
          chain = chain.then(function() { return insertDish.mutate(dish); });
        });
        return chain.then(function() {
          if (!queue.length) {
            Alert.alert('Рецепты', 'Эти рецепты уже есть в меню.');
            return;
          }
          var note = 'Добавлено ' + queue.length + ' ' + ruNoun(queue.length, 'рецепт', 'рецепта', 'рецептов') + '.';
          if (skipped) note += ' Уже были: ' + skipped + '.';
          Alert.alert('Рецепты', note);
        }, function() {
          Alert.alert('Рецепты', 'Архив прочитан, но сохранить получилось не всё. Проверьте меню.');
        });
      }).catch(function(err) {
        if (isPickerCancel(err)) return;
        if (String(err && err.message || '') === 'no-picker') {
          Alert.alert('Файл', 'На этом телефоне не открылся выбор файла. Добавьте рецепт через «Онлайн».');
          return;
        }
        Alert.alert('Файл', 'Не удалось прочитать архив. Нужен zip: в каждой папке photo.jpg и recipe.json.');
      }).then(function() { setImporting(false); });
    };
    return React.createElement(View, { testID: 'View-20', style: [styles.screen, { paddingTop: insets.top }], componentId: 'recipes-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-Recipes', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { testID: 'View-21', style: styles.tabScreen, componentId: 'recipes-content' },
        React.createElement(Header, { testID: 'Header-2', id: 'recipes', title: 'Recipes', action: React.createElement(View, { testID: 'View-RecipesActions', style: styles.homeHeaderActions },
          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-Import', style: styles.importEntry, onPress: function() { setSourceOpen(true); }, accessibilityLabel: 'Добавить извне', componentId: 'recipes-import' },
            React.createElement(Text, { style: styles.importEntryText }, 'From outside')),
          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-ManageMenu', style: styles.iconAction, onPress: function() { props.navigation.navigate('MenuManager'); }, componentId: 'recipes-manage' },
            React.createElement(Ionicons, { testID: 'Ionicons-Gear', name: 'settings-outline', size: 24, color: textSecondary }))
        ) }),
        recipes.length ? React.createElement(TextInput, { style: styles.recipeSearch, value: search, onChangeText: setSearch, placeholder: 'Search by name', autoCapitalize: 'none', autoCorrect: false, componentId: 'recipes-search' }) : null,
        !recipes.length ? React.createElement(View, { testID: 'View-22', style: styles.centerEmpty, componentId: 'recipes-empty' },
          React.createElement(Text, { testID: 'Text-17', style: [styles.title, { fontSize: 22}], componentId: 'recipes-empty-title' }, 'Your saved recipes'),
          React.createElement(Text, { testID: 'Text-18', style: styles.bodyMuted, componentId: 'recipes-empty-copy' }, 'Add a dish to keep its recipe here.'),
          React.createElement(PrimaryButton, { testID: 'PrimaryButton-AddFirst', id: 'recipes-empty-add', label: 'Add dish', onPress: function() { props.navigation.navigate('MenuManager'); } })) :
          React.createElement(ScrollView, { testID: 'ScrollView-2', style: styles.flexScroll, contentContainerStyle: { paddingTop: 12, paddingBottom: TAB_MENU_HEIGHT + insets.bottom + SCROLL_EXTRA_PADDING }, componentId: 'recipes-list' },
            visible.length ? null : React.createElement(Text, { style: [styles.bodyMuted, { textAlign: 'center', marginTop: 24 }] }, 'Ничего не найдено'),
            visible.map(function(dish, index) {
              return React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-7', key: String(dish?.id || index), style: styles.recipeCard, onPress: function() { props.navigation.navigate('RecipeDetail', { dishId: dish?.id }); }, componentId: 'recipes-item-' + index },
                React.createElement(DishImage, { testID: 'DishImage-2', dish: dish, style: styles.recipeListImage, componentId: 'recipes-image-' + index }),
                React.createElement(View, { testID: 'View-23', style: styles.recipeListCopy, componentId: 'recipes-copy-' + index },
                  React.createElement(Text, { testID: 'Text-19', style: styles.medium, componentId: 'recipes-name-' + index }, dish?.dish_name || 'Untitled dish'),
                  React.createElement(Text, { testID: 'Text-20', style: styles.smallMuted, componentId: 'recipes-meta-' + index }, formatPrice(dish?.price_rubles) + ' · ' + cookMinutes(dish) + ' ' + context.translate('min')),
                  React.createElement(Text, { testID: 'Text-21', style: styles.link, componentId: 'recipes-action-' + index }, 'View recipe')));
            }))),
      React.createElement(Modal, { visible: sourceOpen, transparent: true, animationType: 'fade', onRequestClose: function() { setSourceOpen(false); } },
        React.createElement(View, { style: styles.modalBackdrop },
          React.createElement(View, { style: styles.unitModalContent },
            React.createElement(Text, { style: [styles.sectionTitle, { textAlign: 'center' }] }, 'Add a recipe from'),
            React.createElement(Text, { style: [styles.smallMuted, { textAlign: 'center', marginBottom: 14 }] }, 'Online is the catalog. A file is a zip with photos.'),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginBottom: 8 }], onPress: function() { setSourceOpen(false); props.navigation.navigate('RecipeImport'); } },
              React.createElement(Text, { style: styles.primaryButtonText }, 'Online')),
            React.createElement(TouchableOpacity, { style: [styles.primaryButton, { marginBottom: 8, backgroundColor: surfaceAltColor, borderWidth: 1, borderColor: borderColor }], onPress: importArchive },
              React.createElement(Text, { style: [styles.primaryButtonText, { color: textPrimary }] }, 'ZIP file')),
            React.createElement(TouchableOpacity, { style: styles.againButton, onPress: function() { setSourceOpen(false); } },
              React.createElement(Text, { style: styles.bodyMuted }, 'Cancel'))
          )
        )
      ),
      React.createElement(Modal, { visible: importing, transparent: true, animationType: 'fade' },
        React.createElement(View, { style: styles.modalBackdrop },
          React.createElement(View, { style: styles.unitModalContent },
            React.createElement(Text, { style: styles.sectionTitle }, 'Reading the archive…'))))
    );
  };
  // @end:RecipesScreen

  // @section:MenuManagerScreen @depends:[ThemeContext,shared-components,styles]
  var MenuManagerScreen = function(props) {
    var insets = useSafeAreaInsets();
    var query = useQuery('dishes');
    var context = useTheme();
    var removeDish = useMutation('dishes', 'delete');
    var searchState = React.useState('');
    var search = searchState[0], setSearch = searchState[1];
    var activeTabState = React.useState('recipes');
    var activeTab = activeTabState[0], setActiveTab = activeTabState[1];

    var placesStore = useStorage('dinner-places', []);
    var places = placesStore[0] || [];
    var setPlaces = placesStore[1];

    var activeSwipeState = React.useState(null);
    var activeSwipe = activeSwipeState[0], setActiveSwipe = activeSwipeState[1];
    var dragLockRef = React.useRef(false);
    var listRef = React.useRef(null);
    var closeSwipes = function() { if (!dragLockRef.current) setActiveSwipe(null); };
    var setListScroll = function(enabled) {
      dragLockRef.current = !enabled;
      var node = listRef.current;
      if (node && node.setNativeProps) node.setNativeProps({ scrollEnabled: !!enabled });
    };
    var scrollYRef = React.useRef(0);
    var onListScroll = function(event) {
      var y = event.nativeEvent.contentOffset.y;
      if (Math.abs(y - scrollYRef.current) > 6) closeSwipes();
      scrollYRef.current = y;
    };

    var openPlaceEditor = function(index) {
      props.navigation.navigate('PlaceEditor', { placeIndex: index === null || index === undefined ? -1 : index });
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
            React.createElement(ScrollView, { ref: listRef, testID: 'ScrollView-MenuMgr', style: styles.flexScroll, contentContainerStyle: { paddingBottom: insets.bottom + SCROLL_EXTRA_PADDING }, directionalLockEnabled: true, onScroll: onListScroll, onScrollBeginDrag: closeSwipes, scrollEventThrottle: 16, keyboardShouldPersistTaps: 'handled', componentId: 'menu-mgr-list' },
              (query.data || []).filter(function(dish) { return matchesQuery(search, dish && dish.dish_name); }).length ? null :
                React.createElement(Text, { style: [styles.bodyMuted, { textAlign: 'center', marginTop: 24 }] }, 'Ничего не найдено'),
              (query.data || []).map(function(dish, index) {
                if (!matchesQuery(search, dish && dish.dish_name)) return null;
                var details = dishDetails(dish);
                return React.createElement(SwipeRow, { key: String(dish?.id || index), rowId: 'dish-' + String(dish?.id || index), activeId: activeSwipe, setActiveId: setActiveSwipe, setListScroll: setListScroll, onDelete: function() { confirmRemoveDish(dish?.id); } },
                  React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-MenuRow', style: [styles.menuRow, { marginBottom: 0 }], onPress: function() { props.navigation.navigate('DishDetail', { dishId: dish?.id }); }, componentId: 'menu-mgr-item-' + index },
                    React.createElement(DishImage, { testID: 'DishImage-MenuMgr', dish: dish, style: styles.menuImage, componentId: 'menu-mgr-image-' + index }),
                    React.createElement(View, { testID: 'View-MenuInfo', style: styles.menuInfo, componentId: 'menu-mgr-info-' + index },
                      React.createElement(Text, { testID: 'Text-MenuName', style: styles.medium }, dish?.dish_name || 'Untitled dish'),
                      React.createElement(Text, { testID: 'Text-MenuPrice', style: styles.medium }, formatPrice(dish?.price_rubles)),
                      React.createElement(Text, { testID: 'Text-MenuKind', style: styles.smallMuted }, context.translate(details.kind) + ' · ' + cookMinutes(dish) + ' ' + context.translate('min')))));
              }))
          )
        ) : (
          React.createElement(View, { style: { flex: 1 } },
            searchBar(function() { openPlaceEditor(null); }),
            !places.length ? React.createElement(View, { style: styles.centerEmpty },
              React.createElement(Text, { style: styles.title }, 'Нет добавленных кафе или ресторанов')) :
              React.createElement(ScrollView, { ref: listRef, style: styles.flexScroll, contentContainerStyle: { paddingBottom: insets.bottom + SCROLL_EXTRA_PADDING }, directionalLockEnabled: true, onScroll: onListScroll, onScrollBeginDrag: closeSwipes, scrollEventThrottle: 16, keyboardShouldPersistTaps: 'handled' },
                places.some(function(place) { return matchesQuery(search, place && place.name); }) ? null :
                  React.createElement(Text, { style: [styles.bodyMuted, { textAlign: 'center', marginTop: 24 }] }, 'Ничего не найдено'),
                places.map(function(place, idx) {
                  if (!matchesQuery(search, place && place.name)) return null;
                  var photos = placePhotos(place);
                  var photoNote = photos.length > 1 ? photos.length + ' фото' : '';
                  var categoryLabel = place.category === 'Restaurant' || place.category === 'Cafe' ? place.category : 'Выберите категорию';
                  var placeMeta = [place.desc, photoNote].filter(Boolean).join(' · ');
                  return React.createElement(SwipeRow, { key: 'place-' + idx, rowId: 'place-' + idx, activeId: activeSwipe, setActiveId: setActiveSwipe, setListScroll: setListScroll, onDelete: function() { removePlaceAt(idx); } },
                    React.createElement(TouchableOpacity, { style: [styles.menuRow, { marginBottom: 0 }], onPress: function() { openPlaceEditor(idx); } },
                      photos[0] ? React.createElement(Image, { source: { uri: photos[0] }, style: styles.menuImage, resizeMode: 'cover' }) :
                        React.createElement(View, { style: [styles.menuImage, styles.imageFallback] }, React.createElement(Ionicons, { name: 'restaurant-outline', size: 24, color: textSecondary })),
                      React.createElement(View, { style: styles.menuInfo },
                        React.createElement(Text, { style: styles.medium }, place.name),
                        React.createElement(Text, { style: styles.smallMuted }, categoryLabel),
                        place.address ? React.createElement(Text, { style: styles.smallMuted }, place.address) : null,
                        placeMeta ? React.createElement(Text, { style: styles.smallMuted }, placeMeta) : null
                      )
                    ));
                })
              )
          )
        )
      ));
  };
  // @end:MenuManagerScreen

  // @section:PlaceEditorScreen @depends:[ThemeContext,shared-components,styles]
  var PlaceEditorScreen = function(props) {
    var insets = useSafeAreaInsets();
    var camera = useCamera();
    var placesStore = useStorage('dinner-places', []);
    var setPlaces = placesStore[1];
    var placeIndex = props.route?.params?.placeIndex;
    var isNew = !(placeIndex >= 0);
    var existing = isNew ? {} : ((placesStore[0] || [])[placeIndex] || {});
    var nameState = React.useState(existing.name || '');
    var addressState = React.useState(existing.address || '');
    var descState = React.useState(existing.desc || '');
    var categoryState = React.useState(placeCategoryOf(existing));
    var photosState = React.useState(placePhotos(existing));
    var photos = photosState[0] || [];
    var hydrated = React.useRef(!isNew && !!(existing && existing.name));
    React.useEffect(function() {
      if (hydrated.current || isNew) return;
      var place = (placesStore[0] || [])[placeIndex];
      if (!place) return;
      hydrated.current = true;
      nameState[1](place.name || '');
      addressState[1](place.address || '');
      descState[1](place.desc || '');
      categoryState[1](placeCategoryOf(place));
      photosState[1](placePhotos(place));
    }, [placesStore[0], placeIndex]);
    var appendPlacePhoto = function(uri) {
      if (!uri) return;
      photosState[1](function(prev) {
        var next = [].concat(prev || []);
        if (next.length >= 10 || next.indexOf(uri) >= 0) return next;
        next.push(uri);
        return next;
      });
    };
    var addPlacePhoto = function() {
      Alert.alert('Фото заведения', 'Можно добавить до 10 фото.', [
        { text: 'Сделать фото', onPress: function() {
          capturePhoto(camera).then(function(res) {
            var uri = collectPhotoUris(res)[0];
            if (uri) appendPlacePhoto(uri);
          }).catch(function() {});
        } },
        { text: 'Выбрать из галереи', onPress: function() {
          var room = 10 - (photosState[0] || []).length;
          if (room <= 0) return;
          pickGallery(camera, room).then(function(uris) { (uris || []).forEach(appendPlacePhoto); }).catch(function() {});
        } },
        { text: 'Отмена', style: 'cancel' }
      ]);
    };
    var savePlace = function() {
      var next = {
        name: String(nameState[0] || '').trim(),
        address: String(addressState[0] || '').trim(),
        desc: String(descState[0] || '').trim(),
        category: placeCategoryOf({ category: categoryState[0] }),
        photos: (photosState[0] || []).filter(Boolean)
      };
      if (!next.name) {
        Alert.alert('Название', 'Укажите название заведения.');
        return;
      }
      if (!next.category) {
        Alert.alert('Категория', 'Выберите ресторан или кафе.');
        return;
      }
      setPlaces(function(prev) {
        var list = prev || [];
        if (isNew) return list.concat([next]);
        return list.map(function(place, i) { return i === placeIndex ? next : place; });
      });
      props.navigation.goBack();
    };
    var deletePlace = function() {
      if (isNew) return;
      var action = function() {
        setPlaces(function(prev) { return (prev || []).filter(function(_, i) { return i !== placeIndex; }); });
        props.navigation.goBack();
      };
      if (Platform.OS === 'web') { if (window.confirm('Удалить это заведение?')) action(); }
      else Alert.alert('Удалить заведение', 'Удалить это заведение из списка?', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: action }
      ]);
    };
    return React.createElement(View, { style: [styles.screen, { paddingTop: insets.top }], componentId: 'place-editor-screen' },
      React.createElement(StatusBar, { backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(Header, { id: 'place-editor', title: isNew ? 'Новое заведение' : 'Редактирование заведения', back: function() { props.navigation.goBack(); } }),
      React.createElement(ScrollView, { style: styles.flexScroll, keyboardShouldPersistTaps: 'handled', contentContainerStyle: { paddingHorizontal: 16, paddingBottom: insets.bottom + 120 } },
        React.createElement(Text, { style: styles.fieldLabel }, 'Название'),
        React.createElement(TextInput, { style: styles.input, value: nameState[0], onChangeText: nameState[1], placeholder: 'Название кафе / ресторана' }),
        React.createElement(Text, { style: styles.fieldLabel }, 'Адрес'),
        React.createElement(TextInput, { style: styles.input, value: addressState[0], onChangeText: addressState[1], placeholder: 'Адрес' }),
        React.createElement(Text, { style: styles.fieldLabel }, 'Прайс, описание'),
        React.createElement(TextInput, { style: [styles.textArea, { minHeight: 96 }], value: descState[0], onChangeText: descState[1], placeholder: 'Прайс, описание...', multiline: true }),
        React.createElement(Text, { style: styles.fieldLabel }, 'Категория'),
        React.createElement(Text, { style: styles.smallMuted }, 'Ресторан или кафе'),
        React.createElement(View, { style: styles.tagWrap },
          PLACE_TAGS.map(function(tag) {
            var active = categoryState[0] === tag;
            return React.createElement(TouchableOpacity, { key: tag, style: [styles.tagChip, active ? styles.tagChipActive : null], onPress: function() { categoryState[1](tag); } },
              React.createElement(Text, { style: [styles.tagChipText, active ? styles.tagChipTextActive : null] }, tag));
          })),
        React.createElement(Text, { style: styles.fieldLabel }, 'Фотографии'),
        React.createElement(Text, { style: styles.smallMuted }, 'До 10 фото. Отметьте несколько и подтвердите. Отмена ничего не добавит.'),
        React.createElement(View, { style: styles.placePhotoRow },
          photos.map(function(uri, photoIndex) {
            return React.createElement(View, { key: String(photoIndex), style: styles.placePhotoTile },
              React.createElement(Image, { source: { uri: uri }, style: styles.placePhotoImage, resizeMode: 'cover' }),
              React.createElement(TouchableOpacity, { style: styles.placePhotoRemove, onPress: function() {
                photosState[1](function(prev) { return (prev || []).filter(function(_, i) { return i !== photoIndex; }); });
              } },
                React.createElement(Ionicons, { name: 'close', size: 14, color: textPrimary }))
            );
          }),
          photos.length >= 10 ? null : React.createElement(TouchableOpacity, { style: styles.placePhotoAdd, onPress: addPlacePhoto },
            React.createElement(Ionicons, { name: 'camera-outline', size: 22, color: accentColor }),
            React.createElement(Text, { style: styles.smallMuted }, 'Добавить'))
        ),
        isNew ? null : React.createElement(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: '#E25B52', marginTop: 18 }], onPress: deletePlace },
          React.createElement(Text, { style: [styles.primaryButtonText, { color: '#FFF' }] }, 'Удалить заведение'))
      ),
      React.createElement(View, { style: [styles.pinnedAction, { paddingBottom: insets.bottom + 12, paddingHorizontal: 16 }] },
        React.createElement(PrimaryButton, { id: 'place-editor-save', label: 'Сохранить', onPress: savePlace }))
    );
  };
  // @end:PlaceEditorScreen

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
                if (item.kind === 'place' && item.place) {
                  props.navigation.navigate('SpinResult', { place: item.place });
                  return;
                }
                var found = (query.data || []).find(function(d) { return d.dish_name === item.dish_name; });
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
                  React.createElement(Text, { style: styles.smallMuted }, item.kind === 'place'
                    ? item.dateStr + (item.place && item.place.category === 'Cafe' ? ' · Кафе' : item.place && item.place.category === 'Restaurant' ? ' · Ресторан' : ' · Заведение')
                    : item.dateStr + ' · ' + formatPrice(item.price_rubles))
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
    var place = params.place || null;
    var dish = !place ? ((query.data || []).find(function(row) { return row?.id === params.dishId; }) || null) : null;
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
    var zoomState = React.useState('');
    var zoomUri = zoomState[0];
    var setZoomUri = zoomState[1];
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
    }, [params.dishId, place && place.name]);
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
        place ? React.createElement(ScrollView, { style: styles.flexScroll, contentContainerStyle: { paddingTop: 18, paddingBottom: 24 }, componentId: 'result-place' },
          React.createElement(Animated.View, { style: revealStyle },
            React.createElement(View, { style: styles.resultReveal },
              React.createElement(Text, { style: styles.celebration }, 'Tonight’s pick'),
              React.createElement(View, { style: styles.sparkStage },
                React.createElement(View, { style: styles.resultGlow }),
                (place.photos || [])[0] ? React.createElement(TouchableOpacity, { activeOpacity: 0.92, style: { width: '100%' }, onPress: function() { setZoomUri(place.photos[0]); } },
                  React.createElement(Image, { source: { uri: place.photos[0] }, style: styles.resultImage, resizeMode: 'cover' })) :
                  React.createElement(View, { style: [styles.resultImage, styles.imageFallback] }, React.createElement(Ionicons, { name: 'restaurant-outline', size: 36, color: textSecondary })),
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
              React.createElement(Text, { style: [styles.title, { textAlign: 'center' }] }, place.name || 'Заведение'),
              React.createElement(View, { style: styles.resultChips },
                React.createElement(View, { style: styles.tagChip }, React.createElement(Text, { style: styles.tagChipText }, place.category === 'Cafe' ? 'Cafe' : place.category === 'Restaurant' ? 'Restaurant' : 'Заведение'))),
              place.address ? React.createElement(Text, { style: [styles.bodyMuted, { textAlign: 'center' }] }, place.address) : null,
              place.desc ? React.createElement(Text, { style: [styles.bodyMuted, { textAlign: 'center' }] }, place.desc) : null,
              (place.photos || []).length > 1 ? React.createElement(ScrollView, { horizontal: true, style: { width: '100%' }, contentContainerStyle: { gap: 8, paddingVertical: 4 } },
                place.photos.map(function(uri, photoIndex) {
                  return React.createElement(TouchableOpacity, { key: String(photoIndex), activeOpacity: 0.92, onPress: function() { setZoomUri(uri); } },
                    React.createElement(Image, { source: { uri: uri }, style: { width: 96, height: 96, borderRadius: 16, backgroundColor: surfaceAltColor } }));
                })) : null)),
          React.createElement(TouchableOpacity, { style: styles.againButton, onPress: function() { props.navigation.goBack(); } },
            React.createElement(Text, { style: styles.bodyMuted }, 'No, I want something else'))) :
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
                React.createElement(View, { style: styles.tagChip }, React.createElement(Text, { style: styles.tagChipText }, cookMinutes(dish) + ' ' + context.translate('min'))),
                React.createElement(View, { style: styles.tagChip }, React.createElement(Text, { style: styles.tagChipText }, context.translate(dishDetails(dish).kind)))),
              React.createElement(Text, { testID: 'Test-30', style: styles.bodyMuted, componentId: 'result-price' }, formatPrice(dish.price_rubles) + ' ' + context.translate('estimated total')))),
          React.createElement(PrimaryButton, { testID: 'PrimaryButton-4', id: 'result-view-recipe', label: 'View Recipe', onPress: goRecipe }),
          React.createElement(TouchableOpacity, { testID: 'TouchableOpacity-10', style: styles.againButton, onPress: function() { props.navigation.goBack(); }, componentId: 'result-again' },
            React.createElement(Text, { testID: 'Text-31', style: styles.bodyMuted, componentId: 'result-again-label' }, 'No, I want something else'))) :
          React.createElement(View, { testID: 'View-31', style: styles.resultCenter, componentId: 'result-no-match' },
            React.createElement(Text, { testID: 'Text-32', style: styles.title, componentId: 'result-no-match-title' }, 'Nothing matches this choice'),
            React.createElement(PrimaryButton, { testID: 'PrimaryButton-5', id: 'result-raise-budget', label: 'Back to the choice', onPress: function() { props.navigation.goBack(); } }))),
        React.createElement(PhotoViewer, { uri: zoomUri, onClose: function() { setZoomUri(''); } }));
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
    var dishTags = onlyFoodTags(dish?.tags);
    var zoomState = React.useState('');
    var zoomUri = zoomState[0];
    var setZoomUri = zoomState[1];

    return React.createElement(View, { testID: 'View-32', style: [styles.screen, { paddingTop: insets.top }], componentId: 'recipe-detail-screen' },
      React.createElement(StatusBar, { testID: 'StatusBar-RecipeDetail', backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { testID: 'View-33', style: styles.stackContent, componentId: 'recipe-detail-content' },
        React.createElement(Header, { testID: 'Header-5', id: 'recipe-detail', title: 'Recipe', back: function() { props.navigation.goBack(); } }),
        React.createElement(ScrollView, { testID: 'ScrollView-4', style: styles.flexScroll, contentContainerStyle: { paddingTop: 16, paddingBottom: insets.bottom + SCROLL_EXTRA_PADDING }, componentId: 'recipe-detail-scroll' },
          dish ? React.createElement(View, { testID: 'View-34', style: styles.recipeDetailColumn, componentId: 'recipe-detail-body' },
            React.createElement(TouchableOpacity, { activeOpacity: 0.92, style: { width: '100%' }, onPress: function() { var photo = getDishImage(dish); if (photo) setZoomUri(photo); } },
              React.createElement(DishImage, { testID: 'DishImage-5', dish: dish, style: styles.detailImage, componentId: 'recipe-detail-image' })),
            React.createElement(Text, { testID: 'Text-34', style: styles.title, componentId: 'recipe-detail-name' }, dish.dish_name || 'Dinner'),
            React.createElement(Text, { testID: 'Test-35', style: styles.secondary, componentId: 'recipe-detail-meta' }, context.translate('About') + ' ' + cookMinutes(dish) + ' ' + context.translate('min') + ' · ' + formatPrice(dish.price_rubles)),
            
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
            React.createElement(Text, { testID: 'Test-41', style: styles.emptyLine, componentId: 'recipe-missing' }, 'This recipe is no longer in your menu.'))),
        React.createElement(PhotoViewer, { uri: zoomUri, onClose: function() { setZoomUri(''); } }));
  };
  // @end:RecipeDetailScreen

  // @section:DishEditorScreen @depends:[ThemeContext,shared-components,styles]
  var DishEditorScreen = function(props) {
    var insets = useSafeAreaInsets();
    var context = useTheme();
    var camera = useCamera();
    var fields = useInvalidFields();
    
    var prefill = props.route?.params?.prefill || null;
    var nameState = React.useState(prefill ? String(prefill.dish_name || '') : '');
    var priceState = React.useState(prefill ? String(prefill.price_rubles != null ? prefill.price_rubles : 0) : '');
    var minutesState = React.useState(prefill && prefill.cook_minutes ? String(prefill.cook_minutes) : '');
    var ingredientsState = React.useState(prefill && prefill.ingredients && prefill.ingredients.length ? prefill.ingredients : [{ name: '', amount: '', unit: 'г' }]);
    var stepsState = React.useState(prefill && prefill.steps && prefill.steps.length ? prefill.steps : [{ text: '', photo: '' }]);
    
    var tagsState = React.useState(prefill ? onlyFoodTags(prefill.tags) : []);
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
    var minutes = minutesState[0], setMinutes = minutesState[1];
    var ingredients = ingredientsState[0], setIngredients = ingredientsState[1];
    var steps = stepsState[0], setSteps = stepsState[1];
    var error = errorState[0], setError = errorState[1];
    
    var photoUriState = React.useState(prefill ? (prefill.photo_uri || null) : null);
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
      var issues = collectDishIssues(name, price, ingredients, steps, minutes);
      if (Object.keys(issues).length) { fields.setInvalid(issues); setError('Fill in the highlighted fields'); return; }
      fields.setInvalid({});
      var serializedIngredients = serializeStructuredIngredients(ingredients);
      var serializedSteps = serializeStructuredSteps(steps);
      setError('');
      insert.mutate({ dish_name: name.trim(), price_rubles: Number(price), cook_minutes: Number(minutes), ingredients: serializedIngredients, recipe_steps: serializedSteps, photo_uri: photoUri, tags: tagsWithMinutes(selectedTags, minutes) }).then(function() {
        if (prefill) props.navigation.navigate('Main', { screen: 'Recipes' });
        else props.navigation.goBack();
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
        React.createElement(View, { style: styles.priceTimeRow },
          React.createElement(View, { style: styles.priceTimeCol },
            React.createElement(Text, { testID: 'Text-46', style: styles.fieldLabel, componentId: 'dish-editor-price-label' }, 'Price'),
            React.createElement(TextInput, { testID: 'TextInput-2', style: [styles.input, fields.hot('price', !String(price || '').trim()) ? styles.invalidField : null], value: price, onChangeText: function(value) { setPrice(value.replace(/[^0-9]/g, '')); }, keyboardType: 'numeric', placeholder: '0', componentId: 'dish-editor-price' })),
          React.createElement(View, { style: styles.priceTimeCol },
            React.createElement(Text, { testID: 'Text-46b', style: styles.fieldLabel, componentId: 'dish-editor-minutes-label' }, 'Cook time'),
            React.createElement(TextInput, { testID: 'TextInput-2b', style: [styles.input, fields.hot('minutes', !(Number(minutes) > 0)) ? styles.invalidField : null], value: minutes, onChangeText: function(value) { setMinutes(value.replace(/[^0-9]/g, '')); }, keyboardType: 'numeric', placeholder: '30', componentId: 'dish-editor-minutes' }))
        ),
        
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
    var minutesState = React.useState(dish ? String(cookMinutes(dish)) : '');
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
    var minutes = minutesState[0], setMinutes = minutesState[1];
    var ingredients = ingredientsState[0], setIngredients = ingredientsState[1];
    var steps = stepsState[0], setSteps = stepsState[1];
    var error = errorState[0], setError = errorState[1];

    React.useEffect(function() {
      if (dish) {
        setName(String(dish.dish_name || ''));
        setPrice(String(dish.price_rubles ?? ''));
        setMinutes(String(cookMinutes(dish)));
        setIngredients(parseStructuredIngredients(dish.ingredients));
        setSteps(parseStructuredSteps(dish.recipe_steps));
        setPhotoUri(dish.photo_uri || getDishImage(dish));
        setSelectedTags(onlyFoodTags(dish.tags));
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
      var issues = collectDishIssues(name, price, ingredients, steps, minutes);
      if (Object.keys(issues).length) { fields.setInvalid(issues); setError('Fill in the highlighted fields'); return; }
      fields.setInvalid({});
      var serializedIngredients = serializeStructuredIngredients(ingredients);
      var serializedSteps = serializeStructuredSteps(steps);
      setError('');
      update.mutate({ id: dishId, data: { dish_name: name.trim(), price_rubles: Number(price), cook_minutes: Number(minutes), ingredients: serializedIngredients, recipe_steps: serializedSteps, photo_uri: photoUri, tags: tagsWithMinutes(selectedTags, minutes) } }).then(function() {
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
          React.createElement(View, { style: styles.priceTimeRow },
            React.createElement(View, { style: styles.priceTimeCol },
              React.createElement(Text, { testID: 'Text-51', style: styles.fieldLabel, componentId: 'dish-detail-price-label' }, 'Price'),
              React.createElement(TextInput, { testID: 'TextInput-6', style: [styles.input, fields.hot('price', !String(price || '').trim()) ? styles.invalidField : null], value: price, onChangeText: setPrice, keyboardType: 'numeric', componentId: 'dish-detail-price' })),
            React.createElement(View, { style: styles.priceTimeCol },
              React.createElement(Text, { testID: 'Text-51b', style: styles.fieldLabel, componentId: 'dish-detail-minutes-label' }, 'Cook time'),
              React.createElement(TextInput, { testID: 'TextInput-6b', style: [styles.input, fields.hot('minutes', !(Number(minutes) > 0)) ? styles.invalidField : null], value: minutes, onChangeText: function(value) { setMinutes(String(value || '').replace(/[^0-9]/g, '')); }, keyboardType: 'numeric', placeholder: '30', componentId: 'dish-detail-minutes' }))
          ),
          
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
    photoViewer: { flex: 1, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' },
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
    priceTimeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
    priceTimeCol: { flex: 1, minWidth: 0 },
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
    searchInput: { flex: 1, height: 48, minHeight: 48, maxHeight: 48, borderRadius: radiusPill, backgroundColor: cardColor, borderWidth: 1, borderColor: borderColor, paddingHorizontal: 16, color: textPrimary, fontSize: 15 },
    recipeSearch: { width: '100%', height: 48, minHeight: 48, maxHeight: 48, flexGrow: 0, flexShrink: 0, marginTop: 8, marginBottom: 4, borderRadius: 24, backgroundColor: cardColor, borderWidth: 1, borderColor: borderColor, paddingHorizontal: 16, paddingVertical: 0, color: textPrimary, fontSize: 15 },
    importEntry: { height: 36, paddingHorizontal: 12, borderRadius: 18, borderWidth: 1, borderColor: accentColor, alignItems: 'center', justifyContent: 'center' },
    importEntryText: { color: accentColor, fontSize: 13, fontWeight: '700' },
    searchAdd: { width: 48, height: 48, borderRadius: 24, backgroundColor: accentColor, alignItems: 'center', justifyContent: 'center' },
    swipeShell: { marginBottom: 10, overflow: 'hidden' },
    swipeFront: { backgroundColor: cardColor, width: '100%', borderRadius: radiusMd },
    swipeDelete: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 88, borderRadius: radiusMd, backgroundColor: '#E25B52', overflow: 'hidden' },
    swipeDeleteHit: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', gap: 4 },
    swipeDeleteText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
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

  // @section:RecipeImportScreen @depends:[ThemeContext,shared-components,styles]
  var RecipeImportScreen = function(props) {
    var insets = useSafeAreaInsets();
    var queryState = React.useState('');
    var query = queryState[0], setQuery = queryState[1];
    var resultState = React.useState([]);
    var results = resultState[0], setResults = resultState[1];
    var statusState = React.useState('idle');
    var status = statusState[0], setStatus = statusState[1];
    var busyState = React.useState('');
    var busyId = busyState[0], setBusyId = busyState[1];
    var search = function() {
      var text = String(query || '').trim();
      if (!text || status === 'loading') return;
      setStatus('loading');
      setResults([]);
      var lookup = /[а-яё]/i.test(text) ? translateLines([text], 'ru', 'en').then(function(lines) { return lines[0] || text; }) : Promise.resolve(text);
      lookup.then(function(english) {
        var term = tidyTranslation(english || text).replace(/%20/gi, ' ').trim() || text;
        var load = function(value) {
          return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + encodeURIComponent(value)).then(function(response) { return response.json(); });
        };
        return load(term).then(function(data) {
          var meals = data && data.meals || [];
          if (meals.length || term.indexOf(' ') < 0) return meals;
          var word = term.split(/\s+/).slice().sort(function(a, b) { return b.length - a.length; })[0];
          if (!word || word === term) return meals;
          return load(word).then(function(retry) { return retry && retry.meals || []; });
        });
      }).then(function(meals) {
        var rows = meals.map(function(meal) {
          return { id: meal.idMeal, name: meal.strMeal, thumb: meal.strMealThumb || '' };
        });
        return translateLines(rows.map(function(row) { return row.name; }), 'en', 'ru').then(function(names) {
          setResults(rows.map(function(row, index) { return Object.assign({}, row, { title: names[index] || row.name }); }));
          setStatus(rows.length ? 'ready' : 'empty');
        });
      }).catch(function() { setStatus('error'); });
    };
    var addMeal = function(row) {
      if (busyId) return;
      setBusyId(row.id);
      fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + encodeURIComponent(row.id)).then(function(response) { return response.json(); }).then(function(data) {
        var meal = data && data.meals && data.meals[0];
        if (!meal) throw new Error('empty');
        var ingredients = mealIngredients(meal);
        var steps = shortenMethod(meal.strInstructions);
        var tags = guessFoodTags(meal, ingredients);
        var lines = [meal.strMeal].concat(ingredients.map(function(item) { return item.name; }), steps.map(function(step) { return step.text; }));
        return translateLines(lines, 'en', 'ru').then(function(translated) {
          var name = translated[0] || row.title || meal.strMeal;
          var ingredientCount = ingredients.length;
          var nextIngredients = ingredients.map(function(item, index) {
            return { name: translated[index + 1] || item.name, amount: item.amount, unit: item.unit };
          });
          var nextSteps = steps.map(function(step, index) {
            return { text: translated[ingredientCount + 1 + index] || step.text, photo: '' };
          });
          props.navigation.navigate('DishEditor', {
            prefill: {
              dish_name: name,
              price_rubles: 0,
              photo_uri: meal.strMealThumb || row.thumb || '',
              ingredients: nextIngredients,
              steps: nextSteps,
              tags: tags,
              cook_minutes: recipeMinutes({ steps: steps }) || ''
            }
          });
        });
      }).catch(function() {
        Alert.alert('Рецепт', 'Не удалось загрузить этот рецепт. Проверьте интернет и попробуйте ещё раз.');
      }).then(function() { setBusyId(''); });
    };
    return React.createElement(View, { style: [styles.screen, { paddingTop: insets.top }], componentId: 'recipe-import-screen' },
      React.createElement(StatusBar, { backgroundColor: backgroundColor, barStyle: 'light-content' }),
      React.createElement(View, { style: styles.tabScreen },
        React.createElement(Header, { id: 'recipe-import', title: 'Add from outside', back: function() { props.navigation.goBack(); } }),
        React.createElement(View, { style: styles.searchRow },
          React.createElement(TextInput, { style: styles.searchInput, value: query, onChangeText: setQuery, placeholder: 'Search recipes', autoCapitalize: 'none', autoCorrect: false, returnKeyType: 'search', onSubmitEditing: search }),
          React.createElement(TouchableOpacity, { style: styles.searchAdd, onPress: search, accessibilityLabel: 'Найти' },
            React.createElement(Ionicons, { name: 'search', size: 22, color: onAccentColor }))),
        React.createElement(Text, { style: [styles.smallMuted, { marginBottom: 8 }] }, 'Фото, название и короткий рецепт. Шаги с сайта без своих фото.'),
        status === 'loading' ? React.createElement(View, { style: styles.centerEmpty },
          React.createElement(Text, { style: styles.bodyMuted }, 'Ищем и переводим…')) :
        status === 'error' ? React.createElement(View, { style: styles.centerEmpty },
          React.createElement(Text, { style: styles.title }, 'Catalog is unavailable'),
          React.createElement(PrimaryButton, { id: 'import-retry', label: 'Try again', onPress: search })) :
        status === 'empty' ? React.createElement(View, { style: styles.centerEmpty },
          React.createElement(Text, { style: styles.title }, 'Nothing in the catalog')) :
        status === 'idle' ? React.createElement(View, { style: styles.centerEmpty },
          React.createElement(Text, { style: styles.bodyMuted }, 'Напишите название блюда и нажмите поиск.')) :
        React.createElement(ScrollView, { style: styles.flexScroll, keyboardShouldPersistTaps: 'handled', contentContainerStyle: { paddingBottom: insets.bottom + 24 } },
          results.map(function(row) {
            return React.createElement(View, { key: row.id, style: styles.menuRow },
              row.thumb ? React.createElement(Image, { source: { uri: row.thumb }, style: styles.menuImage, resizeMode: 'cover' }) :
                React.createElement(View, { style: [styles.menuImage, styles.imageFallback] }, React.createElement(Ionicons, { name: 'restaurant-outline', size: 22, color: textSecondary })),
              React.createElement(Text, { style: [styles.medium, { flex: 1 }] }, row.title || row.name),
              React.createElement(TouchableOpacity, { style: styles.searchAdd, onPress: function() { addMeal(row); }, disabled: !!busyId, accessibilityLabel: 'Добавить' },
                React.createElement(Ionicons, { name: busyId === row.id ? 'hourglass-outline' : 'add', size: 26, color: onAccentColor }))
            );
          }))
      ));
  };
  // @end:RecipeImportScreen

  // @section:MainNavigator @depends:[TabNavigator,SpinResultScreen,RecipeDetailScreen,DishEditorScreen,DishDetailScreen,CameraScreen,MenuManagerScreen,HistoryScreen,RecipeImportScreen,navigation-setup]
  var MainNavigator = function() {
    return React.createElement(Stack.Navigator, { testID: 'Navigator-2', initialRouteName: 'Main', screenOptions: { headerShown: false, cardStyle: { backgroundColor: backgroundColor } } },
      React.createElement(Stack.Screen, { testID: 'Screen-4', name: 'Main', component: TabNavigator }),
      React.createElement(Stack.Screen, { testID: 'Screen-5', name: 'SpinResult', component: SpinResultScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-6', name: 'RecipeDetail', component: RecipeDetailScreen }),
      React.createElement(Stack.Screen, { testID: 'Source-7', name: 'DishEditor', component: DishEditorScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-8', name: 'DishDetail', component: DishDetailScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-9', name: 'Camera', component: CameraScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-10', name: 'MenuManager', component: MenuManagerScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-12', name: 'PlaceEditor', component: PlaceEditorScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-11', name: 'History', component: HistoryScreen }),
      React.createElement(Stack.Screen, { testID: 'Screen-14', name: 'RecipeImport', component: RecipeImportScreen }));
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
