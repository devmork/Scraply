# Scraply Project Structure

**Laravel 11 + React (Inertia) + MySQL** · Complete folder and module organization

---

## 📂 Root Directory Structure

```
Scraply/
├── app/                           # Laravel application code
│   ├── Console/
│   │   └── Kernel.php
│   ├── Exceptions/
│   │   └── Handler.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── DashboardController.php
│   │   │   ├── CollectorController.php
│   │   │   ├── JunkOwnerController.php
│   │   │   └── ShopOwnerController.php
│   │   ├── Middleware/
│   │   │   ├── Authenticate.php
│   │   │   ├── EnsureEmailIsVerified.php
│   │   │   └── CheckUserRole.php
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Listing.php
│   │   ├── ListingImage.php
│   │   ├── Pickup.php
│   │   ├── Shop.php
│   │   ├── ShopBuyingRate.php
│   │   ├── SellRequest.php
│   │   ├── Message.php
│   │   ├── Rating.php
│   │   ├── Notification.php
│   │   ├── EcoPoints.php
│   │   └── DeviceToken.php
│   ├── Providers/
│   │   ├── AppServiceProvider.php
│   │   ├── AuthServiceProvider.php
│   │   ├── BroadcastServiceProvider.php
│   │   ├── EventServiceProvider.php
│   │   └── RouteServiceProvider.php
│   └── Traits/
│       ├── RoleBasedTrait.php
│       └── LocationTrait.php
├── bootstrap/
│   ├── app.php
│   └── cache/
├── config/                        # Configuration files
│   ├── app.php
│   ├── auth.php
│   ├── broadcasting.php
│   ├── cache.php
│   ├── database.php
│   ├── filesystems.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── sanctum.php
│   ├── services.php
│   └── session.php
├── database/
│   ├── factories/
│   │   ├── UserFactory.php
│   │   ├── ListingFactory.php
│   │   ├── ShopFactory.php
│   │   └── SellRequestFactory.php
│   ├── migrations/
│   │   ├── 2024_01_01_000000_create_users_table.php
│   │   ├── 2024_01_01_000001_create_listings_table.php
│   │   ├── 2024_01_01_000002_create_listing_images_table.php
│   │   ├── 2024_01_01_000003_create_pickups_table.php
│   │   ├── 2024_01_01_000004_create_shops_table.php
│   │   ├── 2024_01_01_000005_create_shop_buying_rates_table.php
│   │   ├── 2024_01_01_000006_create_sell_requests_table.php
│   │   ├── 2024_01_01_000007_create_messages_table.php
│   │   ├── 2024_01_01_000008_create_ratings_table.php
│   │   ├── 2024_01_01_000009_create_notifications_table.php
│   │   ├── 2024_01_01_000010_create_eco_points_table.php
│   │   ├── 2024_01_01_000011_create_device_tokens_table.php
│   │   ├── 2024_01_01_000012_create_personal_access_tokens_table.php
│   │   └── 2024_01_01_000013_create_password_reset_tokens_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── UserSeeder.php
│       ├── ShopSeeder.php
│       └── MaterialTypeSeeder.php
├── public/
│   ├── index.php
│   ├── .htaccess
│   ├── favicon.ico
│   ├── images/
│   │   ├── icons/
│   │   ├── logos/
│   │   └── materials/
│   ├── uploads/
│   │   ├── avatars/
│   │   ├── listings/
│   │   └── shops/
│   └── storage/
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── PasswordReset.tsx
│   │   │   ├── Common/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── Collector/
│   │   │   │   ├── MapView.tsx
│   │   │   │   ├── MyPickups.tsx
│   │   │   │   ├── PickupDetail.tsx
│   │   │   │   ├── RatesComparison.tsx
│   │   │   │   └── SendSellRequest.tsx
│   │   │   ├── ShopOwner/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── MyShop.tsx
│   │   │   │   ├── BuyingRates.tsx
│   │   │   │   ├── BuyingRateEditor.tsx
│   │   │   │   ├── SellRequests.tsx
│   │   │   │   ├── SellRequestDetail.tsx
│   │   │   │   └── SellRequestResponse.tsx
│   │   │   ├── JunkOwner/
│   │   │   │   ├── CreateListing.tsx
│   │   │   │   ├── MyListings.tsx
│   │   │   │   ├── ListingDetail.tsx
│   │   │   │   └── ListingEditor.tsx
│   │   │   ├── Messages/
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   ├── ChatList.tsx
│   │   │   │   └── MessageItem.tsx
│   │   │   ├── Ratings/
│   │   │   │   ├── RatingForm.tsx
│   │   │   │   ├── RatingDisplay.tsx
│   │   │   │   └── UserRatings.tsx
│   │   │   └── Profile/
│   │   │       ├── ProfileView.tsx
│   │   │       └── ProfileEdit.tsx
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   └── ForgotPassword.tsx
│   │   │   ├── Collector/
│   │   │   │   ├── Map.tsx
│   │   │   │   ├── MyPickups.tsx
│   │   │   │   ├── PickupDetail.tsx
│   │   │   │   └── Rates.tsx
│   │   │   ├── ShopOwner/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── MyShop.tsx
│   │   │   │   ├── BuyingRates.tsx
│   │   │   │   └── SellRequests.tsx
│   │   │   ├── JunkOwner/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── CreateListing.tsx
│   │   │   │   └── MyListings.tsx
│   │   │   ├── Shared/
│   │   │   │   ├── Messages.tsx
│   │   │   │   ├── Profile.tsx
│   │   │   │   ├── Notifications.tsx
│   │   │   │   └── EcoPoints.tsx
│   │   │   ├── Errors/
│   │   │   │   ├── NotFound.tsx
│   │   │   │   └── ServerError.tsx
│   │   │   └── Welcome.tsx
│   │   ├── Hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useGeolocation.ts
│   │   │   ├── useFetch.ts
│   │   │   └── useNotifications.ts
│   │   ├── Services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── listingService.ts
│   │   │   ├── shopService.ts
│   │   │   ├── buyingRateService.ts
│   │   │   ├── sellRequestService.ts
│   │   │   ├── messageService.ts
│   │   │   ├── ratingService.ts
│   │   │   └── notificationService.ts
│   │   ├── Store/
│   │   │   ├── store.ts
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── userSlice.ts
│   │   │   │   ├── listingSlice.ts
│   │   │   │   ├── shopSlice.ts
│   │   │   │   └── notificationSlice.ts
│   │   │   └── types/
│   │   │       ├── index.ts
│   │   │       └── entities.ts
│   │   ├── Utils/
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   ├── Styles/
│   │   │   ├── globals.css
│   │   │   ├── variables.css
│   │   │   └── components.css
│   │   ├── app.tsx
│   │   └── Layout.tsx
│   └── views/
│       └── app.blade.php
├── routes/
│   ├── api.php                    # API routes
│   ├── web.php                    # Web routes (Inertia)
│   └── channels.php               # Broadcasting channels
├── storage/
│   ├── app/
│   │   ├── public/
│   │   │   ├── avatars/
│   │   │   ├── listings/
│   │   │   └── shops/
│   │   └── logs/
│   ├── framework/
│   │   ├── cache/
│   │   ├── sessions/
│   │   └── views/
│   └── logs/
├── tests/
│   ├── Feature/
│   │   ├── AuthTest.php
│   │   ├── ListingTest.php
│   │   ├── PickupTest.php
│   │   ├── ShopTest.php
│   │   ├── BuyingRateTest.php
│   │   ├── SellRequestTest.php
│   │   └── MessageTest.php
│   ├── Unit/
│   │   ├── Models/
│   │   └── Services/
│   └── TestCase.php
├── .env.example
├── .gitignore
├── .editorconfig
├── artisan
├── composer.json
├── composer.lock
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── phpunit.xml
├── README.md
├── DESIGN.md
├── Scraply_Database_Schema.md
├── PROJECT_STRUCTURE.md
└── LICENSE
```

