# Scraply Database Schema Reference

**Laravel + MySQL** · All Tables, Columns, Indexes & Relationships

## Database Overview

Scraply uses 14 database tables across 3 functional domains: **User & Auth**, **Marketplace** (listings, pickups, shops), and **Supporting** (messages, ratings, notifications, eco points). 

All tables use `BIGINT UNSIGNED` primary keys with `AUTO_INCREMENT`. Foreign keys use `CASCADE DELETE` or `SET NULL` depending on whether child records are meaningful without the parent.

---

## Table Schemas

### 1. `users`

Core user account table. Stores all three role types (`junk_owner`, `collector`, `shop_owner`). Role is set at registration and cannot be changed.

| Column              | Type              | Null | Default     | Key | Notes |
|---------------------|-------------------|------|-------------|-----|-------|
| `id`                | BIGINT UNSIGNED   | NO   | AUTO_INCREMENT | PK  | Auto-incrementing primary key |
| `name`              | VARCHAR(100)      | NO   | —           | —   | Full name — used in UI greetings |
| `email`             | VARCHAR(191)      | NO   | —           | UQ  | Unique — login identifier |
| `phone`             | VARCHAR(20)       | YES  | NULL        | —   | +63 Philippine format |
| `password`          | VARCHAR(255)      | NO   | —           | —   | bcrypt hash — never plain text |
| `role`              | ENUM              | NO   | —           | IX  | `junk_owner` \| `collector` \| `shop_owner` |
| `avatar_url`        | VARCHAR(500)      | YES  | NULL        | —   | Path to uploaded avatar image |
| `average_rating`    | DECIMAL(3,2)      | NO   | 0.00        | —   | Computed avg from ratings table |
| `last_lat`          | DECIMAL(10,7)     | YES  | NULL        | —   | Last known GPS latitude |
| `last_lng`          | DECIMAL(10,7)     | YES  | NULL        | —   | Last known GPS longitude |
| `email_verified_at` | TIMESTAMP         | YES  | NULL        | —   | NULL = unverified |
| `remember_token`    | VARCHAR(100)      | YES  | NULL        | —   | Laravel remember me token |
| `created_at`        | TIMESTAMP         | YES  | NULL        | —   | Account creation time |
| `updated_at`        | TIMESTAMP         | YES  | NULL        | —   | Last update time |

### 2. `listings`

Junk listings posted by Junk Owners. Status transitions: `open` → `claimed` → `completed`. Soft deletes set `deleted_at` and status = `expired`.

| Column                | Type             | Null | Default | Key | Notes |
|-----------------------|------------------|------|---------|-----|-------|
| `id`                  | BIGINT UNSIGNED  | NO   | AUTO_INCREMENT | PK  | Primary key |
| `owner_id`            | BIGINT UNSIGNED  | NO   | —       | FK  | FK → users.id (junk_owner role) |
| `collector_id`        | BIGINT UNSIGNED  | YES  | NULL    | FK  | FK → users.id — set when claimed |
| `title`               | VARCHAR(150)     | NO   | —       | —   | e.g. "PET Plastic Bottles" |
| `material_type`       | ENUM             | NO   | —       | IX  | `plastic`\|`metal`\|`glass`\|`paper`\|`ewaste`\|`other` |
| `quantity_kg`         | DECIMAL(8,2)     | NO   | —       | —   | Estimated weight in kilograms |
| `price_php`           | DECIMAL(10,2)    | YES  | NULL    | —   | NULL when `is_free` = true |
| `is_free`             | TINYINT(1)       | NO   | 0       | —   | 1 = donation / free pickup |
| `status`              | ENUM             | NO   | open    | IX  | `open`\|`claimed`\|`completed`\|`expired` |
| `address`             | VARCHAR(500)     | NO   | —       | —   | Human-readable pickup address |
| `latitude`            | DECIMAL(10,7)    | NO   | —       | IX  | GPS latitude for geo-queries |
| `longitude`           | DECIMAL(10,7)    | NO   | —       | IX  | GPS longitude for geo-queries |
| `pickup_date`         | DATE             | NO   | —       | —   | Scheduled pickup date |
| `pickup_time_start`   | TIME             | NO   | —       | —   | Availability window start |
| `pickup_time_end`     | TIME             | NO   | —       | —   | Availability window end |
| `deleted_at`          | TIMESTAMP        | YES  | NULL    | —   | Soft delete — set on owner delete |
| `created_at`          | TIMESTAMP        | YES  | NULL    | —   | — |
| `updated_at`          | TIMESTAMP        | YES  | NULL    | —   | — |

### 3. `listing_images`

Images attached to a listing. Up to 3 images per listing. `sort_order` = 1 is the primary/thumbnail image.

