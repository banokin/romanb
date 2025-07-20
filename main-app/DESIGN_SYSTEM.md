# Freddy English Tutor - Design System

## 🎨 Цветовая палитра

### Основные цвета
- **Freddy Blue**: `#3B82F6` - основной синий цвет
- **Freddy Purple**: `#9333EA` - основной фиолетовый цвет
- **Freddy Gradient**: `linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)` - основной градиент

### Фоновые цвета
- **Background Gradient**: `linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 50%, #FDF2F8 100%)`
- **Card Background**: `#FFFFFF` - белый фон для карточек
- **Input Background**: `#F9FAFB` - фон для полей ввода
- **Input Focus**: `#FFFFFF` - фон при фокусе

### Текстовые цвета
- **Primary Text**: `#1F2937` - основной текст
- **Secondary Text**: `#6B7280` - вторичный текст
- **Light Text**: `#9CA3AF` - светлый текст
- **White Text**: `#FFFFFF` - белый текст

### Статусные цвета
- **Success**: `#10B981` - успех
- **Warning**: `#F59E0B` - предупреждение
- **Error**: `#EF4444` - ошибка
- **Recording**: `#DC2626` - запись

### Цвета записи
- **Recording Background**: `#FEF2F2` - фон индикатора записи
- **Recording Border**: `#FECACA` - граница индикатора записи
- **Recording Dot**: `#EF4444` - точка записи

## 📝 Типографика

### Шрифты
- **Font Family**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Размеры шрифтов
- **XS**: `12px` - очень маленький
- **SM**: `14px` - маленький
- **Base**: `16px` - базовый
- **LG**: `18px` - большой
- **XL**: `20px` - очень большой

## 📏 Масштаб отступов

### Отступы
- **XS**: `4px` - очень маленький
- **SM**: `8px` - маленький
- **MD**: `12px` - средний
- **LG**: `16px` - большой
- **XL**: `20px` - очень большой
- **2XL**: `24px` - экстра большой
- **3XL**: `32px` - супер большой
- **4XL**: `48px` - максимальный

## 🔄 Радиусы скругления

### Border Radius
- **SM**: `8px` - маленький
- **MD**: `12px` - средний
- **LG**: `16px` - большой
- **XL**: `24px` - очень большой
- **Full**: `9999px` - полное скругление (pill)

## 🎭 Компоненты

### 1. Avatar Component
**FreddyAvatar** - аватар с градиентным фоном и белой буквой "F"

**Размеры:**
- **Large**: `48px × 48px` (w-12 h-12)
- **Small**: `24px × 24px` (w-6 h-6)

**Стили:**
- Background: Freddy Gradient
- Text Color: #FFFFFF
- Font Weight: Bold
- Border Radius: 50%

### 2. Message Bubble Components
**User Message:**
- Background: Freddy Gradient
- Text Color: #FFFFFF
- Padding: 16px 20px
- Border Radius: 12px
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
- Max Width: 288px (mobile), 384px (desktop)

**Freddy Message:**
- Background: #FFFFFF
- Text Color: #1F2937
- Border: 2px solid #DBEAFE
- Padding: 16px 20px
- Border Radius: 12px
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
- Max Width: 288px (mobile), 384px (desktop)

### 3. Button Components

**Primary Send Button:**
- Background: Linear gradient from #3B82F6 to #9333EA
- Size: 48px × 48px
- Border Radius: 50%
- Icon Color: #FFFFFF
- Icon Size: 20px
- Box Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
- Hover: Scale 1.05, opacity 0.9
- Active: Scale 0.95

**Voice Button (Inactive):**
- Background: #F3E8FF
- Text Color: #7C3AED
- Size: 48px × 48px
- Border Radius: 50%
- Icon Size: 20px
- Hover: Scale 1.05
- Active: Scale 0.95

**Voice Button (Recording):**
- Background: #EF4444
- Text Color: #FFFFFF
- Size: 48px × 48px
- Border Radius: 50%
- Icon Size: 20px
- Animation: Pulse effect

**Circular Button:**
- Background: Freddy Gradient
- Text Color: #FFFFFF
- Size: 48px × 48px
- Border Radius: 50%
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
- Hover: Scale 1.05, opacity 0.9
- Active: Scale 0.95

### 4. Input Field Component
**Text Input:**
- Background: #F9FAFB (default), #FFFFFF (focus)
- Border: 2px solid #E5E7EB (default), #60A5FA (focus)
- Border Radius: 9999px (pill shape)
- Padding: 12px 16px
- Font Size: 16px
- Placeholder Color: #9CA3AF
- Width: 100% (flex-grow)
- Focus Shadow: 0 0 0 3px rgba(96, 165, 250, 0.1)