---

## 🎯 Module Organization

### **1. Collector Module** (`resources/js/Pages/Collector/` & `app/Http/Controllers/`)

**Features:**
- 🗺️ Map View — See nearby listings
- 📋 My Pickups — Manage claimed pickups (Available, In Progress, Completed)
- ⭐ Rates Comparison — Browse shop buying rates
- 💬 Send Sell Request — Propose material to shop

**Key Components:**
```
Collector/
├── MapView.tsx               # Geospatial listing display
├── MyPickups.tsx             # Pickup management (3 statuses)
├── PickupDetail.tsx          # Individual pickup info
├── RatesComparison.tsx       # Shop buying rates list
└── SendSellRequest.tsx       # Form to send sell request
```

**API Routes:**
```php
Route::middleware(['auth:sanctum', 'role:collector'])->group(function () {
    Route::get('/api/listings/nearby', [CollectorController::class, 'nearbyListings']);
    Route::get('/api/pickups', [CollectorController::class, 'myPickups']);
    Route::post('/api/pickups', [CollectorController::class, 'claimListing']);
    Route::patch('/api/pickups/{id}/status', [CollectorController::class, 'updatePickupStatus']);
    Route::get('/api/shops/rates', [CollectorController::class, 'browseShopRates']);
    Route::post('/api/sell-requests', [CollectorController::class, 'sendSellRequest']);
});
```