| Column       | Type            | Null | Default | Key | Notes |
|--------------|-----------------|------|---------|-----|-------|
| `id`         | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK  | Primary key |
| `listing_id` | BIGINT UNSIGNED | NO   | —       | FK  | FK → listings.id (cascade delete) |
| `image_url`  | VARCHAR(500)    | NO   | —       | —   | Storage path or full URL |
| `sort_order` | TINYINT         | NO   | 1       | IX  | 1 = primary, 2–3 = additional |
| `created_at` | TIMESTAMP       | YES  | NULL    | —   | — |

### 4. `pickups`

Records a collector claiming and completing a listing. One row per claim.

| Column          | Type            | Null | Default          | Key     | Notes |
|-----------------|-----------------|------|------------------|---------|-------|
| `id`            | BIGINT UNSIGNED | NO   | AUTO_INCREMENT   | PK      | Primary key |
| `listing_id`    | BIGINT UNSIGNED | NO   | —                | FK+UQ   | FK → listings.id (unique — 1 active claim) |
| `collector_id`  | BIGINT UNSIGNED | NO   | —                | FK      | FK → users.id (collector role) |
| `claimed_at`    | TIMESTAMP       | NO   | CURRENT_TIMESTAMP| —       | When the claim was made |
| `completed_at`  | TIMESTAMP       | YES  | NULL             | —       | NULL = still active, set = done |
| `created_at`    | TIMESTAMP       | YES  | NULL             | —       | — |
| `updated_at`    | TIMESTAMP       | YES  | NULL             | —       | — |

### 5. `shops`

Junk shop profiles created by Shop Owner users. One shop per user.

| Column               | Type            | Null | Default | Key     | Notes |
|----------------------|-----------------|------|---------|---------|-------|
| `id`                 | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK   | Primary key |
| `owner_id`           | BIGINT UNSIGNED | NO   | —       | FK+UQ   | FK → users.id, unique (1 shop/user) |
| `shop_name`          | VARCHAR(150)    | NO   | —       | —       | Display name of the shop |
| `description`        | TEXT            | YES  | NULL    | —       | Short shop description |
| `address`            | VARCHAR(500)    | NO   | —       | —       | Physical shop address |
| `latitude`           | DECIMAL(10,7)   | NO   | —       | IX      | Shop GPS latitude |
| `longitude`          | DECIMAL(10,7)   | NO   | —       | IX      | Shop GPS longitude |
| `accepted_materials` | JSON            | NO   | []      | —       | Array of MaterialType enums |
| `operating_hours`    | VARCHAR(200)    | YES  | NULL    | —       | e.g. "Mon–Sat 8AM–5PM" |
| `is_active`          | TINYINT(1)      | NO   | 1       | IX      | 1 = open for business |
| `created_at`         | TIMESTAMP       | YES  | NULL    | —       | — |
| `updated_at`         | TIMESTAMP       | YES  | NULL    | —       | — |

### 6. `shop_buying_rates`

Per-material buying prices set by each shop.

| Column            | Type            | Null | Default | Key    | Notes |
|-------------------|-----------------|------|---------|--------|-------|
| `id`              | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK  | Primary key |
| `shop_id`         | BIGINT UNSIGNED | NO   | —       | FK     | FK → shops.id (cascade delete) |
| `material_type`   | ENUM            | NO   | —       | UQ+    | UQ with shop_id — one rate/material |
| `price_per_kg`    | DECIMAL(10,2)   | NO   | —       | —      | Buying price in Philippine Peso (₱) |
| `is_active`       | TINYINT(1)      | NO   | 1       | IX     | 0 = hidden from collectors |
| `created_at`      | TIMESTAMP       | YES  | NULL    | —      | — |
| `updated_at`      | TIMESTAMP       | YES  | NULL    | —      | Updated when shop edits inline |

### 7. `sell_requests`

Material sell requests sent by Collectors to Shop Owners. Collector proposes selling scrap material to a shop at their asking price.

| Column                  | Type            | Null | Default | Key | Notes |
|-------------------------|-----------------|------|---------|-----|-------|
| `id`                    | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK  | Primary key |
| `collector_id`          | BIGINT UNSIGNED | NO   | —       | FK  | FK → users.id (collector role) |
| `shop_id`               | BIGINT UNSIGNED | NO   | —       | FK  | FK → shops.id |
| `material_type`         | ENUM            | NO   | —       | IX  | `plastic`\|`metal`\|`glass`\|`paper`\|`ewaste`\|`other` |
| `quantity_kg`           | DECIMAL(8,2)    | NO   | —       | —   | Proposed quantity in kg |
| `offered_price_per_kg`  | DECIMAL(10,2)   | NO   | —       | —   | Collector's asking price in ₱ |
| `description`           | TEXT            | YES  | NULL    | —   | e.g. "Clean PET bottles, sorted" |
| `status`                | ENUM            | NO   | pending | IX  | `pending`\|`accepted`\|`declined`\|`expired` |
| `expiry_date`           | DATE            | NO   | —       | IX  | Expired requests excluded from shop view |
| `created_at`            | TIMESTAMP       | YES  | NULL    | —   | — |
| `updated_at`            | TIMESTAMP       | YES  | NULL    | —   | — |