### 5. Header Component
**Header Container:**
- Background: #FFFFFF
- Border Bottom: 4px solid (gradient from #60A5FA to #9333EA)
- Padding: 16px
- Box Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

**Header Layout:**
- Display: Flex
- Align Items: Center
- Gap: 12px

### 6. Recording Indicator Component
**Recording Banner:**
- Background: #FEF2F2
- Border: 2px solid #FECACA
- Border Radius: 8px
- Padding: 12px
- Margin Bottom: 12px

**Recording Dot:**
- Size: 12px × 12px
- Background: #EF4444
- Border Radius: 50%
- Animation: Pulse

**Stop Button:**
- Background: #EF4444
- Text Color: #FFFFFF
- Padding: 4px 12px
- Border Radius: 9999px
- Font Size: 14px

### 7. Card Component
**Card:**
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 8px
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
- Padding: 16px

## 🎨 Анимации и переходы

### Временные функции
- **Default Easing**: ease-in-out
- **Duration**: 300ms (standard), 150ms (fast)

### Анимации
**Hover Scale:**
- Transform: scale(1.05) или scale(1.1)
- Transition: transform 300ms ease-in-out

**Pulse Animation:**
- Animation: pulse 2s infinite
- Keyframes: opacity 1 → 0.5 → 1

**Bounce Animation:**
- Animation: bounce 1s infinite
- Для декоративных элементов

**Fade In:**
- Opacity: 0 → 1
- Duration: 300ms
- Для новых сообщений

**Scale In:**
- Transform: scale(0.95) → scale(1)
- Opacity: 0 → 1
- Duration: 300ms

### Интерактивные состояния
**Button Hover:**
- Scale: 1.05-1.1
- Shadow: Enhanced
- Background: Slightly darker

**Button Active:**
- Scale: 0.95
- Shadow: Reduced

**Input Focus:**
- Border Color: #60A5FA
- Background: #FFFFFF
- Shadow: 0 0 0 3px rgba(96, 165, 250, 0.1)

## 🎯 Сетка макета

### Размеры контейнеров
- **Mobile**: 100% width, 16px padding
- **Desktop**: Max 768px width, centered
- **Full Height**: 100vh (viewport height)

### Структура макета
**App Layout (Flex Column):**
1. Header (Fixed height)
2. Messages Area (Flex-grow, overflow-y-auto)
3. Input Area (Fixed height)

**Message Layout:**
- Gap: 16px between messages
- Padding: 16px container padding
- Alignment: flex-start (Freddy), flex-end (User)

**Input Layout:**
- Display: Flex
- Align Items: Center
- Gap: 8px

## 📱 Адаптивные брейкпоинты

### Брейкпоинты
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Адаптивные настройки
**Message Bubbles:**
- Mobile: Max-width 288px (xs)
- Desktop: Max-width 384px (lg)

**Input Area:**
- Mobile: Smaller button spacing
- Desktop: More generous spacing

**Typography:**
- Consistent across all breakpoints
- Focus on readability

## 🔧 CSS классы

### Основные классы компонентов
```css
/* Avatar */
.freddy-avatar
.freddy-avatar-large
.freddy-avatar-small

/* Messages */
.freddy-message-user
.freddy-message-freddy

/* Input */
.freddy-input

/* Buttons */
.freddy-button-primary
.freddy-button-secondary
.freddy-button-circular
.freddy-button-send
.freddy-button-voice
.freddy-button-voice-inactive
.freddy-button-voice-recording

/* Header */
.freddy-header
.freddy-header-layout

/* Recording */
.freddy-recording-banner
.freddy-recording-dot
.freddy-button-stop

/* Cards */
.freddy-card

/* Typography */
.freddy-text-header
.freddy-text-subtitle
.freddy-text-message
.freddy-text-timestamp
.freddy-text-footer

/* Layout */
.freddy-container
.freddy-message-gap
.freddy-input-layout
.freddy-full-height
.freddy-flex-grow
.freddy-flex-shrink

/* Status */
.freddy-status-success
.freddy-status-warning
.freddy-status-error
.freddy-status-recording

/* Interactive */
.freddy-hover-scale
.freddy-active-scale
.freddy-focus-ring
```

### Утилиты
```css
/* Animations */
.animate-fade-in
.animate-scale-in

/* Responsive */
.freddy-responsive-container

/* Scrollbar */
.scrollbar-hide
```

## 🎨 Tailwind конфигурация

### Расширения темы
```javascript
// Colors
'freddy-blue': '#3B82F6',
'freddy-purple': '#9333EA',
'freddy-gradient': 'linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)',

// Spacing
'freddy-xs': '4px',
'freddy-sm': '8px',
'freddy-md': '12px',
'freddy-lg': '16px',
'freddy-xl': '20px',

// Border Radius
'freddy-sm': '8px',
'freddy-md': '12px',
'freddy-lg': '16px',
'freddy-xl': '24px',
'freddy-full': '9999px',

// Animations
'pulse': 'pulse 2s infinite',
'bounce': 'bounce 1s infinite',
'fade-in': 'fade-in 300ms ease-out',
'scale-in': 'scale-in 300ms ease-out',

// Max Width
'freddy-message-xs': '288px',
'freddy-message-lg': '384px',
```

## 🎯 Рекомендации по использованию

### Принципы дизайна
1. **Консистентность**: Используйте только определенные цвета и размеры
2. **Доступность**: Обеспечивайте достаточный контраст и размеры для взаимодействия
3. **Отзывчивость**: Все компоненты должны адаптироваться к разным размерам экрана
4. **Производительность**: Используйте CSS-анимации вместо JavaScript для плавности

### Лучшие практики
1. **Компонентный подход**: Создавайте переиспользуемые компоненты
2. **Семантическая разметка**: Используйте правильные HTML-теги
3. **Состояния**: Всегда учитывайте hover, focus, active состояния
4. **Типографика**: Соблюдайте иерархию текста

### Совместимость
- **Браузеры**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Устройства**: Mobile, Tablet, Desktop
- **Доступность**: WCAG 2.1 AA compliance

## 📚 Ресурсы

### Иконки
- **Lucide React**: Основная библиотека иконок
- **Размеры**: 16px, 20px, 24px

### Шрифты
- **System Fonts**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
- **Fallback**: sans-serif

### Цвета
- **HEX**: Все цвета определены в HEX формате
- **RGB**: Доступны в RGB формате для прозрачности
- **Gradients**: CSS linear-gradient для градиентов