---

### **2. Shop Owner Module** (`resources/js/Pages/ShopOwner/` & `app/Http/Controllers/ShopOwnerController.php`)

**Navigation Items:**
- 📊 Dashboard — Overview (pending requests, active listings, revenue)
- 🏪 My Shop — Shop profile & details
- 💰 **Buying Rates** — Manage material prices (NEW)
- 📥 **Sell Requests** — Incoming requests from collectors (NEW)
- 💬 Messages — Chat with collectors
- ⭐ Ratings — User reviews

**Features:**
- **Buying Rates Module:**
  - View all 6 fixed material types
  - Set price per kg for each material
  - Optional: Define subcategories/grades (e.g., PET Bottles, Premium Grade)
  - Mark rates active/inactive
  - Track price trends (Up/Down/Stable indicators)

- **Sell Requests Module:**
  - View pending requests from collectors
  - Collector info: name, rating, location
  - Material type, quantity, asking price
  - **Accept/Decline** request
  - (Optional) Open direct message to negotiate

**Key Components:**
```
ShopOwner/
├── Dashboard.tsx              # Overview & stats
├── MyShop.tsx                 # Shop profile editor
├── BuyingRates.tsx            # Material rates grid
├── BuyingRateEditor.tsx       # Edit individual rate + subcategories
├── SellRequests.tsx           # Incoming requests list
├── SellRequestDetail.tsx      # Full request info
└── SellRequestResponse.tsx    # Accept/Decline form
```

**API Routes:**
```php
Route::middleware(['auth:sanctum', 'role:shop_owner'])->group(function () {
    Route::get('/api/shop/dashboard', [ShopOwnerController::class, 'dashboard']);
    Route::get('/api/shop/profile', [ShopOwnerController::class, 'shopProfile']);
    Route::patch('/api/shop/profile', [ShopOwnerController::class, 'updateShopProfile']);
    
    // Buying Rates
    Route::get('/api/buying-rates', [ShopOwnerController::class, 'getBuyingRates']);
    Route::patch('/api/buying-rates/{id}', [ShopOwnerController::class, 'updateBuyingRate']);
    Route::post('/api/buying-rates/{id}/subcategory', [ShopOwnerController::class, 'addSubcategory']);
    
    // Sell Requests (NEW)
    Route::get('/api/sell-requests', [ShopOwnerController::class, 'pendingSellRequests']);
    Route::get('/api/sell-requests/{id}', [ShopOwnerController::class, 'sellRequestDetail']);
    Route::patch('/api/sell-requests/{id}/accept', [ShopOwnerController::class, 'acceptSellRequest']);
    Route::patch('/api/sell-requests/{id}/decline', [ShopOwnerController::class, 'declineSellRequest']);
});
```

**Database Tables Involved:**
- `shops`
- `shop_buying_rates` (with NEW optional columns: `subcategory`, `grade`)
- `sell_requests`
- `users` (for collector info)

---

### **3. Junk Owner Module** (`resources/js/Pages/JunkOwner/`)

**Features:**
- 📝 Create Listing — Post junk for pickup
- 📋 My Listings — Manage active/completed/expired listings
- 🗺️ Map Integration — Show listing locations

**Key Components:**
```
JunkOwner/
├── Dashboard.tsx
├── CreateListing.tsx          # Form to post new junk
├── MyListings.tsx             # List of user's listings
├── ListingDetail.tsx          # Full listing info
└── ListingEditor.tsx          # Edit existing listing
```

---

### **4. Shared Modules**