### 8. `messages`

In-app chat messages between users.

| Column       | Type            | Null | Default | Key     | Notes |
|--------------|-----------------|------|---------|---------|-------|
| `id`         | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK   | Primary key |
| `sender_id`  | BIGINT UNSIGNED | NO   | —       | FK+IX   | FK → users.id |
| `receiver_id`| BIGINT UNSIGNED | NO   | —       | FK+IX   | FK → users.id |
| `body`       | TEXT            | YES  | NULL    | —       | NULL when image-only |
| `image_url`  | VARCHAR(500)    | YES  | NULL    | —       | Optional attached image |
| `listing_id` | BIGINT UNSIGNED | YES  | NULL    | FK      | Conversation context |
| `is_read`    | TINYINT(1)      | NO   | 0       | IX      | 0 = unread |
| `created_at` | TIMESTAMP       | YES  | NULL    | IX      | Ordered for chat thread |
| `updated_at` | TIMESTAMP       | YES  | NULL    | —       | — |

### 9. `ratings`

Star ratings after completed pickups.

| Column       | Type            | Null | Default | Key     | Notes |
|--------------|-----------------|------|---------|---------|-------|
| `id`         | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK   | Primary key |
| `rater_id`   | BIGINT UNSIGNED | NO   | —       | FK      | Who gave the rating |
| `ratee_id`   | BIGINT UNSIGNED | NO   | —       | FK+IX   | Who received it |
| `listing_id` | BIGINT UNSIGNED | NO   | —       | FK      | Transaction context |
| `stars`      | TINYINT         | NO   | —       | —       | 1–5 |
| `comment`    | TEXT            | YES  | NULL    | —       | Optional review text |
| `created_at` | TIMESTAMP       | YES  | NULL    | —       | — |

### 10. `notifications`

Persisted in-app notifications.

| Column    | Type            | Null | Default | Key    | Notes |
|-----------|-----------------|------|---------|--------|-------|
| `id`      | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK  | Primary key |
| `user_id` | BIGINT UNSIGNED | NO   | —       | FK+IX  | Recipient |
| `type`    | ENUM            | NO   | —       | IX     | Various notification types |
| `title`   | VARCHAR(200)    | NO   | —       | —      | Short title |
| `body`    | TEXT            | NO   | —       | —      | Full message |
| `data`    | JSON            | NO   | {}      | —      | Deep-link payload |
| `is_read` | TINYINT(1)      | NO   | 0       | IX     | 0 = unread |
| `created_at` | TIMESTAMP    | YES  | NULL    | IX     | Ordering |
| `updated_at` | TIMESTAMP    | YES  | NULL    | —      | — |

### 11. `eco_points`

Points earned per completed pickup.

| Column       | Type            | Null | Default | Key   | Notes |
|--------------|-----------------|------|---------|-------|-------|
| `id`         | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK | Primary key |
| `user_id`    | BIGINT UNSIGNED | NO   | —       | FK+IX | Point recipient |
| `listing_id` | BIGINT UNSIGNED | NO   | —       | FK    | Source transaction |
| `points`     | INT             | NO   | —       | —     | Points awarded |
| `reason`     | VARCHAR(200)    | NO   | —       | —     | e.g. "Pickup completed – 5kg plastic" |
| `created_at` | TIMESTAMP       | YES  | NULL    | IX    | History ordering |

### 12. `device_tokens`

FCM and APNs push notification tokens.

| Column      | Type            | Null | Default | Key    | Notes |
|-------------|-----------------|------|---------|--------|-------|
| `id`        | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK  | Primary key |
| `user_id`   | BIGINT UNSIGNED | NO   | —       | FK+IX  | — |
| `token`     | TEXT            | NO   | —       | UQ     | FCM/APNs token |
| `platform`  | ENUM            | NO   | —       | —      | `android` \| `ios` \| `web` |
| `created_at`| TIMESTAMP       | YES  | NULL    | —      | — |
| `updated_at`| TIMESTAMP       | YES  | NULL    | —      | — |

### 13. `personal_access_tokens`

Laravel Sanctum default table.