#### **Messages** (`resources/js/Pages/Shared/Messages.tsx`)
- In-app chat between users
- Context-aware (linked to pickups/sell requests)
- Unread message indicator

#### **Ratings** (`resources/js/Components/Ratings/`)
- Star ratings after completed pickups
- Optional review text
- Display average rating on profiles

#### **Notifications** (`resources/js/Pages/Shared/Notifications.tsx`)
- Real-time in-app notifications
- Types: listing_claimed, sell_request_received, sell_request_accepted, sell_request_declined
- Mark read/unread
- Deep links to relevant pages

#### **Profile** (`resources/js/Pages/Shared/Profile.tsx`)
- User avatar, name, contact
- Average rating & review count
- Role-specific info (pickup count, shop name, etc.)
- Edit profile form

#### **Eco Points** (`resources/js/Pages/Shared/EcoPoints.tsx`)
- Display total eco points earned
- Points history (sortable by material, date, reason)

---

## 🗄️ Database Schema Integration

### **Shop Buying Rates Table** (Enhanced)

```sql
CREATE TABLE shop_buying_rates (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    shop_id BIGINT UNSIGNED NOT NULL,
    material_type ENUM('plastic', 'metal', 'glass', 'paper', 'ewaste', 'other'),
    subcategory VARCHAR(100) NULL,    -- e.g., "PET Bottles", "Aluminum Cans"
    grade ENUM('standard', 'premium', 'bulk') DEFAULT 'standard',
    price_per_kg DECIMAL(10,2) NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE KEY unique_rate (shop_id, material_type, subcategory, grade),
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
);
```

### **Sell Requests Table** (Renamed from buy_requests)

```sql
CREATE TABLE sell_requests (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    collector_id BIGINT UNSIGNED NOT NULL,
    shop_id BIGINT UNSIGNED NOT NULL,
    material_type ENUM('plastic', 'metal', 'glass', 'paper', 'ewaste', 'other'),
    quantity_kg DECIMAL(8,2) NOT NULL,
    offered_price_per_kg DECIMAL(10,2) NOT NULL,
    description TEXT NULL,
    status ENUM('pending', 'accepted', 'declined', 'expired') DEFAULT 'pending',
    expiry_date DATE NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    INDEX (shop_id, status),
    INDEX (material_type),
    FOREIGN KEY (collector_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
);
```

---

## 📡 API Structure

### **Authentication Endpoints**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
```

### **Collector Endpoints**
```
GET    /api/listings/nearby
POST   /api/pickups (claim)
PATCH  /api/pickups/{id}/status
GET    /api/shops/rates
POST   /api/sell-requests
```

### **Shop Owner Endpoints** (NEW)
```
GET    /api/buying-rates
PATCH  /api/buying-rates/{id}
POST   /api/buying-rates/{id}/subcategory
GET    /api/sell-requests
GET    /api/sell-requests/{id}
PATCH  /api/sell-requests/{id}/accept
PATCH  /api/sell-requests/{id}/decline
```

### **Shared Endpoints**
```
GET    /api/messages/{userId}
POST   /api/messages
PATCH  /api/messages/{id}/read
GET    /api/ratings/{userId}
POST   /api/ratings
GET    /api/notifications
PATCH  /api/notifications/{id}/read
```

---

## 🚀 Key Features by Role

| Role | Key Pages | Features |
|------|-----------|----------|
| **Collector** | Map, My Pickups, Rates, Sell Requests | Browse listings, claim pickups, send sell requests to shops |
| **Shop Owner** | Dashboard, My Shop, **Buying Rates**, **Sell Requests**, Messages | Manage shop, set material prices, accept/decline sell requests |
| **Junk Owner** | Dashboard, Create Listing, My Listings | Post junk, manage listings |
| **All** | Messages, Profile, Ratings, Eco Points | In-app chat, manage profile, view reviews, track eco points |

---

## 📦 File Organization Principles

1. **Separation of Concerns:** Controllers, Models, Services kept distinct
2. **Role-Based Routing:** Each user role has dedicated routes & components
3. **Reusable Components:** Common UI elements in `Components/Common/`
4. **API-First Design:** All frontend requests go through RESTful API
5. **TypeScript:** Fully typed for better IDE support & type safety
6. **Inertia.js:** Server-side rendering with React components

---

*Last updated: 2026-06-02*