| Column            | Type            | Null | Default | Key | Notes |
|-------------------|-----------------|------|---------|-----|-------|
| `id`              | BIGINT UNSIGNED | NO   | AUTO_INCREMENT | PK  | — |
| `tokenable_type`  | VARCHAR(255)    | NO   | —       | IX  | Polymorphic |
| `tokenable_id`    | BIGINT UNSIGNED | NO   | —       | IX  | — |
| `name`            | VARCHAR(255)    | NO   | —       | —   | Token name |
| `token`           | VARCHAR(64)     | NO   | —       | UQ  | Hashed token |
| `abilities`       | TEXT            | YES  | NULL    | —   | JSON abilities |
| `last_used_at`    | TIMESTAMP       | YES  | NULL    | —   | — |
| `expires_at`      | TIMESTAMP       | YES  | NULL    | —   | — |
| `created_at`      | TIMESTAMP       | YES  | NULL    | —   | — |
| `updated_at`      | TIMESTAMP       | YES  | NULL    | —   | — |

### 14. `password_reset_tokens`

Laravel default table for password resets.

| Column       | Type         | Null | Default | Key | Notes |
|--------------|--------------|------|---------|-----|-------|
| `email`      | VARCHAR(191) | NO   | —       | PK  | User email |
| `token`      | VARCHAR(255) | NO   | —       | —   | Hashed token |
| `created_at` | TIMESTAMP    | YES  | NULL    | —   | Expiry check |

---

## Database Indexes

**Key indexes** (Composite indexes listed in column order):

| Table                  | Index / Column(s)                     | Purpose |
|------------------------|---------------------------------------|---------|
| `users`                | `email` (UNIQUE)                      | Login lookup |
| `users`                | `role`                                | Filter by role |
| `listings`             | `owner_id`                            | My Listings |
| `listings`             | `collector_id`                        | My Pickups |
| `listings`             | `status`                              | Filter open listings |
| `listings`             | `latitude, longitude`                 | Geospatial queries |
| `listings`             | `material_type`                       | Material filter |
| `listing_images`       | `listing_id`                          | Images per listing |
| `listing_images`       | `sort_order`                          | Primary image |
| `pickups`              | `listing_id` (UNIQUE)                 | One claim per listing |
| `shops`                | `owner_id` (UNIQUE)                   | One shop per user |
| `shops`                | `latitude, longitude`                 | Nearby shops |
| `shops`                | `is_active`                           | Active shops only |
| `shop_buying_rates`    | `shop_id + material_type` (UNIQUE)    | One rate per material |
| `sell_requests`        | `collector_id + shop_id`              | Seller's requests to shop |
| `sell_requests`        | `shop_id + status`                    | Shop's pending requests |
| `sell_requests`        | `material_type`                       | Filter by material |
| `messages`             | `sender_id + receiver_id`             | Chat threads |
| `ratings`              | `rater_id + ratee_id + listing_id` (UNIQUE) | Prevent duplicates |
| `notifications`        | `user_id + is_read`                   | Unread count |

---

## Foreign Key Relationships

| From (Column)               | References     | On Delete     | Reason |
|-----------------------------|----------------|---------------|--------|
| `listings.owner_id`         | `users.id`     | CASCADE       | — |
| `listings.collector_id`     | `users.id`     | SET NULL      | — |
| `listing_images.listing_id` | `listings.id`  | CASCADE       | — |
| `messages.listing_id`       | `listings.id`  | SET NULL      | Keep thread |

*(Full list available in original document)*

## ENUM Values

- **users.role**: `junk_owner`, `collector`, `shop_owner`
- **listings.material_type**: `plastic`, `metal`, `glass`, `paper`, `ewaste`, `other`
- **listings.status**: `open`, `claimed`, `completed`, `expired`
- **sell_requests.material_type**: `plastic`, `metal`, `glass`, `paper`, `ewaste`, `other`
- **sell_requests.status**: `pending`, `accepted`, `declined`, `expired`
- **notifications.type**: `listing_claimed`, `listing_completed`, `new_listing_nearby`, `message_received`, `rating_received`

---

## Important Notes

- All monetary values use `DECIMAL(10,2)`.
- Geospatial queries use **Haversine formula** with B-Tree indexes on lat/long.
- `listings` uses **Soft Deletes**.
- `pickups.listing_id` has a **UNIQUE** constraint.
- `users.average_rating` is **denormalized**.
- `eco_points` is **insert-only** (balance = SUM).
- `notifications.data` stores deep-link payload as JSON.
- `sell_requests` (formerly `buy_requests`) — collectors now send material sell requests to shops.

---

*Generated from Scraply_Database_Schema.docx*
